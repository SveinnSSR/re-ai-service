// knowledgeBase.js - Flybus Section

const flybusKnowledge = {
    basic_info: {
        name: "Flybus Airport Transfer",
        service_description: "Direct airport transfer service between Keflavík Airport and Reykjavík",
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
        keywords: ["flybus", "airport transfer", "keflavik", "reykjavik", "bsi", "shuttle"],
        context_triggers: ["airport", "transfer", "transport", "bus", "kef", "shuttle"]
    },

    pricing: {
        standard: {
            name: "Flybus",
            rates: {
                adult: {
                    price: 3999,
                    currency: "ISK"
                },
                youth: {
                    price: 2000,
                    currency: "ISK",
                    age_range: "6-15 years"
                },
                children: {
                    price: 0,
                    currency: "ISK",
                    age_range: "1-5 years"
                }
            }
        },
        plus: {
            name: "Flybus+",
            description: "Includes hotel drop-off/pickup service",
            rates: {
                adult: {
                    price: 5199,
                    currency: "ISK"
                },
                youth: {
                    price: 2600,
                    currency: "ISK",
                    age_range: "6-15 years"
                },
                children: {
                    price: 0,
                    currency: "ISK",
                    age_range: "1-5 years"
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
            "Return tickets available"
        ],
        keywords: ["price", "cost", "fee", "rates", "ticket", "booking"]
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

// Fuzzy matching utilities
const fuzzyMatch = (text, pattern) => {
    text = text.toLowerCase();
    pattern = pattern.toLowerCase();
    
    // Allow for common misspellings and variations
    const variations = {
        'keflavik': ['keflavík', 'kef', 'keflvik'],
        'reykjavik': ['reykjavík', 'reyk', 'rek'],
        'flybus': ['fly bus', 'fly-bus', 'airport bus'],
        'terminal': ['termial', 'terminl'],
        'schedule': ['timetable', 'time table', 'times'],
        'luggage': ['baggage', 'bags', 'suitcase']
    };
    
    // Check for direct matches and variations
    return variations[pattern]?.some(variant => text.includes(variant)) || text.includes(pattern);
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
    // Extract time if present in query
    const timeMatch = query.match(/(\d{1,2})(?::\d{2})?\s*(?:am|pm)?/i);
    const timeFromQuery = timeMatch ? timeMatch[0] : null;
    const time = timeFromQuery || flightContext?.flightTime;

    // Extract destination if present in query
    let destination = null;
    if (query.toLowerCase().includes('europe')) destination = 'europe';
    else if (query.toLowerCase().includes('us') || query.toLowerCase().includes('canada')) destination = 'us_canada';
    else destination = flightContext?.flightDestination;

    // If we have both time and destination, generate complete response
    if (time && destination) {
        // Convert time to 24h format
        let hours = parseInt(time.match(/\d+/)[0]);
        const isPM = time.toLowerCase().includes('pm');
        if (isPM && hours !== 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;

        // Calculate required arrival time
        const arrivalHours = destination === 'europe' ? 2.5 : 3;
        const requiredArrivalHours = hours - arrivalHours;

        // Find appropriate bus from schedule
        const schedule = flybusKnowledge.schedules.city_to_airport.regular_departures;
        const appropriateBus = schedule.reverse().find(dep => {
            const busArrivalHour = parseInt(dep.arrival.split(':')[0]);
            const busArrivalMinute = parseInt(dep.arrival.split(':')[1]);
            const busArrivalTime = busArrivalHour + (busArrivalMinute / 60);
            return busArrivalTime <= requiredArrivalHours;
        });

        if (appropriateBus) {
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

    // If we're missing information, return what we need
    return {
        type: 'flight_inquiry',
        data: {
            hasTime: !!time,
            hasDestination: !!destination,
            flightTime: time,            // Add these to preserve context
            flightDestination: destination,
            message: !time && !destination ? "Could you tell me your flight time and whether it's to Europe or US/Canada?" :
                    !time ? "What time is your flight? I'll help you find the best bus connection." :
                    "Is this flight to Europe or US/Canada? The arrival time requirements are different."
        }
    };
};

// Knowledge retrieval function
const getRelevantKnowledge = (query, context = {}) => {
    query = query.toLowerCase();
    const results = {
        relevantInfo: [],
        context: {},
        confidence: 0
    };

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

    // Add this new section in the getRelevantKnowledge function
    if (query.includes('flight') || query.includes('departure') || 
        query.includes('when') || query.includes('what time')) {
        
        const flightResponse = generateFlightResponse(query, context);
        results.relevantInfo.push(flightResponse);
        results.context = {
            ...results.context,
            lastTopic: 'flight_timing',
            flightTime: flightResponse.data.flightTime,
            flightDestination: flightResponse.data.destination
        };
        results.confidence = 0.9;
    }

    // Price and booking queries
    if (query.includes('price') || query.includes('cost') || query.includes('fee') || 
        query.includes('ticket') || query.includes('how much') || query.includes('book') ||
        query.includes('cancel') || query.includes('refund') || query.includes('return')) {
        if (query.includes('plus') || query.includes('hotel') || query.includes('pickup')) {
            results.relevantInfo.push({
                type: 'pricing',
                subtype: 'flybus_plus',
                data: flybusKnowledge.pricing.plus,
                features: flybusKnowledge.pricing.features
            });
        } else {
            results.relevantInfo.push({
                type: 'pricing',
                subtype: 'standard',
                data: flybusKnowledge.pricing.standard,
                features: flybusKnowledge.pricing.features
            });
        }
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
    if (context.lastTopic && results.relevantInfo.length === 0) {
        switch (context.lastTopic) {
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
                results.relevantInfo.push({
                    type: 'pricing',
                    data: flybusKnowledge.pricing
                });
                break;
        }
        results.confidence = 0.6;
    }

    // Update context for next query
    if (results.relevantInfo.length > 0) {
        results.context = {
            lastTopic: results.relevantInfo[0].type,
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
    generateFlightResponse  // Add this to exports
};
