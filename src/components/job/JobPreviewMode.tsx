
import { useState } from "react";
import { Job } from "@/lib/types";
import { JobPrintPreview } from "./JobPrintPreview";
import { ShareDialog } from "@/components/invoice/ShareDialog";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

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
  companyLogo: string;
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
  companyLogo,
  onBack
}: JobPreviewModeProps) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleShare = async (): Promise<void> => {
    try {
      const text = `Job Card #${job.job_card_number} for ${customerName}\nDevice: ${deviceName} ${deviceModel}\nProblem: ${problem}\nContact: ${customerPhone}`;
      
      if (navigator.share) {
        await navigator.share({
          title: `Job Card #${job.job_card_number}`,
          text: text
        }).then(() => {
          toast.success("Job card shared successfully");
        }).catch(err => {
          console.error('Error sharing:', err);
          // Fallback if share fails
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
          toast.success("Opening share options");
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
        toast.success("Opening share options");
      }
    } catch (error) {
      console.error("Share error:", error);
      toast.error("Failed to share job card");
    }
    setIsShareDialogOpen(false);
  };
  
  const handleEmail = async (): Promise<void> => {
    try {
      const subject = `Job Card #${job.job_card_number} for ${customerName}`;
      const body = `Job Card #${job.job_card_number}\n\nCustomer: ${customerName}\nPhone: ${customerPhone}\nEmail: ${customerEmail}\n\nDevice: ${deviceName} ${deviceModel}\nCondition: ${deviceCondition}\n\nProblem: ${problem}\n\nHandling Fees: ${handlingFees}\n\nCompany: ${companyName}`;
      
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      toast.success("Email client opened");
    } catch (error) {
      console.error("Email error:", error);
      toast.error("Failed to open email client");
    }
    setIsShareDialogOpen(false);
    return Promise.resolve();
  };

  return (
    <>
      <JobPrintPreview
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
        companyLogo={companyLogo}
        status={job.details.status}
        onBack={onBack}
        onShare={() => setIsShareDialogOpen(true)}
      />
      
      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        onShare={handleShare}
        onEmail={handleEmail}
        invoiceNumber={job.job_card_number || ""}
        invoiceName={`${customerName}'s ${deviceName}`}
      />
    </>
  );
};
