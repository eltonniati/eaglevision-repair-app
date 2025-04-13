
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Job } from "@/lib/types";
import { mapDatabaseJobToJob, prepareJobForDatabase } from "@/lib/job-utils";

export function useJobActions() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createJob = async (jobData: Omit<Job, 'id' | 'job_card_number' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    let retries = 0;
    const maxRetries = 3;
    const errors: string[] = [];

    while (retries <= maxRetries) {
      try {
        setLoading(true);
        const dbJobData = await prepareJobForDatabase(jobData, user.id, supabase);

        const { data, error } = await supabase
          .from("jobs")
          .insert(dbJobData)
          .select()
          .single();

        if (error) throw error;

        const newJob = mapDatabaseJobToJob(data);
        toast.success("Job created successfully");
        return newJob;
      } catch (err: any) {
        errors.push(err.message);
        retries++;
        
        if (retries < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 100));
          continue;
        }

        console.error("Create Job Failed:", errors);
        toast.error(errors.join("\n") || "Failed to create job");
        return null;
      } finally {
        setLoading(false);
      }
    }
    return null;
  };

  const updateJob = async (id: string, updates: Partial<Job>) => {
    if (!user) return null;

    try {
      setLoading(true);
      const updateData: Record<string, any> = {};

      if (updates.customer) {
        updateData.customer_name = updates.customer.name?.substring(0, 50);
        updateData.customer_phone = updates.customer.phone;
        updateData.customer_email = updates.customer.email?.substring(0, 100) || null;
      }

      if (updates.device) {
        updateData.device_name = updates.device.name?.substring(0, 50);
        updateData.device_model = updates.device.model?.substring(0, 50);
        updateData.device_condition = updates.device.condition;
      }

      if (updates.details) {
        updateData.problem = updates.details.problem?.substring(0, 500);
        updateData.status = updates.details.status;
        updateData.handling_fees = Number(updates.details.handling_fees) || 0;
      }

      if (updates.company_id) {
        updateData.company_id = updates.company_id;
      }

      const { data, error } = await supabase
        .from("jobs")
        .update(updateData)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;

      const updatedJob = mapDatabaseJobToJob(data);
      toast.success("Job updated successfully");
      return updatedJob;
    } catch (err) {
      console.error("Update Error:", err);
      toast.error(err instanceof Error ? err.message : "Update failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    if (!user) return false;

    try {
      setLoading(true);
      
      // Verify ownership first
      const { data: jobData, error: fetchError } = await supabase
        .from("jobs")
        .select("user_id")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;
      
      if (!jobData || jobData.user_id !== user.id) {
        throw new Error("Job not found or unauthorized");
      }

      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Job deleted successfully");
      return true;
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error(err instanceof Error ? err.message : "Deletion failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createJob,
    updateJob,
    deleteJob
  };
}
