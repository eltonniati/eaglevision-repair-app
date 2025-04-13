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

const JobCards = () => {
  const { jobs, loading, error, fetchJobs } = useJobs();
  const { companies } = useCompanies();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const getCompanyName = (companyId?: string) => {
    return companies.find(c => c.id === companyId)?.name || "";
  };

  const handlePreviewJob = (job: Job) => {
    setSelectedJob(job);
    setIsPreviewMode(true);
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
    </div>
  );
};

export default JobCards;
