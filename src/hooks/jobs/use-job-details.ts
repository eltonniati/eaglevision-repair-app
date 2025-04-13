
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/lib/types";
import { mapDatabaseJobToJob } from "@/lib/job-utils";

export function useJobDetails() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getJob = async (id: string) => {
    if (!id) return null;
    
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching job with ID:", id);

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Job fetch error:", error);
        throw error;
      }
      
      if (!data) {
        console.log("No job found with ID:", id);
        setJob(null);
        return null;
      }

      console.log("Job data retrieved:", data);
      const jobData = mapDatabaseJobToJob(data);
      setJob(jobData);
      return jobData;
    } catch (err) {
      console.error("Get Job Error:", err);
      setError(err instanceof Error ? err.message : "Failed to load job");
      setJob(null);
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
