
import { useState, useEffect } from "react";
import { useJobs } from "@/hooks/use-jobs";
import { useCompany } from "@/hooks/use-company";
import { useLanguage } from "@/contexts/LanguageContext";

export function useDashboardData() {
  const { jobs, loading: jobsLoading, updateJob, setJobs, fetchJobs } = useJobs(); // ADD fetchJobs
  const { company, loading: companyLoading } = useCompany();
  const { t } = useLanguage();
  const [jobsByStatus, setJobsByStatus] = useState<{ [key: string]: number }>({});

  // Status translations mapping
  const statusTranslations = {
    "In Progress": t.inProgress,
    "Completed": t.completed,
    "Finished": t.completed,
    "Waiting for Parts": t.waitingForParts
  };

  // Reverse mapping for status translations
  const reverseStatusTranslations = {
    [t.inProgress]: "In Progress",
    [t.completed]: "Completed",
    [t.waitingForParts]: "Waiting for Parts"
  };

  useEffect(() => {
    if (!jobsLoading && jobs) {
      updateStatusCounts();
    }
  }, [jobs, jobsLoading, t]);

  const updateStatusCounts = () => {
    const statusCounts: { [key: string]: number } = {
      [t.inProgress]: 0,
      [t.completed]: 0,
      [t.waitingForParts]: 0,
    };

    jobs.forEach((job) => {
      const translatedStatus = statusTranslations[job.details.status] || job.details.status;
      if (statusCounts[translatedStatus] !== undefined) {
        statusCounts[translatedStatus]++;
      }
    });

    setJobsByStatus(statusCounts);
  };

  const isLoading = jobsLoading || companyLoading;
  const recentJobs = jobs.slice(0, 5);

  return {
    jobs,
    company,
    jobsByStatus,
    recentJobs,
    isLoading,
    statusTranslations,
    reverseStatusTranslations,
    updateJob,
    setJobs,
    fetchJobs, // Expose fetchJobs for refreshJobs
    t
  };
}
