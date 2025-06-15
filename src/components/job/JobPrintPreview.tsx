
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Share2 } from "lucide-react";
import { Job } from "@/lib/types";
import { downloadJobCardPdf } from "./utils/job-pdf-utils";
import { PrintableJobCardV2 } from "./PrintableJobCardV2";
import { useRef } from "react";
import { useCompany } from "@/hooks/use-company";

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
  onBack,
  onShare,
}: any) {
  const printRef = useRef<HTMLDivElement>(null);
  const { company } = useCompany();

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
          <PrintableJobCardV2 
            job={job}
            customerName={customerName}
            customerPhone={customerPhone}
            customerEmail={customerEmail}
            deviceName={deviceName}
            deviceModel={deviceModel}
            deviceCondition={deviceCondition}
            problem={problem}
            handlingFees={handlingFees}
            company={company}
          />
        </div>
      </div>
    </div>
  );
}
