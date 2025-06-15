import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardData } from "@/hooks/dashboard/use-dashboard-data";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentJobCards from "@/components/dashboard/RecentJobCards";
import CompanyProfileCard from "@/components/dashboard/CompanyProfileCard";
import { toast } from "sonner";

export default function Dashboard() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const {
    jobs,
    company,
    jobsByStatus,
    recentJobs,
    isLoading,
    statusTranslations,
    reverseStatusTranslations,
    updateJob,
    setJobs,
    t
  } = useDashboardData();

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      // Convert translated status back to original status
      const originalStatus = reverseStatusTranslations[newStatus] || newStatus;
      
      // Find the job to update
      const jobToUpdate = jobs.find(j => j.id === jobId);
      if (!jobToUpdate) {
        toast.error(t.jobNotFound);
        return;
      }

      // Create updated job object
      const updatedJob = {
        ...jobToUpdate,
        details: {
          ...jobToUpdate.details,
          status: originalStatus,
          updated_at: new Date().toISOString()
        }
      };

      // Update in database
      const result = await updateJob(jobId, updatedJob);
      
      if (result) {
        // Update local state
        const updatedJobs = jobs.map(job => 
          job.id === jobId ? result : job
        );
        
        if (setJobs) {
          setJobs(updatedJobs);
        }
        
        toast.success(t.statusUpdatedSuccessfully);
      } else {
        toast.error(t.statusUpdateFailed);
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error(t.statusUpdateFailed);
    }
  };

  if (!session) {
    navigate("/");
    return null;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <DashboardHeader companyName={company?.name} />

      <DashboardStats 
        jobsByStatus={jobsByStatus}
        totalJobs={jobs.length}
        isLoading={isLoading}
        t={t}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentJobCards
            recentJobs={recentJobs}
            isLoading={isLoading}
            statusTranslations={statusTranslations}
            reverseStatusTranslations={reverseStatusTranslations}
            onStatusChange={handleStatusChange}
            t={t}
          />
        </div>
        
        <div>
          <CompanyProfileCard
            company={company}
            isLoading={isLoading}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}
