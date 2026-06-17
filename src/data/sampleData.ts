import bluetooth from "@/assets/prod-bluetooth.jpg";
import party from "@/assets/prod-party.jpg";
import soundbar from "@/assets/prod-soundbar.jpg";
import hometheatre from "@/assets/prod-hometheatre.jpg";
import accessories from "@/assets/prod-accessories.jpg";
import before1 from "@/assets/before-1.jpg";
import after1 from "@/assets/after-1.jpg";

export const categories = [
  { slug: "bluetooth", name: "Bluetooth Speakers", img: bluetooth, icon: "bluetooth" },
  { slug: "party", name: "Party Speakers", img: party, icon: "disc" },
  { slug: "soundbar", name: "Soundbars", img: soundbar, icon: "audio-waveform" },
  { slug: "home-theatre", name: "Home Theatre", img: hometheatre, icon: "monitor" },
  { slug: "accessories", name: "Accessories", img: accessories, icon: "headphones" },
];

export const brands = ["JBL", "Sony", "boAt", "Bose", "Zebronics", "Marshall", "Philips"];

export type Product = {
  id: string;
  name: string;
  category: string; // slug
  categoryLabel: string;
  brand: string;
  price: number;
  mrp?: number;
  rating: number;
  reviews: number;
  badge?: string;
  img: string;
  description: string;
  highlights: string[];
  inStock: boolean;
};

export const repairServices = [
  { title: "Speaker Repair", desc: "All types of speaker repairs & recone service.", icon: "speaker" },
  { title: "Amplifier Repair", desc: "Amplifier, receiver & subwoofer repairs.", icon: "cpu" },
  { title: "Soundbar Repair", desc: "Soundbar not working? We've got you covered.", icon: "audio-waveform" },
  { title: "Pickup & Delivery", desc: "Pickup & delivery at your doorstep.", icon: "truck" },
];

export const portfolio = [
  { before: before1, after: after1, title: "JBL Subwoofer Recone", brand: "JBL" },
  { before: before1, after: after1, title: "Vintage Speaker Restore", brand: "Sony" },
  { before: before1, after: after1, title: "Home Theatre Repair", brand: "Bose" },
];

const desc = "Experience studio-grade sound with deep bass, crystal-clear highs and premium build quality. Backed by AudioCare's expert support and warranty.";
const highlights = [
  "Powerful drivers with rich, room-filling sound",
  "Bluetooth 5.3 + AUX + USB connectivity",
  "Up to 24 hours of playback on a single charge",
  "IPX7 water-resistant, party-ready build",
  "1 Year manufacturer warranty + AudioCare service",
];

export const products: Product[] = [
  { id: "jbl-charge-5", name: "JBL Charge 5", category: "bluetooth", categoryLabel: "Bluetooth Speaker", brand: "JBL", price: 12999, mrp: 16999, rating: 4.8, reviews: 1245, img: bluetooth, description: desc, highlights, inStock: true, badge: "Hot" },
  { id: "sony-srs-xb43", name: "Sony SRS-XB43", category: "bluetooth", categoryLabel: "Bluetooth Speaker", brand: "Sony", price: 18990, mrp: 22990, rating: 4.7, reviews: 502, img: bluetooth, description: desc, highlights, inStock: true },
  { id: "marshall-emberton", name: "Marshall Emberton II", category: "bluetooth", categoryLabel: "Portable Speaker", brand: "Marshall", price: 14999, mrp: 17999, rating: 4.6, reviews: 318, img: bluetooth, description: desc, highlights, inStock: true },
  { id: "boat-stone-1000", name: "boAt Stone 1000", category: "bluetooth", categoryLabel: "Portable Speaker", brand: "boAt", price: 2999, mrp: 4990, rating: 4.3, reviews: 2105, img: bluetooth, description: desc, highlights, inStock: true },
  { id: "jbl-partybox-710", name: "JBL PartyBox 710", category: "party", categoryLabel: "Party Speaker", brand: "JBL", price: 54999, mrp: 64999, rating: 4.9, reviews: 746, badge: "Best Seller", img: party, description: desc, highlights, inStock: true },
  { id: "sony-srs-xp700", name: "Sony SRS-XP700", category: "party", categoryLabel: "Party Speaker", brand: "Sony", price: 49990, mrp: 59990, rating: 4.7, reviews: 412, img: party, description: desc, highlights, inStock: true },
  { id: "zeb-monstro", name: "Zebronics Monstro", category: "party", categoryLabel: "Party Speaker", brand: "Zebronics", price: 19999, mrp: 24999, rating: 4.4, reviews: 256, img: party, description: desc, highlights, inStock: true },
  { id: "boat-aavante", name: "boAt Aavante Bar 1500", category: "soundbar", categoryLabel: "Soundbar", brand: "boAt", price: 9999, mrp: 14999, rating: 4.5, reviews: 645, img: soundbar, description: desc, highlights, inStock: true },
  { id: "jbl-bar-5-1", name: "JBL Bar 5.1", category: "soundbar", categoryLabel: "Soundbar", brand: "JBL", price: 44999, mrp: 54999, rating: 4.8, reviews: 389, img: soundbar, description: desc, highlights, inStock: true, badge: "Premium" },
  { id: "sony-ht-s40r", name: "Sony HT-S40R", category: "soundbar", categoryLabel: "Soundbar 5.1", brand: "Sony", price: 27990, mrp: 32990, rating: 4.6, reviews: 522, img: soundbar, description: desc, highlights, inStock: true },
  { id: "zebronics-51", name: "Zebronics 5.1 Home Theatre", category: "home-theatre", categoryLabel: "Home Theatre", brand: "Zebronics", price: 7499, mrp: 9999, rating: 4.4, reviews: 512, img: hometheatre, description: desc, highlights, inStock: true },
  { id: "bose-acoustimass", name: "Bose Acoustimass 5", category: "home-theatre", categoryLabel: "Home Theatre", brand: "Bose", price: 89999, mrp: 109999, rating: 4.9, reviews: 198, img: hometheatre, description: desc, highlights, inStock: false, badge: "Luxury" },
  { id: "philips-htb", name: "Philips HTB5580", category: "home-theatre", categoryLabel: "Home Theatre", brand: "Philips", price: 34999, mrp: 39999, rating: 4.3, reviews: 142, img: hometheatre, description: desc, highlights, inStock: true },
  { id: "aux-cable", name: "AUX Cable 3.5mm Premium Braided", category: "accessories", categoryLabel: "Accessory", brand: "boAt", price: 349, mrp: 599, rating: 4.3, reviews: 312, img: accessories, description: desc, highlights, inStock: true },
  { id: "speaker-stand", name: "Universal Speaker Stand (Pair)", category: "accessories", categoryLabel: "Accessory", brand: "Zebronics", price: 1899, mrp: 2499, rating: 4.2, reviews: 88, img: accessories, description: desc, highlights, inStock: true },
  { id: "hdmi-arc", name: "HDMI ARC Cable 2m", category: "accessories", categoryLabel: "Accessory", brand: "Philips", price: 499, mrp: 799, rating: 4.5, reviews: 421, img: accessories, description: desc, highlights, inStock: true },
];

export const reviews = [
  { name: "Rohan Mehta", rating: 5, text: "Amazing service! My 10+ year old speaker is working like new again. Highly recommended!" },
  { name: "Priya Sharma", rating: 5, text: "Quick pickup & delivery. The team is super professional and genuine." },
  { name: "Arjun Nair", rating: 5, text: "Best audio shop with premium brands and top-notch service." },
  { name: "Sneha Iyer", rating: 5, text: "They fixed my soundbar the same day. Truly fast and trustworthy!" },
];
