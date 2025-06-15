
import { useState, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { useLanguage } from "@/contexts/LanguageContext";
import { Job } from "@/lib/types";
import { Plus, ArrowLeft } from "lucide-react";
import { JobCardList } from "@/components/job/JobCardList";
import { JobPrintPreview } from "@/components/job/JobPrintPreview";
import { ShareDialog } from "@/components/invoice/ShareDialog";

// --- NEW: Filtering by status from location.state ---
const getJobStatusByLabel = (label: string, t: any) => {
  // Map the dashboard label back to the actual JobStatus value
  if ([t.inProgress, "In Progress"].includes(label)) return "In Progress";
  if ([t.completed, "Completed", "Finished"].includes(label)) return "Finished";
  if ([t.waitingForParts, "Waiting for Parts"].includes(label)) return "Waiting for Parts";
  return null;
};

const JobCards = () => {
  const { jobs, loading, error } = useJobs();
  const { companies, loading: companiesLoading } = useCompanies();
  const { t } = useLanguage();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  // --- NEW: Get the status filter from navigation ---
  const location = useLocation();
  const statusLabel = location?.state?.status || null;
  const navigate = useNavigate();

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

  console.log("JobCards component state:", { 
    jobsCount: jobs.length, 
    loading, 
    error,
    isPreviewMode 
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
    console.log("Preview job selected:", job.job_card_number);
    setSelectedJob(job);
    setIsPreviewMode(true);
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
      const subject = `Job Card #${selectedJob.job_card_number} for ${selectedJob.customer.name}`;
      const body = `Job Card #${selectedJob.job_card_number}\n\nCustomer: ${selectedJob.customer.name}\nPhone: ${selectedJob.customer.phone}\nEmail: ${selectedJob.customer.email || ""}\n\nDevice: ${selectedJob.device.name} ${selectedJob.device.model}\nCondition: ${selectedJob.device.condition}\n\nProblem: ${selectedJob.details.problem}\n\nHandling Fees: ${selectedJob.details.handling_fees}`;
      
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } catch (error) {
      console.error("Email error:", error);
    }
    
    setIsShareDialogOpen(false);
    return Promise.resolve();
  };

  // Callback to go to dashboard from print preview/share dialog
  const backToDashboard = () => {
    navigate("/dashboard");
  };

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {/* Back to Dashboard Button */}
        <Button variant="ghost" className="mb-4" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.back} {t.dashboard}
        </Button>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{t.jobCards}</h1>
          <Link to="/job-cards/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t.createJobCard}
            </Button>
          </Link>
        </div>
        <div className="text-center p-6">
          <h2 className="text-2xl font-semibold text-destructive">{t.errorLoadingJobCards}</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">{t.reloadPage}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Back to Dashboard Button */}
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t.back} {t.dashboard}
      </Button>

      {isPreviewMode && selectedJob ? (
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
          companyName={getCompanyName(selectedJob.company_id)}
          companyLogo={getCompanyLogo(selectedJob.company_id)}
          status={selectedJob.details.status}
          onBack={backToDashboard}
          onShare={() => setIsShareDialogOpen(true)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">{t.jobCards}</h1>
            <Link to="/job-cards/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t.createJobCard}
              </Button>
            </Link>
          </div>

          <JobCardList 
            jobs={filteredJobs}
            loading={loading}
            onPreview={handlePreviewJob}
          />
        </>
      )}
      
      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={(open: boolean) => {
          setIsShareDialogOpen(open);
          if (!open) {
            navigate("/dashboard");
          }
        }}
        onShare={handleShare}
        onEmail={handleEmail}
        invoiceNumber={selectedJob?.job_card_number || ""}
      />
    </div>
  );
};

export default JobCards;
