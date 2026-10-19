// ====== CONTACT SETTINGS ======
// Change this to the company's WhatsApp number (country code + number, no + or spaces)
const WHATSAPP = '50489520750';          // used for the links and the booking/review messages
const WHATSAPP_TEXT = '+504 8952-0750';   // how the number is shown in the footer
const FACEBOOK_URL = 'https://www.facebook.com/carlostours1/';
const INSTAGRAM_URL = 'https://www.instagram.com/carlostours_/';

// ====== AGE GROUPS (shown on each tour page) ======
const AGES = { adult: 'Adults (18+)', teen: 'Teenagers (11-17)', child: 'Children (4-10)' };

// ====== TOURS ======
// price = price per adult. Optional: priceTeen, priceChild (if missing, they use price).
// Optional info: duration, ages, guide (example: "English and Spanish"), includes, notIncluded, expect, tips, images
// Photos: put them in img/galeria/ and list them in images: ['img/galeria/photo.jpg']
// The FIRST photo in images is also used as the picture on the tour card in the home page.
const TOURS = {
  "atv-city-sloths": {
    service: "ATVs, City Tour and Sloths combo", name: "ATVs, City Tour and Sloths Combo", emoji: "🏍️", g: "bg7", price: 120,
    short: "Three Roatán experiences in one package.",
    description: [
      "Three of Roatán's favorite experiences in a single package: an ATV ride, a city tour and a sloth encounter.",
      "A great option for families, couples and groups who want to see a lot, with private transportation for your group."
    ],
    includes: ["ATV ride", "City tour", "Sloth encounter"],
    tips: ["Wear closed shoes and comfortable clothes", "Bring a camera for the sloth encounter"],
    images: []
  },
  "island-tour": {
    service: "Island Tour", name: "Island Tour", emoji: "🚐", g: "bg1", price: 0,
    short: "Viewpoints, villages and the best of the island in one day.",
    description: [
      "See the best of Roatán in one day: viewpoints, island villages and the scenery that makes the island special.",
      "Your driver adapts the stops to your group and your time, so you can enjoy the island at your own pace."
    ],
    tips: ["Bring a camera, sunscreen and a hat", "Wear comfortable clothes and shoes"],
    images: []
  },
  "snorkel": {
    service: "Snorkel", name: "Snorkel", emoji: "🐠", g: "bg2", price: 0,
    short: "Swim over the reef among colorful fish and corals.",
    description: [
      "Explore the clear water of Roatán's reef and swim among colorful fish and corals.",
      "A great way to enjoy the Caribbean up close."
    ],
    tips: ["Bring a swimsuit and a towel", "Use reef-safe sunscreen to protect the corals"],
    images: []
  },
  "dolphin-encounter": {
    service: "Dolphin encounter", name: "Dolphin Encounter", emoji: "🐬", g: "bg3", price: 0,
    short: "Meet dolphins up close.",
    description: [
      "Meet dolphins up close in an experience the whole family remembers.",
      "We take care of the transportation so you can focus on enjoying the moment."
    ],
    tips: ["Bring a swimsuit, a towel and a change of clothes", "Bring a camera for the memories"],
    images: []
  },
  "zipline": {
    service: "Zipline", name: "Zipline", emoji: "🌴", g: "bg4", price: 0,
    short: "Fly over the jungle canopy with a view of the Caribbean.",
    description: [
      "Fly over the jungle canopy with views of the Caribbean.",
      "A fun adventure for friends, couples and families."
    ],
    tips: ["Wear closed shoes and comfortable clothes", "Ask us about age and weight requirements when you book"],
    images: []
  },
  "west-bay-west-end": {
    service: "West Bay / West End", name: "West Bay & West End Beach Trip", emoji: "🏝️", g: "bg5", price: 0,
    short: "White sand, clear water and a relaxed beach day.",
    description: [
      "Spend a relaxed day on two of Roatán's best-known beach areas, with white sand and clear water.",
      "We take you there and bring you back, so you only need to enjoy the beach."
    ],
    tips: ["Bring a swimsuit, a towel and sunscreen", "Bring some cash for food and drinks"],
    images: []
  },
  "mangrove-trip": {
    service: "Mangrove trip", name: "Mangrove Trip", emoji: "🌿", g: "bg6", price: 0,
    short: "Explore the island's quiet side by water.",
    description: [
      "Explore the quiet side of the island by water, gliding among the mangroves.",
      "A peaceful experience to see nature up close and take great photos."
    ],
    tips: ["Bring a hat, sunscreen and insect repellent", "Bring a camera"],
    images: ["img/galeria/mangrove-boat.jpg", "img/galeria/mangrove-water.jpg"]
  }
};

// Shown on every tour page (edit if it is not true for a tour)
const COMMON_INCLUDED = ["Private transportation for your group"];
const COMMON_EXPECT = [
  "Private transportation, only for your group",
  "A local driver who knows the island",
  "Pickup time and place arranged with you on WhatsApp"
];

const priceFor = (t, k) => (k === 'teen' ? (t.priceTeen ?? t.price) : k === 'child' ? (t.priceChild ?? t.price) : t.price);
const money = n => '$' + (Number.isInteger(n) ? n : n.toFixed(2));
