import React, { useState } from 'react';
import {
  LayoutDashboard,
  Smartphone,
  Plus,
  Edit3,
  Trash2,
  Download,
  Upload,
  Send,
  MessageSquare,
  Settings,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  Eye,
  Copy,
  ExternalLink,
  Bell,
  RefreshCw,
  FolderOpen,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { useStore, CustomAppRequest, UploadedFileItem } from '../context/StoreContext';
import { AndroidApp } from '../data/appsData';
import { AppIconRenderer } from './AppIconRenderer';
import { RqeebLogo } from './RqeebLogo';

interface OwnerDashboardProps {
  onExit: () => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ onExit }) => {
  const {
    apps,
    requests,
    settings,
    credentials,
    uploadedFiles,
    logoutOwner,
    addApp,
    updateApp,
    deleteApp,
    updateRequestStatus,
    deleteRequest,
    updateSettings,
    addUploadedFile,
    deleteUploadedFile,
    updateCredentials,
    resetAllData,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'apps' | 'requests' | 'broadcast' | 'files' | 'settings'>('apps');

  // App Form Modal (Add or Edit)
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [editingAppId, setEditingAppId] = useState<string | null>(null);

  // Form Fields for Add/Edit App
  const [formNameAr, setFormNameAr] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formCategory, setFormCategory] = useState<'utility' | 'games' | 'education'>('utility');
  const [formSize, setFormSize] = useState('15.0 MB');
  const [formVersion, setFormVersion] = useState('v1.0.0');
  const [formRating, setFormRating] = useState('4.8');
  const [formDownloads, setFormDownloads] = useState('+10K');
  const [formDescAr, setFormDescAr] = useState('');
  const [formDescEn, setFormDescEn] = useState('');
  const [formFeaturesAr, setFormFeaturesAr] = useState('');
  const [formTargetAndroid, setFormTargetAndroid] = useState('Android 8.0+');
  const [formIconType, setFormIconType] = useState<AndroidApp['iconType']>('rqeeb');
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  // File Upload State
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadFileSize, setUploadFileSize] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Announcement State
  const [announcementInput, setAnnouncementInput] = useState(settings.announcementText);
  const [announcementEnabled, setAnnouncementEnabled] = useState(settings.announcementActive);
  const [broadcastAlertText, setBroadcastAlertText] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Settings Credentials Form
  const [credEmail, setCredEmail] = useState(credentials.email);
  const [credPhone, setCredPhone] = useState(credentials.phone);
  const [credPass, setCredPass] = useState(credentials.password);
  const [credExtraPass, setCredExtraPass] = useState(credentials.extraPassword);
  const [credSuccessMsg, setCredSuccessMsg] = useState(false);

  // WhatsApp store number
  const [storeWhatsapp, setStoreWhatsapp] = useState(settings.whatsappNumber);

  // Copy toast
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleOpenAddModal = () => {
    setEditingAppId(null);
    setFormNameAr('');
    setFormNameEn('');
    setFormCategory('utility');
    setFormSize('18.5 MB');
    setFormVersion('v1.0.0');
    setFormRating('4.8');
    setFormDownloads('+10K');
    setFormDescAr('');
    setFormDescEn('');
    setFormFeaturesAr('أداء فائق السرعة، خالي من الإعلانات، تحديثات دورية');
    setFormTargetAndroid('Android 8.0+');
    setFormIconType('rqeeb');
    setFormIsFeatured(false);
    setIsAppModalOpen(true);
  };

  const handleOpenEditModal = (app: AndroidApp) => {
    setEditingAppId(app.id);
    setFormNameAr(app.nameAr);
    setFormNameEn(app.nameEn);
    setFormCategory(app.category === 'featured' ? 'utility' : (app.category as any));
    setFormSize(app.size);
    setFormVersion(app.version);
    setFormRating(String(app.rating));
    setFormDownloads(app.downloads);
    setFormDescAr(app.descriptionAr);
    setFormDescEn(app.descriptionEn);
    setFormFeaturesAr(app.featuresAr.join('، '));
    setFormTargetAndroid(app.targetAndroid);
    setFormIconType(app.iconType);
    setFormIsFeatured(!!app.isFeatured);
    setIsAppModalOpen(true);
  };

  const handleSaveApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNameAr.trim()) return;

    const feats = formFeaturesAr
      .split(/[،,]/)
      .map((s) => s.trim())
      .filter(Boolean);

    const categoryNamesAr = {
      utility: 'خدمي',
      games: 'ألعاب',
      education: 'تعليمي',
    };

    const categoryNamesEn = {
      utility: 'Utility',
      games: 'Games',
      education: 'Education',
    };

    if (editingAppId) {
      updateApp(editingAppId, {
        nameAr: formNameAr,
        nameEn: formNameEn || formNameAr,
        category: formCategory,
        categoryAr: categoryNamesAr[formCategory],
        categoryEn: categoryNamesEn[formCategory],
        size: formSize,
        version: formVersion,
        rating: parseFloat(formRating) || 4.8,
        downloads: formDownloads,
        descriptionAr: formDescAr || 'تطبيق مميز من رقيب برو',
        descriptionEn: formDescEn || formDescAr,
        featuresAr: feats.length > 0 ? feats : ['سريع وآمن', 'متوافق مع جميع الأجهزة'],
        targetAndroid: formTargetAndroid,
        iconType: formIconType,
        isFeatured: formIsFeatured,
      });
    } else {
      const newApp: AndroidApp = {
        id: `app-${Date.now()}`,
        nameAr: formNameAr,
        nameEn: formNameEn || formNameAr,
        category: formCategory,
        categoryAr: categoryNamesAr[formCategory],
        categoryEn: categoryNamesEn[formCategory],
        iconBg: 'from-blue-600 via-indigo-600 to-blue-800',
        iconType: formIconType,
        rating: parseFloat(formRating) || 4.9,
        downloads: formDownloads,
        size: formSize,
        version: formVersion,
        isFree: true,
        isFeatured: formIsFeatured,
        descriptionAr: formDescAr || 'تطبيق جديد مضاف من لوحة المالك لمتجر رقيب برو.',
        descriptionEn: formDescEn || formDescAr,
        featuresAr: feats.length > 0 ? feats : ['سريع وخفيف', 'تحديثات مستمرة'],
        featuresEn: ['Fast & lightweight', 'Constant updates'],
        targetAndroid: formTargetAndroid,
        screenshots: [
          'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=600&auto=format&fit=crop&q=80',
        ],
      };
      addApp(newApp);
    }

    setIsAppModalOpen(false);
  };

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim()) return;

    setIsUploading(true);
    setTimeout(() => {
      const newFile: UploadedFileItem = {
        id: `file-${Date.now()}`,
        name: uploadFileName.endsWith('.apk') ? uploadFileName : `${uploadFileName}.apk`,
        size: uploadFileSize || '25.4 MB',
        type: 'application/vnd.android.package-archive',
        url: `https://rqeebpro.apps/downloads/${uploadFileName.toLowerCase().replace(/\s+/g, '_')}.apk`,
        uploadedAt: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      };
      addUploadedFile(newFile);
      setIsUploading(false);
      setUploadFileName('');
      setUploadFileSize('');
    }, 800);
  };

  const handleSaveAnnouncement = () => {
    updateSettings({
      announcementText: announcementInput,
      announcementActive: announcementEnabled,
    });
    alert('تم تحديث شريط إعلانات المتجر بنجاح!');
  };

  const handleSendBroadcastPush = () => {
    if (!broadcastAlertText.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastAlertText('');
      alert(`تم إرسال الإشعار الفوري: "${broadcastAlertText}" بنجاح إلى جميع زوار المتجر!`);
    }, 1200);
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    updateCredentials({
      email: credEmail,
      phone: credPhone,
      password: credPass,
      extraPassword: credExtraPass,
    });
    updateSettings({
      whatsappNumber: storeWhatsapp,
    });
    setCredSuccessMsg(true);
    setTimeout(() => setCredSuccessMsg(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a1128] text-slate-100 flex flex-col overflow-hidden font-['Cairo',sans-serif] text-right animate-fade-in">
      {/* Top Owner Header */}
      <header className="bg-[#03091e] border-b border-cyan-500/20 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 p-1">
            <span className="font-black text-white text-xl font-['Tajawal']">R</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white font-['Tajawal']">
                لوحة تحكم مالك رقيب برو
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                المالك نشط
              </span>
            </div>
            <p className="text-[11px] text-cyan-300">
              إدارة التطبيقات والملفات والطلبات والإشعارات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600/50 text-cyan-200 border border-cyan-400/30 rounded-xl text-xs font-bold transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            <span>عرض المتجر الحي</span>
          </button>

          <button
            onClick={() => {
              logoutOwner();
              onExit();
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition-all"
            title="تسجيل الخروج"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </button>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#050e26] border-b md:border-b-0 md:border-l border-slate-800 p-2 sm:p-4 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>الإحصائيات ونظرة عامة</span>
          </button>

          <button
            onClick={() => setActiveTab('apps')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'apps'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>إدارة التطبيقات ({apps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'requests'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4" />
              <span>طلبات التطبيقات</span>
            </div>
            {requests.filter((r) => r.status === 'pending').length > 0 && (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {requests.filter((r) => r.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('broadcast')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'broadcast'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>إرسال التنبيهات والإعلانات</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'files'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>مدير الملفات والتحميل ({uploadedFiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات المالك والأمان</span>
          </button>
        </aside>

        {/* Tab Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0a1330] space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#0e1d45] border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">إجمالي التطبيقات</span>
                    <Smartphone className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mt-2">{apps.length}</h3>
                  <span className="text-[10px] text-cyan-300">جاهزة للتحميل الفوري</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0e1d45] border border-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">إجمالي التنزيلات</span>
                    <Download className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mt-2">+2.4M</h3>
                  <span className="text-[10px] text-emerald-300">عبر جميع الأجهزة</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0e1d45] border border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">طلبات التطبيقات</span>
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mt-2">{requests.length}</h3>
                  <span className="text-[10px] text-amber-300">
                    {requests.filter((r) => r.status === 'pending').length} قيد الانتظار
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#0e1d45] border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">الملفات المرفوعة</span>
                    <FolderOpen className="w-4 h-4 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mt-2">{uploadedFiles.length}</h3>
                  <span className="text-[10px] text-purple-300">حزم APK ووسائط</span>
                </div>
              </div>

              {/* Quick Actions & Store Health */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-[#0e1d45] border border-blue-500/20 space-y-3">
                  <h4 className="font-bold text-sm text-cyan-200">إجراءات سريعة للمالك</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleOpenAddModal}
                      className="p-3 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all"
                    >
                      <Plus className="w-4 h-4 text-cyan-300" />
                      <span>إضافة تطبيق جديد</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('files')}
                      className="p-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all"
                    >
                      <Upload className="w-4 h-4 text-purple-300" />
                      <span>رفع حزمة APK</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('broadcast')}
                      className="p-3 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-400/40 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all"
                    >
                      <Bell className="w-4 h-4 text-amber-300" />
                      <span>إرسال إشعار فوري</span>
                    </button>
                    <button
                      onClick={onExit}
                      className="p-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all"
                    >
                      <Eye className="w-4 h-4 text-emerald-300" />
                      <span>معاينة المتجر الحي</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-[#0e1d45] border border-blue-500/20 space-y-3">
                  <h4 className="font-bold text-sm text-cyan-200">أحدث طلبات التطبيقات المخصصة</h4>
                  {requests.length === 0 ? (
                    <p className="text-xs text-slate-400 py-4">لا توجد طلبات واردة حالياً</p>
                  ) : (
                    <div className="space-y-2">
                      {requests.slice(0, 3).map((r) => (
                        <div
                          key={r.id}
                          className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5 text-xs"
                        >
                          <div>
                            <p className="font-bold text-white">{r.appName}</p>
                            <p className="text-[11px] text-slate-400">
                              {r.clientName} ({r.clientPhone})
                            </p>
                          </div>
                          <a
                            href={`https://wa.me/967${r.clientPhone}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold"
                          >
                            واتساب
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APPS MANAGEMENT */}
          {activeTab === 'apps' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0e1d45] p-4 rounded-2xl border border-blue-500/20">
                <div>
                  <h3 className="text-base font-bold text-white">
                    قائمة التطبيقات المتوفرة بالمتجر ({apps.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    يمكنك إضافة تطبيق جديد، تعديل بيانات أي تطبيق، أو تحميل وحذف التطبيقات
                  </p>
                </div>
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة تطبيق جديد للمتجر</span>
                </button>
              </div>

              {/* Apps Table / List */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-[#0e1d45] border border-blue-500/20 flex flex-col justify-between gap-3 hover:border-cyan-400/40 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <AppIconRenderer app={app} size="sm" />
                        <div>
                          <h4 className="font-bold text-sm text-white font-['Tajawal']">
                            {app.nameAr}
                          </h4>
                          <p className="text-xs text-cyan-300">{app.nameEn}</p>
                          <span className="text-[10px] text-slate-400">
                            {app.categoryAr} · {app.size} · {app.version}
                          </span>
                        </div>
                      </div>

                      {app.isFeatured && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold shrink-0">
                          مميز ★
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">
                      {app.descriptionAr}
                    </p>

                    {/* Action buttons */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(app)}
                          className="px-2.5 py-1.5 bg-blue-500/20 hover:bg-blue-500/40 text-cyan-300 rounded-lg font-bold flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>تعديل</span>
                        </button>

                        <button
                          onClick={() => {
                            alert(`جاري تحميل حزمة APK لتطبيق ${app.nameAr} (${app.size}) مباشرة على جهازك.`);
                          }}
                          className="px-2.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 rounded-lg font-bold flex items-center gap-1 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>تحميل</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من حذف تطبيق "${app.nameAr}" من المتجر؟`)) {
                            deleteApp(app.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors"
                        title="حذف التطبيق"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOM APP REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <div className="bg-[#0e1d45] p-4 rounded-2xl border border-blue-500/20">
                <h3 className="text-base font-bold text-white">
                  طلبات التطبيقات المخصصة من العملاء ({requests.length})
                </h3>
                <p className="text-xs text-slate-400">
                  جميع الطلبات التي أرسلها الزوار من نموذج "طلب تطبيق مخصص" مع تفاصيل الاتصال
                </p>
              </div>

              {requests.length === 0 ? (
                <div className="text-center py-16 bg-[#0e1d45] rounded-3xl border border-slate-800 p-8">
                  <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-2 opacity-50" />
                  <p className="text-slate-400 text-sm">صندوق الطلبات فارغ حالياً</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {requests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl bg-[#0e1d45] border border-blue-500/20 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-base text-white">{req.appName}</h4>
                            <span className="text-[10px] bg-blue-500/20 text-cyan-300 px-2 py-0.5 rounded-full">
                              {req.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            العميل: <span className="text-white font-bold">{req.clientName}</span> · الهاتف: <span className="text-white font-mono">{req.clientPhone}</span> · {req.createdAt}
                          </p>
                        </div>

                        {/* Status Select */}
                        <div className="flex items-center gap-2">
                          <select
                            value={req.status}
                            onChange={(e) => updateRequestStatus(req.id, e.target.value as any)}
                            className="bg-[#050e26] border border-slate-700 text-xs rounded-xl px-2.5 py-1 text-slate-200 focus:outline-none"
                          >
                            <option value="pending">قيد الانتظار</option>
                            <option value="in_progress">جاري العمل عليه</option>
                            <option value="completed">مكتمل</option>
                            <option value="cancelled">ملغي</option>
                          </select>

                          <a
                            href={`https://wa.me/967${req.clientPhone}?text=${encodeURIComponent(
                              `مرحباً ${req.clientName}، بخصوص طلبك لتطبيق "${req.appName}" في متجر رقيب برو...`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 bg-[#25D366] hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <span>مراسلة واتساب</span>
                          </a>

                          <button
                            onClick={() => deleteRequest(req.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/5"
                            title="حذف الطلب"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-slate-200">
                        <span className="font-bold text-cyan-300 block mb-1">المواصفات المطلوبة:</span>
                        <p className="leading-relaxed">{req.features || 'لم يقم العميل بكتابة تفاصيل إضافية.'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BROADCAST / ANNOUNCEMENTS */}
          {activeTab === 'broadcast' && (
            <div className="space-y-6">
              {/* Store Broadcast Banner */}
              <div className="p-5 rounded-3xl bg-[#0e1d45] border border-blue-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      شريط الإعلانات أعلى المتجر
                    </h3>
                    <p className="text-xs text-slate-400">
                      يظهر هذا الشريط في أعلى المتجر لجميع الزوار فور دخولهم
                    </p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs font-bold text-slate-300">
                      {announcementEnabled ? 'مفعل' : 'معطل'}
                    </span>
                    <input
                      type="checkbox"
                      checked={announcementEnabled}
                      onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                  </label>
                </div>

                <textarea
                  rows={3}
                  value={announcementInput}
                  onChange={(e) => setAnnouncementInput(e.target.value)}
                  placeholder="اكتب نص الإعلان الذي سيظهر لجميع زوار المتجر..."
                  className="w-full bg-[#050e26] border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                />

                <button
                  onClick={handleSaveAnnouncement}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>تحديث وحفظ الإعلان</span>
                </button>
              </div>

              {/* Instant Push Alert Simulator */}
              <div className="p-5 rounded-3xl bg-[#0e1d45] border border-amber-500/20 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-400" />
                    <span>إرسال إشعار فوري (Push Alert) لهواتف المستخدمين</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    أرسل تنبيهاً فورياً لكل مستخدمي تطبيق المتجر للإعلان عن تحديث جديد أو تخفيضات
                  </p>
                </div>

                <input
                  type="text"
                  value={broadcastAlertText}
                  onChange={(e) => setBroadcastAlertText(e.target.value)}
                  placeholder="مثال: تنبيه عاجل! تم إطلاق الإصدار الجديد من Rqeeb Pro v3.5.2..."
                  className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                />

                <button
                  onClick={handleSendBroadcastPush}
                  disabled={broadcastSent}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black rounded-xl text-xs shadow-md flex items-center gap-2"
                >
                  {broadcastSent ? (
                    <span>جاري إرسال الإشعار...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>إرسال الإشعار لجميع الأجهزة الآن</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: FILE MANAGER & DOWNLOAD */}
          {activeTab === 'files' && (
            <div className="space-y-6">
              {/* Upload New File Form */}
              <div className="p-5 rounded-3xl bg-[#0e1d45] border border-purple-500/20 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Upload className="w-4 h-4 text-purple-400" />
                    <span>رفع ملف أو حزمة APK جديدة إلى مساحة التخزين</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    يمكنك رفع ملفات APK أو صور أو أي ملف ومشاركته للتحميل المباشر
                  </p>
                </div>

                <form onSubmit={handleSimulateUpload} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      اسم الملف أو الحزمة
                    </label>
                    <input
                      type="text"
                      required
                      value={uploadFileName}
                      onChange={(e) => setUploadFileName(e.target.value)}
                      placeholder="مثال: custom_vpn_patch_v2.apk"
                      className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      حجم الملف التقريبي
                    </label>
                    <input
                      type="text"
                      value={uploadFileSize}
                      onChange={(e) => setUploadFileSize(e.target.value)}
                      placeholder="مثال: 18.2 MB"
                      className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <span>جاري الرفع...</span>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>رفع الملف للتخزين</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Uploaded Files List */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">الملفات المخزنة والجاهزة للتحميل</h3>
                {uploadedFiles.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">لا توجد ملفات مرفوعة بعد</p>
                ) : (
                  <div className="space-y-2">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="p-3.5 rounded-2xl bg-[#0e1d45] border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                            <FileCode className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-white font-mono">{file.name}</p>
                            <p className="text-[11px] text-slate-400">
                              {file.size} · تم الرفع بتاريخ {file.uploadedAt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              alert(`جاري تحميل ملف "${file.name}" (${file.size}) على جهازك.`);
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>تحميل الملف الآن</span>
                          </button>

                          <button
                            onClick={() => copyToClipboard(file.url)}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedText === file.url ? 'تم النسخ!' : 'نسخ الرابط'}</span>
                          </button>

                          <button
                            onClick={() => deleteUploadedFile(file.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/5"
                            title="حذف الملف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS & SECURITY */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <form onSubmit={handleSaveCredentials} className="p-5 rounded-3xl bg-[#0e1d45] border border-blue-500/20 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>تعديل بيانات الدخول وأمان المالك</span>
                </h3>

                {credSuccessMsg && (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>تم حفظ وتحديث بيانات المالك بنجاح!</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    رقم واتساب المتجر (الرئيسي)
                  </label>
                  <input
                    type="text"
                    required
                    value={storeWhatsapp}
                    onChange={(e) => setStoreWhatsapp(e.target.value)}
                    placeholder="785502919"
                    className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 text-left"
                    dir="ltr"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    هذا هو الرقم الذي يظهر في أسفل المتجر وفي زر التواصل عبر واتساب.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      البريد الإلكتروني للمالك
                    </label>
                    <input
                      type="email"
                      required
                      value={credEmail}
                      onChange={(e) => setCredEmail(e.target.value)}
                      className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 text-left"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      رقم الهاتف لتسجيل الدخول
                    </label>
                    <input
                      type="text"
                      required
                      value={credPhone}
                      onChange={(e) => setCredPhone(e.target.value)}
                      className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      كلمة السر الأساسية
                    </label>
                    <input
                      type="text"
                      required
                      value={credPass}
                      onChange={(e) => setCredPass(e.target.value)}
                      className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 text-left"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      كلمة المرور الإضافية (مفتاح الحماية الثاني)
                    </label>
                    <input
                      type="text"
                      required
                      value={credExtraPass}
                      onChange={(e) => setCredExtraPass(e.target.value)}
                      className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>حفظ البيانات وتحديث كلمات المرور</span>
                </button>
              </form>

              {/* Reset to Factory Defaults */}
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-rose-300">إعادة ضبط البيانات الأصلية</h4>
                  <p className="text-[11px] text-slate-400">
                    استرجاع التطبيقات والبيانات الأولية كما كانت في الصورة المرفقة.
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من رغبتك في إعادة ضبط جميع بيانات المتجر؟')) {
                      resetAllData();
                      alert('تمت استعادة البيانات الأصلية بنجاح.');
                    }
                  }}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
                >
                  إعادة ضبط
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ADD / EDIT APP MODAL */}
      {isAppModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in font-['Cairo',sans-serif]">
          <div
            className="relative w-full max-w-2xl bg-[#0b1638] rounded-3xl shadow-2xl border border-cyan-500/30 overflow-hidden text-right max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#031d4e] to-[#042866] text-white flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base font-['Tajawal']">
                {editingAppId ? 'تعديل بيانات التطبيق' : 'إضافة تطبيق أندرويد جديد للمتجر'}
              </h3>
              <button
                onClick={() => setIsAppModalOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveApp} className="p-5 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    اسم التطبيق بالعربي *
                  </label>
                  <input
                    type="text"
                    required
                    value={formNameAr}
                    onChange={(e) => setFormNameAr(e.target.value)}
                    placeholder="مثال: متصفح برق السريع"
                    className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    اسم التطبيق بالإنجليزي
                  </label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="Barq Turbo Browser"
                    className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    التصنيف
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="utility">خدمي وأدوات (Utility)</option>
                    <option value="games">ألعاب (Games)</option>
                    <option value="education">تعليمي (Education)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    حجم الملف (APK)
                  </label>
                  <input
                    type="text"
                    value={formSize}
                    onChange={(e) => setFormSize(e.target.value)}
                    placeholder="18.5 MB"
                    className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    رقم الإصدار
                  </label>
                  <input
                    type="text"
                    value={formVersion}
                    onChange={(e) => setFormVersion(e.target.value)}
                    placeholder="v1.0.0"
                    className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    التقييم (من 5.0)
                  </label>
                  <input
                    type="text"
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    placeholder="4.9"
                    className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    عدد التحميلات
                  </label>
                  <input
                    type="text"
                    value={formDownloads}
                    onChange={(e) => setFormDownloads(e.target.value)}
                    placeholder="+50K"
                    className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    نمط الأيقونة
                  </label>
                  <select
                    value={formIconType}
                    onChange={(e) => setFormIconType(e.target.value as any)}
                    className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="rqeeb">شعار رقيب R الفخم</option>
                    <option value="math">حاسبة ورياضيات ±÷</option>
                    <option value="flash">صاعقة برق Flash</option>
                    <option value="quran">مصحف إسلامي Quran</option>
                    <option value="racing">سيارة سباق Racing</option>
                    <option value="vpn">درع حماية وأمان VPN</option>
                    <option value="video">مقص ومونتاج فيديو</option>
                    <option value="puzzle">يد تحكم ألعاب Gamepad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  وصف التطبيق بالعربي
                </label>
                <textarea
                  rows={2}
                  value={formDescAr}
                  onChange={(e) => setFormDescAr(e.target.value)}
                  placeholder="اكتب نبذة مختصرة عن فوائد التطبيق للمستخدمين..."
                  className="w-full bg-[#050e26] border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  أبرز المميزات (مفصولة بفواصل)
                </label>
                <input
                  type="text"
                  value={formFeaturesAr}
                  onChange={(e) => setFormFeaturesAr(e.target.value)}
                  placeholder="بدون إعلانات، تسريع عتادي، دعم الوضع الليلي..."
                  className="w-full bg-[#050e26] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>تمييز هذا التطبيق في البانر وقسم "تطبيقات مميزة"</span>
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAppModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{editingAppId ? 'حفظ التعديلات' : 'إضافة التطبيق فوراً'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
