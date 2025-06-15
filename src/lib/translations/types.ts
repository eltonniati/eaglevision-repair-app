
export type Language = 'en' | 'fr' | 'pt' | 'es' | 'ln' | 'kg' | 'sw' | 'ts';

export interface CommonTranslations {
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  create: string;
  search: string;
  loading: string;
  error: string;
  success: string;
  back: string;
  next: string;
  previous: string;
  close: string;
  confirm: string;
}

export interface NavigationTranslations {
  dashboard: string;
  jobCards: string;
  invoices: string;
  companyProfile: string;
  settings: string;
}

export interface AuthTranslations {
  login: string;
  register: string;
  logout: string;
  email: string;
  password: string;
  confirmPassword: string;
  forgotPassword: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  appDescription: string;
  features: {
    jobManagement: string;
    customerTracking: string;
    invoiceGeneration: string;
  };
  copyright: string;
  heroLongDescription: string;
}

export interface JobCardTranslations {
  createJobCard: string;
  jobCardNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deviceName: string;
  deviceModel: string;
  deviceCondition: string;
  problem: string;
  status: string;
  handlingFees: string;
  noJobCardsFound: string;
  createFirstJobCard: string;
  loadingJobCards: string;
  errorLoadingJobCards: string;
  reloadPage: string;
  jobCardCreated: string;
  jobCardUpdated: string;
  jobCardDeleted: string;
  previewJob: string;
  printJob: string;
  shareJob: string;
  deleteJob: string;
  createdOn: string;
  jobCardActions: string;
  manageJobCard: string;
  selectStatus: string;
  jobCardNotFound: string;
  failedToDeleteJobCard: string;
  for: string;
  contact: string;
  savePlease: string;
  finished: string;
  jobsRefreshed: string;
  jobNotFound: string;
  statusUpdatedSuccessfully: string;
  statusUpdateFailed: string;
  refreshJobs: string;
  failedToLoad: string;
  fillAllFields: string;
  noJobId: string;
  failedToUpdateJobCard: string;
  errorUpdatingJobCard: string;
  retry: string;
  updateJobDetails: string;
  information: string;
  updateCustomerDetails: string;
  optional: string;
  updateDeviceDetails: string;
  details: string;
  updateProblemDetails: string;
  of: string;
  describeProblem: string;
  company: string;
  loadingCompanies: string;
  selectCompany: string;
  noCompany: string;
  changes: string;
}

export interface InvoiceTranslations {
  invoice: string;
  issueDate: string;
  dueDate: string;
  from: string;
  billTo: string;
  invoiceDetails: string;
  description: string;
  device: string;
  lineItems: string;
  qty: string;
  unitPrice: string;
  amount: string;
  subtotal: string;
  total: string;
  notes: string;
  termsConditions: string;
  thankYou: string;
  generatedOn: string;
  companyInfoNotAvailable: string;
  createInvoice: string;
  invoiceCreated: string;
  invoiceUpdated: string;
  noInvoicesFound: string;
  createFirstInvoice: string;
}

export interface SettingsTranslations {
  language: string;
  selectLanguage: string;
  english: string;
  french: string;
  portuguese: string;
  managePreferences: string;
  congoleseLanguages: string;
}

export interface CompanyTranslations {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  updateProfile: string;
  profileUpdated: string;
  companyProfileDescription: string;
  contactInformation: string;
  editProfile: string;
}

export interface StatusTranslations {
  pending: string;
  inProgress: string;
  completed: string;
  cancelled: string;
  waitingForParts: string;
}

export interface DashboardTranslations {
  totalJobCards: string;
  jobsInProgress: string;
  jobsCompleted: string;
  jobsWaitingParts: string;
  recentJobCards: string;
  viewAll: string;
  recentJobsDescription: string;
  customer: string;
}

export interface ActionsTranslations {
  print: string;
  share: string;
  whatsapp: string;
  sendEmail: string;
  download: string;
  preview: string;
}

export interface AppTranslations extends
  CommonTranslations,
  NavigationTranslations,
  AuthTranslations,
  JobCardTranslations,
  InvoiceTranslations,
  SettingsTranslations,
  CompanyTranslations,
  StatusTranslations,
  DashboardTranslations,
  ActionsTranslations {}
