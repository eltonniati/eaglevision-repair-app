import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/**
 * Downloads the invoice as a PDF file
 * @param ref - React ref to the printable invoice component
 * @param fileName - Base name for the PDF file (without extension)
 */
export const downloadInvoicePdf = async (
  ref: React.RefObject<HTMLElement>,
  fileName: string
): Promise<void> => {
  if (!ref.current) {
    throw new Error("Invoice element not found");
  }

  try {
    const element = ref.current;
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
      allowTaint: true,
    });

    // Calculate PDF dimensions to maintain aspect ratio
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "mm",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculate aspect ratio
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    let pdfWidth = pageWidth;
    let pdfHeight = pageWidth / ratio;

    // If the PDF height is greater than page height, adjust dimensions
    if (pdfHeight > pageHeight) {
      pdfHeight = pageHeight;
      pdfWidth = pageHeight * ratio;
    }

    // Center the image on the page
    const x = (pageWidth - pdfWidth) / 2;
    const y = (pageHeight - pdfHeight) / 2;

    pdf.addImage(imgData, "PNG", x, y, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
};

/**
 * Shares the invoice as an image file using Web Share API
 * @param ref - React ref to the printable invoice component
 * @param fileName - Base name for the file (without extension)
 * @param customerName - Customer name for share title
 */
export const shareInvoice = async (
  ref: React.RefObject<HTMLElement>,
  fileName: string,
  customerName: string
): Promise<void> => {
  if (!ref.current) {
    throw new Error("Invoice element not found");
  }

  try {
    const element = ref.current;
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error("Failed to create image blob"));
          return;
        }

        const file = new File([blob], `${fileName}.png`, {
          type: "image/png",
        });

        // Use Web Share API if available
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({
              title: `Invoice for ${customerName}`,
              text: `Please find attached the invoice ${fileName}`,
              files: [file],
            });
            resolve();
          } catch (shareError) {
            if (shareError.name !== "AbortError") {
              console.error("Share error:", shareError);
              fallbackShare(canvas);
            }
            resolve();
          }
        } else {
          // Fallback for browsers without share support
          fallbackShare(canvas);
          resolve();
        }
      }, "image/png", 0.9); // 90% quality
    });
  } catch (error) {
    console.error("Error sharing invoice:", error);
    throw new Error("Failed to share invoice");
  }
};

/**
 * Fallback sharing method when Web Share API is not available
 * @param canvas - HTML canvas element with the invoice image
 */
const fallbackShare = (canvas: HTMLCanvasElement): void => {
  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = "invoice.png";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
