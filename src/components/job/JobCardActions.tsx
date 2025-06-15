
import { Button } from "@/components/ui/button";
import { Eye, Printer, Share2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface JobCardActionsProps {
  jobId: string;
  jobCardNumber: string;
  onDelete?: () => void;
  onPrint?: () => void;
  onShare?: () => void;
}

export const JobCardActions = ({ 
  jobId, 
  jobCardNumber, 
  onDelete, 
  onPrint, 
  onShare 
}: JobCardActionsProps) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/job-cards/${jobId}`);
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      toast.info("Print functionality coming soon");
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      toast.info("Share functionality coming soon");
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else {
      toast.info("Delete functionality coming soon");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleView}
      >
        <Eye className="mr-2 h-4 w-4" />
        View Details
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrint}
      >
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};
