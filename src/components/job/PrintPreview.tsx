
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Job } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Printer, Share } from "lucide-react";
import { PrintableJobCard } from "./PrintableJobCard";
import { toast } from "sonner";

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

  const handlePrint = useReactToPrint({
    documentTitle: `JobCard_${job?.job_card_number || "unknown"}`,
    content: () => jobCardRef.current,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 15mm;
      }
      @media print {
        html, body {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden;
          background: white !important;
        }
        body * {
          visibility: hidden;
        }
        #printable-content, #printable-content * {
          visibility: visible !important;
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .no-print {
          display: none !important;
        }
        #printable-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
      }
    `,
    onBeforeGetContent: () => {
      console.log("Preparing content for printing...");
      return Promise.resolve();
    },
    onBeforePrint: () => {
      document.body.classList.add('printing');
      console.log("Print started...");
      return Promise.resolve();
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
  });

  // Create a proper click handler function that calls handlePrint
  const onPrintButtonClick = () => {
    console.log("Print button clicked, jobCardRef exists:", !!jobCardRef.current);
    if (jobCardRef.current) {
      handlePrint();
    } else {
      console.error("Print reference not available");
      toast.error("Print preparation failed. Please try again.");
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4 no-print">
        <h2 className="text-2xl font-bold">Job Card Preview</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          {onShare && (
            <Button variant="outline" onClick={onShare}>
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
          )}
          <Button onClick={onPrintButtonClick}>
            <Printer className="mr-2 h-4 w-4" />
            Print Now
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
