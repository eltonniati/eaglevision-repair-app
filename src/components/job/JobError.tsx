
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobErrorProps {
  error: string;
}

export const JobError = ({ error }: JobErrorProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <Button variant="ghost" onClick={() => navigate("/job-cards")} className="mb-6 no-print">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Job Cards
      </Button>
      <div className="text-center p-6">
        <h2 className="text-2xl font-semibold text-destructive">Error</h2>
        <p className="text-muted-foreground mt-2">{error}</p>
        <Button onClick={() => navigate("/job-cards")} className="mt-4">
          Return to Job Cards
        </Button>
      </div>
    </div>
  );
};
