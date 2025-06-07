
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

// PDF generation utility for invoices
export const generateInvoicePdf = async (printRef: React.RefObject<HTMLDivElement>) => {
  if (!printRef.current) return null;
  
  try {
    // Force the element to render at full size for PDF
    const originalStyle = printRef.current.style.cssText;
    printRef.current.style.cssText = `
      width: 210mm !important;
      min-height: 297mm !important;
      padding: 20mm !important;
      margin: 0 !important;
      transform: none !important;
      position: relative !important;
      background: white !important;
      font-size: 12px !important;
      line-height: 1.4 !important;
    `;

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      foreignObjectRendering: true,
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      windowWidth: 794,
      windowHeight: 1123,
    });

    // Restore original styles
    printRef.current.style.cssText = originalStyle;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

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
