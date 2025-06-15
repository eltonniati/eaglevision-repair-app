
import { getJobCardPdfAsBlob } from './jobcard-pdf-utils';
import { toast } from "sonner";

// Share job card via Web Share API or WhatsApp
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

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `Job Card #${jobCardNumber}`,
        text: `Job Card for ${customerName}`,
        files: [file]
      });
      toast.success("Job card shared successfully");
    } else {
      // Fallback: create download link
      const url = URL.createObjectURL(pdfData.blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Job card downloaded - you can now share it manually");
    }
  } catch (error) {
    console.error('Share error:', error);
    toast.error("Failed to share job card");
  }
};

// Email job card
export const emailJobCard = async (
  printRef: React.RefObject<HTMLDivElement>,
  jobCardNumber: string,
  customerName: string,
  customerPhone: string
) => {
  try {
    const subject = `Job Card #${jobCardNumber} for ${customerName}`;
    const body = `Please find attached the job card for ${customerName}.\n\nJob Card Number: ${jobCardNumber}\nCustomer: ${customerName}\nPhone: ${customerPhone}\n\nThank you for your business!`;
    
    // Try to generate PDF and open email client
    const pdfData = await getJobCardPdfAsBlob(printRef);
    
    if (pdfData) {
      // For email with attachment, we'll download the PDF first
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
    
    // Open email client
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
  } catch (error) {
    console.error('Email error:', error);
    toast.error("Failed to prepare email");
  }
};
