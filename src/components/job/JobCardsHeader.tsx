
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";

interface JobCardsHeaderProps {
  onBack: () => void;
  t: any;
}

export const JobCardsHeader = ({ onBack, t }: JobCardsHeaderProps) => {
  return (
    <>
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
    </>
  );
};
