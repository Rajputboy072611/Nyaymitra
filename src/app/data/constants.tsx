// India Languages
export const INDIA_LANGUAGES = [
  "English",
  "Hindi (हिंदी)",
  "Bengali (বাংলা)",
];

// Base English translation (used as fallback)
const englishTranslation = {
  nav: { 
    home: "Home", 
    overview: "Overview", 
    services: "Services", 
    lawyers: "Find Lawyers", 
    cases: "Case Map", 
    fir: "File FIR",
    courts: "Find Courts",
    dictionary: "Legal Lexicon",
    caseTracker: "Track Case",
    login: "Login" 
  },
  hero: { 
    tag: "AI-Powered Justice for India", 
    title1: "Justice Made", 
    title2: "Accessible.", 
    sub: "Navigate the legal system with confidence. Instant AI guidance, document drafting, and top-tier lawyer connections.", 
    btnAI: "Ask Nyaymitra AI", 
    btnLawyer: "Find a Lawyer", 
    stats1: "Cases Analyzed", 
    stats2: "AI Assistance", 
    stats3: "Verified Lawyers", 
    stats4: "Legal Tools" 
  },
  features: { 
    title1: "AI Legal Assistant", 
    desc1: "Instant answers to your legal queries in simple language. Trained on IPC, CrPC, and Indian Constitution.", 
    title2: "Expert Lawyers", 
    desc2: "Connect with top-rated practitioners in Delhi, Mumbai, and Bangalore. Verified profiles only.", 
    title3: "Smart Drafter", 
    desc3: "Create rental agreements, affidavits, and legal notices in minutes with our automated templates." 
  },
  process: { 
    tag: "Process", 
    title: "How Nyaymitra Works", 
    sub: "From confusion to clarity in three simple steps.", 
    step1: "1. Ask AI Assistant", 
    desc1: "Type your legal query in plain English. Our AI analyzes your situation against Indian laws instantly.", 
    step2: "2. Get Insights", 
    desc2: "Receive a summary of potential legal courses of action, relevant IPC sections, and required documents.", 
    step3: "3. Hire an Expert", 
    desc3: "If the matter requires representation, seamlessly book a consultation with a specialized lawyer nearby." 
  },
  data: { 
    title: "National Case Overview", 
    sub: "Visualizing legal data across states.", 
    cardCases: "Total Cases", 
    cardAdv: "Total Advocates", 
    subDist: "State-wise Distribution" 
  },
  map: { 
    tag: "Data Driven Justice", 
    title: "Real-time Judicial", 
    titleBr: "Transparency.", 
    desc: "We aggregate data from courts across India to help you understand case pendency and judge vacancies. Knowledge is your first step towards justice.", 
    btn: "Explore Full Analytics", 
    legend: "Case Pendency Heatmap", 
    pending: "Pending Cases", 
    clearance: "Clearance Rate" 
  },
  footer: { 
    text: "Empowering citizens with legal knowledge and connecting them with the right advocates. Justice, simplified.", 
    platform: "Platform", 
    resources: "Resources", 
    contact: "Contact", 
    privacy: "Privacy Policy", 
    terms: "Terms of Service" 
  },
  overview: {
    title: "Democratizing Legal Access",
    description: "Nyaymitra was born from a simple idea: Law should not be a privilege. By combining advanced Artificial Intelligence with a network of empathetic lawyers, we are making justice accessible, affordable, and understandable for every Indian.",
    section1Title: "Verified Experts",
    section1Desc: "Every lawyer on our platform undergoes a strict background check.",
    section2Title: "Instant Answers",
    section2Desc: "Our AI provides preliminary guidance in seconds, 24/7.",
    section3Title: "Transparent Pricing",
    section3Desc: "No hidden fees. You know exactly what you pay for."
  },
  services: {
    aiTitle: "Legal Document Simplifier",
    aiDesc: "Upload any legal document and get instant simplified explanation in plain language.",
    lawyerTitle: "Find Verified Lawyers",
    lawyerDesc: "Connect with experienced lawyers across India for personalized legal consultation.",
    analyticsTitle: "Case Analytics",
    analyticsDesc: "View live statistics of pending cases and judicial data across Indian states."
  },
  lawyers: {
    title: "Find Expert Lawyers",
    searchPlaceholder: "Search by name or keyword...",
    allSpecialties: "All Practice Areas",
    criminalLaw: "Criminal Defense",
    civilLaw: "Civil Litigation",
    familyLaw: "Family & Divorce",
    corporateLaw: "Corporate Law",
    anyLocation: "All Locations",
    bookNow: "Book Consultation"
  }
};
 
const hindiTranslation = {
  nav: { 
    home: "होम", 
    overview: "अवलोकन", 
    services: "सेवाएं", 
    lawyers: "वकील खोजें", 
    cases: "केस मैप", 
    fir: "एफआईआर दर्ज करें",
    courts: "कोर्ट खोजें",
    dictionary: "कानूनी शब्दकोश",
    caseTracker: "केस ट्रैक करें",
    login: "लॉग इन" 
  },
  hero: { 
    tag: "भारत के लिए एआई-संचालित न्याय", 
    title1: "न्याय हुआ", 
    title2: "सुलभ।", 
    sub: "आत्मविश्वास के साथ कानूनी प्रणाली को नेविगेट करें। त्वरित एआई मार्गदर्शन, दस्तावेज़ प्रारूपण, और शीर्ष वकीलों से संपर्क।", 
    btnAI: "न्यायमित्र एआई से पूछें", 
    btnLawyer: "वकील खोजें", 
    stats1: "केस विश्लेषण", 
    stats2: "एआई सहायता", 
    stats3: "सत्यापित वकील", 
    stats4: "कानूनी उपकरण" 
  },
  features: { 
    title1: "एआई कानूनी सहायक", 
    desc1: "सरल भाषा में आपके कानूनी प्रश्नों के त्वरित उत्तर। आईपीसी, सीआरपीसी और भारतीय संविधान पर प्रशिक्षित।", 
    title2: "विशेषज्ञ वकील", 
    desc2: "दिल्ली, मुंबई और बैंगलोर में शीर्ष रेटेड वकीलों से जुड़ें। केवल सत्यापित प्रोफाइल।", 
    title3: "स्मार्ट ड्राफ्टर", 
    desc3: "मिनटों में रेंटल एग्रीमेंट, एफिडेविट और कानूनी नोटिस हमारे स्वचालित टेम्प्लेट के साथ बनाएं।" 
  },
  process: { 
    tag: "प्रक्रिया", 
    title: "न्यायमित्र कैसे काम करता है", 
    sub: "उलझन से स्पष्टता तक तीन सरल चरणों में।", 
    step1: "1. एआई सहायक से पूछें", 
    desc1: "अपनी कानूनी समस्या को सरल हिंदी में टाइप करें। हमारा एआई तुरंत भारतीय कानूनों के अनुसार आपकी स्थिति का विश्लेषण करता है।", 
    step2: "2. जानकारी प्राप्त करें", 
    desc2: "संभावित कानूनी कार्रवाई, प्रासंगिक आईपीसी धाराओं और आवश्यक दस्तावेजों का सारांश प्राप्त करें।", 
    step3: "3. विशेषज्ञ को किराए पर लें", 
    desc3: "यदि मामले में प्रतिनिधित्व की आवश्यकता है, तो आसानी से पास के एक विशेष वकील के साथ परामर्श बुक करें।" 
  },
  data: { 
    title: "राष्ट्रीय केस अवलोकन", 
    sub: "राज्यों में कानूनी डेटा का दृश्यकरण।", 
    cardCases: "कुल मामले", 
    cardAdv: "कुल वकील", 
    subDist: "राज्यवार वितरण" 
  },
  map: { 
    tag: "डेटा संचालित न्याय", 
    title: "वास्तविक समय न्यायिक", 
    titleBr: "पारदर्शिता।", 
    desc: "हम आपको केस पेंडेंसी और जजों की रिक्तियों को समझने में मदद करने के लिए भारत भर की अदालतों से डेटा एकत्र करते हैं। ज्ञान न्याय की ओर आपका पहला कदम है।", 
    btn: "पूर्ण एनालिटिक्स देखें", 
    legend: "केस पेंडेंसी हीटमैप", 
    pending: "लंबित मामले", 
    clearance: "निपटान दर" 
  },
  footer: { 
    text: "कानूनी ज्ञान के साथ नागरिकों को सशक्त बनाना और उन्हें सही वकीलों से जोड़ना। न्याय, सरल।", 
    platform: "प्लेटफ़ॉर्म", 
    resources: "संसाधन", 
    contact: "संपर्क", 
    privacy: "गोपनीयता नीति", 
    terms: "सेवा की शर्तें" 
  },
  overview: {
    title: "कानूनी पहुंच का लोकतंत्रीकरण",
    description: "न्यायमित्र एक सरल विचार से जन्मा था: कानून एक विशेषाधिकार नहीं होना चाहिए। उन्नत आर्टिफिशियल इंटेलिजेंस को सहानुभूतिपूर्ण वकीलों के नेटवर्क के साथ मिलाकर, हम न्याय को हर भारतीय के लिए सुलभ, किफायती और समझने योग्य बना रहे हैं।",
    section1Title: "सत्यापित विशेषज्ञ",
    section1Desc: "हमारे प्लेटफॉर्म पर प्रत्येक वकील की कठोर पृष्ठभूमि जांच की जाती है।",
    section2Title: "तत्काल उत्तर",
    section2Desc: "हमारा एआई सेकंड में प्रारंभिक मार्गदर्शन प्रदान करता है, 24/7।",
    section3Title: "पारदर्शी मूल्य निर्धारण",
    section3Desc: "कोई छिपी हुई फीस नहीं। आप जानते हैं कि आप क्या भुगतान करते हैं।"
  },
  services: {
    aiTitle: "कानूनी दस्तावेज़ सरलीकरण",
    aiDesc: "कोई भी कानूनी दस्तावेज़ अपलोड करें और सरल भाषा में तुरंत स्पष्टीकरण प्राप्त करें।",
    lawyerTitle: "सत्यापित वकील खोजें",
    lawyerDesc: "व्यक्तिगत कानूनी परामर्श के लिए पूरे भारत में अनुभवी वकीलों से जुड़ें।",
    analyticsTitle: "केस एनालिटिक्स",
    analyticsDesc: "भारतीय राज्यों में लंबित मामलों और न्यायिक डेटा के लाइव आंकड़े देखें।"
  },
  lawyers: {
    title: "विशेषज्ञ वकील खोजें",
    searchPlaceholder: "नाम या कीवर्ड से खोजें...",
    allSpecialties: "सभी अभ्यास क्षेत्र",
    criminalLaw: "आपराधिक बचाव",
    civilLaw: "सिविल मुकदमेबाजी",
    familyLaw: "परिवार और तलाक",
    corporateLaw: "कॉर्पोरेट कानून",
    anyLocation: "सभी स्थान",
    bookNow: "परामर्श बुक करें"
  }
};

const bengaliTranslation = {
  nav: { 
    home: "হোম", 
    overview: "সংক্ষিপ্ত", 
    services: "সেবা", 
    lawyers: "আইনজীবী", 
    cases: "মামলা মানচিত্র", 
    fir: "এফআইআর দাখিল করুন",
    courts: "আদালত খুঁজুন",
    dictionary: "আইনি অভিধান",
    login: "লগইন" 
  },
  hero: { 
    tag: "ভারতের জন্য এআই-চালিত ন্যায়", 
    title1: "ন্যায়বিচার", 
    title2: "সহজলভ্য।", 
    sub: "আত্মবিশ্বাসের সাথে আইনি ব্যবস্থা নেভিগেট করুন।", 
    btnAI: "এআই জিজ্ঞাসা করুন", 
    btnLawyer: "আইনজীবী খুঁজুন", 
    stats1: "মামলা বিশ্লেষণ", 
    stats2: "এআই সাহায্য", 
    stats3: "যাচাইকৃত আইনজীবী",
    caseTracker: "মামলা ট্র্যাক করুন",
    stats4: "আইনি সরঞ্জাম" 
  },
  features: { 
    title1: "এআই আইনি সহায়ক", 
    desc1: "সহজ ভাষায় উত্তর। আইপিসি, সিআরপিসিতে প্রশিক্ষিত।", 
    title2: "বিশেষজ্ঞ আইনজীবী", 
    desc2: "শীর্ষ আইনজীবীদের সাথে সংযুক্ত হন।", 
    title3: "স্মার্ট ড্রাফটার", 
    desc3: "মিনিটে আইনি দস্তাবেজ তৈরি করুন।" 
  },
  process: { 
    tag: "প্রক্রিয়া", 
    title: "কীভাবে কাজ করে", 
    sub: "তিনটি সহজ ধাপে।", 
    step1: "১. এআই জিজ্ঞাসা করুন", 
    desc1: "আপনার প্রশ্ন টাইপ করুন।", 
    step2: "২. তথ্য পান", 
    desc2: "আইনি বিকল্প পান।", 
    step3: "৩. বিশেষজ্ঞ নিয়োগ করুন", 
    desc3: "আইনজীবীর সাথে পরামর্শ বুক করুন।" 
  },
  data: { 
    title: "জাতীয় মামলা", 
    sub: "রাজ্য জুড়ে ডেটা।", 
    cardCases: "মোট মামলা", 
    cardAdv: "মোট আইনজীবী", 
    subDist: "রাজ্য অনুযায়ী" 
  },
  map: { 
    tag: "ডেটা চালিত ন্যায়", 
    title: "রিয়েল-টাইম", 
    titleBr: "স্বচ্ছতা।", 
    desc: "আদালতের ডেটা সংগ্রহ করি।", 
    btn: "সম্পূর্ণ বিশ্লেষণ", 
    legend: "মামলা হিটম্যাপ", 
    pending: "মুলতুবি মামলা", 
    clearance: "নিষ্পত্তি হার" 
  },
  footer: { 
    text: "নাগরিকদের ক্ষমতায়ন। ন্যায়বিচার, সহজ।", 
    platform: "প্ল্যাটফর্ম", 
    resources: "সংস্থান", 
    contact: "যোগাযোগ", 
    privacy: "গোপনীয়তা", 
    terms: "শর্তাবলী" 
  },
  overview: {
    title: "আইনি অ্যাক্সেসের গণতন্ত্রীকরণ",
    description: "ন্যায়মিত্র একটি সহজ ধারণা থেকে জন্ম নিয়েছিল: আইন একটি বিশেষাধিকার হওয়া উচিত নয়। উন্নত আর্টিফিশিয়াল ইন্টেলিজেন্সকে সহানুভূতিশীল আইনজীবীদের নেটওয়ার্কের সাথে একত্রিত করে, আমরা প্রতিটি ভারতীয়ের জন্য ন্যায়বিচারকে সহজলভ্য, সাশ্রয়ী এবং বোধগম্য করে তুলছি।",
    section1Title: "যাচাইকৃত বিশেষজ্ঞ",
    section1Desc: "আমাদের প্ল্যাটফর্মে প্রতিটি আইনজীবী কঠোর পটভূমি পরীক্ষার মধ্য দিয়ে যান।",
    section2Title: "তাৎক্ষণিক উত্তর",
    section2Desc: "আমাদের এআই সেকেন্ডে প্রাথমিক নির্দেশনা প্রদান করে, 24/7।",
    section3Title: "স্বচ্ছ মূল্য",
    section3Desc: "কোন লুকানো ফি নেই। আপনি ঠিক জানেন আপনি কি জন্য অর্থ প্রদান করেন।"
  },
  services: {
    aiTitle: "আইনি নথি সরলীকরণ",
    aiDesc: "যেকোনো আইনি নথি আপলোড করুন এবং সরল ভাষায় তাৎক্ষণিক ব্যাখ্যা পান।",
    lawyerTitle: "যাচাইকৃত আইনজীবী খুঁজুন",
    lawyerDesc: "ব্যক্তিগত আইনি পরামর্শের জন্য ভারত জুড়ে অভিজ্ঞ আইনজীবীদের সাথে সংযুক্ত হন।",
    analyticsTitle: "মামলা বিশ্লেষণ",
    analyticsDesc: "ভারতীয় রাজ্যগুলিতে মুলতুবি মামলা এবং বিচার বিভাগীয় ডেটার লাইভ পরিসংখ্যান দেখুন।"
  },
  lawyers: {
    title: "বিশেষজ্ঞ আইনজীবী খুঁজুন",
    searchPlaceholder: "নাম বা কীওয়ার্ড দ্বারা অনুসন্ধান করুন...",
    allSpecialties: "সমস্ত অনুশীলন ক্ষেত্র",
    criminalLaw: "ফৌজদারি প্রতিরক্ষা",
    civilLaw: "সিভিল মামলা",
    familyLaw: "পরিবার এবং বিবাহবিচ্ছেদ",
    corporateLaw: "কর্পোরেট আইন",
    anyLocation: "সমস্ত অবস্থান",
    bookNow: "পরামর্শ বুক করুন"
  }
};

export const TRANSLATIONS: any = {
  "English": englishTranslation,
  "Hindi (हिंदी)": hindiTranslation,
  "Bengali (বাংলা)": bengaliTranslation
};

INDIA_LANGUAGES.forEach(lang => {
  if (!TRANSLATIONS[lang]) {
    TRANSLATIONS[lang] = englishTranslation;
  }
});

export const casesLabels = ["Andaman & Nicobar", "Arunachal Pradesh", "Bihar", "Chhattisgarh", "Goa", "Haryana", "Jammu & Kashmir", "Karnataka", "Madhya Pradesh", "Manipur", "Mizoram", "Odisha", "Punjab", "Sikkim", "Telangana", "Uttar Pradesh", "West Bengal"];
export const casesData = [600, 100, 2100, 700, 200, 900, 50, 200, 3300, 150, 1100, 1300, 50, 200, 150, 1300, 250];

export const advLabels = ["Andhra", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Himachal", "J&K", "Jharkhand", "Karnataka", "Kerala", "MP", "Maha & Goa", "Odisha", "Punjab", "Rajasthan", "TN", "UP", "Uttarakhand", "WB", "Telangana", "Manipur", "Meghalaya", "Tripura"];
export const advData = [650, 120, 640, 250, 1450, 230, 120, 150, 300, 380, 180, 720, 730, 350, 900, 260, 350, 1280, 100, 250, 180, 40, 10, 5];

interface CaseData {
  pending: number;
  disposed: number;
  vacancy: number;
}

export const caseDataMap: { [key: string]: CaseData } = {
  'Andhra Pradesh': { pending: 450230, disposed: 120000, vacancy: 45 },
  'Arunachal Pradesh': { pending: 12000, disposed: 4000, vacancy: 5 },
  'Assam': { pending: 156000, disposed: 45000, vacancy: 25 },
  'Bihar': { pending: 3200000, disposed: 500000, vacancy: 180 },
  'Chhattisgarh': { pending: 89000, disposed: 30000, vacancy: 30 },
  'Goa': { pending: 45000, disposed: 15000, vacancy: 8 },
  'Gujarat': { pending: 1560000, disposed: 420000, vacancy: 95 },
  'Haryana': { pending: 810000, disposed: 280000, vacancy: 50 },
  'Himachal Pradesh': { pending: 84000, disposed: 25000, vacancy: 12 },
  'Jharkhand': { pending: 498000, disposed: 110000, vacancy: 40 },
  'Karnataka': { pending: 1780000, disposed: 550000, vacancy: 110 },
  'Kerala': { pending: 1890000, disposed: 620000, vacancy: 60 },
  'Madhya Pradesh': { pending: 1410000, disposed: 310000, vacancy: 85 },
  'Maharashtra': { pending: 4250000, disposed: 850000, vacancy: 150 },
  'Manipur': { pending: 13000, disposed: 2100, vacancy: 4 },
  'Meghalaya': { pending: 15000, disposed: 3800, vacancy: 3 },
  'Mizoram': { pending: 8000, disposed: 1500, vacancy: 2 },
  'Nagaland': { pending: 5000, disposed: 1200, vacancy: 2 },
  'Odisha': { pending: 930000, disposed: 220000, vacancy: 70 },
  'Punjab': { pending: 980000, disposed: 260000, vacancy: 65 },
  'Rajasthan': { pending: 1920000, disposed: 430000, vacancy: 105 },
  'Sikkim': { pending: 2000, disposed: 500, vacancy: 1 },
  'Tamil Nadu': { pending: 1820000, disposed: 600000, vacancy: 90 },
  'Telangana': { pending: 940000, disposed: 350000, vacancy: 55 },
  'Tripura': { pending: 28000, disposed: 8000, vacancy: 6 },
  'Uttar Pradesh': { pending: 9950000, disposed: 1200000, vacancy: 350 },
  'Uttarakhand': { pending: 267000, disposed: 70000, vacancy: 25 },
  'West Bengal': { pending: 2680000, disposed: 520000, vacancy: 120 },
  'Andaman and Nicobar Islands': { pending: 8000, disposed: 1800, vacancy: 2 },
  'Chandigarh': { pending: 45000, disposed: 12000, vacancy: 5 },
  'Dadra and Nagar Haveli': { pending: 2000, disposed: 500, vacancy: 1 },
  'Daman and Diu': { pending: 1500, disposed: 400, vacancy: 0 },
  'Delhi': { pending: 1120000, disposed: 380000, vacancy: 85 },
  'Jammu and Kashmir': { pending: 310000, disposed: 60000, vacancy: 25 },
  'Ladakh': { pending: 1200, disposed: 300, vacancy: 1 },
  'Lakshadweep': { pending: 500, disposed: 150, vacancy: 0 },
  'Puducherry': { pending: 35000, disposed: 8200, vacancy: 4 }
};

export const stateIsoCodes: { [key: string]: string } = {
  'Andhra Pradesh': 'IN-AP',
  'Arunachal Pradesh': 'IN-AR',
  'Assam': 'IN-AS',
  'Bihar': 'IN-BR',
  'Chhattisgarh': 'IN-CT',
  'Goa': 'IN-GA',
  'Gujarat': 'IN-GJ',
  'Haryana': 'IN-HR',
  'Himachal Pradesh': 'IN-HP',
  'Jharkhand': 'IN-JH',
  'Karnataka': 'IN-KA',
  'Kerala': 'IN-KL',
  'Madhya Pradesh': 'IN-MP',
  'Maharashtra': 'IN-MH',
  'Manipur': 'IN-MN',
  'Meghalaya': 'IN-ML',
  'Mizoram': 'IN-MZ',
  'Nagaland': 'IN-NL',
  'Odisha': 'IN-OR',
  'Punjab': 'IN-PB',
  'Rajasthan': 'IN-RJ',
  'Sikkim': 'IN-SK',
  'Tamil Nadu': 'IN-TN',
  'Telangana': 'IN-TG',
  'Tripura': 'IN-TR',
  'Uttar Pradesh': 'IN-UP',
  'Uttarakhand': 'IN-UT',
  'West Bengal': 'IN-WB',
  'Andaman and Nicobar Islands': 'IN-AN',
  'Chandigarh': 'IN-CH',
  'Dadra and Nagar Haveli': 'IN-DN',
  'Daman and Diu': 'IN-DD',
  'Delhi': 'IN-DL',
  'Jammu and Kashmir': 'IN-JK',
  'Ladakh': 'IN-LA',
  'Lakshadweep': 'IN-LD',
  'Puducherry': 'IN-PY'
};
