
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

interface JobDetailsProps {
  job: Job;
  isEditMode: boolean;
  isSaving: boolean;
  editedStatus: JobStatus;
  editedHandlingFees: number;
  onEditToggle: () => void;
  onSave: () => Promise<boolean>;
  onStatusChange: (status: JobStatus) => void;
  onHandlingFeesChange: (fees: number) => void;
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
  onEditToggle,
  onSave,
  onStatusChange,
  onHandlingFeesChange,
  onPrintDialogOpen,
  onDeleteDialogOpen
}: JobDetailsProps) => {
  const { t } = useLanguage();

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
          {/* Customer and device details would go here */}
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
              <Badge>{editedStatus}</Badge>
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
