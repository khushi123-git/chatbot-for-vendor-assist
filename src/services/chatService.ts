import { Supplier } from "@/components/SupplierCard";

// Dummy supplier data
const SUPPLIERS: Supplier[] = [
  {
    name: "FreshBazaar",
    price: 12,
    rating: 4.5,
    deliveryTime: "30 min",
    contact: "+91 98765 43210",
    location: "Main Market, Mumbai"
  },
  {
    name: "Suresh Bhai",
    price: 11,
    rating: 3.8,
    deliveryTime: "1 hr",
    contact: "+91 98765 43211",
    location: "Vegetable Mandi, Pune"
  },
  {
    name: "LocalMandi",
    price: 14,
    rating: 4.7,
    deliveryTime: "15 min",
    contact: "+91 98765 43212",
    location: "Local Market, Delhi"
  },
  {
    name: "Kirana Express",
    price: 13,
    rating: 4.0,
    deliveryTime: "45 min",
    contact: "+91 98765 43213",
    location: "Express Delivery Service"
  }
];

// Language detection based on common words/phrases
export const detectLanguage = (text: string): 'hi' | 'mr' | 'en' => {
  const hindiKeywords = ['chahiye', 'mujhe', 'kilo', 'sasta', 'jaldi', 'pyaaz', 'aloo', 'tamatar', 'sabji'];
  const marathiKeywords = ['hava', 'mala', 'dukaan', 'kanda', 'batata', 'bhaji', 'market'];
  
  const lowerText = text.toLowerCase();
  
  const hindiCount = hindiKeywords.filter(word => lowerText.includes(word)).length;
  const marathiCount = marathiKeywords.filter(word => lowerText.includes(word)).length;
  
  if (hindiCount > marathiCount && hindiCount > 0) return 'hi';
  if (marathiCount > 0) return 'mr';
  return 'en';
};

// Extract requirements from user message
export const parseUserQuery = (message: string) => {
  const urgentKeywords = ['jaldi', 'urgent', 'abhi', 'turant', 'now'];
  const cheapKeywords = ['sasta', 'cheap', 'kam', 'price'];
  const qualityKeywords = ['best', 'accha', 'quality', 'fresh'];
  
  const lowerMessage = message.toLowerCase();
  
  // Extract quantity
  const quantityMatch = message.match(/(\d+\.?\d*)\s*(kilo|kg|किलो)/i);
  const quantity = quantityMatch ? parseFloat(quantityMatch[1]) : null;
  
  // Extract item (simple mapping)
  const itemMapping: { [key: string]: string } = {
    'pyaaz': 'onion', 'kanda': 'onion', 'onion': 'onion',
    'aloo': 'potato', 'batata': 'potato', 'potato': 'potato',
    'tamatar': 'tomato', 'tomato': 'tomato',
    'sabji': 'vegetables', 'vegetables': 'vegetables'
  };
  
  let item = 'vegetables';
  for (const [key, value] of Object.entries(itemMapping)) {
    if (lowerMessage.includes(key)) {
      item = value;
      break;
    }
  }
  
  return {
    item,
    quantity,
    isUrgent: urgentKeywords.some(keyword => lowerMessage.includes(keyword)),
    wantsCheap: cheapKeywords.some(keyword => lowerMessage.includes(keyword)),
    wantsQuality: qualityKeywords.some(keyword => lowerMessage.includes(keyword))
  };
};

// Sort suppliers based on user preferences
export const recommendSuppliers = (requirements: ReturnType<typeof parseUserQuery>) => {
  let sortedSuppliers = [...SUPPLIERS];
  
  if (requirements.isUrgent) {
    // Sort by delivery time (ascending)
    sortedSuppliers.sort((a, b) => {
      const timeA = parseInt(a.deliveryTime);
      const timeB = parseInt(b.deliveryTime);
      return timeA - timeB;
    });
  } else if (requirements.wantsCheap) {
    // Sort by price (ascending)
    sortedSuppliers.sort((a, b) => a.price - b.price);
  } else if (requirements.wantsQuality) {
    // Sort by rating (descending)
    sortedSuppliers.sort((a, b) => b.rating - a.rating);
  } else {
    // Default: balance of price and rating
    sortedSuppliers.sort((a, b) => {
      const scoreA = (5 - a.rating) + (a.price / 100);
      const scoreB = (5 - b.rating) + (b.price / 100);
      return scoreA - scoreB;
    });
  }
  
  return sortedSuppliers.slice(0, 3); // Return top 3
};

// Generate response in appropriate language
export const generateResponse = (
  language: 'hi' | 'mr' | 'en',
  requirements: ReturnType<typeof parseUserQuery>,
  suppliers: Supplier[]
): string => {
  const responses = {
    hi: {
      greeting: `आपको ${requirements.item} चाहिए? यहाँ सबसे अच्छे suppliers हैं:`,
      urgent: "जल्दी delivery के लिए ये सबसे अच्छे हैं:",
      cheap: "सबसे सस्ते options:",
      quality: "सबसे अच्छी quality के लिए:",
      default: "आपके लिए best suppliers:"
    },
    mr: {
      greeting: `तुम्हाला ${requirements.item} हवा? इथे सर्वोत्तम suppliers आहेत:`,
      urgent: "जलद delivery साठी हे सर्वोत्तम आहेत:",
      cheap: "सर्वात स्वस्त options:",
      quality: "सर्वोत्तम quality साठी:",
      default: "तुमच्यासाठी best suppliers:"
    },
    en: {
      greeting: `Looking for ${requirements.item}? Here are the best suppliers:`,
      urgent: "For urgent delivery, these are the best:",
      cheap: "Cheapest options:",
      quality: "For best quality:",
      default: "Best suppliers for you:"
    }
  };
  
  const langResponses = responses[language];
  
  if (requirements.isUrgent) return langResponses.urgent;
  if (requirements.wantsCheap) return langResponses.cheap;
  if (requirements.wantsQuality) return langResponses.quality;
  return langResponses.default;
};

// Main chat processing function
export const processChatMessage = async (message: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const language = detectLanguage(message);
  const requirements = parseUserQuery(message);
  const recommendedSuppliers = recommendSuppliers(requirements);
  const response = generateResponse(language, requirements, recommendedSuppliers);
  
  return {
    text: response,
    suppliers: recommendedSuppliers,
    language
  };
};