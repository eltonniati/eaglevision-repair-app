
import { Button } from "@/components/ui/button";
import { Eye, Printer, Share2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useJobs } from "@/hooks/use-jobs";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const { t } = useLanguage();
  const { deleteJob } = useJobs();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = () => {
    navigate(`/job-cards/${jobId}`);
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      // Navigate to job detail page where print preview is available
      navigate(`/job-cards/${jobId}`);
      toast.info(t.previewJob);
    }
  };

  const handleShare = async () => {
    if (onShare) {
      onShare();
    } else {
      // Basic share functionality using Web Share API or fallback to WhatsApp
      const text = `${t.jobCardNumber} #${jobCardNumber}`;
      try {
        if (navigator.share) {
          await navigator.share({
            title: `${t.jobCardNumber} #${jobCardNumber}`,
            text: text,
            url: window.location.href
          });
        } else {
          // Fallback to WhatsApp
          window.open(`https://wa.me/?text=${encodeURIComponent(text + ' - ' + window.location.href)}`);
        }
      } catch (err) {
        // If share fails, copy to clipboard
        try {
          await navigator.clipboard.writeText(text + ' - ' + window.location.href);
          toast.success("Link copied to clipboard!");
        } catch (clipboardErr) {
          toast.error("Share failed");
        }
      }
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (onDelete) {
      onDelete();
      setIsDeleteDialogOpen(false);
      return;
    }

    setIsDeleting(true);
    try {
      const success = await deleteJob(jobId);
      if (success) {
        toast.success(t.jobCardDeleted);
        navigate("/job-cards");
      } else {
        toast.error(t.failedToDeleteJobCard);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error(t.failedToDeleteJobCard);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleView}
        >
          <Eye className="mr-2 h-4 w-4" />
          {t.previewJob}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
        >
          <Printer className="mr-2 h-4 w-4" />
          {t.print}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          {t.share}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteClick}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {t.deleteJob}
        </Button>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.deleteJob}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete job card #{jobCardNumber}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : t.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
