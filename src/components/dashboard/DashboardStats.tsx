
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStatusManagement } from "@/hooks/dashboard/use-status-management";

interface DashboardStatsProps {
  jobsByStatus: { [key: string]: number };
  totalJobs: number;
  isLoading: boolean;
  t: any;
}

export default function DashboardStats({ jobsByStatus, totalJobs, isLoading, t }: DashboardStatsProps) {
  const navigate = useNavigate();
  const { getStatusIcon } = useStatusManagement();

  const handleCardClick = (status: string | null) => {
    navigate("/job-cards", { state: status ? { status } : undefined });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Job Cards */}
      <Card
        role="button"
        tabIndex={0}
        className="hover:shadow-md cursor-pointer transition"
        onClick={() => handleCardClick(null)}
        onKeyDown={e => { if (e.key === 'Enter') handleCardClick(null); }}
        aria-label={t.totalJobCards}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">
            {t.jobCards}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalJobs}</div>
          <p className="text-sm text-gray-500 mt-1">{t.totalJobCards}</p>
        </CardContent>
      </Card>
      
      {/* Jobs By Status */}
      {Object.entries(jobsByStatus).map(([status, count]) => (
        <Card
          key={status}
          role="button"
          tabIndex={0}
          className="hover:shadow-md cursor-pointer transition"
          onClick={() => handleCardClick(status)}
          onKeyDown={e => { if (e.key === 'Enter') handleCardClick(status); }}
          aria-label={status}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                {getStatusIcon(status)}
                <span>{status}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{count}</div>
            <p className="text-sm text-gray-500 mt-1">
              {status === t.inProgress && t.jobsInProgress}
              {status === t.completed && t.jobsCompleted}
              {status === t.waitingForParts && t.jobsWaitingParts}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
