
import { getInvoicePdfAsBlob } from "./invoice-pdf-utils";
import { toast } from "sonner";

// Share functionality for invoices
export const shareInvoice = async (
  printRef: React.RefObject<HTMLDivElement>,
  invoiceNumber: string,
  customerName: string
) => {
  const pdfResult = await getInvoicePdfAsBlob(printRef);
  if (!pdfResult) return;

  try {
    const { blob } = pdfResult;
    const pdfFile = new File([blob], `Invoice_${invoiceNumber}.pdf`, {
      type: 'application/pdf',
    });

    if (navigator.share && navigator.canShare?.({ files: [pdfFile] })) {
      await navigator.share({
        files: [pdfFile],
        title: `Invoice ${invoiceNumber}`,
        text: `Invoice details for ${customerName}`,
      });
      toast.success("Invoice shared successfully");
    } else {
      // Fallback for WhatsApp
      const pdfUrl = URL.createObjectURL(blob);
      const text = `Invoice #${invoiceNumber} for ${customerName}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      
      // Also open PDF in new tab
      window.open(pdfUrl, '_blank');
      toast.info("Invoice PDF opened in new tab. Please share manually.");
    }
  } catch (error) {
    console.error("Sharing error:", error);
    toast.error("Failed to share invoice");
  }
};

// Email functionality for invoices
export const emailInvoice = async (
  printRef: React.RefObject<HTMLDivElement>,
  invoiceNumber: string,
  customerName: string,
  customerEmail?: string
) => {
  const pdfResult = await getInvoicePdfAsBlob(printRef);
  if (!pdfResult) return;

  try {
    const { blob } = pdfResult;
    const pdfUrl = URL.createObjectURL(blob);
    
    const subject = `Invoice #${invoiceNumber} - ${customerName}`;
    const body = `Please find attached the invoice details.\n\nInvoice: #${invoiceNumber}\nCustomer: ${customerName}`;
    const mailtoUrl = `mailto:${customerEmail || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
    
    // Also open PDF in new tab for manual attachment
    window.open(pdfUrl, '_blank');
    toast.info("Email client opened. PDF opened in new tab for manual attachment.");
  } catch (error) {
    console.error("Email error:", error);
    toast.error("Failed to prepare email");
  }
};
