
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
  back: string;
  next: string;
  previous: string;
  close: string;
  confirm: string;
  
  // Authentication & Landing
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
  createInvoice: string;
  invoiceCreated: string;
  invoiceUpdated: string;
  noInvoicesFound: string;
  createFirstInvoice: string;
  
  // Settings
  language: string;
  selectLanguage: string;
  english: string;
  french: string;
  portuguese: string;
  managePreferences: string;
  
  // Company Profile
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  updateProfile: string;
  profileUpdated: string;
  
  // Status options
  pending: string;
  inProgress: string;
  completed: string;
  cancelled: string;
  
  // Actions
  print: string;
  share: string;
  whatsapp: string;
  sendEmail: string;
  download: string;
  preview: string;
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
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    confirm: 'Confirm',
    
    // Authentication & Landing
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    welcomeTitle: 'FixFlow Connect',
    welcomeSubtitle: 'Repair shop management simplified',
    appDescription: 'Streamline your repair shop operations',
    features: {
      jobManagement: 'Easy job card creation and management',
      customerTracking: 'Customer information tracking',
      invoiceGeneration: 'Simple invoice generation'
    },
    copyright: '© 2023 FixFlow Connect. All rights reserved.',
    
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
    noJobCardsFound: 'No job cards found',
    createFirstJobCard: 'Create First Job Card',
    loadingJobCards: 'Loading job cards...',
    errorLoadingJobCards: 'Error Loading Job Cards',
    reloadPage: 'Reload Page',
    jobCardCreated: 'Job card created successfully',
    jobCardUpdated: 'Job card updated successfully',
    jobCardDeleted: 'Job card deleted successfully',
    previewJob: 'Preview Job',
    printJob: 'Print Job',
    shareJob: 'Share Job',
    deleteJob: 'Delete Job',
    
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
    createInvoice: 'Create Invoice',
    invoiceCreated: 'Invoice created successfully',
    invoiceUpdated: 'Invoice updated successfully',
    noInvoicesFound: 'No invoices found',
    createFirstInvoice: 'Create First Invoice',
    
    // Settings
    language: 'Language',
    selectLanguage: 'Select Language',
    english: 'English',
    french: 'Français',
    portuguese: 'Português',
    managePreferences: 'Manage your application preferences',
    
    // Company Profile
    companyName: 'Company Name',
    companyAddress: 'Company Address',
    companyPhone: 'Company Phone',
    companyEmail: 'Company Email',
    updateProfile: 'Update Profile',
    profileUpdated: 'Profile updated successfully',
    
    // Status options
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    
    // Actions
    print: 'Print',
    share: 'Share',
    whatsapp: 'WhatsApp',
    sendEmail: 'Send Email',
    download: 'Download',
    preview: 'Preview'
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
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    close: 'Fermer',
    confirm: 'Confirmer',
    
    // Authentication & Landing
    login: 'Connexion',
    register: 'S\'inscrire',
    logout: 'Déconnexion',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    forgotPassword: 'Mot de passe oublié?',
    welcomeTitle: 'FixFlow Connect',
    welcomeSubtitle: 'Gestion d\'atelier de réparation simplifiée',
    appDescription: 'Rationalisez les opérations de votre atelier de réparation',
    features: {
      jobManagement: 'Création et gestion faciles de fiches de travail',
      customerTracking: 'Suivi des informations clients',
      invoiceGeneration: 'Génération simple de factures'
    },
    copyright: '© 2023 FixFlow Connect. Tous droits réservés.',
    
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
    noJobCardsFound: 'Aucune fiche de travail trouvée',
    createFirstJobCard: 'Créer la première fiche',
    loadingJobCards: 'Chargement des fiches...',
    errorLoadingJobCards: 'Erreur de chargement des fiches',
    reloadPage: 'Recharger la page',
    jobCardCreated: 'Fiche de travail créée avec succès',
    jobCardUpdated: 'Fiche de travail mise à jour',
    jobCardDeleted: 'Fiche de travail supprimée',
    previewJob: 'Aperçu',
    printJob: 'Imprimer',
    shareJob: 'Partager',
    deleteJob: 'Supprimer',
    
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
    createInvoice: 'Créer une facture',
    invoiceCreated: 'Facture créée avec succès',
    invoiceUpdated: 'Facture mise à jour',
    noInvoicesFound: 'Aucune facture trouvée',
    createFirstInvoice: 'Créer la première facture',
    
    // Settings
    language: 'Langue',
    selectLanguage: 'Sélectionner la langue',
    english: 'English',
    french: 'Français',
    portuguese: 'Português',
    managePreferences: 'Gérez vos préférences d\'application',
    
    // Company Profile
    companyName: 'Nom de l\'entreprise',
    companyAddress: 'Adresse de l\'entreprise',
    companyPhone: 'Téléphone de l\'entreprise',
    companyEmail: 'Email de l\'entreprise',
    updateProfile: 'Mettre à jour le profil',
    profileUpdated: 'Profil mis à jour avec succès',
    
    // Status options
    pending: 'En attente',
    inProgress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
    
    // Actions
    print: 'Imprimer',
    share: 'Partager',
    whatsapp: 'WhatsApp',
    sendEmail: 'Envoyer par email',
    download: 'Télécharger',
    preview: 'Aperçu'
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
    back: 'Voltar',
    next: 'Próximo',
    previous: 'Anterior',
    close: 'Fechar',
    confirm: 'Confirmar',
    
    // Authentication & Landing
    login: 'Entrar',
    register: 'Registrar',
    logout: 'Sair',
    email: 'Email',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    forgotPassword: 'Esqueceu a senha?',
    welcomeTitle: 'FixFlow Connect',
    welcomeSubtitle: 'Gestão de oficina de reparos simplificada',
    appDescription: 'Otimize as operações da sua oficina de reparos',
    features: {
      jobManagement: 'Criação e gestão fácil de cartões de trabalho',
      customerTracking: 'Acompanhamento de informações do cliente',
      invoiceGeneration: 'Geração simples de faturas'
    },
    copyright: '© 2023 FixFlow Connect. Todos os direitos reservados.',
    
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
    noJobCardsFound: 'Nenhum cartão de trabalho encontrado',
    createFirstJobCard: 'Criar Primeiro Cartão',
    loadingJobCards: 'Carregando cartões...',
    errorLoadingJobCards: 'Erro ao Carregar Cartões',
    reloadPage: 'Recarregar Página',
    jobCardCreated: 'Cartão de trabalho criado com sucesso',
    jobCardUpdated: 'Cartão de trabalho atualizado',
    jobCardDeleted: 'Cartão de trabalho excluído',
    previewJob: 'Visualizar',
    printJob: 'Imprimir',
    shareJob: 'Compartilhar',
    deleteJob: 'Excluir',
    
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
    createInvoice: 'Criar Fatura',
    invoiceCreated: 'Fatura criada com sucesso',
    invoiceUpdated: 'Fatura atualizada',
    noInvoicesFound: 'Nenhuma fatura encontrada',
    createFirstInvoice: 'Criar Primeira Fatura',
    
    // Settings
    language: 'Idioma',
    selectLanguage: 'Selecionar Idioma',
    english: 'English',
    french: 'Français',
    portuguese: 'Português',
    managePreferences: 'Gerencie suas preferências do aplicativo',
    
    // Company Profile
    companyName: 'Nome da Empresa',
    companyAddress: 'Endereço da Empresa',
    companyPhone: 'Telefone da Empresa',
    companyEmail: 'Email da Empresa',
    updateProfile: 'Atualizar Perfil',
    profileUpdated: 'Perfil atualizado com sucesso',
    
    // Status options
    pending: 'Pendente',
    inProgress: 'Em Andamento',
    completed: 'Concluído',
    cancelled: 'Cancelado',
    
    // Actions
    print: 'Imprimir',
    share: 'Compartilhar',
    whatsapp: 'WhatsApp',
    sendEmail: 'Enviar por Email',
    download: 'Baixar',
    preview: 'Visualizar'
  }
};

export const getTranslations = (language: Language): AppTranslations => {
  return translations[language];
};
