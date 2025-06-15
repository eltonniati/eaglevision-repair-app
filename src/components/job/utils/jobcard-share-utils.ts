
import { getJobCardPdfAsBlob } from './jobcard-pdf-utils';
import { toast } from "sonner";

// Share job card PDF via Web Share API or download
export const shareJobCard = async (
  printRef: React.RefObject<HTMLDivElement>,
  jobCardNumber: string,
  customerName: string
) => {
  try {
    const pdfData = await getJobCardPdfAsBlob(printRef);
    
    if (!pdfData) {
      throw new Error('Failed to generate PDF for sharing');
    }

    const fileName = `JobCard_${jobCardNumber}.pdf`;
    const file = new File([pdfData.blob], fileName, { type: 'application/pdf' });

    // Check if Web Share API supports files
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `Job Card #${jobCardNumber}`,
        text: `Job Card for ${customerName}`,
        files: [file]
      });
      toast.success("Job card PDF shared successfully");
    } else {
      // Fallback: create download link for the PDF
      const url = URL.createObjectURL(pdfData.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Job card PDF downloaded - you can now share it manually");
    }
  } catch (error) {
    console.error('Share error:', error);
    toast.error("Failed to share job card PDF");
  }
};

// Email job card PDF
export const emailJobCard = async (
  printRef: React.RefObject<HTMLDivElement>,
  jobCardNumber: string,
  customerName: string,
  customerPhone: string
) => {
  try {
    // Generate PDF first
    const pdfData = await getJobCardPdfAsBlob(printRef);
    
    if (pdfData) {
      // Download the PDF so user can attach it
      const fileName = `JobCard_${jobCardNumber}.pdf`;
      const url = URL.createObjectURL(pdfData.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("PDF downloaded - please attach it to your email");
    }
    
    // Prepare email content
    const subject = `Job Card #${jobCardNumber} for ${customerName}`;
    const body = `Please find attached the job card PDF for ${customerName}.\n\nJob Card Number: ${jobCardNumber}\nCustomer: ${customerName}\nPhone: ${customerPhone}\n\nThank you for your business!`;
    
    // Open email client
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
  } catch (error) {
    console.error('Email error:', error);
    toast.error("Failed to prepare email with PDF");
  }
};

// WhatsApp share with PDF download option
export const shareViaWhatsApp = async (
  printRef: React.RefObject<HTMLDivElement>,
  jobCardNumber: string,
  customerName: string,
  customerPhone: string
) => {
  try {
    // Generate and download PDF first
    const pdfData = await getJobCardPdfAsBlob(printRef);
    
    if (pdfData) {
      const fileName = `JobCard_${jobCardNumber}.pdf`;
      const url = URL.createObjectURL(pdfData.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("PDF downloaded - you can now share it on WhatsApp");
    }
    
    // Open WhatsApp with text message
    const text = `Job Card #${jobCardNumber} for ${customerName}\nPhone: ${customerPhone}\n\nPDF file downloaded - please attach it to this message.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    
  } catch (error) {
    console.error('WhatsApp share error:', error);
    toast.error("Failed to prepare WhatsApp share");
  }
};
