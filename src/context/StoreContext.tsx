import React, { createContext, useContext, useState, useEffect } from 'react';
import { AndroidApp, APPS_DATA } from '../data/appsData';

export interface CustomAppRequest {
  id: string;
  appName: string;
  category: string;
  features: string;
  clientName: string;
  clientPhone: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

export interface StoreSettings {
  whatsappNumber: string;
  storeNameAr: string;
  storeNameEn: string;
  socialTelegram: string;
  socialInstagram: string;
  announcementText: string;
  announcementActive: boolean;
  maintenanceModeActive: boolean;
  maintenanceTitle: string;
  maintenanceMessage: string;
}

export interface OwnerCredentials {
  email: string;
  phone: string;
  password: string;
  extraPassword: string;
}

export interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface CartItem {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  priceYer: number;
  priceUsd: number;
  quantity: number;
  imageOrIcon?: string;
  itemType: 'product' | 'app';
}

export interface StoreOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  city: string;
  addressDetails: string;
  paymentMethodId: 'jeeb' | 'jawali' | 'floosak' | 'onecash' | 'kuraimi';
  paymentMethodName: string;
  accountNumber: string;
  transactionRef: string; // رقم العملية / الإشعار
  totalPriceYer: number;
  totalPriceUsd: number;
  items: CartItem[];
  createdAt: string;
  status: 'pending' | 'verified' | 'shipping' | 'completed' | 'cancelled';
}

interface StoreContextType {
  apps: AndroidApp[];
  requests: CustomAppRequest[];
  settings: StoreSettings;
  credentials: OwnerCredentials;
  uploadedFiles: UploadedFileItem[];
  isOwnerLoggedIn: boolean;
  downloadedApps: AndroidApp[];
  cartItems: CartItem[];
  orders: StoreOrder[];
  loginOwner: (creds: OwnerCredentials) => boolean;
  logoutOwner: () => void;
  updateCredentials: (newCreds: Partial<OwnerCredentials>) => void;
  addApp: (app: AndroidApp) => void;
  updateApp: (id: string, updated: Partial<AndroidApp>) => void;
  deleteApp: (id: string) => void;
  addRequest: (req: Omit<CustomAppRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateRequestStatus: (id: string, status: CustomAppRequest['status']) => void;
  deleteRequest: (id: string) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  addUploadedFile: (file: UploadedFileItem) => void;
  deleteUploadedFile: (id: string) => void;
  addToDownloads: (app: AndroidApp) => void;
  removeFromDownloads: (id: string) => void;
  addToCart: (item: { id: string; nameAr: string; nameEn: string; categoryAr: string; priceYer: number; priceUsd: number; imageOrIcon?: string; itemType: 'product' | 'app' }) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  placeOrder: (orderData: Omit<StoreOrder, 'id' | 'createdAt' | 'status'>) => StoreOrder;
  updateOrderStatus: (orderId: string, status: StoreOrder['status']) => void;
  deleteOrder: (orderId: string) => void;
  resetAllData: () => void;
}

const DEFAULT_SETTINGS: StoreSettings = {
  whatsappNumber: '785502919',
  storeNameAr: 'تطبيقات رقيب برو',
  storeNameEn: 'Rqeeb Pro Apps',
  socialTelegram: 'https://t.me/rqeebpro',
  socialInstagram: 'https://instagram.com/rqeebpro',
  announcementText: 'مرحباً بكم في متجر تطبيقات رقيب برو الرسمي - أحدث إصدارات الأندرويد متوفرة الآن للتحميل المباشر!',
  announcementActive: true,
  maintenanceModeActive: false,
  maintenanceTitle: 'المتجر تحت الصيانة والتحديث الدوري',
  maintenanceMessage: 'نقوم حالياً بإجراء تحديثات وتحسينات هامة على قواعد البيانات والسيرفرات لتوفير تجربة أسرع وأكثر أماناً. سنعود للعمل قريباً جداً!',
};

const DEFAULT_CREDENTIALS: OwnerCredentials = {
  email: 'rqeebinstagram@gmail.com',
  phone: '785502919',
  password: 'admin',
  extraPassword: 'rqeebpro',
};

const DEFAULT_REQUESTS: CustomAppRequest[] = [
  {
    id: 'req-1',
    appName: 'تطبيق توصيل طلبات محلي',
    category: 'commercial',
    features: 'تتبع السائق بالـ GPS، بوابة دفع، واجهة مطاعم ولوحة تحكم للإدارة.',
    clientName: 'أحمد سالم',
    clientPhone: '771234567',
    createdAt: '2026-10-17 14:30',
    status: 'in_progress',
  },
  {
    id: 'req-2',
    appName: 'حاسبة زكاة وصدقات احترافية',
    category: 'utility',
    features: 'حساب زكاة المال والذهب، أسعار الذهب اليومية بالعملات المحلية، تنبيهات دورية.',
    clientName: 'محمد الكندي',
    clientPhone: '739876543',
    createdAt: '2026-10-18 09:15',
    status: 'pending',
  },
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load apps from localStorage or fallback to APPS_DATA
  const [apps, setApps] = useState<AndroidApp[]>(() => {
    try {
      const saved = localStorage.getItem('rqeeb_apps');
      if (!saved) return APPS_DATA;
      const parsed: AndroidApp[] = JSON.parse(saved);

      // Merge APPS_DATA updates for core default apps
      return APPS_DATA.map((defaultApp) => {
        const found = parsed.find((p) => p.id === defaultApp.id);
        return found ? { ...found, category: defaultApp.category, categoryAr: defaultApp.categoryAr, categoryEn: defaultApp.categoryEn, iconUrl: defaultApp.iconUrl, downloadUrl: defaultApp.downloadUrl } : defaultApp;
      }).concat(parsed.filter((p) => !APPS_DATA.some((d) => d.id === p.id)));
    } catch {
      return APPS_DATA;
    }
  });

  // Store Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('rqeeb_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Owner Credentials
  const [credentials, setCredentials] = useState<OwnerCredentials>(() => {
    try {
      const saved = localStorage.getItem('rqeeb_owner_creds');
      return saved ? JSON.parse(saved) : DEFAULT_CREDENTIALS;
    } catch {
      return DEFAULT_CREDENTIALS;
    }
  });

  // Custom App Requests
  const [requests, setRequests] = useState<CustomAppRequest[]>(() => {
    try {
      const saved = localStorage.getItem('rqeeb_requests');
      return saved ? JSON.parse(saved) : DEFAULT_REQUESTS;
    } catch {
      return DEFAULT_REQUESTS;
    }
  });

  // Uploaded Files / Media
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>(() => {
    try {
      const saved = localStorage.getItem('rqeeb_files');
      return saved ? JSON.parse(saved) : [
        {
          id: 'file-1',
          name: 'rqeeb_pro_v3.5.2_release.apk',
          size: '14.2 MB',
          type: 'application/vnd.android.package-archive',
          url: 'https://ais-dev-ctv44jif755sgkatjm7hj3-896078739319.europe-west2.run.app/downloads/rqeeb-pro.apk',
          uploadedAt: '2026-10-15 11:20',
        },
        {
          id: 'file-2',
          name: 'math_solver_pro_v2.8.apk',
          size: '22.8 MB',
          type: 'application/vnd.android.package-archive',
          url: 'https://ais-dev-ctv44jif755sgkatjm7hj3-896078739319.europe-west2.run.app/downloads/math-solver.apk',
          uploadedAt: '2026-10-16 16:45',
        },
      ];
    } catch {
      return [];
    }
  });

  // Downloaded / Queue Apps
  const [downloadedApps, setDownloadedApps] = useState<AndroidApp[]>(() => {
    try {
      const saved = localStorage.getItem('rqeeb_downloads');
      return saved ? JSON.parse(saved) : [APPS_DATA[0]];
    } catch {
      return [APPS_DATA[0]];
    }
  });

  // Owner Logged In State
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('rqeeb_owner_active') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('rqeeb_apps', JSON.stringify(apps));
  }, [apps]);

  useEffect(() => {
    localStorage.setItem('rqeeb_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('rqeeb_owner_creds', JSON.stringify(credentials));
  }, [credentials]);

  useEffect(() => {
    localStorage.setItem('rqeeb_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('rqeeb_files', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  useEffect(() => {
    localStorage.setItem('rqeeb_downloads', JSON.stringify(downloadedApps));
  }, [downloadedApps]);

  // Real-time synchronization listener across windows/tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      try {
        if (e.key === 'rqeeb_apps' && e.newValue) {
          setApps(JSON.parse(e.newValue));
        }
        if (e.key === 'rqeeb_settings' && e.newValue) {
          setSettings(JSON.parse(e.newValue));
        }
        if (e.key === 'rqeeb_requests' && e.newValue) {
          setRequests(JSON.parse(e.newValue));
        }
        if (e.key === 'rqeeb_files' && e.newValue) {
          setUploadedFiles(JSON.parse(e.newValue));
        }
        if (e.key === 'rqeeb_owner_creds' && e.newValue) {
          setCredentials(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.error('Storage sync error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Login handler
  const loginOwner = (creds: OwnerCredentials): boolean => {
    const emailMatch = creds.email.trim().toLowerCase() === credentials.email.trim().toLowerCase();
    const phoneMatch = creds.phone.trim() === credentials.phone.trim();
    const passMatch = creds.password.trim() === credentials.password.trim();
    const extraMatch = creds.extraPassword.trim() === credentials.extraPassword.trim();

    if (emailMatch && phoneMatch && passMatch && extraMatch) {
      setIsOwnerLoggedIn(true);
      sessionStorage.setItem('rqeeb_owner_active', 'true');
      return true;
    }
    return false;
  };

  const logoutOwner = () => {
    setIsOwnerLoggedIn(false);
    sessionStorage.removeItem('rqeeb_owner_active');
  };

  const updateCredentials = (newCreds: Partial<OwnerCredentials>) => {
    setCredentials((prev) => ({ ...prev, ...newCreds }));
  };

  // Apps CRUD
  const addApp = (newApp: AndroidApp) => {
    setApps((prev) => [newApp, ...prev]);
  };

  const updateApp = (id: string, updated: Partial<AndroidApp>) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updated } : app))
    );
  };

  const deleteApp = (id: string) => {
    setApps((prev) => prev.filter((app) => app.id !== id));
  };

  // Custom App Requests
  const addRequest = (req: Omit<CustomAppRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: CustomAppRequest = {
      ...req,
      id: `req-${Date.now()}`,
      createdAt: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'pending',
    };
    setRequests((prev) => [newReq, ...prev]);
  };

  const updateRequestStatus = (id: string, status: CustomAppRequest['status']) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const deleteRequest = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Uploaded Files
  const addUploadedFile = (file: UploadedFileItem) => {
    setUploadedFiles((prev) => [file, ...prev]);
  };

  const deleteUploadedFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Shopping Cart Items
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rqeeb_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Store Sales Orders (Wallet Payments)
  const [orders, setOrders] = useState<StoreOrder[]>(() => {
    try {
      const saved = localStorage.getItem('rqeeb_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'ord-101',
          customerName: 'صالح سعيد الكندي',
          customerPhone: '775123456',
          city: 'صنعاء',
          addressDetails: 'شارع حدة - بجوار سيتي سنتر',
          paymentMethodId: 'jeeb',
          paymentMethodName: 'محفظة جيب (Jeeb)',
          accountNumber: '785502919',
          transactionRef: 'JB-88294102',
          totalPriceYer: 28000,
          totalPriceUsd: 50,
          items: [
            {
              id: 'prod-smartwatch-3',
              nameAr: 'ساعة رقيب الذكية المقاومة للماء Pro',
              nameEn: 'Rqeeb SmartWatch Pro',
              categoryAr: 'هواتف وإلكترونيات',
              priceYer: 28000,
              priceUsd: 50,
              quantity: 1,
              itemType: 'product',
            },
          ],
          createdAt: '2026-11-04 18:20',
          status: 'verified',
        },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('rqeeb_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('rqeeb_orders', JSON.stringify(orders));
  }, [orders]);

  // Shopping Cart Handlers
  const addToCart = (item: {
    id: string;
    nameAr: string;
    nameEn: string;
    categoryAr: string;
    priceYer: number;
    priceUsd: number;
    imageOrIcon?: string;
    itemType: 'product' | 'app';
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((c) => {
          if (c.id === id) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Place Order (Yemeni Wallet Checkout)
  const placeOrder = (
    orderData: Omit<StoreOrder, 'id' | 'createdAt' | 'status'>
  ): StoreOrder => {
    const newOrder: StoreOrder = {
      ...orderData,
      id: `ord-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleString('ar-EG', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      status: 'pending',
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: StoreOrder['status']
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // Downloads Queue
  const addToDownloads = (app: AndroidApp) => {
    if (!downloadedApps.some((a) => a.id === app.id)) {
      setDownloadedApps((prev) => [app, ...prev]);
    }
  };

  const removeFromDownloads = (id: string) => {
    setDownloadedApps((prev) => prev.filter((a) => a.id !== id));
  };

  // Reset to initial
  const resetAllData = () => {
    setApps(APPS_DATA);
    setSettings(DEFAULT_SETTINGS);
    setCredentials(DEFAULT_CREDENTIALS);
    setRequests(DEFAULT_REQUESTS);
    localStorage.clear();
  };

  return (
    <StoreContext.Provider
      value={{
        apps,
        requests,
        settings,
        credentials,
        uploadedFiles,
        isOwnerLoggedIn,
        downloadedApps,
        cartItems,
        orders,
        loginOwner,
        logoutOwner,
        updateCredentials,
        addApp,
        updateApp,
        deleteApp,
        addRequest,
        updateRequestStatus,
        deleteRequest,
        updateSettings,
        addUploadedFile,
        deleteUploadedFile,
        addToDownloads,
        removeFromDownloads,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        resetAllData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
