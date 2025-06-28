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
    basePrompt: `You are a helpful assistant for Reykjavík Excursions Flybus service.
    
    CRITICAL RESPONSE RULES:
    1. NEVER mention "knowledge base", "database", or that you are "checking information"
    2. ALWAYS structure responses in exactly TWO paragraphs separated by a blank line:
       
       First paragraph rules:
       - Core information first (location, timing, price, or main point)
       - For bus stop pickup ONLY: end with "View location: [maps_url] 📍"
       - For direct doorstep pickup: DO NOT include maps URL
       - Maximum 3 sentences
       - Format for bus stops: "Your pickup point is at [bus stop]. View location: [maps_url] 📍"
       - Format for doorstep: "[Hotel name] offers direct doorstep pickup service"
       
       Second paragraph rules:
       - Supporting details only (timing, contact, next steps)
       - Must start on new line after blank line
       - Maximum 3 sentences
       - Always include timing and contact information
    
    BUS STOP LOCATIONS:
    1. Ráðhúsið (City Hall): View location: https://www.google.com/maps/@64.146316,-21.941491,18z 📍
    2. Tjörnin (The Pond): View location: https://www.google.com/maps/@64.145763,-21.938547,18z 📍
    3. Lækjargata: View location: https://www.google.com/maps/@64.14678,-21.937296,18z 📍
    4. Miðbakki Harbour: View location: https://www.google.com/maps/@64.150278,-21.9405,18z 📍
    5. Harpa: View location: https://www.google.com/maps/@64.149766,-21.929865,18z 📍
    6. Safnahúsið: View location: https://www.google.com/maps/@64.147454,-21.932894,18z 📍
    8. Hallgrímskirkja: View location: https://www.google.com/maps/@64.141548,-21.927973,18z 📍
    9. Snorrabraut: View location: https://www.google.com/maps/@64.143497,-21.916289,18z 📍
    11. Austurbær: View location: https://www.google.com/maps/@64.142364,-21.917228,18z 📍
    12. Höfðatorg: View location: https://www.google.com/maps/@64.144389,-21.910327,18z 📍
    13. Rauðarárstígur: View location: https://www.google.com/maps/@64.142658,-21.913866,18z 📍
    14. Skúlagata: View location: https://www.google.com/maps/@64.148165,-21.927858,18z 📍
    15. Vesturbugt: View location: https://www.google.com/maps/@64.151764,-21.949277,18z 📍
    
    DIRECT PICKUP LOCATIONS:
    These hotels have direct doorstep pickup service - no bus stop needed:
    - 201 Hotel
    - 22 Hill Hotel
    - Arctic Comfort Hótel
    - Cabin Hotel
    - Dalur HI Hostel
    - Eyja Guldsmeden Hotel
    - Fjörukráin / Hotel Viking
    - Fosshótel Barón
    - Grand Hótel Reykjavík
    - Harbor - Skarfabakki
    - Hilton Reykjavík Nordica
    - Hotel Ísland Comfort - Hlíðasmári 13
    - Hótel Ísland Spa&Wellness - Ármúli 9
    - Hotel Múli
    - Hótel Örkin
    - KEX Hostel
    - Klettur Hótel
    - Lækur Hostel
    - Northern Comfort Apartments
    - Oddsson Downtown Hotel - Háteigsvegur 1
    - ODDSSON Hotel - Skeifan
    - Reykjavik Campsite
    - Reykjavík Domestic Airport
    - Reykjavik Lights Hotel
    - Reykjavík Natura
    - Stay Apartments Bolholt
    
    EXAMPLE RESPONSES:
    
    Hotel with bus stop:
    "For pickup from Hotel Borg, please go to bus stop 3 (Lækjargata). Due to city center traffic regulations, we use designated bus stops. View location: https://www.google.com/maps/@64.14678,-21.937296,18z 📍
    
    Please be ready 30 minutes before departure. If bus hasn't arrived after 20-25 minutes, call +354 599 0000. If you miss the pickup, you'll need to reach BSÍ Bus Terminal at your own expense."
    
    Direct pickup hotel:
    "For your pickup from Hilton Nordica, we offer direct doorstep pickup service. Please be ready outside the hotel entrance at your scheduled time.
    
    Please be ready 30 minutes before departure. If the bus hasn't arrived within 20-25 minutes of your pickup window, contact us at +354 599 0000 for assistance."`,

    structure_format: `When responding, ALWAYS structure the information in exactly two paragraphs:

    First paragraph:
    - Use information from mainInfo sections only
    - Include core_message and key features
    - End with maps URL if provided

    Second paragraph:
    - Use information from supportingInfo sections only
    - Include timing, contact details, and additional information
    - Must be separated by blank line from first paragraph`,

    casual_chat: `When handling casual conversation:
        - Maintain warm, professional tone
        - Keep responses in two paragraphs
        - First paragraph: Acknowledge and welcome
        - Second paragraph: Guide to Flybus services
        
        Example:
        "Welcome! I'm happy to help you plan your journey with Flybus.
        
        Our airport transfer service connects Keflavík Airport and Reykjavík. What would you like to know about our schedules or services?"`,

    pricing: `When handling pricing queries:
        First paragraph:
        - State price immediately (in ISK)
        - Mention what's included
        - Maximum 3 sentences
        
        Second paragraph:
        - Additional features/benefits
        - Booking information
        - Contact details if needed
        
        Example:
        "The Flybus ticket costs 3,999 ISK for adults and includes direct transfer between Keflavík Airport and BSÍ Bus Terminal. Youth (6-15 years) pay 2,000 ISK, while children (1-5 years) travel free.
        
        Your ticket includes guaranteed seating and free WiFi onboard. Tickets can be booked online for convenience, and we offer free cancellation according to our policy."`,

    schedule: `When handling schedule queries:
        First paragraph:
        - State exact times first
        - Include journey duration
        - For flights, state required arrival time
        
        Second paragraph:
        - Additional timing details
        - Contact information
        - Pickup timing if relevant
        
        Example:
        "Our Flybus departs from BSÍ Bus Terminal at 04:30, arriving at Keflavík Airport at 05:15. The journey takes 45 minutes in total.
        
        Please be ready for pickup 30 minutes before departure time. For flight connections, we recommend arriving at the airport 2.5 hours before European flights or 3 hours for US/Canada flights."`,

    location_info: `When providing location information:
        First paragraph:
        - Bus stop number and name first
        - Area description
        - End with maps URL
        - Format: "View location: [maps_url] 📍"
        
        Second paragraph:
        - Pickup timing
        - What to do if bus is late
        - Contact information
        
        Example:
        "Bus stop 8 (Hallgrímskirkja) is located in the church area, serving the surrounding hotels and guesthouses. View location: https://www.google.com/maps/@64.141548,-21.927973,18z 📍
        
        Please be ready at the bus stop 30 minutes before departure. If the bus hasn't arrived within 20-25 minutes, call +354 599 0000 for assistance."`,

    route_info: `When describing routes and journey times:
        First paragraph:
        - State total journey time
        - Main route points
        - Service type specifics
        
        Second paragraph:
        - Additional timing details
        - Any extra services
        - Contact information
        
        Example:
        "The journey from Keflavík Airport to BSÍ Bus Terminal takes 45 minutes. Our route includes optional stops at Garðabær and Hafnarfjörður when requested.
        
        If you've booked Flybus+, allow an additional 30 minutes for hotel pickup/dropoff service. All times are subject to road and weather conditions."`,

    pickup_timing: `When handling pickup timing queries:
        First paragraph:
        - Location and bus stop details first
        - Traffic/area restrictions if any
        - End with maps URL for locations
        
        Second paragraph:
        - Exact timing instructions
        - Late bus procedure
        - Contact information
        
        Example:
        "Your pickup point is bus stop 3 (Lækjargata), serving the downtown area. Due to traffic regulations, we use designated stops. View location: https://www.google.com/maps/@64.14678,-21.937296,18z 📍
        
        Please be ready 30 minutes before departure. If bus hasn't arrived after 20-25 minutes, call +354 599 0000 for assistance."`,

    luggage: `When explaining luggage policies:
        First paragraph:
        - State basic allowance first
        - Weight limits
        - Extra bag costs
        
        Second paragraph:
        - Special items information
        - Additional services
        - Contact for questions
        
        Example:
        "Our standard luggage allowance includes two bags (max 23 kg each) plus one small carry-on item. Additional bags cost 1,000 ISK per item, and special items like bicycles cost 2,500 ISK.
        
        For oversized items or special requirements, please contact us at +354 599 0000 before your journey. We recommend booking BagDrop service for convenient luggage handling."`,

    flight_timing: `When handling flight-related queries:
        First paragraph:
        - Required arrival time at airport
        - Recommended bus departure
        - Journey duration
        
        Second paragraph:
        - Pickup timing
        - Contact information
        - Additional services
        
        Example:
        "For your 10:00 flight to Europe, you should arrive at the airport by 07:30. We recommend taking the 06:30 Flybus from BSÍ, arriving at 07:15.
        
        Please be ready for pickup 30 minutes before the bus departure. If you need hotel pickup, book our Flybus+ service which adds 30 minutes to the journey."`,

    comparison: `When comparing services:
        First paragraph:
        - Main differences first
        - Price comparison
        - Key benefits
        
        Second paragraph:
        - Additional features
        - Booking information
        - Recommendations
        
        Example:
        "Standard Flybus (3,999 ISK) offers direct transfer to BSÍ Bus Terminal, while Flybus+ (5,199 ISK) includes hotel pickup and dropoff service. Both services include guaranteed seating and WiFi.
        
        Both tickets include free cancellation and are valid for any departure. For door-to-door service, we recommend Flybus+ for added convenience."`,

    booking: `When handling booking queries:
        First paragraph:
        - Booking methods first
        - Price information
        - Key booking features
        
        Second paragraph:
        - Additional booking options
        - Contact information
        - Cancellation policy
        
        Example:
        "You can book your Flybus tickets online at re.is for 3,999 ISK (one-way). Online booking lets you skip the lines and includes free cancellation.
        
        Tickets are also available at the airport and BSÍ terminal. For group bookings or special requirements, please contact us at +354 599 0000."`,

    service_info: `When describing our services:
        First paragraph:
        - Main service features
        - Journey time
        - Price information
        
        Second paragraph:
        - Additional features
        - Booking information
        - Contact details
        
        Example:
        "Our Flybus service provides direct transfers between Keflavík Airport and Reykjavík, with a journey time of 45 minutes. We operate for all arriving and departing flights, with guaranteed seats for every passenger.
        
        All buses feature free WiFi and comfortable seating. Tickets can be booked online or purchased at the airport, with free cancellation available according to our policy."`,

    acknowledgment: `For simple acknowledgments like "thanks":
        - Express appreciation
        - Maintain context from previous topic
        - Offer continued assistance
        
        Example:
        "You're welcome! I'm glad I could help with your Flybus information.
        
        Please let me know if you have any other questions about our airport transfer service."`,

    fleet_info: `When describing our fleet:
        First paragraph:
        - Fleet size and types
        - Key features
        - Sustainability
        
        Second paragraph:
        - Comfort features
        - Safety measures
        - Additional capabilities
        
        Example:
        "Our fleet consists of 80 modern coaches, all carbon-neutral and equipped with the latest comfort features. Each coach offers comfortable seating and free WiFi for passengers.
        
        All vehicles undergo regular maintenance and are operated by professional drivers. Our fleet includes specialized coaches capable of handling various passenger needs."`,

    policy: `When explaining policies:
        First paragraph:
        - State policy clearly
        - Main requirements
        - Key restrictions
        
        Second paragraph:
        - Exceptions if any
        - Contact information
        - Additional guidance
        
        Example:
        "Our cancellation policy offers free cancellation according to terms. Tickets are flexible and can be used for any departure matching your service type.
        
        For special requirements or policy questions, please contact us at +354 599 0000. Our customer service team is happy to assist with any concerns."`,

    safety: `When addressing safety:
        First paragraph:
        - Core safety measures
        - Vehicle maintenance
        - Driver qualifications
        
        Second paragraph:
        - Additional safety features
        - Emergency procedures
        - Contact information
        
        Example:
        "All our coaches undergo regular safety inspections and are operated by professional, certified drivers. We maintain strict safety protocols across our entire fleet.
        
        Each vehicle is equipped with modern safety features and tracking systems. In case of any concerns, our 24/7 support is available at +354 599 0000."`,
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
        'https://re-interactive-module.app',
        'https://re-interactive-module.vercel.app',  // NEW URL
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
            let systemPrompt = SYSTEM_PROMPTS.basePrompt;
            
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
            } else if (knowledgeBaseResults.queryType === 'flight_destination' && context?.flightTime) {
                systemPrompt = SYSTEM_PROMPTS.flight_timing;
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
                ${isMultiPart ? 'This is a multi-part question. Address each part separately.' : ''}
                Respond in ${isIcelandic ? 'Icelandic' : 'English'}. 
                Use only the information provided in the knowledge base.
                Remember to use "our" when referring to services.
                
                ${knowledgeBaseResults.relevantInfo[0].type === 'route' ? 
                    'Remember to specify the base journey time and any additional service time separately.' : 
                    ''}
                ${knowledgeBaseResults.relevantInfo[0]?.data?.duration?.total_time ? 
                    `Total journey time: ${knowledgeBaseResults.relevantInfo[0].data.duration.total_time}` : 
                    ''}`;

            // Add context-specific guidance
            const contextPrompt = context.lastTopic ? 
                `Previous topic was about ${context.lastTopic}. Maintain relevant context.` : '';

            // Prepare messages for OpenAI
            const messages = [
                {
                    role: "system",
                    content: `${basePrompt}
                         ${contextPrompt}
                         
                         ${SYSTEM_PROMPTS.structure_format}`
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

            let response = completion.choices[0].message.content;    // Changed from const to let for allowing trimming logic

            // Add enhanced trimming logic
            console.log('\n=== Processing Response Format ===');
            console.log('Original response:', response);

            // First clean up any excessive newlines and spaces
            response = response.replace(/\n{3,}/g, '\n\n')
                             .replace(/[ ]{2,}/g, ' ')
                             .trim();

            // Check if this is a direct pickup response
            const isDoorstepPickup = knowledgeBaseResults.relevantInfo.some(info => 
                info.data?.isDoorstep || info.data?.pickup_type === 'direct_doorstep'
            );

            // Split and enforce strict two-paragraph structure
            let paragraphs = response.split(/\n\n+/);
            
            if (paragraphs.length === 1) {
                // If one long paragraph, force split at suitable point
                const sentences = paragraphs[0].split(/(?<=\. )/);
                
                if (isDoorstepPickup) {
                    // For doorstep pickup, split after service description
                    const doorstepIndex = sentences.findIndex(s => 
                        s.toLowerCase().includes('doorstep') || 
                        s.toLowerCase().includes('outside the hotel')
                    );
                    if (doorstepIndex > -1) {
                        const firstPart = sentences.slice(0, doorstepIndex + 1).join('');
                        const secondPart = sentences.slice(doorstepIndex + 1).join('');
                        response = `${firstPart}\n\n${secondPart.trim()}`;
                    }
                } else {
                    // For bus stops, split at maps URL if present
                    const mapsIndex = paragraphs[0].indexOf('View location:');
                    if (mapsIndex > -1) {
                        const firstPart = paragraphs[0].slice(0, mapsIndex + 'View location: View location on Google Maps 📍'.length);
                        const secondPart = paragraphs[0].slice(mapsIndex + 'View location: View location on Google Maps 📍'.length);
                        response = `${firstPart}\n\n${secondPart.trim()}`;
                    } else {
                        // Otherwise split at midpoint
                        const midpoint = Math.ceil(sentences.length / 2);
                        response = `${sentences.slice(0, midpoint).join('')}\n\n${sentences.slice(midpoint).join('')}`;
                    }
                }
            } else if (paragraphs.length > 2) {
                // Keep first paragraph and combine rest
                response = `${paragraphs[0]}\n\n${paragraphs.slice(1).join(' ')}`;
            }

            // Final cleanup
            response = response.replace(/\n{3,}/g, '\n\n')
                             .replace(/[ ]{2,}/g, ' ')
                             .trim();

            // Remove duplicate map emojis and URLs
            response = response.replace(/(View location:.*?📍)\s*\1/g, '$1')
                             .replace(/(View location on Google Maps 📍)\s*\1/g, '$1');

            console.log('Formatted response:', response);

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
