
import { Button } from "@/components/ui/button";
import { Loader2, Printer, Share } from "lucide-react";

interface PrintPreviewHeaderProps {
  title: string;
  onBack: () => void;
  onShare: () => void;
  onPrint: () => Promise<void>;
  isMobile: boolean;
  isGeneratingPdf: boolean;
}

export const PrintPreviewHeader = ({
  title,
  onBack,
  onShare,
  onPrint,
  isMobile,
  isGeneratingPdf
}: PrintPreviewHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 no-print">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          variant="outline" 
          onClick={onShare}
          disabled={isGeneratingPdf}
        >
          {isGeneratingPdf ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Share className="mr-2 h-4 w-4" />
          )}
          {isMobile ? "Share" : "Share Job Card"}
        </Button>
        <Button 
          onClick={onPrint}
          disabled={isGeneratingPdf}
        >
          <Printer className="mr-2 h-4 w-4" />
          {isMobile ? "Print" : "Print Now"}
        </Button>
      </div>
    </div>
  );
};
