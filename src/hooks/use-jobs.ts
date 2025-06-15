
import { useFetchJobs } from "./jobs/use-fetch-jobs";
import { useJobActions } from "./jobs/use-job-actions";
import { useJobDetails } from "./jobs/use-job-details";

export function useJobs() {
  const { jobs, loading: fetchLoading, error: fetchError, fetchJobs, setJobs } = useFetchJobs();
  const { loading: actionLoading, error: actionError, createJob, updateJob, deleteJob } = useJobActions();
  const { job, loading: detailLoading, error: detailError, getJob, setJob, clearJob } = useJobDetails();

  const loading = fetchLoading || actionLoading || detailLoading;
  const error = fetchError || actionError || detailError;

  return {
    jobs,
    job,
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    fetchJobs,
    getJob,
    setJob,
    setJobs,
    clearJob
  };
}
