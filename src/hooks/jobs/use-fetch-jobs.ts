
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Job } from "@/lib/types";
import { mapDatabaseJobToJob } from "@/lib/job-utils";

export function useFetchJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef<boolean>(false);
  const channelRef = useRef<any>(null);

  const fetchJobs = useCallback(async () => {
    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }

    // Prevent duplicate concurrent fetches
    if (fetchingRef.current) {
      console.log("Already fetching jobs, skipping...");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      fetchingRef.current = true;
      
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
      fetchingRef.current = false;
    }
  }, [user]);

  useEffect(() => {
    fetchJobs();

    if (!user?.id) return;

    // Clean up existing channel
    if (channelRef.current) {
      channelRef.current.unsubscribe();
    }

    // Set up real-time subscription with throttling
    let throttleTimeout: NodeJS.Timeout;
    
    channelRef.current = supabase
      .channel('jobs-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'jobs',
        filter: `user_id=eq.${user.id}`
      }, () => {
        console.log("Real-time update received");
        // Throttle updates to prevent excessive refetching
        clearTimeout(throttleTimeout);
        throttleTimeout = setTimeout(() => {
          if (!fetchingRef.current) {
            fetchJobs();
          }
        }, 1000);
      })
      .subscribe();

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }
      clearTimeout(throttleTimeout);
      fetchingRef.current = false;
    };
  }, [fetchJobs, user?.id]);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    setJobs
  };
}
