
import { useRef, useState } from "react";
import { Job } from "@/lib/types";
import { PrintPreviewHeader } from "./PrintPreviewHeader";
import { PrintPreviewContent } from "./PrintPreviewContent";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShareDialog } from "@/components/invoice/ShareDialog";
import { usePrintJob } from "./utils/print-utils";
import { shareJobCard, emailJobCard } from "./utils/share-utils";
import { downloadPdf } from "./utils/pdf-utils";

interface JobPrintPreviewProps {
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
  onShare: () => void;
}

export const JobPrintPreview = ({
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
  onShare
}: JobPrintPreviewProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const isMobile = useIsMobile();

  // Print functionality
  const { onPrintButtonClick } = usePrintJob(printRef, job.job_card_number || "unknown");

  // Share handlers
  const handleShare = async () => {
    setIsGeneratingPdf(true);
    await shareJobCard(printRef, job.job_card_number || "", customerName);
    setIsGeneratingPdf(false);
    setIsShareDialogOpen(false);
  };

  // Email handler
  const handleEmail = async () => {
    setIsGeneratingPdf(true);
    await emailJobCard(printRef, job.job_card_number || "", customerName, customerPhone);
    setIsGeneratingPdf(false);
    setIsShareDialogOpen(false);
  };

  // Download PDF handler
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    await downloadPdf(printRef, job.job_card_number || "");
    setIsGeneratingPdf(false);
    setIsShareDialogOpen(false);
  };

  return (
    <div className="mb-6">
      <PrintPreviewHeader
        title="Job Card Preview"
        onBack={onBack}
        onShare={() => setIsShareDialogOpen(true)}
        onPrint={onPrintButtonClick}
        isMobile={isMobile}
        isGeneratingPdf={isGeneratingPdf}
      />
      
      <PrintPreviewContent
        ref={printRef}
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
