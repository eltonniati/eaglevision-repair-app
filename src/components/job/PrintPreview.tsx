import { useRef, useState } from "react";
import { Job } from "@/lib/types";
import { PrintableJobCard } from "./PrintableJobCard";
import { Button } from "@/components/ui/button";
import { Printer, Share, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ShareDialog } from "@/components/invoice/ShareDialog";

interface JobPreviewModeProps {
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

export const JobPreviewMode = ({
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
}: JobPreviewModeProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const isMobile = useIsMobile();

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `JobCard_${job.job_card_number || "unknown"}`,
    onBeforeGetContent: () => toast.info("Preparing document for printing..."),
    onAfterPrint: () => toast.success("Printed successfully"),
    onPrintError: () => toast.error("Failed to print"),
  });

  // PDF generation
  const generatePdf = async () => {
    if (!printRef.current) return null;
    
    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
      });

      const imgData = canvas.toDataURL('image/png');
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
  };

  // Share functionality
  const handleShare = async () => {
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
        toast.info("PDF opened in new tab");
      }
    } catch (error) {
      console.error("Sharing error:", error);
      toast.error("Failed to share job card");
    }
  };

  // Email functionality
  const handleEmail = async () => {
    const pdf = await generatePdf();
    if (!pdf) return;

    try {
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      const subject = `Job Card #${job.job_card_number} - ${customerName}`;
      const body = `Please find attached the job card details.\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\nDevice: ${deviceName} ${deviceModel}`;
      
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&attachment=${pdfUrl}`;
    } catch (error) {
      console.error("Email error:", error);
      toast.error("Failed to prepare email");
    }
  };

  // PDF download
  const handleDownloadPdf = async () => {
    const pdf = await generatePdf();
    if (pdf) {
      pdf.save(`JobCard_${job.job_card_number}.pdf`);
      toast.success("PDF downloaded successfully");
    }
  };

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
            onClick={() => setIsShareDialogOpen(true)}
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
            onClick={handlePrint}
            disabled={isGeneratingPdf}
          >
            <Printer className="mr-2 h-4 w-4" />
            {isMobile ? "Print" : "Print Now"}
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg shadow-sm bg-white p-0">
        <div ref={printRef}>
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

      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        onShare={handleShare}
        onEmail={handleEmail}
        onDownloadPdf={handleDownloadPdf}
        isGeneratingPdf={isGeneratingPdf}
        invoiceNumber={job.job_card_number || ""}
        invoiceName={`${customerName}'s ${deviceName}`}
      />
    </div>
  );
};
