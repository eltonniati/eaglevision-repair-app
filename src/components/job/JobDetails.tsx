import { useState } from "react";
import { Link } from "react-router-dom";
import { Job, JobStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Edit, Printer, Trash2 } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { useStatusManagement } from "@/hooks/dashboard/use-status-management";

interface JobDetailsProps {
  job: Job;
  isEditMode: boolean;
  isSaving: boolean;
  editedStatus: JobStatus;
  editedHandlingFees: number;
  editedCustomerName: string;
  editedCustomerPhone: string;
  editedCustomerEmail: string;
  editedDeviceName: string;
  editedDeviceModel: string;
  editedDeviceCondition: string;
  editedProblem: string;
  onEditToggle: () => void;
  onSave: () => Promise<boolean>;
  onStatusChange: (status: JobStatus) => void;
  onHandlingFeesChange: (fees: number) => void;
  onCustomerNameChange: (name: string) => void;
  onCustomerPhoneChange: (phone: string) => void;
  onCustomerEmailChange: (email: string) => void;
  onDeviceNameChange: (name: string) => void;
  onDeviceModelChange: (model: string) => void;
  onDeviceConditionChange: (condition: string) => void;
  onProblemChange: (problem: string) => void;
  onPrintDialogOpen: () => void;
  onDeleteDialogOpen: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);
};

export const JobDetails = ({
  job,
  isEditMode,
  isSaving,
  editedStatus,
  editedHandlingFees,
  editedCustomerName,
  editedCustomerPhone,
  editedCustomerEmail,
  editedDeviceName,
  editedDeviceModel,
  editedDeviceCondition,
  editedProblem,
  onEditToggle,
  onSave,
  onStatusChange,
  onHandlingFeesChange,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onCustomerEmailChange,
  onDeviceNameChange,
  onDeviceModelChange,
  onDeviceConditionChange,
  onProblemChange,
  onPrintDialogOpen,
  onDeleteDialogOpen
}: JobDetailsProps) => {
  const { t } = useLanguage();
  const { getStatusColor, getStatusBackgroundColor } = useStatusManagement();

  // Handle status change and auto-save when not in edit mode
  const handleStatusChangeAndSave = async (newStatus: JobStatus) => {
    console.log("Status changing from", editedStatus, "to", newStatus);
    onStatusChange(newStatus);
    
    // If not in edit mode, automatically save the status change
    if (!isEditMode) {
      setTimeout(async () => {
        const success = await onSave();
        console.log("Auto-save status change result:", success);
      }, 100); // Small delay to ensure state update
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t.jobCardNumber} #{job.job_card_number}</CardTitle>
            <CardDescription>
              {t.createdOn || "Created on"} {format(new Date(job.created_at!), "MMMM d, yyyy")}
            </CardDescription>
          </div>
          <div className="no-print">
            {isEditMode ? (
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={onSave}
                  disabled={isSaving}
                >
                  {isSaving ? t.loading : t.save}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={onEditToggle}
                  disabled={isSaving}
                >
                  {t.cancel}
                </Button>
              </div>
            ) : (
              <Button onClick={onEditToggle}>
                <Edit className="mr-2 h-4 w-4" />
                {t.edit}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.customer}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer-name">{t.customerName}</Label>
                {isEditMode ? (
                  <Input
                    id="customer-name"
                    value={editedCustomerName}
                    onChange={(e) => onCustomerNameChange(e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">{editedCustomerName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="customer-phone">{t.customerPhone}</Label>
                {isEditMode ? (
                  <Input
                    id="customer-phone"
                    value={editedCustomerPhone}
                    onChange={(e) => onCustomerPhoneChange(e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">{editedCustomerPhone}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="customer-email">{t.customerEmail}</Label>
                {isEditMode ? (
                  <Input
                    id="customer-email"
                    type="email"
                    value={editedCustomerEmail}
                    onChange={(e) => onCustomerEmailChange(e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">{editedCustomerEmail || "N/A"}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.device}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="device-name">{t.deviceName}</Label>
                {isEditMode ? (
                  <Input
                    id="device-name"
                    value={editedDeviceName}
                    onChange={(e) => onDeviceNameChange(e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">{editedDeviceName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="device-model">{t.deviceModel}</Label>
                {isEditMode ? (
                  <Input
                    id="device-model"
                    value={editedDeviceModel}
                    onChange={(e) => onDeviceModelChange(e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">{editedDeviceModel}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="device-condition">{t.deviceCondition}</Label>
                {isEditMode ? (
                  <Input
                    id="device-condition"
                    value={editedDeviceCondition}
                    onChange={(e) => onDeviceConditionChange(e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">{editedDeviceCondition}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t.problem}</h3>
            <div>
              <Label htmlFor="problem">{t.problem}</Label>
              {isEditMode ? (
                <Textarea
                  id="problem"
                  value={editedProblem}
                  onChange={(e) => onProblemChange(e.target.value)}
                  rows={4}
                />
              ) : (
                <p className="text-sm text-gray-600">{editedProblem}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-1 no-print">
        <CardHeader>
          <CardTitle>{t.jobCardActions || "Job Card Actions"}</CardTitle>
          <CardDescription>{t.manageJobCard || "Manage this job card"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="status">{t.status}</Label>
            {isEditMode ? (
              <Select value={editedStatus} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t.selectStatus || "Select a status"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Progress">{t.inProgress}</SelectItem>
                  <SelectItem value="Finished">{t.completed}</SelectItem>
                  <SelectItem value="Waiting for Parts">{t.waitingForParts}</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-2">
                <Badge className={`mb-2 ${getStatusColor(editedStatus)}`}>{editedStatus}</Badge>
                <Select value={editedStatus} onValueChange={handleStatusChangeAndSave}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.selectStatus || "Select a status"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Progress">{t.inProgress}</SelectItem>
                    <SelectItem value="Finished">{t.completed}</SelectItem>
                    <SelectItem value="Waiting for Parts">{t.waitingForParts}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="handling-fees">{t.handlingFees}</Label>
            {isEditMode ? (
              <Input
                id="handling-fees"
                type="number"
                value={editedHandlingFees}
                onChange={(e) => onHandlingFeesChange(Number(e.target.value))}
              />
            ) : (
              <p>{formatCurrency(editedHandlingFees)}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-2">
          <Button 
            className="w-full" 
            variant="outline" 
            onClick={onPrintDialogOpen}
            disabled={isEditMode}
          >
            <Printer className="mr-2 h-4 w-4" />
            {t.printJob}
          </Button>
          <Link to={`/invoices/new/${job.id}`} className="w-full">
            <Button className="w-full">
              {t.createInvoice}
            </Button>
          </Link>
          <Button
            className="w-full"
            variant="destructive"
            onClick={onDeleteDialogOpen}
            disabled={isEditMode}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t.deleteJob}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
