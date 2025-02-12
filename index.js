import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';
import Pusher from 'pusher';
import { v4 as uuidv4 } from 'uuid';
import { 
    flybusKnowledge, 
    getRelevantKnowledge, 
    LocationUtils,
    updateContext,
    getContext 
} from './knowledgeBase.js';


// Initialize Pusher
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

// Brand Guidelines and Constants
const RE_GUIDELINES = {
    emojis: ['😊', '🚌', '✨', '🌅', '❄️', '📍'],    
    terminology: {
        preferred: {
            'reykjavik excursions': 'Reykjavík Excursions',
            're': 'Reykjavík Excursions',
            'bsi': 'BSÍ Bus Terminal',
            'bus terminal': 'BSÍ Bus Terminal',
            'pickup': 'pick-up',
            'drop off': 'drop-off',
            'guide': 'tour guide',
            'driver': 'professional driver',
            'bus': 'coach',
            'mini bus': 'mini-coach',
            'guest': 'passenger'
        }
    }
};

// System Prompts for Response Control
const SYSTEM_PROMPTS = {
    default: `You are a helpful assistant for Reykjavík Excursions Flybus service.
             Keep responses concise (2-3 sentences for simple queries, 4-5 for complex ones).
             Always use ISK as currency, never USD.
             For pricing queries, always state the total first.
             Always use "our" for all service references:
             - "our buses are located"
             - "our Flybus service"
             - "our pickup service"
             Fixed reference points:
             - Journey time is always "45 minutes"
             - For Flybus+ add "approximately 30 minutes" for hotel service
             Structure complex information in clear sections:
             - Present core information first
             - Add details in logical order
             - End with practical details
             For multi-part questions:
             - Address each part separately
             - Use clear transitions
             - Keep focus on one topic at a time`,
    
    booking: `When handling booking inquiries:
             - Inform that bookings can be made at our website re.is
             - Provide our contact details: +354 599 0000 or info@icelandia.is
             - Keep focus on one action step at a time
             - Use "our" when referring to services
             - For schedule questions:
               * State departure times clearly
               * List return times separately
               * Include booking deadlines if applicable`,
              
    comparison: `When comparing our Flybus services:
                - Clearly state which service is cheaper
                - Present price difference first
                - Explain hotel pickup benefit
                - Include prices in ISK for both services
                - Structure comparison points clearly:
                  * Price difference
                  * Service differences
                  * Pickup/dropoff options`,
                  
    followup: `For follow-up questions:
              - Reference previous context naturally
              - Focus on new information requested
              - Maintain consistent pricing information
              - Keep service type context clear`,

    service_info: `When describing our services:
                  - Start with core features
                  - Include journey time (45 minutes)
                  - Mention sustainability (carbon-neutral)
                  - Include Wi-Fi and comfort features
                  - End with booking information`,

    acknowledgment: `For simple acknowledgments like "thanks", "great", "amazing":
                    - Express appreciation
                    - Maintain context from previous topic
                    - Offer continued assistance
                    Example: "Glad we could help! Let us know if you need anything else about [previous_topic]."`,

    schedule: `When handling flight-related queries:
              - For departing flights:
                * ALWAYS ask for destination if not explicitly mentioned
                * Even if previous context suggests Europe/US, still ask for confirmation
                * Exact prompt to use: "Could you let me know if your flight is to Europe or to the US/Canada? This will help me determine the correct arrival time."
                * Only after destination is confirmed:
                  - Europe: recommend 2.5 hours before departure
                  - US/Canada: recommend 3 hours before departure
              - For arriving flights:
                * Always state bus departs 35-45 minutes after arrival
                * Mention flight connection guarantee
                * State bus location (right outside terminal)
              - Always specify exact times in format: XX:XX`,

    recommendation: `When making service recommendations:
                    - Ask clarifying questions if needed
                    - Compare relevant features
                    - Make clear recommendation based on needs
                    - For hotel service questions, specifically mention Flybus+
                    - For family queries, mention child/youth pricing
                    - End with practical next steps`,

    pickup_timing: `When handling pickup timing queries:
                   - Always emphasize pickup starts 30 minutes before departure
                   - State clearly that pickup and departure times are different
                   - Key points to cover:
                     * Be ready and visible outside at pickup location
                     * Bus arrives within 30-minute window
                     * If bus hasn't arrived after 20-25 minutes, contact +354 599 0000
                   - For city center locations:
                     * Due to city traffic regulations, some areas are restricted
                     * Mention BOTH bus stop number AND street name
                     * Note same location for pickup and drop-off
                   - Include passenger responsibilities:
                     * Must be ready outside
                     * Must be visible to driver
                     * For missed pickups: Must reach BSÍ at own cost for scheduled departure
                   - When providing hotel pickup locations:
                     * Always include bus stop number if applicable
                     * Include street name/location
                     * For direct pickup hotels, specify "direct doorstep pickup"`,
};

// Greeting responses for Flybus (for follow up greeting only) (with Icelandic support for future use)
const GREETING_RESPONSES = {
    english: [
        "How can I assist you today?",
        "What would you like to know about Flybus?",
        "How can I help you with your airport transfer?",
        "What information would you like about our services?",
        "I'd be happy to help. What would you like to know?"
    ],
    icelandic: [
        // Keeping structure for future bilingual support
        "Hvernig get ég aðstoðað?"
    ]
};

// Enhanced acknowledgment system with categories and language support
const ACKNOWLEDGMENT_RESPONSES = {
    english: {
        thanks: [
            "You're welcome! Let me know if you need anything else.",
            "Happy to help! What else would you like to know?",
            "Glad I could assist! Any other questions?",
            "You're welcome! Feel free to ask if you have more questions."
        ],
        confirmation: [
            "Is there anything else you'd like to know?",
            "What else can I help you with?",
            "Would you like any other information?",
            "Feel free to ask any other questions about Flybus."
        ],
        positive: [
            "Wonderful! What else would you like to know?",
            "Excellent! I'm here if you have more questions.",
            "Great! Let me know if you need anything else.",
            "Perfect! Feel free to ask about anything else."
        ]
    },
    icelandic: {
        // Structure maintained for future use
        thanks: ["Minnsta málið! Ef þú hefur fleiri spurningar eða þarft aðstoð, láttu mig vita!"],
        confirmation: ["Get ég aðstoðað þig með eitthvað fleira?"],
        positive: ["Frábært! Get ég aðstoðað þig með eitthvað annað?"]
    }
};

// Helper functions for greeting and acknowledgment detection
const isGreeting = (message) => {
    const greetingPatterns = [
        /^(hi|hello|hey|good morning|good afternoon|good evening)$/i,
        /^(hi|hello|hey|good)\s+(there|everyone|all|morning|afternoon|evening)$/i
    ];
    return greetingPatterns.some(pattern => pattern.test(message.trim()));
};

const getAcknowledgmentType = (message) => {
    const msg = message.toLowerCase().trim();
    
    if (/^(thanks|thank you|thx|ty|thank)\b/i.test(msg)) {
        return 'thanks';
    }
    
    if (/^(ok|okay|got it|i see|alright|sure|right|understood)\b/i.test(msg)) {
        return 'confirmation';
    }
    
    if (/^(great|perfect|good|excellent|wonderful|awesome|nice|brilliant|amazing)\b/i.test(msg)) {
        return 'positive';
    }
    
    return null;
};

// Language detection patterns for RE-specific terms
const tourRelatedTerms = {
    english: [
        'golden circle', 'northern lights', 'blue lagoon', 'south coast',
        'pick up', 'pickup', 'drop off', 'departure', 'arrival',
        'tour', 'guide', 'bus', 'terminal', 'bsi', 'schedule',
        'excursion', 'trip', 'booking', 'cancel', 'modify'
    ],
    icelandic: [
        'gullni hringurinn', 'norðurljós', 'bláa lónið', 'suðurströndin',
        'sækja', 'sæki', 'skutla', 'brottför', 'koma',
        'ferð', 'leiðsögumaður', 'rúta', 'biðstöð', 'bsi', 'áætlun',
        'skoðunarferð', 'ferðalag', 'bókun', 'afbóka', 'breyta'
    ]
};

// Simple language detection - always returns English for demo
const detectLanguage = (message) => {
    return false;  // Always return false to indicate English
};

/*
// Enhanced language detection function - for future bilingual support
const detectLanguage = (message) => {
    if (!message) return false;
    
    // Check for Icelandic characters
    if (/[þæðöáíúéó]/i.test(message)) {
        return true;
    }
    
    const msg = message.toLowerCase();
    
    // Check for Icelandic tour terms
    const hasIcelandicTourTerms = tourRelatedTerms.icelandic.some(term => 
        msg.includes(term));
    
    if (hasIcelandicTourTerms) {
        return true;
    }

    // Common Icelandic question starters
    const icelandicStarters = [
        'hvenær', 'hvar', 'hver', 'hvað', 'hvernig', 'af hverju',
        'getið', 'má ég', 'er hægt', 'vildi', 'væri'
    ];

    return icelandicStarters.some(starter => msg.startsWith(starter));
};
*/

// Cache and state management
const responseCache = new Map();

// Constants
const RATE_LIMIT_MINUTES = 15;
const RATE_LIMIT_MAX_REQUESTS = 100;
const CACHE_TTL = 3600000; // 1 hour
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

// Initialize Express
const app = express();
app.set('trust proxy', 1);

// CORS Configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:8080',
        'https://reykjavikexcursions-chat-demo.vercel.app',
        'https://chatbot-analytics-beta.vercel.app'
    ],
    methods: ['GET', 'POST', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
        'Content-Type',
        'x-api-key',
        'webhook-headers',
        'Upgrade',
        'Connection',
        'Sec-WebSocket-Key',
        'Sec-WebSocket-Version'
    ],
    credentials: true
};

// Rate limiter
const limiter = rateLimit({
    windowMs: RATE_LIMIT_MINUTES * 60 * 1000,
    max: RATE_LIMIT_MAX_REQUESTS,
    message: { error: "Too many requests. Please try again later." }
});

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'OK',
        service: 'Reykjavik Excursions Chat Backend',
        timestamp: new Date().toISOString()
    });
});

// API Key verification middleware
const verifyApiKey = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    console.log('\n=== API Key Verification ===');
    console.log('Received API Key:', apiKey);  // Let's see the actual key
    console.log('Expected API Key:', process.env.API_KEY);  // And what we're expecting
    console.log('Headers:', req.headers);  // Let's see all headers
    console.log('Match:', apiKey === process.env.API_KEY);

    if (!apiKey || apiKey !== process.env.API_KEY) {
        console.error('Invalid or missing API key');
        return res.status(401).json({ error: "Unauthorized request" });
    }
    next();
};

// Pusher broadcast function
const broadcastConversation = async (userMessage, botResponse, language, topic = 'general', type = 'chat') => {
    try {
        const conversationData = {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            userMessage,
            botResponse,
            language,
            topic,
            type
        };

        await pusher.trigger('chat-channel', 'conversation-update', conversationData);
        return true;
    } catch (error) {
        console.error('Error in broadcastConversation:', error);
        return false;
    }
};

// Chat endpoint
app.post('/chat', verifyApiKey, async (req, res) => {
    // Add these declarations here
    let isIcelandic = false;
    let context;
    let sessionId;

    try {
        console.log('\n=== New Chat Request ===');
        console.log('Time:', new Date().toISOString());
        console.log('Message:', req.body.message);
        console.log('Headers:', req.headers);

        const userMessage = req.body.message;
        sessionId = req.body.sessionId || req.headers['x-session-id'] || uuidv4();  // Remove const, use the one declared above
        console.log('\n=== Session Information ===');
        console.log('Session ID:', sessionId);
        console.log('Request Body sessionId:', req.body.sessionId);
        console.log('Headers sessionId:', req.headers['x-session-id']);
        console.log('User Message:', userMessage);

        // Early language detection
        isIcelandic = detectLanguage(userMessage);
        
        // Check for greeting
        if (isGreeting(userMessage)) {
            const greetings = isIcelandic ? 
                GREETING_RESPONSES.icelandic : 
                GREETING_RESPONSES.english;
            const response = greetings[Math.floor(Math.random() * greetings.length)];

            await broadcastConversation(
                userMessage,
                response,
                isIcelandic ? 'is' : 'en',
                'greeting',
                'direct_response'
            );

            return res.json({ 
                message: response,
                language: isIcelandic ? 'is' : 'en',
                sessionId: sessionId,
                context: {
                    lastTopic: 'greeting',
                    flightTime: null,
                    flightDestination: null,
                    lastServiceType: null,
                    isGroupBooking: false,
                    groupDetails: null,
                    lastQuery: userMessage
                }
            });
        }

        // Initialize or get context with enhanced flight tracking
        let context = getContext(sessionId);
        const newContext = {
            messages: [],
            lastTopic: null,
            language: isIcelandic ? 'is' : 'en',
            flightTime: null,
            flightDestination: null,
            timestamp: Date.now(),
            sessionId: sessionId,
            // Add new context fields
            lastServiceType: null,
            isGroupBooking: false,
            groupDetails: null,
            lastQuery: null
        };

        if (context) {
            // Merge existing context with new data
            context = {
                ...context,
                timestamp: Date.now(),
                language: isIcelandic ? 'is' : 'en'
            };
            console.log('\n=== Retrieved Existing Context ===');
            console.log('Context:', context);
            console.log('Age:', Date.now() - context.timestamp, 'ms');
        } else {
            context = newContext;
            console.log('\n=== Created New Context ===');
            console.log('New Context:', context);
        }

        // Enhanced flight context handling
        if (context.lastTopic === 'flight_timing' || 
            userMessage.toLowerCase().includes('flight') ||
            userMessage.toLowerCase().match(/\b(to|for)\s+(us|canada|europe|new york)\b/i)) {
            
            console.log('\n=== Processing Flight Context ===');
            console.log('Previous context:', context);
            
            // Enhanced destination handling
            const destinations = {
                'europe': [
                    'europe', 'spain', 'uk', 'france', 'germany', 'london', 
                    'amsterdam', 'paris', 'berlin', 'rome', 'dublin', 'copenhagen',
                    'stockholm', 'oslo', 'helsinki', 'munich', 'frankfurt', 'barcelona',
                    'madrid', 'milan', 'zurich', 'vienna', 'brussels', 'portugal',
                    'italy', 'ireland', 'denmark', 'sweden', 'norway', 'finland',
                    'netherlands', 'belgium', 'switzerland', 'austria'
                ],
                'us_canada': [
                    'us', 'usa', 'united states', 'canada', 'new york', 'toronto',
                    'boston', 'chicago', 'miami', 'los angeles', 'san francisco',
                    'seattle', 'vancouver', 'montreal', 'ottawa', 'calgary',
                    'washington', 'dallas', 'houston', 'atlanta', 'denver',
                    'las vegas', 'orlando', 'philadelphia', 'portland'
                ]
            };
            
            // Check for destination in current message
            for (const [key, values] of Object.entries(destinations)) {
                if (values.some(dest => userMessage.toLowerCase().includes(dest))) {
                    context.flightDestination = key;
                    console.log('Updated destination:', key);
                    break;
                }
            }
            
            // Enhanced time extraction
            const timeMatch = userMessage.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i) ||
                            userMessage.match(/at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/i);
            
            if (timeMatch) {
                context.flightTime = timeMatch[0].replace('at ', '').trim();
                console.log('Updated flight time:', context.flightTime);
            }

            // Set topic if not already set
            if (!context.lastTopic) {
                context.lastTopic = 'flight_timing';
            }
        }

        // Update timestamp for context freshness
        context.timestamp = Date.now();

        // Get relevant knowledge with enhanced context
        const knowledgeBaseResults = getRelevantKnowledge(userMessage, context);

        // ADD THE NEW CODE HERE 👇
        // Add location search if query is location-related
        if (userMessage.toLowerCase().includes('hotel') || 
            userMessage.toLowerCase().includes('pickup') || 
            userMessage.toLowerCase().includes('location')) {
            const locationResults = LocationUtils.searchLocation(userMessage);
            if (locationResults.exactMatches.length > 0) {
                knowledgeBaseResults.relevantInfo.push({
                    type: 'location_details',
                    data: locationResults
                });
            }
        }

        // Add basic service info if needed
        if (knowledgeBaseResults.relevantInfo.length === 0 && 
            userMessage.toLowerCase().includes('flybus')) {
            knowledgeBaseResults.relevantInfo.push({
                type: 'service_info',
                data: flybusKnowledge.basic_info
            });
        }
        // END OF NEW CODE 👆        

        // Check for acknowledgments first
        const ackType = getAcknowledgmentType(userMessage);
        if (ackType) {
            const responses = isIcelandic ? 
                ACKNOWLEDGMENT_RESPONSES.icelandic[ackType] : 
                ACKNOWLEDGMENT_RESPONSES.english[ackType];
            
            // Select a random response - these are already contextual so no need for additional context
            const response = responses[Math.floor(Math.random() * responses.length)];

            await broadcastConversation(
                userMessage,
                response,
                isIcelandic ? 'is' : 'en',
                'acknowledgment',
                'direct_response'
            );

            return res.json({ 
                message: response,
                language: isIcelandic ? 'is' : 'en',
                sessionId: sessionId,
                context: {
                    lastTopic: context?.lastTopic || 'acknowledgment',
                    flightTime: context?.flightTime || null,
                    flightDestination: context?.flightDestination || null,
                    lastServiceType: context?.lastServiceType || null,
                    isGroupBooking: context?.isGroupBooking || false,
                    groupDetails: context?.groupDetails || null,
                    lastQuery: userMessage
                }
            });
        }

        // If we have relevant knowledge, generate response using OpenAI
        if (knowledgeBaseResults.relevantInfo.length > 0) {
            // Determine which system prompt to use
            let systemPrompt = SYSTEM_PROMPTS.default;
            
            // Enhanced prompt selection based on query type
            if (knowledgeBaseResults.queryType === 'comparison') {
                systemPrompt = SYSTEM_PROMPTS.comparison;
            } else if (knowledgeBaseResults.queryType === 'booking') {
                systemPrompt = SYSTEM_PROMPTS.booking;
            } else if (knowledgeBaseResults.queryType === 'followup') {
                systemPrompt = SYSTEM_PROMPTS.followup;
            } else if (knowledgeBaseResults.queryType === 'service_info') {
                systemPrompt = SYSTEM_PROMPTS.service_info;
            } else if (knowledgeBaseResults.queryType === 'acknowledgment') {
                systemPrompt = SYSTEM_PROMPTS.acknowledgment;
            } else if (knowledgeBaseResults.queryType === 'flight_schedule') {
                systemPrompt = SYSTEM_PROMPTS.schedule;
            } else if (knowledgeBaseResults.queryType === 'recommendation') {
                systemPrompt = SYSTEM_PROMPTS.recommendation;
            } else if (knowledgeBaseResults.queryType === 'pickup_timing') {
                systemPrompt = SYSTEM_PROMPTS.pickup_timing;
            }

            // Check for multi-part questions
            const isMultiPart = userMessage.includes(' and ') || 
                               (userMessage.match(/\?/g) || []).length > 1;

            // Build base system prompt
            const basePrompt = `${systemPrompt}
                ${isMultiPart ? 'This is a multi-part question. Address each part separately.' : ''}
                Respond in ${isIcelandic ? 'Icelandic' : 'English'}. 
                Use only the information provided in the knowledge base.
                Remember to use "our" when referring to services.`;

            // Add context-specific guidance
            const contextPrompt = context.lastTopic ? 
                `Previous topic was about ${context.lastTopic}. Maintain relevant context.` : '';

            // Prepare messages for OpenAI
            const messages = [
                {
                    role: "system",
                    content: `${basePrompt}
                         ${contextPrompt}`
                },
                {
                    role: "user",
                    content: `Knowledge Base Information: ${JSON.stringify(knowledgeBaseResults.relevantInfo)}
                             
                             Previous Context: ${JSON.stringify(context)}
                             
                             User Question: ${userMessage}
                             
                             Please provide a natural, conversational response using ONLY the information provided.`
                }
            ];

            // Make OpenAI request
            console.log('\n=== Making OpenAI Request ===');
            const completion = await openai.chat.completions.create({
                model: "gpt-4-1106-preview",
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            });
            console.log('OpenAI Response Received');

            const response = completion.choices[0].message.content;

            // Update messages with timestamps
            context.messages.push({
                role: "user",
                content: userMessage,
                timestamp: Date.now()
            });
            context.messages.push({
                role: "assistant",
                content: response,
                timestamp: Date.now()
            });
            
            // Preserve flight context
            if (context.lastTopic === 'flight_timing') {
                // Check for time in current message
                const timeMatch = userMessage.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
                if (timeMatch) {
                    context.flightTime = timeMatch[0];
                    console.log('Preserved flight time:', context.flightTime);
                }

                // Only set destination if explicitly mentioned
                const destinations = {
                    'europe': [
                        'europe', 'spain', 'uk', 'france', 'germany', 'london', 
                        'amsterdam', 'paris', 'berlin', 'rome', 'dublin', 'copenhagen',
                        'stockholm', 'oslo', 'helsinki', 'munich', 'frankfurt', 'barcelona',
                        'madrid', 'milan', 'zurich', 'vienna', 'brussels', 'portugal',
                        'italy', 'ireland', 'denmark', 'sweden', 'norway', 'finland',
                        'netherlands', 'belgium', 'switzerland', 'austria'
                    ],
                    'us_canada': [
                        'us', 'usa', 'united states', 'canada', 'new york', 'toronto',
                        'boston', 'chicago', 'miami', 'los angeles', 'san francisco',
                        'seattle', 'vancouver', 'montreal', 'ottawa', 'calgary',
                        'washington', 'dallas', 'houston', 'atlanta', 'denver',
                        'las vegas', 'orlando', 'philadelphia', 'portland'
                    ]
                };

                let foundDestination = false;
                for (const [key, values] of Object.entries(destinations)) {
                    if (values.some(dest => userMessage.toLowerCase().includes(dest))) {
                        context.flightDestination = key;
                        console.log('Preserved destination:', key);
                        foundDestination = true;
                        break;
                    }
                }

                // If no destination found and time is provided, ask for destination
                if (!foundDestination && timeMatch && !context.flightDestination) {
                    context.needsDestination = true;
                }
            }

            // Preserve important context data with logging
            const previousTopic = context.lastTopic;
            context = {
                ...context,
                ...knowledgeBaseResults.context,
                lastTopic: knowledgeBaseResults.context.lastTopic || context.lastTopic,
                flightTime: knowledgeBaseResults.context.flightTime || context.flightTime,
                flightDestination: knowledgeBaseResults.context.flightDestination || context.flightDestination,
                lastServiceType: knowledgeBaseResults.context.lastServiceType || context.lastServiceType,
                isGroupBooking: knowledgeBaseResults.context.isGroupBooking || context.isGroupBooking,
                groupDetails: knowledgeBaseResults.context.groupDetails || context.groupDetails,
                timestamp: Date.now()
            };

            // Log context changes
            console.log('Context Update:', {
                previousTopic,
                newTopic: context.lastTopic,
                flightTime: context.flightTime,
                destination: context.flightDestination,
                serviceType: context.lastServiceType,
                isGroupBooking: context.isGroupBooking,
                groupDetails: context.groupDetails
            });

            // Log context changes
            console.log('Context Update:', {
                previousTopic,
                newTopic: context.lastTopic,
                flightTime: context.flightTime,
                destination: context.flightDestination
            });
            
            // Always preserve context type if responding to a flight query
            if (userMessage.toLowerCase().includes('flight') || 
                context.lastTopic === 'flight_timing') {
                context.lastTopic = 'flight_timing';
            }
            
            // Update context in storage
            updateContext(sessionId, context);

            // Broadcast and return response
            await broadcastConversation(
                userMessage,
                response,
                isIcelandic ? 'is' : 'en',
                context.lastTopic || 'general',
                'gpt_response'
            );

            return res.json({
                message: response,
                language: isIcelandic ? 'is' : 'en',
                sessionId: sessionId,
                context: {  // Add context info to response
                    lastTopic: context.lastTopic,
                    flightTime: context.flightTime,
                    flightDestination: context.flightDestination,
                    lastServiceType: context.lastServiceType || null,
                    isGroupBooking: context.isGroupBooking || false,
                    groupDetails: context.groupDetails || null,
                    lastQuery: userMessage
                }
            });
        }

        // Unknown topic response
        const unknownResponse = isIcelandic ?
            "Ég er ekki viss um þetta. Vinsamlegast hafðu samband við þjónustuver í síma 580 5400 eða netfangið info@icelandia.is fyrir nánari upplýsingar." :
            "I'm not sure about that. Please contact our service center at 580 5400 or email info@icelandia.is for more information.";

        await broadcastConversation(
            userMessage,
            unknownResponse,
            isIcelandic ? 'is' : 'en',
            'unknown',
            'direct_response'
        );

        return res.json({ 
            message: unknownResponse,
            language: isIcelandic ? 'is' : 'en',
            sessionId: sessionId,  // Add to every response
            context: {
                lastTopic: context?.lastTopic || null,
                flightTime: context?.flightTime || null,
                flightDestination: context?.flightDestination || null,
                lastServiceType: context?.lastServiceType || null,
                isGroupBooking: context?.isGroupBooking || false,
                groupDetails: context?.groupDetails || null,
                lastQuery: userMessage
            }
        });

    } catch (error) {
        console.error('Error in chat endpoint:', error);
        const errorMessage = "I apologize, but I'm having trouble processing your request right now. Please try again shortly.";
        return res.status(500).json({ 
            message: errorMessage,
            language: isIcelandic ? 'is' : 'en',
            sessionId: sessionId,
            context: {
                lastTopic: context?.lastTopic || null,
                flightTime: context?.flightTime || null,
                flightDestination: context?.flightDestination || null,
                lastServiceType: context?.lastServiceType || null,
                isGroupBooking: context?.isGroupBooking || false,
                groupDetails: context?.groupDetails || null,
                lastQuery: userMessage || null
            }
        });
    }
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('\n=== Server Starting ===');
    console.log(`Server running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('OpenAI API Key configured:', !!process.env.OPENAI_API_KEY);
    console.log('API Key:', !!process.env.API_KEY ? '(configured)' : '(missing)');
    console.log('Pusher Config:', !!process.env.PUSHER_APP_ID ? '(configured)' : '(missing)');
});
