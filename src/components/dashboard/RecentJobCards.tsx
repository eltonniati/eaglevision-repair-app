import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, PlusCircle, ClipboardList } from "lucide-react";
import { Job } from "@/lib/types";
import { useStatusManagement } from "@/hooks/dashboard/use-status-management";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecentJobCardsProps {
  recentJobs: Job[];
  isLoading: boolean;
  statusTranslations: { [key: string]: string };
  reverseStatusTranslations: { [key: string]: string };
  onStatusChange: (jobId: string, newStatus: string) => Promise<void>;
  t: any;
}

export default function RecentJobCards({ 
  recentJobs, 
  isLoading, 
  statusTranslations, 
  reverseStatusTranslations, 
  onStatusChange, 
  t 
}: RecentJobCardsProps) {
  const navigate = useNavigate();
  const { getStatusColor } = useStatusManagement();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.recentJobCards}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-md"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>{t.recentJobCards}</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/job-cards")}
            className="text-gray-500 hover:text-gray-900"
          >
            {t.viewAll}
          </Button>
        </div>
        <CardDescription>
          {t.recentJobsDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recentJobs.length > 0 ? (
          <div className="space-y-4">
            {recentJobs.map((job) => {
              const translatedStatus = statusTranslations[job.details.status] || job.details.status;
              return (
                <div 
                  key={job.id} 
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-md hover:bg-gray-50"
                >
                  <div className="flex-1 mb-2 sm:mb-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span 
                        className="font-medium text-gray-900 cursor-pointer hover:underline"
                        onClick={() => navigate(`/job-cards/${job.id}`)}
                      >
                        #{job.job_card_number}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge 
                            className={`${getStatusColor(job.details.status)} cursor-pointer`}
                          >
                            {translatedStatus}
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Change status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onStatusChange(job.id!, t.inProgress)}>
                            {t.inProgress}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onStatusChange(job.id!, t.completed)}>
                            {t.completed}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onStatusChange(job.id!, t.waitingForParts)}>
                            {t.waitingForParts}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {t.customer}: {job.customer.name} • {t.device}: {job.device.name} {job.device.model}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/job-cards/${job.id}`)}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <ClipboardList className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">{t.noJobCardsFound}</h3>
            <p className="text-gray-500 mt-1">
              {t.createFirstJobCard}
            </p>
            <Button 
              onClick={() => navigate("/job-cards/new")}
              className="mt-4"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              {t.createJobCard}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
