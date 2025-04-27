
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Share, Mail, Printer } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PrintDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPrint: () => void;
  onShare?: () => void;
  onEmail?: () => void;
  showPreviewOption?: boolean;
  invoiceNumber?: string;
}

export const PrintDialog = ({ 
  open, 
  onOpenChange, 
  onPrint,
  onShare,
  onEmail,
  invoiceNumber = ""
}: PrintDialogProps) => {
  const isMobile = useIsMobile();
  
  const handlePrint = () => {
    onOpenChange(false);
    setTimeout(() => {
      onPrint();
    }, 300);
  };

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="no-print">
          <DialogHeader>
            <DialogTitle>Share Invoice #{invoiceNumber}</DialogTitle>
            <DialogDescription>Share this invoice via WhatsApp or email</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            {onShare && (
              <Button 
                onClick={onShare}
                className="w-full"
              >
                <Share className="mr-2 h-4 w-4" />
                Share via WhatsApp
              </Button>
            )}
            {onEmail && (
              <Button 
                onClick={onEmail}
                variant="outline"
                className="w-full"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send via Email
              </Button>
            )}
          </div>
          <DialogFooter className="flex flex-col gap-2">
            <Button onClick={handlePrint} variant="secondary" className="w-full">
              <Printer className="mr-2 h-4 w-4" />
              Print/Save PDF
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="no-print">
        <DialogHeader>
          <DialogTitle>Print Invoice #{invoiceNumber}</DialogTitle>
          <DialogDescription>Print or save this invoice as PDF</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
