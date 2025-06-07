
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
    
    // Apply proper styling for PDF generation
    clonedElement.style.cssText = `
      width: 794px !important;
      min-height: 1123px !important;
      padding: 40px !important;
      margin: 0 !important;
      transform: none !important;
      position: absolute !important;
      top: -9999px !important;
      left: 0 !important;
      background: white !important;
      font-size: 12px !important;
      line-height: 1.4 !important;
      box-sizing: border-box !important;
      overflow: visible !important;
      font-family: Arial, sans-serif !important;
    `;

    // Append to body temporarily
    document.body.appendChild(clonedElement);

    // Wait for styles to apply
    await new Promise(resolve => setTimeout(resolve, 200));

    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      foreignObjectRendering: true,
      width: 794,
      height: 1123,
      windowWidth: 794,
      windowHeight: 1123,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
    });

    // Remove the cloned element
    document.body.removeChild(clonedElement);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [794, 1123],
      compress: true
    });

    const imgData = canvas.toDataURL('image/png', 0.95);
    
    // Add image with exact dimensions to fill the PDF
    pdf.addImage(imgData, 'PNG', 0, 0, 794, 1123, '', 'FAST');

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
