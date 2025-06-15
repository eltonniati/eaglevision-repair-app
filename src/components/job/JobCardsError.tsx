
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";

interface JobCardsErrorProps {
  error: string;
  onBack: () => void;
  t: any;
}

export const JobCardsError = ({ error, onBack, t }: JobCardsErrorProps) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <Button variant="ghost" className="mb-4" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t.back} {t.dashboard}
      </Button>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t.jobCards}</h1>
        <Link to="/job-cards/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t.createJobCard}
          </Button>
        </Link>
      </div>
      <div className="text-center p-6">
        <h2 className="text-2xl font-semibold text-destructive">{t.errorLoadingJobCards}</h2>
        <p className="text-muted-foreground mt-2">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">{t.reloadPage}</Button>
      </div>
    </div>
  );
};
