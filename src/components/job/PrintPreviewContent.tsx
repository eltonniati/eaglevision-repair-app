
import { Job } from "@/lib/types";
import { PrintableJobCardV2 } from "./PrintableJobCardV2";
import { forwardRef } from "react";

interface PrintPreviewContentProps {
  job: Job;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deviceName: string;
  deviceModel: string;
  deviceCondition: string;
  problem: string;
  handlingFees: number;
  // Removed companyName, companyLogoUrl
}

export const PrintPreviewContent = forwardRef<HTMLDivElement, PrintPreviewContentProps>(({
  job,
  customerName,
  customerPhone,
  customerEmail,
  deviceName,
  deviceModel,
  deviceCondition,
  problem,
  handlingFees,
}, ref) => {
  return (
    <div className="border rounded-lg shadow-sm bg-white p-0" id="print-content">
      <div ref={ref} className="print-area">
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
        />
      </div>
    </div>
  );
});

PrintPreviewContent.displayName = "PrintPreviewContent";
