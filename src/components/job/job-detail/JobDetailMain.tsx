
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useJobEditor } from "@/hooks/use-job-editor";
import { useLanguage } from "@/contexts/LanguageContext";
import { JobDetails } from "@/components/job/JobDetails";
import { JobPreviewMode } from "@/components/job/JobPreviewMode";
import JobDetailDialogs from "./JobDetailDialogs";

export default function JobDetailMain({ job, companies }: any) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
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
    setEditedProblem,
    setEditedHandlingFees,
    setEditedCustomerName,
    setEditedCustomerPhone,
    setEditedCustomerEmail,
    setEditedDeviceName,
    setEditedDeviceModel,
    setEditedDeviceCondition,
    initializeFormData,
    handleEditToggle,
    handleStatusChange,
    handleSave
  } = useJobEditor(job);

  // Set up initial form data on job/companies fetch or change
  useEffect(() => {
    if (job && companies.length > 0) {
      const companyName = companies.find((c: any) => c.id === job.company_id)?.name || "";
      initializeFormData(job, companyName);
    }
  }, [job, companies, initializeFormData]);

  // Dialog/action handlers
  const handleBack = () => navigate("/job-cards");
  const handlePrint = () => {
    setIsPrintDialogOpen(false);
    setTimeout(() => setIsPreviewMode(true), 100);
  };
  const handlePreview = () => setIsPreviewMode(true);

  // Helper function to get company data
  const getCompany = (companyId?: string) => {
    if (!companyId || !companies.length) return null;
    return companies.find((c: any) => c.id === companyId) || null;
  };

  // Share/email shortcuts using current form state
  const handleShare = async () => {
    if (!job) return;
    const text = `${t.jobCardNumber} #${job.job_card_number} ${t.for || "for"} ${editedCustomerName}\n${t.device}: ${editedDeviceName} ${editedDeviceModel}\n${t.problem}: ${editedProblem}\n${t.contact || "Contact"}: ${editedCustomerPhone}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${t.jobCardNumber} #${job.job_card_number}`,
          text
        });
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
      }
    } catch (err) {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
    setIsShareDialogOpen(false);
  };

  const handleEmail = async () => {
    if (!job) return;
    const subject = `${t.jobCardNumber} #${job.job_card_number} ${t.for || "for"} ${editedCustomerName}`;
    const body = `${t.jobCardNumber} #${job.job_card_number}\n\n${t.customer}: ${editedCustomerName}\n${t.customerPhone}: ${editedCustomerPhone}\n${t.customerEmail}: ${editedCustomerEmail}\n\n${t.device}: ${editedDeviceName} ${editedDeviceModel}\n${t.deviceCondition}: ${editedDeviceCondition}\n\n${t.problem}: ${editedProblem}\n\n${t.handlingFees}: ${editedHandlingFees}\n\n${t.companyName}: ${editedCompanyName}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsShareDialogOpen(false);
    return Promise.resolve();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-6 no-print"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t.back} {t.jobCards}
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
          company={getCompany(job.company_id)}
          onBack={() => setIsPreviewMode(false)}
        />
      ) : (
        <JobDetails
          job={job}
          isEditMode={isEditMode}
          isSaving={isSaving}
          editedStatus={editedStatus}
          editedHandlingFees={editedHandlingFees}
          editedCustomerName={editedCustomerName}
          editedCustomerPhone={editedCustomerPhone}
          editedCustomerEmail={editedCustomerEmail}
          editedDeviceName={editedDeviceName}
          editedDeviceModel={editedDeviceModel}
          editedDeviceCondition={editedDeviceCondition}
          editedProblem={editedProblem}
          onEditToggle={handleEditToggle}
          onSave={handleSave}
          onStatusChange={handleStatusChange}
          onHandlingFeesChange={setEditedHandlingFees}
          onCustomerNameChange={setEditedCustomerName}
          onCustomerPhoneChange={setEditedCustomerPhone}
          onCustomerEmailChange={setEditedCustomerEmail}
          onDeviceNameChange={setEditedDeviceName}
          onDeviceModelChange={setEditedDeviceModel}
          onDeviceConditionChange={setEditedDeviceCondition}
          onProblemChange={setEditedProblem}
          onPrintDialogOpen={() => setIsPrintDialogOpen(true)}
          onDeleteDialogOpen={() => setIsDeleteDialogOpen(true)}
        />
      )}

      <JobDetailDialogs
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        isPrintDialogOpen={isPrintDialogOpen}
        setIsPrintDialogOpen={setIsPrintDialogOpen}
        isShareDialogOpen={isShareDialogOpen}
        setIsShareDialogOpen={setIsShareDialogOpen}
        onDelete={job?.id}
        onPrint={handlePrint}
        onShare={handleShare}
        onEmail={handleEmail}
        onPreview={handlePreview}
        jobCardNumber={job.job_card_number}
      />
    </div>
  );
}
