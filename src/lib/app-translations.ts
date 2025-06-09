
export type Language = 'en' | 'fr' | 'pt';

export interface AppTranslations {
  // Navigation
  dashboard: string;
  jobCards: string;
  invoices: string;
  companyProfile: string;
  settings: string;
  
  // Common
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  create: string;
  search: string;
  loading: string;
  error: string;
  success: string;
  
  // Job Cards
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
  
  // Invoices
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
  
  // Settings
  language: string;
  selectLanguage: string;
  english: string;
  french: string;
  portuguese: string;
}

export const translations: Record<Language, AppTranslations> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    jobCards: 'Job Cards',
    invoices: 'Invoices',
    companyProfile: 'Company Profile',
    settings: 'Settings',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Job Cards
    createJobCard: 'Create Job Card',
    jobCardNumber: 'Job Card Number',
    customerName: 'Customer Name',
    customerPhone: 'Customer Phone',
    customerEmail: 'Customer Email',
    deviceName: 'Device Name',
    deviceModel: 'Device Model',
    deviceCondition: 'Device Condition',
    problem: 'Problem',
    status: 'Status',
    handlingFees: 'Handling Fees',
    
    // Invoices
    invoice: 'INVOICE',
    issueDate: 'Issue Date',
    dueDate: 'Due Date',
    from: 'From',
    billTo: 'Bill To',
    invoiceDetails: 'Invoice Details',
    description: 'Description',
    device: 'Device',
    lineItems: 'Line Items',
    qty: 'Qty',
    unitPrice: 'Unit Price',
    amount: 'Amount',
    subtotal: 'Subtotal',
    total: 'Total',
    notes: 'Notes',
    termsConditions: 'Terms & Conditions',
    thankYou: 'Thank you for your business!',
    generatedOn: 'Generated on',
    companyInfoNotAvailable: 'Company information not available',
    
    // Settings
    language: 'Language',
    selectLanguage: 'Select Language',
    english: 'English',
    french: 'Français',
    portuguese: 'Português'
  },
  fr: {
    // Navigation
    dashboard: 'Tableau de bord',
    jobCards: 'Fiches de travail',
    invoices: 'Factures',
    companyProfile: 'Profil de l\'entreprise',
    settings: 'Paramètres',
    
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    create: 'Créer',
    search: 'Rechercher',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    
    // Job Cards
    createJobCard: 'Créer une fiche de travail',
    jobCardNumber: 'Numéro de fiche',
    customerName: 'Nom du client',
    customerPhone: 'Téléphone du client',
    customerEmail: 'Email du client',
    deviceName: 'Nom de l\'appareil',
    deviceModel: 'Modèle de l\'appareil',
    deviceCondition: 'État de l\'appareil',
    problem: 'Problème',
    status: 'Statut',
    handlingFees: 'Frais de traitement',
    
    // Invoices
    invoice: 'FACTURE',
    issueDate: 'Date d\'émission',
    dueDate: 'Date d\'échéance',
    from: 'De',
    billTo: 'Facturer à',
    invoiceDetails: 'Détails de la facture',
    description: 'Description',
    device: 'Appareil',
    lineItems: 'Articles',
    qty: 'Qté',
    unitPrice: 'Prix unitaire',
    amount: 'Montant',
    subtotal: 'Sous-total',
    total: 'Total',
    notes: 'Notes',
    termsConditions: 'Termes et conditions',
    thankYou: 'Merci pour votre confiance!',
    generatedOn: 'Généré le',
    companyInfoNotAvailable: 'Informations de l\'entreprise non disponibles',
    
    // Settings
    language: 'Langue',
    selectLanguage: 'Sélectionner la langue',
    english: 'English',
    french: 'Français',
    portuguese: 'Português'
  },
  pt: {
    // Navigation
    dashboard: 'Painel',
    jobCards: 'Cartões de Trabalho',
    invoices: 'Faturas',
    companyProfile: 'Perfil da Empresa',
    settings: 'Configurações',
    
    // Common
    save: 'Salvar',
    cancel: 'Cancelar',
    delete: 'Excluir',
    edit: 'Editar',
    create: 'Criar',
    search: 'Pesquisar',
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    
    // Job Cards
    createJobCard: 'Criar Cartão de Trabalho',
    jobCardNumber: 'Número do Cartão',
    customerName: 'Nome do Cliente',
    customerPhone: 'Telefone do Cliente',
    customerEmail: 'Email do Cliente',
    deviceName: 'Nome do Dispositivo',
    deviceModel: 'Modelo do Dispositivo',
    deviceCondition: 'Condição do Dispositivo',
    problem: 'Problema',
    status: 'Estado',
    handlingFees: 'Taxa de Manuseio',
    
    // Invoices
    invoice: 'FATURA',
    issueDate: 'Data de emissão',
    dueDate: 'Data de vencimento',
    from: 'De',
    billTo: 'Faturar para',
    invoiceDetails: 'Detalhes da fatura',
    description: 'Descrição',
    device: 'Dispositivo',
    lineItems: 'Itens',
    qty: 'Qtd',
    unitPrice: 'Preço unitário',
    amount: 'Valor',
    subtotal: 'Subtotal',
    total: 'Total',
    notes: 'Notas',
    termsConditions: 'Termos e condições',
    thankYou: 'Obrigado pelo seu negócio!',
    generatedOn: 'Gerado em',
    companyInfoNotAvailable: 'Informações da empresa não disponíveis',
    
    // Settings
    language: 'Idioma',
    selectLanguage: 'Selecionar Idioma',
    english: 'English',
    french: 'Français',
    portuguese: 'Português'
  }
};

export const getTranslations = (language: Language): AppTranslations => {
  return translations[language];
};
