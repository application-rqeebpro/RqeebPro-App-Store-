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

interface StoreContextType {
  apps: AndroidApp[];
  requests: CustomAppRequest[];
  settings: StoreSettings;
  credentials: OwnerCredentials;
  uploadedFiles: UploadedFileItem[];
  isOwnerLoggedIn: boolean;
  downloadedApps: AndroidApp[];
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
      return saved ? JSON.parse(saved) : APPS_DATA;
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

  // Sync to localStorage
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
