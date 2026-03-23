'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Language = 'en' | 'vi';
type Theme = 'light' | 'dark';

type TranslationKey =
  | 'dashboard'
  | 'plantDoctor'
  | 'control'
  | 'analytics'
  | 'settings'
  | 'support'
  | 'newExperiment'
  | 'profile'
  | 'language'
  | 'theme'
  | 'english'
  | 'vietnamese'
  | 'lightMode'
  | 'darkMode'
  | 'notifications'
  | 'email'
  | 'pushNotifications'
  | 'soundAlerts'
  | 'about'
  | 'version'
  | 'saveChanges'
  | 'logout'
  | 'helpAndSupport'
  | 'supportDescription'
  | 'supportOnline'
  | 'supportHours'
  | 'supportAvgResponse'
  | 'liveChat'
  | 'knowledgeBase'
  | 'contactSupport';

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    dashboard: 'Dashboard',
    plantDoctor: 'Plant Doctor',
    control: 'Control',
    analytics: 'Analytics',
    settings: 'Settings',
    support: 'Support',
    newExperiment: 'New Experiment',
    profile: 'Profile',
    language: 'Language',
    theme: 'Theme',
    english: 'English',
    vietnamese: 'Vietnamese',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    email: 'Email',
    pushNotifications: 'Push Notifications',
    soundAlerts: 'Sound Alerts',
    about: 'About',
    version: 'Version',
    saveChanges: 'Save Changes',
    logout: 'Logout',
    helpAndSupport: 'Help & Support',
    supportDescription: 'Get fast assistance from the Veridian Lab team.',
    supportOnline: 'Support is online now',
    supportHours: 'Mon-Fri, 08:00-18:00 (UTC+7)',
    supportAvgResponse: 'Average first response: under 2 minutes',
    liveChat: 'Live Chat',
    knowledgeBase: 'Knowledge Base',
    contactSupport: 'Contact Support',
  },
  vi: {
    dashboard: 'Bảng Điều Khiển',
    plantDoctor: 'Bác Sĩ Cây Trồng',
    control: 'Điều Khiển',
    analytics: 'Phân Tích',
    settings: 'Cài Đặt',
    support: 'Hỗ Trợ',
    newExperiment: 'Thí Nghiệm Mới',
    profile: 'Hồ Sơ',
    language: 'Ngôn Ngữ',
    theme: 'Chủ Đề',
    english: 'Tiếng Anh',
    vietnamese: 'Tiếng Việt',
    lightMode: 'Chế Độ Sáng',
    darkMode: 'Chế Độ Tối',
    notifications: 'Thông Báo',
    email: 'Email',
    pushNotifications: 'Thông Báo Đẩy',
    soundAlerts: 'Cảnh Báo Âm Thanh',
    about: 'Giới Thiệu',
    version: 'Phiên Bản',
    saveChanges: 'Lưu Thay Đổi',
    logout: 'Đăng Xuất',
    helpAndSupport: 'Trợ Giúp & Hỗ Trợ',
    supportDescription: 'Nhận hỗ trợ nhanh từ đội ngũ Veridian Lab.',
    supportOnline: 'Hỗ trợ đang trực tuyến',
    supportHours: 'Thứ 2 - Thứ 6, 08:00-18:00 (UTC+7)',
    supportAvgResponse: 'Thời gian phản hồi đầu tiên trung bình: dưới 2 phút',
    liveChat: 'Trò Chuyện Trực Tiếp',
    knowledgeBase: 'Kho Kiến Thức',
    contactSupport: 'Liên Hệ Hỗ Trợ',
  },
};

type AppPreferencesContextValue = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: TranslationKey) => string;
};

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(null);

function detectInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = localStorage.getItem('appTheme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function detectInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const savedLanguage = localStorage.getItem('language') || localStorage.getItem('appLanguage');
  if (savedLanguage === 'vi' || savedLanguage === 'en') {
    return savedLanguage;
  }

  return 'en';
}

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);
  const [theme, setThemeState] = useState<Theme>(detectInitialTheme);

  const applyTheme = useCallback((nextTheme: Theme) => {
    const root = document.documentElement;
    root.classList.add('theme-changing');
    root.classList.toggle('dark', nextTheme === 'dark');
    root.style.colorScheme = nextTheme;
    localStorage.setItem('appTheme', nextTheme);
    window.setTimeout(() => root.classList.remove('theme-changing'), 220);
  }, []);

  const setTheme = useCallback(
    (nextTheme: Theme) => {
      setThemeState(nextTheme);
    },
    [],
  );

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    localStorage.setItem('language', nextLanguage);
    localStorage.setItem('appLanguage', nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
    localStorage.setItem('appLanguage', language);
  }, [language]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    const syncPreferences = (event: StorageEvent) => {
      if (event.key === 'language' || event.key === 'appLanguage') {
        const syncedLanguage = detectInitialLanguage();
        setLanguageState(syncedLanguage);
        document.documentElement.lang = syncedLanguage;
      }

      if (event.key === 'appTheme') {
        const syncedTheme = detectInitialTheme();
        setThemeState(syncedTheme);
        applyTheme(syncedTheme);
      }
    };

    window.addEventListener('storage', syncPreferences);
    return () => window.removeEventListener('storage', syncPreferences);
  }, [applyTheme]);

  const t = useCallback(
    (key: TranslationKey) => {
      return translations[language][key] || translations.en[key] || key;
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, theme, setLanguage, setTheme, t }),
    [language, theme, setLanguage, setTheme, t],
  );

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
}

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);
  if (!context) {
    throw new Error('useAppPreferences must be used within AppPreferencesProvider');
  }

  return context;
}
