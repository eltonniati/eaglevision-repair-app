
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { Job } from "@/lib/types";
import { Plus } from "lucide-react";
import { JobCardList } from "@/components/job/JobCardList";
import { JobPrintPreview } from "@/components/job/JobPrintPreview";
import { ShareDialog } from "@/components/invoice/ShareDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Share2 } from "lucide-react";

export function JobPrintPreview({
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
  status,
  onBack,
  onShare,
}: {
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
  status: string;
  onBack: () => void;
  onShare: () => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Print controls (hidden when printing) */}
      <div className="flex justify-between items-center no-print">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Printable content */}
      <div className="print-content bg-white p-6 rounded-lg shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Job Card</h1>
          <p className="text-gray-600">#{job.job_card_number}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Customer Information */}
          <div className="print-card p-4 border rounded">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Customer Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {customerName}</p>
              <p><span className="font-medium">Phone:</span> {customerPhone}</p>
              {customerEmail && <p><span className="font-medium">Email:</span> {customerEmail}</p>}
            </div>
          </div>

          {/* Device Information */}
          <div className="print-card p-4 border rounded">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Device Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Device:</span> {deviceName}</p>
              <p><span className="font-medium">Model:</span> {deviceModel}</p>
              <p><span className="font-medium">Condition:</span> {deviceCondition}</p>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="print-card p-4 border rounded mb-8">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Job Details</h2>
          <div className="space-y-4">
            <p><span className="font-medium">Status:</span> {status}</p>
            <div>
              <p className="font-medium mb-2">Problem Description:</p>
              <p className="whitespace-pre-line">{problem}</p>
            </div>
            <p><span className="font-medium">Handling Fees:</span> R{handlingFees.toFixed(2)}</p>
            {companyName && <p><span className="font-medium">Company:</span> {companyName}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t">
          <p>Thank you for your business!</p>
          <p className="mt-1">Generated on {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
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
        // Fallback for browsers that don't support Web Share API
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
