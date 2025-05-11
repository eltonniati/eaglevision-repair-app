
import { getPdfAsBlob } from "./pdf-utils";
import { toast } from "sonner";

// Share functionality
export const shareJobCard = async (
  printRef: React.RefObject<HTMLDivElement>,
  jobCardNumber: string,
  customerName: string
) => {
  const pdfResult = await getPdfAsBlob(printRef);
  if (!pdfResult) return;

  try {
    const { blob } = pdfResult;
    const pdfFile = new File([blob], `JobCard_${jobCardNumber}.pdf`, {
      type: 'application/pdf',
    });

    if (navigator.share && navigator.canShare?.({ files: [pdfFile] })) {
      await navigator.share({
        files: [pdfFile],
        title: `Job Card ${jobCardNumber}`,
        text: `Job card details for ${customerName}`,
      });
    } else {
      // Fallback for browsers that don't support sharing files
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');
      toast.info("PDF opened in new tab");
    }
  } catch (error) {
    console.error("Sharing error:", error);
    toast.error("Failed to share job card");
  }
};

// Email functionality
export const emailJobCard = async (
  printRef: React.RefObject<HTMLDivElement>,
  jobCardNumber: string,
  customerName: string,
  customerPhone: string
) => {
  const pdfResult = await getPdfAsBlob(printRef);
  if (!pdfResult) return;

  try {
    const { blob } = pdfResult;
    const pdfUrl = URL.createObjectURL(blob);
    
    const subject = `Job Card #${jobCardNumber} - ${customerName}`;
    const body = `Please find attached the job card details.\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\nDevice: `;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&attachment=${pdfUrl}`;
  } catch (error) {
    console.error("Email error:", error);
    toast.error("Failed to prepare email");
  }
};
