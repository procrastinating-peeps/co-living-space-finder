require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const properties = [
  // --- PUNE ---
  {
    title: "Viman Nagar Urban Pods",
    city: "Pune",
    state: "Maharashtra",
    area: "Viman Nagar",
    rent: 12500,
    original_rent: 14500,
    deposit: 25000,
    room_type: "Private Room",
    gender_preference: "Any",
    rating: 4.8,
    reviews_count: 94,
    amenities: ["WiFi", "AC", "Power Backup", "Housekeeping", "Balcony"],
    description: "5 mins to Phoenix Marketcity and EON Free Zone shuttle pickup. Ideal for IT pros.",
    verified: true
  },
  {
    title: "Hinjewadi Tech Living Phase 1",
    city: "Pune",
    state: "Maharashtra",
    area: "Hinjewadi",
    rent: 8500,
    original_rent: 10000,
    deposit: 16000,
    room_type: "Twin Sharing",
    gender_preference: "Male",
    rating: 4.6,
    reviews_count: 140,
    amenities: ["High-Speed WiFi", "Gym", "Meals Available", "Laundry"],
    description: "Located right next to Rajiv Gandhi Infotech Park. Walk to Infosys & Wipro campuses.",
    verified: true
  },
  {
    title: "Kharadi Haven Co-Living",
    city: "Pune",
    state: "Maharashtra",
    area: "Kharadi",
    rent: 15000,
    original_rent: 17500,
    deposit: 30000,
    room_type: "Private Room",
    gender_preference: "Female",
    rating: 4.9,
    reviews_count: 62,
    amenities: ["AC", "Biometric Security", "Dedicated Workdesk", "3 Homely Meals"],
    description: "Premium female-only coliving suite 500m from World Trade Centre (WTC) & EON IT Park.",
    verified: true
  },
  {
    title: "Baner Hive Living",
    city: "Pune",
    state: "Maharashtra",
    area: "Baner",
    rent: 9500,
    original_rent: 11000,
    deposit: 18000,
    room_type: "Twin Sharing",
    gender_preference: "Any",
    rating: 4.7,
    reviews_count: 112,
    amenities: ["WiFi", "Gaming Zone", "Community Kitchen", "Rooftop Lounge"],
    description: "Vibrant startup-friendly hub near Balewadi High Street with quick highway access.",
    verified: true
  },

  // --- BANGALORE ---
  {
    title: "Silicon Hub CoLive",
    city: "Bangalore",
    state: "Karnataka",
    area: "HSR Layout Sector 2",
    rent: 17500,
    original_rent: 21000,
    deposit: 35000,
    room_type: "Private Room",
    gender_preference: "Any",
    rating: 4.9,
    reviews_count: 310,
    amenities: ["1 Gbps Fiber", "Ergonomic Desk", "AC", "Rooftop Cafe"],
    description: "Startup-friendly hub near Outer Ring Road & RMZ Ecospace.",
    verified: true
  },
  {
    title: "Indiranagar Luxe Stays",
    city: "Bangalore",
    state: "Karnataka",
    area: "Indiranagar 100ft Road",
    rent: 22000,
    original_rent: 26000,
    deposit: 40000,
    room_type: "Private Room",
    gender_preference: "Any",
    rating: 4.8,
    reviews_count: 175,
    amenities: ["AC", "Housekeeping", "Rooftop Lounge", "Smart TV"],
    description: "Upscale living in the heart of Indiranagar, walking distance to cafes and metro.",
    verified: true
  },
  {
    title: "Whitefield Tech Haven",
    city: "Bangalore",
    state: "Karnataka",
    area: "Whitefield",
    rent: 9000,
    original_rent: 11000,
    deposit: 18000,
    room_type: "Twin Sharing",
    gender_preference: "Male",
    rating: 4.5,
    reviews_count: 88,
    amenities: ["WiFi", "3 Homely Meals", "Gym", "Bus Shuttle"],
    description: "Close to ITPL and Prestige Shantiniketan. Budget-friendly coliving for software engineers.",
    verified: true
  },
  {
    title: "Koramangala Green Suites",
    city: "Bangalore",
    state: "Karnataka",
    area: "Koramangala 4th Block",
    rent: 14000,
    original_rent: 16500,
    deposit: 28000,
    room_type: "Private Room",
    gender_preference: "Female",
    rating: 4.8,
    reviews_count: 92,
    amenities: ["AC", "24/7 Security", "Biometric Access", "High-Speed WiFi"],
    description: "Boutique stays tailored for female founders and professionals in Koramangala.",
    verified: true
  },

  // --- HYDERABAD ---
  {
    title: "Cyber Towers Executive Living",
    city: "Hyderabad",
    state: "Telangana",
    area: "HITEC City",
    rent: 13500,
    original_rent: 16000,
    deposit: 27000,
    room_type: "Private Room",
    gender_preference: "Any",
    rating: 4.8,
    reviews_count: 204,
    amenities: ["AC", "Fiber WiFi", "Buffet Breakfast", "Daily Cleaning"],
    description: "Walking distance to Cyber Towers and Mindspace IT Park. Ultra-convenient commute.",
    verified: true
  },
  {
    title: "Gachibowli Pro Suites",
    city: "Hyderabad",
    state: "Telangana",
    area: "Gachibowli",
    rent: 8000,
    original_rent: 9500,
    deposit: 16000,
    room_type: "Twin Sharing",
    gender_preference: "Any",
    rating: 4.6,
    reviews_count: 142,
    amenities: ["WiFi", "Gym", "Swimming Pool Access", "Power Backup"],
    description: "Close to Financial District, Microsoft, and Amazon headquarters.",
    verified: true
  },
  {
    title: "Madhapur Nest",
    city: "Hyderabad",
    state: "Telangana",
    area: "Madhapur",
    rent: 11000,
    original_rent: 13000,
    deposit: 20000,
    room_type: "Private Room",
    gender_preference: "Female",
    rating: 4.7,
    reviews_count: 85,
    amenities: ["CCTV Security", "South & North Indian Food", "WiFi", "AC"],
    description: "Quiet residential lane near Durgam Cheruvu cable bridge and metro station.",
    verified: true
  },

  // --- NOIDA & DELHI NCR ---
  {
    title: "CyberCity Executive Stay",
    city: "Gurgaon",
    state: "Haryana",
    area: "DLF Phase 3",
    rent: 21000,
    original_rent: 26000,
    deposit: 30000,
    room_type: "Private Room",
    gender_preference: "Any",
    rating: 4.8,
    reviews_count: 240,
    amenities: ["Chef Meals", "AC", "Covered Parking", "Fiber WiFi"],
    description: "Executive stay 300m from Rapid Metro & DLF Cyber Hub.",
    verified: true
  },
  {
    title: "Golf Course Road CoLive",
    city: "Gurgaon",
    state: "Haryana",
    area: "Sector 42",
    rent: 14000,
    original_rent: 17000,
    deposit: 25000,
    room_type: "Twin Sharing",
    gender_preference: "Female",
    rating: 4.9,
    reviews_count: 76,
    amenities: ["Gated Society", "AC", "Housekeeping", "Yoga Zone"],
    description: "Luxury twin sharing steps away from Sector 42-43 Metro station.",
    verified: true
  },
  {
    title: "Sector 62 Tech Suites",
    city: "Noida",
    state: "Uttar Pradesh",
    area: "Sector 62",
    rent: 10500,
    original_rent: 12500,
    deposit: 20000,
    room_type: "Private Room",
    gender_preference: "Any",
    rating: 4.7,
    reviews_count: 130,
    amenities: ["AC", "Fiber WiFi", "24/7 Power Backup", "Cooked Meals"],
    description: "Heart of Noida's IT corridor near Stellar IT Park and Fortis Hospital.",
    verified: true
  },
  {
    title: "Sector 137 Metro Pods",
    city: "Noida",
    state: "Uttar Pradesh",
    area: "Sector 137 Expressway",
    rent: 7500,
    original_rent: 9000,
    deposit: 15000,
    room_type: "Twin Sharing",
    gender_preference: "Male",
    rating: 4.5,
    reviews_count: 64,
    amenities: ["WiFi", "Gym", "Expressway Connectivity", "Locker Facility"],
    description: "Direct access to Noida-Greater Noida Expressway and Advant Navis Business Park.",
    verified: true
  },
  {
    title: "South Ex Campus Residency",
    city: "Delhi",
    state: "Delhi",
    area: "South Extension II",
    rent: 16000,
    original_rent: 19000,
    deposit: 30000,
    room_type: "Private Room",
    gender_preference: "Any",
    rating: 4.8,
    reviews_count: 118,
    amenities: ["Metro Proximity", "AC", "Daily Housekeeping", "Terrace Garden"],
    description: "Central Delhi connectivity, 3 mins walk to South Extension Pink Line Metro.",
    verified: true
  },

  // --- MUMBAI ---
  {
    title: "Bandra SeaView CoLiving",
    city: "Mumbai",
    state: "Maharashtra",
    area: "Bandra West",
    rent: 28000,
    original_rent: 34000,
    deposit: 50000,
    room_type: "Private Room",
    gender_preference: "Any",
    rating: 4.9,
    reviews_count: 88,
    amenities: ["AC", "Daily Housekeeping", "WiFi", "Designer Interiors"],
    description: "Premium boutique studio minutes away from Carter Road and BKC.",
    verified: true
  },
  {
    title: "Powai Lake Living",
    city: "Mumbai",
    state: "Maharashtra",
    area: "Powai",
    rent: 16000,
    original_rent: 19000,
    deposit: 30000,
    room_type: "Twin Sharing",
    gender_preference: "Any",
    rating: 4.7,
    reviews_count: 150,
    amenities: ["AC", "Swimming Pool", "Gym", "High-Speed WiFi"],
    description: "Surrounded by greenery near Hiranandani Gardens and IIT Bombay.",
    verified: true
  },
  {
    title: "Andheri West Media Hub",
    city: "Mumbai",
    state: "Maharashtra",
    area: "Andheri West",
    rent: 13500,
    original_rent: 16000,
    deposit: 25000,
    room_type: "Twin Sharing",
    gender_preference: "Female",
    rating: 4.6,
    reviews_count: 98,
    amenities: ["Security", "Kitchen Access", "AC", "Washing Machine"],
    description: "Ideal for creative professionals and students near DN Nagar Metro station.",
    verified: true
  },

  // --- KOLKATA ---
  {
    title: "UrbanNest Tech Suites",
    city: "Kolkata",
    state: "West Bengal",
    area: "Salt Lake Sector V",
    rent: 11500,
    original_rent: 14000,
    deposit: 23000,
    room_type: "Private Room",
    gender_preference: "Female",
    rating: 4.8,
    reviews_count: 142,
    amenities: ["High-Speed WiFi", "AC", "3 Homely Meals", "Housekeeping"],
    description: "400m from Sector V Metro Station. Walking distance to Wipro & TCS.",
    verified: true
  },
  {
    title: "Candor Cloud Living",
    city: "Kolkata",
    state: "West Bengal",
    area: "New Town Action Area I",
    rent: 7500,
    original_rent: 9500,
    deposit: 15000,
    room_type: "Twin Sharing",
    gender_preference: "Any",
    rating: 4.5,
    reviews_count: 89,
    amenities: ["WiFi", "AC", "Gym", "Community Kitchen"],
    description: "Near DLF IT Park & Candor TechSpace. Zero brokerage.",
    verified: true
  },
  {
    title: "New Town Smart Residency",
    city: "Kolkata",
    state: "West Bengal",
    area: "New Town Action Area II",
    rent: 6500,
    original_rent: 8000,
    deposit: 12000,
    room_type: "Twin Sharing",
    gender_preference: "Male",
    rating: 4.4,
    reviews_count: 67,
    amenities: ["WiFi", "Meals Included", "Power Backup", "RO Water"],
    description: "Walking distance to Eco Park, TCS Gitobitan, and City Centre 2.",
    verified: true
  },

  // --- CHENNAI ---
  {
    title: "OMR Tech Haven",
    city: "Chennai",
    state: "Tamil Nadu",
    area: "Sholinganallur",
    rent: 9500,
    original_rent: 12000,
    deposit: 18000,
    room_type: "Twin Sharing",
    gender_preference: "Any",
    rating: 4.7,
    reviews_count: 110,
    amenities: ["AC", "WiFi", "Daily Cleaning", "South Indian Meals"],
    description: "Located right on the OMR IT Corridor near ELCOT SEZ and Cognizant.",
    verified: true
  },
  {
    title: "Tidel Park Boutique Living",
    city: "Chennai",
    state: "Tamil Nadu",
    area: "Thiruvanmiyur",
    rent: 15500,
    original_rent: 18000,
    deposit: 30000,
    room_type: "Private Room",
    gender_preference: "Female",
    rating: 4.8,
    reviews_count: 73,
    amenities: ["Beach Access", "AC", "Biometric Lock", "High-Speed WiFi"],
    description: "5 mins from Tidel Park and Thiruvanmiyur MRTS station. Quiet neighborhood.",
    verified: true
  }
];

async function seed() {
  console.log('Clearing old records and seeding pan-India properties...');

  // Optional: clear existing records to avoid duplicates
  await supabase.from('properties').delete().neq('id', 0);

  const { data, error } = await supabase.from('properties').insert(properties).select();

  if (error) {
    console.error('Error inserting properties:', error.message);
  } else {
    console.log(`Successfully seeded ${data.length} properties across India!`);
  }
}

seed();