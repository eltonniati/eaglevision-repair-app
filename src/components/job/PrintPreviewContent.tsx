
import { Job } from "@/lib/types";
import { PrintableJobCard } from "./PrintableJobCard";
import { Signature } from "@/components/common/Signature";
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
  companyName: string;
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
  companyName,
}, ref) => {
  return (
    <div className="border rounded-lg shadow-sm bg-white p-0" id="print-content">
      <div ref={ref} className="print-area">
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
        <div className="no-print px-6 pb-6">
          <Signature />
        </div>
      </div>
    </div>
  );
});

PrintPreviewContent.displayName = "PrintPreviewContent";
