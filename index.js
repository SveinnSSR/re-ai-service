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

// Greeting responses for Flybus
const GREETING_RESPONSES = {
    english: [
        "Hello! I'm your AI assistant at Reykjavík Excursions. I can help you with Flybus airport transfers, schedules, and bookings. What would you like to know? 😊"
    ],
    icelandic: [
        "Hæ! Ég er AI aðstoðarmaður hjá Reykjavík Excursions. Ég get hjálpað þér með Flybus flugvallaleið, tímatöflur og bókanir. Hvernig get ég aðstoðað? 😊"
    ]
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

const ACKNOWLEDGMENT_RESPONSES = {
    english: [
        "What else would you like to know about our tours?",
        "Is there anything specific about our tours you'd like to learn more about?",
        "Would you like information about any other tours?",
        "What other tour information can I help you with?",
        "Feel free to ask about any of our other tours or services!"
    ],
    icelandic: [
        "Hvað annað viltu vita um ferðirnar okkar?",
        "Er eitthvað sérstakt varðandi ferðirnar sem þú vilt fræðast meira um?",
        "Viltu upplýsingar um aðrar ferðir?",
        "Hvaða aðrar upplýsingar get ég veitt þér um ferðirnar?",
        "Ekki hika við að spyrja um aðrar ferðir eða þjónustu!"
    ]
};

// Cache and state management
const responseCache = new Map();
const conversationContext = new Map();

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
    try {
        console.log('\n=== New Chat Request ===');
        console.log('Time:', new Date().toISOString());
        console.log('Message:', req.body.message);
        console.log('Headers:', req.headers);

        const userMessage = req.body.message;
        const sessionId = `session_${Date.now()}`;

        // Early language detection
        const isIcelandic = detectLanguage(userMessage);
        
        // Check for greeting
        if (userMessage.toLowerCase().match(/^(hi|hello|hey|hæ|halló|sæl)/i)) {
            const response = isIcelandic ? 
                GREETING_RESPONSES.icelandic[0] : 
                GREETING_RESPONSES.english[0];

            await broadcastConversation(
                userMessage,
                response,
                isIcelandic ? 'is' : 'en',
                'greeting',
                'direct_response'
            );

            return res.json({ 
                message: response,
                language: isIcelandic ? 'is' : 'en'
            });
        }

        // Initialize or get context
        let context = getContext(sessionId);
        if (!context) {
            context = {
                messages: [],
                lastTopic: null,
                language: isIcelandic ? 'is' : 'en'
            };
        }

        // Get relevant knowledge
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

        // If we have relevant knowledge, generate response using OpenAI
        if (knowledgeBaseResults.relevantInfo.length > 0) {
            // Prepare messages for OpenAI
            const messages = [
                {
                    role: "system",
                    content: `You are a helpful assistant for Reykjavík Excursions Flybus service. 
                             Respond in ${isIcelandic ? 'Icelandic' : 'English'}. 
                             Use only the information provided in the knowledge base.
                             Be friendly but professional, and stay focused on Flybus-related information.`
                },
                {
                    role: "user",
                    content: `Knowledge Base Information: ${JSON.stringify(knowledgeBaseResults.relevantInfo)}
                             
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

            // Update context
            context.messages.push({
                role: "user",
                content: userMessage
            });
            context.messages.push({
                role: "assistant",
                content: response
            });
            context.lastTopic = knowledgeBaseResults.context.lastTopic;
            
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
                language: isIcelandic ? 'is' : 'en'
            });
        }

        // Fallback for simple acknowledgments
        if (userMessage.toLowerCase().match(/^(thanks|thank you|takk|þakka)/i)) {
            const response = isIcelandic ? 
                ACKNOWLEDGMENT_RESPONSES.icelandic[0] : 
                ACKNOWLEDGMENT_RESPONSES.english[0];

            await broadcastConversation(
                userMessage,
                response,
                isIcelandic ? 'is' : 'en',
                'acknowledgment',
                'direct_response'
            );

            return res.json({ 
                message: response,
                language: isIcelandic ? 'is' : 'en'
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
            language: isIcelandic ? 'is' : 'en'
        });

    } catch (error) {
        console.error('Error in chat endpoint:', error);
        const errorMessage = "I apologize, but I'm having trouble processing your request right now. Please try again shortly.";
        return res.status(500).json({ message: errorMessage });
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
