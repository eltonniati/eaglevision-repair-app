
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

// Utility to wait for all images to load
const waitForImagesToLoad = async (element: HTMLElement) => {
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(images.map((img) => {
    if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  }));
};

// Universal PDF generation that works consistently across all devices
export const generateJobCardPdf = async (printRef: React.RefObject<HTMLDivElement>) => {
  if (!printRef.current) return null;
  
  try {
    const originalElement = printRef.current;
    const clonedElement = originalElement.cloneNode(true) as HTMLDivElement;
    
    // Apply consistent mobile-first styling for PDF generation
    clonedElement.style.cssText = `
      width: 375px !important;
      height: auto !important;
      min-height: 667px !important;
      max-width: 375px !important;
      padding: 15px !important;
      margin: 0 !important;
      transform: scale(1) !important;
      position: fixed !important;
      top: 0 !important;
      left: -9999px !important;
      background: white !important;
      font-size: 10px !important;
      line-height: 1.3 !important;
      box-sizing: border-box !important;
      overflow: visible !important;
      font-family: Arial, sans-serif !important;
      color: black !important;
      z-index: 9999 !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      visibility: visible !important;
    `;

    // Apply consistent styles to all child elements
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((element) => {
      const el = element as HTMLElement;
      el.style.color = 'black';
      el.style.backgroundColor = 'transparent';
      el.style.visibility = 'visible';
      el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
      
      // Consistent font sizing
      if (el.tagName === 'H1') {
        el.style.fontSize = '16px';
        el.style.fontWeight = 'bold';
        el.style.textAlign = 'center';
        el.style.marginBottom = '8px';
      } else if (el.tagName === 'H2') {
        el.style.fontSize = '12px';
        el.style.fontWeight = 'bold';
        el.style.borderBottom = '1px solid #ccc';
        el.style.paddingBottom = '4px';
        el.style.marginBottom = '8px';
      } else if (el.tagName === 'H3') {
        el.style.fontSize = '11px';
        el.style.fontWeight = 'bold';
        el.style.marginBottom = '6px';
      } else if (el.tagName === 'P' || el.tagName === 'SPAN') {
        el.style.fontSize = '9px';
        el.style.marginBottom = '4px';
      }
      
      // Image sizing
      if (el.tagName === 'IMG') {
        el.style.maxWidth = '30px';
        el.style.maxHeight = '30px';
        el.style.objectFit = 'contain';
      }
      
      // Grid layouts
      if (el.classList.contains('grid')) {
        el.style.display = 'grid';
        el.style.gap = '12px';
        el.style.marginBottom = '12px';
      }
      
      if (el.classList.contains('grid-cols-2')) {
        el.style.gridTemplateColumns = '1fr 1fr';
      }
      
      // Card styling
      if (el.style.backgroundColor === 'rgb(248, 249, 250)' || el.classList.contains('card')) {
        el.style.backgroundColor = '#f8f9fa';
        el.style.border = '1px solid #e9ecef';
        el.style.borderRadius = '4px';
        el.style.padding = '8px';
      }
      
      // Remove margins that might cause offset
      if (el.style.marginLeft) {
        el.style.marginLeft = '0';
      }
    });

    // Append to body temporarily (positioned off-screen)
    document.body.appendChild(clonedElement);

    // Wait for images to load
    await waitForImagesToLoad(clonedElement);
    await new Promise(resolve => setTimeout(resolve, 200));

    // Generate canvas with consistent dimensions
    const canvas = await html2canvas(clonedElement, {
      scale: 3, // High scale for quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: false,
      foreignObjectRendering: false,
      width: 375,
      height: Math.max(667, clonedElement.scrollHeight),
      windowWidth: 375,
      windowHeight: Math.max(667, clonedElement.scrollHeight),
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
    });

    // Remove the cloned element
    document.body.removeChild(clonedElement);

    // Create PDF with consistent mobile format
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [100, 177], // Mobile format
      compress: true
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Calculate proper dimensions to fit content
    const imgWidth = 100;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');

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
    pdf.save(`JobCard_${jobCardNumber}.pdf`);
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
