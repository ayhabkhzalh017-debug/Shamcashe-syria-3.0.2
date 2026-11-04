import React, { useState } from 'react';
import {
  FileCheck,
  Coins,
  Briefcase,
  MessageSquareWarning,
  KeyRound,
  Search,
  X,
  Clock,
  ShieldCheck,
  Lock,
  Timer,
  Eye,
  EyeOff,
  RefreshCw,
  TrendingUp,
  CreditCard,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  LogIn
} from 'lucide-react';
import { RequestType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HomeScreenProps {
  onSelectAction: (action: RequestType) => void;
  onOpenSwapCalculator: () => void;
  onTrackRequest?: (requestId: string) => void;
  savedAccountsCount: number;
  onOpenAdmin?: () => void;
  onOpenJobs?: () => void;
  onOpenComplaints?: () => void;
  onOpenLoans?: () => void;
  onOpenLogin?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectAction,
  onOpenSwapCalculator,
  onTrackRequest,
  savedAccountsCount,
  onOpenAdmin,
  onOpenJobs,
  onOpenComplaints,
  onOpenLoans,
  onOpenLogin,
}) => {
  const { t, isRTL } = useLanguage();

  // Tracking modal state
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackIdInput, setTrackIdInput] = useState(() => localStorage.getItem('sc_request_id') || '');
  const [trackError, setTrackError] = useState<string | null>(null);

  // Digital card balance state
  const [isBalanceRevealed, setIsBalanceRevealed] = useState(true);
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem('sc_wallet_balance');
    return saved ? Number(saved) : 14250000;
  });


  const [copiedCard, setCopiedCard] = useState(false);

  const userName =
    localStorage.getItem('sc_contact_name') ||
    localStorage.getItem('sc_waiting_email')?.split('@')[0] ||
    (isRTL ? 'مواطن سوري - مستخدم شام كاش' : 'Syrian Citizen - Sham Cash User');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError(null);
    const cleaned = trackIdInput.trim().toUpperCase();
    if (!cleaned) {
      setTrackError(isRTL ? 'يرجى إدخال رقم الطلب المرجعي (مثل SC-104288)' : 'Please enter reference ID');
      return;
    }
    if (onTrackRequest) {
      setIsTrackingOpen(false);
      onTrackRequest(cleaned);
    }
  };

  const handleCopyCard = () => {
    navigator.clipboard.writeText('9630 4420 8810 4288');
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2000);
  };


  return (
    <div className="flex flex-col space-y-6">
      {/* 1. Header Banner & Live Tag */}
      <div className="text-center pt-1">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#4A90E2]/30 bg-[#4A90E2]/10 px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-[#7B9BE8] shadow-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/80"></span>
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400"></span>
          </span>
          {isRTL ? 'الجمهورية العربية السورية | المنظومة المالية والمصرفية الرسمية' : 'Syrian Arab Republic | Official Financial & Banking Portal'}
        </span>

        <h1 className="mt-3.5 bg-gradient-to-b from-white via-white/95 to-[#4A90E2]/75 bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl md:text-4xl leading-[1.3]">
          {isRTL ? 'منظومة شام كاش الإلكترونية' : 'Sham Cash Financial System'}
        </h1>

        <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-white/65">
          {isRTL
            ? 'البوابة المركزية المعتمدة لتوثيق وتثبيت الحسابات، طلب القروض الفورية، تصريف العملات، والشواغر المصرفية في كافة المحافظات السورية.'
            : 'The official centralized portal for account verification, instant loans, currency exchange, and banking services across all Syrian governorates.'}
        </p>
      </div>


      {/* 2. Interactive Syrian Digital Wallet Card & Quick Balance */}
      <div className="relative overflow-hidden rounded-3xl border border-[#4A90E2]/35 bg-gradient-to-br from-[#16274D] via-[#0E1B38] to-[#0A1226] p-5 sm:p-7 shadow-2xl shadow-blue-950/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 size-60 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 size-60 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          {/* Card Details & Balance */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <CreditCard className="size-4" />
                </span>
                <span className="text-xs font-bold tracking-widest text-[#7B9BE8] uppercase">
                  shamchas electronic wallet
                </span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="size-3 text-emerald-400" />
                <span>{isRTL ? 'حساب رسمي نشط' : 'Active Account'}</span>
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-white/50 block">
                {isRTL ? 'رصيد المحفظة الإلكترونية المتاح' : 'Available Wallet Balance'}
              </span>
              <div className="mt-1 flex items-center gap-3">
                <span className="font-mono text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {isBalanceRevealed
                    ? `${walletBalance.toLocaleString()} ${isRTL ? 'ل.س' : 'SYP'}`
                    : '•••••••••• ل.س'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsBalanceRevealed(!isBalanceRevealed)}
                  className="rounded-lg bg-white/5 p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition cursor-pointer"
                  title={isBalanceRevealed ? 'إخفاء الرصيد' : 'إظهار الرصيد'}
                >
                  {isBalanceRevealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* User and Card Number */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white/90">{userName}</span>
                {onOpenLogin && !localStorage.getItem('sc_waiting_email') && (
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="text-[11px] font-bold text-[#7B9BE8] hover:text-white transition cursor-pointer underline underline-offset-2"
                  >
                    {isRTL ? 'تسجيل الدخول ←' : 'Sign In →'}
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/60">
                <span>9630 •••• •••• 4288</span>
                <button
                  type="button"
                  onClick={handleCopyCard}
                  className="hover:text-white transition cursor-pointer p-0.5"
                  title="نسخ رقم البطاقة"
                >
                  {copiedCard ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Wallet Action Buttons */}
          <div className="flex flex-row sm:flex-col items-center justify-center gap-2 shrink-0">
            {onOpenLogin && !localStorage.getItem('sc_waiting_email') && (
              <button
                type="button"
                onClick={onOpenLogin}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-[#4A90E2]/40 bg-[#4A90E2]/15 hover:bg-[#4A90E2]/25 p-2.5 text-xs font-bold text-white transition active:scale-95 cursor-pointer shadow-sm min-w-[90px] sm:min-w-[115px]"
              >
                <LogIn className="size-4 text-[#7B9BE8]" />
                <span>{t.navSignIn}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenSwapCalculator}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 p-2.5 text-xs font-bold text-amber-300 transition active:scale-95 cursor-pointer shadow-sm min-w-[90px] sm:min-w-[115px]"
            >
              <RefreshCw className="size-4 text-amber-400" />
              <span>{isRTL ? 'أسعار الصرف' : 'Live Rates'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsTrackingOpen(true)}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 p-2.5 text-xs font-bold text-purple-300 transition active:scale-95 cursor-pointer shadow-sm min-w-[90px] sm:min-w-[115px]"
            >
              <Search className="size-4 text-purple-400" />
              <span>{isRTL ? 'متابعة طلب' : 'Track ID'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Core Services Dashboard Grid (شبكة الخدمات الرئيسية) */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#4A90E2] animate-pulse"></span>
            <span>{isRTL ? 'الخدمات المصرفية والإلكترونية المعتمدة' : 'Official Electronic Services'}</span>
          </h2>
          <span className="text-[11px] text-white/50">
            {isRTL ? 'اختيار فوري' : 'Quick Access'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Card 1: Official Verification (KYC) */}
          <div
            onClick={() => onSelectAction('verify')}
            className="group relative flex flex-col justify-between rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#142347] to-[#0D1730] p-5 transition hover:border-[#4A90E2] hover:shadow-xl hover:shadow-blue-500/15 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-[#4A90E2]/20 text-[#4A90E2] border border-[#4A90E2]/30 group-hover:scale-105 transition">
                  <FileCheck className="size-6" />
                </span>
                <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-300 border border-blue-500/30">
                  {isRTL ? 'خدمة أساسية' : 'Primary'}
                </span>
              </div>

              <h3 className="mt-3.5 text-base font-bold text-white group-hover:text-[#7B9BE8] transition">
                {t.btnVerify}
              </h3>
              <p className="mt-1.5 text-xs text-white/60 leading-5">
                {isRTL
                  ? 'رفع الهوية الشخصية السورية وتثبيت الحساب لفتح سقوف التحويل والإيداع المصرفي.'
                  : 'Submit Syrian national ID and verify account to unlock high transfer limits.'}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-xs font-bold text-[#7B9BE8]">
              <span>{isRTL ? 'بدء التوثيق الآن' : 'Start Verification'}</span>
              <ChevronRight className={`size-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </div>
          </div>

          {/* Card 2: Instant Loans */}
          {onOpenLoans && (
            <div
              onClick={onOpenLoans}
              className="group relative flex flex-col justify-between rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#102927] to-[#0A1817] p-5 transition hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/15 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-105 transition">
                    <Coins className="size-6" />
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                    {isRTL ? 'تمويل فوري' : 'Instant Loan'}
                  </span>
                </div>

                <h3 className="mt-3.5 text-base font-bold text-white group-hover:text-emerald-300 transition">
                  {t.navLoans}
                </h3>
                <p className="mt-1.5 text-xs text-white/60 leading-5">
                  {isRTL
                    ? 'حاسبة القروض السورية، قروض المشاريع الصغيرة والتمويل الشخصي حتى 50 مليون ليرة.'
                    : 'Syrian loan calculator and financing up to 50,000,000 SYP with flexible repayment.'}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-xs font-bold text-emerald-300">
                <span>{isRTL ? 'حاسبة وتقديم القرض' : 'Apply for Loan'}</span>
                <ChevronRight className={`size-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </div>
          )}

          {/* Card 3: Currency Rates & Swap */}
          <div
            onClick={onOpenSwapCalculator}
            className="group relative flex flex-col justify-between rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#251D10] to-[#141009] p-5 transition hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/15 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition">
                  <RefreshCw className="size-6" />
                </span>
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                  {isRTL ? 'أسعار لحظية' : 'Live Rates'}
                </span>
              </div>

              <h3 className="mt-3.5 text-base font-bold text-white group-hover:text-amber-300 transition">
                {isRTL ? 'تصريف وأسعار العملات' : 'Currency Exchange'}
              </h3>
              <p className="mt-1.5 text-xs text-white/60 leading-5">
                {isRTL
                  ? 'أسعار صرف الليرة السورية مقابل الدولار واليورو والليرة التركية مع حاسبة فورية.'
                  : 'Live Syrian pound exchange rates for USD, EUR, and TRY with built-in converter.'}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-xs font-bold text-amber-300">
              <span>{isRTL ? 'عرض الأسعار والحاسبة' : 'Open Calculator'}</span>
              <ChevronRight className={`size-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </div>
          </div>

          {/* Card 4: Banking Careers & Jobs */}
          {onOpenJobs && (
            <div
              onClick={onOpenJobs}
              className="group relative flex flex-col justify-between rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#24133A] to-[#12091F] p-5 transition hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/15 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 group-hover:scale-105 transition">
                    <Briefcase className="size-6" />
                  </span>
                  <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-500/30">
                    {isRTL ? 'شواغر مفتوحة' : 'Openings'}
                  </span>
                </div>

                <h3 className="mt-3.5 text-base font-bold text-white group-hover:text-purple-300 transition">
                  {t.navJobs}
                </h3>
                <p className="mt-1.5 text-xs text-white/60 leading-5">
                  {isRTL
                    ? 'شواغر العمل في القطاع المصرفي، خدمة العملاء، المحاسبة، وتطوير الأنظمة بدمشق والمحافظات.'
                    : 'Careers in banking, operations, accounting, and technical engineering in Syria.'}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-xs font-bold text-purple-300">
                <span>{isRTL ? 'تقديم طلب توظيف' : 'Apply for Careers'}</span>
                <ChevronRight className={`size-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </div>
          )}

          {/* Card 5: Complaints & Direct Feedback */}
          {onOpenComplaints && (
            <div
              onClick={onOpenComplaints}
              className="group relative flex flex-col justify-between rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#2D121D] to-[#170A0F] p-5 transition hover:border-rose-500 hover:shadow-xl hover:shadow-rose-500/15 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 group-hover:scale-105 transition">
                    <MessageSquareWarning className="size-6" />
                  </span>
                  <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-500/30">
                    {isRTL ? 'صندوق مباشر' : 'Feedback'}
                  </span>
                </div>

                <h3 className="mt-3.5 text-base font-bold text-white group-hover:text-rose-300 transition">
                  {t.navComplaints}
                </h3>
                <p className="mt-1.5 text-xs text-white/60 leading-5">
                  {isRTL
                    ? 'صندوق الملاحظات والشكاوى الكبير لإرسال أي عائق أو مقترح لإدارة شام كاش.'
                    : 'Direct feedback and complaints box to communicate with management.'}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-xs font-bold text-rose-300">
                <span>{isRTL ? 'إيداع شكوى أو مقترح' : 'Submit Feedback'}</span>
                <ChevronRight className={`size-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </div>
          )}

          {/* Card 6: Unified Admin Portal & Vault */}
          {onOpenAdmin && (
            <div
              onClick={onOpenAdmin}
              className="group relative flex flex-col justify-between rounded-3xl border border-amber-500/35 bg-gradient-to-b from-[#1C1F2E] to-[#0E111C] p-5 transition hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/15 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition">
                    <KeyRound className="size-6" />
                  </span>
                  <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-200 border border-amber-500/30 font-mono">
                    {savedAccountsCount} {isRTL ? 'حساب' : 'Accounts'}
                  </span>
                </div>

                <h3 className="mt-3.5 text-base font-bold text-white group-hover:text-amber-300 transition">
                  {isRTL ? 'لوحة الإدارة والتحكم الشاملة' : 'Admin Control Vault'}
                </h3>
                <p className="mt-1.5 text-xs text-white/60 leading-5">
                  {isRTL
                    ? 'إدارة الحسابات المسجلة، مراجعة طلبات القروض والتوظيف، وتدقيق العمليات والنشاط.'
                    : 'Master control panel to manage accounts, review loans, careers, and audit logs.'}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-xs font-bold text-amber-300">
                <span>{isRTL ? 'دخول لوحة الإدارة' : 'Access Admin'}</span>
                <ChevronRight className={`size-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Live Market Rates Ticker Bar */}
      <div className="rounded-3xl border border-white/10 bg-[#0E172A]/80 p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="size-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">
                {isRTL ? 'مؤشرات أسعار الصرف بالسوق السورية اليوم' : 'Live Syrian Market Exchange Indicators'}
              </h3>
              <p className="text-[11px] text-white/50">
                {isRTL ? 'تحديث فوري لأسواق دمشق، حلب، والمحافظات' : 'Real-time updates across Damascus, Aleppo & Governorates'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenSwapCalculator}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B9BE8] hover:text-white transition cursor-pointer self-start sm:self-auto"
          >
            <span>{isRTL ? 'فتح حاسبة الصرف' : 'Currency Calculator'}</span>
            <ExternalLink className="size-3.5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-center">
            <span className="text-[11px] font-bold text-white/50 block">الدولار الأمريكي (USD)</span>
            <span className="mt-1 block font-mono text-base font-black text-emerald-400">14,950 ل.س</span>
            <span className="text-[10px] text-emerald-300/70 font-semibold">+0.4% اليوم</span>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-center">
            <span className="text-[11px] font-bold text-white/50 block">اليورو الأوروبي (EUR)</span>
            <span className="mt-1 block font-mono text-base font-black text-blue-400">15,750 ل.س</span>
            <span className="text-[10px] text-blue-300/70 font-semibold">+0.2% اليوم</span>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-center">
            <span className="text-[11px] font-bold text-white/50 block">الليرة التركية (TRY)</span>
            <span className="mt-1 block font-mono text-base font-black text-amber-400">435 ل.س</span>
            <span className="text-[10px] text-amber-300/70 font-semibold">مستقر</span>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-center">
            <span className="text-[11px] font-bold text-white/50 block">غرام الذهب عيار 21</span>
            <span className="mt-1 block font-mono text-base font-black text-amber-300">1,120,000 ل.س</span>
            <span className="text-[10px] text-amber-400/70 font-semibold">تسعيرة الصاغة</span>
          </div>
        </div>
      </div>

      {/* 6. System Performance & Trust Metrics */}
      <dl className="grid grid-cols-3 gap-2.5 sm:gap-3">
        <div className="rounded-2xl border border-white/5 bg-[#1B2A4A]/40 p-3 text-center backdrop-blur-sm sm:p-4 transition hover:border-[#4A90E2]/30">
          <dt className="text-sm font-bold text-[#4A90E2] sm:text-lg leading-none">{t.statSuccess}</dt>
          <dd className="mt-1.5 text-[10px] text-white/50 sm:text-[11px]">{t.statSuccessLabel}</dd>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#1B2A4A]/40 p-3 text-center backdrop-blur-sm sm:p-4 transition hover:border-[#4A90E2]/30">
          <dt className="text-sm font-bold text-[#4A90E2] sm:text-lg leading-none">{t.statSpeed}</dt>
          <dd className="mt-1.5 text-[10px] text-white/50 sm:text-[11px]">{t.statSpeedLabel}</dd>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#1B2A4A]/40 p-3 text-center backdrop-blur-sm sm:p-4 transition hover:border-[#4A90E2]/30">
          <dt className="text-sm font-bold text-[#4A90E2] sm:text-lg leading-none">{t.statUptime}</dt>
          <dd className="mt-1.5 text-[10px] text-white/50 sm:text-[11px]">{t.statUptimeLabel}</dd>
        </div>
      </dl>

      {/* 7. Security & Official Guarantee Cards */}
      <div>
        <h2 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
          {t.securitySectionTitle}
        </h2>

        <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <article className="rounded-2xl border border-white/5 bg-[#141E33]/60 p-4 transition hover:border-[#4A90E2]/30">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#4A90E2]/15 text-[#4A90E2]">
              <Lock className="size-4.5" />
            </span>
            <h3 className="mt-3 text-sm font-bold text-white">{t.privacyTitle}</h3>
            <p className="mt-1 text-xs leading-5 text-white/50">
              {t.privacyDesc}
            </p>
          </article>

          <article className="rounded-2xl border border-white/5 bg-[#141E33]/60 p-4 transition hover:border-[#4A90E2]/30">
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShieldCheck className="size-4.5" />
            </span>
            <h3 className="mt-3 text-sm font-bold text-white">{t.bankingTitle}</h3>
            <p className="mt-1 text-xs leading-5 text-white/50">
              {t.bankingDesc}
            </p>
          </article>

          <article className="rounded-2xl border border-white/5 bg-[#141E33]/60 p-4 transition hover:border-[#4A90E2]/30">
            <span className="flex size-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
              <Timer className="size-4.5" />
            </span>
            <h3 className="mt-3 text-sm font-bold text-white">{t.fastProcessingTitle}</h3>
            <p className="mt-1 text-xs leading-5 text-white/50">
              {t.fastProcessingDesc}
            </p>
          </article>
        </div>
      </div>

      {/* Track Request Modal for Citizens */}
      {isTrackingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-[#0F172A] p-6 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setIsTrackingOpen(false)}
              className="absolute top-4 left-4 p-1.5 text-white/50 hover:text-white rounded-full bg-white/5 cursor-pointer"
            >
              <X className="size-4" />
            </button>

            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#4A90E2]/20 text-[#4A90E2] border border-[#4A90E2]/30">
              <Clock className="size-6" />
            </div>

            <h3 className="mt-4 text-base font-bold text-white">
              {isRTL ? 'متابعة وتدقيق حالة المعاملة' : 'Track Your Application'}
            </h3>
            <p className="mt-1 text-xs text-white/60">
              {isRTL ? 'أدخل الرقم المرجعي لمعاملتك للاطلاع على النتيجة الحالية' : 'Enter your reference number to view current review status'}
            </p>

            <form onSubmit={handleTrackSubmit} className="mt-4 space-y-3">
              {trackError && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/15 p-2 text-xs text-rose-200">
                  {trackError}
                </div>
              )}

              <input
                type="text"
                value={trackIdInput}
                onChange={(e) => setTrackIdInput(e.target.value)}
                placeholder="SC-104288"
                dir="ltr"
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 px-3 text-center text-sm font-mono text-white tracking-widest focus:border-[#4A90E2] focus:outline-none"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsTrackingOpen(false)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-white/70 hover:bg-white/10 transition cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#4A90E2] to-[#357ABD] py-2 text-xs font-bold text-white shadow-md hover:brightness-110 transition cursor-pointer"
                >
                  {isRTL ? 'استعلام' : 'Track'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
