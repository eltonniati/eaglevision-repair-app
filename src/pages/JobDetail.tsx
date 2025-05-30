import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { JobDetails } from "@/components/job/JobDetails";
import { JobPreviewMode } from "@/components/job/JobPreviewMode";
import { JobLoading } from "@/components/job/JobLoading";
import { JobError } from "@/components/job/JobError";
import { JobDialogs } from "@/components/job/JobDialogs";
import { JobCardNotFound } from "@/components/job/JobCardNotFound";
import { useJobEditor } from "@/hooks/use-job-editor";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { job, loading, error, getJob, deleteJob } = useJobs();
  const { companies, fetchCompanies } = useCompanies();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const {
    isEditMode,
    isSaving,
    editedProblem,
    editedStatus,
    editedHandlingFees,
    editedCompanyName,
    editedCustomerName,
    editedCustomerPhone,
    editedCustomerEmail,
    editedDeviceName,
    editedDeviceModel,
    editedDeviceCondition,
    setEditedHandlingFees,
    initializeFormData,
    handleEditToggle,
    handleStatusChange,
    handleSave
  } = useJobEditor(job);

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
        } finally {
          setLoadingComplete(true);
        }
      }
    };
    loadJob();
    fetchCompanies();
  }, [id, getJob, fetchCompanies]);

  useEffect(() => {
    if (job && companies.length > 0) {
      const companyName = companies.find(c => c.id === job.company_id)?.name || "";
      initializeFormData(job, companyName);
    }
  }, [job, companies, initializeFormData]);

  const handleDelete = async () => {
    if (!job) return;

    const success = await deleteJob(job.id!);
    
    if (success) {
      toast.success("Job card deleted successfully");
      navigate("/job-cards");
    } else {
      toast.error("Failed to delete job card");
    }
    setIsDeleteDialogOpen(false);
  };

  const handleShare = async (): Promise<void> => {
    if (!job) return Promise.resolve();
    
    const text = `Job Card #${job.job_card_number} for ${editedCustomerName}\nDevice: ${editedDeviceName} ${editedDeviceModel}\nProblem: ${editedProblem}\nContact: ${editedCustomerPhone}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Job Card #${job.job_card_number}`,
          text: text
        });
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
      }
    } catch (err) {
      console.error('Error sharing:', err);
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
    
    setIsShareDialogOpen(false);
    return Promise.resolve();
  };
  
  const handleEmail = async (): Promise<void> => {
    if (!job) return Promise.resolve();
    
    try {
      const subject = `Job Card #${job.job_card_number} for ${editedCustomerName}`;
      const body = `Job Card #${job.job_card_number}\n\nCustomer: ${editedCustomerName}\nPhone: ${editedCustomerPhone}\nEmail: ${editedCustomerEmail}\n\nDevice: ${editedDeviceName} ${editedDeviceModel}\nCondition: ${editedDeviceCondition}\n\nProblem: ${editedProblem}\n\nHandling Fees: ${editedHandlingFees}\n\nCompany: ${editedCompanyName}`;
      
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } catch (error) {
      console.error("Email error:", error);
    }
    
    setIsShareDialogOpen(false);
    return Promise.resolve();
  };

  const handlePrint = async () => {
    setIsPrintDialogOpen(false);
    
    if (isEditMode) {
      const saveSuccess = await handleSave();
      if (!saveSuccess) {
        toast.error("Please save your changes before printing");
        return;
      }
    }
    
    setTimeout(() => {
      setIsPreviewMode(true);
    }, 100);
  };

  if (error) {
    return <JobError error={error} />;
  }

  if (loading && !loadingComplete) {
    return <JobLoading />;
  }

  if (loadingComplete && !job) {
    return <JobCardNotFound onBack={() => navigate("/job-cards")} />;
  }

  if (!job) {
    return <JobLoading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/job-cards")} 
        className="mb-6 no-print"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Job Cards
      </Button>

      {isPreviewMode ? (
        <JobPreviewMode
          job={job}
          customerName={editedCustomerName}
          customerPhone={editedCustomerPhone}
          customerEmail={editedCustomerEmail}
          deviceName={editedDeviceName}
          deviceModel={editedDeviceModel}
          deviceCondition={editedDeviceCondition}
          problem={editedProblem}
          handlingFees={editedHandlingFees}
          companyName={editedCompanyName}
          onBack={() => setIsPreviewMode(false)}
        />
      ) : (
        <JobDetails 
          job={job}
          isEditMode={isEditMode}
          isSaving={isSaving}
          editedStatus={editedStatus}
          editedHandlingFees={editedHandlingFees}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          onStatusChange={handleStatusChange}
          onHandlingFeesChange={setEditedHandlingFees}
          onPrintDialogOpen={() => setIsPrintDialogOpen(true)}
          onDeleteDialogOpen={() => setIsDeleteDialogOpen(true)}
        />
      )}

      <JobDialogs 
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isPrintDialogOpen={isPrintDialogOpen}
        setIsPrintDialogOpen={setIsPrintDialogOpen}
        isShareDialogOpen={isShareDialogOpen}
        setIsShareDialogOpen={setIsShareDialogOpen}
        onDelete={handleDelete}
        onPrint={handlePrint}
        onShare={handleShare}
        onEmail={handleEmail}
        onPreview={() => setIsPreviewMode(true)}
        jobCardNumber={job.job_card_number}
      />
    </div>
  );
};

export default JobDetail;
