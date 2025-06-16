import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

// Constants for A4 dimensions in mm and pixels
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = 794; // 210mm at 96dpi
const A4_HEIGHT_PX = 1123; // 297mm at 96dpi

export const generateInvoicePdf = async (printRef: React.RefObject<HTMLDivElement>) => {
  if (!printRef.current) {
    toast.error("No invoice content found");
    return null;
  }

  try {
    // Create a clone of the element to avoid modifying the original
    const originalElement = printRef.current;
    const clonedElement = originalElement.cloneNode(true) as HTMLDivElement;
    
    // Apply A4 paper styling
    clonedElement.style.cssText = `
      width: ${A4_WIDTH_PX}px !important;
      min-width: ${A4_WIDTH_PX}px !important;
      max-width: ${A4_WIDTH_PX}px !important;
      height: ${A4_HEIGHT_PX}px !important;
      min-height: ${A4_HEIGHT_PX}px !important;
      max-height: ${A4_HEIGHT_PX}px !important;
      padding: 20px !important;
      margin: 0 !important;
      box-sizing: border-box !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      background: white !important;
      font-size: 12px !important;
      line-height: 1.4 !important;
      overflow: hidden !important;
      font-family: Arial, sans-serif !important;
      color: black !important;
      z-index: 9999 !important;
      display: block !important;
      visibility: visible !important;
    `;

    // Apply consistent styling to all child elements
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.boxSizing = 'border-box';
      el.style.margin = '0';
      el.style.padding = '0';
      el.style.color = 'inherit';
      el.style.backgroundColor = 'transparent';
      el.style.visibility = 'visible';
      
      // Special handling for specific elements
      if (el.tagName === 'TABLE') {
        el.style.width = '100%';
        el.style.borderCollapse = 'collapse';
      }
      
      if (el.tagName === 'IMG') {
        el.style.maxWidth = '100%';
        el.style.height = 'auto';
      }
    });

    // Append to body temporarily
    document.body.appendChild(clonedElement);

    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 300));

    // Generate canvas with A4 dimensions
    const canvas = await html2canvas(clonedElement, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: A4_WIDTH_PX,
      height: A4_HEIGHT_PX,
      windowWidth: A4_WIDTH_PX,
      windowHeight: A4_HEIGHT_PX,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
    });

    // Remove the cloned element
    document.body.removeChild(clonedElement);

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Add image to fill the A4 page completely
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, '', 'FAST');

    return pdf;
  } catch (error) {
    console.error("PDF generation error:", error);
    toast.error("Failed to generate PDF");
    return null;
  }
};

export const downloadInvoicePdf = async (
  printRef: React.RefObject<HTMLDivElement>, 
  invoiceNumber: string = 'INV'
) => {
  try {
    const pdf = await generateInvoicePdf(printRef);
    if (pdf) {
      pdf.save(`Invoice_${invoiceNumber}.pdf`);
      toast.success("PDF downloaded successfully");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download PDF");
    return false;
  }
};

export const getInvoicePdfAsBlob = async (
  printRef: React.RefObject<HTMLDivElement>
) => {
  try {
    const pdf = await generateInvoicePdf(printRef);
    if (!pdf) return null;
    
    return {
      blob: pdf.output('blob'),
      pdf
    };
  } catch (error) {
    console.error("Blob generation error:", error);
    return null;
  }
};

export const shareInvoice = async (
  printRef: React.RefObject<HTMLDivElement>,
  invoiceNumber: string = 'INV'
) => {
  try {
    const result = await getInvoicePdfAsBlob(printRef);
    if (!result) return false;

    if (navigator.share) {
      await navigator.share({
        title: `Invoice ${invoiceNumber}`,
        files: [new File(
          [result.blob], 
          `Invoice_${invoiceNumber}.pdf`, 
          { type: 'application/pdf' }
        )]
      });
      return true;
    } else {
      // Fallback for browsers without Web Share API
      const url = URL.createObjectURL(result.blob);
      window.open(url, '_blank');
      return true;
    }
  } catch (error) {
    console.error("Share error:", error);
    if (error.name !== 'AbortError') {
      toast.error("Failed to share invoice");
    }
    return false;
  }
};
