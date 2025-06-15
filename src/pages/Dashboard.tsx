
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardData } from "@/hooks/dashboard/use-dashboard-data";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentJobCards from "@/components/dashboard/RecentJobCards";
import CompanyProfileCard from "@/components/dashboard/CompanyProfileCard";

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
      // Convert translated status back to original status in string
      const originalStatus = reverseStatusTranslations[newStatus] || newStatus;
      // Find the job to get its current data for the update 
      const jobToUpdate = jobs.find(j => j.id === jobId);
      if (!jobToUpdate) return;
      
      // Only status is changing here (for dashboard quick action)
      const updates = {
        ...jobToUpdate,
        details: {
          ...jobToUpdate.details,
          status: originalStatus as import("@/lib/types").JobStatus,
        },
      };
      
      // Push to Supabase!
      const updatedJob = await updateJob(jobId, updates);
      
      if (updatedJob && setJobs) {
        // Immediately update the local jobs array
        const updatedJobs = jobs.map(job => 
          job.id === jobId ? updatedJob : job
        );
        setJobs(updatedJobs);
        console.log("Job status updated successfully:", updatedJob);
      }
    } catch (error) {
      console.error("Error updating job status:", error);
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
