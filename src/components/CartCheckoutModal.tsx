import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Copy,
  Check,
  CreditCard,
  Building2,
  Send,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import { useStore, CartItem, StoreOrder } from '../context/StoreContext';
import { PAYMENT_WALLETS, PaymentWalletOption } from '../data/storeProducts';

interface CartCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'en';
  onOpenOrderTracker?: () => void;
}

export const CartCheckoutModal: React.FC<CartCheckoutModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenOrderTracker,
}) => {
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    settings,
  } = useStore();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [selectedWallet, setSelectedWallet] = useState<PaymentWalletOption>(
    PAYMENT_WALLETS[0]
  );
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('صنعاء');
  const [addressDetails, setAddressDetails] = useState('');
  const [transactionRef, setTransactionRef] = useState('');

  // Placed Order Result
  const [placedOrderResult, setPlacedOrderResult] = useState<StoreOrder | null>(
    null
  );

  if (!isOpen) return null;

  const subtotalYer = cartItems.reduce(
    (sum, item) => sum + item.priceYer * item.quantity,
    0
  );
  const subtotalUsd = cartItems.reduce(
    (sum, item) => sum + item.priceUsd * item.quantity,
    0
  );

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(selectedWallet.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('يرجى كتابة الاسم الكامل ورقم الهاتف لتأكيد الطلب.');
      return;
    }
    if (!transactionRef.trim()) {
      alert(
        `يرجى إدخال رقم عملية التحويل/السند الخاص بـ ${selectedWallet.nameAr} لتأكيد الدفع.`
      );
      return;
    }

    const createdOrder = placeOrder({
      customerName,
      customerPhone,
      city,
      addressDetails: addressDetails || 'توصيل محلي',
      paymentMethodId: selectedWallet.id,
      paymentMethodName: selectedWallet.nameAr,
      accountNumber: selectedWallet.accountNumber,
      transactionRef,
      totalPriceYer: subtotalYer,
      totalPriceUsd: subtotalUsd,
      items: cartItems,
    });

    setPlacedOrderResult(createdOrder);
    setStep('success');
  };

  const handleSendWhatsAppReceipt = () => {
    if (!placedOrderResult) return;
    const msg = `مرحباً متجر رقيب برو، أود تأكيد الطلب رقم #${placedOrderResult.id}:\n- الاسم: ${placedOrderResult.customerName}\n- الهاتف: ${placedOrderResult.customerPhone}\n- المدينة: ${placedOrderResult.city}\n- طريقة الدفع: ${placedOrderResult.paymentMethodName}\n- رقم العملية: ${placedOrderResult.transactionRef}\n- المجموع: ${placedOrderResult.totalPriceYer.toLocaleString('ar-EG')} ر.ي (${placedOrderResult.totalPriceUsd}$)\n\nشكراً لكم!`;
    window.open(
      `https://wa.me/967${settings.whatsappNumber}?text=${encodeURIComponent(
        msg
      )}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-['Cairo',sans-serif] text-right">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Ribbon Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#021333] via-[#05265e] to-[#011438] text-white flex items-center justify-between shrink-0 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg font-['Tajawal'] text-white">
                {step === 'cart' && `سلة التسوق (${cartItems.length})`}
                {step === 'checkout' && 'إتمام الدفع بالمحافظ الإلكترونية'}
                {step === 'success' && 'تم استلام طلبك بنجاح 🎉'}
              </h3>
              <p className="text-[11px] text-cyan-300 font-medium">
                متجر رقيب برو للأجهزة والتطبيقات والأدوات المدرسية
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* STEP 1: CART ITEMS VIEW */}
          {step === 'cart' && (
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-base">
                    سلة التسوق فارغة حالياً
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    قم بإضافة منتجات أو أدوات إلكترونية ومدرسية من المتجر لبدء عملية التسوق والدفع الفوري.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 shadow-xs hover:border-blue-300 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {item.imageOrIcon ? (
                            <img
                              src={item.imageOrIcon}
                              alt={item.nameAr}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                              📦
                            </div>
                          )}

                          <div className="min-w-0">
                            <h5 className="font-bold text-xs sm:text-sm text-slate-900 truncate font-['Cairo']">
                              {item.nameAr}
                            </h5>
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">
                              {item.categoryAr}
                            </span>
                            <p className="text-xs font-bold text-slate-800 font-mono mt-0.5">
                              {item.priceYer > 0
                                ? `${item.priceYer.toLocaleString('ar-EG')} ر.ي ($${item.priceUsd})`
                                : 'مجاني'}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center gap-2 shrink-0">
                          {item.priceYer > 0 && (
                            <div className="flex items-center bg-white border border-slate-300 rounded-xl p-0.5">
                              <button
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-7 text-center text-xs font-bold font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                            title="حذف من السلة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Proceed Button */}
                  <div className="pt-3 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between p-3.5 bg-blue-50 rounded-2xl border border-blue-200/80">
                      <div>
                        <span className="text-xs text-slate-600 font-semibold block">
                          إجمالي قيمة المشتريات:
                        </span>
                        <span className="text-lg font-black text-blue-950 font-mono">
                          {subtotalYer.toLocaleString('ar-EG')} ريال يمني
                        </span>
                      </div>
                      <span className="text-sm font-extrabold text-blue-700 font-mono bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-xs">
                        ${subtotalUsd} USD
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={clearCart}
                        className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors"
                      >
                        تفريغ السلة
                      </button>

                      <button
                        onClick={() => setStep('checkout')}
                        className="flex-1 py-3 px-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                      >
                        <span>متابعة الشراء والدفع بـ المحافظ الإلكترونية</span>
                        <ArrowRight className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 2: CHECKOUT & E-WALLETS PAYMENT */}
          {step === 'checkout' && (
            <form onSubmit={handleConfirmOrder} className="space-y-4">
              {/* Back to Cart button */}
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 mb-1"
              >
                ← العودة لسلة التسوق
              </button>

              {/* Customer Info */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>بيانات العميل ومكان التوصيل</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: عبدالمجيد محمد الكندي"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      رقم الهاتف / الواتساب *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="771234567"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      المدينة
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    >
                      <option value="صنعاء">صنعاء</option>
                      <option value="عدن">عدن</option>
                      <option value="تعز">تعز</option>
                      <option value="إب">إب</option>
                      <option value="حضرموت (المكلا/سيئون)">حضرموت</option>
                      <option value="الحديدة">الحديدة</option>
                      <option value="ذمار">ذمار</option>
                      <option value="عمران">عمران</option>
                      <option value="مدينة أخرى">مدينة أخرى</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      تفاصيل العنوان والشارع
                    </label>
                    <input
                      type="text"
                      value={addressDetails}
                      onChange={(e) => setAddressDetails(e.target.value)}
                      placeholder="شارع الزبيري - بجوار الجولة..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector (Yemeni Wallets) */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>اختر طريقة الدفع عبر المحافظ الإلكترونية اليمنية</span>
                </h4>

                {/* Wallets Selector Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PAYMENT_WALLETS.map((wallet) => {
                    const isSelected = selectedWallet.id === wallet.id;
                    return (
                      <button
                        type="button"
                        key={wallet.id}
                        onClick={() => setSelectedWallet(wallet)}
                        className={`p-2.5 rounded-xl border text-right transition-all flex flex-col justify-between h-20 ${
                          isSelected
                            ? 'bg-blue-600/10 border-blue-600 ring-2 ring-blue-500/30'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{wallet.logoIcon}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </div>
                        <span className="font-bold text-[11px] text-slate-900 truncate font-['Cairo']">
                          {wallet.nameAr}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Wallet Details & Account Copy Box */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-[#021333] text-white space-y-2 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                      <span>{selectedWallet.logoIcon}</span>
                      <span>{selectedWallet.nameAr}</span>
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                      حساب موثق
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {selectedWallet.instructionsAr}
                  </p>

                  <div className="flex items-center justify-between p-2.5 bg-black/40 rounded-xl border border-white/10 mt-1">
                    <div>
                      <span className="text-[10px] text-slate-400 block">
                        رقم الحساب / المحفظة الموحد:
                      </span>
                      <span className="text-base font-black text-amber-400 font-mono tracking-wider">
                        {selectedWallet.accountNumber}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-lime-300" />
                          <span>تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الرقم</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Transaction Reference Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    رقم العملية / الإشعار (تأكيد السند) *
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="مثال: JB-9982410 أو 78241092"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-mono text-left"
                    dir="ltr"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    انسخ رقم عملية التحويل الصادرة من تطبيق المحفظة وألصقها هنا لربط السند بطلبك فوراً.
                  </p>
                </div>
              </div>

              {/* Order Total & Submit */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] text-slate-500 block font-semibold">
                    المبلغ الإجمالي المطلوب تحويله:
                  </span>
                  <span className="text-base font-black text-blue-900 font-mono">
                    {subtotalYer.toLocaleString('ar-EG')} ر.ي (${subtotalUsd})
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد وإرسال الطلب الآن</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS CONFIRMATION */}
          {step === 'success' && placedOrderResult && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border-2 border-emerald-300 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold px-3 py-1 rounded-full inline-block">
                  رقم الطلب: #{placedOrderResult.id}
                </span>
                <h4 className="text-xl font-black text-slate-900 font-['Cairo']">
                  تم استلام طلبك وبانتظار التجهيز والشحن!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  شكراً لك {placedOrderResult.customerName}. تم تسجيل طلبك بنجاح وحفظ رقم السند ({placedOrderResult.transactionRef}).
                </p>
              </div>

              {/* Order Details Summary Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-right text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b pb-1.5 border-slate-200">
                  <span className="text-slate-500">طريقة الدفع:</span>
                  <span className="font-bold text-slate-900">
                    {placedOrderResult.paymentMethodName}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-slate-200">
                  <span className="text-slate-500">رقم السند/العملية:</span>
                  <span className="font-bold font-mono text-blue-700">
                    {placedOrderResult.transactionRef}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-slate-200">
                  <span className="text-slate-500">مكان التوصيل:</span>
                  <span className="font-bold text-slate-900">
                    {placedOrderResult.city} - {placedOrderResult.addressDetails}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-700 font-bold">المبلغ الإجمالي:</span>
                  <span className="font-black text-emerald-700 font-mono text-sm">
                    {placedOrderResult.totalPriceYer.toLocaleString('ar-EG')} ر.ي (${placedOrderResult.totalPriceUsd})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <button
                  onClick={handleSendWhatsAppReceipt}
                  className="w-full sm:w-auto px-5 py-3 bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>تأكيد الإشعار عبر واتساب</span>
                </button>

                {onOpenOrderTracker && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenOrderTracker();
                    }}
                    className="w-full sm:w-auto px-5 py-3 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <Truck className="w-4 h-4 animate-bounce" />
                    <span>تتبع حالة الطلب والشحن 🚚</span>
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-colors"
                >
                  العودة للمتجر
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
