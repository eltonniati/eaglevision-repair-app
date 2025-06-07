
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
    
    // Apply proper styling for PDF generation - optimized for mobile
    clonedElement.style.cssText = `
      width: 595px !important;
      min-height: 842px !important;
      padding: 20px !important;
      margin: 0 !important;
      transform: none !important;
      position: absolute !important;
      top: -9999px !important;
      left: 0 !important;
      background: white !important;
      font-size: 11px !important;
      line-height: 1.3 !important;
      box-sizing: border-box !important;
      overflow: visible !important;
      font-family: Arial, sans-serif !important;
      color: black !important;
    `;

    // Apply styles to all child elements
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.color = 'black';
      el.style.backgroundColor = 'transparent';
    });

    // Append to body temporarily
    document.body.appendChild(clonedElement);

    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      foreignObjectRendering: true,
      width: 595,
      height: 842,
      windowWidth: 595,
      windowHeight: 842,
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
      unit: 'pt',
      format: 'a4',
      compress: true
    });

    const imgData = canvas.toDataURL('image/png', 0.95);
    
    // Add image to fit A4 page
    pdf.addImage(imgData, 'PNG', 0, 0, 595, 842, '', 'FAST');

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
