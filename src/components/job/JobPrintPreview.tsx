
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Share2, Loader2 } from "lucide-react";
import { Job, Company } from "@/lib/types";
import { useRef, useState } from "react";
import { PrintableJobCard } from "./PrintableJobCard";
import { downloadJobCardPdf } from "./utils/jobcard-pdf-utils";
import { shareJobCard, emailJobCard, shareViaWhatsApp } from "./utils/jobcard-share-utils";
import { ShareDialog } from "@/components/invoice/ShareDialog";

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
  company: Company | null;
  status: string;
  onBack: () => void;
  onShare: () => void;
}

export function JobPrintPreview({
  job,
  company,
  onBack,
}: JobPrintPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const handlePrintClick = async () => {
    console.log("Print button clicked for job card:", job.job_card_number);
    setIsGeneratingPdf(true);
    try {
      await downloadJobCardPdf(printRef, job.job_card_number || "JobCard");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleShare = async (): Promise<void> => {
    setIsGeneratingPdf(true);
    try {
      await shareJobCard(printRef, job.job_card_number || "", job.customer.name);
    } finally {
      setIsGeneratingPdf(false);
      setIsShareDialogOpen(false);
    }
  };

  const handleEmail = async (): Promise<void> => {
    setIsGeneratingPdf(true);
    try {
      await emailJobCard(printRef, job.job_card_number || "", job.customer.name, job.customer.phone);
    } finally {
      setIsGeneratingPdf(false);
      setIsShareDialogOpen(false);
    }
  };

  const handleWhatsApp = async (): Promise<void> => {
    setIsGeneratingPdf(true);
    try {
      await shareViaWhatsApp(printRef, job.job_card_number || "", job.customer.name, job.customer.phone);
    } finally {
      setIsGeneratingPdf(false);
      setIsShareDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center no-print">
        <Button variant="ghost" onClick={onBack} disabled={isGeneratingPdf}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsShareDialogOpen(true)}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Share2 className="mr-2 h-4 w-4" />
            )}
            Share PDF
          </Button>
          <Button onClick={handlePrintClick} disabled={isGeneratingPdf}>
            {isGeneratingPdf ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Printer className="mr-2 h-4 w-4" />
            )}
            Print PDF
          </Button>
        </div>
      </div>
      
      <div className="print-content bg-white rounded-lg shadow-sm print:shadow-none">
        <div ref={printRef}>
          <PrintableJobCard 
            job={job}
            company={company}
          />
        </div>
      </div>

      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        onShare={handleShare}
        onEmail={handleEmail}
        onWhatsApp={handleWhatsApp}
        isGeneratingPdf={isGeneratingPdf}
        invoiceNumber={job.job_card_number || ""}
        invoiceName={`${job.customer.name}'s ${job.device.name}`}
      />
    </div>
  );
}
