
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Job, JobStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Printer } from "lucide-react";
import { useStatusManagement } from "@/hooks/dashboard/use-status-management";

interface JobCardItemProps {
  job: Job;
  onPreview: (job: Job) => void;
}

export const JobCardItem = ({ job, onPreview }: JobCardItemProps) => {
  const navigate = useNavigate();
  const { getStatusColor } = useStatusManagement();

  const renderStatusBadge = (status: JobStatus) => {
    return <Badge className={getStatusColor(status)}>{status}</Badge>;
  };

  return (
    <Card key={job.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">#{job.job_card_number} - {job.customer.name}</CardTitle>
            <CardDescription>
              {format(new Date(job.created_at!), "MMM d, yyyy")} • {job.device.name} {job.device.model}
            </CardDescription>
          </div>
          <div>
            {renderStatusBadge(job.details.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-2">{job.details.problem}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={() => onPreview(job)}>
          <Printer className="h-4 w-4 mr-1" />
          Print
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate(`/job-cards/${job.id}`)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
