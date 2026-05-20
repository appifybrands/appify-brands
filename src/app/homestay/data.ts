import { Suite } from "./types";

export interface VillaConfig extends Suite {
  tagline: string;
  heroImage: string;
  natureImages: string[];
  interiorItems: {
    title: string;
    description: string;
    image: string;
    iconKey: string; // Map to Coffee, Bed, Palette, Layout, Maximize, Flame, Waves, Bath, etc.
  }[];
  amenitiesDetails: {
    name: string;
    designation: string;
    quote: string;
    src: string;
  }[];
  testimonials: {
    name: string;
    rating: number;
    text: string;
    imgSrc?: string;
  }[];
  galleryCards: {
    image: string;
    title: string;
    description: string;
  }[];
}

// ==========================================
// CENTRAL VILLA IMAGE CONFIGURATION
// To change any image in the demo, simply replace the Unsplash URLs below
// with your local paths (e.g. "/images/my-villa-exterior.jpg").
// ==========================================
export const villasData: VillaConfig[] = [
  {
    id: "mosswood-cabin",
    name: "Mosswood A-Frame",
    tagline: "Forest Sanctuary",
    location: "Cascade Mountains, WA",
    description: "A beautifully restored mid-century A-frame surrounded by towering hemlocks. Features a wood-fired hot tub, loft bedroom, and floor-to-ceiling glass walls.",
    price: 280,
    rating: 4.95,
    reviewsCount: 128,
    maxGuests: 4,
    isActive: true,
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop", // main card thumbnail
    amenities: ["Wood-fired Hot Tub", "Grand Stone Fireplace", "Outdoor Rain Shower", "Espresso Bar", "Pet Friendly"],
    
    // Hero Image (High resolution)
    heroImage: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1600&auto=format&fit=crop", // Scenic mountain/forest day
    
    // 5 Nature/Exterior Images for the Parallax slider (Skiper34)
    natureImages: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&fit=crop", // green forest
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&fit=crop", // pine canopy
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&fit=crop", // misty trail
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&fit=crop", // alpine peaks
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&fit=crop", // sunny cabin exterior
    ],
    
    // 5 Interior Items for the dynamic selector (InteractiveSelector)
    interiorItems: [
      {
        title: "Woodland Lounge",
        description: "Floor-to-ceiling glass looking out to hemlock groves, anchored by a wood stove.",
        image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&fit=crop",
        iconKey: "Layout"
      },
      {
        title: "Hemlock Loft",
        description: "A cozy king-size loft bed nestled under the cedar wood rafters.",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&fit=crop",
        iconKey: "Bed"
      },
      {
        title: "Rainforest Bath",
        description: "Luxury slate bathroom featuring a rainfall skylight shower.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&fit=crop",
        iconKey: "Bath"
      },
      {
        title: "Espresso Kitchenette",
        description: "Equipped with a professional espresso machine and hand-turned ceramic mugs.",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&fit=crop",
        iconKey: "Coffee"
      },
      {
        title: "Writer's Nook",
        description: "A quiet corner facing the forest with a vintage solid-oak writing desk.",
        image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&fit=crop",
        iconKey: "Maximize"
      }
    ],
    
    // 4 High-end Amenities (CircularTestimonials)
    amenitiesDetails: [
      {
        name: "Cedar Soaking",
        designation: "Therapy",
        quote: "Our wood-fired hot tub is hand-built from local cedar and filled with fresh mountain spring water.",
        src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&fit=crop"
      },
      {
        name: "Gourmet Hearth",
        designation: "Dining",
        quote: "Wake up to organic breakfasts delivered daily, featuring farm-to-table berries, sourdough, and local honey.",
        src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&fit=crop"
      },
      {
        name: "Private Concierge",
        designation: "Service",
        quote: "We arrange exclusive guided hikes, private yoga sessions on the deck, and local vineyard tours.",
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&fit=crop"
      },
      {
        name: "Stargazing Deck",
        designation: "Astronomy",
        quote: "Equipped with a high-power astronomical telescope and plush blankets for cold mountain nights.",
        src: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&fit=crop"
      }
    ],
    
    // 6 Reviews for Marquee
    testimonials: [
      { name: "Sarah L.", rating: 5, text: "Absolutely magical. Soaking in the cedar tub under the towering pines at midnight was unforgettable!" },
      { name: "Julian K.", rating: 5, text: "The design is incredible. Every single corner of this cabin is curated with high-end, thoughtful touches." },
      { name: "Maya & Dan", rating: 5, text: "Waking up to the floor-to-ceiling glass wall looking directly into the misty forest canopy was breath-taking." },
      { name: "Robert G.", rating: 5, text: "Extremely private, immaculately clean, and the host left a bag of fresh coffee. 10/10 stay." },
      { name: "Elena V.", rating: 5, text: "The perfect digital detox. There is Wi-Fi, but you will just want to stare out the windows all day." },
      { name: "The Miller Family", rating: 5, text: "Our kids loved sleeping in the loft bedroom. We cooked fresh dinners on the firepit every evening." }
    ],
    
    // 12 Images for Circular Gallery (CircularGallery)
    galleryCards: [
      { image: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=400&h=600&fit=crop", title: "A-Frame Silhouette", description: "The iconic triangle glowing amidst towering trees" },
      { image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&h=600&fit=crop", title: "Winter Wonder", description: "Heavy snow dusting the warm cedar deck" },
      { image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=600&fit=crop", title: "Hot Tub Steam", description: "Warm steam rising in the cold mountain air" },
      { image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=600&fit=crop", title: "Loft View", description: "Peering down into the warm, illuminated living room" },
      { image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=600&fit=crop", title: "Artisan Kitchen", description: "Cozy counter space with fresh coffee brewing" },
      { image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop", title: "Morning Mist", description: "Mist rolling over the mountain ridges at 6:00 AM" },
      { image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&h=600&fit=crop", title: "Pine Shadows", description: "Sunny morning shadows dancing on the cedar planks" },
      { image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=600&fit=crop", title: "Midnight Sky", description: "Millions of stars shining brightly above the roofline" },
      { image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=600&fit=crop", title: "Linen Rest", description: "Fresh linen on the plush feather bed" },
      { image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=400&h=600&fit=crop", title: "Reading Light", description: "Soft warm yellow light falling on an open book" },
      { image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=600&fit=crop", title: "Skylight Shower", description: "Hot shower with a direct view of the sky" },
      { image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=600&fit=crop", title: "Evening Fire", description: "Gathering around the stone fireplace with friends" },
    ]
  },
  {
    id: "pinecrest-glasshouse",
    name: "Pinecrest Glasshouse",
    tagline: "Canopy Living",
    location: "Redwood Forest, CA",
    description: "Suspended 30 feet above the forest floor, this architectural marvel offers 360-degree views of the redwoods, a wrap-around deck, and outdoor rainfall shower.",
    price: 420,
    rating: 4.99,
    reviewsCount: 84,
    maxGuests: 2,
    isActive: true,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop", // main card thumbnail
    amenities: ["360° Glass Walls", "Redwood Tree Deck", "Suspended Hammock Net", "Outdoor Rain Shower", "Luxury Espresso Bar"],
    
    // Hero Image (High resolution)
    heroImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1600&auto=format&fit=crop", // Forest Day
    
    // 5 Nature/Exterior Images for the Parallax slider (Skiper34)
    natureImages: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&fit=crop", // redwood trunks
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&fit=crop", // treetops
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&fit=crop", // forest clearing
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&fit=crop", // moss detail
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&fit=crop", // misty redwoods
    ],
    
    // 5 Interior Items for the dynamic selector (InteractiveSelector)
    interiorItems: [
      {
        title: "Floating Living Room",
        description: "Floor-to-ceiling glass on three sides, creating the illusion of floating in the redwood needles.",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&fit=crop",
        iconKey: "Layout"
      },
      {
        title: "Sky Bed",
        description: "Plush organic wool mattress positioned directly beneath a massive double skylight.",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&fit=crop",
        iconKey: "Bed"
      },
      {
        title: "Observatory Deck",
        description: "A cantilevered wooden deck extending into the air, complete with a double hammock net.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&fit=crop",
        iconKey: "Maximize"
      },
      {
        title: "Cedar Bath & Sauna",
        description: "Private indoor steam room and a soaking tub with beautiful woodland exposure.",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&fit=crop",
        iconKey: "Bath"
      },
      {
        title: "Barista Corner",
        description: "Commercial-grade La Marzocco espresso station with a selection of single-origin coffee beans.",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&fit=crop",
        iconKey: "Coffee"
      }
    ],
    
    // 4 High-end Amenities (CircularTestimonials)
    amenitiesDetails: [
      {
        name: "Hammock Net",
        designation: "Sky Rest",
        quote: "Lay suspended over the canyon floor in our custom-tensioned structural rope hammock, built into the high deck.",
        src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&fit=crop"
      },
      {
        name: "Rainfall Bath",
        designation: "Wellness",
        quote: "An outdoor copper rain-shower surrounded by living redwoods lets you bathe directly in nature's privacy.",
        src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&fit=crop"
      },
      {
        name: "Barista Butler",
        designation: "Dining",
        quote: "Every morning, fresh pastries and local coffee flights are prepared by a private chef and left on your portal.",
        src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&fit=crop"
      },
      {
        name: "Eco-Acoustics",
        designation: "Sound",
        quote: "State-of-the-art Bang & Olufsen spatial audio calibrated to echo off the forest trunks with stunning natural acoustics.",
        src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&fit=crop"
      }
    ],
    
    // 6 Reviews for Marquee
    testimonials: [
      { name: "Victoria T.", rating: 5, text: "Unlike anything else. Floating in a glass box 30 feet in the air surrounded by giant trees is an spiritual experience." },
      { name: "Marcus H.", rating: 5, text: "Absolute architectural masterpiece. The La Marzocco machine made the mornings feel like a luxury cafe." },
      { name: "Clara & Leo", rating: 5, text: "Lying in the suspended net with the forest floor below and the stars above was the highlight of our year." },
      { name: "Aria N.", rating: 5, text: "Unbelievably quiet. The silence of the redwood grove is heavy, deep, and deeply peaceful." },
      { name: "Dave B.", rating: 5, text: "Service was incredible. Breakfast arrived precisely at 8 AM as requested, hot and delicious." },
      { name: "Sophia K.", rating: 5, text: "A design lover's dream. Excellent lighting, luxury linens, and the outdoor shower is a must-try." }
    ],
    
    // 12 Images for Circular Gallery (CircularGallery)
    galleryCards: [
      { image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=600&fit=crop", title: "Redwood Canopy", description: "Peering down into the redwood floor from the glass lounge" },
      { image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=600&fit=crop", title: "Glass Reflection", description: "Redwood branches reflecting on the double-glazed panels" },
      { image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=600&fit=crop", title: "Suspended Net", description: "Reading a book suspended high above the ground" },
      { image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=600&fit=crop", title: "Interior Golden", description: "Sunset gold creeping into the modern oak lounge" },
      { image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=600&fit=crop", title: "Sky Bed View", description: "Looking straight up at giant pine needles from bed" },
      { image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=600&fit=crop", title: "Steam and Pine", description: "Hot steam filling the cedar sauna cabin" },
      { image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=600&fit=crop", title: "Foggy Mornings", description: "Heavy grey fog swirling around the elevated deck columns" },
      { image: "https://images.unsplash.com/photo-1518818419601-72c8673f5852?w=400&h=600&fit=crop", title: "Ambient Canopy", description: "Soft warm spotlights illuminating the redwood trunks" },
      { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=600&fit=crop", title: "Dusk Lounge", description: "Warm interiors contrasting with the cool blue woods" },
      { image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=600&fit=crop", title: "Luxury Rest", description: "Plush wool blankets and organic cotton sheets" },
      { image: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=400&h=600&fit=crop", title: "Barista Vibe", description: "Shiny chrome espresso machine pouring a perfect crema" },
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=600&fit=crop", title: "Canyon Treetops", description: "Breathtaking views extending over the national park border" },
    ]
  },
  {
    id: "ridgeview-sanctuary",
    name: "Ridgeview Sanctuary",
    tagline: "Summit Retreat",
    location: "Blue Ridge Mountains, NC",
    description: "A modern minimalist retreat perched on a cliff edge. Offers panoramic mountain views, a heated infinity plunge pool, and custom-designed interiors.",
    price: 350,
    rating: 4.89,
    reviewsCount: 92,
    maxGuests: 6,
    isActive: true,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop", // main card thumbnail
    amenities: ["Infinity Plunge Pool", "Panoramic Cliff Deck", "Dual Indoor Fireplaces", "Chef's Kitchen", "Outdoor Firepit"],
    
    // Hero Image (High resolution)
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop", // Mountains Day
    
    // 5 Nature/Exterior Images for the Parallax slider (Skiper34)
    natureImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&fit=crop", // ridge silhouettes
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&fit=crop", // valley sunset
      "https://images.unsplash.com/photo-1434064511983-18c6dae20ed5?w=800&fit=crop", // mountain wildflowers
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&fit=crop", // ridge fog
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&fit=crop", // twilight mountains
    ],
    
    // 5 Interior Items for the dynamic selector (InteractiveSelector)
    interiorItems: [
      {
        title: "Summit Great Room",
        description: "Open-plan room with soaring ceilings, a concrete fireplace, and dual-facing glass sliding doors.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&fit=crop",
        iconKey: "Layout"
      },
      {
        title: "Grand Vista Bedroom",
        description: "Master suite overlooking the gorge with a private balcony and concrete wood stove.",
        image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&fit=crop",
        iconKey: "Bed"
      },
      {
        title: "Chef's Kitchen",
        description: "Professional concrete island, Sub-Zero appliances, and hand-forged copper cutlery.",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&fit=crop",
        iconKey: "Coffee"
      },
      {
        title: "Infinity Bath",
        description: "Soaking bath set adjacent to sliding glass panels overlooking the plunge pool and mountains.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&fit=crop",
        iconKey: "Bath"
      },
      {
        title: "Panorama Deck",
        description: "Expansive cedar deck with a built-in fire pit table and heated infinity plunge pool.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop",
        iconKey: "Maximize"
      }
    ],
    
    // 4 High-end Amenities (CircularTestimonials)
    amenitiesDetails: [
      {
        name: "Plunge Pool",
        designation: "Plunge",
        quote: "Our custom concrete infinity plunge pool is heated to a perfect 98 degrees and extends directly over the cliff edge.",
        src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&fit=crop"
      },
      {
        name: "Chef Kitchen",
        designation: "Culinary",
        quote: "Equipped with state-of-the-art culinary appliances and stocked with organic spices, extra virgin oils, and fine teas.",
        src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&fit=crop"
      },
      {
        name: "Warm Hearth",
        designation: "Comfort",
        quote: "Features dual wood-burning fireplaces inside, plus an outdoor gas firepit table overlooking the mountain folds.",
        src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&fit=crop"
      },
      {
        name: "Mountain Trails",
        designation: "Explore",
        quote: "Direct, private gated trail access to the Appalachian national trail and local hidden waterfalls.",
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&fit=crop"
      }
    ],

    // 6 Reviews for Marquee
    testimonials: [
      { name: "Gavin M.", rating: 5, text: "The infinity plunge pool hanging off the ridge was surreal. Best mountain retreat I have ever booked." },
      { name: "Lucia S.", rating: 5, text: "High-end minimalist design that lets the mountain views speak for themselves. Impeccable service." },
      { name: "Nathan R.", rating: 5, text: "Extremely spacious. We had a small retreat here and the Chef's Kitchen was fully equipped for premium dining." },
      { name: "Isabella P.", rating: 5, text: "Watching the fog roll out of the valley while sitting by the outdoor firepit is a memory we will cherish." },
      { name: "Liam O.", rating: 5, text: "Private access to the national forest trails was fantastic. Coming home to a heated pool was perfection." }
    ],

    // 12 Images for Circular Gallery (CircularGallery)
    galleryCards: [
      { image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=600&fit=crop", title: "Summit View", description: "Looking out over the endless peaks of the Blue Ridge" },
      { image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop", title: "Sunset Dip", description: "The infinity pool glowing under a deep crimson sky" },
      { image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=600&fit=crop", title: "Cliffhanger Deck", description: "Cedar deck hanging dramatically above the valley" },
      { image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=600&fit=crop", title: "Minimalist Lounge", description: "Concrete and wood details meeting in a modern frame" },
      { image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=600&fit=crop", title: "Vista Bed", description: "Wake up facing the mountain folds through double-height glass" },
      { image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=600&fit=crop", title: "Copper Bath", description: "Bathing in the clouds overlooking the forest canyon" },
      { image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=600&fit=crop", title: "Plunge Pool Steam", description: "Warm steam rising over the edge of the cliff plunge" },
      { image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=600&fit=crop", title: "Cooking Prep", description: "Professional layout ready for local farm harvests" },
      { image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=600&fit=crop", title: "Stone Fireplace", description: "Spacious seating around the raw granite hearth" },
      { image: "https://images.unsplash.com/photo-1434064511983-18c6dae20ed5?w=400&h=600&fit=crop", title: "Mountain Trail", description: "Private pathway connecting to the Appalachian trail" },
      { image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop", title: "Morning View", description: "Heavy ridge mist burning away under early sun" },
      { image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop", title: "Dusk Silhouette", description: "Starry skies appearing over the Blue Ridge peaks" }
    ]
  }
];
