
import React from 'react';
import { format } from 'date-fns';
import type { Job } from '@/lib/types';
import { PrintableJobCard } from './PrintableJobCard';

interface PrintableJobCardsProps {
  jobs: Job[];
}

export const PrintableJobCards: React.FC<PrintableJobCardsProps> = ({ jobs }) => {
  return (
    <div className="p-8 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Job Cards Report</h1>
        <p className="text-muted-foreground">Generated on {format(new Date(), 'PPP')}</p>
        <p className="text-sm text-muted-foreground mt-1">Total jobs: {jobs.length}</p>
      </div>

      <div className="space-y-8">
        {jobs.map((job, index) => (
          <div key={job.id} className={index > 0 ? "mt-16 pt-16 border-t" : ""}>
            <PrintableJobCard 
              job={job}
              customerName={job.customer.name}
              customerPhone={job.customer.phone}
              customerEmail={job.customer.email}
              deviceName={job.device.name}
              deviceModel={job.device.model}
              deviceCondition={job.device.condition}
              problem={job.details.problem}
              handlingFees={job.details.handling_fees}
              companyName=""
            />
            {index < jobs.length - 1 && <div className="page-break" />}
          </div>
        ))}
      </div>
    </div>
  );
};
