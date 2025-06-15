
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isEdit: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const FormActions = ({ isEdit, isSubmitting, onCancel }: FormActionsProps) => {
  return (
    <div className="flex gap-2 justify-end pt-6">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isEdit ? "Updating..." : "Creating..."}
          </>
        ) : (
          isEdit ? "Update Job Card" : "Create Job Card"
        )}
      </Button>
    </div>
  );
};
