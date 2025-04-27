
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { Job } from "@/lib/types";
import { Plus } from "lucide-react";
import { JobCardList } from "@/components/job/JobCardList";
import { PrintPreview } from "@/components/job/PrintPreview";
import { ShareDialog } from "@/components/invoice/ShareDialog";

const JobCards = () => {
  const { jobs, loading, error, fetchJobs } = useJobs();
  const { companies } = useCompanies();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const getCompanyName = (companyId?: string) => {
    return companies.find(c => c.id === companyId)?.name || "";
  };

  const handlePreviewJob = (job: Job) => {
    setSelectedJob(job);
    setIsPreviewMode(true);
  };

  const handleShare = () => {
    if (!selectedJob) return;
    
    const text = `Job Card #${selectedJob.job_card_number} for ${selectedJob.customer.name}\nDevice: ${selectedJob.device.name} ${selectedJob.device.model}\nProblem: ${selectedJob.details.problem}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Job Card #${selectedJob.job_card_number}`,
        text: text
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
    setIsShareDialogOpen(false);
  };
  
  const handleEmail = () => {
    if (!selectedJob) return;
    
    const subject = `Job Card #${selectedJob.job_card_number} for ${selectedJob.customer.name}`;
    const body = `Job Card #${selectedJob.job_card_number}\n\nCustomer: ${selectedJob.customer.name}\nPhone: ${selectedJob.customer.phone}\nEmail: ${selectedJob.customer.email || ""}\n\nDevice: ${selectedJob.device.name} ${selectedJob.device.model}\nCondition: ${selectedJob.device.condition}\n\nProblem: ${selectedJob.details.problem}\n\nHandling Fees: ${selectedJob.details.handling_fees}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsShareDialogOpen(false);
  };

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="text-center p-6">
          <h2 className="text-2xl font-semibold text-destructive">Error</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
          <Button onClick={fetchJobs} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {isPreviewMode && selectedJob ? (
        <PrintPreview
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
          onBack={() => setIsPreviewMode(false)}
          onShare={() => setIsShareDialogOpen(true)}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Job Cards</h1>
            <Link to="/job-cards/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Job Card
              </Button>
            </Link>
          </div>

          <JobCardList 
            jobs={jobs}
            loading={loading}
            onPreview={handlePreviewJob}
          />
        </>
      )}
      
      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        onShare={handleShare}
        onEmail={handleEmail}
        invoiceNumber={selectedJob?.job_card_number || ""}
      />
    </div>
  );
};

export default JobCards;
