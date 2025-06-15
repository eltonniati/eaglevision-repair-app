
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Share2 } from "lucide-react";
import { Job } from "@/lib/types";
import { downloadJobCardPdf } from "./utils/job-pdf-utils";
import { PrintableJobCard } from "./PrintableJobCard";
import { useRef } from "react";

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
  status: string;
  onBack: () => void;
  onShare: () => void;
  companyLogoUrl?: string;
}

export function JobPrintPreview({
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
  status,
  onBack,
  onShare,
  companyLogoUrl,
}: JobPrintPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrintClick = async () => {
    console.log("Print button clicked for job card:", job.job_card_number);
    await downloadJobCardPdf(printRef, job.job_card_number || "JobCard");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center no-print">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handlePrintClick}>
            <Printer className="mr-2 h-4 w-4" />
            Print PDF
          </Button>
        </div>
      </div>
      <div className="print-content bg-white p-6 rounded-lg shadow-sm print:p-0 print:shadow-none">
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
            companyLogoUrl={companyLogoUrl}
          />
        </div>
      </div>
    </div>
  );
}
