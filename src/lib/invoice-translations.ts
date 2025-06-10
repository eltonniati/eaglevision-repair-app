
export type Language = 'en' | 'fr' | 'pt';

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
  }
};

export const getTranslations = (language: Language): InvoiceTranslations => {
  return translations[language];
};
