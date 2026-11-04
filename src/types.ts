export type RequestType = 'verify' | 'swap';

export type ScreenType =
  | 'home'
  | 'contact-info'
  | 'auth'
  | 'verify'
  | 'waiting'
  | 'admin'
  | 'jobs'
  | 'complaints'
  | 'loans';

export type ReviewStatus = 'under_review' | 'needs_info' | 'verified' | 'rejected';

export interface UploadedDocumentInfo {
  key: string;
  label: string;
  fileName: string;
  fileSize?: string;
  previewUrl?: string;
  uploadedAt: string;
}

export interface AccountRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  password?: string;
  governorate: string;
  requestType: RequestType;
  status: ReviewStatus;
  submittedAt: string;
  documentsCount?: number;
  documentNames?: string[];
  uploadedDocuments?: UploadedDocumentInfo[];
  note?: string;
  adminNotes?: string;
  deviceInfo?: string;
}

export interface AdminFullBackup {
  exportedAt: string;
  adminCredentials: AdminCredentials;
  accounts: AccountRecord[];
  loans: LoanApplication[];
  jobs: JobApplication[];
  complaints: ComplaintRecord[];
  activityLogs: ActivityLog[];
}

export interface JobVacancy {
  id: string;
  title: string;
  type: string; // دوام كامل، دوام جزئي، عن بعد
  department: string;
  location: string;
  experienceRequired: string;
  description: string;
}

export interface JobApplication {
  id: string;
  jobTitle: string;
  jobType: string;
  fullName: string;
  phone: string;
  email: string;
  governorate: string;
  experienceYears: string;
  experienceDetails: string;
  education: string;
  notes?: string;
  status: 'under_review' | 'shortlisted' | 'accepted' | 'rejected';
  submittedAt: string;
}

export interface ComplaintRecord {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  category: string;
  message: string; // نص المربع الكبير للشكاوى والملاحظات
  priority: 'normal' | 'urgent';
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  submittedAt: string;
  adminResponse?: string;
}

export interface LoanApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  governorate: string;
  loanAmount: number; // قيمة القرض بالليرة السورية
  loanDurationMonths: number; // مدة القرض بالأشهر
  loanReason: string; // سبب القرض
  monthlyIncome: string; // الدخل الشهري
  guarantorInfo: string; // معلومات الكفيل أو الضمانة
  estimatedMonthlyInstallment: number; // القسط الشهري
  status: 'under_review' | 'approved' | 'needs_documents' | 'rejected';
  submittedAt: string;
  adminNotes?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  userEmail?: string;
  userName?: string;
  details: string;
  timestamp: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
  role: string;
  lastUpdated: string;
  adminNotes?: string;
}

export interface ContactData {
  fullName: string;
  phone: string;
  governorate: string;
}

export interface AuthData {
  email: string;
  password?: string;
  phone?: string;
  fullName?: string;
  rememberMe?: boolean;
  isDirectLogin?: boolean;
}

export interface DocumentUploads {
  idFront: File | null;
  idBack: File | null;
  selfie: File | null;
  residenceProof: File | null;
}

export interface VerificationFormData {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  governorate: string;
  birthDate: string;
  gender: 'ذكر' | 'أنثى';
}

export interface CurrencyRate {
  id: string;
  name: string;
  symbol: string;
  flag: string;
  buyPrice: number;
  sellPrice: number;
  change: string;
}
