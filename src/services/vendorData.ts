
export interface VendorData {
  name: string;
  category: string;
  location: string;
  price_per_unit: string;
  notes: string;
  ratings: number;
}

export const vendorDatabase: VendorData[] = [
  { name: "A1 Grains Depot", category: "oil", location: "Andheri", price_per_unit: "Rs. 69/litre", notes: "Limited stock", ratings: 3.7 },
  { name: "Vinod Atta Centre", category: "tomato", location: "Andheri", price_per_unit: "Rs. 45/kg", notes: "Cash only", ratings: 4.1 },
  { name: "FreshCart Veggies", category: "bread", location: "Mumbai", price_per_unit: "Rs. 66/kg", notes: "Same-day delivery", ratings: 4.6 },
  { name: "Bharat Oil Traders", category: "onion", location: "Mumbai", price_per_unit: "Rs. 22/kg", notes: "Same-day delivery", ratings: 3.8 },
  { name: "KK Essentials", category: "salt", location: "Bandra", price_per_unit: "Rs. 73/kg", notes: "Cash only", ratings: 3.9 },
  { name: "SabziWala Bazaar", category: "potato", location: "Indore", price_per_unit: "Rs. 107/kg", notes: "Best in local market", ratings: 3.3 },
  { name: "Masala Ghar", category: "tomato", location: "Surat", price_per_unit: "Rs. 38/kg", notes: "Organic products", ratings: 4.0 },
  { name: "Hari Om Pulses", category: "zucchini", location: "Mumbai", price_per_unit: "Rs. 56/kg", notes: "Accepts UPI", ratings: 4.4 },
  { name: "Green Roots", category: "butter", location: "Andheri", price_per_unit: "Rs. 107/packet", notes: "Organic products", ratings: 3.5 },
  { name: "Shree Veg Supplies", category: "capsicum", location: "Ahmedabad", price_per_unit: "Rs. 70/kg", notes: "Organic products", ratings: 4.3 },
  { name: "Moti Oils", category: "bread", location: "Nagpur", price_per_unit: "Rs. 20/kg", notes: "Delivery on Tuesdays", ratings: 3.9 },
  { name: "Organic Basket", category: "flour", location: "Pune", price_per_unit: "Rs. 61/kg", notes: "Organic products", ratings: 3.7 },
  { name: "Raja Kirana", category: "capsicum", location: "Jaipur", price_per_unit: "Rs. 90/kg", notes: "Best in local market", ratings: 4.3 },
  { name: "Desi Masala Store", category: "potato", location: "Andheri", price_per_unit: "Rs. 56/kg", notes: "Open till 5PM", ratings: 4.6 },
  { name: "Nutrigrain Hub", category: "butter", location: "Delhi", price_per_unit: "Rs. 51/packet", notes: "Cash only", ratings: 3.9 },
  { name: "Spice Junction", category: "butter", location: "Jaipur", price_per_unit: "Rs. 105/packet", notes: "Cash only", ratings: 4.2 },
  { name: "Rural Fresh Market", category: "flour", location: "Mumbai", price_per_unit: "Rs. 36/kg", notes: "Accepts UPI", ratings: 3.8 },
  { name: "Navbharat Wholesale", category: "oil", location: "Indore", price_per_unit: "Rs. 109/litre", notes: "Limited stock", ratings: 4.5 },
  { name: "Ghar Ka Bazaar", category: "sugar", location: "Delhi", price_per_unit: "Rs. 25/kg", notes: "Cash only", ratings: 3.4 },
  { name: "Patanjali Distributors", category: "zucchini", location: "Pune", price_per_unit: "Rs. 104/kg", notes: "Cash only", ratings: 3.7 },
  { name: "Ajay & Sons", category: "tomato", location: "Ahmedabad", price_per_unit: "Rs. 44/kg", notes: "Best in local market", ratings: 4.3 },
  { name: "Om Organic Spices", category: "flour", location: "Indore", price_per_unit: "Rs. 76/kg", notes: "Delivery on Tuesdays", ratings: 3.2 },
  { name: "Desh Ka Mandi", category: "mushroom", location: "Pune", price_per_unit: "Rs. 69/kg", notes: "Organic products", ratings: 4.3 },
  { name: "Pure Agro Store", category: "butter", location: "Delhi", price_per_unit: "Rs. 60/packet", notes: "Delivery on Tuesdays", ratings: 3.9 },
  { name: "Golden Harvest", category: "flour", location: "Nagpur", price_per_unit: "Rs. 16/kg", notes: "Accepts UPI", ratings: 3.0 },
  { name: "TazaTandoor", category: "potato", location: "Nagpur", price_per_unit: "Rs. 94/kg", notes: "Organic products", ratings: 4.1 },
  { name: "Mahalaxmi Veggies", category: "onion", location: "Indore", price_per_unit: "Rs. 78/kg", notes: "Organic products", ratings: 4.7 },
  { name: "Annapurna Traders", category: "mushroom", location: "Indore", price_per_unit: "Rs. 56/kg", notes: "Discounts for regulars", ratings: 3.4 },
  { name: "BulkBuy India", category: "tomato", location: "Pune", price_per_unit: "Rs. 22/kg", notes: "Open till 5PM", ratings: 4.7 },
  { name: "Daily Deals Wholesale", category: "butter", location: "Pune", price_per_unit: "Rs. 99/packet", notes: "Bulk discount available", ratings: 3.4 },
  { name: "Farm2Fork", category: "bread", location: "Bandra", price_per_unit: "Rs. 23/kg", notes: "Limited stock", ratings: 4.5 },
  { name: "Urban Bazaar", category: "potato", location: "Surat", price_per_unit: "Rs. 28/kg", notes: "Open till 5PM", ratings: 4.3 },
  { name: "BharatMart", category: "onion", location: "Nagpur", price_per_unit: "Rs. 27/kg", notes: "Discounts for regulars", ratings: 3.5 },
  { name: "Krishna Provisions", category: "bread", location: "Jaipur", price_per_unit: "Rs. 78/kg", notes: "Best in local market", ratings: 5.0 },
  { name: "Aahar Bhandar", category: "mushroom", location: "Bandra", price_per_unit: "Rs. 35/kg", notes: "Open till 5PM", ratings: 3.3 },
  { name: "GroFresh Co.", category: "zucchini", location: "Bandra", price_per_unit: "Rs. 62/kg", notes: "Accepts UPI", ratings: 4.2 },
  { name: "Swasth Mandi", category: "onion", location: "Andheri", price_per_unit: "Rs. 95/kg", notes: "Discounts for regulars", ratings: 4.2 },
  { name: "StreetCart Suppliers", category: "bread", location: "Surat", price_per_unit: "Rs. 38/kg", notes: "Organic products", ratings: 4.0 },
  { name: "Prakriti Depot", category: "salt", location: "Mumbai", price_per_unit: "Rs. 35/kg", notes: "Discounts for regulars", ratings: 4.0 },
  { name: "Ruchira Foods", category: "capsicum", location: "Surat", price_per_unit: "Rs. 31/kg", notes: "Delivery on Tuesdays", ratings: 3.6 },
  { name: "Apna Bazaar", category: "bread", location: "Nagpur", price_per_unit: "Rs. 113/kg", notes: "Same-day delivery", ratings: 5.0 },
  { name: "Safa Suppliers", category: "tomato", location: "Surat", price_per_unit: "Rs. 55/kg", notes: "Same-day delivery", ratings: 4.2 },
  { name: "Mother Earth Wholesale", category: "onion", location: "Delhi", price_per_unit: "Rs. 33/kg", notes: "Best in local market", ratings: 3.9 },
  { name: "QuickCart", category: "oil", location: "Mumbai", price_per_unit: "Rs. 69/litre", notes: "Limited stock", ratings: 4.3 },
  { name: "Tulsi Kirana", category: "oil", location: "Mumbai", price_per_unit: "Rs. 66/litre", notes: "Accepts UPI", ratings: 3.5 },
  { name: "ZamZam Spices", category: "mushroom", location: "Delhi", price_per_unit: "Rs. 104/kg", notes: "Limited stock", ratings: 3.0 },
  { name: "FreshPot", category: "potato", location: "Bandra", price_per_unit: "Rs. 15/kg", notes: "Open till 5PM", ratings: 3.9 },
  { name: "Desi Essentials", category: "sugar", location: "Nagpur", price_per_unit: "Rs. 98/kg", notes: "Organic products", ratings: 3.9 },
  { name: "VeggieKart", category: "potato", location: "Indore", price_per_unit: "Rs. 64/kg", notes: "Open till 5PM", ratings: 3.8 },
  { name: "Grokart India", category: "bread", location: "Mumbai", price_per_unit: "Rs. 99/kg", notes: "Accepts UPI", ratings: 4.9 }
];
