
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "@/hooks/use-jobs";
import { toast } from "sonner";
import { JobStatus } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useCompanies } from "@/hooks/use-companies";
import { JobFormHeader } from "./form/JobFormHeader";
import { CustomerDeviceFields } from "./form/CustomerDeviceFields";
import { ProblemDescriptionField } from "./form/ProblemDescriptionField";
import { StatusAndFeesFields } from "./form/StatusAndFeesFields";
import { FormActions } from "./form/FormActions";

export default function JobCardEditForm() {
  const { id } = useParams();
  const { jobs, createJob, updateJob, getJob, loading } = useJobs();
  const { companies, loading: companiesLoading } = useCompanies();
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    deviceName: "",
    deviceModel: "",
    deviceCondition: "",
    problem: "",
    handlingFees: 0,
    status: "In Progress" as JobStatus,
    companyId: "none",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const isEdit = Boolean(id);

  // Load job details for editing
  useEffect(() => {
    if (!id) {
      setIsFetching(false);
      return;
    }
    
    const loadJobForEdit = async () => {
      setIsFetching(true);
      try {
        const job = await getJob(id);
        if (job) {
          setForm({
            customerName: job.customer.name,
            customerPhone: job.customer.phone,
            customerEmail: job.customer.email || "",
            deviceName: job.device.name,
            deviceModel: job.device.model,
            deviceCondition: job.device.condition,
            problem: job.details.problem,
            handlingFees: job.details.handling_fees,
            status: job.details.status,
            companyId: job.company_id || "none",
          });
        } else {
          toast.error("Job card not found.");
          navigate("/job-cards");
        }
      } catch (error) {
        console.error("Error loading job:", error);
        toast.error("Failed to load job card.");
        navigate("/job-cards");
      } finally {
        setIsFetching(false);
      }
    };

    loadJobForEdit();
  }, [id, getJob, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "handlingFees"
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleStatusChange = (value: JobStatus) => {
    setForm(prev => ({
      ...prev,
      status: value,
    }));
  };

  const handleCompanyChange = (value: string) => {
    setForm(prev => ({
      ...prev,
      companyId: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const jobData = {
      customer: {
        name: form.customerName,
        phone: form.customerPhone,
        email: form.customerEmail || undefined,
      },
      device: {
        name: form.deviceName,
        model: form.deviceModel,
        condition: form.deviceCondition,
      },
      details: {
        problem: form.problem,
        status: form.status,
        handling_fees: form.handlingFees,
      },
      company_id: form.companyId === "none" ? undefined : form.companyId,
    };

    try {
      if (isEdit && id) {
        const result = await updateJob(id, jobData);
        if (result) {
          toast.success("Job card updated successfully!");
          navigate("/job-cards");
        } else {
          toast.error("Failed to update job card");
        }
      } else {
        const result = await createJob(jobData);
        if (result) {
          toast.success("Job card created successfully!");
          navigate("/job-cards");
        } else {
          toast.error("Failed to create job card");
        }
      }
    } catch (error) {
      console.error("Error saving job card:", error);
      toast.error("Error saving job card");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => navigate("/job-cards");

  if (isFetching || loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <JobFormHeader isEdit={isEdit} onBack={handleBack} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <CustomerDeviceFields form={form} handleChange={handleChange} />

        <ProblemDescriptionField
          value={form.problem}
          onChange={handleChange}
        />

        <StatusAndFeesFields
          status={form.status}
          handlingFees={form.handlingFees}
          companyId={form.companyId}
          companies={companies}
          companiesLoading={companiesLoading}
          onStatusChange={handleStatusChange}
          onFeesChange={handleChange}
          onCompanyChange={handleCompanyChange}
        />

        <FormActions
          isEdit={isEdit}
          isSubmitting={isSubmitting}
          onCancel={handleBack}
        />
      </form>
    </div>
  );
}
