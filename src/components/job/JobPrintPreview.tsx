
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Share2 } from "lucide-react";
import { Job } from "@/lib/types";
import { handlePrint } from "./utils/print-utils";
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
}: JobPrintPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrintClick = () => {
    handlePrint(printRef, job.job_card_number || "unknown");
  };

  return (
    <div className="space-y-6">
      {/* Print controls (hidden when printing) */}
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
            Print
          </Button>
        </div>
      </div>

      {/* Printable content */}
      <div className="print-content bg-white p-6 rounded-lg shadow-sm print:p-0 print:shadow-none">
        <div ref={printRef}>
          <div className="mb-8 text-center print:mb-4">
            <h1 className="text-2xl font-bold print:text-xl">Job Card</h1>
            <p className="text-gray-600 print:text-gray-800">#{job.job_card_number}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print:grid-cols-2 print:gap-4 print:mb-4">
            {/* Customer Information */}
            <div className="print-card p-4 border rounded print:p-2 print:border-gray-300">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2 print:text-base print:mb-2 print:pb-1 print:border-gray-300">
                Customer Information
              </h2>
              <div className="space-y-2 print:space-y-1">
                <p><span className="font-medium">Name:</span> {customerName}</p>
                <p><span className="font-medium">Phone:</span> {customerPhone}</p>
                {customerEmail && <p><span className="font-medium">Email:</span> {customerEmail}</p>}
              </div>
            </div>

            {/* Device Information */}
            <div className="print-card p-4 border rounded print:p-2 print:border-gray-300">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2 print:text-base print:mb-2 print:pb-1 print:border-gray-300">
                Device Information
              </h2>
              <div className="space-y-2 print:space-y-1">
                <p><span className="font-medium">Device:</span> {deviceName}</p>
                <p><span className="font-medium">Model:</span> {deviceModel}</p>
                <p><span className="font-medium">Condition:</span> {deviceCondition}</p>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="print-card p-4 border rounded mb-8 print:p-2 print:border-gray-300 print:mb-4">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2 print:text-base print:mb-2 print:pb-1 print:border-gray-300">
              Job Details
            </h2>
            <div className="space-y-4 print:space-y-2">
              <p><span className="font-medium">Status:</span> {status}</p>
              <div>
                <p className="font-medium mb-2 print:mb-1">Problem Description:</p>
                <p className="whitespace-pre-line">{problem}</p>
              </div>
              <p><span className="font-medium">Handling Fees:</span> R{handlingFees.toFixed(2)}</p>
              {companyName && <p><span className="font-medium">Company:</span> {companyName}</p>}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t print:mt-4 print:pt-2 print:border-gray-300">
            <p>Thank you for your business!</p>
            <p className="mt-1 print:mt-0">Generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
