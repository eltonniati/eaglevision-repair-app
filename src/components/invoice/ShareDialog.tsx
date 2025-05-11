
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share, Mail, Download } from "lucide-react";
import { Loader2 } from "lucide-react";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShare: () => Promise<void>;
  onEmail: () => Promise<void>;
  onDownloadPdf?: () => Promise<void>;  // Using the correct Promise<void> type
  invoiceNumber: string;
  invoiceName?: string;
  isGeneratingPdf?: boolean;
}

export const ShareDialog = ({ 
  open, 
  onOpenChange, 
  onShare,
  onEmail,
  onDownloadPdf,
  invoiceNumber,
  invoiceName,
  isGeneratingPdf = false
}: ShareDialogProps) => {
  // Determine if we're sharing an invoice or job card
  const isJobCard = invoiceNumber && invoiceNumber.includes("-");
  const itemType = isJobCard ? "Job Card" : "Invoice";
  const displayName = invoiceName || `#${invoiceNumber}`;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="no-print">
        <DialogHeader>
          <DialogTitle>Share {itemType} {displayName}</DialogTitle>
          <DialogDescription>Share this {itemType.toLowerCase()} via WhatsApp or email</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button 
            onClick={onShare}
            className="w-full"
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Share className="mr-2 h-4 w-4" />
            )}
            Share via WhatsApp
          </Button>
          <Button 
            onClick={onEmail}
            variant="outline"
            className="w-full"
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Send via Email
          </Button>
          {onDownloadPdf && (
            <Button 
              onClick={onDownloadPdf}
              variant="outline"
              className="w-full"
              disabled={isGeneratingPdf}
            >
              {isGeneratingPdf ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Download PDF
            </Button>
          )}
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
