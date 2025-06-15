// Removed: import { Language } from './app-translations';

export type Language = 'en' | 'fr' | 'pt' | 'es' | 'ln' | 'kg' | 'sw' | 'ts';

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
  congoleseLanguages: string;
  
  // Company Profile
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  updateProfile: string;
  profileUpdated: string;
  companyProfileDescription: string;
  contactInformation: string;
  editProfile: string;
  
  // Status options
  pending: string;
  inProgress: string;
  completed: string;
  cancelled: string;
  waitingForParts: string;
  
  // Dashboard specific
  totalJobCards: string;
  jobsInProgress: string;
  jobsCompleted: string;
  jobsWaitingParts: string;
  recentJobCards: string;
  viewAll: string;
  recentJobsDescription: string;
  customer: string;
  
  // Actions
  print: string;
  share: string;
  whatsapp: string;
  sendEmail: string;
  download: string;
  preview: string;

  // Additional job detail specific translations
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

  // Add new key:
  heroLongDescription: string;

  /*** ADDED FOR DASHBOARD JOB STATUS/REFRESH UX BELOW ***/
  jobsRefreshed: string;
  jobNotFound: string;
  statusUpdatedSuccessfully: string;
  statusUpdateFailed: string;
  refreshJobs: string;

  // NEW MISSING TRANSLATIONS FOR EDIT JOB CARD
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
    congoleseLanguages: 'Congolese Languages',
    
    // Company Profile
    companyName: 'Company Name',
    companyAddress: 'Company Address',
    companyPhone: 'Company Phone',
    companyEmail: 'Company Email',
    updateProfile: 'Update Profile',
    profileUpdated: 'Profile updated successfully',
    companyProfileDescription: 'Manage your company information and settings',
    contactInformation: 'Contact Information',
    editProfile: 'Edit Profile',
    
    // Status options
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    waitingForParts: 'Waiting for Parts',
    
    // Dashboard specific
    totalJobCards: 'total job cards',
    jobsInProgress: 'jobs in progress',
    jobsCompleted: 'jobs completed',
    jobsWaitingParts: 'jobs waiting for parts',
    recentJobCards: 'Recent Job Cards',
    viewAll: 'View All',
    recentJobsDescription: 'Your most recent job cards and their status',
    customer: 'Customer',
    
    // Actions
    print: 'Print',
    share: 'Share',
    whatsapp: 'WhatsApp',
    sendEmail: 'Send Email',
    download: 'Download',
    preview: 'Preview',

    // Additional job detail specific translations
    createdOn: 'Created on',
    jobCardActions: 'Job Card Actions',
    manageJobCard: 'Manage this job card',
    selectStatus: 'Select a status',
    jobCardNotFound: 'Job card not found',
    failedToDeleteJobCard: 'Failed to delete job card',
    for: 'for',
    contact: 'Contact',
    savePlease: 'Please save your changes before printing',
    finished: 'Finished',

    // NEW TRANSLATION:
    heroLongDescription: 'Track jobs, manage customers, and handle invoices all in one place. FixFlow Connect helps you run your repair business efficiently.',

    // ADDED:
    jobsRefreshed: "Jobs refreshed",
    jobNotFound: "Job not found",
    statusUpdatedSuccessfully: "Status updated successfully",
    statusUpdateFailed: "Failed to update status",
    refreshJobs: "Refresh Jobs",

    // NEW MISSING TRANSLATIONS FOR EDIT JOB CARD
    failedToLoad: "Failed to load",
    fillAllFields: "Please fill in all required fields",
    noJobId: "No job ID found",
    failedToUpdateJobCard: "Failed to update job card",
    errorUpdatingJobCard: "An error occurred while updating the job card",
    retry: "Retry",
    updateJobDetails: "Update details for this repair job",
    information: "Information",
    updateCustomerDetails: "Update the customer's contact details",
    optional: "optional",
    updateDeviceDetails: "Update details about the device being repaired",
    details: "Details",
    updateProblemDetails: "Update the issue with the device",
    of: "of",
    describeProblem: "Describe the issue with the device...",
    company: "Company",
    loadingCompanies: "Loading companies...",
    selectCompany: "Select a company",
    noCompany: "No company",
    changes: "Changes"
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
    description: 'Ndimbola',
    device: 'Eloko',
    lineItems: 'Biloko',
    qty: 'Motango',
    unitPrice: 'Ntalo ya Moko',
    amount: 'Mbongo',
    subtotal: 'Sous-total',
    total: 'Nyonso',
    notes: 'Bilembo',
    termsConditions: 'Mibeko pe Malako',
    thankYou: 'Merci pour votre confiance!',
    generatedOn: 'Esálemi na',
    companyInfoNotAvailable: 'Makambo ya kompanyi ezali te',
    createInvoice: 'Kosála Kwákísi',
    invoiceCreated: 'Kwákísi esálemi malamu',
    invoiceUpdated: 'Kwákísi ebongwani',
    noInvoicesFound: 'Bakwákísi ezwami te',
    createFirstInvoice: 'Kosála Kwákísi ya Liboso',
    
    // Settings
    language: 'Langue',
    selectLanguage: 'Sélectionner la langue',
    english: 'English',
    french: 'Français',
    portuguese: 'Português',
    managePreferences: 'Gérez vos préférences d\'application',
    congoleseLanguages: 'Langues Congolaises',
    
    // Company Profile
    companyName: 'Nom de l\'entreprise',
    companyAddress: 'Adresse de l\'entreprise',
    companyPhone: 'Téléphone de l\'entreprise',
    companyEmail: 'Email de l\'entreprise',
    updateProfile: 'Mettre à jour le profil',
    profileUpdated: 'Profil mis à jour avec succès',
    companyProfileDescription: 'Gérez les informations et paramètres de votre entreprise',
    contactInformation: 'Informations de contact',
    editProfile: 'Modifier le profil',
    
    // Status options
    pending: 'En attente',
    inProgress: 'En cours',
    completed: 'Terminé',
    cancelled: 'Annulé',
    waitingForParts: 'En attente de pièces',
    
    // Dashboard specific
    totalJobCards: 'fiches de travail au total',
    jobsInProgress: 'travaux en cours',
    jobsCompleted: 'travaux terminés',
    jobsWaitingParts: 'travaux en attente de pièces',
    recentJobCards: 'Fiches de Travail Récentes',
    viewAll: 'Voir Tout',
    recentJobsDescription: 'Vos fiches de travail les plus récentes et leur statut',
    customer: 'Client',
    
    // Actions
    print: 'Imprimer',
    share: 'Partager',
    whatsapp: 'WhatsApp',
    sendEmail: 'Envoyer par email',
    download: 'Télécharger',
    preview: 'Aperçu',

    // Additional job detail specific translations
    createdOn: 'Créé le',
    jobCardActions: 'Actions de la Fiche',
    manageJobCard: 'Gérer cette fiche de travail',
    selectStatus: 'Sélectionner un statut',
    jobCardNotFound: 'Fiche de travail introuvable',
    failedToDeleteJobCard: 'Échec de la suppression de la fiche',
    for: 'pour',
    contact: 'Contact',
    savePlease: 'Veuillez sauvegarder avant d\'imprimer',
    finished: 'Terminé',

    heroLongDescription: "Suivez les jobs, gérez les clients et faites les factures au même endroit. FixFlow Connect vous aide à gérer efficacement votre atelier de réparation.",

    // ADDED:
    jobsRefreshed: "Jobs actualisés",
    jobNotFound: "Fiche de travail introuvable",
    statusUpdatedSuccessfully: "Statut mis à jour avec succès",
    statusUpdateFailed: "Échec de la mise à jour du statut",
    refreshJobs: "Actualiser les jobs",

    // NEW MISSING TRANSLATIONS FOR EDIT JOB CARD
    failedToLoad: "Échec du chargement",
    fillAllFields: "Veuillez remplir tous les champs requis",
    noJobId: "Aucun ID de fiche trouvé",
    failedToUpdateJobCard: "Échec de la mise à jour de la fiche",
    errorUpdatingJobCard: "Une erreur est survenue lors de la mise à jour",
    retry: "Réessayer",
    updateJobDetails: "Mettre à jour les détails de cette réparation",
    information: "Informations",
    updateCustomerDetails: "Mettre à jour les coordonnées du client",
    optional: "facultatif",
    updateDeviceDetails: "Mettre à jour les détails de l'appareil à réparer",
    details: "Détails",
    updateProblemDetails: "Mettre à jour le problème de l'appareil",
    of: "de",
    describeProblem: "Décrivez le problème de l'appareil...",
    company: "Entreprise",
    loadingCompanies: "Chargement des entreprises...",
    selectCompany: "Sélectionner une entreprise",
    noCompany: "Aucune entreprise",
    changes: "Modifications"
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
    congoleseLanguages: 'Línguas Congolesas',
    
    // Company Profile
    companyName: 'Nome da Empresa',
    companyAddress: 'Endereço da Empresa',
    companyPhone: 'Telefone da Empresa',
    companyEmail: 'Email da Empresa',
    updateProfile: 'Atualizar Perfil',
    profileUpdated: 'Perfil atualizado com sucesso',
    companyProfileDescription: 'Gerencie as informações e configurações da sua empresa',
    contactInformation: 'Informações de Contato',
    editProfile: 'Editar Perfil',
    
    // Status options
    pending: 'Pendente',
    inProgress: 'Em Andamento',
    completed: 'Concluído',
    cancelled: 'Cancelado',
    waitingForParts: 'Esperando Peças',
    
    // Dashboard specific
    totalJobCards: 'cartões de trabalho totais',
    jobsInProgress: 'trabalhos em andamento',
    jobsCompleted: 'trabalhos concluídos',
    jobsWaitingParts: 'trabalhos esperando peças',
    recentJobCards: 'Cartões de Trabalho Recentes',
    viewAll: 'Ver Todos',
    recentJobsDescription: 'Seus cartões de trabalho mais recentes e seu status',
    customer: 'Cliente',
    
    // Actions
    print: 'Imprimir',
    share: 'Compartilhar',
    whatsapp: 'WhatsApp',
    sendEmail: 'Enviar por Email',
    download: 'Baixar',
    preview: 'Visualizar',

    // Additional job detail specific translations
    createdOn: 'Criado em',
    jobCardActions: 'Ações do Cartão',
    manageJobCard: 'Gerenciar este cartão de trabalho',
    selectStatus: 'Selecionar um status',
    jobCardNotFound: 'Cartão de trabalho não encontrado',
    failedToDeleteJobCard: 'Falha ao excluir cartão de trabalho',
    for: 'para',
    contact: 'Contato',
    savePlease: 'Por favor salve antes de imprimir',
    finished: 'Terminado',

    heroLongDescription: 'Gerencie trabalhos, clientes e faturas em um só lugar. FixFlow Connect ajuda você a administrar sua oficina de reparos de forma eficiente.',

    // ADDED:
    jobsRefreshed: "Trabalhos atualizados",
    jobNotFound: "Cartão de trabalho não encontrado",
    statusUpdatedSuccessfully: "Status atualizado com sucesso",
    statusUpdateFailed: "Falha ao atualizar status",
    refreshJobs: "Atualizar trabalhos",

    // NEW MISSING TRANSLATIONS FOR EDIT JOB CARD
    failedToLoad: "Falha ao carregar",
    fillAllFields: "Por favor preencha todos os campos obrigatórios",
    noJobId: "Nenhum ID de cartão encontrado",
    failedToUpdateJobCard: "Falha ao atualizar cartão de trabalho",
    errorUpdatingJobCard: "Ocorreu um erro ao atualizar o cartão",
    retry: "Tentar novamente",
    updateJobDetails: "Atualizar detalhes deste trabalho de reparo",
    information: "Informações",
    updateCustomerDetails: "Atualizar os detalhes de contato do cliente",
    optional: "opcional",
    updateDeviceDetails: "Atualizar detalhes sobre o dispositivo sendo reparado",
    details: "Detalhes",
    updateProblemDetails: "Atualizar o problema do dispositivo",
    of: "de",
    describeProblem: "Descreva o problema do dispositivo...",
    company: "Empresa",
    loadingCompanies: "Carregando empresas...",
    selectCompany: "Selecionar uma empresa",
    noCompany: "Nenhuma empresa",
    changes: "Alterações"
  },
  es: {
    // Navigation
    dashboard: 'Panel',
    jobCards: 'Tarjetas de Trabajo',
    invoices: 'Facturas',
    companyProfile: 'Perfil de Empresa',
    settings: 'Configuraciones',
    
    // Common
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    create: 'Crear',
    search: 'Buscar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    back: 'Atrás',
    next: 'Siguiente',
    previous: 'Anterior',
    close: 'Cerrar',
    confirm: 'Confirmar',
    
    // Authentication & Landing
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    logout: 'Cerrar Sesión',
    email: 'Email',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    forgotPassword: '¿Olvidaste la contraseña?',
    welcomeTitle: 'FixFlow Connect',
    welcomeSubtitle: 'Gestión de taller de reparaciones simplificada',
    appDescription: 'Optimiza las operaciones de tu taller de reparaciones',
    features: {
      jobManagement: 'Creación y gestión fácil de tarjetas de trabajo',
      customerTracking: 'Seguimiento de información del cliente',
      invoiceGeneration: 'Generación simple de facturas'
    },
    copyright: '© 2023 FixFlow Connect. Todos los derechos reservados.',
    
    // Job Cards
    createJobCard: 'Crear Tarjeta de Trabajo',
    jobCardNumber: 'Número de Tarjeta',
    customerName: 'Nombre del Cliente',
    customerPhone: 'Teléfono del Cliente',
    customerEmail: 'Email del Cliente',
    deviceName: 'Nombre del Dispositivo',
    deviceModel: 'Modelo del Dispositivo',
    deviceCondition: 'Condición del Dispositivo',
    problem: 'Problema',
    status: 'Estado',
    handlingFees: 'Gastos de Manejo',
    noJobCardsFound: 'No se encontraron tarjetas de trabajo',
    createFirstJobCard: 'Crear Primera Tarjeta',
    loadingJobCards: 'Cargando tarjetas...',
    errorLoadingJobCards: 'Error al Cargar Tarjetas',
    reloadPage: 'Recargar Página',
    jobCardCreated: 'Tarjeta de trabajo creada exitosamente',
    jobCardUpdated: 'Tarjeta de trabajo actualizada',
    jobCardDeleted: 'Tarjeta de trabajo eliminada',
    previewJob: 'Vista Previa',
    printJob: 'Imprimir',
    shareJob: 'Compartir',
    deleteJob: 'Eliminar',
    
    // Invoices
    invoice: 'FACTURA',
    issueDate: 'Fecha de emisión',
    dueDate: 'Fecha de vencimiento',
    from: 'De',
    billTo: 'Facturar a',
    invoiceDetails: 'Detalles de la factura',
    description: 'Descripción',
    device: 'Dispositivo',
    lineItems: 'Artículos',
    qty: 'Cant',
    unitPrice: 'Precio unitario',
    amount: 'Cantidad',
    subtotal: 'Subtotal',
    total: 'Total',
    notes: 'Notas',
    termsConditions: 'Términos y condiciones',
    thankYou: '¡Gracias por su negocio!',
    generatedOn: 'Generado el',
    companyInfoNotAvailable: 'Información de la empresa no disponible',
    createInvoice: 'Crear Factura',
    invoiceCreated: 'Factura creada exitosamente',
    invoiceUpdated: 'Factura actualizada',
    noInvoicesFound: 'No se encontraron facturas',
    createFirstInvoice: 'Crear Primera Factura',
    
    // Settings
    language: 'Idioma',
    selectLanguage: 'Seleccionar Idioma',
    english: 'English',
    french: 'Français',
    portuguese: 'Português',
    managePreferences: 'Gestiona las preferencias de tu aplicación',
    congoleseLanguages: 'Idiomas Congoleños',
    
    // Company Profile
    companyName: 'Nombre de la Empresa',
    companyAddress: 'Dirección de la Empresa',
    companyPhone: 'Teléfono de la Empresa',
    companyEmail: 'Email de la Empresa',
    updateProfile: 'Actualizar Perfil',
    profileUpdated: 'Perfil actualizado exitosamente',
    companyProfileDescription: 'Gestiona la información y configuraciones de tu empresa',
    contactInformation: 'Información de Contacto',
    editProfile: 'Editar Perfil',
    
    // Status options
    pending: 'Pendiente',
    inProgress: 'En Progreso',
    completed: 'Completado',
    cancelled: 'Cancelado',
    waitingForParts: 'Esperando Repuestos',
    
    // Dashboard specific
    totalJobCards: 'tarjetas de trabajo totales',
    jobsInProgress: 'trabajos en progreso',
    jobsCompleted: 'trabajos completados',
    jobsWaitingParts: 'trabajos esperando repuestos',
    recentJobCards: 'Tarjetas de Trabajo Recientes',
    viewAll: 'Ver Todas',
    recentJobsDescription: 'Tus tarjetas de trabajo más recientes y su estado',
    customer: 'Cliente',
    
    // Actions
    print: 'Imprimir',
    share: 'Compartir',
    whatsapp: 'WhatsApp',
    sendEmail: 'Enviar por Email',
    download: 'Descargar',
    preview: 'Vista Previa',

    // Additional job detail specific translations
    createdOn: 'Creado el',
    jobCardActions: 'Acciones de Tarjeta',
    manageJobCard: 'Gestionar esta tarjeta de trabajo',
    selectStatus: 'Seleccionar un estado',
    jobCardNotFound: 'Tarjeta de trabajo no encontrada',
    failedToDeleteJobCard: 'Error al eliminar tarjeta de trabajo',
    for: 'para',
    contact: 'Contacto',
    savePlease: 'Por favor guarde antes de imprimir',
    finished: 'Terminado',

    heroLongDescription: 'Supervisa trabajos, gestiona clientes y maneja facturas todo en un solo lugar. FixFlow Connect te ayuda a administrar eficientemente tu taller de reparaciones.',

    // ADDED:
    jobsRefreshed: "Trabajos actualizados",
    jobNotFound: "Tarjeta de trabajo no encontrada",
    statusUpdatedSuccessfully: "Estado actualizado correctamente",
    statusUpdateFailed: "Fallo al actualizar el estado",
    refreshJobs: "Actualizar trabajos",

    // NEW MISSING TRANSLATIONS FOR EDIT JOB CARD
    failedToLoad: "Error al cargar",
    fillAllFields: "Por favor complete todos los campos requeridos",
    noJobId: "No se encontró ID de tarjeta",
    failedToUpdateJobCard: "Error al actualizar tarjeta de trabajo",
    errorUpdatingJobCard: "Ocurrió un error al actualizar la tarjeta",
    retry: "Reintentar",
    updateJobDetails: "Actualizar detalles de este trabajo de reparación",
    information: "Información",
    updateCustomerDetails: "Actualizar los detalles de contacto del cliente",
    optional: "opcional",
    updateDeviceDetails: "Actualizar detalles sobre el dispositivo que se repara",
    details: "Detalles",
    updateProblemDetails: "Actualizar el problema del dispositivo",
    of: "de",
    describeProblem: "Describe el problema del dispositivo...",
    company: "Empresa",
    loadingCompanies: "Cargando empresas...",
    selectCompany: "Seleccionar una empresa",
    noCompany: "Ninguna empresa",
    changes: "Cambios"
  },
  ln: {
    // Navigation
    dashboard: 'Likoló',
    jobCards: 'Mikanda ya Mosála',
    invoices: 'Bakwákísi',
    companyProfile: 'Moposo ya Kompanyi',
    settings: 'Makambo ya Bobongwani',
    
    // Common
    save: 'Bobatela',
    cancel: 'Kotika',
    delete: 'Kolongola',
    edit: 'Kobongisa',
    create: 'Kosála',
    search: 'Koluka',
    loading: 'Kozala na boyei...',
    error: 'Libunga',
    success: 'Elongi',
    back: 'Kozonga',
    next: 'Oyo akoya',
    previous: 'Oyo aleka',
    close: 'Kokanga',
    confirm: 'Kondima',
    
    // Authentication & Landing
    login: 'Kokóta',
    register: 'Komikoma',
    logout: 'Kobima',
    email: 'Email',
    password: 'Mokanda ya kobombama',
    confirmPassword: 'Kondima Mokanda ya Kobombama',
    forgotPassword: 'Obosani mokanda ya kobombama?',
    welcomeTitle: 'FixFlow Connect',
    welcomeSubtitle: 'Boyangeli ya ndako ya kobongisa biloko epusáni',
    appDescription: 'Salá misála ya ndako na yo ya kobongisa biloko malamu',
    features: {
      jobManagement: 'Kosála pe kobatela mikanda ya misála malamu',
      customerTracking: 'Kolanda makambo ya bakiliya',
      invoiceGeneration: 'Kosála bakwákísi na pete'
    },
    copyright: '© 2023 FixFlow Connect. Makoki nyonso ebatelami.',
    
    // Job Cards
    createJobCard: 'Kosála Mokanda ya Mosála',
    jobCardNumber: 'Motango ya Mokanda',
    customerName: 'Nkómbó ya Mokiliya',
    customerPhone: 'Telefoni ya Mokiliya',
    customerEmail: 'Email ya Mokiliya',
    deviceName: 'Nkómbó ya Eloko',
    deviceModel: 'Lolenge ya Eloko',
    deviceCondition: 'Lolenge ya Eloko',
    problem: 'Mikakatano',
    status: 'Lolenge',
    handlingFees: 'Mbongo ya Bosimbi',
    noJobCardsFound: 'Mikanda ya misála ezwami te',
    createFirstJobCard: 'Kosála Mokanda ya Liboso',
    loadingJobCards: 'Kozala kozwá mikanda...',
    errorLoadingJobCards: 'Libunga na Kozwá Mikanda',
    reloadPage: 'Kozongisa Nkásá',
    jobCardCreated: 'Mokanda ya mosála esálemi malamu',
    jobCardUpdated: 'Mokanda ya mosála ebongwani',
    jobCardDeleted: 'Mokanda ya mosála elongolami',
    previewJob: 'Botálá Liboso',
    printJob: 'Kobimisa',
    shareJob: 'Kokabola',
    deleteJob: 'Kolongola',
    
    // Invoices
    invoice: 'KWÁKÍSI',
    issueDate: 'Mokolo ya Kobimisa',
    dueDate: 'Mokolo ya Kofuta',
    from: 'Uta',
    billTo: 'Kwákísi epai ya',
    invoiceDetails: 'Makambo ya Kwákísi',
    description: 'Ndimbola',
    device: 'Eloko',
    lineItems: 'Biloko',
    qty: 'Motango',
    unitPrice: 'Ntalo ya Moko',
    amount: 'Mbongo',
    subtotal: 'Subtotal',
    total: 'Nyonso',
    notes: 'Bilembo',
    termsConditions: 'Mibeko pe Malako',
    thankYou: 'Tosépéli yo mpo na mombongo na yo!',
    generatedOn: 'Esálemi na',
    companyInfoNotAvailable: 'Makambo ya kompanyi ezali te',
    createInvoice: 'Kosála Kwákísi',
    invoiceCreated: 'Kwákísi esálemi malamu',
    invoiceUpdated: 'Kwákísi ebongwani',
    noInvoicesFound: 'Bakwákísi ezwami te',
    createFirstInvoice: 'Kosála Kwákísi ya Liboso',
    
    // Settings
    language: 'Lokóta',
    selectLanguage: 'Kopóna Lokóta',
    english: 'Lingɛlɛ́sa',
    french: 'Lifalansé',
    portuguese: 'Lipulutugalɛ́si',
    managePreferences: 'Boyangeli makambo oyo olíngí',
    congoleseLanguages: 'Mikóta ya Kongó',
    
    // Company Profile
    companyName: 'Nkómbó ya Kompanyi',
    companyAddress: 'Esika ya Kompanyi',
    companyPhone: 'Telefoni ya Kompanyi',
    companyEmail: 'Email ya Kompanyi',
    updateProfile: 'Kobongisa Moposo',
    profileUpdated: 'Moposo ebongwani malamu',
    companyProfileDescription: 'Boyangeli makambo pe malako ya kompanyi na yo',
    contactInformation: 'Makambo ya Komunikasyon',
    editProfile: 'Kobongisa Moposo',
    
    // Status options
    pending: 'Ezali kozela',
    inProgress: 'Ezali kosálema',
    completed: 'Esilisi',
    cancelled: 'Ekatami',
    waitingForParts: 'Ezali kozela biloko',
    
    // Dashboard specific
    totalJobCards: 'mikanda ya misála nyonso',
    jobsInProgress: 'misála ezali kosálema',
    jobsCompleted: 'misála esilisi',
    jobsWaitingParts: 'misála ezali kozela biloko',
    recentJobCards: 'Mikanda ya Misála ya Sika',
    viewAll: 'Botála Nyonso',
    recentJobsDescription: 'Mikanda na yo ya misála ya sika pe lolenge na yango',
    customer: 'Mokiliya',
    
    // Actions
    print: 'Kobimisa',
    share: 'Kokabola',
    whatsapp: 'WhatsApp',
    sendEmail: 'Kotinda na Email',
    download: 'Kokita',
    preview: 'Botála Liboso',

    // Additional job detail specific translations
    createdOn: 'Esálemi na',
    jobCardActions: 'Misála ya Mokanda',
    manageJobCard: 'Boyangeli mokanda oyo ya mosála',
    selectStatus: 'Kopóna lolenge',
    jobCardNotFound: 'Mokanda ya mosála ezwami te',
    failedToDeleteJobCard: 'Kolongola mokanda ekweyi',
    for: 'mpo na',
    contact: 'Komunikasyon',
    savePlease: 'Bobatela liboso ya kobimisa',
    finished: 'Esilisi',

    heroLongDescription: "Landa misalu, bongisa bakiliya, pe salá bakwákísi nyonso esika moko. FixFlow Connect esalelaka yo na boyangeli ya ndako ya kobongisa biloko malamu.",

    // ADDED:
    jobsRefreshed: "Misala mibongwani",
    jobNotFound: "Mokanda ya mosála ezwami te",
    statusUpdatedSuccessfully: "Lolenge ebongwani malamu",
    statusUpdateFailed: "Kobongisa lolenge ekweyi",
    refreshJobs: "Bongisa misala",

    // NEW MISSING TRANSLATIONS FOR EDIT JOB CARD
    failedToLoad: "Kozwa ekweyi",
    fillAllFields: "Tondisa makambo nyonso oyo esengeli",
    noJobId: "ID ya mokanda ezwami te",
    failedToUpdateJobCard: "Kobongisa mokanda ekweyi",
    errorUpdatingJobCard: "Libunga na kobongisa mokanda",
    retry: "Meka lisusu",
    updateJobDetails: "Kobongisa makambo ya mosála oyo",
    information: "Makambo",
    updateCustomerDetails: "Kobongisa makambo ya mokiliya",
    optional: "te na makasi",
    updateDeviceDetails: "Kobongisa makambo ya eloko",
    details: "Makambo",
    updateProblemDetails: "Kobongisa mikakatano ya eloko",
    of: "ya",
    describeProblem: "Limbola mikakatano ya eloko...",
    company: "Kompanyi",
    loadingCompanies: "Kozwa bakompanyi...",
    selectCompany: "Pona kompanyi",
    noCompany: "Kompanyi te",
    changes: "Bobongisi"
  },
  kg: {
    // Navigation
    dashboard: 'Mesa ya Kuvuanda',
    jobCards: 'Makarta ya Kisalu',
    invoices: 'Mafakture',
    companyProfile: 'Ntangu ya Kompania',
    settings: 'Mambu ma Kubongisa',
    
    // Common
    save: 'Sunga',
    cancel: 'Tula',
    delete: 'Banzula',
    edit: 'Bongisa',
    create: 'Vanga',
    search: 'Sosa',
    loading: 'Ku yiza...',
    error: 'Dizolo',
    success: 'Mafumu',
    back: 'Vutuka',
    next: 'Wonso ukuiza',
    previous: 'Wonso utedila',
    close: 'Kangila',
    confirm: 'Lundakana',
    
    // Authentication & Landing
    login: 'Kota',
    register: 'Songila',
    logout: 'Fuma',
    email: 'Email',
    password: 'Nkutu wa sueka',
    confirmPassword: 'Lundakana Nkutu wa Sueka',
    forgotPassword: 'Uzebukidi nkutu wa sueka?',
    welcomeTitle: 'FixFlow Connect',
    welcomeSubtitle: 'Kuvuanda nzo ya kubongisa bima kisonga',
    appDescription: 'Sala kisalu kia nzo ya yo ya kubongisa bima kimbote',
    features: {
      jobManagement: 'Kuvanga ye kusunga makarta ya bisalu kimbote',
      customerTracking: 'Kulandila mambu ma banteki',
      invoiceGeneration: 'Kuvanga mafakture kimbote'
    },
    copyright: '© 2023 FixFlow Connect. Mambu moso masungulu.',
    
    // Job Cards
    createJobCard: 'Vanga Nkarta ya Kisalu',
    jobCardNumber: 'Numeru ya Nkarta',
    customerName: 'Dizina dya Nteki',
    customerPhone: 'Telefoni ya Nteki',
    customerEmail: 'Email ya Nteki',
    deviceName: 'Dizina dya Kima',
    deviceModel: 'Ndenge ya Kima',
    deviceCondition: 'Mfumu ya Kima',
    problem: 'Mambu ma nganga',
    status: 'Mfumu',
    handlingFees: 'Mbongo ya kuzikisa',
    noJobCardsFound: 'Makarta ya bisalu mamonanu ko',
    createFirstJobCard: 'Vanga Nkarta ya Thete',
    loadingJobCards: 'Ku tambula makarta...',
    errorLoadingJobCards: 'Dizolo mu Kutambula Makarta',
    reloadPage: 'Vutisa Lukaya',
    jobCardCreated: 'Nkarta ya kisalu ivangulu kimbote',
    jobCardUpdated: 'Nkarta ya kisalu ibongisulu',
    jobCardDeleted: 'Nkarta ya kisalu ibanzululu',
    previewJob: 'Mona Thete',
    printJob: 'Soba',
    shareJob: 'Kabana',
    deleteJob: 'Banzula',
    
    // Invoices
    invoice: 'FAKTURE',
    issueDate: 'Lumingu lua Kutotuka',
    dueDate: 'Lumingu lua Kufuta',
    from: 'Kuma kwa',
    billTo: 'Fakture kwa',
    invoiceDetails: 'Mambu ma Fakture',
    description: 'Masonga',
    device: 'Kima',
    lineItems: 'Bima',
    qty: 'Numeru',
    unitPrice: 'Ntalu wa mosi',
    amount: 'Mbongo',
    subtotal: 'Subtotal',
    total: 'Moso',
    notes: 'Malembo',
    termsConditions: 'Malaku ye Minsiku',
    thankYou: 'Twasantuka mpo ya kisalu kiaku!',
    generatedOn: 'Kivangulu mu',
    companyInfoNotAvailable: 'Mambu ma kompania makadi ko',
    createInvoice: 'Vanga Fakture',
    invoiceCreated: 'Fakture ivangulu kimbote',
    invoiceUpdated: 'Fakture ibongisulu',
    noInvoicesFound: 'Mafakture mamonanu ko',
    createFirstInvoice: 'Vanga Fakture ya Thete',
    
    // Settings
    language: 'Ndinga',
    selectLanguage: 'Sola Ndinga',
    english: 'Kingereza',
    french: 'Kifalansa',
    portuguese: 'Kiputulugeza',
    managePreferences: 'Vuanda mambu watondele',
    congoleseLanguages: 'Mindinga ya Kongo',
    
    // Company Profile
    companyName: 'Dizina dya Kompania',
    companyAddress: 'Fulu ya Kompania',
    companyPhone: 'Telefoni ya Kompania',
    companyEmail: 'Email ya Kompania',
    updateProfile: 'Bongisa Ntangu',
    profileUpdated: 'Ntangu ibongisulu kimbote',
    companyProfileDescription: 'Vuanda mambu ye malaku ma kompanyi yaku',
    contactInformation: 'Mambu ma Komunikasaun',
    editProfile: 'Bongisa Ntangu',
    
    // Status options
    pending: 'Ikalanga',
    inProgress: 'Isalanga',
    completed: 'Imana',
    cancelled: 'Itululu',
    waitingForParts: 'Ikalanga bima',
    
    // Dashboard specific
    totalJobCards: 'makarta ya bisalu moso',
    jobsInProgress: 'bisalu bisalanga',
    jobsCompleted: 'bisalu bimana',
    jobsWaitingParts: 'bisalu bikalanga bima',
    recentJobCards: 'Makarta ya Bisalu ya Kyese',
    viewAll: 'Mona Moso',
    recentJobsDescription: 'Makarta yaku ya bisalu ya kyese pe mfumu yawo',
    customer: 'Nteki',
    
    // Actions
    print: 'Soba',
    share: 'Kabana',
    whatsapp: 'WhatsApp',
    sendEmail: 'Tuma na Email',
    download: 'Kita',
    preview: 'Mona Thete',

    // Additional job detail specific translations
    createdOn: 'Kivangulu mu',
    jobCardActions: 'Bisalu bya Nkarta',
    manageJobCard: 'Vuanda nkarta yayi ya kisalu',
    selectStatus: 'Kopóna lolenge',
    jobCardNotFound: 'Nkarta ya kisalu ezwami te',
    failedToDeleteJobCard: 'Kubanzula nkarta ekweyi',
    for: 'mpo na',
    contact: 'Komunikasaun',
    savePlease: 'Bobatela liboso ya kobimisa',
    finished: 'Esilisi',

    heroLongDescription: "Landa bisalu, bongisa banseke, ye kuvanga mafakture na esika mosi. FixFlow Connect kusadisa nge kuvandila kisalu kia kubongisa bima kimbote.",

    // ADDED:
    jobsRefreshed: "Bisalu bibongwani",
    jobNotFound: "Nkarta ya kisalu imonekanga ko",
    statusUpdatedSuccessfully: "Mfumu ibongwani kimbote",
    statusUpdateFailed: "Kubongisa mfumu kunangani",
    refreshJobs: "Bongisa bisalu",

    // NEW MISSING TRANSLATIONS FOR EDIT JOB CARD
    failedToLoad: "Kutambula kunangani",
    fillAllFields: "Tula mambu moso ma nzitukulu",
    noJobId: "ID ya nkarta imonekanga ko",
    failedToUpdateJobCard: "Kubongisa nkarta kunangani",
    errorUpdatingJobCard: "Dizolo mu kubongisa nkarta",
    retry: "Meka diaka",
    updateJobDetails: "Bongisa mambu ma kisalu kiayi",
    information: "Mambu",
    updateCustomerDetails: "Bongisa mambu ma nteki",
    optional: "kadi nzitukulu ko",
    updateDeviceDetails: "Bongisa mambu ma kima",
    details: "Mambu",
    updateProblemDetails: "Bongisa mambu ma nganga ya kima",
    of: "ya",
    describeProblem: "Songa mambu ma nganga ya kima...",
    company: "Kompania",
    loadingCompanies: "Kutambula bankompania...",
    selectCompany: "Sola kompania",
    noCompany: "Kompania ko",
    changes: "Babongisu"
  },
  sw: {
    // Navigation
    dashboard: 'Dashbodi',
    jobCards: 'Kadi za Kazi',
    invoices: 'Ankara',
    companyProfile: 'Wasifu wa Kampuni',
    settings: 'Mipangilio',
    
    // Common
    save: 'Hifadhi',
    cancel: 'Ghairi',
    delete: 'Futa',
    edit: 'Hariri',
    create: 'Unda',
    search: 'Tafuta',
    loading: 'Inapakia...',
    error: 'Kosa',
    success: 'Mafanikio',
    back: 'Rudi',
    next: 'Ifuatayo',
    previous: 'Iliyotangulia',
    close: 'Funga',
    confirm: 'Thibitisha',
    
    // Authentication & Landing
    login: 'Ingia',
    register: 'Jisajili',
    logout: 'Toka',
    email: 'Barua Pepe',
    password: 'Nenosiri',
    confirmPassword: 'Thibitisha Nenosiri',
    forgotPassword: 'Umesahau nenosiri?',
    welcomeTitle: 'FixFlow Connect',
    welcomeSubtitle: 'Usimamizi wa duka la ukarabati umerahisishwa',
    appDescription: 'Boresha utendaji wa duka lako la ukarabati',
    features: {
      jobManagement: 'Uundaji na usimamizi rahisi wa kadi za kazi',
      customerTracking: 'Ufuatiliaji wa taarifa za wateja',
      invoiceGeneration: 'Uundaji rahisi wa ankara'
    },
    copyright: '© 2023 FixFlow Connect. Haki zote zimehifadhiwa.',
    
    // Job Cards
    createJobCard: 'Unda Kadi ya Kazi',
    jobCardNumber: 'Nambari ya Kadi',
    customerName: 'Jina la Mteja',
    customerPhone: 'Simu ya Mteja',
    customerEmail: 'Barua Pepe ya Mteja',
    deviceName: 'Jina la Kifaa',
    deviceModel: 'Mfano wa Kifaa',
    deviceCondition: 'Hali ya Kifaa',
    problem: 'Tatizo',
    status: 'Hali',
    handlingFees: 'Ada za Ushughulikaji',
    noJobCardsFound: 'Hakuna kadi za kazi zilizopatikana',
    createFirstJobCard: 'Unda Kadi ya Kwanza',
    loadingJobCards: 'Inapakia kadi...',
    errorLoadingJobCards: 'Kosa la Kupakia Kadi',
    reloadPage: 'Pakia Upya Ukurasa',
    jobCardCreated: 'Kadi ya kazi imeundwa kwa mafanikio',
    jobCardUpdated: 'Kadi ya kazi imesasishwa',
    jobCardDeleted: 'Kadi ya kazi imefutwa',
    previewJob: 'Hakikisha',
    printJob: 'Chapisha',
    shareJob: 'Shiriki',
    deleteJob: 'Futa',
    
    // Invoices
    invoice: 'ANKARA',
    issueDate: 'Tarehe ya Kutoa',
    dueDate: 'Tarehe ya Kulipa',
    from: 'Kutoka',
    billTo: 'Bili kwa',
    invoiceDetails: 'Maelezo ya Ankara',
    description: 'Maelezo',
    device: 'Kifaa',
    lineItems: 'Vitu',
    qty: 'Kiwango',
    unitPrice: 'Bei ya Kipande',
    amount: 'Kiasi',
    subtotal: 'Jumla ndogo',
    total: 'Jumla',
    notes: 'Maelezo',
    termsConditions: 'Masharti na Hali',
    thankYou: 'Asante kwa biashara yako!',
    generatedOn: 'Imeundwa tarehe',
    companyInfoNotAvailable: 'Taarifa za kampuni hazipatikani',
    createInvoice: 'Unda Ankara',
    invoiceCreated: 'Ankara imeundwa kwa mafanikio',
    invoiceUpdated: 'Ankara imesasishwa',
    noInvoicesFound: 'Hakuna ankara zilizopatikana',
    createFirstInvoice: 'Unda Ankara ya Kwanza',
    
    // Settings
    language: 'Lugha',
    selectLanguage: 'Chagua Lugha',
    english: 'Kiingereza',
    french: 'Kifaransa',
    portuguese: 'Kireno',
    managePreferences: 'Simamia mapendeleo yako ya programu',
    congoleseLanguages: 'Lugha za Kikongo',
    
    // Company Profile
    companyName: 'Jina la Kampuni',
    companyAddress: 'Anwani ya Kampuni',
    companyPhone: 'Simu ya Kampuni',
    companyEmail: 'Barua Pepe ya Kampuni',
    updateProfile: 'Sasisha Wasifu',
    profileUpdated: 'Wasifu umesasishwa kwa mafanikio',
    companyProfileDescription: 'Simamia taarifa na mipangilio ya kampuni yako',
    contactInformation: 'Taarifa za Mawasiliano',
    editProfile: 'Hariri Wasifu',
    
    // Status options
    pending: 'Inasubiri',
    inProgress: 'Inaendelea',
    completed: 'Imekamilika',
    cancelled: 'Imeghairiwa',
    waitingForParts: 'Inasubiri Vipande',
    
    // Dashboard specific
    totalJobCards: 'kadi za kazi jumla',
    jobsInProgress: 'kazi zinaendelea',
    jobsCompleted: 'kazi zimekamilika',
    jobsWaitingParts: 'kazi zinasubiri vipande',
    recentJobCards: 'Kadi za Kazi za Hivi Karibuni',
    viewAll: 'Ona Zote',
    recentJobsDescription: 'Kadi zako za kazi za hivi karibuni na hali zao',
    customer: 'Mteja',
    
    // Actions
    print: 'Chapisha',
    share: 'Shiriki',
    whatsapp: 'WhatsApp',
    sendEmail: 'Tuma kwa Barua Pepe',
    download: 'Pakua',
    preview: 'Hakikisha',

    // Additional job detail specific translations
    createdOn: 'Imeundwa tarehe',
    jobCardActions: 'Vitendo vya Kadi',
    manageJobCard: 'Simamia kadi hii ya kazi',
    selectStatus: 'Chagua hali',
    jobCardNotFound: 'Kadi ya kazi haijapatikana',
    failedToDeleteJobCard: 'Imeshindwa kufuta kadi ya kazi',
    for: 'kwa',
    contact: 'Mawasiliano',
    savePlease: 'Tafadhali hifadhi kabla ya kuchapisha',
    finished: 'Imekamilika',

    heroLongDescription: "Fuatilia kazi, simamia wateja na dhibiti ankara zote mahali pamoja. FixFlow Connect inakusaidia kuendesha duka lako la ukarabati kwa ufanisi.",

    // ADDED:
    jobsRefreshed: "Kazi zimesasishwa",
    jobNotFound: "Kadi ya kazi haijapatikana",
    statusUpdatedSuccessfully: "Hali imesasishwa",
    statusUpdateFailed: "Imeshindwa kusasisha hali",
    refreshJobs: "Sasisha kazi",

    // NEW MISSING TRANSLATIONS FOR EDIT JOB CARD
    failedToLoad: "Imeshindwa kupakia",
    fillAllFields: "Tafadhali jaza vuga vyote vinavyohitajika",
    noJobId: "Hakuna kitambulisho cha kadi",
    failedToUpdateJobCard: "Imeshindwa kusasisha kadi ya kazi",
    errorUpdatingJobCard: "Kosa limejitokeza wakati wa kusasisha kadi",
    retry: "Jaribu tena",
    updateJobDetails: "Sasisha maelezo ya kazi hii ya ukarabati",
    information: "Taarifa",
    updateCustomerDetails: "Sasisha taarifa za mawasiliano za mteja",
    optional: "si lazima",
    updateDeviceDetails: "Sasisha maelezo kuhusu kifaa kinachokarabatiwa",
    details: "Maelezo",
    updateProblemDetails: "Sasisha tatizo la kifaa",
    of: "ya",
    describeProblem: "Eleza tatizo la kifaa...",
    company: "Kampuni",
    loadingCompanies: "Inapakia makampuni...",
    selectCompany: "Chagua kampuni",
    noCompany: "Hakuna kampuni",
    changes: "Mabadiliko"
  },
  ts: {
    // Navigation
    dashboard: 'Mesa ya kulandila',
    jobCards: 'Mikanda ya kisalu',
    invoices: 'Mafakture',
    companyProfile: 'Bilumbu bya kompanyi',
    settings: 'Mambu ma kubongisa',
    
    // Common
    save: 'Taya',
    cancel: 'Kana',
    delete: 'Bana',
    edit: 'Bongisa',
    create: 'Panga',
    search: 'Saka',
    loading: 'Ku yiza...',
    error: 'Chibana',
    success: 'Cibotu',
    back: 'Buyela munyima',
    next: 'Ditunga',
    previous: 'Dituku',
    close: 'Kangila',
    confirm: 'Denga',
    
    // Authentication & Landing
    login: 'Kena',
    register: 'Koma',
    logout: 'Toma',
    email: 'Email',
    password: 'Malemba ma kusisila',
    confirmPassword: 'Denga Malemba ma Kusisila',
    forgotPassword: 'Walebuka malemba ma kusisila?',
    welcomeTitle: 'FixFlow Connect',
    welcomeSubtitle: 'Kukabidila caha ca kubongisa bintu capambana',
    appDescription: 'Salela kisalu kya caha ca yo ca kubongisa bintu cibotu',
    features: {
      jobManagement: 'Kupanga ne kutaya mikanda ya bisalu cibotu',
      customerTracking: 'Kulandila mambu ma betu betu',
      invoiceGeneration: 'Kupanga mafakture capambana'
    },
    copyright: '© 2023 FixFlow Connect. Mambu onso matayidi.',
    
    // Job Cards
    createJobCard: 'Panga Mukanda wa Kisalu',
    jobCardNumber: 'Nombolo ya Mukanda',
    customerName: 'Dina dya Muetu',
    customerPhone: 'Telefoni ya Muetu',
    customerEmail: 'Email ya Muetu',
    deviceName: 'Dina dya Cintu',
    deviceModel: 'Ndenge ya Cintu',
    deviceCondition: 'Mfumu ya Cintu',
    problem: 'Mambu ma kufana',
    status: 'Mfumu',
    handlingFees: 'Mbongo ya kusimba',
    noJobCardsFound: 'Mikanda ya bisalu imonekanga bu',
    createFirstJobCard: 'Panga Mukanda wa Kwanza',
    loadingJobCards: 'Ku tambula mikanda...',
    errorLoadingJobCards: 'Chibana mu Kutambula Mikanda',
    reloadPage: 'Vutukisa Lukasa',
    jobCardCreated: 'Mukanda wa kisalu upangidi cibotu',
    jobCardUpdated: 'Mukanda wa kisalu ubongisidi',
    jobCardDeleted: 'Mukanda wa kisalu ubanidi',
    previewJob: 'Mona kwanza',
    printJob: 'Kandika',
    shareJob: 'Kabana',
    deleteJob: 'Bana',
    
    // Invoices
    invoice: 'FAKTURE',
    issueDate: 'Dina dya kutotola',
    dueDate: 'Dina dya kufutila',
    from: 'Kuma kwa',
    billTo: 'Fakture kwa',
    invoiceDetails: 'Mambu ma Fakture',
    description: 'Ngonga',
    device: 'Cintu',
    lineItems: 'Bintu',
    qty: 'Mutelu',
    unitPrice: 'Ntalu wa umue',
    amount: 'Mbongo',
    subtotal: 'Subtotal',
    total: 'Onso',
    notes: 'Malemba',
    termsConditions: 'Malaku ne Mateko',
    thankYou: 'Twasanta mpo ya kisalu kyaku!',
    generatedOn: 'Kupangidi mua',
    companyInfoNotAvailable: 'Mambu ma kompanyi madi bu',
    createInvoice: 'Panga Fakture',
    invoiceCreated: 'Fakture ipangidi cibotu',
    invoiceUpdated: 'Fakture ibongisidi',
    noInvoicesFound: 'Mafakture amonekanga bu',
    createFirstInvoice: 'Panga Fakture ya Kwanza',
    
    // Settings
    language: 'Ndinga',
    selectLanguage: 'Sola Ndinga',
    english: 'Cilungu',
    french: 'Cifalansa',
    portuguese: 'Ciputulugezi',
    managePreferences: 'Kabidila mambu wasakila',
    congoleseLanguages: 'Mindinga ya Kongo',
    
    // Company Profile
    companyName: 'Dina dya Kompanyi',
    companyAddress: 'Fulu ya Kompanyi',
    companyPhone: 'Telefoni ya Kompanyi',
    companyEmail: 'Email ya Kompanyi',
    updateProfile: 'Bongisa Bilumbu',
    profileUpdated: 'Bilumbu bibongisidi cibotu',
    companyProfileDescription: 'Kabidila mambu ne mateko ma kompanyi yaku',
    contactInformation: 'Mambu ma Kutumila',
    editProfile: 'Bongisa Bilumbu',
    
    // Status options
    pending: 'Cilindile',
    inProgress: 'Cisalela',
    completed: 'Cimana',
    cancelled: 'Cikanidi',
    waitingForParts: 'Cilindile bintu',
    
    // Dashboard specific
    totalJobCards: 'mikanda ya bisalu yonso',
    jobsInProgress: 'bisalu bilasalela',
    jobsCompleted: 'bisalu bimana',
    jobsWaitingParts: 'bisalu bilindile bintu',
    recentJobCards: 'Mikanda ya Bisalu ya Cisesele',
    viewAll: 'Mona Yonso',
    recentJobsDescription: 'Mikanda yaku ya bisalu ya cisesele ne mfumu yayi',
    customer: 'Muetu',
    
    // Actions
    print: 'Kandika',
    share: 'Kabana',
    whatsapp: 'WhatsApp',
    sendEmail: 'Tuma ne Email',
    download: 'Kata',
    preview: 'Mona kwanza',

    // Additional job detail specific translations
    createdOn: 'Kupangidi mua',
    jobCardActions: 'Bisalu bya Mukanda',
    manageJobCard: 'Kabidila mukanda lowu wa kisalu',
    selectStatus: 'Sola mfumu',
    jobCardNotFound: 'Mukanda wa kisalu wumonekanga bu',
    failedToDeleteJobCard: 'Kubana mukanda kugunile',
    for: 'mpo ya',
    contact: 'Kutumila',
    savePlease: 'Taya kwanza wa kukandika',
    finished: 'Cimana',

    heroLongDescription: "Landila misalu, bongisa babetu ne mafakture yonso na esika ko. FixFlow Connect isiza wena kusalela caha ca kubongisa bintu cibotu.",

    // ADDED:
    jobsRefreshed: "Misalu yatuswa",
    jobNotFound: "Mukanda wa kisalu wumonekanga bu",
    statusUpdatedSuccessfully: "Mfumu yatuswa cibotu",
    statusUpdateFailed: "Kutuswa mfumu kunangani",
    refreshJobs: "Tusa misalu",

    // NEW MISSING TRANSLATIONS FOR EDIT JOB CARD
    failedToLoad: "Kutambula kugunile",
    fillAllFields: "Tula mambu moso malavekiwaka",
    noJobId: "ID ya mukanda yimonekanga bu",
    failedToUpdateJobCard: "Kubongisa mukanda kugunile",
    errorUpdatingJobCard: "Chibana cimbanuke wakati wa kubongisa mukanda",
    retry: "Ringeta nakambe",
    updateJobDetails: "Bongisa mambu ma kisalu caki",
    information: "Mambu",
    updateCustomerDetails: "Bongisa mambu ma kutumila ma muetu",
    optional: "yakadi nzitukulu",
    updateDeviceDetails: "Bongisa mambu ma cintu cilabongisiwaka",
    details: "Mambu",
    updateProblemDetails: "Bongisa mambu ma kufana ya cintu",
    of: "ya",
    describeProblem: "Hlamusela mambu ma kufana ya cintu...",
    company: "Kompanyi",
    loadingCompanies: "Ku tambula mankompanyi...",
    selectCompany: "Sola kompanyi",
    noCompany: "Kompanyi leyi nga riki",
    changes: "Mabongiso"
  }
};
