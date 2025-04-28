import { useRef, useCallback, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Job } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Printer, Share, Loader2 } from "lucide-react";
import { PrintableJobCard } from "./PrintableJobCard";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface PrintPreviewProps {
  job: Job;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deviceName: string;
  deviceModel: string;
  deviceCondition: string;
  problem: string;
  handlingFees: number;
  companyName: string;
  onBack: () => void;
}

export const PrintPreview = ({
  job,
  customerName,
  customerPhone,
  customerEmail,
  deviceName,
  deviceModel,
  deviceCondition,
  problem,
  handlingFees,
  companyName,
  onBack,
}: PrintPreviewProps) => {
  const jobCardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = useReactToPrint({
    documentTitle: `JobCard_${job?.job_card_number || "unknown"}`,
    onBeforeGetContent: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onBeforePrint: () => {
      document.body.classList.add('printing');
    },
    onAfterPrint: () => {
      document.body.classList.remove('printing');
      setIsPrinting(false);
      toast.success("Job card printed successfully");
    },
    onPrintError: () => {
      document.body.classList.remove('printing');
      setIsPrinting(false);
      toast.error("Failed to print job card");
    },
    removeAfterPrint: true,
    content: () => jobCardRef.current,
  });

  const generatePdf = useCallback(async () => {
    if (!jobCardRef.current) return null;

    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(jobCardRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      return pdf;
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
      return null;
    } finally {
      setIsGeneratingPdf(false);
    }
  }, []);

  const handleShare = useCallback(async () => {
    const pdf = await generatePdf();
    if (!pdf) return;

    try {
      const pdfBlob = pdf.output('blob');
      const pdfFile = new File([pdfBlob], `JobCard_${job.job_card_number}.pdf`, {
        type: 'application/pdf',
      });

      if (navigator.share && navigator.canShare?.({ files: [pdfFile] })) {
        await navigator.share({
          files: [pdfFile],
          title: `Job Card ${job.job_card_number}`,
          text: `Job card details for ${customerName}`,
        });
      } else {
        // Fallback for browsers that don't support sharing files
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
        toast.info("PDF downloaded as sharing isn't supported");
      }
    } catch (error) {
      console.error("Sharing error:", error);
      toast.error("Failed to share job card");
    }
  }, [generatePdf, job.job_card_number, customerName]);

  const handlePrintClick = useCallback(async () => {
    if (!jobCardRef.current) {
      toast.error("Print preparation failed. Please try again.");
      return;
    }
    
    try {
      await handlePrint();
    } catch (error) {
      console.error("Print error:", error);
      toast.error("Failed to print job card");
    }
  }, [handlePrint]);

  const handleDownloadPdf = useCallback(async () => {
    const pdf = await generatePdf();
    if (pdf) {
      pdf.save(`JobCard_${job.job_card_number}.pdf`);
      toast.success("PDF downloaded successfully");
    }
  }, [generatePdf, job.job_card_number]);

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 no-print">
        <h2 className="text-2xl font-bold">Job Card Preview</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button 
            variant="outline" 
            onClick={handleShare}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Share className="mr-2 h-4 w-4" />
            )}
            {isMobile ? "Share" : "Share Job Card"}
          </Button>
          <Button 
            onClick={handlePrintClick}
            disabled={isPrinting}
          >
            {isPrinting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Printer className="mr-2 h-4 w-4" />
            )}
            {isMobile ? "Print" : "Print Now"}
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Download PDF</span>
            )}
          </Button>
        </div>
      </div>
      
      <div id="printable-content" className="border rounded-lg shadow-sm bg-white p-0">
        <div ref={jobCardRef} id="print-content">
          <PrintableJobCard 
            job={job}
            customerName={customerName}
            customerPhone={customerPhone}
            customerEmail={customerEmail}
            deviceName={deviceName}
            deviceModel={deviceModel}
            deviceCondition={deviceCondition}
            problem={problem}
            handlingFees={handlingFees}
            companyName={companyName}
          />
        </div>
      </div>
    </div>
  );
};
