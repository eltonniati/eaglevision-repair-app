import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Job } from "@/lib/types";
import { mapDatabaseJobToJob } from "@/lib/job-utils";
import { toast } from "sonner";

export function useJobDetails() {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const getJob = useCallback(async (id: string) => {
    if (!id) {
      setError("Job ID is required");
      toast.error("Job ID is required");
      return null;
    }
    
    // Prevent duplicate fetches for the same job
    if (fetchingRef.current === id && loading) {
      console.log("Already fetching job:", id);
      return job;
    }

    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    try {
      setLoading(true);
      setError(null);
      fetchingRef.current = id;

      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      console.log("Fetching job with ID:", id);

      const { data, error } = await supabase
        .from("jobs")
        .select("*, companies(*)")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Job fetch error:", error);
        setError(error.message || "Failed to load job");
        setJob(null);
        toast.error(`Failed to load job card: ${error.message}`);
        return null;
      }
      
      if (!data) {
        console.log("No job found with ID:", id);
        setError("Job not found");
        setJob(null);
        toast.error("Job card not found");
        return null;
      }

      console.log("Job data retrieved successfully");
      const jobData = mapDatabaseJobToJob(data);
      setJob(jobData);
      return jobData;
    } catch (err: any) {
      // Don't show errors for aborted requests
      if (err.name === 'AbortError') {
        console.log("Job fetch aborted");
        return null;
      }
      
      console.error("Get Job Error:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load job";
      setError(errorMessage);
      setJob(null);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
      fetchingRef.current = null;
      abortControllerRef.current = null;
    }
  }, [job, loading]);

  const clearJobError = useCallback(() => {
    setError(null);
  }, []);

  const clearJob = useCallback(() => {
    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setJob(null);
    setError(null);
    setLoading(false);
    fetchingRef.current = null;
  }, []);

  return {
    job,
    loading,
    error,
    getJob,
    setJob,
    clearJobError,
    clearJob
  };
}
