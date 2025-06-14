
// New entry: Only responsible for fetching and state bootstrap
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import JobDetailMain from "@/components/job/job-detail/JobDetailMain";
import { JobLoading } from "@/components/job/JobLoading";
import { JobError } from "@/components/job/JobError";
import { JobCardNotFound } from "@/components/job/JobCardNotFound";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { job, loading, error, getJob } = useJobs();
  const { companies, fetchCompanies } = useCompanies();
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      if (id) {
        await getJob(id);
        setLoadingComplete(true);
      }
    };
    loadJob();
    fetchCompanies();
  }, [id, getJob, fetchCompanies]);

  if (error) return <JobError error={error} />;
  if (loading && !loadingComplete) return <JobLoading />;
  if (loadingComplete && !job) return <JobCardNotFound onBack={() => window.history.back()} />;
  if (!job) return <JobLoading />;

  return <JobDetailMain job={job} companies={companies} />;
};

export default JobDetail;
