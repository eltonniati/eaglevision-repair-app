
import { useRef, useState } from "react";
import { Job } from "@/lib/types";
import { PrintableJobCard } from "./PrintableJobCard";
import { Button } from "@/components/ui/button";
import { Printer, Share, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShareDialog } from "@/components/invoice/ShareDialog";
import { downloadJobCardPdf } from "./utils/job-pdf-utils";
import { shareJobCard, emailJobCard } from "./utils/share-utils";

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
  companyLogoUrl?: string;
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
  companyLogoUrl,
}: JobPreviewModeProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const isMobile = useIsMobile();

  const onPrintButtonClick = async () => {
    console.log("Print button clicked - generating cellphone PDF for job:", job.job_card_number);
    setIsGeneratingPdf(true);
    await downloadJobCardPdf(printRef, job.job_card_number || "JobCard");
    setIsGeneratingPdf(false);
  };

  const handleShare = async () => {
    setIsGeneratingPdf(true);
    await shareJobCard(printRef, job.job_card_number || "", customerName);
    setIsGeneratingPdf(false);
    setIsShareDialogOpen(false);
  };

  const handleEmail = async () => {
    setIsGeneratingPdf(true);
    await emailJobCard(printRef, job.job_card_number || "", customerName, customerPhone);
    setIsGeneratingPdf(false);
    setIsShareDialogOpen(false);
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    await downloadJobCardPdf(printRef, job.job_card_number || "");
    setIsGeneratingPdf(false);
    setIsShareDialogOpen(false);
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
            onClick={onPrintButtonClick}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Printer className="mr-2 h-4 w-4" />
            )}
            {isMobile ? "Print PDF" : "Print PDF (Mobile)"}
          </Button>
        </div>
      </div>
      <div className="border rounded-lg shadow-sm bg-white p-0" id="print-content">
        <div ref={printRef} className="print-area">
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
            companyLogoUrl={companyLogoUrl}
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
