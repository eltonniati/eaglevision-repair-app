
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
    
    // Apply proper styling for PDF generation - mobile optimized
    clonedElement.style.cssText = `
      width: 210mm !important;
      min-height: 297mm !important;
      max-width: 210mm !important;
      padding: 10mm !important;
      margin: 0 !important;
      transform: scale(1) !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      background: white !important;
      font-size: 12px !important;
      line-height: 1.4 !important;
      box-sizing: border-box !important;
      overflow: visible !important;
      font-family: Arial, sans-serif !important;
      color: black !important;
      z-index: 9999 !important;
      display: block !important;
      visibility: visible !important;
    `;

    // Apply styles to all child elements
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.color = 'black';
      el.style.backgroundColor = 'transparent';
      el.style.visibility = 'visible';
      el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
    });

    // Append to body temporarily
    document.body.appendChild(clonedElement);

    // Wait for styles to apply and fonts to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate canvas with A4 dimensions (210x297mm at 96 DPI)
    const canvas = await html2canvas(clonedElement, {
      scale: 1,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: false,
      foreignObjectRendering: false,
      width: 794, // 210mm at 96 DPI
      height: 1123, // 297mm at 96 DPI
      windowWidth: 794,
      windowHeight: 1123,
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

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Add image to fit A4 page (210x297mm)
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, '', 'FAST');

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
