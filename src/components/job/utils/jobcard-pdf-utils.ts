
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

// Wait for all images to load
const waitForImagesToLoad = async (element: HTMLElement) => {
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(images.map((img) => {
    if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  }));
};

// Generate PDF from job card element
export const generateJobCardPdf = async (printRef: React.RefObject<HTMLDivElement>) => {
  if (!printRef.current) {
    throw new Error('Print reference is not available');
  }
  
  try {
    const originalElement = printRef.current;
    
    // Wait for images to load
    await waitForImagesToLoad(originalElement);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Generate canvas with high quality settings
    const canvas = await html2canvas(originalElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: false,
      foreignObjectRendering: false,
      width: originalElement.offsetWidth,
      height: originalElement.offsetHeight,
    });

    // Create PDF with A4 format
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Calculate dimensions to fit A4 with proper margins
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 15; // 15mm margin on all sides
    const availableWidth = pdfWidth - (margin * 2);
    const availableHeight = pdfHeight - (margin * 2);
    
    // Calculate image dimensions maintaining aspect ratio
    const imgAspectRatio = canvas.width / canvas.height;
    let imgWidth = availableWidth;
    let imgHeight = imgWidth / imgAspectRatio;
    
    // If height exceeds available space, scale down
    if (imgHeight > availableHeight) {
      imgHeight = availableHeight;
      imgWidth = imgHeight * imgAspectRatio;
    }
    
    // Center the image on the page
    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;
    
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight, '', 'FAST');

    return pdf;
  } catch (error) {
    console.error("Job Card PDF generation error:", error);
    toast.error("Failed to generate Job Card PDF");
    throw error;
  }
};

// Download job card as PDF
export const downloadJobCardPdf = async (
  printRef: React.RefObject<HTMLDivElement>, 
  jobCardNumber: string
) => {
  try {
    const pdf = await generateJobCardPdf(printRef);
    pdf.save(`JobCard_${jobCardNumber}.pdf`);
    toast.success("Job Card PDF downloaded successfully");
    return true;
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download Job Card PDF");
    return false;
  }
};

// Get job card PDF as blob for sharing
export const getJobCardPdfAsBlob = async (
  printRef: React.RefObject<HTMLDivElement>
) => {
  try {
    const pdf = await generateJobCardPdf(printRef);
    return {
      blob: pdf.output('blob'),
      pdf
    };
  } catch (error) {
    console.error("PDF blob generation error:", error);
    return null;
  }
};
