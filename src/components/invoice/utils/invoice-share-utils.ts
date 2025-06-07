
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
      // Enhanced fallback for WhatsApp and other platforms
      const pdfUrl = URL.createObjectURL(blob);
      const text = `Invoice #${invoiceNumber} for ${customerName}`;
      
      // For mobile devices, open WhatsApp first
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n\nPDF will open in new tab for sharing')}`;
        window.open(whatsappUrl, '_blank');
        
        // Small delay before opening PDF
        setTimeout(() => {
          window.open(pdfUrl, '_blank');
        }, 1000);
      } else {
        // For desktop, open both simultaneously
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
        window.open(pdfUrl, '_blank');
      }
      
      toast.info("WhatsApp opened. PDF will open separately for sharing.");
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
    
    // Open PDF in new tab for manual attachment
    setTimeout(() => {
      window.open(pdfUrl, '_blank');
    }, 500);
    
    toast.info("Email client opened. PDF opened in new tab for manual attachment.");
  } catch (error) {
    console.error("Email error:", error);
    toast.error("Failed to prepare email");
  }
};
