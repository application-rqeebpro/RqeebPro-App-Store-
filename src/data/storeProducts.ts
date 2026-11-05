export interface StoreProduct {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'electronics' | 'accessories' | 'school_supplies' | 'fashion' | 'education_apps' | 'utility_apps';
  categoryAr: string;
  categoryEn: string;
  priceYer: number; // Price in Yemeni Rial
  priceUsd: number; // Price in USD
  rating: number;
  salesCount: string;
  inStock: boolean;
  image: string;
  descriptionAr: string;
  descriptionEn: string;
  specsAr: string[];
  specsEn: string[];
  isFeatured?: boolean;
}

export interface PaymentWalletOption {
  id: 'jeeb' | 'jawali' | 'floosak' | 'onecash' | 'kuraimi';
  nameAr: string;
  nameEn: string;
  accountNumber: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  logoIcon: string;
  instructionsAr: string;
}

export const PAYMENT_WALLETS: PaymentWalletOption[] = [
  {
    id: 'jeeb',
    nameAr: 'محفظة جيب (Jeeb)',
    nameEn: 'Jeeb Wallet',
    accountNumber: '785502919',
    badgeBg: 'bg-emerald-600',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    logoIcon: '💳',
    instructionsAr: 'حول المبلغ عبر تطبيق جيب برقم الهاتف: 785502919 ثم أدخل رقم السند/العملية أدناه.',
  },
  {
    id: 'jawali',
    nameAr: 'محفظة جوالي (Jawali)',
    nameEn: 'Jawali Wallet',
    accountNumber: '785502919',
    badgeBg: 'bg-blue-600',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/40',
    logoIcon: '📱',
    instructionsAr: 'حول المبلغ عبر محفظة جوالي لخدمة حاسب/تحويل إلى الرقم: 785502919 ثم أدخل مرجع السند.',
  },
  {
    id: 'floosak',
    nameAr: 'محفظة فلوسك (Floosak)',
    nameEn: 'Floosak Wallet',
    accountNumber: '785502919',
    badgeBg: 'bg-cyan-600',
    textColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    logoIcon: '💸',
    instructionsAr: 'حول المبلغ عبر تطبيق فلوسك برقم المشترك/الهاتف: 785502919 واحتفظ برقم عملية التحويل.',
  },
  {
    id: 'onecash',
    nameAr: 'محفظة ون كاش (OneCash)',
    nameEn: 'OneCash Wallet',
    accountNumber: '785502919',
    badgeBg: 'bg-indigo-600',
    textColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/40',
    logoIcon: '🪙',
    instructionsAr: 'قم بالتحويل عبر ون كاش إلى الرقم: 785502919 وأدخل رقم الإشعار لإتمام الطلب.',
  },
  {
    id: 'kuraimi',
    nameAr: 'حساب حاسب / الكريمي (Kuraimi)',
    nameEn: 'Kuraimi Bank Express',
    accountNumber: '785502919',
    badgeBg: 'bg-amber-600',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    logoIcon: '🏦',
    instructionsAr: 'أرسل المبلغ إلى الحساب/الرقم المميز بالكريمي (حاسب): 785502919 ثم اكتب رقم الإشعار.',
  },
];

export const PRODUCTS_DATA: StoreProduct[] = [
  // 1. Phones & Electronics (هواتف وأدوات إلكترونية)
  {
    id: 'prod-phone-rqeeb-1',
    nameAr: 'هاتف رقيب برو الذكي 256GB',
    nameEn: 'Rqeeb Pro Smartphone 256GB',
    category: 'electronics',
    categoryAr: 'هواتف وإلكترونيات',
    categoryEn: 'Phones & Electronics',
    priceYer: 125000,
    priceUsd: 220,
    rating: 4.9,
    salesCount: '+450 مبيعة',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    descriptionAr: 'هاتف ذكي قوي مخصص للمبرمجين والمستخدمين مع نظام أندرويد شاشة AMOLED 120Hz وشحن سريع 67W.',
    descriptionEn: 'High performance smartphone engineered for power users with 120Hz AMOLED and 67W Turbo charging.',
    specsAr: ['ذاكرة 256GB + رام 12GB', 'معالج ثماني النواة Snapdragon 8 Gen', 'بطارية 5000mAh تدوم طويلاً', 'ضمان رسمي من شركة رقيب لمدة سنة'],
    specsEn: ['256GB Storage + 12GB RAM', 'Snapdragon 8 Gen Octa-core', '5000mAh All-day Battery', '1 Year Official Rqeeb Warranty'],
    isFeatured: true,
  },
  {
    id: 'prod-tablet-rqeeb-2',
    nameAr: 'جهاز تابلت رقيب التعليمي 11 بوصة',
    nameEn: 'Rqeeb Educational Tablet 11"',
    category: 'electronics',
    categoryAr: 'هواتف وإلكترونيات',
    categoryEn: 'Phones & Electronics',
    priceYer: 98000,
    priceUsd: 175,
    rating: 5.0,
    salesCount: '+620 مبيعة',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    descriptionAr: 'جهاز لوحي تعليمي متطور مع قلم ذكي رسم وكتابة، مثالي لطلاب المدارس والجامعات والأكاديميات.',
    descriptionEn: 'Advanced study tablet with smart stylus for students, lectures, and digital note-taking.',
    specsAr: ['شاشة 11" عالية الدقة FHD+', 'قلم ضوئي حقيقي للكتابة', 'سماعات استريو مزدوجة نقية', 'مرفق معه جِراب حماية الأصلي'],
    specsEn: ['11" FHD+ Crystal Display', 'Active Smart Stylus included', 'Dual Stereo Speakers', 'Protective Armor Case'],
    isFeatured: true,
  },
  {
    id: 'prod-smartwatch-3',
    nameAr: 'ساعة رقيب الذكية المقاومة للماء Pro',
    nameEn: 'Rqeeb SmartWatch Pro',
    category: 'electronics',
    categoryAr: 'هواتف وإلكترونيات',
    categoryEn: 'Phones & Electronics',
    priceYer: 28000,
    priceUsd: 50,
    rating: 4.8,
    salesCount: '+890 مبيعة',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    descriptionAr: 'ساعة ذكية بشاشة AMOLED ملونة، تدعم إجراء المكالمات، قياس نبضات القلب، ومتابعة الأنشطة الرياضية.',
    descriptionEn: 'Sleek AMOLED Smartwatch with Bluetooth calling, heart-rate monitoring, and sports tracking.',
    specsAr: ['إجراء واستقبال المكالمات بوضوح', 'مقاومة للماء والسباحة IP68', 'بطارية تدوم حتى 10 أيام', 'تنبيهات الرسائل والواتساب باللغة العربية'],
    specsEn: ['Bluetooth Calling & Mic', 'IP68 Waterproofing', 'Up to 10-day battery life', 'Full Arabic Notification Support'],
  },

  // 2. Tools & Accessories (أدوات وإكسسوارات)
  {
    id: 'prod-earbuds-4',
    nameAr: 'سماعات بلوتوث رقيب القيمنق عازلة للضوضاء',
    nameEn: 'Rqeeb ANC Gaming Earbuds',
    category: 'accessories',
    categoryAr: 'أدوات وإكسسوارات',
    categoryEn: 'Tools & Accessories',
    priceYer: 18500,
    priceUsd: 32,
    rating: 4.9,
    salesCount: '+1,200 مبيعة',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    descriptionAr: 'سماعات أذن لاسلكية بتقنية عزل الضوضاء النشط ANC وصوت باص مضخم مخصص للألعاب والأغاني.',
    descriptionEn: 'True Wireless Gaming Earbuds with Active Noise Cancellation & Ultra-Low Latency audio.',
    specsAr: ['عزل ضوضاء نشط 35dB ANC', 'تأخير منخفض جداً في الألعاب 40ms', 'عمر بطارية يصل إلى 30 ساعة مع العلبة', 'شحن سريع عبر منفذ Type-C'],
    specsEn: ['Active Noise Cancellation 35dB', 'Ultra Low Latency 40ms', '30 Hours total Playtime', 'USB Type-C Fast Charging'],
    isFeatured: true,
  },
  {
    id: 'prod-powerbank-5',
    nameAr: 'شاحن باور بنك سريع 20,000mAh مع شاشة LED',
    nameEn: 'Rqeeb PowerBank 20,000mAh 22.5W',
    category: 'accessories',
    categoryAr: 'أدوات وإكسسوارات',
    categoryEn: 'Tools & Accessories',
    priceYer: 22000,
    priceUsd: 38,
    rating: 4.8,
    salesCount: '+950 مبيعة',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=600&auto=format&fit=crop&q=80',
    descriptionAr: 'بطارية متنقلة قوية بسعة 20 ألف ملي أمبير تدعم الشحن السريع الفائق لشحن الجوال والتابلت في وقت قياسي.',
    descriptionEn: 'High capacity 20,000mAh portable charger with LED digital power indicator and 22.5W fast charge.',
    specsAr: ['سعة 20,000mAh حقيقية', 'شاشه رقمية لعرض نسبة الشحن', 'شحن 3 أجهزة في وقت واحد', 'حماية ضد الارتفاع المفاجئ للتيار'],
    specsEn: ['20,000mAh Real Capacity', 'Digital LED Percentage Display', 'Triple Device Simultaneous Charge', 'Multi-layer Circuit Protection'],
  },

  // 3. School Supplies (أدوات مدرسية)
  {
    id: 'prod-mathkit-6',
    nameAr: 'حقيبة الأدوات المدرسية والحاسبة العلمية الشاملة',
    nameEn: 'Smart Math & School Kit',
    category: 'school_supplies',
    categoryAr: 'أدوات مدرسية',
    categoryEn: 'School Supplies',
    priceYer: 14000,
    priceUsd: 25,
    rating: 5.0,
    salesCount: '+1,500 مبيعة',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80',
    descriptionAr: 'طقم الأدوات المدرسية المتكامل للطلاب يتضمن حاسبة علمية متطورة، طقم هندسة، وأقلام تظليل فاخرة.',
    descriptionEn: 'All-in-one student kit with scientific calculator, precision geometry tools, and highlighters.',
    specsAr: ['حاسبة علمية تدعم 417 وظيفة', 'طقم برجل ومساطر معدنية معتمدة', 'حقيبة قماشية متينة للطلاب', 'مثالية لطلاب الثانوية والجامعة'],
    specsEn: ['417-Function Scientific Calculator', 'Precision Steel Geometry Set', 'Durable Canvas Pouch', 'Ideal for High School & College'],
    isFeatured: true,
  },
  {
    id: 'prod-backpack-7',
    nameAr: 'حقيبة ظهر مدرسية مضادة للماء مع منفذ USB',
    nameEn: 'Rqeeb Waterproof School Backpack',
    category: 'school_supplies',
    categoryAr: 'أدوات مدرسية',
    categoryEn: 'School Supplies',
    priceYer: 19500,
    priceUsd: 34,
    rating: 4.9,
    salesCount: '+780 مبيعة',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    descriptionAr: 'حقيبة ظهر فاخرة ومريحة للظهر مع جيب مخصص للابتوب والتابلت وخامة مقاومة للأمطار والتمزق.',
    descriptionEn: 'Ergonomic water-resistant backpack with padded laptop sleeve and external USB charging port.',
    specsAr: ['مقاومة للماء والخدش 100%', 'جيب مخصص للابتوب والكتب المدرسية', 'حمالات كتف مريحة ومبطنة', 'منفذ USB خارجي لشحن الهواتف'],
    specsEn: ['100% Water-repellent Fabric', 'Dedicated Laptop & Notebook Sleeves', 'Ergonomic Mesh Shoulder Straps', 'External USB Power Pass-through'],
  },

  // 4. Shoes & Fashion (أحذية وأزياء)
  {
    id: 'prod-hoodie-8',
    nameAr: 'هودي رقيب برو القطني الأنيق Rqeeb Hoodie',
    nameEn: 'Official Rqeeb Pro Hoodie',
    category: 'fashion',
    categoryAr: 'أحذية وأزياء',
    categoryEn: 'Shoes & Fashion',
    priceYer: 21000,
    priceUsd: 36,
    rating: 4.9,
    salesCount: '+640 مبيعة',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    descriptionAr: 'سترة هودي ثقيلة مصنعة من القطن الخالص 100% مع شعار R الفخم المطرز بأعلى جودة.',
    descriptionEn: 'Premium heavyweight 100% cotton hoodie featuring the signature embroidered 3D R logo.',
    specsAr: ['قطن 100% ناعم ودافئ', 'تطريز شعار R المزدوج', 'متوفر بجميع المقاسات (M, L, XL, XXL)', 'ألوان ثابتة لا تتأثر بـ الغسيل'],
    specsEn: ['100% Pure Soft Fleece Cotton', 'High-density 3D Embroidered Emblem', 'Available Sizes M to XXL', 'Fade-resistant Color Fastness'],
    isFeatured: true,
  },
  {
    id: 'prod-shoes-9',
    nameAr: 'حذاء رياضي خفيف ومريح للغاية Ultra Running',
    nameEn: 'Ultra Comfort Sport Sneakers',
    category: 'fashion',
    categoryAr: 'أحذية وأزياء',
    categoryEn: 'Shoes & Fashion',
    priceYer: 24500,
    priceUsd: 42,
    rating: 4.8,
    salesCount: '+810 مبيعة',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    descriptionAr: 'حذاء رياضي عصري مع نعل طبي ماص للصدمات ونسيج شبكي مهوى للمشي والرياضة والاستخدام اليومي.',
    descriptionEn: 'Ultra-lightweight breathable sneakers with shock-absorbing orthopedic air soles for maximum comfort.',
    specsAr: ['نعل طبي مرن ومريح للقدم', 'قماش شبكي جاف ومهوى', 'تصميم عصري جذاب متناسق', 'متوفر بمقاسات من 39 إلى 45'],
    specsEn: ['Orthopedic Shock-Absorbing Sole', 'Breathable Air Mesh Upper', 'Sleek Modern Styling', 'Euro Sizes 39-45'],
  },
];
