import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';
import Pusher from 'pusher';
import { v4 as uuidv4 } from 'uuid';

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
            'reykjavik excursions': 'Reykjavík Excursions',  // Correct spelling
            're': 'Reykjavík Excursions',                    // Full name instead of abbreviation
            'bsi': 'BSÍ Bus Terminal',                       // Full name with proper capitalization
            'bus terminal': 'BSÍ Bus Terminal',              // Use full official name
            'golden circle': 'Golden Circle',                // Capitalization
            'northern lights': 'Northern Lights',            // Capitalization
            'south coast': 'South Coast',                    // Capitalization
            'blue lagoon': 'Blue Lagoon',                   // Capitalization
            'pickup': 'pick-up',                            // Hyphenated version
            'drop off': 'drop-off',                         // Hyphenated version
            'guide': 'tour guide',                          // More specific term
            'driver': 'professional driver',                 // More professional term
            'bus': 'coach',                                 // More professional term
            'trip': 'tour',                                 // Preferred term
            'tour bus': 'coach',                           // Consistent terminology
            'mini bus': 'mini-coach',                      // Consistent terminology
            'guest': 'passenger'                           // Preferred term
        }
    }
};

// Greeting responses - Bilingual for Reykjavík Excursions
const GREETING_RESPONSES = {
    english: [
        "Hello! I'm your AI chatbot at Reykjavík Excursions. I can help you with tour information, bookings, and schedules. What would you like to know? 😊"
    ],
    icelandic: [
        "Hæ! Ég er AI spjallmenni hjá Reykjavík Excursions. Hvernig get ég hjálpað? 😊"
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

// Enhanced language detection function
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

        // Simple acknowledgment check
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

        // Temporary response until we implement knowledge base
        const tempResponse = isIcelandic ?
            "Ég er enn að læra um ferðirnar okkar. Vinsamlegast hafðu samband við þjónustuver í síma 580 5400 eða netfangið main@re.is fyrir nánari upplýsingar." :
            "I'm still learning about our tours. Please contact our service center at 580 5400 or email main@re.is for more information.";

        await broadcastConversation(
            userMessage,
            tempResponse,
            isIcelandic ? 'is' : 'en',
            'general',
            'temp_response'
        );

        return res.json({ 
            message: tempResponse,
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
    console.log(`Server running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('OpenAI API Key configured:', !!process.env.OPENAI_API_KEY);
});
