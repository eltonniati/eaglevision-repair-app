import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardData } from "@/hooks/dashboard/use-dashboard-data";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentJobCards from "@/components/dashboard/RecentJobCards";
import CompanyProfileCard from "@/components/dashboard/CompanyProfileCard";
import { toast } from "sonner";
import { useCallback } from "react";
import { JobStatus } from "@/lib/types";

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
    fetchJobs, // NEW: fetch jobs for refresh
    t
  } = useDashboardData();

  // NEW: Refresh jobs list
  const refreshJobs = useCallback(async () => {
    if (fetchJobs) {
      await fetchJobs();
      toast.success(t.jobsRefreshed);
    }
  }, [fetchJobs, t]);

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      // Convert translated status back to original status (and enforce type)
      let originalStatusString = reverseStatusTranslations[newStatus] || newStatus;
      // Ensure that originalStatusString is JobStatus type
      const allowedStatus: JobStatus[] = ["In Progress", "Finished", "Waiting for Parts"];
      const originalStatus = allowedStatus.includes(originalStatusString as JobStatus)
        ? (originalStatusString as JobStatus)
        : "In Progress"; // fallback to In Progress

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

      // Optimistic update: update UI state before backend call
      const optimisticJobs = jobs.map(job =>
        job.id === jobId ? updatedJob : job
      );
      if (setJobs) {
        setJobs(optimisticJobs as typeof jobs);
      }

      // Update in database
      const result = await updateJob(jobId, updatedJob);

      if (result) {
        // Replace with the backend-confirmed updated job (in case backend changed other fields)
        const updatedJobs = optimisticJobs.map(job =>
          job.id === jobId ? result : job
        );
        if (setJobs) {
          setJobs(updatedJobs as typeof jobs);
        }
        toast.success(t.statusUpdatedSuccessfully);
        // Optionally refresh from backend to pull real-time updates from others
        // await refreshJobs();
      } else {
        toast.error(t.statusUpdateFailed);
        // Optionally, rollback optimistic update by refreshing jobs from backend:
        await refreshJobs();
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error(t.statusUpdateFailed);
      // Optionally, rollback optimistic update by refreshing jobs from backend:
      await refreshJobs();
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
          <button
            onClick={refreshJobs}
            className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded transition"
          >
            {t.refreshJobs || "Refresh Jobs"}
          </button>
        </div>
      </div>
    </div>
  );
}
