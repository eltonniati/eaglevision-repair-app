
import React from 'react';
import { Job } from '@/lib/types';
import { PrintableJobCard } from './PrintableJobCard';

interface JobDetailContentProps {
  job: Job;
  editedJob: {
    problem: string;
    status: "In Progress" | "Finished" | "Waiting for Parts";
    handling_fees: number;
    customer: {
      name: string;
      phone: string;
      email: string;
    };
    device: {
      name: string;
      model: string;
      condition: string;
    };
    company: {
      name: string;
    };
  };
  printableRef: React.RefObject<HTMLDivElement>;
}

export const JobDetailContent: React.FC<JobDetailContentProps> = ({
  job,
  editedJob,
  printableRef
}) => {
  return (
    <div 
      ref={printableRef} 
      id="print-content"
      className="print-content rounded-lg shadow-sm bg-white"
    >
      <PrintableJobCard 
        job={job}
        customerName={editedJob.customer.name}
        customerPhone={editedJob.customer.phone}
        customerEmail={editedJob.customer.email}
        deviceName={editedJob.device.name}
        deviceModel={editedJob.device.model}
        deviceCondition={editedJob.device.condition}
        problem={editedJob.problem}
        handlingFees={editedJob.handling_fees}
        companyName={editedJob.company.name}
      />
    </div>
  );
};
