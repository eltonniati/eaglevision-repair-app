
import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { useLanguage } from "@/contexts/LanguageContext";
import { Job } from "@/lib/types";
import JobCardEditForm from "@/components/job/JobCardEditForm";
import { JobCardsHeader } from "@/components/job/JobCardsHeader";
import { JobCardsError } from "@/components/job/JobCardsError";
import { JobCardsContent } from "@/components/job/JobCardsContent";

// --- NEW: Filtering by status from location.state ---
const getJobStatusByLabel = (label: string, t: any) => {
  // Map the dashboard label back to the actual JobStatus value
  if ([t.inProgress, "In Progress"].includes(label)) return "In Progress";
  if ([t.completed, "Completed", "Finished"].includes(label)) return "Finished";
  if ([t.waitingForParts, "Waiting for Parts"].includes(label)) return "Waiting for Parts";
  return null;
};

const JobCards = () => {
  const { jobs, loading, error, clearJob } = useJobs();
  const { companies, loading: companiesLoading } = useCompanies();
  const { t } = useLanguage();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // --- NEW: Get the status filter from navigation ---
  const location = useLocation();
  const statusLabel = location?.state?.status || null;
  const navigate = useNavigate();

  // Check if we're in edit mode or create mode
  const isEditMode = window.location.pathname.includes('/edit');
  const isCreateMode = window.location.pathname.includes('/new');

  // --- NEW: Compute filter based on status ---
  const statusFilter = useMemo(() => {
    if (!statusLabel) return null;
    return getJobStatusByLabel(statusLabel, t);
  }, [statusLabel, t]);

  // --- NEW: Filter jobs for display ---
  const filteredJobs = useMemo(() => {
    if (!statusFilter) return jobs;
    return jobs.filter(job => job.details.status === statusFilter);
  }, [jobs, statusFilter]);

  useEffect(() => {
    // Focus/scroll to top when filter changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [statusLabel]);

  // Clear job data when component unmounts or navigates away
  useEffect(() => {
    return () => {
      if (selectedJob) {
        setSelectedJob(null);
      }
    };
  }, [selectedJob]);

  console.log("JobCards component state:", { 
    jobsCount: jobs.length, 
    loading, 
    error,
    isEditMode,
    isCreateMode 
  });

  const getCompanyName = (companyId?: string) => {
    if (!companyId || companiesLoading) return "";
    return companies.find(c => c.id === companyId)?.name || "";
  };

  const getCompanyLogo = (companyId?: string) => {
    if (!companyId || companiesLoading) return "";
    return companies.find(c => c.id === companyId)?.logo_url || "";
  };

  const handlePreviewJob = (job: Job) => {
    setSelectedJob(job);
  };

  // Callback to go to dashboard from print preview/share dialog
  const backToDashboard = () => {
    // Clear job data before navigating
    if (clearJob) {
      clearJob();
    }
    setSelectedJob(null);
    navigate("/dashboard");
  };

  if (error) {
    return (
      <JobCardsError 
        error={error}
        onBack={backToDashboard}
        t={t}
      />
    );
  }

  // Render the edit form if we're in edit or create mode
  if (isEditMode || isCreateMode) {
    return <JobCardEditForm />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <JobCardsHeader onBack={backToDashboard} t={t} />

      <JobCardsContent
        filteredJobs={filteredJobs}
        loading={loading}
        getCompanyName={getCompanyName}
        getCompanyLogo={getCompanyLogo}
        onPreview={handlePreviewJob}
        t={t}
      />
    </div>
  );
};

export default JobCards;
