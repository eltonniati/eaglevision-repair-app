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
    
    // Apply cellphone-optimized styling for PDF generation
    clonedElement.style.cssText = `
      width: 375px !important;
      height: 667px !important;
      min-height: 667px !important;
      max-width: 375px !important;
      max-height: 667px !important;
      padding: 0 !important;
      margin: 0 !important;
      transform: scale(1) !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      background: white !important;
      font-size: 10px !important;
      line-height: 1.3 !important;
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

    // Apply styles to all child elements - cellphone optimized
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.color = 'black';
      el.style.backgroundColor = 'transparent';
      el.style.visibility = 'visible';
      el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
      
      // Optimize for cellphone viewing
      if (el.tagName === 'H1') {
        el.style.fontSize = '16px';
        el.style.fontWeight = 'bold';
      } else if (el.tagName === 'H2') {
        el.style.fontSize = '14px';
        el.style.fontWeight = 'bold';
      } else if (el.tagName === 'H3') {
        el.style.fontSize = '12px';
        el.style.fontWeight = 'bold';
      } else if (el.tagName === 'P' || el.tagName === 'SPAN') {
        el.style.fontSize = '10px';
      }
      
      // Remove margins that might cause offset
      if (el.style.marginLeft) {
        el.style.marginLeft = '0';
      }
    });

    // Append to body temporarily
    document.body.appendChild(clonedElement);

    // Wait for all images inside clonedElement to load before rendering
    await waitForImagesToLoad(clonedElement);

    // Wait a little for fonts/styles, if needed
    await new Promise(resolve => setTimeout(resolve, 150));

    // Generate canvas with cellphone dimensions
    const canvasWidth = 375;
    const canvasHeight = 667;
    
    const canvas = await html2canvas(clonedElement, {
      scale: 4, // High scale for better quality on mobile
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

    // Create PDF with cellphone format (mobile-friendly dimensions)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [100, 177], // Cellphone format dimensions
      compress: true
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Add image to fill the cellphone page dimensions
    pdf.addImage(imgData, 'PNG', 0, 0, 100, 177, '', 'FAST');

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
