
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Job } from "@/lib/types";
import { mapDatabaseJobToJob } from "@/lib/job-utils";

export function useFetchJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user) {
        setJobs([]);
        return;
      }

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data?.map(mapDatabaseJobToJob) || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();

    const channel = supabase
      .channel('jobs-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'jobs',
        filter: `user_id=eq.${user?.id}`
      }, fetchJobs)
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user?.id]);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    setJobs
  };
}
