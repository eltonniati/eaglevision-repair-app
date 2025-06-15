
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useJobs } from "@/hooks/use-jobs";
import { toast } from "sonner";
import { JobStatus } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useCompanies } from "@/hooks/use-companies";

const statusOptions: JobStatus[] = [
  "In Progress",
  "Finished",
  "Waiting for Parts",
];

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
    setIsFetching(true);
    getJob(id).then(job => {
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
      setIsFetching(false);
    });
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
          toast.success("Job card updated!");
          navigate(`/job-cards/${id}`);
        } else {
          toast.error("Failed to update job card");
        }
      } else {
        const result = await createJob(jobData);
        if (result) {
          toast.success("Job card created!");
          navigate("/job-cards");
        } else {
          toast.error("Failed to create job card");
        }
      }
    } catch (error) {
      toast.error("Error saving job card");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching || loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit Job Card" : "Create Job Card"}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Customer Name *</Label>
            <Input
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Customer Phone *</Label>
            <Input
              name="customerPhone"
              value={form.customerPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label>Customer Email</Label>
            <Input
              name="customerEmail"
              value={form.customerEmail}
              onChange={handleChange}
              type="email"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Device Name *</Label>
            <Input
              name="deviceName"
              value={form.deviceName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Device Model *</Label>
            <Input
              name="deviceModel"
              value={form.deviceModel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label>Device Condition *</Label>
            <Input
              name="deviceCondition"
              value={form.deviceCondition}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <Label>Problem *</Label>
          <Textarea
            name="problem"
            value={form.problem}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Status</Label>
            <Select value={form.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue>{form.status}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Handling Fees</Label>
            <Input
              name="handlingFees"
              type="number"
              min="0"
              step="0.01"
              value={form.handlingFees}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Company</Label>
            <Select
              value={form.companyId}
              onValueChange={handleCompanyChange}
              disabled={companiesLoading}
            >
              <SelectTrigger>
                <SelectValue>
                  {form.companyId === "none"
                    ? "No company"
                    : companies.find(c => c.id === form.companyId)?.name || "Select a company"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No company</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company.id} value={company.id || ""}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate("/job-cards")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Job Card" : "Create Job Card"}
          </Button>
        </div>
      </form>
    </div>
  );
}
