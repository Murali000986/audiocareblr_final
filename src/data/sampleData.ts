import bluetooth from "@/assets/prod-bluetooth.jpg";
import party from "@/assets/prod-party.jpg";
import soundbar from "@/assets/prod-soundbar.jpg";
import hometheatre from "@/assets/prod-hometheatre.jpg";
import accessories from "@/assets/prod-accessories.jpg";
import before1 from "@/assets/before-1.jpg";
import after1 from "@/assets/after-1.jpg";

export const categories = [
  { name: "Bluetooth Speakers", img: bluetooth, icon: "bluetooth" },
  { name: "Party Speakers", img: party, icon: "disc" },
  { name: "Soundbars", img: soundbar, icon: "audio-waveform" },
  { name: "Home Theatre", img: hometheatre, icon: "monitor" },
  { name: "Accessories", img: accessories, icon: "headphones" },
];

export const repairServices = [
  { title: "Speaker Repair", desc: "All types of speaker repairs & recone service.", icon: "speaker" },
  { title: "Amplifier Repair", desc: "Amplifier, receiver & subwoofer repairs.", icon: "cpu" },
  { title: "Soundbar Repair", desc: "Soundbar not working? We've got you covered.", icon: "audio-waveform" },
  { title: "Pickup & Delivery", desc: "Free pickup & delivery at your doorstep.", icon: "truck" },
];

export const portfolio = [
  { before: before1, after: after1, title: "JBL Subwoofer Recone", brand: "JBL" },
  { before: before1, after: after1, title: "Vintage Speaker Restore", brand: "Sony" },
  { before: before1, after: after1, title: "Home Theatre Repair", brand: "Bose" },
];

export const products = [
  { id: "jbl-charge-5", name: "JBL Charge 5", category: "Bluetooth Speaker", price: 12999, rating: 4.8, reviews: 1245, img: bluetooth },
  { id: "sony-srs-xb43", name: "Sony SRS-XB43", category: "Bluetooth Speaker", price: 18990, rating: 4.7, reviews: 502, img: bluetooth },
  { id: "jbl-partybox-710", name: "JBL PartyBox 710", category: "Party Speaker", price: 54999, rating: 4.9, reviews: 746, badge: "Best Seller", img: party },
  { id: "boat-aavante", name: "boAt Aavante", category: "Bar 1500 Soundbar", price: 9999, rating: 4.5, reviews: 645, img: soundbar },
  { id: "zebronics-51", name: "Zebronics 5.1", category: "Home Theatre", price: 7499, rating: 4.4, reviews: 512, img: hometheatre },
  { id: "aux-cable", name: "AUX Cable 3.5mm", category: "Premium Braided", price: 349, rating: 4.3, reviews: 312, img: accessories },
];

export const reviews = [
  { name: "Rohan Mehta", rating: 5, text: "Amazing service! My 10+ year old speaker is working like new again. Highly recommended!" },
  { name: "Priya Sharma", rating: 5, text: "Quick pickup & delivery. The team is super professional and genuine." },
  { name: "Arjun Nair", rating: 5, text: "Best audio shop with premium brands and top-notch service." },
  { name: "Sneha Iyer", rating: 5, text: "They fixed my soundbar the same day. Truly fast and trustworthy!" },
];
