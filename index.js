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
    getContext,
    createContextFields,  // Add this 
    tourRelatedTerms,     // Add this
    casualChatPatterns,    // Add this
    calculateJourneyTime,    // Add this
    timingPatterns          // Add this
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
    global_structure: `Response Structure Guidelines:
                     - ALWAYS structure ALL responses in exactly two paragraphs
                     - First paragraph (2-3 sentences):
                       * Core information first (location, timing, price, or main point)
                       * If location involved, include maps link at end of paragraph
                       * Format maps links as "View location on Google Maps 📍"
                     - Second paragraph (2-3 sentences):
                       * Supporting details, procedures, or next steps
                       * Contact information if applicable (+354 599 0000)
                     - Never combine paragraphs
                     - Never create more than two paragraphs
                     - Line break between paragraphs is required`,

    casual_chat: `When handling casual conversation and introductions:
                 - Maintain a warm, professional tone
                 - Acknowledge personal introductions
                 - Gently guide conversation back to Flybus services
                 - For greetings: Respond naturally but segue to Flybus
                 - For personal questions: Acknowledge politely and redirect
                 - Always end with subtle prompt about services
                 Examples:
                 - Name introductions: "Nice to meet you [name]! I'd be happy to help you plan your Flybus journey."
                 - How are you: "I'm doing well, thank you! I'm here to help with your airport transfer needs."
                 - General chat: "Thanks for asking! I'm here to assist with your Flybus transportation needs."`,          

    default: `${SYSTEM_PROMPTS.global_structure}
                 You are a helpful assistant for Reykjavík Excursions Flybus service.
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
                 - First paragraph: Core information and main points
                 - Second paragraph: Additional details and practical information
                 For multi-part questions:
                 - Address each part while maintaining two-paragraph structure
                 - Use clear transitions
                 - Keep focus on one topic at a time`,
    
    booking: `${SYSTEM_PROMPTS.global_structure}
                 When handling booking inquiries:
                 - First paragraph must contain:
                   * Booking website information (re.is)
                   * Main booking options
                 - Second paragraph must contain:
                   * Contact details: +354 599 0000 or info@icelandia.is
                   * Additional booking instructions if needed
                 Keep focus on one action step at a time
                 Use "our" when referring to services
                 For schedule questions:
                   * State departure times clearly
                   * List return times separately
                   * Include booking deadlines if applicable`,
              
    comparison: `${SYSTEM_PROMPTS.global_structure}
                 When comparing our Flybus services:
                 - First paragraph must contain:
                   * State which service is cheaper
                   * Present price difference first
                   * Core service differences
                 - Second paragraph must contain:
                   * Hotel pickup benefit details
                   * Pricing specifics in ISK
                   * Final recommendation
                 Structure comparison points clearly:
                   * Price difference
                   * Service differences
                   * Pickup/dropoff options`,
                  
    followup: `${SYSTEM_PROMPTS.global_structure}
                 For follow-up questions:
                 - First paragraph must contain:
                   * Reference to previous context naturally
                   * Core new information requested
                 - Second paragraph must contain:
                   * Additional details
                   * Next steps or recommendations
                 - Maintain consistent pricing information
                 - Keep service type context clear`,

    service_info: `${SYSTEM_PROMPTS.global_structure}
                 When describing our services:
                 - First paragraph must contain:
                   * Core features
                   * Journey time (45 minutes)
                   * Sustainability (carbon-neutral)
                 - Second paragraph must contain:
                   * Wi-Fi and comfort features
                   * Booking information
                   * Contact details if needed`,

    acknowledgment: `For simple acknowledgments like "thanks", "great", "amazing":
                    - Express appreciation
                    - Maintain context from previous topic
                    - Offer continued assistance
                    Example: "Glad we could help! Let us know if you need anything else about [previous_topic]."`,

    schedule: `${SYSTEM_PROMPTS.global_structure}
                When handling flight-related queries:
                - First paragraph must contain:
                * For departing flights:
                  - ALWAYS ask for destination if not explicitly mentioned
                  - Even if previous context suggests Europe/US, still ask for confirmation
                  - Exact prompt: "Could you let me know if your flight is to Europe or to the US/Canada? This will help me determine the correct arrival time."
                * For arriving flights:
                  - State bus departs 35-45 minutes after arrival
                  - State bus location (right outside terminal)
                - Second paragraph must contain:
                * For departing flights (once destination confirmed):
                  - Europe: recommend 2.5 hours before departure
                  - US/Canada: recommend 3 hours before departure
                * For arriving flights:
                  - Flight connection guarantee details
                  - Any additional timing information
                - Always specify exact times in format: XX:XX`,

    recommendation: `${SYSTEM_PROMPTS.global_structure}
                When making service recommendations:
                - First paragraph must contain:
                    * Main recommendation based on needs
                    * Key features of recommended service
                    * Relevant pricing information
                - Second paragraph must contain:
                    * Additional options or alternatives
                    * For hotel service, Flybus+ details
                    * For family queries, child/youth pricing
                    * Practical next steps
                - Ask clarifying questions if needed`,

    pickup_timing: `${SYSTEM_PROMPTS.global_structure}
                When handling pickup timing queries:
                ALWAYS structure pickup responses exactly as follows:

                - First paragraph must contain:
                    * Location details first (bus stop number or direct pickup status)
                    * Format bus stops as "bus stop X (Street Name)"
                    * For city center, explain traffic restrictions
                    * End with maps URL
                    
                - Second paragraph must contain:
                    * Pickup timing (30 minutes before departure)
                    * Bus arrival window
                    * Contact number if needed (+354 599 0000)
                    * Missed pickup procedure if relevant
                    
                Additional rules (while maintaining two-paragraph structure):
                - For city center locations:
                    * Always mention bus stop number AND street name in first paragraph
                    * Explain restrictions in first paragraph
                    * Note same location for pickup/drop-off in second paragraph
                    
                - For hotels:
                    * Direct pickup: State this clearly in first paragraph
                    * Bus stop required: State bus stop details in first paragraph
                    * Always include maps link at end of first paragraph
                    
                Example structure:
                "For your pickup from [hotel], please go to bus stop X (Street Name). Due to traffic regulations in the downtown area, our buses use designated bus stops to ensure timely service. [Maps link]

                Please be ready at the bus stop 30 minutes before your scheduled departure time. If the bus hasn't arrived after 20-25 minutes, please call us at +354 599 0000. Should you miss the pickup, you will need to reach BSÍ Bus Terminal at your own expense."`,
 
    location_info: `${SYSTEM_PROMPTS.global_structure}
                When providing location information:
                - First paragraph must contain:
                    * Location details first (bus stop or hotel)
                    * Area description and nearby landmarks
                    * ALWAYS end with maps URL
                    * Format: "View location on Google Maps 📍"
                - Second paragraph must contain:
                    * Pickup/dropoff instructions
                    * Timing details
                    * Contact information if needed
                    
                Additional requirements while maintaining two-paragraph structure:
                - For bus stops:
                    * Format as "bus stop X (Street Name)"
                    * List nearby hotels served by this stop
                    * Mention walking distances if available
                    
                - For hotels:
                    * Specify if direct pickup or nearest bus stop
                    * Include maps link for either option
                    * Mention any area restrictions
                    * Include alternative stops if primary is unavailable
                    
                - Always maintain format consistency:
                    * Location names exactly as in database
                    * Bus stop numbers in standard format
                    * Maps links at end of first paragraph`,
                      
    fleet_info: `${SYSTEM_PROMPTS.global_structure}
            When describing our fleet:
            - First paragraph must contain:
                * Total number of vehicles (80)
                * Fleet size and types (modern, comfortable coaches)
                * Key features (carbon-neutral status)
            - Second paragraph must contain:
                * Vehicle types and capacities
                * Professional drivers and safety
                * Special capabilities (4x4, highland access) if relevant
            - Never exceed specified length in each paragraph
            - Maintain professional, confident tone`,

    safety: `${SYSTEM_PROMPTS.global_structure}
            When addressing safety queries:
            - First paragraph must contain (2-3 sentences):
              * Core safety commitment
              * Maintenance practices
              * Professional drivers qualifications
            - Second paragraph must contain (1-2 sentences):
              * Special safety features
              * Additional reassurance
            - Keep tone reassuring but concise
            - Maintain professional yet friendly tone`,

    policy: `${SYSTEM_PROMPTS.global_structure}
            When explaining policies:
            - First paragraph must contain:
              * Clear policy statement
              * Main policy rationale if needed
              * Any critical restrictions
            - Second paragraph must contain:
              * Exceptions if applicable
              * Contact information if needed
              * Additional guidance
            - Keep tone professional but friendly
            - Avoid unnecessary elaboration`,         
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
    
    if (/^(?:thanks|thank\s*you|thx|ty|thankyou|thank\s*u)[\s,!.]*$/i.test(msg)) {
        return 'thanks';
    }
    
    if (/^(?:ok|okay|got\s*it|i\s*see|alright|sure|right|understood|yes|yeah|yep|yup)[\s,!.]*$/i.test(msg)) {
        return 'confirmation';
    }
    
    if (/^(?:great|perfect|good|excellent|wonderful|awesome|nice|brilliant|amazing|cool|fantastic|super|helpful|really\s*helpful)[\s,!.]*$/i.test(msg)) {
        return 'positive';
    }
    
    return null;
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
                context: createContextFields({}, {
                    lastTopic: 'greeting',
                    lastQuery: userMessage,
                    language: isIcelandic ? 'is' : 'en',
                    sessionId: sessionId
                })
            });
        }

        // Initialize or get context with enhanced flight tracking
        let context = getContext(sessionId);
        
        console.log('\n=== Context Initialization ===');
        console.log('SessionId:', sessionId);
        console.log('Existing context:', context);
        
        const newContext = createContextFields({}, {
            language: isIcelandic ? 'is' : 'en',
            sessionId: sessionId,
            timestamp: Date.now()
        });

        if (context) {
            // Merge existing context with new data
            context = {
                ...context,
                timestamp: Date.now(),
                language: isIcelandic ? 'is' : 'en',
                sessionId: sessionId  // Ensure sessionId is preserved
            };
            console.log('\n=== Retrieved Existing Context ===');
            console.log('Context:', context);
            console.log('Age:', Date.now() - context.timestamp, 'ms');
            
            // Store updated context
            updateContext(sessionId, context);
        } else {
            context = newContext;
            console.log('\n=== Created New Context ===');
            console.log('New Context:', context);
            
            // Store new context
            updateContext(sessionId, context);
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
                context: createContextFields(context, {
                    lastTopic: context?.lastTopic || 'acknowledgment',
                    lastQuery: userMessage
                })
            });
        }

        // If we have relevant knowledge, generate response using OpenAI
        if (knowledgeBaseResults.relevantInfo.length > 0) {
            // Add this section for casual chat handling
            if (knowledgeBaseResults.relevantInfo[0].type === 'casual_chat') {
                const chatResponse = knowledgeBaseResults.relevantInfo[0];
                
                await broadcastConversation(
                    userMessage,
                    chatResponse.data.response,
                    isIcelandic ? 'is' : 'en',
                    'casual_chat',
                    'direct_response'
                );

                return res.json({
                    message: chatResponse.data.response,
                    language: isIcelandic ? 'is' : 'en',
                    sessionId: sessionId,
                    context: createContextFields(context, {
                        lastTopic: chatResponse.context?.previousTopic || 'casual_chat',
                        chatType: chatResponse.chatType,
                        lastQuery: userMessage
                    })
                });
            }            

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
            } else if (knowledgeBaseResults.relevantInfo.some(info => 
                info.type === 'hotel_location' || 
                info.type === 'bus_stop' ||
                info.type === 'location_restrictions')) {
                systemPrompt = knowledgeBaseResults.queryType === 'location_search' ? 
                    SYSTEM_PROMPTS.location_info : 
                    SYSTEM_PROMPTS.pickup_timing;
            } else if (knowledgeBaseResults.relevantInfo.some(info => info.type === 'fleet_info')) {
                systemPrompt = SYSTEM_PROMPTS.fleet_info;
            } else if (knowledgeBaseResults.relevantInfo.some(info => info.type === 'safety')) {
                systemPrompt = SYSTEM_PROMPTS.safety;
            } else if (knowledgeBaseResults.relevantInfo.some(info => info.type === 'policy')) {
                systemPrompt = SYSTEM_PROMPTS.policy;
            }    

            // Check for multi-part questions
            const isMultiPart = userMessage.includes(' and ') || 
                               (userMessage.match(/\?/g) || []).length > 1;

            // Build base system prompt
            const basePrompt = `${systemPrompt}
                ${isMultiPart ? 'This is a multi-part question. Address each part separately while maintaining two-paragraph structure.' : ''}
                Respond in ${isIcelandic ? 'Icelandic' : 'English'}. 
                Use only the information provided in the knowledge base.
                Remember to use "our" when referring to services.

                Response Structure Requirements:
                - First paragraph must contain core information
                - Second paragraph must contain supporting details
                - Maintain exactly two paragraphs with line break between them
                ${knowledgeBaseResults.relevantInfo[0].type !== 'casual_chat' ? 
                    `Location Requirements:
                    - Include specific location details in first paragraph
                    - Always mention bus stop numbers and names in first response
                    - Place maps URL at end of first paragraph
                    - Format maps URL as "View location on Google Maps 📍"` : 
                    ''}
                ${knowledgeBaseResults.relevantInfo[0].type === 'route' ? 
                    `Timing Requirements:
                    - State base journey time in first paragraph
                    - Include any additional service time in second paragraph
                    - Clearly separate base time and additional service time` : 
                    ''}
                ${knowledgeBaseResults.relevantInfo[0]?.data?.duration?.total_time ? 
                    `Total journey time: ${knowledgeBaseResults.relevantInfo[0].data.duration.total_time}` : 
                    ''}`;

            // Add context-specific guidance with structure enforcement
            const contextPrompt = context.lastTopic ? 
                `Previous topic was about ${context.lastTopic}. Maintain relevant context.
                 ${knowledgeBaseResults.relevantInfo[0].type !== 'casual_chat' ? 
                   `- If location previously provided, include in first paragraph
                    - Include maps URL at end of first paragraph
                    - Keep supporting details in second paragraph` : ''}` : '';

            // Prepare messages for OpenAI
            const messages = [
                {
                    role: "system",
                    content: `${basePrompt}
                         ${contextPrompt}`
                },
                {
                    role: "user",
                    content: `${knowledgeBaseResults.relevantInfo[0].type === 'casual_chat' ? 
                             'Casual Chat Context: ' + JSON.stringify(knowledgeBaseResults.relevantInfo[0].data) :
                             'Knowledge Base Information: ' + JSON.stringify(knowledgeBaseResults.relevantInfo)}
                             
                             Previous Context: ${JSON.stringify(context)}
                             
                             ${knowledgeBaseResults.relevantInfo[0].type === 'casual_chat' ? 
                               'User Message' : 'User Question'}: ${userMessage}
                             
                             Please provide a natural, conversational response using ONLY the information provided.
                             ${knowledgeBaseResults.relevantInfo[0].type === 'route' ? 
                               'Be specific about journey times. Separate base journey time and any additional service time.' :
                               knowledgeBaseResults.relevantInfo[0].type !== 'casual_chat' ? 
                               'When mentioning locations, always include bus stop numbers and names immediately.' : 
                               'Keep the response friendly but professional, and guide the conversation towards Flybus services.'}`
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
                    context = createContextFields(context, {
                        needsDestination: true,
                        flightTime: timeMatch[0],
                        lastTopic: 'flight_timing'
                    });
                }
            }

            // Preserve important context data with logging
            const previousTopic = context.lastTopic;
            try {
                context = createContextFields(context, {
                    ...knowledgeBaseResults.context,
                    lastTopic: knowledgeBaseResults.context.lastTopic || context.lastTopic,
                    lastQuery: userMessage,
                    timestamp: Date.now()
                });
            } catch (error) {
                console.error('Error updating context:', error);
                // Fallback to basic context if creation fails
                context = createContextFields({}, {
                    lastTopic: 'error',
                    lastQuery: userMessage,
                    timestamp: Date.now()
                });
            }

            // Log context changes
            console.log('Context Update:', {
                previousTopic,
                newTopic: context.lastTopic,
                flightTime: context.flightTime,
                flightDestination: context.flightDestination,
                lastServiceType: context.lastServiceType,
                isGroupBooking: context.isGroupBooking,
                groupDetails: context.groupDetails,
                lastQuery: userMessage,
                timestamp: Date.now()
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

            let updatedContext;
            try {
                updatedContext = createContextFields(context, {
                    lastQuery: userMessage
                });
            } catch (error) {
                console.error('Error creating context fields:', error);
                updatedContext = createContextFields({}, {
                    lastQuery: userMessage,
                    timestamp: Date.now()
                });
            }

            return res.json({
                message: response,
                language: isIcelandic ? 'is' : 'en',
                sessionId: sessionId,
                context: updatedContext
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
            sessionId: sessionId,
            context: createContextFields(context, {
                lastTopic: 'unknown',
                lastQuery: userMessage
            })
        });

    } catch (error) {
        console.error('Error in chat endpoint:', error);
        const errorMessage = "I apologize, but I'm having trouble processing your request right now. Please try again shortly.";
        return res.status(500).json({ 
            message: errorMessage,
            language: isIcelandic ? 'is' : 'en',
            sessionId: sessionId,
            context: createContextFields(context, {
                lastQuery: userMessage || null  // Make sure userMessage is in scope
            })
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
