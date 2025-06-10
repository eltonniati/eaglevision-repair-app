
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Job } from "@/lib/types";
import { mapDatabaseJobToJob } from "@/lib/job-utils";

export function useFetchJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching jobs for user:", user.id);

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const mappedJobs = data?.map(mapDatabaseJobToJob) || [];
      console.log("Jobs fetched successfully:", mappedJobs.length);
      setJobs(mappedJobs);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchJobs();

    if (!user?.id) return;

    const channel = supabase
      .channel('jobs-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'jobs',
        filter: `user_id=eq.${user.id}`
      }, () => {
        console.log("Real-time update received, refetching jobs");
        fetchJobs();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    setJobs
  };
}
