export type Language = 'en' | 'fr' | 'pt' | 'es' | 'ln' | 'kg' | 'sw' | 'ts' | 'de' | 'it' | 'ar';

export interface InvoiceTranslations {
  invoice: string;
  issueDate: string;
  dueDate: string;
  status: string;
  from: string;
  billTo: string;
  invoiceDetails: string;
  description: string;
  device: string;
  problem: string;
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
}

export const translations: Record<Language, InvoiceTranslations> = {
  en: {
    invoice: 'INVOICE',
    issueDate: 'Issue Date',
    dueDate: 'Due Date',
    status: 'Status',
    from: 'From',
    billTo: 'Bill To',
    invoiceDetails: 'Invoice Details',
    description: 'Description',
    device: 'Device',
    problem: 'Problem',
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
    companyInfoNotAvailable: 'Company information not available'
  },
  fr: {
    invoice: 'FACTURE',
    issueDate: 'Date d\'émission',
    dueDate: 'Date d\'échéance',
    status: 'Statut',
    from: 'De',
    billTo: 'Facturer à',
    invoiceDetails: 'Détails de la facture',
    description: 'Description',
    device: 'Appareil',
    problem: 'Problème',
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
    companyInfoNotAvailable: 'Informations de l\'entreprise non disponibles'
  },
  pt: {
    invoice: 'FATURA',
    issueDate: 'Data de emissão',
    dueDate: 'Data de vencimento',
    status: 'Estado',
    from: 'De',
    billTo: 'Faturar para',
    invoiceDetails: 'Detalhes da fatura',
    description: 'Descrição',
    device: 'Dispositivo',
    problem: 'Problema',
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
    companyInfoNotAvailable: 'Informações da empresa não disponíveis'
  },
  es: {
    invoice: 'FACTURA',
    issueDate: 'Fecha de emisión',
    dueDate: 'Fecha de vencimiento',
    status: 'Estado',
    from: 'De',
    billTo: 'Facturar a',
    invoiceDetails: 'Detalles de la factura',
    description: 'Descripción',
    device: 'Dispositivo',
    problem: 'Problema',
    lineItems: 'Artículos',
    qty: 'Cant',
    unitPrice: 'Precio unitario',
    amount: 'Importe',
    subtotal: 'Subtotal',
    total: 'Total',
    notes: 'Notas',
    termsConditions: 'Términos y condiciones',
    thankYou: '¡Gracias por su negocio!',
    generatedOn: 'Generado el',
    companyInfoNotAvailable: 'Información de la empresa no disponible'
  },
  // Congolese languages
  ln: { // Lingala
    invoice: 'FACTURE',
    issueDate: 'Mokolo ya kobimisa',
    dueDate: 'Mokolo ya kofuta',
    status: 'Emekisi',
    from: 'Utá',
    billTo: 'Kofuta epái',
    invoiceDetails: 'Detai ya facture',
    description: 'Ndeso',
    device: 'Esaleli',
    problem: 'Problème',
    lineItems: 'Biloko',
    qty: 'Moto',
    unitPrice: 'Ntalo ya unité',
    amount: 'Mokolo',
    subtotal: 'Total partiel',
    total: 'Total',
    notes: 'Batemeli',
    termsConditions: 'Mikano na kondisi',
    thankYou: 'Matondi na business na yo!',
    generatedOn: 'Esalemi na',
    companyInfoNotAvailable: 'Informations ya société ezali te'
  },
  kg: { // Kikongo
    invoice: 'FACTURE',
    issueDate: 'Kilumbu ya kubasika',
    dueDate: 'Kilumbu ya kufuta',
    status: 'Kikalulu',
    from: 'Kutuka',
    billTo: 'Kufuta kuna',
    invoiceDetails: 'Mvutu ya facture',
    description: 'Ndinga',
    device: 'Disolo',
    problem: 'Mvutukulu',
    lineItems: 'Bima',
    qty: 'Ngunga',
    unitPrice: 'Ntalu ya unité',
    amount: 'Ntalu',
    subtotal: 'Total partiel',
    total: 'Total',
    notes: 'Bansangu',
    termsConditions: 'Bakanga ti kondisi',
    thankYou: 'Matondo na business na nge!',
    generatedOn: 'Basalaka na',
    companyInfoNotAvailable: 'Bansangu ya entreprise kele ve'
  },
  sw: { // Swahili (Congo variant)
    invoice: 'ANKARA',
    issueDate: 'Tarehe ya kutolewa',
    dueDate: 'Tarehe ya malipo',
    status: 'Hali',
    from: 'Kutoka',
    billTo: 'Lipa kwa',
    invoiceDetails: 'Maelezo ya ankara',
    description: 'Maelezo',
    device: 'Kifaa',
    problem: 'Tatizo',
    lineItems: 'Vipengee',
    qty: 'Idadi',
    unitPrice: 'Bei ya kipengee',
    amount: 'Kiasi',
    subtotal: 'Jumla ndogo',
    total: 'Jumla',
    notes: 'Maelezo',
    termsConditions: 'Masharti na masharti',
    thankYou: 'Asante kwa biashara yako!',
    generatedOn: 'Imetolewa',
    companyInfoNotAvailable: 'Taarifa za kampuni hazipatikani'
  },
  ts: { // Tshiluba
    invoice: 'FACTURE',
    issueDate: 'Dibuwa dia kubasula',
    dueDate: 'Dibuwa dia kulamata',
    status: 'Dikanda',
    from: 'Ku tshibuka',
    billTo: 'Kulamata kudi',
    invoiceDetails: 'Ditangila dia facture',
    description: 'Ditangila',
    device: 'Dibende',
    problem: 'Dikanda',
    lineItems: 'Bintu',
    qty: 'Mutu',
    unitPrice: 'Tshijila dia unité',
    amount: 'Tshijila',
    subtotal: 'Total partiel',
    total: 'Total',
    notes: 'Bisangu',
    termsConditions: 'Bipangila ne kondisi',
    thankYou: 'Tshipa dia business dia nge!',
    generatedOn: 'Buasuidi ne',
    companyInfoNotAvailable: 'Bisangu dia entreprise biafuidi te'
  },
  // Additional international languages
  de: {
    invoice: 'RECHNUNG',
    issueDate: 'Rechnungsdatum',
    dueDate: 'Fälligkeitsdatum',
    status: 'Status',
    from: 'Von',
    billTo: 'Rechnung an',
    invoiceDetails: 'Rechnungsdetails',
    description: 'Beschreibung',
    device: 'Gerät',
    problem: 'Problem',
    lineItems: 'Positionen',
    qty: 'Menge',
    unitPrice: 'Einzelpreis',
    amount: 'Betrag',
    subtotal: 'Zwischensumme',
    total: 'Gesamtbetrag',
    notes: 'Anmerkungen',
    termsConditions: 'Geschäftsbedingungen',
    thankYou: 'Vielen Dank für Ihren Auftrag!',
    generatedOn: 'Erstellt am',
    companyInfoNotAvailable: 'Firmeninformation nicht verfügbar'
  },
  it: {
    invoice: 'FATTURA',
    issueDate: 'Data di emissione',
    dueDate: 'Data di scadenza',
    status: 'Stato',
    from: 'Da',
    billTo: 'Fatturare a',
    invoiceDetails: 'Dettagli fattura',
    description: 'Descrizione',
    device: 'Dispositivo',
    problem: 'Problema',
    lineItems: 'Voci',
    qty: 'Q.tà',
    unitPrice: 'Prezzo unitario',
    amount: 'Importo',
    subtotal: 'Subtotale',
    total: 'Totale',
    notes: 'Note',
    termsConditions: 'Termini e condizioni',
    thankYou: 'Grazie per il vostro business!',
    generatedOn: 'Generato il',
    companyInfoNotAvailable: 'Informazioni aziendali non disponibili'
  },
  ar: {
    invoice: 'فاتورة',
    issueDate: 'تاريخ الإصدار',
    dueDate: 'تاريخ الاستحقاق',
    status: 'الحالة',
    from: 'من',
    billTo: 'فاتورة إلى',
    invoiceDetails: 'تفاصيل الفاتورة',
    description: 'الوصف',
    device: 'الجهاز',
    problem: 'المشكلة',
    lineItems: 'بنود',
    qty: 'الكمية',
    unitPrice: 'سعر الوحدة',
    amount: 'المبلغ',
    subtotal: 'المجموع الفرعي',
    total: 'المجموع',
    notes: 'ملاحظات',
    termsConditions: 'الشروط والأحكام',
    thankYou: 'شكرا لعملكم!',
    generatedOn: 'تم إنشاؤها في',
    companyInfoNotAvailable: 'معلومات الشركة غير متوفرة'
  }
};

export const getTranslations = (language: Language): InvoiceTranslations => {
  return translations[language] || translations.en; // Fallback to English if translation not found
};
