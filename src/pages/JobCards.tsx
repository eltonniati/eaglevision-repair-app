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

const getJobStatusByLabel = (label: string, t: any) => {
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
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const location = useLocation();
  const statusLabel = location?.state?.status || null;
  const navigate = useNavigate();

  const statusFilter = useMemo(() => {
    if (!statusLabel) return null;
    return getJobStatusByLabel(statusLabel, t);
  }, [statusLabel, t]);

  const filteredJobs = useMemo(() => {
    if (!statusFilter) return jobs;
    return jobs.filter(job => job.details.status === statusFilter);
  }, [jobs, statusFilter]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [statusLabel]);

  useEffect(() => {
    return () => {
      if (selectedJob) {
        setSelectedJob(null);
        setIsPreviewMode(false);
      }
    };
  }, [selectedJob]);

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

  const backToDashboard = () => {
    if (clearJob) clearJob();
    setSelectedJob(null);
    setIsPreviewMode(false);
    navigate("/dashboard");
  };

  const handleBackToJobList = () => {
    setSelectedJob(null);
    setIsPreviewMode(false);
  };

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
        <Button variant="ghost" className="mb-4 w-full sm:w-auto" onClick={backToDashboard}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.back} {t.dashboard}
        </Button>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.jobCards}</h1>
          <Link to="/job-cards/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              {t.createJobCard}
            </Button>
          </Link>
        </div>
        <div className="text-center p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-destructive">{t.errorLoadingJobCards}</h2>
          <p className="text-muted-foreground mt-2 break-words">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            {t.reloadPage}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <Button variant="ghost" className="mb-4 w-full sm:w-auto" onClick={backToDashboard}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t.back} {t.dashboard}
      </Button>

      {isPreviewMode && selectedJob ? (
        <div className="w-full overflow-x-auto">
          <div 
            className="bg-white p-4 sm:p-6 rounded-lg shadow-sm w-full max-w-[210mm] mx-auto"
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
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
              onBack={handleBackToJobList}
              onShare={() => setIsShareDialogOpen(true)}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.jobCards}</h1>
            <Link to="/job-cards/new" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                {t.createJobCard}
              </Button>
            </Link>
          </div>

          <div className="w-full overflow-x-auto">
            <JobCardList 
              jobs={filteredJobs}
              loading={loading}
              onPreview={handlePreviewJob}
            />
          </div>
        </>
      )}
      
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
    </div>
  );
};

export default JobCards;
