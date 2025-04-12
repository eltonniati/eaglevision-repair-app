
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
import { JobDetailHeader } from "@/components/job/JobDetailHeader";
import { JobDetailContent } from "@/components/job/JobDetailContent";
import { JobDetailSkeleton } from "@/components/job/JobDetailSkeleton";
import { JobStatus } from "@/lib/types";

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
    status: "In Progress" as JobStatus, // Update the type to accept all JobStatus values
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
  }, [id, getJob, fetchCompanies]);

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
    if (!job) return false;
    
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
    return <JobDetailSkeleton />;
  }

  if (!job) {
    return <JobNotFound onBack={handleBackToList} />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
      <JobDetailHeader 
        onBack={handleBackToList}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        handleSave={handleSave}
        handlePrint={() => setShowPrintDialog(true)}
        isMobile={isMobile}
      />
      
      <JobDetailContent 
        job={job}
        editedJob={editedJob}
        printableRef={printableJobRef}
      />

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
