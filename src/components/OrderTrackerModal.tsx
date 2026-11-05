import React, { useState } from 'react';
import {
  X,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  CreditCard,
  PackageCheck,
  AlertCircle,
  Phone,
  MessageCircle,
  Copy,
  ChevronLeft,
  ExternalLink,
  ShoppingBag,
  Building2,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { useStore, StoreOrder } from '../context/StoreContext';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'ar' | 'en';
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  lang = 'ar',
}) => {
  const { orders, settings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter orders matching query (phone number, order ID, or transaction ref)
  const q = searchQuery.trim().toLowerCase();
  const filteredOrders = orders.filter((o) => {
    if (!q) return true; // Show all orders if search is empty
    return (
      o.id.toLowerCase().includes(q) ||
      o.customerPhone.includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.transactionRef.toLowerCase().includes(q)
    );
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: StoreOrder['status']) => {
    switch (status) {
      case 'pending':
        return {
          label: 'قيد المراجعة والتحقق',
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          icon: Clock,
          step: 1,
        };
      case 'verified':
        return {
          label: 'تم التحقق والدفع (جاري التجهيز)',
          bg: 'bg-[#002666] text-blue-800 border-blue-400/30',
          icon: CreditCard,
          step: 2,
        };
      case 'shipping':
        return {
          label: 'جاري الشحن والتوصيل 🚚',
          bg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
          icon: Truck,
          step: 3,
        };
      case 'completed':
        return {
          label: 'مكتمل وتم التسليم ✅',
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          icon: PackageCheck,
          step: 4,
        };
      case 'cancelled':
        return {
          label: 'تم إلغاء الطلب ❌',
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          icon: AlertCircle,
          step: 0,
        };
      default:
        return {
          label: 'قيد المراجعة',
          bg: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
          icon: Clock,
          step: 1,
        };
    }
  };

  const STEPS = [
    { key: 'pending', title: 'تم التقديم', desc: 'استلام الطلب ورقم السند', icon: Clock },
    { key: 'verified', title: 'تم التحقق والدفع', desc: 'تأكيد التحويل في المحفظة', icon: CreditCard },
    { key: 'shipping', title: 'جاري الشحن', desc: 'الطلب مع مندوب التوصيل', icon: Truck },
    { key: 'completed', title: 'مكتمل', desc: 'تم تسليم الطلب بنجاح', icon: PackageCheck },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-['Cairo',sans-serif]">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#020d24]/80 backdrop-blur-md transition-opacity animate-fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-[#041638] via-[#021029] to-[#01091b] border border-cyan-500/30 text-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] animate-scale-up text-right">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#05255a] via-[#031b45] to-[#021029] border-b border-cyan-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white">
              <Truck className="w-5 h-5 text-cyan-200 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white font-['Tajawal'] flex items-center gap-2">
                <span>تتبع حالة طلبك في متجر رقيب برو</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded-full font-bold">
                  محدث فوري
                </span>
              </h2>
              <p className="text-xs text-cyan-200">
                أدخل رقم هاتفك، رقم الطلب، أو رقم إشعار التحويل المالي لمتابعة مراحل الشحن والتوصيل
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Instructions */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-[#03163b]/50 space-y-3 shrink-0">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث برقم الهاتف (مثال: 775123456) أو رقم الطلب (مثال: ord-101) أو رقم السند..."
              className="w-full bg-[#020d24] border border-cyan-500/30 focus:border-cyan-400 rounded-2xl py-3 px-4 pr-11 text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-all shadow-inner"
            />
            <Search className="w-5 h-5 text-cyan-400 absolute right-3.5 top-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 top-3.5 text-xs text-slate-400 hover:text-white bg-white/10 px-2 py-0.5 rounded-lg"
              >
                مسح
              </button>
            )}
          </div>

          {/* Quick Info note */}
          <div className="flex items-center justify-between text-[11px] text-slate-300 px-1">
            <span className="flex items-center gap-1 text-cyan-300">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>تتم المزامنة تلقائياً عند تحديث حالة الطلب بواسطة المالك</span>
            </span>
            <span>عرض {filteredOrders.length} من أصل {orders.length} طلب</span>
          </div>
        </div>

        {/* Orders List Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 px-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto opacity-60" />
              <h3 className="text-base font-bold text-white">لا توجد طلبات متطابقة مع البحث</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                يرجى التأكد من كتابة رقم الهاتف الصحيح أو رقم السند الذي تم إدخاله أثناء الشراء من المحفظة.
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  إعادة عرض كل الطلبات
                </button>
              )}
            </div>
          ) : (
            filteredOrders.map((ord) => {
              const statusInfo = getStatusBadge(ord.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={ord.id}
                  className="bg-gradient-to-br from-[#051c47] via-[#031333] to-[#020b1f] border border-cyan-500/25 rounded-3xl p-4 sm:p-6 space-y-5 shadow-xl relative overflow-hidden"
                >
                  {/* Top Bar: Order ID, Status Badge & Copy */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-black text-amber-300 bg-amber-500/10 border border-amber-400/30 px-3 py-1 rounded-full">
                          طلب #{ord.id}
                        </span>
                        <h3 className="text-base font-bold text-white">{ord.customerName}</h3>
                        <span className="text-xs text-slate-400">({ord.createdAt})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-300 flex-wrap">
                        <span className="flex items-center gap-1 text-cyan-200">
                          <Phone className="w-3.5 h-3.5" />
                          <span className="font-mono">{ord.customerPhone}</span>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{ord.city} ({ord.addressDetails})</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border ${statusInfo.bg}`}
                      >
                        <StatusIcon className="w-4 h-4" />
                        <span>{statusInfo.label}</span>
                      </span>

                      <button
                        onClick={() => copyToClipboard(ord.id)}
                        className="p-1.5 bg-white/10 hover:bg-white/20 text-cyan-300 rounded-xl transition-colors"
                        title="نسخ رقم الطلب"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* VISUAL TRACKING TIMELINE / STEPPER */}
                  {ord.status !== 'cancelled' ? (
                    <div className="py-2">
                      <p className="text-xs font-bold text-cyan-300 mb-3">مسار تنفيذ الطلب والشحن:</p>
                      <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                        {/* Connecting Line */}
                        <div className="absolute top-4 left-6 right-6 h-1 bg-white/10 -z-0 rounded-full" />
                        <div
                          className="absolute top-4 right-6 h-1 bg-gradient-to-l from-emerald-400 to-cyan-400 -z-0 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              statusInfo.step === 1
                                ? '0%'
                                : statusInfo.step === 2
                                ? '33%'
                                : statusInfo.step === 3
                                ? '66%'
                                : '100%'
                            }`,
                          }}
                        />

                        {/* Steps */}
                        {STEPS.map((stepItem, idx) => {
                          const stepNum = idx + 1;
                          const isCompleted = statusInfo.step >= stepNum;
                          const isCurrent = statusInfo.step === stepNum;
                          const StepIcon = stepItem.icon;

                          return (
                            <div key={stepItem.key} className="flex flex-col items-center relative z-10 text-center w-1/4 px-1">
                              <div
                                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
                                  isCurrent
                                    ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-400/30 scale-110 font-black shadow-[0_0_15px_#22d3ee]'
                                    : isCompleted
                                    ? 'bg-emerald-500 text-white font-bold'
                                    : 'bg-[#020c21] text-slate-500 border border-white/20'
                                }`}
                              >
                                <StepIcon className="w-4 h-4" />
                              </div>
                              <span
                                className={`text-[11px] font-bold mt-2 leading-tight ${
                                  isCurrent
                                    ? 'text-cyan-300 font-extrabold'
                                    : isCompleted
                                    ? 'text-emerald-300'
                                    : 'text-slate-400'
                                }`}
                              >
                                {stepItem.title}
                              </span>
                              <span className="text-[9px] text-slate-400 hidden sm:block mt-0.5">
                                {stepItem.desc}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs text-rose-200 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      <span>تم إلغاء هذا الطلب من قبل الإدارة. إذا كان لديك استفسار يرجى التواصل مع الدعم الفني عبر واتساب.</span>
                    </div>
                  )}

                  {/* Payment Details & Items Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    {/* Payment Info */}
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                        <span className="font-bold text-cyan-300">وسيلة الدفع والمحفظة:</span>
                        <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          {ord.paymentMethodName}
                        </span>
                      </div>
                      <p className="text-slate-300">
                        رقم الإشعار / السند:{' '}
                        <span className="text-amber-300 font-mono font-extrabold">{ord.transactionRef}</span>
                      </p>
                      <p className="text-slate-300">
                        الحساب المحول إليه:{' '}
                        <span className="text-cyan-300 font-mono font-bold">{ord.accountNumber || '785502919'}</span>
                      </p>
                      <div className="flex items-center justify-between pt-1 font-bold">
                        <span className="text-slate-300">إجمالي المبلغ الفاتورة:</span>
                        <span className="text-emerald-400 font-mono font-black text-sm">
                          {ord.totalPriceYer.toLocaleString('ar-EG')} ر.ي (${ord.totalPriceUsd})
                        </span>
                      </div>
                    </div>

                    {/* Products Ordered */}
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1.5 flex flex-col justify-between">
                      <div>
                        <span className="font-bold text-cyan-300 block mb-1.5 border-b border-white/10 pb-1.5">
                          العناصر المطلوبة ({ord.items.reduce((a, b) => a + b.quantity, 0)}):
                        </span>
                        <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-[11px] text-slate-200">
                              <span className="truncate max-w-[170px]">
                                • {item.nameAr} ({item.quantity}×)
                              </span>
                              <span className="font-mono font-bold text-cyan-200">
                                {(item.priceYer * item.quantity).toLocaleString('ar-EG')} ر.ي
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Direct WhatsApp Inquiry for this specific order */}
                      <a
                        href={`https://wa.me/967${settings.whatsappNumber}?text=${encodeURIComponent(
                          `مرحباً، أود الاستفسار عن حالة طلبي رقم #${ord.id} - باسم (${ord.customerName}) - رقم السند: (${ord.transactionRef})`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>استفسر عن هذا الطلب عبر واتساب</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#020d24] border-t border-white/10 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span>متجر تطبيقات رقيب برو الرسمي - خدمة العملاء 785502919</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
