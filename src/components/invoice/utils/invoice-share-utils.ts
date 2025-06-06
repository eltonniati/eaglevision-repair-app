
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
        text: `Invoice for ${customerName}`,
      });
      toast.success("Invoice PDF shared successfully");
    } else {
      // Fallback: Create download link and WhatsApp share
      const pdfUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Invoice_${invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Also prepare WhatsApp message
      const text = `Invoice #${invoiceNumber} for ${customerName} - PDF downloaded`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      
      toast.success("Invoice PDF downloaded. WhatsApp opened for sharing.");
      
      // Clean up URL
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
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
    
    // Create download link for the PDF
    const pdfUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `Invoice_${invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Open email client
    const subject = `Invoice #${invoiceNumber} - ${customerName}`;
    const body = `Please find the invoice PDF attached.\n\nInvoice: #${invoiceNumber}\nCustomer: ${customerName}\n\nThe PDF has been downloaded to your device. Please attach it to this email.`;
    const mailtoUrl = `mailto:${customerEmail || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
    toast.success("Invoice PDF downloaded. Email client opened.");
    
    // Clean up URL
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
  } catch (error) {
    console.error("Email error:", error);
    toast.error("Failed to prepare email");
  }
};
