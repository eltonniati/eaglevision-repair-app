
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { JobStatus } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PrintDialog } from "@/components/invoice/PrintDialog";
import { JobDetails } from "@/components/job/JobDetails";
import { PrintPreview } from "@/components/job/PrintPreview";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { job, loading, error, getJob, updateJob, deleteJob } = useJobs();
  const { companies, fetchCompanies } = useCompanies();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [editedProblem, setEditedProblem] = useState("");
  const [editedStatus, setEditedStatus] = useState<JobStatus>("In Progress");
  const [editedHandlingFees, setEditedHandlingFees] = useState(0);
  const [editedCompanyName, setEditedCompanyName] = useState("");
  const [editedCustomerName, setEditedCustomerName] = useState("");
  const [editedCustomerPhone, setEditedCustomerPhone] = useState("");
  const [editedCustomerEmail, setEditedCustomerEmail] = useState("");
  const [editedDeviceName, setEditedDeviceName] = useState("");
  const [editedDeviceModel, setEditedDeviceModel] = useState("");
  const [editedDeviceCondition, setEditedDeviceCondition] = useState("");

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
      setEditedProblem(job.details.problem);
      setEditedStatus(job.details.status);
      setEditedHandlingFees(job.details.handling_fees);
      setEditedCompanyName(companies.find(c => c.id === job.company_id)?.name || "");
      setEditedCustomerName(job.customer.name);
      setEditedCustomerPhone(job.customer.phone);
      setEditedCustomerEmail(job.customer.email || "");
      setEditedDeviceName(job.device.name);
      setEditedDeviceModel(job.device.model);
      setEditedDeviceCondition(job.device.condition);
    }
  }, [job, companies]);

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleStatusChange = (status: JobStatus) => {
    setEditedStatus(status);
  };

  const handleSave = async () => {
    if (!job) return false;

    setIsSaving(true);
    
    const updatedJob = {
      ...job,
      customer: {
        name: editedCustomerName,
        phone: editedCustomerPhone,
        email: editedCustomerEmail,
      },
      device: {
        name: editedDeviceName,
        model: editedDeviceModel,
        condition: editedDeviceCondition,
      },
      details: {
        ...job.details,
        problem: editedProblem,
        status: editedStatus,
        handling_fees: editedHandlingFees,
      },
    };

    try {
      const success = await updateJob(job.id!, updatedJob);
      
      if (success) {
        toast.success("Job card updated successfully");
        setIsEditMode(false);
        setIsSaving(false);
        return true;
      } else {
        toast.error("Failed to update job card");
        setIsSaving(false);
        return false;
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Failed to save job card");
      setIsSaving(false);
      return false;
    }
  };

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
        <PrintPreview
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

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] no-print">
          <DialogHeader>
            <DialogTitle>Delete Job Card</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job card? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between space-x-2">
            <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
