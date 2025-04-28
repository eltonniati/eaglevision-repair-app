
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share, Mail } from "lucide-react";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShare: () => void;
  onEmail: () => void;
  invoiceNumber: string;
}

export const ShareDialog = ({ 
  open, 
  onOpenChange, 
  onShare,
  onEmail,
  invoiceNumber
}: ShareDialogProps) => {
  // Determine if we're sharing an invoice or job card
  const isJobCard = invoiceNumber && invoiceNumber.includes("-");
  const itemType = isJobCard ? "Job Card" : "Invoice";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="no-print">
        <DialogHeader>
          <DialogTitle>Share {itemType} #{invoiceNumber}</DialogTitle>
          <DialogDescription>Share this {itemType.toLowerCase()} via WhatsApp or email</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button 
            onClick={onShare}
            className="w-full"
          >
            <Share className="mr-2 h-4 w-4" />
            Share via WhatsApp
          </Button>
          <Button 
            onClick={onEmail}
            variant="outline"
            className="w-full"
          >
            <Mail className="mr-2 h-4 w-4" />
            Send via Email
          </Button>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)} className="w-full">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
