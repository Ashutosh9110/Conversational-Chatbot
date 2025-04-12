// Parent dataset
const companyData = {
    name: "ABC Lighting Company",
    description: "We are a leading provider of energy-efficient solar lighting solutions for residential and commercial use.",
    locations: [
        {
            name: "Main Office",
            address: "123 Solar Drive, Sunnyvale, CA 94086",
            phone: "(555) 123-4567"
        },
        {
            name: "Manufacturing Facility",
            address: "456 Bright Street, Phoenix, AZ 85001",
            phone: "(555) 987-6543"
        }
    ],
    businessHours: [
        "Monday - Friday: 8:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 3:00 PM",
        "Sunday: Closed"
    ],
    generalInfo: "ABC Lighting Corp has been in business since 2005, specializing in solar-powered lighting solutions that help reduce energy costs while providing reliable illumination."
};

// Child datasets - Products
const products = [
    {
        id: "street-light",
        name: "SolarMax Street Light",
        description: "High-performance solar-powered street light with long-lasting illumination.",
        specifications: {
            dimensions: "28\" x 16\" x 5\" (height x width x depth)",
            weight: "22 lbs",
            solarPanel: "Monocrystalline 25W",
            battery: "Lithium-ion 18000mAh",
            brightness: "2200 lumens",
            runtime: "Up to 14 hours per full charge",
            motionSensor: "Yes, with adjustable sensitivity",
            weatherResistance: "IP65 rated, weatherproof",
            mountingHeight: "12-18 feet recommended",
            warranty: "5 years limited warranty"
        },
        price: "$399.99",
        imageUrls: [
            "images/street_light_1.webp",
            "images/street_light_2.webp"
        ],
        features: [
            "Automatic dusk-to-dawn operation",
            "Motion sensor for increased brightness when movement is detected",
            "Energy-efficient LED array",
            "Tool-free installation",
            "Rust-resistant aluminum housing"
        ]
    },
    {
        id: "driveway-light",
        name: "PathBrite Driveway Light",
        description: "Elegant solar driveway lights that enhance safety and curb appeal.",
        specifications: {
            dimensions: "16\" x 6\" x 6\" (height x width x depth)",
            weight: "3.5 lbs each",
            solarPanel: "Polycrystalline 5W",
            battery: "Lithium-ion 6000mAh",
            brightness: "800 lumens",
            runtime: "Up to 10 hours per full charge",
            motionSensor: "Optional",
            weatherResistance: "IP64 rated, weather-resistant",
            coverage: "Each light covers approximately 12 ft diameter",
            warranty: "3 years limited warranty"
        },
        price: "$89.99 for a set of 4",
        imageUrls: [
            "images/driveway_light_1.webp",
            "images/driveway_light_2.webp"
        ],
        features: [
            "Stylish modern design",
            "No wiring required",
            "Shatterproof lens",
            "Stake or surface mount options included",
            "Automatic on at dusk, off at dawn"
        ]
    },
    {
        id: "wall-light",
        name: "SunWall Pro Outdoor Light",
        description: "Powerful wall-mounted solar light for patios, entryways, and outdoor living spaces.",
        specifications: {
            dimensions: "8\" x 5\" x 3\" (height x width x depth)",
            weight: "1.8 lbs",
            solarPanel: "Monocrystalline 2.5W",
            battery: "Lithium-ion 4000mAh",
            brightness: "1200 lumens",
            runtime: "Up to 8 hours per full charge",
            motionSensor: "Yes, 120° detection angle",
            weatherResistance: "IP66 rated, fully weatherproof",
            illuminationRange: "Up to 20 feet",
            warranty: "2 years limited warranty"
        },
        price: "$59.99 each",
        imageUrls: [
            "images/wall_light_1.webp",
            "images/outside_wall_light_2.webp"
        ],
        features: [
            "Three lighting modes: dim, bright, motion-activated",
            "Wide-angle illumination",
            "Easy installation with included hardware",
            "Adjustable light head",
            "Heat and impact resistant"
        ]
    }
];  

// Create images directory folder to store product images
const imagesDir = "images";

// Default bot responses
const defaultResponses = {
    niceties: "Hello. How can I help you today?",
    greeting: "Hello! Welcome to ABC Lighting Company. I'm your virtual assistant. How can I help you today?",
    farewell: "Thank you for chatting with us. Have a great day!",
    fallback: "I'm sorry, I don't have information about that. Is there something else I can help you with regarding our solar lighting products?",
    followUp: "Is there anything else I can help you with?",
    contactRequest: "Before you go, could you please provide your name, email, and phone number so we can assist you better in the future?",
    thankYou: "Thank you for providing your contact information. We appreciate your interest in ABC Lighting Company. Have a wonderful day!"
}; 