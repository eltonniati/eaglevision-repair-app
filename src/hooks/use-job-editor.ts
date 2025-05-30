import { useState } from "react";
import { toast } from "sonner";
import { Job, JobStatus } from "@/lib/types";
import { useJobs } from "@/hooks/use-jobs";

export function useJobEditor(job: Job | null) {
  const { updateJob } = useJobs();
  const [isEditMode, setIsEditMode] = useState(false);
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
  
  const initializeFormData = (job: Job, companyName: string) => {
    setEditedProblem(job.details.problem);
    setEditedStatus(job.details.status);
    setEditedHandlingFees(job.details.handling_fees);
    setEditedCompanyName(companyName);
    setEditedCustomerName(job.customer.name);
    setEditedCustomerPhone(job.customer.phone);
    setEditedCustomerEmail(job.customer.email || "");
    setEditedDeviceName(job.device.name);
    setEditedDeviceModel(job.device.model);
    setEditedDeviceCondition(job.device.condition);
  };

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

  return {
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
    setEditedProblem,
    setEditedHandlingFees,
    initializeFormData,
    handleEditToggle,
    handleStatusChange,
    handleSave
  };
}
