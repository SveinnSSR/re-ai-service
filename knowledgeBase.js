// knowledgeBase.js - Flybus Section

const flybusKnowledge = {
    basic_info: {
        name: "Flybus Airport Transfer",
        service_types: {
            standard: {
                name: ["Flybus"],
                description: "Direct airport transfer service between Keflavík Airport and BSÍ Bus Terminal in Reykjavík",
                oneway_price: 3999,
                return_price: 7299,
                return_savings: 699  // Add this
            },
            plus: {
                name: ["Flybus+", "Flybus Plus", "Flybus PLUS"],
                description: "Extended service including hotel pickup/dropoff in Reykjavík area",
                oneway_price: 5199,
                return_price: 9399,
                return_savings: 999  // Add this
            }
        },
        service_description: "Direct airport transfer service between Keflavík Airport and Reykjavík",
        service_guarantees: [
            "Seats always guaranteed",
            "Service for every arriving and departing flight",
            "Direct transportation to/from Reykjavík"
        ],
        highlights: [
            {
                title: "Carbon-neutral transfer",
                description: "New, comfortable & carbon-neutral coaches for sustainable travel"
            },
            {
                title: "Flight connection guarantee",
                description: "In connection with all arrivals - if your flight is late, we wait!"
            },
            {
                title: "Convenient booking",
                description: "Book online - skip the lines!"
            },
            {
                title: "Quick journey",
                description: "45 minutes to Reykjavík BSÍ Bus Terminal"
            },
            {
                title: "Onboard amenities",
                description: "Free Wi-Fi on all buses"
            }
        ],
        keywords: ["flybus", "airport transfer", "keflavik", "reykjavik", "bsi", "shuttle", "flybus+", "flybus plus", "plus"],
        context_triggers: ["airport", "transfer", "transport", "bus", "kef", "shuttle", "plus"]
    },

    pricing: {
        standard: {
            name: "Flybus",
            description: "Direct service to/from BSÍ Bus Terminal",
            rates: {
                adult: {
                    oneway: {
                        price: 3999,
                        currency: "ISK"
                    },
                    return: {
                        price: 7299,  // Fix this from 7998
                        currency: "ISK",
                        savings: 699  // Add this
                    }
                },
                youth: {
                    price: 2000,
                    currency: "ISK",
                    age_range: "6-15 years",
                    oneway: {
                        price: 2000,
                        currency: "ISK"
                    },
                    return: {
                        price: 4000,
                        currency: "ISK"
                    }
                },
                children: {
                    price: 0,
                    currency: "ISK",
                    age_range: "1-5 years",
                    oneway: {
                        price: 0,
                        currency: "ISK"
                    },
                    return: {
                        price: 0,
                        currency: "ISK"
                    }
                }
            }
        },
        plus: {
            name: ["Flybus+", "Flybus Plus", "Flybus PLUS"],
            description: "Includes hotel drop-off/pickup service",
            rates: {
                adult: {
                    oneway: {
                        price: 5199,
                        currency: "ISK"
                    },
                    return: {
                        price: 9399,  // Fix this from 10398
                        currency: "ISK",
                        savings: 999  // Add this
                    }
                },
                youth: {
                    price: 2600,
                    currency: "ISK",
                    age_range: "6-15 years",
                    oneway: {
                        price: 2600,
                        currency: "ISK"
                    },
                    return: {
                        price: 5200,
                        currency: "ISK"
                    }
                },
                children: {
                    price: 0,
                    currency: "ISK",
                    age_range: "1-5 years",
                    oneway: {
                        price: 0,
                        currency: "ISK"
                    },
                    return: {
                        price: 0,
                        currency: "ISK"
                    }
                }
            }
        },
        limits: {
            youth_per_adult: 40,
            children_per_adult: 2
        },
        features: [
            "Free Cancellation (according to cancellation policy)",
            "No Booking Fees",
            "Return tickets available",
            "Guaranteed seats on all departures",
            "Service for every arriving and departing flight"
        ],
        keywords: ["price", "cost", "fee", "rates", "ticket", "booking", "return", "plus", "one way", "oneway", "youth", "child", "children"]
    },

    schedules: {
        airport_to_city: {
            description: "Flybus operates in connection with all arriving flights at Keflavik Airport",
            timing: "Bus departs 35-45 minutes after each flight arrival",
            location: "Right outside the terminal area",
            flexibility: "Tickets are flexible on date, take any available bus"
        },
        city_to_airport: {
            base_location: "BSÍ Bus Terminal",
            regular_departures: [
                { pickup: "03:00", bsi: "03:30", arrival: "04:15" },
                { pickup: "04:00", bsi: "04:30", arrival: "05:15" },
                { pickup: "05:00", bsi: "05:30", arrival: "06:15" },
                { pickup: "06:00", bsi: "06:30", arrival: "07:15" },
                { pickup: "07:00", bsi: "07:30", arrival: "08:15" },
                { pickup: "08:00", bsi: "08:30", arrival: "09:15" },
                { pickup: "09:00", bsi: "09:30", arrival: "10:15" },
                { pickup: "10:30", bsi: "11:00", arrival: "11:45" },
                { pickup: "11:30", bsi: "12:00", arrival: "12:45" },
                { pickup: "12:30", bsi: "13:00", arrival: "13:45" },
                { pickup: "13:30", bsi: "14:00", arrival: "14:45" },
                { pickup: "15:00", bsi: "15:30", arrival: "16:15" },
                { pickup: "16:00", bsi: "16:30", arrival: "17:15" },
                { pickup: "17:30", bsi: "18:00", arrival: "18:45" },
                { pickup: "19:30", bsi: "20:00", arrival: "20:45" },
                { pickup: "21:00", bsi: "21:30", arrival: "22:15" },
                { pickup: "22:00", bsi: "22:30", arrival: "23:15" }
            ],
            timing_guidelines: {
                europe_flights: "Arrive 2.5 hours before departure",
                us_canada_flights: "Arrive 3 hours before departure"
            }
        },
        keywords: ["schedule", "timetable", "departure", "arrival", "time", "when"]
    },

    luggage: {
        standard_allowance: {
            main_luggage: {
                pieces: 2,
                max_weight: 23,
                weight_unit: "kg"
            },
            carry_on: {
                pieces: 1,
                description: "small carry-on item"
            }
        },
        special_items: {
            bicycle: {
                price: 2500,
                currency: "ISK",
                conditions: [
                    "Subject to space availability",
                    "Preferably packaged in boxes",
                    "Unpackaged bikes must have pedals removed and chain covered"
                ]
            },
            extra_bags: {
                price: 1000,
                currency: "ISK",
                description: "Per additional item (golf bags, skis, etc.)"
            }
        },
        policies: [
            "No liability for fragile valuables or perishable articles",
            "All baggage must be claimed promptly upon arrival"
        ],
        keywords: ["luggage", "bag", "suitcase", "bicycle", "bike", "weight", "extra"]
    },

    special_services: {
        child_seats: {
            availability: "Available upon request",
            booking: "Contact Customer Service 24 hours in advance",
            age_restrictions: [
                {
                    age: "1-3 years",
                    requirement: "Must use appropriate child car seats"
                },
                {
                    age: "3-4 years and older (over 18 kg)",
                    requirement: "Can use normal seat belts"
                },
                {
                    age: "Under 1 year",
                    restriction: "Cannot be accommodated due to safety requirements"
                }
            ]
        },
        wheelchair_access: {
            standard: "Accessible for passengers with foldable manual wheelchairs who can board with minimal assistance",
            electric: "Electric wheelchair users referred to Prime Tours",
            keywords: ["wheelchair", "accessible", "disability", "mobility"]
        }
    },

    locations: {
        general_info: {
            description: "Comprehensive pickup and dropoff service in Reykjavík area",
            booking_notice: "Pickup must be booked at least 2 hours before departure",
            contact: "+354 599 0000",
            maps: {
                all_stops: "https://www.google.com/maps/d/u/0/embed?mid=16_CecpP8J8JNlIFoP6tdwKhPVPiUUG4"
            },
            timing_rules: {
                pickup_window: "30 minutes before scheduled departure",
                arrival_instructions: "Be ready and visible outside at pickup location",
                waiting_time: "Bus could arrive anytime within the 30-minute window"
            }
        },
        bus_stops: {
            "1": {
                name: "Ráðhúsið - City Hall",
                location_info: {
                    coordinates: { lat: "64.146316", lng: "-21.941491" },
                    maps_url: "https://www.google.com/maps/dir/64.146316,-21.941491",
                    area: "downtown"
                },
                serviced_hotels: [
                    "3 Sisters Guesthouse",
                    "Centerhotel Plaza",
                    "Chez Monique",
                    "Embassy Luxury Apartments",
                    "Gallery Central Guesthouse",
                    "Guesthouse Álfhóll",
                    "Guesthouse Butterfly",
                    "Hotel Hilda",
                    "Hotel Metropolitan",
                    "Hotel Reykjavík Centrum",
                    "House Of Spirits",
                    "Kvosin Hotel",
                    "Reykjavik Downtown Hostel",
                    "Iceland Parliament Hotel"
                ]
            },
            "2": {
                name: "Tjörnin - The Pond",
                location_info: {
                    coordinates: { lat: "64.145763", lng: "-21.938547" },
                    maps_url: "https://www.google.com/maps/dir/64.145763,-21.938547",
                    area: "downtown"
                },
                serviced_hotels: [
                    "Ambassade Apartments",
                    "Castle House Luxury Apartments",
                    "Central Guesthouse",
                    "Hotel Reykjavik Saga",
                    "Luna Hotel Apartments - Amtmannsstígur 5",
                    "Luna Hotel Apartments - Spítalastígur 1"
                ]
            },
            "3": {
                name: "Lækjargata",
                location_info: {
                    coordinates: { lat: "64.14678", lng: "-21.937296" },
                    maps_url: "https://www.google.com/maps/dir/64.14678,-21.937296",
                    area: "downtown"
                },
                serviced_hotels: [
                    "1912 Guesthouse",
                    "Apotek Hotel",
                    "Black Pearl",
                    "Centerhotel Þingholt",
                    "Central Apartments",
                    "City Center Hotel",
                    "Downtown Guesthouse",
                    "Reykjavík Konsulate Hotel",
                    "Hotel Borg",
                    "Ocean Comfort Apartments",
                    "Radisson Blu Hotel 1919",
                    "Loft Hostel"
                ]
            },
            "4": {
                name: "Miðbakki Harbour",
                location_info: {
                    coordinates: { lat: "64.150278", lng: "-21.9405" },
                    maps_url: "https://www.google.com/maps/dir/64.150278,-21.9405",
                    area: "harbor"
                },
                serviced_hotels: [
                    "Exeter Hotel",
                    "Lighthouse Apartments",
                    "Ocean Comfort Apartments",
                    "Planet Apartments"
                ]
            },
            "5": {
                name: "Harpa",
                location_info: {
                    coordinates: { lat: "64.149766", lng: "-21.929865" },
                    maps_url: "https://www.google.com/maps/dir/64.149766,-21.929865",
                    area: "harbor"
                },
                serviced_hotels: [
                    "Centerhotel Arnarhvoll",
                    "The Reykjavik EDITION"
                ]
            },
            "6": {
                name: "Safnahúsið - The Culture House",
                location_info: {
                    coordinates: { lat: "64.147454", lng: "-21.932894" },
                    maps_url: "https://www.google.com/maps/dir/64.147454,-21.932894",
                    area: "downtown"
                },
                serviced_hotels: [
                    "101 Hótel",
                    "Apartment K - Hverfisgata 14",
                    "Apartment K - Ingólfsstræti 1a",
                    "Apartment K - Skólastræti 1",
                    "Apartment K - Þingholtsstræti 2-4",
                    "Canopy Reykjavík | City Centre",
                    "Hótel Frón"
                ]
            },
            "8": {
                name: "Hallgrímskirkja",
                location_info: {
                    coordinates: { lat: "64.141548", lng: "-21.927973" },
                    maps_url: "https://www.google.com/maps/dir/64.141548,-21.927973",
                    area: "hallgrimskirkja_area"
                },
                serviced_hotels: [
                    "Eric The Red Guesthouse",
                    "Forsæla Apartments",
                    "Freyja Guesthouse",
                    "Gest Inn",
                    "Guesthouse Aurora",
                    "Hostel B47",
                    "Hotel Leifur Eiríksson",
                    "Hotel Óðinsvé",
                    "Inga's New Guest Apartments",
                    "Loki 101 Guesthouse",
                    "Luna Hotel Apartments - Baldursgata 36",
                    "Mengi Apartments",
                    "Our House Guesthouse",
                    "SUNNA Guesthouse",
                    "Villa Guesthouse"
                ]
            },
            "9": {
                name: "Snorrabraut",
                location_info: {
                    coordinates: { lat: "64.143497", lng: "-21.916289" },
                    maps_url: "https://www.google.com/maps/dir/64.143497,-21.916289",
                    area: "laugavegur"
                },
                serviced_hotels: [
                    "Centerhotel Laugavegur",
                    "Skuggi Hotel",
                    "4th Floor Hotel",
                    "100 Iceland Hotel",
                    "101 Guesthouse",
                    "Alda Hotel Reykjavik",
                    "Alfred's Apartments",
                    "Apartment K - Laugavegur 74",
                    "Apartment K - Laugavegur 85-86",
                    "City Comfort Apartments",
                    "Guesthouse Von",
                    "Heida's Home",
                    "Hlemmur Apartments",
                    "Luna Hotel Apartments - Laugavegur 86",
                    "OK Hotel",
                    "Reykjavik4you Apartments - Laugavegi 85",
                    "Stay Apartments - Laugavegur 139"
                ],
                area_notes: {
                    description: "Located along Laugavegur shopping street",
                    walking_distance: "15-20 minutes to city center"
                }
            },
            "11": {
                name: "Austurbær",
                location_info: {
                    coordinates: { lat: "64.142364", lng: "-21.917228" },
                    maps_url: "https://www.google.com/maps/dir/64.142364,-21.917228",
                    area: "east_central"
                },
                serviced_hotels: [
                    "Grettisborg Apartments",
                    "Guesthouse Snorri",
                    "Reykjavik Hostel Village",
                    "Stay Apartments Grettisgata"
                ]
            },
            "12": {
                name: "Höfðatorg",
                location_info: {
                    coordinates: { lat: "64.144389", lng: "-21.910327" },
                    maps_url: "https://www.google.com/maps/dir/64.144389,-21.910327",
                    area: "business_district"
                },
                serviced_hotels: [
                    "Fosshótel Reykjavík",
                    "Storm Hotel",
                    "Tower Suites"
                ],
                area_notes: {
                    description: "Business district location",
                    landmarks: ["Höfðatorg Tower", "Grand Hotel vicinity"]
                }
            },
            "13": {
                name: "Rauðarárstígur",
                location_info: {
                    coordinates: { lat: "64.142658", lng: "-21.913866" },
                    maps_url: "https://www.google.com/maps/dir/64.142658,-21.913866",
                    area: "east_central"
                },
                serviced_hotels: [
                    "Centerhotel Miðgarður",
                    "Downtown Reykjavik Apartments",
                    "Fosshótel Rauðará",
                    "Fosshótel Lind",
                    "Guesthouse Pávi",
                    "Hotel Phoenix",
                    "Stay Apartments Einholt"
                ]
            },
            "14": {
                name: "Skúlagata",
                location_info: {
                    coordinates: { lat: "64.148165", lng: "-21.927858" },
                    maps_url: "https://www.google.com/maps/dir/64.148165,-21.927858",
                    area: "city_center"
                },
                serviced_hotels: [
                    "101 Skuggi Guesthouse",
                    "Alfred's Studios",
                    "Apartment 37",
                    "Apartment K - Bergstaðastræti 12",
                    "Apartment K - Bergstaðastræti 3",
                    "Apartment K - Hverfisgata 37",
                    "Apartment K - Laugavegur 46",
                    "Apartment K - Lindargata 60",
                    "Apartments Aurora",
                    "Black Tower",
                    "Centerhotel Klöpp",
                    "Centerhotel Skjaldbreið",
                    "Domus Guesthouse",
                    "Gray Tower",
                    "Guesthouse Óðinn",
                    "Guesthouse Turninn",
                    "ION City Hotel",
                    "Ísland Apartments",
                    "Luna Hotel Apartments - Laugavegur 37",
                    "Old Charm Reykjavik Apartments",
                    "Rey Apartments",
                    "Reykjavik Residence Hotel",
                    "Reykjavik Residence Suites",
                    "Reykjavik4you Apartments - Bergstaðastræti 12",
                    "Room With A View",
                    "Sand Hotel",
                    "The Swan House Reykjavik Apartments"
                ]
            },
            "15": {
                name: "Vesturbugt",
                location_info: {
                    coordinates: { lat: "64.151764", lng: "-21.949277" },
                    maps_url: "https://www.google.com/maps/dir/64.151764,-21.949277",
                    area: "west_harbor"
                },
                serviced_hotels: [
                    "Centerhotel Grandi",
                    "Reykjavik Marina"
                ]
            }
        },
        direct_pickup: {
            hotels: [
                {
                    name: "201 Hotel",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "22 Hill Hotel",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Arctic Comfort Hótel",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Cabin Hotel",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Dalur HI Hostel",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Eyja Guldsmeden Hotel",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Fjörukráin / Hotel Viking",
                    area: "hafnarfjordur",
                    type: "direct_doorstep"
                },
                {
                    name: "Fosshótel Barón",
                    area: "city_center",
                    type: "direct_doorstep"
                },
                {
                    name: "Grand Hótel Reykjavík",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Harbor - Skarfabakki",
                    area: "harbor",
                    type: "direct_doorstep"
                },
                {
                    name: "Hilton Reykjavík Nordica",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Hotel Ísland Comfort - Hlíðasmári 13",
                    area: "kopavogur",
                    type: "direct_doorstep"
                },
                {
                    name: "Hótel Ísland Spa&Wellness - Ármúli 9",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Hotel Múli",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Hótel Örkin",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "KEX Hostel",
                    area: "city_center",
                    type: "direct_doorstep"
                },
                {
                    name: "Klettur Hótel",
                    area: "city_center",
                    type: "direct_doorstep"
                },
                {
                    name: "Lækur Hostel",
                    area: "city_center",
                    type: "direct_doorstep"
                },
                {
                    name: "Northern Comfort Apartments",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Oddsson Downtown Hotel - Háteigsvegur 1",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "ODDSSON Hotel - Skeifan",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Reykjavik Campsite",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Reykjavík Domestic Airport",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Reykjavik Lights Hotel",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Reykjavík Natura",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                },
                {
                    name: "Stay Apartments Bolholt",
                    area: "outside_downtown",
                    type: "direct_doorstep"
                }
            ]
        },
        area_definitions: {
            downtown: {
                name: "Downtown Reykjavík",
                description: "Central city area, including main shopping streets",
                landmarks: ["City Hall", "The Pond", "Lækjargata"],
                walking_radius: "5-10 minutes"
            },
            hallgrimskirkja_area: {
                name: "Hallgrímskirkja Area",
                description: "Around Iceland's largest church",
                landmarks: ["Hallgrímskirkja Church", "Skólavörðustígur"],
                walking_radius: "10-15 minutes to city center"
            },
            harbor: {
                name: "Harbor Area",
                description: "Old harbor and Harpa Concert Hall area",
                landmarks: ["Harpa", "Maritime Museum", "Harbor"],
                walking_radius: "5-10 minutes to city center"
            },
            laugavegur: {
                name: "Laugavegur",
                description: "Main shopping street and surrounding area",
                landmarks: ["Hlemmur Food Hall", "Shopping Street"],
                walking_radius: "Within walking distance of attractions"
            }
        },
        hotel_chains: {
            "Apartment K": {
                locations: ["Hverfisgata 14", "Ingólfsstræti 1a", "Skólastræti 1", 
                          "Þingholtsstræti 2-4", "Laugavegur 74", "Laugavegur 85-86"],
                description: "Serviced apartments in central locations"
            },
            "Luna Hotel Apartments": {
                locations: ["Amtmannsstígur 5", "Spítalastígur 1", "Baldursgata 36", 
                          "Laugavegur 86"],
                description: "Modern apartment accommodations"
            }
        },

        keywords: [
            "pickup", "drop off", "bus stop", "location", "hotel", 
            "terminal", "bsi", "where", "hafnarfjordur", "gardabaer", 
            "downtown"
        ]
    }
};

// Fuzzy matching utilities.
const fuzzyMatch = (text, pattern) => {
    text = text.toLowerCase();
    pattern = pattern.toLowerCase();
    
    // Allow for common misspellings and variations
    const variations = {
        'keflavik': ['keflavík', 'kef', 'keflvik'],
        'reykjavik': ['reykjavík', 'reyk', 'rek'],
        'flybus': ['fly bus', 'fly-bus', 'airport bus'],
        'flybus+': ['flybus plus', 'flybus+', 'flybus PLUS', 'flybusplus'],
        'terminal': ['termial', 'terminl'],
        'schedule': ['timetable', 'time table', 'times'],
        'luggage': ['baggage', 'bags', 'suitcase']
    };
    
    // Check for direct matches and variations
    return variations[pattern]?.some(variant => text.includes(variant)) || text.includes(pattern);
};

// Service type detection
const detectServiceType = (query) => {
    query = query.toLowerCase();
    const plusVariations = ['plus', 'flybus+', 'flybus plus', 'flybus+'];
    return plusVariations.some(v => query.includes(v)) ? 'plus' : 'standard';
};

// Query type detection
const detectQueryType = (query) => {
    if (!query) return 'direct';
    query = query.toLowerCase().trim();
    
    // Comparison queries (this was a key issue in test results)
    if (query.match(/^(which|what)\s+(one|type|option|service|bus)\s+(is|costs?)\s+(cheaper|more|better|faster)/i) ||
        query.match(/compare|difference between/i)) {
        return 'comparison';
    }
    
    // Simple confirmations and negations
    if (query.match(/^(yes|yeah|ok|sure)\s*$/i)) return 'confirmation';
    if (query.match(/^(no|nope|not)\s*$/i)) return 'negation';
    
    // Booking intent
    if (query.match(/\b(book|reserve|purchase|buy)\b/i)) return 'booking';
    
    // Follow-up questions
    if (query.match(/^(what about|how about|and|but)\s/i) ||
        query.match(/^(is|does|do)\s+that/i)) {
        return 'followup';
    }

    // Price queries
    if (query.match(/\b(price|cost|fee|how much)\b/i)) return 'pricing';

    return 'direct';
};

// Context awareness for multi-turn conversations
const conversationContext = new Map();

const updateContext = (sessionId, newContext) => {
    const currentContext = conversationContext.get(sessionId) || {};
    conversationContext.set(sessionId, {
        ...currentContext,
        ...newContext,
        timestamp: Date.now()
    });
};

const getContext = (sessionId) => {
    const context = conversationContext.get(sessionId);
    if (!context) return null;
    
    // Clear context if it's older than 30 minutes
    if (Date.now() - context.timestamp > 30 * 60 * 1000) {
        conversationContext.delete(sessionId);
        return null;
    }
    
    return context;
};

// Add new functions here, after getContext and before LocationUtils
const enrichContext = (context, query) => {
    const serviceType = detectServiceType(query);
    const groupMatch = query.match(/(\d+)\s*(adult|child|children|youth|teenager)/gi);
    const isGroupBooking = groupMatch !== null || context.isGroupBooking;
    
    return {
        ...context,
        lastServiceType: serviceType,
        isGroupBooking,
        groupDetails: isGroupBooking ? (parseGroupDetails(query) || context.groupDetails) : null,
        previousQuery: context.lastQuery,
        lastQuery: query,
        queryType: detectQueryType(query),
        timestamp: Date.now()
    };
};

const parseGroupDetails = (query) => {
    const counts = {
        adults: 0,
        youths: 0,
        children: 0
    };
    
    // Match patterns like "2 adults", "3 children", etc.
    const matches = query.matchAll(/(\d+)\s*(adult|child|children|youth|teenager)s?/gi);
    for (const match of matches) {
        const count = parseInt(match[1]);
        const type = match[2].toLowerCase();
        
        if (type.startsWith('adult')) {
            counts.adults += count;
        } else if (type.startsWith('youth') || type.includes('teen')) {
            counts.youths += count;
        } else if (type.startsWith('child')) {
            counts.children += count;
        }
    }
    
    return counts;
};

const calculateGroupPrice = (adults, youths, children, serviceType, isReturn) => {
    const pricing = flybusKnowledge.pricing[serviceType];
    return {
        total: (adults * pricing.rates.adult[isReturn ? 'return' : 'oneway'].price) +
               (youths * pricing.rates.youth[isReturn ? 'return' : 'oneway'].price),
        breakdown: {
            adults: {
                count: adults,
                price: pricing.rates.adult[isReturn ? 'return' : 'oneway'].price,
                subtotal: adults * pricing.rates.adult[isReturn ? 'return' : 'oneway'].price
            },
            youths: {
                count: youths,
                price: pricing.rates.youth[isReturn ? 'return' : 'oneway'].price,
                subtotal: youths * pricing.rates.youth[isReturn ? 'return' : 'oneway'].price
            },
            children: {
                count: children,
                price: 0,
                subtotal: 0
            }
        },
        limits: {
            youthExceeded: youths > adults * flybusKnowledge.pricing.limits.youth_per_adult,
            childrenExceeded: children > adults * flybusKnowledge.pricing.limits.children_per_adult
        }
    };
};

// Enhanced search utilities for Flybus locations
const LocationUtils = {
    normalizeIcelandic: (text) => {
        if (!text) return '';
        const charMap = {
            'á': 'a', 'Á': 'A',
            'é': 'e', 'É': 'E',
            'í': 'i', 'Í': 'I',
            'ó': 'o', 'Ó': 'O',
            'ú': 'u', 'Ú': 'U',
            'ý': 'y', 'Ý': 'Y',
            'þ': 'th', 'Þ': 'Th',
            'æ': 'ae', 'Æ': 'Ae',
            'ö': 'o', 'Ö': 'O',
            'ð': 'd', 'Ð': 'D'
        };
        return text.replace(/[áéíóúýþæöðÁÉÍÓÚÝÞÆÖÐ]/g, char => charMap[char] || char);
    },

    calculateDistance: (coord1, coord2) => {
        const toRad = x => (x * Math.PI) / 180;
        const R = 6371; // Earth's radius in km

        const dLat = toRad(parseFloat(coord2.lat) - parseFloat(coord1.lat));
        const dLon = toRad(parseFloat(coord2.lng) - parseFloat(coord1.lng));
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(toRad(parseFloat(coord1.lat))) * Math.cos(toRad(parseFloat(coord2.lat))) * 
                 Math.sin(dLon/2) * Math.sin(dLon/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    },

    getWalkingTime: (distanceKm) => {
        const walkingSpeedKmH = 5; // Average walking speed
        return Math.round(distanceKm / walkingSpeedKmH * 60); // Returns minutes
    },

    fuzzyMatchHotel: (searchTerm, hotelName) => {
        const normalizedSearch = LocationUtils.normalizeIcelandic(searchTerm.toLowerCase()).trim();
        const normalizedHotel = LocationUtils.normalizeIcelandic(hotelName.toLowerCase()).trim();

        // Direct match check
        if (normalizedHotel.includes(normalizedSearch)) return true;

        const hotelChains = {
            'fosshotal': ['fosshotel', 'foss hotel'],
            'centerhotel': ['center hotel', 'centralhotel'],
            'guesthouse': ['guest house', 'guesth.'],
            'apartments': ['apt', 'apartment']
        };

        return Object.entries(hotelChains).some(([chain, variations]) => {
            if (normalizedHotel.includes(chain)) {
                return variations.some(v => normalizedSearch.includes(v));
            }
            return false;
        });
    },

    searchLocation: (query) => {
        const searchResults = {
            exactMatches: [],
            partialMatches: [],
            areaMatches: [],
            suggestions: [],
            landmarks: []
        };

        if (!query) return searchResults;

        const normalizedQuery = LocationUtils.normalizeIcelandic(query.toLowerCase());

        // Search through areas first
        Object.entries(flybusKnowledge.locations.area_definitions).forEach(([areaKey, area]) => {
            const normalizedAreaName = LocationUtils.normalizeIcelandic(area.name.toLowerCase());
            if (normalizedAreaName.includes(normalizedQuery)) {
                searchResults.areaMatches.push({
                    type: 'area',
                    key: areaKey,
                    name: area.name,
                    description: area.description,
                    landmarks: area.landmarks
                });

                // Find all stops in this area
                Object.entries(flybusKnowledge.locations.bus_stops)
                    .filter(([_, stop]) => stop.location_info.area === areaKey)
                    .forEach(([stopNum, stop]) => {
                        searchResults.suggestions.push({
                            type: 'areaStop',
                            stopNumber: stopNum,
                            name: stop.name,
                            area: area.name,
                            walkingRadius: area.walking_radius
                        });
                    });
            }
        });

        // Search through bus stops and their hotels
        Object.entries(flybusKnowledge.locations.bus_stops).forEach(([stopNum, stop]) => {
            const normalizedStopName = LocationUtils.normalizeIcelandic(stop.name.toLowerCase());
            if (normalizedStopName.includes(normalizedQuery)) {
                searchResults.exactMatches.push({
                    type: 'busStop',
                    number: stopNum,
                    name: stop.name,
                    location: stop.location_info,
                    serviced_hotels_count: stop.serviced_hotels.length
                });
            }

            // Check hotels at this stop
            stop.serviced_hotels.forEach(hotel => {
                if (LocationUtils.fuzzyMatchHotel(query, hotel)) {
                    searchResults.exactMatches.push({
                        type: 'hotel',
                        name: hotel,
                        busStop: stopNum,
                        stopName: stop.name,
                        distance: LocationUtils.calculateDistance(
                            stop.location_info.coordinates,
                            flybusKnowledge.locations.bus_stops["1"].location_info.coordinates // Distance from city center
                        )
                    });
                }
            });
        });

        // Search through direct pickup hotels
        flybusKnowledge.locations.direct_pickup.hotels.forEach(hotel => {
            if (LocationUtils.fuzzyMatchHotel(query, hotel.name)) {
                searchResults.exactMatches.push({
                    type: 'directPickup',
                    name: hotel.name,
                    area: hotel.area,
                    pickupType: 'direct_doorstep'
                });
            }
        });

        // Generate suggestions if no exact matches
        if (searchResults.exactMatches.length === 0 && searchResults.areaMatches.length === 0) {
            const commonVariations = {
                'hotel': ['hotl', 'htl', 'hótel'],
                'guesthouse': ['guest house', 'ghouse', 'gestahús'],
                'hostel': ['hostl', 'hstel', 'farfuglaheimili'],
                'apartment': ['apt', 'apts', 'íbúð']
            };

            Object.entries(commonVariations).forEach(([correct, variations]) => {
                if (variations.some(v => normalizedQuery.includes(v))) {
                    Object.values(flybusKnowledge.locations.bus_stops).forEach(stop => {
                        stop.serviced_hotels
                            .filter(hotel => hotel.toLowerCase().includes(correct))
                            .forEach(hotel => searchResults.suggestions.push({
                                type: 'suggestion',
                                original: query,
                                suggested: hotel,
                                reason: `Similar to what you're looking for (${correct})`
                            }));
                    });
                }
            });
        }

        return searchResults;
    }
};

// Flight timing response generator
const generateFlightResponse = (query, flightContext) => {
    console.log('\n=== Generating Flight Response ===');
    console.log('Query:', query);
    console.log('Context:', flightContext);
    
    // Extract time if present in query
    const timeMatch = query.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    const timeFromQuery = timeMatch ? timeMatch[0] : null;
    const time = timeFromQuery || flightContext?.flightTime;

    // Enhanced destination extraction
    let destination = null;
    const destinationMatch = query.toLowerCase().match(/\b(to|for)\s+(us|canada|europe)\b/i);
    if (destinationMatch) {
        destination = destinationMatch[2].includes('europe') ? 'europe' : 'us_canada';
    } else if (query.toLowerCase().includes('europe') || 
               query.toLowerCase().includes('spain') || 
               query.toLowerCase().includes('france')) {
        destination = 'europe';
    } else if (query.toLowerCase().includes('us') || 
               query.toLowerCase().includes('usa') || 
               query.toLowerCase().includes('canada') || 
               query.toLowerCase().includes('new york')) {
        destination = 'us_canada';
    } else {
        destination = flightContext?.flightDestination;
    }

    console.log('Extracted time:', time, 'destination:', destination);

    // If we have both time and destination, generate complete response
    if (time && destination) {
        // Enhanced time conversion to 24h format
        let hours = parseInt(time.match(/\d+/)[0]);
        const minutes = timeMatch?.[2] ? parseInt(timeMatch[2]) : 0;
        const meridian = time.toLowerCase().match(/pm|am/)?.[0];
        
        // Handle AM/PM conversion
        if (meridian === 'pm' && hours !== 12) hours += 12;
        if (meridian === 'am' && hours === 12) hours = 0;
        
        console.log('Converted time:', `${hours}:${minutes}`);

        // Calculate required arrival time
        const arrivalHours = destination === 'europe' ? 2.5 : 3;
        let requiredArrivalHours = hours - arrivalHours;
        
        // Handle overnight cases
        if (requiredArrivalHours < 0) {
            requiredArrivalHours += 24;
        }
        
        const targetArrivalTime = requiredArrivalHours + (minutes / 60);
        console.log('Target arrival time:', targetArrivalTime);

        // Find appropriate bus from schedule
        const schedule = [...flybusKnowledge.schedules.city_to_airport.regular_departures];
        schedule.reverse(); // Start from latest to earliest

        const appropriateBus = schedule.find(dep => {
            const [busHour, busMinute] = dep.arrival.split(':').map(num => parseInt(num));
            const busArrivalTime = busHour + (busMinute / 60);
            
            // Handle overnight cases
            const adjustedArrivalTime = busArrivalTime < 3 ? busArrivalTime + 24 : busArrivalTime;
            const adjustedTargetTime = targetArrivalTime < 3 ? targetArrivalTime + 24 : targetArrivalTime;
            
            return adjustedArrivalTime <= adjustedTargetTime;
        });

        if (appropriateBus) {
            // Format times for display
            const requiredArrivalFormatted = `${Math.floor(requiredArrivalHours)}:${Math.round((requiredArrivalHours % 1) * 60).toString().padStart(2, '0')}`;
            
            return {
                type: 'flight_schedule',
                data: {
                    flightTime: time,
                    destination: destination,
                    requiredArrival: requiredArrivalFormatted,
                    recommendedBus: appropriateBus,
                    message: `For your ${time} flight to ${destination === 'europe' ? 'Europe' : 'US/Canada'}, ` +
                            `you should arrive at the airport by ${requiredArrivalFormatted}. ` +
                            `I recommend taking the Flybus that departs from BSÍ Bus Terminal at ${appropriateBus.bsi}, ` +
                            `which arrives at the airport at ${appropriateBus.arrival}. ` +
                            `This gives you plenty of time for check-in and security. Safe travels!`
                }
            };
        }
    }

    // Return more informative responses when missing info.
    return {
        type: 'flight_inquiry',
        data: {
            hasTime: !!time,
            hasDestination: !!destination,
            flightTime: time,            // Preserve context
            flightDestination: destination,
            message: !time && !destination ? 
                "To assist you better, could you please provide me with the departure time of your flight and the destination? This information will help me determine the best time for you to take the Flybus." :
                !time ? 
                "What time is your flight? I'll help you find the best bus connection." :
                "Could you let me know if your flight is to Europe or to the US/Canada? This will help me provide the correct arrival time recommendation as the requirements are different."
        }
    };
};

// Knowledge retrieval function
const getRelevantKnowledge = (query, context = {}) => {
    query = query.toLowerCase();
    
    // Enrich context with new information
    const enrichedContext = enrichContext(context, query);

    // Add the console log here
    console.log('\n=== Query Type Detection ===');
    console.log('Query:', query);
    console.log('Query type:', detectQueryType(query));    
    
    const results = {
        relevantInfo: [],
        context: enrichedContext,
        confidence: 0
    };

    // Add the comparison handler here, before any other checks
    const queryType = detectQueryType(query);
    
    if (queryType === 'comparison') {
        results.relevantInfo.push({
            type: 'service_comparison',
            data: {
                standard: {
                    name: "Standard Flybus",
                    price: flybusKnowledge.basic_info.service_types.standard.oneway_price,
                    description: "Direct service to BSÍ Bus Terminal"
                },
                plus: {
                    name: "Flybus Plus",
                    price: flybusKnowledge.basic_info.service_types.plus.oneway_price,
                    description: "Includes hotel pickup/dropoff service"
                }
            }
        });
        results.confidence = 0.95;
        results.context = enrichedContext;
        return results;
    }    

    // Direct inquiries about Flybus service
    if (query.includes('flybus') || query.includes('airport transfer') || 
        query.includes('airport bus') || query.includes('kef')) {
        results.relevantInfo.push({
            type: 'service_overview',
            data: {
                basic_info: flybusKnowledge.basic_info,
                highlights: flybusKnowledge.basic_info.highlights
            }
        });
        results.confidence = 0.9;
    }

    // Location and hotel related queries
    if (query.includes('hotel') || query.includes('stay') || query.includes('location') || 
        query.includes('pickup') || query.includes('where') || query.includes('bus stop') ||
        query.includes('drop') || query.includes('downtown') || query.includes('terminal')) {
        
        // Check for specific bus stop number queries
        const busStopMatch = query.match(/bus stop (\d+)/i) || query.match(/stop (\d+)/i);
        if (busStopMatch) {
            const stopNumber = busStopMatch[1];
            const stopInfo = flybusKnowledge.locations.bus_stops[stopNumber];
            if (stopInfo) {
                results.relevantInfo.push({
                    type: 'bus_stop',
                    data: {
                        number: stopNumber,
                        name: stopInfo.name,
                        location: stopInfo.location_info,
                        serviced_hotels: stopInfo.serviced_hotels,
                        area: stopInfo.location_info.area
                    }
                });
                results.confidence = 0.95;
                return results;
            }
        }

        // Check for hotel queries
        let hotelName = '';
        Object.values(flybusKnowledge.locations.bus_stops).forEach(stop => {
            stop.serviced_hotels.forEach(hotel => {
                if (query.toLowerCase().includes(hotel.toLowerCase())) {
                    hotelName = hotel;
                    results.relevantInfo.push({
                        type: 'hotel_location',
                        data: {
                            hotel: hotel,
                            bus_stop: {
                                number: stop.number,
                                name: stop.name,
                                area: stop.location_info.area
                            },
                            pickup_instructions: "Please be ready outside the hotel 30 minutes before your scheduled departure time."
                        }
                    });
                    results.confidence = 0.95;
                }
            });
        });

        // If no specific matches, return general location search
        if (results.relevantInfo.length === 0) {
            const locationResults = LocationUtils.searchLocation(query);
            if (locationResults.exactMatches.length > 0 || locationResults.areaMatches.length > 0) {
                results.relevantInfo.push({
                    type: 'location',
                    data: locationResults,
                    general_info: flybusKnowledge.locations.general_info
                });
                results.confidence = 0.9;
            }
        }
    }

    // Schedule and timing queries
    if (query.includes('schedule') || query.includes('time') || query.includes('when') || 
        query.includes('depart') || query.includes('arrival') || query.includes('late') ||
        query.includes('miss') || query.includes('flight')) {
        if (query.includes('airport') || query.includes('kef') || query.includes('arriving')) {
            results.relevantInfo.push({
                type: 'schedule',
                subtype: 'airport_to_city',
                data: flybusKnowledge.schedules.airport_to_city
            });
        } else {
            results.relevantInfo.push({
                type: 'schedule',
                subtype: 'city_to_airport',
                data: flybusKnowledge.schedules.city_to_airport,
                timing_guidelines: flybusKnowledge.schedules.city_to_airport.timing_guidelines
            });
        }
        results.confidence = 0.9;
    }

    // Enhanced flight query handling
    const isTimeResponse = query.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    const isFlightRelated = query.includes('flight') || 
                           query.includes('departure') || 
                           query.includes('when') || 
                           query.includes('what time');
    
    // Check if this is a follow-up time response to a flight question
    const isFollowUpTime = context?.lastTopic === 'flight_timing' && 
                          (query.match(/^(it'?s|its|it is|at)\s+/i) || 
                           isTimeResponse);

    if (isFlightRelated || isFollowUpTime) {
        // For simple follow-ups, enhance the query with context
        let enhancedQuery = query;
        
        // If this is a follow-up time response, treat it as a flight time
        if (context?.lastTopic === 'flight_timing') {
            if (isTimeResponse && !query.toLowerCase().includes('flight')) {
                // Extract just the time part if it's a plain time
                const timeMatch = query.match(/(\d{1,2}(?::(?:\d{2}))?\s*(?:am|pm)?)/i);
                const timeStr = timeMatch ? timeMatch[1] : query;
                enhancedQuery = `my flight is at ${timeStr}`;
            } else if (query.match(/^(it'?s|its|it is|at)\s+/i)) {
                enhancedQuery = `my flight is ${query.replace(/^(it'?s|its|it is|at)\s+/i, '')}`;
            } else if (query.match(/^to\s+\w+/i)) {
                enhancedQuery = `my flight ${query}`;
            }
            console.log('Enhanced flight query:', enhancedQuery);
        }
        
        console.log('Processing flight query:', { original: query, enhanced: enhancedQuery });
        
        const flightResponse = generateFlightResponse(enhancedQuery, context);
        results.relevantInfo.push(flightResponse);
        results.context = {
            ...results.context,
            lastTopic: 'flight_timing',
            flightTime: flightResponse.data.flightTime || context?.flightTime,
            flightDestination: flightResponse.data.flightDestination || context?.flightDestination
        };
        results.confidence = 0.9;
    }
    
    // Handle yes/no responses with context
    if (query.match(/^(yes|yeah|yep|ok)\s*$/i) && context.lastQuery) {
        const enhancedQuery = context.lastQuery;
        const enhancedContext = {
            ...context,
            isConfirmation: true
        };
        
        // If last query was about return tickets, process as return ticket request
        if (context.lastQuery.toLowerCase().includes('return')) {
            return getRelevantKnowledge(
                enhancedQuery + ' return',
                enhancedContext
            );
        }
        
        return getRelevantKnowledge(enhancedQuery, enhancedContext);
    }

    // Price and booking queries
    if (query.includes('price') || query.includes('cost') || query.includes('fee') || 
        query.includes('ticket') || query.includes('how much') || query.includes('book') ||
        query.includes('cancel') || query.includes('refund') || query.includes('return')) {

        // Price comparison check
        if (query.includes('compare') || query.includes('difference between') || 
            query.includes('cheaper') || query.includes('more') ||  // Add more trigger words
            (query.toLowerCase().match(/which (one|service|bus)/i)) ||  // Add pattern matching
            (query.includes('flybus') && query.includes('plus') && 
             (query.includes('price') || query.includes('cost')))) {
            
            results.relevantInfo.push({
                type: 'price_comparison',
                data: {
                    service_difference: "The main difference is that Flybus Plus includes hotel pickup and dropoff in Reykjavík, while standard Flybus connects to BSÍ Bus Terminal only.",
                    standard: {
                        name: "Standard Flybus",
                        oneway: {
                            price: flybusKnowledge.pricing.standard.rates.adult.oneway.price,
                            currency: "ISK"
                        },
                        return: {
                            price: flybusKnowledge.pricing.standard.rates.adult.return.price,
                            currency: "ISK",
                            savings: flybusKnowledge.basic_info.service_types.standard.return_savings
                        }
                    },
                    plus: {
                        name: "Flybus Plus",
                        oneway: {
                            price: flybusKnowledge.pricing.plus.rates.adult.oneway.price,
                            currency: "ISK"
                        },
                        return: {
                            price: flybusKnowledge.pricing.plus.rates.adult.return.price,
                            currency: "ISK",
                            savings: flybusKnowledge.basic_info.service_types.plus.return_savings
                        }
                    }
                }
            });
            results.confidence = 0.95;
            return results;
        }                      

        // Detect if user is asking about Flybus+ or standard Flybus
        let serviceType = detectServiceType(query);
        
        // Enhance service type detection with context
        if (query.includes('hotel') || 
            query.includes('pickup') || 
            (query.includes('with') && context.lastTopic === 'pricing') ||
            (context.lastServiceType === 'plus')) {
            
            serviceType = 'plus';
            
            // Update pricing information for Flybus+
            if (results.relevantInfo.find(info => info.type === 'pricing')) {
                results.relevantInfo = results.relevantInfo.map(info => {
                    if (info.type === 'pricing') {
                        return {
                            ...info,
                            subtype: 'plus',
                            data: flybusKnowledge.pricing.plus
                        };
                    }
                    return info;
                });
            }
            
            results.context = {
                ...results.context,
                lastServiceType: serviceType
            };
        }
        
        // Check if this is a return ticket query
        const isReturnQuery = query.includes('return') || 
                            query.includes('round trip') || 
                            query.includes('both ways') || 
                            query.includes('two way') ||
                            (query.toLowerCase().match(/^(yes|yeah|yep|ok)\s*$/i) && 
                             context.lastQuery?.toLowerCase().includes('return'));

        // Handle group booking if present or carried from context
        const groupDetails = parseGroupDetails(query) || context.groupDetails;
        const isGroupBooking = !!groupDetails || context.isGroupBooking;

        if (isGroupBooking && groupDetails) {
            const groupPricing = calculateGroupPrice(
                groupDetails.adults || 0,
                groupDetails.youths || 0,
                groupDetails.children || 0,
                serviceType,
                isReturnQuery
            );
            
            results.relevantInfo.push({
                type: 'group_pricing',
                subtype: serviceType,
                data: {
                    ...groupPricing,
                    service_type: serviceType,
                    ticket_type: isReturnQuery ? 'return' : 'oneway',
                    warning: groupPricing.limits.youthExceeded ? 
                        'Warning: Youth limit exceeded. Maximum 40 youth tickets per adult.' :
                        groupPricing.limits.childrenExceeded ?
                        'Warning: Children limit exceeded. Maximum 2 children per adult.' : null
                },
                features: flybusKnowledge.pricing.features
            });
            results.confidence = 0.95;
            
            // Update context with group booking info
            results.context = {
                ...results.context,
                lastServiceType: serviceType,
                isGroupBooking: true,
                groupDetails,
                lastQuery: query
            };
            
            return results;
        }
        
        // Check for age-specific pricing
        const isYouthQuery = query.includes('youth') || query.includes('teen') || 
                           query.includes('young') || query.includes('student');
        const isChildQuery = query.includes('child') || query.includes('kid') || 
                           query.includes('baby') || query.includes('infant');

        // Build pricing response
        const pricingData = {
            type: 'pricing',
            subtype: serviceType,
            data: flybusKnowledge.pricing[serviceType],
            ticket_type: isReturnQuery ? 'return' : 'oneway',
            features: flybusKnowledge.pricing.features,
            limits: flybusKnowledge.pricing.limits
        };

        // Add specific age category info if requested
        if (isYouthQuery) {
            pricingData.highlighted_category = 'youth';
        } else if (isChildQuery) {
            pricingData.highlighted_category = 'children';
        }

        results.relevantInfo.push(pricingData);
        results.confidence = 0.9;
    }

    // Luggage related queries
    if (query.includes('luggage') || query.includes('bag') || query.includes('suitcase') || 
        query.includes('bicycle') || query.includes('bike') || query.includes('weight') ||
        query.includes('baggage') || query.includes('carry') || query.includes('golf') ||
        query.includes('ski')) {
        results.relevantInfo.push({
            type: 'luggage',
            data: flybusKnowledge.luggage,
            bagdrop: {
                available: true,
                service_url: "https://www.bagdrop.is/?culture=EN",
                discount: "10% with Flybus ticket"
            }
        });
        results.confidence = 0.8;
    }

    // Special services and accessibility queries
    if (query.includes('child') || query.includes('baby') || query.includes('wheelchair') || 
        query.includes('disabled') || query.includes('special') || query.includes('car seat') ||
        query.includes('animals') || query.includes('pets') || query.includes('service animal')) {
        results.relevantInfo.push({
            type: 'special_services',
            data: flybusKnowledge.special_services
        });
        results.confidence = 0.8;
    }

    // Route and journey queries
    if (query.includes('route') || query.includes('journey') || query.includes('path') || 
        query.includes('stop') || query.includes('distance') || query.includes('far') || 
        query.includes('how long') || query.includes('minutes') || query.includes('time') ||
        query.includes('garðabær') || query.includes('hafnarfjörður')) {
        results.relevantInfo.push({
            type: 'route',
            data: {
                main_stops: ["Keflavík Airport", "Garðabær", "Hafnarfjörður", "BSÍ Terminal"],
                duration: "45-50 minutes",
                distance_details: "The journey from Keflavík Airport to BSÍ Bus Terminal takes about 45 minutes under normal conditions",
                additional_info: "For Flybus+ (hotel transfer service), add approximately 30 minutes for hotel drop-offs",
                stops_info: {
                    gardabaer: "Optional stop at Garðabær (Aktu Taktu Gas station/Bus Stop Ásgarður C) - 5-10 minutes after BSÍ departure",
                    hafnarfjordur: "Optional stop at Hafnarfjörður (Fjörukráin Hotel Viking) - 10-15 minutes after BSÍ departure"
                }
            }
        });
        results.confidence = 0.9;
    }

    // Context handling for follow-up questions
    if (enrichedContext.lastTopic && results.relevantInfo.length === 0) {
        switch (enrichedContext.lastTopic) {
            case 'flight_timing':
                const flightResponse = generateFlightResponse(query, enrichedContext);
                if (flightResponse.type === 'flight_schedule' || 
                    (enrichedContext.flightTime && query.toLowerCase().match(/to (us|canada|europe)/i))) {
                    results.relevantInfo.push(flightResponse);
                    results.confidence = 0.9;
                }
                break;
            case 'location':
                results.relevantInfo.push({
                    type: 'location',
                    data: LocationUtils.searchLocation(query)
                });
                break;
            case 'schedule':
                results.relevantInfo.push({
                    type: 'schedule',
                    data: flybusKnowledge.schedules
                });
                break;
            case 'pricing':
                if (enrichedContext.isGroupBooking) {
                    const { adults, youths, children } = enrichedContext.groupDetails;
                    const serviceType = enrichedContext.lastServiceType || 'standard';
                    const isReturnQuery = query.includes('return');
                    
                    const groupPricing = calculateGroupPrice(adults, youths, children, serviceType, isReturnQuery);
                    results.relevantInfo.push({
                        type: 'group_pricing',
                        subtype: serviceType,
                        data: {
                            ...groupPricing,
                            service_type: serviceType,
                            ticket_type: isReturnQuery ? 'return' : 'oneway',
                            warning: groupPricing.limits.youthExceeded ? 
                                'Warning: Youth limit exceeded. Maximum 40 youth tickets per adult.' :
                                groupPricing.limits.childrenExceeded ?
                                'Warning: Children limit exceeded. Maximum 2 children per adult.' : null
                        },
                        features: flybusKnowledge.pricing.features
                    });
                } else {
                    results.relevantInfo.push({
                        type: 'pricing',
                        data: flybusKnowledge.pricing[enrichedContext.lastServiceType || 'standard']
                    });
                }
                results.confidence = 0.8;
                break;
        }
        results.confidence = results.confidence || 0.6;
    }

    // Handle generic acknowledgments with context
    if (enrichedContext.lastTopic && query.match(/^(yes|yeah|sure|ok|okay|perfect|great)$/i)) {
        const lastTopic = enrichedContext.lastTopic;
        
        if (lastTopic === 'pricing' || lastTopic === 'group_pricing') {
            results.relevantInfo.push({
                type: 'booking_prompt',
                data: {
                    service_type: enrichedContext.lastServiceType || 'standard',
                    message: "Would you like to proceed with booking your Flybus tickets?",
                    booking_options: {
                        online: "You can book online at our website",
                        phone: "Call us at +354 599 0000",
                        email: "Email us at info@icelandia.is"
                    }
                }
            });
            results.confidence = 0.8;
        }
    }

    // Update context for next query
    if (results.relevantInfo.length > 0) {
        results.context = {
            ...context,
            ...results.context,
            lastTopic: results.relevantInfo[0].type,
            lastServiceType: results.context.lastServiceType || context.lastServiceType,
            isGroupBooking: results.context.isGroupBooking || context.isGroupBooking,
            groupDetails: results.context.groupDetails || context.groupDetails,
            lastQuery: query,
            timestamp: Date.now()
        };
    }

    return results;
};

// Export everything together
export {
    flybusKnowledge,
    fuzzyMatch,
    conversationContext,
    updateContext,
    getContext,
    LocationUtils,
    getRelevantKnowledge,
    generateFlightResponse,
    detectServiceType,
    enrichContext,        // Add these
    calculateGroupPrice,  // new exports
    parseGroupDetails,
    detectQueryType    // Add this
};
