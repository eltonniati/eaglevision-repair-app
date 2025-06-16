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
    
    // Store original styles
    const originalStyles = {
      width: element.style.width,
      height: element.style.height,
      padding: element.style.padding,
      margin: element.style.margin,
      transform: element.style.transform
    };

    // Apply print-specific styles
    element.style.width = `${A4_WIDTH_PX}px`;
    element.style.height = 'auto';
    element.style.padding = '0';
    element.style.margin = '0';
    element.style.transform = 'none';

    // Calculate scale to fit content width
    const contentWidth = element.scrollWidth;
    const scale = A4_WIDTH_PX / contentWidth;

    const canvas = await html2canvas(element, {
      scale: scale * 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: A4_WIDTH_PX,
      height: element.scrollHeight * scale,
      windowWidth: A4_WIDTH_PX,
      scrollX: 0,
      scrollY: 0,
    });

    // Restore original styles
    element.style.width = originalStyles.width;
    element.style.height = originalStyles.height;
    element.style.padding = originalStyles.padding;
    element.style.margin = originalStyles.margin;
    element.style.transform = originalStyles.transform;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Calculate image dimensions to fit A4
    const imgWidth = A4_WIDTH_MM;
    const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width;

    // Add image to PDF with 10mm margins
    const x = 10; // Left margin
    const y = 10; // Top margin
    const width = A4_WIDTH_MM - 20; // Account for margins
    const height = imgHeight > (A4_HEIGHT_MM - 20) ? (A4_HEIGHT_MM - 20) : imgHeight;

    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      x,
      y,
      width,
      height,
      '',
      'FAST'
    );

    // Add additional pages if content is taller than available space
    let heightLeft = imgHeight - height;
    let position = y + height;
    const pageHeight = A4_HEIGHT_MM - 20; // Account for margins

    while (heightLeft > 0) {
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        x,
        y - (position - y),
        width,
        imgHeight,
        '',
        'FAST'
      );
      position += pageHeight;
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
  invoiceNumber: string = 'INV',
  customerName: string = 'Customer'
) => {
  const pdf = await generateInvoicePdf(printRef);
  if (!pdf) return false;

  try {
    if (navigator.share) {
      const blob = pdf.output('blob');
      await navigator.share({
        title: `Invoice ${invoiceNumber}`,
        text: `Invoice for ${customerName}`,
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
