import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export const getInvoicePdfAsBlob = async (printRef: React.RefObject<HTMLDivElement>) => {
  if (!printRef.current) {
    toast.error("No invoice content found");
    return null;
  }

  try {
    const element = printRef.current;
    
    const originalStyles = {
      width: element.style.width,
      height: element.style.height,
      padding: element.style.padding,
      margin: element.style.margin,
      overflow: element.style.overflow
    };

    element.style.width = `${A4_WIDTH_PX}px`;
    element.style.height = 'auto';
    element.style.padding = '0';
    element.style.margin = '0';
    element.style.overflow = 'visible';

    await new Promise(resolve => setTimeout(resolve, 100));

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
      allowTaint: true,
      letterRendering: true
    });

    element.style.width = originalStyles.width;
    element.style.height = originalStyles.height;
    element.style.padding = originalStyles.padding;
    element.style.margin = originalStyles.margin;
    element.style.overflow = originalStyles.overflow;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width;
    
    pdf.addImage(
      canvas.toDataURL('image/png', 1.0),
      'PNG',
      0,
      0,
      A4_WIDTH_MM,
      Math.min(imgHeight, A4_HEIGHT_MM),
      undefined,
      'FAST'
    );

    let heightLeft = imgHeight - A4_HEIGHT_MM;
    let position = 0;
    
    while (heightLeft >= 0) {
      position = heightLeft - A4_HEIGHT_MM;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/png', 1.0),
        'PNG',
        0,
        -position,
        A4_WIDTH_MM,
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= A4_HEIGHT_MM;
    }

    return {
      pdf,
      blob: pdf.output('blob')
    };
  } catch (error) {
    console.error("PDF generation error:", error);
    toast.error("Failed to generate PDF");
    return null;
  }
};

export const generateInvoicePdf = async (printRef: React.RefObject<HTMLDivElement>) => {
  const result = await getInvoicePdfAsBlob(printRef);
  return result?.pdf || null;
};

export const downloadInvoicePdf = async (
  printRef: React.RefObject<HTMLDivElement>, 
  invoiceNumber: string = 'INV'
) => {
  const result = await getInvoicePdfAsBlob(printRef);
  if (result) {
    result.pdf.save(`Invoice_${invoiceNumber}.pdf`);
    return true;
  }
  return false;
};

export const shareInvoice = async (
  printRef: React.RefObject<HTMLDivElement>,
  invoiceNumber: string = 'INV',
  customerName: string = 'Customer'
) => {
  const pdfResult = await getInvoicePdfAsBlob(printRef);
  if (!pdfResult) return false;

  try {
    const { blob } = pdfResult;
    const pdfFile = new File([blob], `Invoice_${invoiceNumber}.pdf`, {
      type: 'application/pdf',
    });

    if (navigator.share && navigator.canShare?.({ files: [pdfFile] })) {
      await navigator.share({
        files: [pdfFile],
        title: `Invoice ${invoiceNumber}`,
        text: `Invoice details for ${customerName}`,
      });
      toast.success("Invoice shared successfully");
      return true;
    } else {
      const pdfUrl = URL.createObjectURL(blob);
      const text = `Invoice #${invoiceNumber} for ${customerName}`;
      
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n\nPDF will open in new tab for sharing')}`;
        window.open(whatsappUrl, '_blank');
        
        setTimeout(() => {
          window.open(pdfUrl, '_blank');
        }, 1000);
      } else {
        const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
        window.open(pdfUrl, '_blank');
      }
      
      toast.info("WhatsApp opened. PDF will open separately for sharing.");
      return true;
    }
  } catch (error) {
    console.error("Sharing error:", error);
    toast.error("Failed to share invoice");
    return false;
  }
};
