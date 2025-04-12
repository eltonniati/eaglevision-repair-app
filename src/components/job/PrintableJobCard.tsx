
import React from 'react';
import { format } from 'date-fns';
import type { Job } from '@/lib/types';

interface PrintableJobCardProps {
  job: Job;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deviceName: string;
  deviceModel: string;
  deviceCondition: string;
  problem: string;
  handlingFees: number;
  companyName: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);
};

export const PrintableJobCard: React.FC<PrintableJobCardProps> = ({
  job,
  customerName,
  customerPhone,
  customerEmail,
  deviceName,
  deviceModel,
  deviceCondition,
  problem,
  handlingFees,
  companyName
}) => {
  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Job Card</h2>
          <p className="text-muted-foreground">#{job.job_card_number}</p>
        </div>
        <div className="text-right">
          {companyName && <p className="font-medium">{companyName}</p>}
          <p className="text-sm text-muted-foreground">
            Created: {format(new Date(job.created_at!), 'PP')}
          </p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Customer Information</h3>
          <p>{customerName}</p>
          <p>{customerPhone}</p>
          {customerEmail && <p>{customerEmail}</p>}
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Device Information</h3>
          <p><span className="text-muted-foreground">Device:</span> {deviceName}</p>
          <p><span className="text-muted-foreground">Model:</span> {deviceModel}</p>
          <p><span className="text-muted-foreground">Condition:</span> {deviceCondition}</p>
        </div>
      </div>

      <div className="mt-6 p-4 border rounded-md">
        <h3 className="font-medium mb-2">Problem Description</h3>
        <p>{problem}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Status</h3>
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
            ${job.details.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
              job.details.status === 'Finished' ? 'bg-green-100 text-green-800' : 
              job.details.status === 'Waiting for Parts' ? 'bg-amber-100 text-amber-800' : 
              'bg-gray-100 text-gray-800'}`}>
            {job.details.status}
          </div>
        </div>

        <div className="p-4 border rounded-md">
          <h3 className="font-medium mb-2">Fees</h3>
          <p className="text-xl font-bold">{formatCurrency(handlingFees)}</p>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t flex justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Technician Signature</p>
          <div className="mt-8 h-0.5 w-40 bg-gray-300"></div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Customer Signature</p>
          <div className="mt-8 h-0.5 w-40 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};
