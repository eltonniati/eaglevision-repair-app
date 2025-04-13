
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { JobDetails } from "@/components/job/JobDetails";
import { PrintDialog } from "@/components/invoice/PrintDialog";
import { JobPreviewMode } from "@/components/job/JobPreviewMode";
import { JobDeleteDialog } from "@/components/job/JobDeleteDialog";
import { useJobEditor } from "@/hooks/use-job-editor";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { job, loading, error, getJob, deleteJob } = useJobs();
  const { companies, fetchCompanies } = useCompanies();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
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
        }
      }
    };
    loadJob();
    fetchCompanies();
  }, [id]);

  useEffect(() => {
    if (job) {
      const companyName = companies.find(c => c.id === job.company_id)?.name || "";
      initializeFormData(job, companyName);
    }
  }, [job, companies]);

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

  const handlePreview = async () => {
    if (isEditMode) {
      const saveSuccess = await handleSave();
      if (!saveSuccess) {
        toast.error("Please save your changes before previewing");
        return;
      }
    }
    
    setIsPrintDialogOpen(false);
    setIsPreviewMode(true);
  };

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/job-cards")} className="mb-6 no-print">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Job Cards
        </Button>
        <div className="text-center p-6">
          <h2 className="text-2xl font-semibold text-destructive">Error</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
          <Button onClick={() => navigate("/job-cards")} className="mt-4">Return to Job Cards</Button>
        </div>
      </div>
    );
  }

  if (loading || !job) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Loading job card...</p>
        </div>
      </div>
    );
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

      <JobDeleteDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
      />

      <PrintDialog 
        open={isPrintDialogOpen} 
        onOpenChange={setIsPrintDialogOpen} 
        onPrint={handlePrint}
        onPreview={handlePreview}
        showPreviewOption={true}
      />
    </div>
  );
};

export default JobDetail;
