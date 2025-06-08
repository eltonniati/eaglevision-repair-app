
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

// PDF generation utility for invoices
export const generateInvoicePdf = async (printRef: React.RefObject<HTMLDivElement>) => {
  if (!printRef.current) return null;
  
  try {
    // Create a clone of the element to avoid modifying the original
    const originalElement = printRef.current;
    const clonedElement = originalElement.cloneNode(true) as HTMLDivElement;
    
    // Detect if we're on mobile
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Apply proper styling for PDF generation - optimized for mobile viewing
    clonedElement.style.cssText = `
      width: ${isMobile ? '375px' : '794px'} !important;
      height: ${isMobile ? '667px' : '1123px'} !important;
      min-height: ${isMobile ? '667px' : '1123px'} !important;
      max-width: ${isMobile ? '375px' : '794px'} !important;
      max-height: ${isMobile ? '667px' : '1123px'} !important;
      padding: ${isMobile ? '10px' : '20px'} !important;
      margin: 0 !important;
      transform: scale(1) !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      background: white !important;
      font-size: ${isMobile ? '10px' : '12px'} !important;
      line-height: 1.3 !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
      font-family: Arial, sans-serif !important;
      color: black !important;
      z-index: 9999 !important;
      display: block !important;
      visibility: visible !important;
    `;

    // Apply styles to all child elements with mobile optimization
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.color = 'black';
      el.style.backgroundColor = 'transparent';
      el.style.visibility = 'visible';
      el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
      
      // Mobile-specific adjustments
      if (isMobile) {
        if (el.tagName === 'H1') {
          el.style.fontSize = '14px';
        } else if (el.tagName === 'H2') {
          el.style.fontSize = '12px';
        } else if (el.tagName === 'P' || el.tagName === 'SPAN') {
          el.style.fontSize = '9px';
        } else if (el.tagName === 'TD' || el.tagName === 'TH') {
          el.style.fontSize = '8px';
          el.style.padding = '3px';
        }
      }
    });

    // Append to body temporarily
    document.body.appendChild(clonedElement);

    // Wait for styles to apply and fonts to load
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate canvas with device-appropriate dimensions
    const canvasWidth = isMobile ? 375 : 794;
    const canvasHeight = isMobile ? 667 : 1123;
    
    const canvas = await html2canvas(clonedElement, {
      scale: isMobile ? 3 : 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: false,
      foreignObjectRendering: false,
      width: canvasWidth,
      height: canvasHeight,
      windowWidth: canvasWidth,
      windowHeight: canvasHeight,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
    });

    // Remove the cloned element
    document.body.removeChild(clonedElement);

    // Create PDF with appropriate dimensions
    const pdf = new jsPDF({
      orientation: isMobile ? 'portrait' : 'portrait',
      unit: 'mm',
      format: isMobile ? [100, 177] : 'a4', // Mobile-friendly size vs A4
      compress: true
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Add image to fill the page dimensions
    if (isMobile) {
      pdf.addImage(imgData, 'PNG', 0, 0, 100, 177, '', 'FAST');
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, '', 'FAST');
    }

    return pdf;
  } catch (error) {
    console.error("PDF generation error:", error);
    toast.error("Failed to generate PDF");
    return null;
  }
};

export const downloadInvoicePdf = async (
  printRef: React.RefObject<HTMLDivElement>, 
  invoiceNumber: string
) => {
  const pdf = await generateInvoicePdf(printRef);
  if (pdf) {
    pdf.save(`Invoice_${invoiceNumber}.pdf`);
    toast.success("PDF downloaded successfully");
    return true;
  }
  return false;
};

export const getInvoicePdfAsBlob = async (
  printRef: React.RefObject<HTMLDivElement>
) => {
  const pdf = await generateInvoicePdf(printRef);
  if (!pdf) return null;
  
  return {
    blob: pdf.output('blob'),
    pdf
  };
};
