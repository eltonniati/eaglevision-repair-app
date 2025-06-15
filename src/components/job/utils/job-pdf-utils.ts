import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

// Utility to wait for all images (especially the logo) to load in an element before rendering
const waitForImagesToLoad = async (element: HTMLElement) => {
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(images.map((img) => {
    if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Resolve even on error so it doesn't hang
    });
  }));
};

// PDF generation utility for job cards - optimized for mobile/cellphone format
export const generateJobCardPdf = async (printRef: React.RefObject<HTMLDivElement>) => {
  if (!printRef.current) return null;
  
  try {
    // Create a clone of the element to avoid modifying the original
    const originalElement = printRef.current;
    const clonedElement = originalElement.cloneNode(true) as HTMLDivElement;
    
    // Detect if we're on mobile
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Make sure styles are consistent with preview
    clonedElement.style.cssText = `
      width: ${isMobile ? '375px' : '210mm'} !important;
      height: ${isMobile ? '667px' : '297mm'} !important;
      min-height: ${isMobile ? '667px' : '297mm'} !important;
      max-width: ${isMobile ? '375px' : '210mm'} !important;
      max-height: ${isMobile ? '667px' : '297mm'} !important;
      padding: 0 !important;
      margin: 0 !important;
      transform: scale(1) !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      background: white !important;
      font-size: ${isMobile ? '12px' : '14px'} !important;
      line-height: 1.5 !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
      font-family: Arial, sans-serif !important;
      color: black !important;
      z-index: 9999 !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      visibility: visible !important;
    `;

    // Apply styles to all child elements - optimized for target
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.color = 'black';
      el.style.backgroundColor = 'transparent';
      el.style.visibility = 'visible';
      el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
      
      // Just in case, reset odd margins and fonts
      if (el.style.marginLeft) {
        el.style.marginLeft = '0';
      }
    });

    // Append to body temporarily
    document.body.appendChild(clonedElement);

    // Wait for all images (incl. logo) to load before rendering canvas!
    await waitForImagesToLoad(clonedElement);

    // Wait a short time for any fonts/styles
    await new Promise(resolve => setTimeout(resolve, 140));

    // Generate canvas with mobile or A4 dimensions
    const canvasWidth = isMobile ? 375 : 794; // 210mm = 794px at 96dpi
    const canvasHeight = isMobile ? 667 : 1123; // 297mm = 1123px at 96dpi
    const scale = isMobile ? 4 : 2;
    
    const canvas = await html2canvas(clonedElement, {
      scale,
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

    // Create PDF (A4 or mobile format)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isMobile ? [100, 177] : 'a4', // 100mm x 177mm or standard A4
      compress: true
    });

    const imgData = canvas.toDataURL('image/png', 1.0);

    // Add image to fill the page
    if (isMobile) {
      pdf.addImage(imgData, 'PNG', 0, 0, 100, 177, '', 'FAST');
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, '', 'FAST');
    }

    return pdf;
  } catch (error) {
    console.error("Job Card PDF generation error:", error);
    toast.error("Failed to generate Job Card PDF");
    return null;
  }
};

export const downloadJobCardPdf = async (
  printRef: React.RefObject<HTMLDivElement>, 
  jobCardNumber: string
) => {
  const pdf = await generateJobCardPdf(printRef);
  if (pdf) {
    pdf.save(`JobCard_${jobCardNumber}_Mobile.pdf`);
    toast.success("Job Card PDF downloaded successfully");
    return true;
  }
  return false;
};

export const getJobCardPdfAsBlob = async (
  printRef: React.RefObject<HTMLDivElement>
) => {
  const pdf = await generateJobCardPdf(printRef);
  if (!pdf) return null;
  
  return {
    blob: pdf.output('blob'),
    pdf
  };
};
