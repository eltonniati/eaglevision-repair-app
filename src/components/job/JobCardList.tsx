
import { Link } from "react-router-dom";
import { Job } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { JobCardItem } from "./JobCardItem";

interface JobCardListProps {
  jobs: Job[];
  loading: boolean;
  onPreview: (job: Job) => void;
}

export const JobCardList = ({ jobs, loading, onPreview }: JobCardListProps) => {
  const { t } = useLanguage();
  
  console.log("JobCardList rendered with:", { jobsCount: jobs.length, loading });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t.loadingJobCards}</p>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-64">
          <p className="text-muted-foreground mb-4">{t.noJobCardsFound}</p>
          <Link to="/job-cards/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t.createFirstJobCard}
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {jobs.map(job => (
        <JobCardItem key={job.id} job={job} onPreview={onPreview} />
      ))}
    </div>
  );
};
