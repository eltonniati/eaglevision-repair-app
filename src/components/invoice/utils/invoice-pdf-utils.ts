import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

// A4 dimensions in mm and pixels
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
    const element = printRef.current;
    
    // Apply print-specific styles temporarily
    const originalStyles = element.getAttribute('style');
    element.style.width = `${A4_WIDTH_PX}px`;
    element.style.height = 'auto';
    element.style.padding = '0';
    element.style.margin = '0';

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: A4_WIDTH_PX,
      height: element.scrollHeight,
      windowWidth: A4_WIDTH_PX,
      scrollX: 0,
      scrollY: 0,
    });

    // Restore original styles
    if (originalStyles) {
      element.setAttribute('style', originalStyles);
    } else {
      element.removeAttribute('style');
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Calculate aspect ratio to fit A4
    const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width;
    
    // Add image to PDF
    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      A4_WIDTH_MM,
      imgHeight > A4_HEIGHT_MM ? A4_HEIGHT_MM : imgHeight,
      '',
      'FAST'
    );

    // Add additional pages if content is taller than A4
    let heightLeft = imgHeight;
    let position = 0;
    const pageHeight = A4_HEIGHT_MM;

    while (heightLeft >= pageHeight) {
      position = heightLeft - pageHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        -position,
        A4_WIDTH_MM,
        imgHeight,
        '',
        'FAST'
      );
      heightLeft -= pageHeight;
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
  invoiceNumber: string = 'INV'
) => {
  const pdf = await generateInvoicePdf(printRef);
  if (pdf) {
    pdf.save(`Invoice_${invoiceNumber}.pdf`);
    return true;
  }
  return false;
};

export const shareInvoice = async (
  printRef: React.RefObject<HTMLDivElement>,
  invoiceNumber: string = 'INV'
) => {
  const pdf = await generateInvoicePdf(printRef);
  if (!pdf) return false;

  try {
    if (navigator.share) {
      const blob = pdf.output('blob');
      await navigator.share({
        title: `Invoice ${invoiceNumber}`,
        files: [new File([blob], `Invoice_${invoiceNumber}.pdf`, { type: 'application/pdf' })]
      });
      return true;
    } else {
      // Fallback for browsers without Web Share API
      const url = URL.createObjectURL(pdf.output('blob'));
      window.open(url, '_blank');
      return true;
    }
  } catch (error) {
    console.error("Share error:", error);
    return false;
  }
};
