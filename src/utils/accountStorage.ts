import {
  AccountRecord,
  AdminCredentials,
  ReviewStatus,
  JobApplication,
  ComplaintRecord,
  LoanApplication,
  ActivityLog,
  JobVacancy,
  UploadedDocumentInfo,
  AdminFullBackup
} from '../types';

const STORAGE_KEY = 'sc_all_accounts';
const ADMIN_STORAGE_KEY = 'sc_admin_credentials';
const JOBS_STORAGE_KEY = 'sc_job_applications';
const COMPLAINTS_STORAGE_KEY = 'sc_complaints';
const LOANS_STORAGE_KEY = 'sc_loan_applications';
const ACTIVITY_STORAGE_KEY = 'sc_activity_logs';

export const AVAILABLE_JOB_VACANCIES: JobVacancy[] = [
  {
    id: 'JOB-01',
    title: 'موظف خدمة عملاء وتوثيق إلكتروني',
    type: 'دوام كامل',
    department: 'قسم العمليات وخدمة العملاء',
    location: 'دمشق - المزة / ريف دمشق',
    experienceRequired: 'سنتان على الأقل',
    description: 'استقبال وفحص طلبات توثيق الحسابات، التدقيق بالهويات والمستندات السورية، وتقديم الدعم الفني المباشر لمستخدمي المحفظة.'
  },
  {
    id: 'JOB-02',
    title: 'محاسب ومدقق مالي ومصرفي',
    type: 'دوام كامل',
    department: 'الإدارة المالية والمحاسبة',
    location: 'حلب - العزيزية',
    experienceRequired: '3 سنوات في المحاسبة المصرفية',
    description: 'مطابقة قيود التحويلات النقدية، متابعة أرصدة تصريف العملات وأسعار الصرف، وإعداد التقارير المالية الدورية للإدارة.'
  },
  {
    id: 'JOB-03',
    title: 'مطور برمجيات وتطبيقات مالية (React / Node)',
    type: 'عن بعد / هجين',
    department: 'تكنولوجيا المعلومات والبرمجة',
    location: 'دمشق / جميع المحافظات السورية',
    experienceRequired: 'سنتان في تطوير منصات الويب والفنتك',
    description: 'تطوير وتحديث واجهات منصة شام كاش، تأمين المعاملات والاتصال الآمن بقواعد البيانات والأنظمة المصرفية.'
  },
  {
    id: 'JOB-04',
    title: 'مسؤول أمن سيبراني وحماية بيانات',
    type: 'دوام كامل',
    department: 'أمن المعلومات والامتثال',
    location: 'دمشق - أوتوستراد المزة',
    experienceRequired: '4 سنوات في الحماية والامتثال المالي',
    description: 'مراقبة العمليات المشبوهة، حماية بيانات العملاء وكلمات المرور، والتأكد من مطابقة معايير الحماية المصرفية السورية.'
  }
];

const INITIAL_JOBS: JobApplication[] = [
  {
    id: 'JOB-APP-101',
    jobTitle: 'موظف خدمة عملاء وتوثيق إلكتروني',
    jobType: 'دوام كامل',
    fullName: 'باسل محمود الحموي',
    phone: '+963 944 555 123',
    email: 'bassel.hamwi@gmail.com',
    governorate: 'دمشق',
    experienceYears: '3 سنوات',
    experienceDetails: 'خبرة سابقة سنتين في بنك سوري ومحفظة إلكترونية في خدمة العملاء ومراجعة وثائق الهوية.',
    education: 'إجازة في إدارة الأعمال - جامعة دمشق',
    notes: 'جاهز لبدء العمل فوراً ولديه إلمام بأنظمة شام كاش.',
    status: 'under_review',
    submittedAt: '2026-09-24 11:30'
  },
  {
    id: 'JOB-APP-102',
    jobTitle: 'محاسب ومدقق مالي ومصرفي',
    jobType: 'دوام كامل',
    fullName: 'سارة عبد القادر الشامي',
    phone: '+963 933 666 456',
    email: 'sara.shami@hotmail.com',
    governorate: 'حلب',
    experienceYears: '4 سنوات',
    experienceDetails: 'عملت كمدققة حسابات في شركة صرافة وشركة استشارات مالية بحلب.',
    education: 'إجازة في الاقتصاد والمحاسبة - جامعة حلب',
    notes: 'مرشحة قوية لمقابلة المقر الرئيسي بحلب.',
    status: 'shortlisted',
    submittedAt: '2026-09-23 15:45'
  }
];

const INITIAL_COMPLAINTS: ComplaintRecord[] = [
  {
    id: 'CMP-2026-01',
    fullName: 'طارق زياد المصري',
    phone: '+963 988 111 222',
    email: 'tarek.masri@yahoo.com',
    category: 'مشكلة في توثيق الحساب',
    message: 'قمت برفع صورة الهوية السورية وسند الإقامة منذ يومين ولم يتم تغيير حالة الطلب من قيد المراجعة حتى الآن، أرجو الإسراع نظراً لحاجتي الملحة لاستخدام المحفظة.',
    priority: 'urgent',
    status: 'in_progress',
    submittedAt: '2026-09-25 09:15',
    adminResponse: 'جاري مراجعة الصور وفحصها مع إدارة التوثيق وسيتم إشعاركم خلال ساعتين.'
  },
  {
    id: 'CMP-2026-02',
    fullName: 'ميساء فؤاد العلي',
    phone: '+963 955 777 888',
    email: 'maysa.ali@gmail.com',
    category: 'ملاحظة واقتراح لتطوير التطبيق',
    message: 'التطبيق ممتاز وسريع جداً، نقترح إضافة إشعارات عبر تطبيق الواتساب أو الرسائل القصيرة SMS فور اعتماد التوثيق لتسهيل متابعة الحالة لكبار السن.',
    priority: 'normal',
    status: 'resolved',
    submittedAt: '2026-09-22 17:00',
    adminResponse: 'شكراً لملاحظتك القيمة، تم رفع المقترح للفريق التقني وسيتم تضمينها في التحديث القادم.'
  }
];

const INITIAL_LOANS: LoanApplication[] = [
  {
    id: 'LOAN-7001',
    fullName: 'وسيم حسام الدين النجار',
    phone: '+963 991 333 444',
    email: 'waseem.najjar@gmail.com',
    governorate: 'حمص',
    loanAmount: 15000000,
    loanDurationMonths: 24,
    loanReason: 'تمويل افتتاح ورشة تصنيع ومعدات كهربائية جديدة',
    monthlyIncome: '2,800,000 ل.س',
    guarantorInfo: 'سند ملكية عقار تجاري + كفيل موظف حكومي معتمد',
    estimatedMonthlyInstallment: 725000,
    status: 'under_review',
    submittedAt: '2026-09-25 14:20',
    adminNotes: 'الملف كامل وتجري مراجعة الضمانة والرهن.'
  },
  {
    id: 'LOAN-7002',
    fullName: 'جمانة كمال البيطار',
    phone: '+963 944 888 999',
    email: 'joumana.bitar@outlook.com',
    governorate: 'اللاذقية',
    loanAmount: 8000000,
    loanDurationMonths: 12,
    loanReason: 'شراء بضاعة ومواد أولية لمحل تجاري قائم',
    monthlyIncome: '1,900,000 ل.س',
    guarantorInfo: 'سجل تجاري نظامي وكشف حساب مصرفي 6 أشهر',
    estimatedMonthlyInstallment: 730000,
    status: 'approved',
    submittedAt: '2026-09-24 10:10',
    adminNotes: 'تمت الموافقة المبدئية والتحويل إلى فرع اللاذقية للتوقيع.'
  }
];

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 'LOG-01',
    action: 'تسجيل دخول إلى النظام',
    userEmail: 'ahmad.kareem@gmail.com',
    userName: 'أحمد محمد عبد الكريم',
    details: 'تسجيل دخول ناجح وبدء جلسة توثيق الهوية عبر شام كاش',
    timestamp: '2026-09-26 13:40:22'
  },
  {
    id: 'LOG-02',
    action: 'تقديم طلب توثيق حساب رسمي',
    userEmail: 'ahmad.kareem@gmail.com',
    userName: 'أحمد محمد عبد الكريم',
    details: 'تم رفع 4 مستندات وتأكيد بيانات المحافظة (دمشق)',
    timestamp: '2026-09-26 13:41:10'
  }
];

export const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  email: 'ayhabkhzalh017@gmail.com',
  password: 'ShamAdmin@2026',
  role: 'المسؤول العام للتوثيق والعمليات (Super Admin)',
  lastUpdated: '2026-09-26 14:00',
  adminNotes: 'حساب الإدارة المعتمد لإدارة وتوثيق طلبات shamchas',
};

const INITIAL_ACCOUNTS: AccountRecord[] = [
  {
    id: 'SC-104288',
    fullName: 'أحمد محمد عبد الكريم',
    phone: '+963 944 123 456',
    email: 'ahmad.kareem@gmail.com',
    password: 'Ahmad@2026Pass',
    governorate: 'دمشق',
    requestType: 'verify',
    status: 'under_review',
    submittedAt: '2026-09-21 14:30',
    documentsCount: 4,
    documentNames: ['البطاقة الشخصية (الوجه الأمامي)', 'البطاقة الشخصية (الوجه الخلفي)', 'صورة شخصية (سيلفي مع الهوية)', 'سند إقامة حديث'],
    uploadedDocuments: [
      { key: 'idFront', label: 'البطاقة الشخصية (الوجه الأمامي)', fileName: 'id_front_ahmad.jpg', fileSize: '1.8 MB', uploadedAt: '2026-09-21 14:28' },
      { key: 'idBack', label: 'البطاقة الشخصية (الوجه الخلفي)', fileName: 'id_back_ahmad.jpg', fileSize: '1.6 MB', uploadedAt: '2026-09-21 14:29' },
      { key: 'selfie', label: 'صورة شخصية (سيلفي مع الهوية)', fileName: 'selfie_ahmad.jpg', fileSize: '2.4 MB', uploadedAt: '2026-09-21 14:29' },
      { key: 'residenceProof', label: 'سند إقامة حديث', fileName: 'residence_ahmad.pdf', fileSize: '850 KB', uploadedAt: '2026-09-21 14:30' }
    ],
    note: 'المستندات مكتملة وقيد الفحص الأمني والمصرفي.',
    adminNotes: 'تمت مراجعة بيانات الهوية السورية وهي متطابقة مع السجل المدني بدمشق.',
    deviceInfo: 'Android 14 / Chrome Mobile'
  },
  {
    id: 'SC-104287',
    fullName: 'ليان خالد الحسن',
    phone: '+963 933 789 012',
    email: 'layan.alhasan@hotmail.com',
    password: 'Layan#Syria2026',
    governorate: 'حلب',
    requestType: 'verify',
    status: 'verified',
    submittedAt: '2026-09-20 11:15',
    documentsCount: 4,
    documentNames: ['البطاقة الشخصية (الوجه الأمامي)', 'البطاقة الشخصية (الوجه الخلفي)', 'صورة شخصية', 'فاتورة كهرباء'],
    uploadedDocuments: [
      { key: 'idFront', label: 'البطاقة الشخصية (الوجه الأمامي)', fileName: 'layan_id_front.jpg', fileSize: '2.1 MB', uploadedAt: '2026-09-20 11:10' },
      { key: 'idBack', label: 'البطاقة الشخصية (الوجه الخلفي)', fileName: 'layan_id_back.jpg', fileSize: '1.9 MB', uploadedAt: '2026-09-20 11:12' },
      { key: 'selfie', label: 'صورة شخصية', fileName: 'layan_selfie.jpg', fileSize: '3.1 MB', uploadedAt: '2026-09-20 11:13' },
      { key: 'residenceProof', label: 'فاتورة كهرباء حديثة', fileName: 'layan_electricity_bill.pdf', fileSize: '1.2 MB', uploadedAt: '2026-09-20 11:14' }
    ],
    note: 'تم التوثيق بنجاح واعتماد الحساب.',
    adminNotes: 'تم تدقيق كافة الوثائق بنجاح وإرسال إشعار التفعيل للمستخدمة.',
    deviceInfo: 'iOS 17.5 / iPhone 15 Pro'
  },
  {
    id: 'SC-104286',
    fullName: 'عمر سامي الديري',
    phone: '+963 988 456 789',
    email: 'omar.samideir@yahoo.com',
    password: 'Omar!Deir988',
    governorate: 'دير الزور',
    requestType: 'swap',
    status: 'needs_info',
    submittedAt: '2026-09-19 16:45',
    documentsCount: 0,
    note: 'يرجى تأكيد الحساب البنكي المرتبط لإتمام تفعيل ميزة تصريف العملات.',
    adminNotes: 'تم التواصل هاتفياً لطلب إرفاق صورة عن رقم الحساب المصرفي.',
    deviceInfo: 'Android 13 / Xiaomi Redmi'
  },
  {
    id: 'SC-104285',
    fullName: 'رهف ياسر النعيمي',
    phone: '+963 955 234 567',
    email: 'rahaf.alnuaimi@outlook.com',
    password: 'Rahaf$Pass955',
    governorate: 'حمص',
    requestType: 'verify',
    status: 'verified',
    submittedAt: '2026-09-18 09:20',
    documentsCount: 4,
    documentNames: ['البطاقة الشخصية (الوجه الأمامي)', 'البطاقة الشخصية (الوجه الخلفي)', 'صورة شخصية', 'سند إقامة'],
    uploadedDocuments: [
      { key: 'idFront', label: 'البطاقة الشخصية (الوجه الأمامي)', fileName: 'rahaf_front.jpg', fileSize: '1.5 MB', uploadedAt: '2026-09-18 09:15' },
      { key: 'idBack', label: 'البطاقة الشخصية (الوجه الخلفي)', fileName: 'rahaf_back.jpg', fileSize: '1.4 MB', uploadedAt: '2026-09-18 09:16' },
      { key: 'selfie', label: 'صورة شخصية', fileName: 'rahaf_selfie.jpg', fileSize: '2.0 MB', uploadedAt: '2026-09-18 09:17' },
      { key: 'residenceProof', label: 'سند إقامة مختوم', fileName: 'rahaf_residence.pdf', fileSize: '650 KB', uploadedAt: '2026-09-18 09:19' }
    ],
    note: 'تم التحقق من الوثائق السورية الرسمية.',
    adminNotes: 'حساب مفعل وموثق بشكل نظامي.',
    deviceInfo: 'Windows 11 / Edge'
  },
  {
    id: 'SC-104284',
    fullName: 'سامر وليد القاسم',
    phone: '+963 991 876 543',
    email: 'samer.kassem@gmail.com',
    password: 'Samer#Kassem99',
    governorate: 'اللاذقية',
    requestType: 'swap',
    status: 'under_review',
    submittedAt: '2026-09-17 13:50',
    documentsCount: 0,
    note: 'طلب تفعيل خيار تبديل العملات بالحساب قيد المراجعة.',
    adminNotes: 'طلب جديد قيد التدقيق لدى قسم العمليات.',
    deviceInfo: 'iOS 16.4 / iPhone 13'
  },
  {
    id: 'SC-104283',
    fullName: 'نور الهدى صالح',
    phone: '+963 966 345 678',
    email: 'noor.saleh@gmail.com',
    password: 'Noor*Saleh966',
    governorate: 'حماة',
    requestType: 'verify',
    status: 'verified',
    submittedAt: '2026-09-16 10:05',
    documentsCount: 4,
    documentNames: ['البطاقة الشخصية (الوجه الأمامي)', 'البطاقة الشخصية (الوجه الخلفي)', 'سيلفي مع البطاقة', 'سند إقامة مختوم'],
    uploadedDocuments: [
      { key: 'idFront', label: 'البطاقة الشخصية (الوجه الأمامي)', fileName: 'noor_front.jpg', fileSize: '1.7 MB', uploadedAt: '2026-09-16 10:01' },
      { key: 'idBack', label: 'البطاقة الشخصية (الوجه الخلفي)', fileName: 'noor_back.jpg', fileSize: '1.8 MB', uploadedAt: '2026-09-16 10:02' },
      { key: 'selfie', label: 'سيلفي مع البطاقة', fileName: 'noor_selfie.jpg', fileSize: '2.5 MB', uploadedAt: '2026-09-16 10:03' },
      { key: 'residenceProof', label: 'سند إقامة مختوم', fileName: 'noor_residence.pdf', fileSize: '700 KB', uploadedAt: '2026-09-16 10:04' }
    ],
    note: 'الحساب موثق ومفعل بالكامل.',
    adminNotes: 'تم الانتهاء من التوثيق وتسليم الحساب للمستخدم.',
    deviceInfo: 'Android 12 / Huawei P40'
  }
];

// Admin Credentials Management
export function getAdminCredentials(): AdminCredentials {
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(DEFAULT_ADMIN_CREDENTIALS));
      return DEFAULT_ADMIN_CREDENTIALS;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.email === 'string' && typeof parsed.password === 'string') {
      return {
        ...DEFAULT_ADMIN_CREDENTIALS,
        ...parsed,
      };
    }
    return DEFAULT_ADMIN_CREDENTIALS;
  } catch (err) {
    console.error('Error reading admin credentials from storage:', err);
    return DEFAULT_ADMIN_CREDENTIALS;
  }
}

export function saveAdminCredentials(creds: Partial<AdminCredentials>): AdminCredentials {
  try {
    const current = getAdminCredentials();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const updated: AdminCredentials = {
      ...current,
      ...creds,
      lastUpdated: formattedDate,
    };

    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_admin_credentials_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Error saving admin credentials:', err);
    return getAdminCredentials();
  }
}

export function resetAdminCredentials(): AdminCredentials {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(DEFAULT_ADMIN_CREDENTIALS));
    window.dispatchEvent(new CustomEvent('sc_admin_credentials_updated', { detail: DEFAULT_ADMIN_CREDENTIALS }));
    return DEFAULT_ADMIN_CREDENTIALS;
  } catch (err) {
    return DEFAULT_ADMIN_CREDENTIALS;
  }
}

export function getSavedAccounts(): AccountRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ACCOUNTS));
      return INITIAL_ACCOUNTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_ACCOUNTS;
  } catch (err) {
    console.error('Error reading saved accounts from storage:', err);
    return INITIAL_ACCOUNTS;
  }
}

export function saveAccountRecord(newAccount: AccountRecord): AccountRecord[] {
  try {
    const current = getSavedAccounts();
    // Match by ID, or if same email matches an existing record
    const existingIndex = current.findIndex(
      a => a.id === newAccount.id || (Boolean(newAccount.email) && a.email.toLowerCase() === newAccount.email.toLowerCase())
    );
    let updated: AccountRecord[];

    if (existingIndex >= 0) {
      const existing = current[existingIndex];
      updated = [...current];
      updated[existingIndex] = {
        ...existing,
        ...newAccount,
        // Preserve password if newAccount doesn't specify one
        password: newAccount.password || existing.password,
        // Preserve or merge uploaded documents
        uploadedDocuments: newAccount.uploadedDocuments && newAccount.uploadedDocuments.length > 0 
          ? newAccount.uploadedDocuments 
          : existing.uploadedDocuments,
        documentsCount: newAccount.documentsCount !== undefined 
          ? newAccount.documentsCount 
          : existing.documentsCount,
        documentNames: newAccount.documentNames && newAccount.documentNames.length > 0 
          ? newAccount.documentNames 
          : existing.documentNames,
        adminNotes: newAccount.adminNotes || existing.adminNotes,
        deviceInfo: newAccount.deviceInfo || existing.deviceInfo,
      };
    } else {
      updated = [newAccount, ...current];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Trigger custom event for cross-component sync
    window.dispatchEvent(new CustomEvent('sc_accounts_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Error saving account record:', err);
    return getSavedAccounts();
  }
}

export function updateAccountAdminNotes(id: string, adminNotes: string): AccountRecord[] {
  try {
    const current = getSavedAccounts();
    const updated = current.map(item => {
      if (item.id === id) {
        return {
          ...item,
          adminNotes,
        };
      }
      return item;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_accounts_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Error updating account admin notes:', err);
    return getSavedAccounts();
  }
}

export function updateAccountStatus(id: string, status: ReviewStatus, note?: string): AccountRecord[] {
  try {
    const current = getSavedAccounts();
    const updated = current.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          ...(note !== undefined ? { note } : {}),
        };
      }
      return item;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_accounts_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Error updating account status:', err);
    return getSavedAccounts();
  }
}

export function deleteAccountRecord(id: string): AccountRecord[] {
  try {
    const current = getSavedAccounts();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_accounts_updated', { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Error deleting account record:', err);
    return getSavedAccounts();
  }
}

export function exportAccountsAsJSON(): void {
  const accounts = getSavedAccounts();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(accounts, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `shamcash_accounts_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportAccountsAsCSV(): void {
  const accounts = getSavedAccounts();
  const headers = [
    'رقم الطلب (معرف الحساب)',
    'الاسم الكامل لصاحب الحساب',
    'البريد الإلكتروني',
    'كلمة السر',
    'رقم الهاتف',
    'المحافظة',
    'نوع الطلب والمعاملة',
    'حالة الطلب',
    'تاريخ تقديم الطلب',
    'عدد الوثائق المرفوعة',
    'أسماء الوثائق المرفقة',
    'ملاحظات المستخدم',
    'ملاحظات التدقيق الإداري',
    'معلومات الجهاز والمتصفح'
  ];
  
  const statusLabels: Record<ReviewStatus, string> = {
    under_review: 'قيد المراجعة',
    verified: 'موثق',
    needs_info: 'يحتاج معلومات',
    rejected: 'مرفوض'
  };

  const rows = accounts.map(a => [
    `"${a.id}"`,
    `"${a.fullName}"`,
    `"${a.email}"`,
    `"${(a.password || '').replace(/"/g, '""')}"`,
    `"${a.phone}"`,
    `"${a.governorate}"`,
    `"${a.requestType === 'verify' ? 'توثيق الحساب' : 'تبديل العملة'}"`,
    `"${statusLabels[a.status] || a.status}"`,
    `"${a.submittedAt}"`,
    `"${a.documentsCount ?? 0}"`,
    `"${((a.documentNames || []).join(' | ')).replace(/"/g, '""')}"`,
    `"${(a.note || '').replace(/"/g, '""')}"`,
    `"${(a.adminNotes || '').replace(/"/g, '""')}"`,
    `"${(a.deviceInfo || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `shamcash_accounts_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function exportAdminCredentialsAsCSV(): void {
  const accounts = getSavedAccounts();
  const adminCreds = getAdminCredentials();
  const headers = [
    'رقم الطلب',
    'الاسم الكامل',
    'البريد الإلكتروني للعميل',
    'كلمة السر المحفوظة',
    'رقم الهاتف',
    'المحافظة',
    'نوع الطلب',
    'الحالة',
    'عدد الوثائق',
    'تاريخ التسجيل',
    'ملاحظات المستخدم',
    'ملاحظات الإدارة'
  ];
  
  const statusLabels: Record<ReviewStatus, string> = {
    under_review: 'قيد المراجعة',
    verified: 'موثق',
    needs_info: 'يحتاج معلومات',
    rejected: 'مرفوض'
  };

  const rows = accounts.map(a => [
    `"${a.id}"`,
    `"${a.fullName}"`,
    `"${a.email}"`,
    `"${(a.password || '').replace(/"/g, '""')}"`,
    `"${a.phone}"`,
    `"${a.governorate}"`,
    `"${a.requestType === 'verify' ? 'توثيق الحساب' : 'تبديل العملة'}"`,
    `"${statusLabels[a.status] || a.status}"`,
    `"${a.documentsCount ?? 0}"`,
    `"${a.submittedAt}"`,
    `"${(a.note || '').replace(/"/g, '""')}"`,
    `"${(a.adminNotes || '').replace(/"/g, '""')}"`
  ]);

  const metaHeader = `# تقرير بيانات اعتماد الإدارة المركزية - شام كاش\n# بريد الإدارة: ${adminCreds.email}\n# تاريخ التصدير: ${new Date().toISOString()}\n`;
  const csvContent = '\uFEFF' + metaHeader + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `shamcash_admin_vault_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function exportAllDataBackup(): void {
  const accounts = getSavedAccounts();
  const adminCreds = getAdminCredentials();
  const loans = getLoanApplications();
  const jobs = getJobApplications();
  const complaints = getComplaints();
  const logs = getActivityLogs();

  const backupPayload = {
    exportedAt: new Date().toISOString(),
    system: 'منظومة شام كاش المركزية - النسخة الاحتياطية الشاملة لكافة بيانات المستخدمين والإدارة',
    adminCredentials: {
      email: adminCreds.email,
      role: adminCreds.role,
      lastUpdated: adminCreds.lastUpdated,
      adminNotes: adminCreds.adminNotes || ''
    },
    summaryMetrics: {
      totalAccountsCount: accounts.length,
      totalLoanApplicationsCount: loans.length,
      totalJobApplicationsCount: jobs.length,
      totalComplaintsCount: complaints.length,
      totalActivityLogsCount: logs.length
    },
    accounts,
    loans,
    jobs,
    complaints,
    activityLogs: logs
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupPayload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `shamcash_full_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportLoansAsCSV(): void {
  const loans = getLoanApplications();
  const headers = ['رقم الطلب', 'اسم المقترض', 'رقم الهاتف', 'البريد الإلكتروني', 'المحافظة', 'قيمة القرض (ل.س)', 'مدة القرض (أشهر)', 'القسط الشهري التقديري', 'الدخل الشهري', 'الضمانة والكفيل', 'سبب القرض', 'الحالة', 'تاريخ التقديم'];
  const rows = loans.map(l => [
    `"${l.id}"`,
    `"${l.fullName}"`,
    `"${l.phone}"`,
    `"${l.email}"`,
    `"${l.governorate}"`,
    `"${l.loanAmount}"`,
    `"${l.loanDurationMonths}"`,
    `"${l.estimatedMonthlyInstallment}"`,
    `"${l.monthlyIncome}"`,
    `"${(l.guarantorInfo || '').replace(/"/g, '""')}"`,
    `"${(l.loanReason || '').replace(/"/g, '""')}"`,
    `"${l.status}"`,
    `"${l.submittedAt}"`
  ]);
  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `shamcash_loans_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function exportJobsAsCSV(): void {
  const jobs = getJobApplications();
  const headers = ['رقم الطلب', 'اسم المتقدم', 'المسمى الوظيفي', 'نوع الدوام', 'رقم الهاتف', 'البريد الإلكتروني', 'المحافظة', 'المؤهل العلمي', 'سنوات الخبرة', 'الخبرات والمهارات', 'ملاحظات إضافية', 'الحالة', 'تاريخ التقديم'];
  const rows = jobs.map(j => [
    `"${j.id}"`,
    `"${j.fullName}"`,
    `"${j.jobTitle}"`,
    `"${j.jobType}"`,
    `"${j.phone}"`,
    `"${j.email}"`,
    `"${j.governorate}"`,
    `"${j.education}"`,
    `"${j.experienceYears}"`,
    `"${(j.experienceDetails || '').replace(/"/g, '""')}"`,
    `"${(j.notes || '').replace(/"/g, '""')}"`,
    `"${j.status}"`,
    `"${j.submittedAt}"`
  ]);
  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `shamcash_jobs_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function exportComplaintsAsCSV(): void {
  const complaints = getComplaints();
  const headers = ['رقم الشكوى', 'اسم صاحب الملاحظة', 'رقم الهاتف', 'البريد الإلكتروني', 'التصنيف', 'درجة الأولوية', 'نص الشكوى / الملاحظة', 'رد الإدارة', 'الحالة', 'تاريخ التقديم'];
  const rows = complaints.map(c => [
    `"${c.id}"`,
    `"${c.fullName}"`,
    `"${c.phone}"`,
    `"${c.email}"`,
    `"${c.category}"`,
    `"${c.priority === 'urgent' ? 'عاجلة' : 'عادية'}"`,
    `"${(c.message || '').replace(/"/g, '""')}"`,
    `"${(c.adminResponse || '').replace(/"/g, '""')}"`,
    `"${c.status}"`,
    `"${c.submittedAt}"`
  ]);
  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `shamcash_complaints_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function exportAdminCredentialsAsJSON(): void {
  const accounts = getSavedAccounts();
  const adminCreds = getAdminCredentials();
  const payload = {
    exportedAt: new Date().toISOString(),
    adminCredentials: {
      email: adminCreds.email,
      role: adminCreds.role,
      lastUpdated: adminCreds.lastUpdated,
    },
    accountsTotal: accounts.length,
    accounts: accounts.map(a => ({
      id: a.id,
      fullName: a.fullName,
      email: a.email,
      password: a.password || '',
      phone: a.phone,
      governorate: a.governorate,
      requestType: a.requestType,
      status: a.status,
      submittedAt: a.submittedAt,
      note: a.note || ''
    }))
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `shamcash_admin_vault_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// ------------------- Jobs Storage -------------------
export function getJobApplications(): JobApplication[] {
  try {
    const raw = localStorage.getItem(JOBS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
      return INITIAL_JOBS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_JOBS;
  } catch {
    return INITIAL_JOBS;
  }
}

export function saveJobApplication(newJob: JobApplication): JobApplication[] {
  try {
    const current = getJobApplications();
    const updated = [newJob, ...current];
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_jobs_updated', { detail: updated }));
    logUserActivity(
      'تقديم طلب توظيف جديد',
      `تقديم طلب لوظيفة (${newJob.jobTitle}) باسم ${newJob.fullName}`,
      newJob.email,
      newJob.fullName
    );
    return updated;
  } catch {
    return getJobApplications();
  }
}

export function updateJobStatus(id: string, status: JobApplication['status']): JobApplication[] {
  try {
    const current = getJobApplications();
    const updated = current.map(j => (j.id === id ? { ...j, status } : j));
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_jobs_updated', { detail: updated }));
    return updated;
  } catch {
    return getJobApplications();
  }
}

export function deleteJobApplication(id: string): JobApplication[] {
  try {
    const current = getJobApplications();
    const updated = current.filter(j => j.id !== id);
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_jobs_updated', { detail: updated }));
    return updated;
  } catch {
    return getJobApplications();
  }
}

// ------------------- Complaints Storage -------------------
export function getComplaints(): ComplaintRecord[] {
  try {
    const raw = localStorage.getItem(COMPLAINTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(INITIAL_COMPLAINTS));
      return INITIAL_COMPLAINTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_COMPLAINTS;
  } catch {
    return INITIAL_COMPLAINTS;
  }
}

export function saveComplaint(complaint: ComplaintRecord): ComplaintRecord[] {
  try {
    const current = getComplaints();
    const updated = [complaint, ...current];
    localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_complaints_updated', { detail: updated }));
    logUserActivity(
      'تسجيل شكوى / ملاحظة جديدة',
      `تصنيف (${complaint.category}): ${complaint.message.slice(0, 60)}...`,
      complaint.email,
      complaint.fullName
    );
    return updated;
  } catch {
    return getComplaints();
  }
}

export function updateComplaintStatus(
  id: string,
  status: ComplaintRecord['status'],
  adminResponse?: string
): ComplaintRecord[] {
  try {
    const current = getComplaints();
    const updated = current.map(c =>
      c.id === id ? { ...c, status, ...(adminResponse !== undefined ? { adminResponse } : {}) } : c
    );
    localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_complaints_updated', { detail: updated }));
    return updated;
  } catch {
    return getComplaints();
  }
}

export function deleteComplaint(id: string): ComplaintRecord[] {
  try {
    const current = getComplaints();
    const updated = current.filter(c => c.id !== id);
    localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_complaints_updated', { detail: updated }));
    return updated;
  } catch {
    return getComplaints();
  }
}

// ------------------- Loans Storage -------------------
export function getLoanApplications(): LoanApplication[] {
  try {
    const raw = localStorage.getItem(LOANS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(INITIAL_LOANS));
      return INITIAL_LOANS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_LOANS;
  } catch {
    return INITIAL_LOANS;
  }
}

export function saveLoanApplication(loan: LoanApplication): LoanApplication[] {
  try {
    const current = getLoanApplications();
    const updated = [loan, ...current];
    localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_loans_updated', { detail: updated }));
    logUserActivity(
      'تقديم طلب قرض مالي',
      `قيمة القرض: ${loan.loanAmount.toLocaleString()} ل.س لمدة ${loan.loanDurationMonths} شهر (${loan.loanReason})`,
      loan.email,
      loan.fullName
    );
    return updated;
  } catch {
    return getLoanApplications();
  }
}

export function updateLoanStatus(
  id: string,
  status: LoanApplication['status'],
  adminNotes?: string
): LoanApplication[] {
  try {
    const current = getLoanApplications();
    const updated = current.map(l =>
      l.id === id ? { ...l, status, ...(adminNotes !== undefined ? { adminNotes } : {}) } : l
    );
    localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_loans_updated', { detail: updated }));
    return updated;
  } catch {
    return getLoanApplications();
  }
}

export function deleteLoanApplication(id: string): LoanApplication[] {
  try {
    const current = getLoanApplications();
    const updated = current.filter(l => l.id !== id);
    localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_loans_updated', { detail: updated }));
    return updated;
  } catch {
    return getLoanApplications();
  }
}

// ------------------- Activity Logs Storage -------------------
export function getActivityLogs(): ActivityLog[] {
  try {
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(INITIAL_LOGS));
      return INITIAL_LOGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_LOGS;
  } catch {
    return INITIAL_LOGS;
  }
}

export function logUserActivity(
  action: string,
  details: string,
  userEmail?: string,
  userName?: string
): ActivityLog[] {
  try {
    const current = getActivityLogs();
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const newLog: ActivityLog = {
      id: 'LOG-' + Math.floor(1000 + Math.random() * 9000),
      action,
      details,
      userEmail: userEmail || localStorage.getItem('sc_waiting_email') || 'زائر / غير محدد',
      userName: userName || localStorage.getItem('sc_contact_name') || 'مستخدم شام كاش',
      timestamp
    };

    const updated = [newLog, ...current].slice(0, 100); // keep last 100 entries
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('sc_activity_updated', { detail: updated }));
    return updated;
  } catch {
    return getActivityLogs();
  }
}

export function clearActivityLogs(): void {
  try {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('sc_activity_updated', { detail: [] }));
  } catch {}
}
