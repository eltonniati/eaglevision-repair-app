
import { PrintDialog } from "@/components/invoice/PrintDialog";
import { JobDeleteDialog } from "@/components/job/JobDeleteDialog";
import { ShareDialog } from "@/components/invoice/ShareDialog";

interface JobDialogsProps {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  isPrintDialogOpen: boolean;
  setIsPrintDialogOpen: (open: boolean) => void;
  isShareDialogOpen: boolean;
  setIsShareDialogOpen: (open: boolean) => void;
  onDelete: () => void;
  onPrint: () => void;
  onShare: () => Promise<void>;
  onEmail: () => Promise<void>;
  onPreview: () => void;
  jobCardNumber?: string;
  jobCardName?: string;
}

export const JobDialogs = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  isPrintDialogOpen,
  setIsPrintDialogOpen,
  isShareDialogOpen,
  setIsShareDialogOpen,
  onDelete,
  onPrint,
  onShare,
  onEmail,
  onPreview,
  jobCardNumber,
  jobCardName
}: JobDialogsProps) => {
  return (
    <>
      <JobDeleteDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={onDelete}
      />

      <PrintDialog 
        open={isPrintDialogOpen} 
        onOpenChange={setIsPrintDialogOpen} 
        onPrint={onPrint}
        onPreview={onPreview}
        showPreviewOption={true}
      />

      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        onShare={onShare}
        onEmail={onEmail}
        invoiceNumber={jobCardNumber || ""}
        invoiceName={jobCardName || ""}
      />
    </>
  );
};
