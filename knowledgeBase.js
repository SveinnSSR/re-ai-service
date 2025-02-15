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
                return_savings: 699
            },
            plus: {
                name: ["Flybus+", "Flybus Plus", "Flybus PLUS"],
                description: "Extended service including hotel pickup/dropoff in Reykjavík area",
                oneway_price: 5199,
                return_price: 9399,
                return_savings: 999
            }
        },
        mainInfo: {
            core_message: "The Flybus operates direct transfers between Keflavík Airport and Reykjavík, with service guaranteed for every flight. Our carbon-neutral coaches offer comfortable travel with free WiFi onboard.",
            service_options: {
                standard: "Direct service to BSÍ Bus Terminal",
                plus: "Extended service with hotel pickup/dropoff"
            }
        },
        supportingInfo: {
            journey_details: "The journey takes 45 minutes to BSÍ Bus Terminal, with Flybus+ service requiring an additional 30 minutes for hotel transfers.",
            guarantees: "We guarantee seats for all passengers and wait for delayed flights, ensuring stress-free travel to and from the airport.",
            booking_note: "Tickets can be booked online to skip the lines, with free cancellation according to our policy."
        },
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
    service_details: {
        fleet: {
            description: "One of the best bus fleets in Iceland",
            vehicles: {
                count: 80,
                types: [
                    {
                        type: "Standard coaches",
                        capacity: "6 to 70 seats"
                    },
                    {
                        type: "4x4 coaches",
                        features: ["Highland-capable", "Un-bridged glacier river crossing"]
                    }
                ],
                maintenance: "Constant supervision and maintenance",
                drivers: "Professional drivers ensuring passenger safety"
            }
        },
        policies: {
            smoking: {
                allowed: false,
                policy: "Smoking is prohibited on board all coaches"
            },
            safety: {
                measures: [
                    "Regular vehicle maintenance",
                    "Professional drivers",
                    "Enhanced passenger safety protocols"
                ]
            }
        },
        route_details: {
            distance: {
                kilometers: 50,
                miles: 31
            },
            duration: {
                standard: "45 minutes",
                conditions: "Subject to road conditions",
                hotel_service: "Additional 30 minutes for Flybus+"
            },
            city_restrictions: {
                downtown: "Large buses not allowed in downtown Reykjavík",
                solution: "Minibus transfer for hotel service",
                walking_distance: "1-5 minutes from designated bus stops to hotels"
            }
        },
        purchase_options: {
            recommended: {
                method: "Online booking",
                benefits: [
                    "Book in advance",
                    "Travel cashfree",
                    "Flexible tickets",
                    "Skip the lines"
                ]
            },
            airport: {
                method: "Ticket machines",
                location: "Keflavík airport",
                availability: "24/7"
            }
        },
        service_guarantees: {
            seats: "Always available for airport passengers",
            delays: "Bus waits for delayed flights",
            frequency: "Service for every arriving and departing flight",
            flexibility: "Tickets valid for any departure"
        },
        keywords: [
            "coach", "bus", "vehicle", "fleet", "smoking", 
            "route", "distance", "tickets", "booking", "purchase",
            "safety", "guarantee", "vehicle", "transport"
        ]
    },
    pickup_timing: {
        general_rules: {
            window: "30 minutes before departure",
            arrival_window: "Bus could arrive anytime within the 30-minute window",
            visibility: "Be ready and visible outside at pickup location",
            late_pickup: {
                threshold: "20-25 minutes",
                action: "Call +354 599 0000"
            }
        },
        important_notes: [
            "Pickup time and departure time are different",
            "Pickup starts 30 minutes before scheduled departure",
            "Must be ready and visible at pickup location",
            "Missing pickup requires own transport to BSÍ"
        ],
        city_center: {
            restrictions: "Some city center locations require using nearest bus stop",
            dropoff: "Drop-off at same location as pickup in restricted areas"
        },
        responsibility: "Passengers are responsible for being ready and visible for pickup",
        contact: "+354 599 0000"
    },
    age_info: {
        adults: {
            range: "16-99 years",
            description: "Full fare",
            notes: "Regular adult pricing applies"
        },
        youth: {
            range: "6-15 years",
            description: "Youth fare",
            notes: "Discounted rate for youth travelers"
        },
        children: {
            range: "1-5 years",
            description: "Travel free when accompanied by an adult",
            notes: "Maximum 2 children per adult"
        },
        restrictions: {
            youth_per_adult: 40,
            children_per_adult: 2,
            notes: "Age verification may be required"
        }
    },
    pricing: {
        mainInfo: {
            core_message: {
                standard: "Our standard Flybus service offers direct transfer between Keflavík Airport and BSÍ Bus Terminal.",
                plus: "Flybus+ provides complete service including hotel pickup and dropoff in Reykjavík."
            },
            quick_rates: {
                standard: {
                    adult_oneway: 3999,
                    adult_return: 7299,
                    savings: 699
                },
                plus: {
                    adult_oneway: 5199,
                    adult_return: 9399,
                    savings: 999
                }
            }
        },
        supportingInfo: {
            age_categories: {
                adult: "Ages 16-99 years",
                youth: "Ages 6-15 years at reduced rate",
                children: "Ages 1-5 years travel free"
            },
            booking_notes: "Free cancellation available and no booking fees. Return tickets include savings.",
            group_limits: "Maximum 40 youth per adult and 2 children per adult."
        },
        standard: {
            name: "Flybus",
            description: "Direct service to/from BSÍ Bus Terminal",
            rates: {
                adult: {
                    price: 3999,
                    currency: "ISK",
                    age_range: "16-99 years",
                    oneway: {
                        price: 3999,
                        currency: "ISK"
                    },
                    return: {
                        price: 7299,
                        currency: "ISK",
                        savings: 699
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
                    price: 5199,
                    currency: "ISK",
                    age_range: "16-99 years",
                    oneway: {
                        price: 5199,
                        currency: "ISK"
                    },
                    return: {
                        price: 9399,
                        currency: "ISK",
                        savings: 999
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
            restrictions: {
                city_center: {
                    description: "Some areas have restricted bus access",
                    solution: "Use nearest designated bus stop",
                    note: "Same location for pickup and drop-off"
                },
                dropoff_limitations: {
                    factors: [
                        "Narrow streets",
                        "Coach size",
                        "Roadworks"
                    ],
                    note: "Drop-off may not be directly in front of accommodation"
                }
            },
            timing_rules: {
                pickup_window: "30 minutes before scheduled departure",
                arrival_instructions: "Be ready and visible outside at pickup location",
                waiting_time: "Bus could arrive anytime within the 30-minute window",
                late_pickup: {
                    threshold: "20-25 minutes into pickup window",
                    action: "Contact +354 599 0000 for immediate assistance",
                    note: "Keep waiting at pickup location until contacted"
                },
                missed_pickup: {
                    instruction: "Must reach BSÍ Bus Terminal at own cost",
                    departure_note: "Flybus departs from BSÍ at scheduled time regardless of pickup status",
                    note: "Passengers responsible for being ready and visible"
                }
            }
        },
        bus_stops: {
            "1": {
                name: "Ráðhúsið - City Hall",
                location_info: {
                    coordinates: { lat: "64.146316", lng: "-21.941491" },
                    maps_url: "https://www.google.com/maps/dir/64.146316,-21.941491/@64.146316,-21.941491,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.145763,-21.938547/@64.145763,-21.938547,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.14678,-21.937296/@64.14678,-21.937296,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.150278,-21.9405/@64.15027,-21.9405,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.149766,-21.929865/@64.149766,-21.929865,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.147454,-21.932894/@64.147454,-21.932894,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.141548,-21.927973/@64.141548,-21.927973,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.143497,-21.916289/@64.143497,-21.916289,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.142364,-21.917228/@64.142364,-21.917228,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.144389,-21.910327/@64.144389,-21.910327,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.142658,-21.913866/@64.142658,-21.913866,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.148165,-21.927858/@64.148165,-21.927858,18z",
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
                    maps_url: "https://www.google.com/maps/dir/64.151764,-21.949277/@64.151764,-21.949277,18z",
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

// Add these right after flybusKnowledge
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

const casualChatPatterns = {
    greetings: {
        patterns: /^(hi|hey|hello|good\s*(morning|afternoon|evening)|hej|hæ)[\s,!]*$/i,
        responses: [
            "Hello! I'd be happy to help you plan your Flybus journey today.",
            "Hi there! How can I assist you with your airport transfer?",
            "Welcome! I'm here to help with your Flybus transportation needs.",
            "Hello! How can I help you with your travel plans today?"
        ]
    },
    introductions: {
        patterns: /^(hi,?\s+)?(i'?m|my name is|this is)\s+([a-z]+)[\s,!.]*$/i,
        responses: [
            "Nice to meet you {name}! I'd be happy to help you plan your Flybus journey.",
            "Hello {name}! How can I assist you with your airport transfer today?",
            "Welcome {name}! I'm here to help with your Flybus travel needs."
        ]
    },
    wellbeing: {
        patterns: /^(hi,?\s+)?how(?:'?s| is| are)\s+(?:you|u|it going|things)(?:\s+doing)?[\s?!.]*$/i,
        responses: [
            "I'm doing well, thank you! I'm here to help you plan your journey. How can I assist with your airport transfer?",
            "Thanks for asking! I'm ready to help with your transportation needs. What would you like to know about our Flybus service?",
            "Great, thank you! I'm here to help make your airport transfer smooth and easy. What can I help you with?"
        ]
    },
    generic_chat: {
        patterns: /^\s*(nice|good|great|lovely|pleasure)\s+to\s+(meet|see)\s+(you|u)[\s,!.]*$/i,
        responses: [
            "Likewise! I'm here to help make your journey smooth. What would you like to know about our Flybus service?",
            "Thank you! I'm looking forward to helping you with your airport transfer needs. How can I assist?",
            "The pleasure is mine! How can I help you with your Flybus journey today?"
        ]
    }
};

// Add this here, right after casualChatPatterns
const timingPatterns = {
    duration: /\b(how\s+long|duration|time\s+take|travel\s+time)\b/i,
    plus_service: /\b(hotel\s+pickup|plus\s+service|with\s+plus)\b/i,
    total_time: /\b(total\s+time|all\s+together|in\s+total)\b/i
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
const detectServiceType = (query = '') => {
    if (!query || typeof query !== 'string') return 'standard';
    query = query.toLowerCase();
    
    // Check for Plus variations
    const plusIndicators = [
        'plus',
        'flybus+',
        'flybus plus',
        'hotel pickup',
        'hotel service',
        'hotel transfer',
        'pickup service',
        'to my hotel',
        'from my hotel',
        'hotel dropoff',
        'door to door'
    ];

    // Check context and query
    const isPlus = plusIndicators.some(indicator => query.includes(indicator));
    
    return isPlus ? 'plus' : 'standard';
};

// Query type detection
const detectQueryType = (query) => {
    if (!query) return 'direct';
    query = query.toLowerCase().trim();
    
    // Flight schedule queries
    if (query.match(/\b(arriving|landing|flight|departure|departing)\s+(at|is|time|coming)\b/i) ||
        query.match(/take.+?(flight|airport|arriving|landing)/i) ||
        query.match(/\b\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s*flight\b/i)) {
        return 'flight_schedule';
    }

    // Add pickup timing queries here
    if (query.match(/\b(pick.?up|when.*ready|waiting.*time|pickup.*time)\b/i) ||
        query.match(/\b(when|what time).*bus.*arrive\b/i) ||
        query.match(/\b(how long.*wait|waiting period)\b/i)) {
        return 'pickup_timing';
    }    
    
    // Service information queries
    if (query.match(/\b(what|which).+?(include|come|get|offer)\b/i) ||
        query.match(/included?\s+(in|with)/i) ||
        query.match(/what.+?(comes|get|offer)/i)) {
        return 'service_info';
    }
    
    // Recommendation queries
    if (query.match(/\b(recommend|better|best|which|better)\b.*?\b(service|bus|pickup|hotel|families?)\b/i) ||
        query.match(/\bwhich\s+(\w+\s+)?(bus|service)\b/i)) {
        return 'recommendation';
    }
    
    // Time-based queries
    if (query.match(/what (bus|time)|when|arriving at|departing at|landing at|flight is at|need for|should.*leave/i)) {
        return 'schedule';
    }
    
    // Comparison queries
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
const enrichContext = (context, input) => {
    const query = input.message || '';
    const serviceType = input.serviceType || detectServiceType(query);
    
    console.log('\n=== Group Detection in enrichContext ===');
    console.log('Input query:', query);
    console.log('Previous context:', context);
    
    const groupMatch = query.match(/(?:\b\d+\s*(?:adult|child(?:ren)?|youth|teen(?:ager)?s?|year\s*old)s?\b)|(?:\b(?:we\s*(?:are|have)|there\s*are)\s+\d+\s*(?:adult|child(?:ren)?|youth|teen(?:ager)?s?)s?\b)|(?:\band\s+\d+\s*(?:adult|child(?:ren)?|youth|teen(?:ager)?s?)s?\b)|(?:plus\s+(?:one|1)\s+(?:\d+\s*(?:year\s*old|yo)|child|youth|teen(?:ager)?))/gi);
    
    console.log('Group match result:', groupMatch);
    
    const isGroupBooking = groupMatch !== null || context?.isGroupBooking;
    console.log('Is group booking:', isGroupBooking);
    
    // Parse current query's group details
    const newGroupDetails = isGroupBooking ? parseGroupDetails(query) : null;
    console.log('New group details:', newGroupDetails);
    
    // Combine with existing group details if present
    const groupDetails = newGroupDetails || context?.groupDetails;
    if (newGroupDetails && context?.groupDetails) {
        groupDetails.adults = (newGroupDetails.adults || 0) + (context.groupDetails.adults || 0);
        groupDetails.youths = (newGroupDetails.youths || 0) + (context.groupDetails.youths || 0);
        groupDetails.children = (newGroupDetails.children || 0) + (context.groupDetails.children || 0);
    }
    
    console.log('Combined group details:', groupDetails);
    
    return {
        ...context,
        lastServiceType: serviceType || context?.lastServiceType || 'standard',
        isGroupBooking,
        groupDetails,
        previousQuery: context?.lastQuery || null,
        lastQuery: query,
        queryType: detectQueryType(query),
        timing: {
            isTimingQuery: timingPatterns.duration.test(query) || 
                          timingPatterns.plus_service.test(query) || 
                          timingPatterns.total_time.test(query),
            showTotalTime: timingPatterns.total_time.test(query),
            includeHotelService: serviceType === 'plus' || context?.lastServiceType === 'plus'
        },
        timestamp: Date.now()
    };
};

// Parse Group Details
const parseGroupDetails = (query) => {
    const counts = {
        adults: 0,
        youths: 0,
        children: 0
    };
    
    // First pass for explicit numbers
    const matches = query.matchAll(/(\d+)\s*(?:adult|child(?:ren)?|youth|teen(?:ager)?s?|year\s*old)s?/gi);
    for (const match of matches) {
        const count = parseInt(match[1]);
        const type = match[0].toLowerCase();
        
        if (type.includes('adult')) {
            counts.adults += count;
        } else if (type.includes('teen') || type.includes('youth')) {
            counts.youths += count;
        } else if (type.includes('child') || type.includes('year old')) {
            // Check age for children
            const ageMatch = type.match(/(\d+)\s*year/);
            if (ageMatch) {
                const age = parseInt(ageMatch[1]);
                // Use age ranges from flybusKnowledge.age_info
                if (age >= 1 && age <= 5) {
                    counts.children += 1;
                } else if (age >= 6 && age <= 15) {
                    counts.youths += 1;
                } else if (age >= 16) {
                    counts.adults += 1;
                }
            } else {
                // If no age specified but "child" mentioned, assume young child
                counts.children += count;
            }
        }
    }
    
    // Handle "plus one" type phrases
    const plusMatches = query.match(/plus\s+(?:one|1)\s+(?:(\d+)\s*(?:year\s*old|yo)|child|youth|teen(?:ager)?)/i);
    if (plusMatches) {
        if (plusMatches[1]) {
            const age = parseInt(plusMatches[1]);
            if (age >= 1 && age <= 5) {
                counts.children += 1;
            } else if (age >= 6 && age <= 15) {
                counts.youths += 1;
            } else {
                counts.adults += 1;
            }
        } else if (plusMatches[0].includes('child')) {
            counts.children += 1;
        } else {
            counts.youths += 1;
        }
    }
    
    // Log the parsed results
    console.log('Parsed group details:', counts);
    
    return Object.values(counts).some(v => v > 0) ? counts : null;
};

// Add the helper function here, right after exports
const createContextFields = (existingContext = {}, update = {}) => {
    return {
        // Meta fields
        messages: existingContext?.messages || [],
        language: existingContext?.language || 'en',
        timestamp: Date.now(),
        sessionId: update?.sessionId || existingContext?.sessionId || null,  // Prioritize update.sessionId
        
        // Core context fields
        lastTopic: update?.lastTopic || existingContext?.lastTopic || null,
        flightTime: update?.flightTime || existingContext?.flightTime || null,
        flightDestination: update?.flightDestination || existingContext?.flightDestination || null,
        lastServiceType: update?.lastServiceType || existingContext?.lastServiceType || null,
        isGroupBooking: update?.isGroupBooking || existingContext?.isGroupBooking || false,
        groupDetails: update?.groupDetails || existingContext?.groupDetails || null,
        lastQuery: update?.lastQuery || existingContext?.lastQuery || null,
        
        // Optional fields that might be present
        chatType: update?.chatType || existingContext?.chatType || null,
        needsDestination: update?.needsDestination || existingContext?.needsDestination || false,
        isArrival: update?.isArrival || existingContext?.isArrival || false,
        isConfirmation: update?.isConfirmation || existingContext?.isConfirmation || false,
        
        // Conversation flow fields
        previousTopic: update?.previousTopic || existingContext?.previousTopic || null,
        queryType: update?.queryType || existingContext?.queryType || null,
        
        // Route and journey specific fields
        routeType: update?.routeType || existingContext?.routeType || 'airport_to_bsi',
        serviceDetails: update?.serviceDetails || existingContext?.serviceDetails || null,
        journeyContext: {
            isReturn: update?.journeyContext?.isReturn || existingContext?.journeyContext?.isReturn || false,
            hasHotelService: update?.journeyContext?.hasHotelService || existingContext?.journeyContext?.hasHotelService || false,
            timing: update?.journeyContext?.timing || existingContext?.journeyContext?.timing || null
        }
    };
};

// Add after enrichContext but before getRelevantKnowledge
const calculateJourneyTime = (serviceType, context = {}) => {
    const baseTime = 45; // minutes
    const hotelServiceTime = 30; // minutes
    const isPlus = serviceType === 'plus' || context?.lastServiceType === 'plus';
    
    return {
        baseTime,
        hotelServiceTime: isPlus ? hotelServiceTime : 0,
        totalTime: isPlus ? baseTime + hotelServiceTime : baseTime,
        isPlus,
        details: {
            mainJourney: `${baseTime} minutes from Keflavík Airport to BSÍ Bus Terminal`,
            hotelService: isPlus ? 
                `Additional ${hotelServiceTime} minutes for hotel pickup/dropoff` : null,
            total: isPlus ? 
                `Total journey time approximately ${baseTime + hotelServiceTime} minutes (${baseTime} minutes airport transfer + ${hotelServiceTime} minutes hotel service)` :
                `${baseTime} minutes from Keflavík Airport to BSÍ Bus Terminal`
        }
    };
};

const calculateGroupPrice = (adults, youths, children, serviceType, isReturn) => {
    const pricing = flybusKnowledge.pricing[serviceType];
    const adultPrice = isReturn ? pricing.rates.adult.return.price : pricing.rates.adult.oneway.price;
    const youthPrice = isReturn ? pricing.rates.youth.return.price : pricing.rates.youth.oneway.price;
    
    return {
        total: (adults * adultPrice) + (youths * youthPrice), // Children are free
        breakdown: {
            adults: {
                count: adults,
                price: adultPrice,
                subtotal: adults * adultPrice
            },
            youths: {
                count: youths,
                price: youthPrice,
                subtotal: youths * youthPrice
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
    query = query.toLowerCase().trim();  // Added trim() here
    
    const results = {
        relevantInfo: [],
        context: {},
        confidence: 0
    };

    // Get serviceType and enrichedContext FIRST
    const serviceType = detectServiceType(query) || context?.lastServiceType || 'standard';
    const enrichedContext = enrichContext(context, {
        message: query,
        serviceType: serviceType
    });

    // Add console log for context
    console.log('\n=== Initial Context ===');
    console.log('Service type:', serviceType);
    console.log('Enriched context:', enrichedContext);

    // Check for casual chat patterns first (before anything else)
    console.log('\n=== Checking Casual Chat Patterns ===');
    for (const [chatType, data] of Object.entries(casualChatPatterns)) {
        console.log(`Testing pattern for ${chatType}`);
        console.log('Pattern:', data.patterns);
        console.log('Query:', query);
        console.log('Match result:', data.patterns.test(query));
        
        if (data.patterns.test(query)) {  // Removed trim() since we do it at start
            console.log('Match found for:', chatType);
            let response = data.responses[Math.floor(Math.random() * data.responses.length)];    
            
            // Handle name extraction for introductions
            if (chatType === 'introductions') {
                const nameMatch = query.match(/(?:i'?m|my name is|this is)\s+([a-z]+)/i) || 
                                query.match(/([a-z]+)\s+here/i);
                if (nameMatch) {
                    const name = nameMatch[1];
                    response = response.replace('{name}', name.charAt(0).toUpperCase() + name.slice(1));
                }
            }

            results.relevantInfo.push({
                type: 'casual_chat',
                chatType: chatType,
                data: {
                    response: response
                }
            });
            results.context = {
                lastTopic: 'casual_chat',
                chatType: chatType
            };
            results.confidence = 0.95;
            return results;
        }
    }

    // Group booking detection
    const groupMatch = query.match(/(?:\b\d+\s*(?:adult|child(?:ren)?|youth|teen(?:ager)?s?|year\s*old)s?\b)|(?:\b(?:we\s*(?:are|have)|there\s*are)\s+\d+\s*(?:adult|child(?:ren)?|youth|teen(?:ager)?s?)s?\b)|(?:\band\s+\d+\s*(?:adult|child(?:ren)?|youth|teen(?:ager)?s?)s?\b)|(?:plus\s+(?:one|1)\s+(?:\d+\s*(?:year\s*old|yo)|child|youth|teen(?:ager)?))/gi);

    if (enrichedContext.isGroupBooking || groupMatch) {
        console.log('\n=== Processing Group Booking ===');
        const groupDetails = enrichedContext.groupDetails;
        console.log('Group details:', groupDetails);

        if (groupDetails) {
            const isPlus = serviceType === 'plus' || query.includes('plus');
            
            results.relevantInfo.push({
                type: 'pricing',
                subtype: isPlus ? 'plus' : 'standard',
                data: {
                    pricing: flybusKnowledge.pricing[isPlus ? 'plus' : 'standard'],
                    groupDetails: groupDetails,
                    age_info: flybusKnowledge.age_info
                }
            });

            results.context = {
                ...enrichedContext,
                lastTopic: 'pricing',
                isGroupBooking: true
            };

            results.confidence = 0.95;
            return results;
        }
    }

    // Add the console log here
    console.log('\n=== Query Type Detection ===');
    console.log('Query:', query);
    console.log('Query type:', detectQueryType(query));    
    console.log('Service type:', serviceType);
    
    results.context = enrichedContext;

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

    // Add pickup timing handler here, right after comparison handler
    if (queryType === 'pickup_timing') {
        results.relevantInfo.push({
            type: 'pickup_timing',
            data: {
                general_rules: flybusKnowledge.pickup_timing.general_rules,
                important_notes: flybusKnowledge.pickup_timing.important_notes,
                restrictions: flybusKnowledge.locations.general_info.restrictions,
                timing_rules: flybusKnowledge.locations.general_info.timing_rules
            }
        });
        results.confidence = 0.95;
        return results;
    }

    // Add new followup handler here
    if (queryType === 'followup' && query.toLowerCase().includes('return')) {
        // Get correct group details from context
        const adults = context.groupDetails?.adults || 0;
        const serviceType = context.lastServiceType || 'standard';
        
        if (adults > 0) {
            const baseReturnPrice = flybusKnowledge.pricing[serviceType].rates.adult.return.price;
            
            results.relevantInfo.push({
                type: 'pricing',
                data: {
                    ticket_type: 'return',
                    total_price: adults * baseReturnPrice,
                    service_type: serviceType
                }
            });
            results.context = {
                ...context,  // Keep existing context
                groupDetails: context.groupDetails,  // Preserve group details
                lastQuery: query,
                queryType: queryType
            };
            results.confidence = 0.95;
            return results;
        }
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

    // Fleet and vehicle queries
    if (query.includes('coach') || query.includes('bus') || query.includes('vehicle') || 
        query.includes('fleet') || query.includes('transport') || query.includes('driver')) {
        results.relevantInfo.push({
            type: 'fleet_info',
            data: flybusKnowledge.service_details.fleet
        });
        results.confidence = 0.9;
    }

    // Smoking and policy queries
    if (query.includes('smoking') || query.includes('smoke') || 
        query.includes('cigarette') || query.includes('policy')) {
        results.relevantInfo.push({
            type: 'policy',
            data: flybusKnowledge.service_details.policies
        });
        results.confidence = 0.95;
    }

    // Safety queries
    if (query.includes('safe') || query.includes('security') || 
        query.includes('driver') || query.includes('maintenance')) {
        results.relevantInfo.push({
            type: 'safety',
            data: {
                fleet: flybusKnowledge.service_details.fleet.maintenance,
                safety: flybusKnowledge.service_details.policies.safety
            }
        });
        results.confidence = 0.9;
    }

    // Purchase and booking queries - enhance existing section
    if (query.includes('book') || query.includes('buy') || 
        query.includes('purchase') || query.includes('ticket')) {
        results.relevantInfo.push({
            type: 'purchase_options',
            data: {
                options: flybusKnowledge.service_details.purchase_options,
                guarantees: flybusKnowledge.service_details.service_guarantees
            }
        });
        results.confidence = 0.9;
    }    

    // Location and hotel related queries
    if (query.includes('hotel') || query.includes('stay') || query.includes('location') || 
        query.includes('pickup') || query.includes('where') || query.includes('bus stop') ||
        query.includes('drop') || query.includes('downtown') || query.includes('terminal')) {
        
        // First check direct pickup hotels
        const directPickupHotel = flybusKnowledge.locations.direct_pickup.hotels.find(hotel => {
            const hotelName = hotel.name.toLowerCase();
            const queryTerms = query.toLowerCase();
            
            // Check for exact matches
            if (queryTerms.includes(hotelName)) return true;
            
            // Check for common variations
            const variations = [
                hotelName,
                hotelName.replace('hotel', '').trim(),
                hotelName.replace('hostel', '').trim(),
                hotelName.replace('hótel', '').trim(),
                hotelName.replace('apartments', '').trim(),
                hotelName.replace('apartment', '').trim(),
                hotelName.replace('guesthouse', '').trim()
            ];
            
            // Add specific matches for problematic hotels
            if (hotelName.includes('kex')) {
                variations.push('kex');
            }
            if (hotelName.includes('nordica')) {
                variations.push('hilton');
                variations.push('hilton nordica');
            }
            if (hotelName.includes('centerhotel')) {
                variations.push('center hotel');
                variations.push(hotelName.replace('centerhotel', '').trim());
            }
            if (hotelName.includes('fosshotel')) {
                variations.push('foss hotel');
                variations.push(hotelName.replace('fosshotel', '').trim());
            }
            if (hotelName.includes('grand')) {
                variations.push('grand hotel');
                variations.push('grand');
            }
            
            // Convert Icelandic characters for matching
            variations.push(...variations.map(v => v
                .replace(/á/g, 'a')
                .replace(/é/g, 'e')
                .replace(/í/g, 'i')
                .replace(/ó/g, 'o')
                .replace(/ú/g, 'u')
                .replace(/ý/g, 'y')
                .replace(/þ/g, 'th')
                .replace(/æ/g, 'ae')
                .replace(/ö/g, 'o')
            ));
            
            return variations.some(v => queryTerms.includes(v));
        });

        if (directPickupHotel) {
            results.relevantInfo.push({
                type: 'hotel_location',
                data: {
                    mainInfo: {
                        hotel: directPickupHotel.name,
                        pickup_type: 'direct_doorstep',
                        core_message: `Your pickup for the Flybus service will be directly outside the ${directPickupHotel.name}.`,
                        service_note: "This hotel benefits from our direct doorstep pickup service."
                    },
                    supportingInfo: {
                        readiness: "Please be ready outside the hotel entrance 30 minutes before your scheduled departure time.",
                        window: "Make sure to be visible and prepared to board during the 30-minute window.",
                        contact: "If the bus has not arrived within 20-25 minutes of the pickup window, please contact us at +354 599 0000 for immediate assistance."
                    },
                    area: directPickupHotel.area,
                    timing_rules: flybusKnowledge.locations.general_info.timing_rules,
                    isDoorstep: true,
                    skipMapsUrl: true
                }
            });
            results.confidence = 0.95;
            return results;
        }
        
        // Add location restrictions check
        const isRestrictionQuery = query.match(/\b(restriction|limited|cannot|area|access)\b/i);
        if (isRestrictionQuery) {
            results.relevantInfo.push({
                type: 'location_restrictions',
                data: {
                    restrictions: flybusKnowledge.locations.general_info.restrictions,
                    timing_rules: flybusKnowledge.locations.general_info.timing_rules
                }
            });
            results.confidence = 0.95;
            return results;
        }

        // Add landmark matching
        const landmarkMatches = {
            'hallgrimskirkja': ['hallgrimskirkja', 'hallgrímskirkja', 'hallgríms', 'church']
        };

        // Force direct match for Hallgrímskirkja
        if (Object.values(landmarkMatches.hallgrimskirkja).some(v => 
            query.toLowerCase().includes(v))) {
            // Force it to use bus stop 8 data
            const hallgrimskirkjaStop = flybusKnowledge.locations.bus_stops["8"];
            results.relevantInfo.push({
                type: 'bus_stop',
                data: {
                    number: "8",
                    name: hallgrimskirkjaStop.name,
                    location: hallgrimskirkjaStop.location_info,
                    serviced_hotels: hallgrimskirkjaStop.serviced_hotels,
                    area: hallgrimskirkjaStop.location_info.area,
                    maps_url: hallgrimskirkjaStop.location_info.maps_url,
                    pickup_instructions: `Please wait at bus stop 8 (${hallgrimskirkjaStop.name}) 30 minutes before your scheduled departure time.`,
                    timing_rules: flybusKnowledge.locations.general_info.timing_rules
                }
            });
            results.confidence = 0.95;
            return results;
        }

        // Check for specific bus stop number queries
        const busStopMatch = query.match(/bus stop (\d+)/i) || query.match(/stop (\d+)/i);
        if (busStopMatch) {
            const stopNumber = busStopMatch[1];
            const stopInfo = flybusKnowledge.locations.bus_stops[stopNumber];
            if (stopInfo) {
                const coords = stopInfo.location_info.coordinates;
                const mapsUrl = `https://www.google.com/maps/@${coords.lat},${coords.lng},18z`;
                
                results.relevantInfo.push({
                    type: 'bus_stop',
                    data: {
                        number: stopNumber,
                        name: stopInfo.name,
                        location: {
                            ...stopInfo.location_info,
                            maps_url: mapsUrl
                        },
                        serviced_hotels: stopInfo.serviced_hotels,
                        area: stopInfo.location_info.area,
                        pickup_instructions: `Please wait at bus stop ${stopNumber} (${stopInfo.name}) 30 minutes before your scheduled departure time.`, // Remove URL from here
                        timing_rules: flybusKnowledge.locations.general_info.timing_rules
                    }
                });
                results.confidence = 0.95;
                return results;
            }
        }

        // Check for hotel queries in bus stops
        for (const [stopNum, stop] of Object.entries(flybusKnowledge.locations.bus_stops)) {
            const foundHotel = stop.serviced_hotels.find(hotel => 
                query.toLowerCase().includes(hotel.toLowerCase())
            );
            
            if (foundHotel) {
                const coords = stop.location_info.coordinates;
                const mapsUrl = `https://www.google.com/maps/@${coords.lat},${coords.lng},18z`;
                
                results.relevantInfo.push({
                    type: 'hotel_location',
                    data: {
                        hotel: foundHotel,
                        bus_stop: {
                            number: stopNum,
                            name: stop.name,
                            area: stop.location_info.area,
                            street: stop.location_info.street || stop.name,
                            maps_url: mapsUrl
                        },
                        pickup_instructions: `Please wait at bus stop ${stopNum} (${stop.name}) 30 minutes before your scheduled departure time.`, // Remove URL from here
                        city_center_note: stop.location_info.area === 'downtown' ? 
                            "Due to city center traffic regulations, we use designated bus stops to ensure timely service." : null,
                        timing_rules: flybusKnowledge.locations.general_info.timing_rules,
                        restrictions: flybusKnowledge.locations.general_info.restrictions
                    }
                });
                results.confidence = 0.95;
                return results;
            }
        }

        // If no specific matches, return general location search with enhanced info
        if (results.relevantInfo.length === 0) {
            const locationResults = LocationUtils.searchLocation(query);
            if (locationResults.exactMatches.length > 0 || locationResults.areaMatches.length > 0) {
                results.relevantInfo.push({
                    type: 'location',
                    data: {
                        ...locationResults,
                        general_info: flybusKnowledge.locations.general_info,
                        timing_rules: flybusKnowledge.locations.general_info.timing_rules,
                        restrictions: flybusKnowledge.locations.general_info.restrictions
                    }
                });
                results.confidence = 0.9;
            }
        }
    }

    // Schedule and timing queries
    if (query.includes('schedule') || query.includes('time') || query.includes('when') || 
        query.includes('depart') || query.includes('arrival') || query.includes('late') ||
        query.includes('miss') || query.includes('flight')) {

        // Check if this is a pickup timing question
        if (query.match(/\b(pick.?up|when.*ready|waiting.*time)\b/i)) {
            results.relevantInfo.push({
                type: 'pickup_timing',
                data: {
                    general_rules: flybusKnowledge.pickup_timing.general_rules,
                    timing_rules: flybusKnowledge.locations.general_info.timing_rules
                }
            });
            results.confidence = 0.95;
            return results;
        }

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
                           query.includes('what time') ||
                           query.match(/\b(arriving|landing|at|coming)\b/i); // Add arrival patterns
    
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
            } else if (query.match(/\b(arriving|landing|coming)\b/i)) {
                // Add handling for arrival queries
                const timeMatch = query.match(/\b(\d{1,2}(?::(?:\d{2}))?\s*(?:am|pm)?)\b/i);
                if (timeMatch) {
                    enhancedQuery = `arriving at ${timeMatch[0]}`;
                }
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
            flightDestination: flightResponse.data.flightDestination || context?.flightDestination,
            isArrival: query.match(/\b(arriving|landing|coming)\b/i) || false
        };
        results.confidence = 0.95;
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
    query.includes('garðabær') || query.includes('hafnarfjörður') ||
    timingPatterns.duration.test(query) || 
    timingPatterns.plus_service.test(query) || 
    timingPatterns.total_time.test(query)) {
        
    const isServicePlus = serviceType === 'plus' || query.includes('plus') || 
                         query.includes('hotel') || context?.lastServiceType === 'plus';
    
    results.relevantInfo.push({
        type: 'route',
        data: {
            main_stops: ["Keflavík Airport", "Garðabær", "Hafnarfjörður", "BSÍ Terminal"],
            duration: {
                base: {
                    time: "45 minutes",
                    description: "Direct journey from Keflavík Airport to BSÍ Bus Terminal"
                },
                plus_service: {
                    time: "30 minutes",
                    description: "Additional time for hotel pickup/dropoff with Flybus+"
                },
                total_time: isServicePlus ? 
                    "Total journey time approximately 75 minutes (45 minutes airport transfer + 30 minutes hotel service)" :
                    "45 minutes from Keflavík Airport to BSÍ Bus Terminal",
                conditions: "All times subject to road and traffic conditions"
            },
            service_type: isServicePlus ? "plus" : "standard",
            distance_details: {
                main_journey: "The main journey between Keflavík Airport and BSÍ Bus Terminal takes 45 minutes",
                hotel_service: isServicePlus ?
                    "Your Flybus+ service includes an additional 30 minutes for hotel pickup/dropoff" :
                    "If you need hotel pickup/dropoff, Flybus+ service adds approximately 30 minutes to the journey"
            },
            additional_info: isServicePlus ?
                "Please be ready at your hotel pickup location 30 minutes before your scheduled departure time" :
                "Direct service to/from BSÍ Bus Terminal",
            stops_info: {
                bsi: "Main terminal - BSÍ Bus Terminal",
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
                    const isPlus = enrichedContext.lastServiceType === 'plus' || query.includes('plus');
                    const isReturnQuery = query.includes('return');
                    
                    results.relevantInfo.push({
                        type: 'pricing',
                        subtype: isPlus ? 'plus' : 'standard',
                        data: {
                            pricing: flybusKnowledge.pricing[isPlus ? 'plus' : 'standard'],
                            groupDetails: enrichedContext.groupDetails,
                            age_info: flybusKnowledge.age_info,
                            ticket_type: isReturnQuery ? 'return' : 'oneway',
                            limits: {
                                youth_per_adult: flybusKnowledge.pricing.limits.youth_per_adult,
                                children_per_adult: flybusKnowledge.pricing.limits.children_per_adult
                            }
                        }
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
    detectQueryType,    // Add this
    createContextFields,    // Add this
    tourRelatedTerms,     // Add this
    casualChatPatterns,    // Add this
    timingPatterns,
    calculateJourneyTime
};
