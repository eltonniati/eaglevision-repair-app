
import { Job } from "@/lib/types";
import { PrintPreview } from "./PrintPreview";
import { ShareDialog } from "@/components/invoice/ShareDialog";
import { useState } from "react";

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
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  
  const handleShare = () => {
    const text = `Job Card #${job.job_card_number} for ${customerName}\nDevice: ${deviceName} ${deviceModel}\nProblem: ${problem}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Job Card #${job.job_card_number}`,
        text: text
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
    setIsShareDialogOpen(false);
  };
  
  const handleEmail = () => {
    const subject = `Job Card #${job.job_card_number} for ${customerName}`;
    const body = `Job Card #${job.job_card_number}\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\nEmail: ${customerEmail}\n\nDevice: ${deviceName} ${deviceModel}\nCondition: ${deviceCondition}\n\nProblem: ${problem}\n\nHandling Fees: ${handlingFees}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsShareDialogOpen(false);
  };

  return (
    <>
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
        onShare={() => setIsShareDialogOpen(true)}
      />
      
      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        onShare={handleShare}
        onEmail={handleEmail}
        invoiceNumber={job.job_card_number || ""}
      />
    </>
  );
};
