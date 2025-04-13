
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface JobDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

export const JobDeleteDialog = ({
  open,
  onOpenChange,
  onDelete
}: JobDeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] no-print">
        <DialogHeader>
          <DialogTitle>Delete Job Card</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this job card? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between space-x-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
