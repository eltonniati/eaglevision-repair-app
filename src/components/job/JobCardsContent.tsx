
import { useState } from "react";
import { Job, Company } from "@/lib/types";
import { JobCardList } from "./JobCardList";
import { JobPrintPreview } from "./JobPrintPreview";

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
  onPreview,
}: JobCardsContentProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

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

  const handleBackToJobList = () => {
    setSelectedJob(null);
    setIsPreviewMode(false);
  };

  if (isPreviewMode && selectedJob) {
    return (
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
        onShare={() => {}}
      />
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
