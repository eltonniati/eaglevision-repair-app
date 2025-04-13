
import { Job } from "@/lib/types";
import { PrintPreview } from "./PrintPreview";

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
  onBack
}: JobPreviewModeProps) => {
  return (
    <PrintPreview
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
      onBack={onBack}
    />
  );
};
