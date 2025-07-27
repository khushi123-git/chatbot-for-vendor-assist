import { Supplier } from "@/components/SupplierCard";

// Generate dynamic supplier data based on location and item
const generateSuppliers = (item: string, location?: string): Supplier[] => {
  const cityPrefixes = {
    'delhi': ['Azadpur', 'Lajpat Nagar', 'Connaught Place', 'Karol Bagh'],
    'mumbai': ['Crawford Market', 'Dadar', 'Andheri', 'Bandra'],
    'pune': ['Gultekdi', 'Shaniwar Peth', 'Camp', 'Kothrud'],
    'bangalore': ['KR Market', 'Malleshwaram', 'Jayanagar', 'Electronic City'],
    'hyderabad': ['Begum Bazaar', 'Ameerpet', 'Jubilee Hills', 'Secunderabad'],
    'kolkata': ['New Market', 'Gariahat', 'Salt Lake', 'Park Street']
  };

  const supplierNames = [
    'Fresh Farm Co', 'Kisaan Bhai', 'Green Valley', 'Mandi Express',
    'Farm Direct', 'Sabzi Wala', 'Quality Traders', 'Bulk Bazaar',
    'Wholesale King', 'Metro Suppliers', 'City Fresh', 'Veggie Hub'
  ];

  const detectCity = (text: string): string => {
    const lowerText = text.toLowerCase();
    for (const city of Object.keys(cityPrefixes)) {
      if (lowerText.includes(city)) return city;
    }
    return 'delhi'; // default
  };

  const city = location ? detectCity(location) : 'delhi';
  const areas = cityPrefixes[city as keyof typeof cityPrefixes] || cityPrefixes.delhi;

  // Generate 3-4 suppliers with varying prices and ratings
  const suppliers: Supplier[] = [];
  const basePrice = getBasePrice(item);
  
  for (let i = 0; i < 3; i++) {
    const priceVariation = (Math.random() - 0.5) * 6; // ±3 price variation
    const price = Math.max(basePrice + priceVariation, 5);
    
    suppliers.push({
      name: supplierNames[Math.floor(Math.random() * supplierNames.length)],
      price: Math.round(price * 100) / 100,
      rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
      deliveryTime: ['15 min', '30 min', '45 min', '1 hr'][Math.floor(Math.random() * 4)],
      contact: `+91 ${Math.floor(Math.random() * 90000) + 10000} ${Math.floor(Math.random() * 90000) + 10000}`,
      location: `${areas[i % areas.length]}, ${city.charAt(0).toUpperCase() + city.slice(1)}`
    });
  }
  
  return suppliers;
};

const getBasePrice = (item: string): number => {
  const prices: { [key: string]: number } = {
    'onion': 25, 'potato': 20, 'tomato': 30, 'cucumber': 18,
    'oil': 150, 'flour': 40, 'spices': 200, 'salt': 25,
    'sugar': 45, 'chili': 60, 'vegetables': 25
  };
  return prices[item.toLowerCase()] || 30;
};

// Enhanced language detection with more keywords
export const detectLanguage = (text: string): 'hi' | 'mr' | 'en' => {
  const hindiKeywords = [
    'chahiye', 'mujhe', 'kilo', 'sasta', 'jaldi', 'pyaaz', 'aloo', 'tamatar', 'sabji',
    'kahan', 'milega', 'vendor', 'supplier', 'dukaan', 'bazaar', 'market', 'kaam',
    'business', 'paisa', 'rate', 'bhav', 'tel', 'masala', 'atta', 'namaste', 'dhanyawad'
  ];
  const marathiKeywords = [
    'hava', 'mala', 'dukaan', 'kanda', 'batata', 'bhaji', 'market',
    'kuthe', 'milel', 'vendor', 'supplier', 'bazaar', 'kaam', 'paise',
    'rate', 'bhav', 'tel', 'masala', 'namaskar', 'dhanyawad'
  ];
  
  const lowerText = text.toLowerCase();
  
  const hindiCount = hindiKeywords.filter(word => lowerText.includes(word)).length;
  const marathiCount = marathiKeywords.filter(word => lowerText.includes(word)).length;
  
  if (hindiCount > marathiCount && hindiCount > 0) return 'hi';
  if (marathiCount > 0) return 'mr';
  return 'en';
};

// Check for greeting patterns
export const isGreeting = (message: string): boolean => {
  const greetings = [
    'hi', 'hello', 'hey', 'namaste', 'namaskar', 'good morning', 'good afternoon',
    'good evening', 'kaise ho', 'kya haal', 'kaisa hai', 'kemon acho'
  ];
  return greetings.some(greeting => message.toLowerCase().includes(greeting));
};

// Check for help/general queries
export const isGeneralQuery = (message: string): boolean => {
  const generalQueries = [
    'help', 'madad', 'kya kar sakte ho', 'what can you do', 'how does this work',
    'tumhara kaam kya hai', 'guide', 'batao', 'samjhao'
  ];
  return generalQueries.some(query => message.toLowerCase().includes(query));
};

// Enhanced requirements extraction with more items
export const parseUserQuery = (message: string) => {
  const urgentKeywords = ['jaldi', 'urgent', 'abhi', 'turant', 'now', 'immediately', 'asap'];
  const cheapKeywords = ['sasta', 'cheap', 'kam', 'price', 'low cost', 'budget', 'affordable'];
  const qualityKeywords = ['best', 'accha', 'quality', 'fresh', 'premium', 'top', 'badhiya'];
  
  const lowerMessage = message.toLowerCase();
  
  // Extract quantity
  const quantityMatch = message.match(/(\d+\.?\d*)\s*(kilo|kg|किलो|quintal|ton)/i);
  const quantity = quantityMatch ? parseFloat(quantityMatch[1]) : null;
  
  // Expanded item mapping for street food vendors  
  const itemMapping: { [key: string]: string } = {
    // Vegetables
    'pyaaz': 'onion', 'kanda': 'onion', 'onion': 'onion',
    'aloo': 'potato', 'batata': 'potato', 'potato': 'potato',
    'tamatar': 'tomato', 'tomato': 'tomato',
    'cucumber': 'cucumber', 'kheera': 'cucumber', 'kakdi': 'cucumber',
    'sabji': 'vegetables', 'vegetables': 'vegetables',
    'hari mirch': 'green chili', 'chili': 'green chili',
    
    // Cooking essentials
    'tel': 'oil', 'oil': 'oil', 'cooking oil': 'oil',
    'atta': 'flour', 'flour': 'flour', 'maida': 'refined flour',
    'masala': 'spices', 'spices': 'spices', 'garam masala': 'spices',
    'namak': 'salt', 'salt': 'salt',
    'chini': 'sugar', 'sugar': 'sugar',
    
    // Street food specific
    'puri': 'puri', 'bhel': 'bhel mix', 'sev': 'sev',
    'chutney': 'chutney', 'sauce': 'sauce',
    'bread': 'bread', 'pav': 'pav bread'
  };
  
  let item = 'supplies';
  for (const [key, value] of Object.entries(itemMapping)) {
    if (lowerMessage.includes(key)) {
      item = value;
      break;
    }
  }
  
  // Extract location from message
  const location = message; // Pass the full message for location detection
  
  return {
    item,
    quantity,
    location,
    isUrgent: urgentKeywords.some(keyword => lowerMessage.includes(keyword)),
    wantsCheap: cheapKeywords.some(keyword => lowerMessage.includes(keyword)),
    wantsQuality: qualityKeywords.some(keyword => lowerMessage.includes(keyword)),
    isGreeting: isGreeting(message),
    isGeneralQuery: isGeneralQuery(message)
  };
};

// Generate and sort suppliers based on user preferences
export const recommendSuppliers = (requirements: ReturnType<typeof parseUserQuery>) => {
  // Generate fresh suppliers for each request to avoid repetition
  let suppliers = generateSuppliers(requirements.item, requirements.location);
  
  if (requirements.isUrgent) {
    // Sort by delivery time (ascending)
    suppliers.sort((a, b) => {
      const timeA = parseInt(a.deliveryTime);
      const timeB = parseInt(b.deliveryTime);
      return timeA - timeB;
    });
  } else if (requirements.wantsCheap) {
    // Sort by price (ascending)
    suppliers.sort((a, b) => a.price - b.price);
  } else if (requirements.wantsQuality) {
    // Sort by rating (descending)
    suppliers.sort((a, b) => b.rating - a.rating);
  } else {
    // Default: balance of price and rating
    suppliers.sort((a, b) => {
      const scoreA = (5 - a.rating) + (a.price / 100);
      const scoreB = (5 - b.rating) + (b.price / 100);
      return scoreA - scoreB;
    });
  }
  
  return suppliers; // Return generated suppliers
};

// Varied greeting responses
const getGreetingResponse = (language: 'hi' | 'mr' | 'en'): string => {
  const greetings = {
    hi: [
      "नमस्ते भाई! मैं आपका Vendor Assist Bot हूँ। आज कौन सा सामान चाहिए?",
      "हैलो! कैसे हैं आप? बताइए क्या चाहिए आपके business के लिए?",
      "नमस्कार! मैं यहाँ आपकी मदद के लिए हूँ। कौन से suppliers ढूंढ रहे हैं?"
    ],
    mr: [
      "नमस्कार भाऊ! मी तुमचा Vendor Assist Bot आहे। आज काय हवं?",
      "हॅलो! कसे आहात? सांगा काय गरज आहे तुमच्या business साठी?",
      "नमस्कार! मी इथे तुमची मदत करण्यासाठी आहे। कोणते suppliers शोधत आहात?"
    ],
    en: [
      "Hello! I'm your Vendor Assist Bot. What supplies do you need for your street food business today?",
      "Hi there! How can I help you find the best suppliers in your area?",
      "Namaste! I'm here to make your vendor life easier. What are you looking for?"
    ]
  };
  
  const options = greetings[language];
  return options[Math.floor(Math.random() * options.length)];
};

// Help/general responses
const getHelpResponse = (language: 'hi' | 'mr' | 'en'): string => {
  const helpResponses = {
    hi: [
      "मैं आपको suppliers ढूंढने में मदद करता हूँ! बताइए:\n• कौन सा सामान चाहिए (प्याज, आलू, तेल, मसाला)\n• कितनी quantity चाहिए\n• कौन सा area है आपका",
      "मैं street food vendors की मदद करता हूँ! आप कह सकते हैं:\n'मुझे Bandra में आलू चाहिए' या 'सस्ता तेल कहाँ मिलेगा?'",
      "मैं आपके business के लिए बेस्ट suppliers ढूंढता हूँ। बस बताइए क्या चाहिए और कहाँ चाहिए!"
    ],
    mr: [
      "मी तुम्हाला suppliers शोधण्यात मदत करतो! सांगा:\n• काय सामान हवं (कांदा, बटाटा, तेल, मसाला)\n• किती quantity हवी\n• कोणता area आहे तुमचा",
      "मी street food vendors ची मदत करतो! तुम्ही म्हणू शकता:\n'मला Bandra मध्ये बटाटा हवा' किंवा 'स्वस्त तेल कुठे मिळेल?'",
      "मी तुमच्या business साठी बेस्ट suppliers शोधतो। फक्त सांगा काय हवं आणि कुठे हवं!"
    ],
    en: [
      "I help you find the best suppliers! Just tell me:\n• What items you need (onions, potatoes, oil, spices)\n• How much quantity\n• Which area you're in",
      "I assist street food vendors! You can say:\n'I need potatoes in Bandra' or 'Where can I get cheap oil?'",
      "I find the best suppliers for your business. Just tell me what you need and where!"
    ]
  };
  
  const options = helpResponses[language];
  return options[Math.floor(Math.random() * options.length)];
};

// Enhanced response generation with more variety
export const generateResponse = (
  language: 'hi' | 'mr' | 'en',
  requirements: ReturnType<typeof parseUserQuery>,
  suppliers: Supplier[]
): string => {
  // Handle greetings
  if (requirements.isGreeting) {
    return getGreetingResponse(language);
  }
  
  // Handle general help queries
  if (requirements.isGeneralQuery) {
    return getHelpResponse(language);
  }
  
  // Varied supplier responses
  const responses = {
    hi: {
      urgent: [
        `${requirements.item} जल्दी चाहिए? ये suppliers तुरंत deliver करते हैं:`,
        `अरे भाई, urgent ${requirements.item} के लिए ये सबसे बेस्ट हैं:`,
        `जल्दी ${requirements.item} चाहिए तो इनसे contact करिए:`
      ],
      cheap: [
        `पैसे बचाना है? ${requirements.item} के लिए ये सबसे सस्ते suppliers हैं:`,
        `बढ़िया! सस्ते ${requirements.item} के लिए ये देखिए:`,
        `कम budget में ${requirements.item} चाहिए? ये options हैं:`
      ],
      quality: [
        `बेस्ट quality ${requirements.item} चाहिए? ये suppliers top हैं:`,
        `अच्छी quality के लिए ये suppliers try करिए:`,
        `प्रीमियम ${requirements.item} के लिए ये बेस्ट हैं:`
      ],
      default: [
        `${requirements.item} के लिए ये verified suppliers हैं:`,
        `आपके area के पास ये अच्छे suppliers हैं:`,
        `${requirements.item} के लिए ये trusted options देखिए:`
      ]
    },
    mr: {
      urgent: [
        `${requirements.item} जलद हवं? हे suppliers तुरंत deliver करतात:`,
        `अरे भाऊ, urgent ${requirements.item} साठी हे सर्वोत्तम आहेत:`,
        `जलद ${requirements.item} हवं तर यांना contact करा:`
      ],
      cheap: [
        `पैसे बचवायचे आहेत? ${requirements.item} साठी हे सर्वात स्वस्त suppliers आहेत:`,
        `छान! स्वस्त ${requirements.item} साठी हे बघा:`,
        `कमी budget मध्ये ${requirements.item} हवं? हे options आहेत:`
      ],
      quality: [
        `बेस्ट quality ${requirements.item} हवं? हे suppliers टॉप आहेत:`,
        `चांगली quality साठी हे suppliers try करा:`,
        `प्रीमियम ${requirements.item} साठी हे बेस्ट आहेत:`
      ],
      default: [
        `${requirements.item} साठी हे verified suppliers आहेत:`,
        `तुमच्या area जवळ हे चांगले suppliers आहेत:`,
        `${requirements.item} साठी हे trusted options बघा:`
      ]
    },
    en: {
      urgent: [
        `Need ${requirements.item} urgently? These suppliers deliver fast:`,
        `Hey, for urgent ${requirements.item} these are the best:`,
        `Quick ${requirements.item} needed? Contact these suppliers:`
      ],
      cheap: [
        `Want to save money? These are the cheapest ${requirements.item} suppliers:`,
        `Great! For affordable ${requirements.item}, check these out:`,
        `Low budget ${requirements.item} needed? Here are your options:`
      ],
      quality: [
        `Want best quality ${requirements.item}? These suppliers are top-notch:`,
        `For premium quality, try these ${requirements.item} suppliers:`,
        `Premium ${requirements.item} available from these suppliers:`
      ],
      default: [
        `Here are verified suppliers for ${requirements.item}:`,
        `Good suppliers near your area for ${requirements.item}:`,
        `Trusted options for ${requirements.item}:`
      ]
    }
  };
  
  let responseCategory = 'default';
  if (requirements.isUrgent) responseCategory = 'urgent';
  else if (requirements.wantsCheap) responseCategory = 'cheap';
  else if (requirements.wantsQuality) responseCategory = 'quality';
  
  const options = responses[language][responseCategory as keyof typeof responses[typeof language]];
  if (options && options.length > 0) {
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Fallback
  return `Here are some good suppliers for ${requirements.item}:`;
};

// Main chat processing function with enhanced Vendor Assist Bot personality
export const processChatMessage = async (message: string) => {
  // Simulate API delay with realistic processing time
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
  
  const language = detectLanguage(message);
  const requirements = parseUserQuery(message);
  
  // For greetings and help, don't show suppliers
  if (requirements.isGreeting || requirements.isGeneralQuery) {
    const response = generateResponse(language, requirements, []);
    return {
      text: response,
      suppliers: [],
      language
    };
  }
  
  // For supplier requests, show recommendations
  const recommendedSuppliers = recommendSuppliers(requirements);
  const response = generateResponse(language, requirements, recommendedSuppliers);
  
  return {
    text: response,
    suppliers: recommendedSuppliers,
    language
  };
};