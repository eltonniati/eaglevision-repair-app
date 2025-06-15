
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Job, JobStatus } from "@/lib/types";
import { JobCardActions } from "@/components/job/JobCardActions";

export default function EditJobCard() {
  const { id } = useParams();
  const { updateJob } = useJobs();
  const { companies, loading: loadingCompanies } = useCompanies();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const fetchedRef = useRef<string | null>(null);

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [deviceCondition, setDeviceCondition] = useState("");
  const [problem, setProblem] = useState("");
  const [handlingFees, setHandlingFees] = useState<number>(0);
  const [companyId, setCompanyId] = useState<string>("none");
  const [status, setStatus] = useState<JobStatus>("In Progress");
  const [jobCardNumber, setJobCardNumber] = useState("");

  // Direct job loading function to avoid hook dependency issues
  const loadJobData = async (jobId: string) => {
    if (!jobId || fetchedRef.current === jobId) return;
    
    try {
      setIsLoading(true);
      setLoadError(null);
      fetchedRef.current = jobId;
      
      console.log("Loading job data for ID:", jobId);
      
      const { supabase } = await import("@/integrations/supabase/client");
      const { mapDatabaseJobToJob } = await import("@/lib/job-utils");
      
      const { data, error } = await supabase
        .from("jobs")
        .select("*, companies(*)")
        .eq("id", jobId)
        .maybeSingle();

      if (error) {
        console.error("Job fetch error:", error);
        setLoadError(error.message);
        toast.error(`${t.failedToLoad}: ${error.message}`);
        return;
      }
      
      if (!data) {
        console.log("No job found with ID:", jobId);
        setLoadError(t.jobNotFound || "Job not found");
        toast.error(t.jobNotFound || "Job not found");
        return;
      }

      console.log("Job data retrieved successfully");
      const job = mapDatabaseJobToJob(data);
      
      // Populate form fields
      setCustomerName(job.customer.name);
      setCustomerPhone(job.customer.phone);
      setCustomerEmail(job.customer.email || "");
      setDeviceName(job.device.name);
      setDeviceModel(job.device.model);
      setDeviceCondition(job.device.condition);
      setProblem(job.details.problem);
      setHandlingFees(job.details.handling_fees || 0);
      setCompanyId(job.company_id || "none");
      setStatus(job.details.status);
      setJobCardNumber(job.job_card_number || "");
      
    } catch (error) {
      console.error("Error loading job:", error);
      const errorMessage = error instanceof Error ? error.message : t.error || "An error occurred";
      setLoadError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Load job data when component mounts - only run once per ID
  useEffect(() => {
    if (id && id !== fetchedRef.current) {
      loadJobData(id);
    }
  }, [id]); // Only depend on id, not on functions

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!customerName || !customerPhone || !deviceName || !deviceModel || !deviceCondition || !problem) {
      toast.error(t.fillAllFields || "Please fill in all required fields");
      return;
    }

    if (!id) {
      toast.error(t.noJobId || "No job ID found");
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedJobData: Partial<Job> = {
        customer: {
          name: customerName,
          phone: customerPhone,
          email: customerEmail || undefined
        },
        device: {
          name: deviceName,
          model: deviceModel,
          condition: deviceCondition
        },
        details: {
          problem,
          status,
          handling_fees: handlingFees
        },
        company_id: companyId === "none" ? undefined : companyId
      };

      const result = await updateJob(id, updatedJobData);
      
      if (result) {
        toast.success(`${t.jobCardUpdated || "Job card updated"}: ${jobCardNumber}`);
        navigate("/job-cards");
      } else {
        toast.error(t.failedToUpdateJobCard || "Failed to update job card");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error(t.errorUpdatingJobCard || "An error occurred while updating the job card");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate("/job-cards");
  };

  if (loadError) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
        <Button
          variant="ghost"
          onClick={handleBackClick}
          className="mb-6"
          type="button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.back} {t.jobCards}
        </Button>
        <div className="text-center">
          <p className="text-red-600 mb-4">{loadError}</p>
          <Button onClick={() => loadJobData(id || "")} disabled={!id}>
            {t.retry || "Retry"}
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
      <Button
        variant="ghost"
        onClick={handleBackClick}
        className="mb-6"
        type="button"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t.back} {t.jobCards}
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{t.edit} {t.jobCards} #{jobCardNumber}</h1>
        <p className="text-gray-500">{t.updateJobDetails || "Update details for this repair job"}</p>
      </div>

      {/* Job Card Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t.jobCardActions}</CardTitle>
          <CardDescription>{t.manageJobCard}</CardDescription>
        </CardHeader>
        <CardContent>
          <JobCardActions 
            jobId={id || ""} 
            jobCardNumber={jobCardNumber}
          />
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.customer} {t.information || "Information"}</CardTitle>
              <CardDescription>{t.updateCustomerDetails || "Update the customer's contact details"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">{t.customerName} *</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={t.customerName}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">{t.customerPhone} *</Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={t.customerPhone}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">{t.customerEmail} ({t.optional || "optional"})</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder={t.customerEmail}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.device} {t.information || "Information"}</CardTitle>
              <CardDescription>{t.updateDeviceDetails || "Update details about the device being repaired"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deviceName">{t.deviceName} *</Label>
                  <Input
                    id="deviceName"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    placeholder="e.g. iPhone, Samsung TV"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deviceModel">{t.deviceModel} *</Label>
                  <Input
                    id="deviceModel"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    placeholder="e.g. 13 Pro, QN90B"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deviceCondition">{t.deviceCondition} *</Label>
                <Input
                  id="deviceCondition"
                  value={deviceCondition}
                  onChange={(e) => setDeviceCondition(e.target.value)}
                  placeholder="e.g. Good, Fair, Poor"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.problem} {t.details || "Details"}</CardTitle>
              <CardDescription>{t.updateProblemDetails || "Update the issue with the device"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problem">{t.description} {t.of || "of"} {t.problem} *</Label>
                <Textarea
                  id="problem"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder={t.describeProblem || "Describe the issue with the device..."}
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="handlingFees">{t.handlingFees} (R)</Label>
                <Input
                  id="handlingFees"
                  type="number"
                  min="0"
                  step="0.01"
                  value={handlingFees}
                  onChange={(e) => setHandlingFees(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">{t.company} ({t.optional || "Optional"})</Label>
                <Select value={companyId} onValueChange={setCompanyId} disabled={loadingCompanies}>
                  <SelectTrigger id="company">
                    <SelectValue placeholder={loadingCompanies ? t.loadingCompanies || "Loading companies..." : t.selectCompany || "Select a company"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t.noCompany || "No company"}</SelectItem>
                    {companies.map(company => (
                      <SelectItem key={company.id} value={company.id || ""}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">{t.status}</Label>
                <Select value={status} onValueChange={(value) => setStatus(value as JobStatus)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder={t.selectStatus} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Progress">{t.inProgress}</SelectItem>
                    <SelectItem value="Finished">{t.finished}</SelectItem>
                    <SelectItem value="Waiting for Parts">{t.waitingForParts}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  `${t.save}...`
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {t.save} {t.changes || "Changes"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
