
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { Job, JobStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Plus, Printer } from "lucide-react";

// Reuse the PrintableJobCard component
const PrintableJobCard = ({ 
  job, 
  customerName, 
  customerPhone, 
  customerEmail, 
  deviceName, 
  deviceModel, 
  deviceCondition, 
  problem,
  handlingFees,
  companyName
}: { 
  job: any, 
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  deviceName: string,
  deviceModel: string,
  deviceCondition: string,
  problem: string,
  handlingFees: number,
  companyName: string
}) => (
  <div className="p-6" id="printable-content">
    <div className="border-2 border-gray-200 p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">JOB CARD</h1>
          <p className="text-lg font-medium">#{job?.job_card_number}</p>
        </div>
        <div className="text-right">
          <p><strong>Created Date:</strong> {format(new Date(job?.created_at || new Date()), "MMMM d, yyyy")}</p>
          <p><strong>Status:</strong> {job?.details.status}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-lg font-semibold border-b mb-2">Company</h2>
          <p>{companyName}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold border-b mb-2">Customer</h2>
          <p>{customerName}</p>
          <p>{customerPhone}</p>
          <p>{customerEmail}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold border-b mb-2">Device</h2>
        <p><strong>Name:</strong> {deviceName}</p>
        <p><strong>Model:</strong> {deviceModel}</p>
        <p><strong>Condition:</strong> {deviceCondition}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold border-b mb-2">Details</h2>
        <p><strong>Problem:</strong> {problem}</p>
        <p><strong>Handling Fees:</strong> {new Intl.NumberFormat("en-ZA", {
          style: 'currency',
          currency: 'ZAR'
        }).format(handlingFees)}</p>
      </div>

      <div className="mt-6 text-sm text-center border-t pt-2">
        <p>Generated on: {format(new Date(), "MMMM d, yyyy HH:mm")}</p>
      </div>
    </div>
  </div>
);

const JobCards = () => {
  const navigate = useNavigate();
  const { jobs, loading, error, fetchJobs } = useJobs();
  const { companies } = useCompanies();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const jobCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const getCompanyName = (companyId?: string) => {
    // Use optional chaining with company_id since we've added it as optional
    return companies.find(c => c.id === companyId)?.name || "";
  };

  const handlePrintOrPDF = useReactToPrint({
    // Fix: Use documentTitle instead of content
    documentTitle: `JobCard_${selectedJob?.job_card_number || "unknown"}`,
    // Correct property is contentRef in react-to-print
    contentRef: () => jobCardRef.current,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 15mm;
      }
      @media print {
        body {
          background: white !important;
          color: black !important;
          visibility: hidden;
        }
        #printable-content, #printable-content * {
          visibility: visible;
        }
        .no-print {
          display: none !important;
        }
        a {
          text-decoration: none !important;
        }
        #printable-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 0;
        }
      }
    `,
    onBeforeGetContent: () => {
      document.body.classList.add('printing');
      return new Promise((resolve) => {
        // Small delay to ensure content is ready
        setTimeout(resolve, 300);
      });
    },
    onAfterPrint: () => {
      document.body.classList.remove('printing');
      setIsPreviewMode(false);
      toast.success("Job card printed successfully");
    },
    onPrintError: (error) => {
      console.error("Print error:", error);
      document.body.classList.remove('printing');
      toast.error("Failed to print job card");
      setIsPreviewMode(false);
    },
  });

  // Fix: Create a function that calls handlePrintOrPDF
  const handlePrintNow = () => {
    handlePrintOrPDF();
  };

  const handleViewDetail = (job: Job) => {
    navigate(`/job-cards/${job.id}`);
  };

  const handlePreviewJob = (job: Job) => {
    setSelectedJob(job);
    setIsPreviewMode(true);
  };

  const renderStatusBadge = (status: JobStatus) => {
    switch (status) {
      case "Finished":
        return <Badge className="bg-green-500">Finished</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "Waiting for Parts":
        return <Badge className="bg-amber-500">Waiting for Parts</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
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
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4 no-print">
            <h2 className="text-2xl font-bold">Job Card Preview</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsPreviewMode(false)}>
                Back to Job Cards
              </Button>
              <Button onClick={handlePrintNow}>
                <Printer className="mr-2 h-4 w-4" />
                Print Now
              </Button>
            </div>
          </div>
          
          <div ref={jobCardRef} className="border rounded-lg shadow-sm bg-white">
            <PrintableJobCard 
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
            />
          </div>
        </div>
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

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Loading job cards...</p>
            </div>
          ) : jobs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64">
                <p className="text-muted-foreground mb-4">No job cards found</p>
                <Link to="/job-cards/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Job Card
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {jobs.map(job => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">#{job.job_card_number} - {job.customer.name}</CardTitle>
                        <CardDescription>
                          {format(new Date(job.created_at!), "MMM d, yyyy")} • {job.device.name} {job.device.model}
                        </CardDescription>
                      </div>
                      <div>
                        {renderStatusBadge(job.details.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm line-clamp-2">{job.details.problem}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="ghost" size="sm" onClick={() => handlePreviewJob(job)}>
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleViewDetail(job)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobCards;
