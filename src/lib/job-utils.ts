
// Cryptographic random string generator
export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const crypto = window.crypto || (window as any).msCrypto;
  const values = new Uint32Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (value) => characters[value % characters.length]).join('');
};

// Database to frontend model mapper
export const mapDatabaseJobToJob = (dbJob: any): Job => ({
  id: dbJob.id,
  job_card_number: dbJob.job_card_number,
  customer: {
    name: dbJob.customer_name,
    phone: dbJob.customer_phone,
    email: dbJob.customer_email || undefined
  },
  device: {
    name: dbJob.device_name,
    model: dbJob.device_model,
    condition: dbJob.device_condition
  },
  details: {
    problem: dbJob.problem,
    status: dbJob.status as JobStatus,
    handling_fees: dbJob.handling_fees
  },
  created_at: dbJob.created_at,
  updated_at: dbJob.updated_at,
  price: dbJob.handling_fees,
  company_id: dbJob.company_id
});

// Frontend to database mapper with validation
export const validateJobPhone = (phone: string): boolean => {
  return /^\d{10,}$/.test(phone);
};

// Job number generator
export const generateJobCardNumber = async (userId: string, supabase: any): Promise<string> => {
  try {
    const { data, error } = await supabase.rpc('increment_job_number', { 
      p_user_id: userId 
    });

    if (error || typeof data !== "number") {
      throw new Error(error?.message || "Invalid sequence number");
    }

    const userPrefix = userId.slice(0, 4).toUpperCase();
    return `${userPrefix}-${data.toString().padStart(4, '0')}`;
  } catch (error) {
    console.error("Job Number Generation Failed:", error);
    throw new Error("Failed to generate job number. Please try again.");
  }
};

// Prepare job data for database insertion
export const prepareJobForDatabase = async (
  job: Omit<Job, 'id' | 'job_card_number' | 'created_at' | 'updated_at'>,
  userId: string,
  supabase: any
) => {
  // Validate phone number format
  if (!validateJobPhone(job.customer.phone)) {
    throw new Error("Phone number must contain at least 10 digits");
  }

  return {
    customer_name: job.customer.name.substring(0, 50),
    customer_phone: job.customer.phone,
    customer_email: job.customer.email?.substring(0, 100) || null,
    device_name: job.device.name.substring(0, 50),
    device_model: job.device.model.substring(0, 50),
    device_condition: job.device.condition,
    problem: job.details.problem.substring(0, 500),
    status: job.details.status,
    handling_fees: Number(job.details.handling_fees) || 0,
    job_card_number: await generateJobCardNumber(userId, supabase),
    user_id: userId,
    company_id: job.company_id || null
  };
};

import { Job, JobStatus } from "@/lib/types";
