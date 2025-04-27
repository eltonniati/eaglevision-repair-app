
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/lib/types";
import { mapDatabaseJobToJob } from "@/lib/job-utils";
import { toast } from "sonner";

export function useJobDetails() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getJob = async (id: string) => {
    if (!id) {
      setError("Job ID is required");
      return null;
    }
    
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching job with ID:", id);

      const { data, error } = await supabase
        .from("jobs")
        .select("*, companies(*)")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Job fetch error:", error);
        setError(error.message || "Failed to load job");
        setJob(null);
        toast.error("Failed to load job card");
        return null;
      }
      
      if (!data) {
        console.log("No job found with ID:", id);
        setError("Job not found");
        setJob(null);
        toast.error("Job card not found");
        return null;
      }

      console.log("Job data retrieved:", data);
      const jobData = mapDatabaseJobToJob(data);
      setJob(jobData);
      return jobData;
    } catch (err) {
      console.error("Get Job Error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load job";
      setError(errorMessage);
      setJob(null);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    job,
    loading,
    error,
    getJob,
    setJob
  };
}
