
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobFormHeaderProps {
  isEdit: boolean;
  onBack: () => void;
}

export const JobFormHeader = ({ isEdit, onBack }: JobFormHeaderProps) => {
  return (
    <div className="mb-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Job Cards
      </Button>
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit Job Card" : "Create Job Card"}
      </h1>
    </div>
  );
};
