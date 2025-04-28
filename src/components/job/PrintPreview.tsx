
import { useRef, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { Job } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Printer, Share } from "lucide-react";
import { PrintableJobCard } from "./PrintableJobCard";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

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
  onShare?: () => void;
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
  onShare
}: PrintPreviewProps) => {
  const jobCardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handlePrint = useReactToPrint({
    documentTitle: `JobCard_${job?.job_card_number || "unknown"}`,
    onBeforeGetContent: async () => {
      console.log("Preparing content for printing...");
      return Promise.resolve();
    },
    onBeforePrint: () => {
      document.body.classList.add('printing');
      console.log("Print started...");
    },
    onAfterPrint: () => {
      document.body.classList.remove('printing');
      console.log("Print completed successfully");
      toast.success("Job card printed successfully");
    },
    onPrintError: (error) => {
      console.error("Print error:", error);
      document.body.classList.remove('printing');
      toast.error("Failed to print job card");
    },
    removeAfterPrint: true,
    content: () => jobCardRef.current,
  });

  const onPrintButtonClick = useCallback(async () => {
    console.log("Print button clicked, jobCardRef exists:", !!jobCardRef.current);
    if (jobCardRef.current) {
      await handlePrint();
    } else {
      console.error("Print reference not available");
      toast.error("Print preparation failed. Please try again.");
    }
  }, [handlePrint]);

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 no-print">
        <h2 className="text-2xl font-bold">Job Card Preview</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          {onShare && (
            <Button variant="outline" onClick={onShare}>
              <Share className="mr-2 h-4 w-4" />
              {isMobile ? "Share" : "Share Job Card"}
            </Button>
          )}
          <Button onClick={onPrintButtonClick}>
            <Printer className="mr-2 h-4 w-4" />
            {isMobile ? "Print" : "Print Now"}
          </Button>
        </div>
      </div>
      
      <div id="printable-content" className="border rounded-lg shadow-sm bg-white p-0">
        <div ref={jobCardRef}>
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
