import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Printer } from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { JobNotFound } from "@/components/job/JobNotFound";
import { PrintDialog } from "@/components/invoice/PrintDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { PrintableJobCard } from "@/components/job/PrintableJobCard";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { job, loading, getJob, updateJob } = useJobs();
  const { companies, fetchCompanies } = useCompanies();
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const printableJobRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedJob, setEditedJob] = useState({
    problem: "",
    status: "In Progress" as const,
    handling_fees: 0,
    customer: {
      name: "",
      phone: "",
      email: "",
    },
    device: {
      name: "",
      model: "",
      condition: "",
    },
    company: {
      name: "",
    }
  });

  useEffect(() => {
    const loadJob = async () => {
      if (id) {
        try {
          const jobData = await getJob(id);
          if (!jobData) {
            toast.error("Job card not found");
          }
        } catch (error) {
          console.error("Error fetching job:", error);
          toast.error("Failed to load job card");
        }
      }
    };

    loadJob();
    fetchCompanies();
  }, [id]);

  useEffect(() => {
    if (job) {
      setEditedJob({
        problem: job.details.problem,
        status: job.details.status,
        handling_fees: job.details.handling_fees,
        customer: {
          name: job.customer.name,
          phone: job.customer.phone,
          email: job.customer.email || "",
        },
        device: {
          name: job.device.name,
          model: job.device.model,
          condition: job.device.condition,
        },
        company: {
          name: companies.find(c => c.id === job.company_id)?.name || ""
        }
      });
    }
  }, [job, companies]);

  const prepareForPrinting = () => {
    document.body.classList.add('is-printing');
    const dialogs = document.querySelectorAll('[role="dialog"]');
    dialogs.forEach(dialog => {
      dialog.classList.add('no-print');
    });
  };

  const cleanupAfterPrinting = () => {
    document.body.classList.remove('is-printing');
    setIsPrinting(false);
    setShowPrintDialog(false);
  };

  const handlePrintOrPDF = useReactToPrint({
    documentTitle: `JobCard_${job?.job_card_number || "unknown"}`,
    contentRef: printableJobRef,
    onBeforePrint: () => {
      setIsPrinting(true);
      return new Promise<void>((resolve) => {
        prepareForPrinting();
        setTimeout(resolve, 300);
      });
    },
    onAfterPrint: () => {
      cleanupAfterPrinting();
      toast.success("Job card printed/saved successfully");
    },
    onPrintError: (error) => {
      console.error("Print error:", error);
      cleanupAfterPrinting();
      toast.error("Failed to print job card");
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
    `,
  });

  const handleBackToList = () => {
    navigate("/job-cards");
  };

  const handleSave = async () => {
    if (!job) return;
    
    const updatedJob = {
      ...job,
      customer: {
        name: editedJob.customer.name,
        phone: editedJob.customer.phone,
        email: editedJob.customer.email,
      },
      device: {
        name: editedJob.device.name,
        model: editedJob.device.model,
        condition: editedJob.device.condition,
      },
      details: {
        problem: editedJob.problem,
        status: editedJob.status,
        handling_fees: editedJob.handling_fees,
      },
    };

    const success = await updateJob(job.id!, updatedJob);
    
    if (success) {
      toast.success("Job card updated successfully");
      setIsEditMode(false);
      return true;
    } else {
      toast.error("Failed to update job card");
      return false;
    }
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Loading job card...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return <JobNotFound onBack={handleBackToList} />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center mb-4 no-print">
          <Button variant="outline" size="sm" onClick={handleBackToList} className="no-print">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Job Cards
          </Button>
          
          <div className="flex gap-2">
            {isEditMode ? (
              <>
                <Button variant="default" size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditMode(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => setShowPrintDialog(true)}
                  className="no-print"
                >
                  <Printer className="mr-1 h-4 w-4" />
                  {isMobile ? "Save as PDF" : "Print Job Card"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsEditMode(true)}
                  className="no-print"
                >
                  Edit Job Card
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div 
          ref={printableJobRef} 
          id="print-content"
          className="print-content rounded-lg shadow-sm bg-white"
        >
          <PrintableJobCard 
            job={job}
            customerName={editedJob.customer.name}
            customerPhone={editedJob.customer.phone}
            customerEmail={editedJob.customer.email}
            deviceName={editedJob.device.name}
            deviceModel={editedJob.device.model}
            deviceCondition={editedJob.device.condition}
            problem={editedJob.problem}
            handlingFees={editedJob.handling_fees}
            companyName={editedJob.company.name}
          />
        </div>
      </div>

      <PrintDialog 
        open={showPrintDialog} 
        onOpenChange={setShowPrintDialog}
        onPrint={handlePrintOrPDF}
        showPreviewOption={false}
      />
    </div>
  );
};

export default JobDetail;
