
import { useState } from "react";
import { Job, Company } from "@/lib/types";
import { JobCardList } from "./JobCardList";
import { JobPrintPreview } from "./JobPrintPreview";
import { ShareDialog } from "@/components/invoice/ShareDialog";

interface JobCardsContentProps {
  filteredJobs: Job[];
  loading: boolean;
  companies: Company[];
  getCompanyName: (companyId?: string) => string;
  getCompanyLogo: (companyId?: string) => string;
  onPreview: (job: Job) => void;
  t: any;
}

export const JobCardsContent = ({ 
  filteredJobs, 
  loading, 
  companies,
  getCompanyName,
  getCompanyLogo,
  onPreview,
  t 
}: JobCardsContentProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const getCompany = (companyId?: string): Company | null => {
    if (!companyId || !companies.length) return null;
    return companies.find((c: Company) => c.id === companyId) || null;
  };

  const handlePreviewJob = (job: Job) => {
    console.log("Preview job selected:", job.job_card_number);
    console.log("Company for job:", getCompany(job.company_id));
    setSelectedJob(job);
    setIsPreviewMode(true);
    onPreview(job);
  };

  const handleShare = async (): Promise<void> => {
    if (!selectedJob) return Promise.resolve();
    
    try {
      const text = `Job Card #${selectedJob.job_card_number} for ${selectedJob.customer.name}\nDevice: ${selectedJob.device.name} ${selectedJob.device.model}\nProblem: ${selectedJob.details.problem}`;
      
      if (navigator.share) {
        await navigator.share({
          title: `Job Card #${selectedJob.job_card_number}`,
          text: text
        });
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
    
    setIsShareDialogOpen(false);
    return Promise.resolve();
  };
  
  const handleEmail = async (): Promise<void> => {
    if (!selectedJob) return Promise.resolve();
    
    try {
      const company = getCompany(selectedJob.company_id);
      const subject = `Job Card #${selectedJob.job_card_number} for ${selectedJob.customer.name}`;
      const body = `Job Card #${selectedJob.job_card_number}\n\nCustomer: ${selectedJob.customer.name}\nPhone: ${selectedJob.customer.phone}\nEmail: ${selectedJob.customer.email || ""}\n\nDevice: ${selectedJob.device.name} ${selectedJob.device.model}\nCondition: ${selectedJob.device.condition}\n\nProblem: ${selectedJob.details.problem}\n\nHandling Fees: ${selectedJob.details.handling_fees}\n\nCompany: ${company?.name || "N/A"}`;
      
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } catch (error) {
      console.error("Email error:", error);
    }
    
    setIsShareDialogOpen(false);
    return Promise.resolve();
  };

  const handleBackToJobList = () => {
    setSelectedJob(null);
    setIsPreviewMode(false);
  };

  if (isPreviewMode && selectedJob) {
    return (
      <>
        <JobPrintPreview
          job={selectedJob}
          customerName={selectedJob.customer.name}
          customerPhone={selectedJob.customer.phone}
          customerEmail={selectedJob.customer.email || ""}
          deviceName={selectedJob.device.name}
          deviceModel={selectedJob.device.model}
          deviceCondition={selectedJob.device.condition}
          problem={selectedJob.details.problem}
          handlingFees={selectedJob.details.handling_fees}
          company={getCompany(selectedJob.company_id)}
          status={selectedJob.details.status}
          onBack={handleBackToJobList}
          onShare={() => setIsShareDialogOpen(true)}
        />
        <ShareDialog
          open={isShareDialogOpen}
          onOpenChange={(open: boolean) => {
            setIsShareDialogOpen(open);
            if (!open && isPreviewMode) {
              handleBackToJobList();
            }
          }}
          onShare={handleShare}
          onEmail={handleEmail}
          invoiceNumber={selectedJob?.job_card_number || ""}
        />
      </>
    );
  }

  return (
    <JobCardList 
      jobs={filteredJobs}
      loading={loading}
      onPreview={handlePreviewJob}
    />
  );
};
