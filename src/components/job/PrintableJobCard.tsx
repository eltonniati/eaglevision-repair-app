
import { format } from "date-fns";
import { Job, Company } from "@/lib/types";

interface PrintableJobCardProps {
  job: Job;
  company: Company | null;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount);
};

export const PrintableJobCard = ({ job, company }: PrintableJobCardProps) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 text-black font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-gray-200">
        <div className="flex items-center gap-3">
          {company?.logo_url && (
            <img 
              src={company.logo_url}
              alt="Company Logo" 
              className="h-12 w-12 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-800 mb-1">JOB CARD</h1>
            <p className="text-lg font-semibold text-gray-600">#{job.job_card_number}</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Date:</span> {format(new Date(job.created_at || new Date()), "MMM d, yyyy")}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Status:</span> 
            <span className="ml-1 px-2 py-1 bg-gray-100 rounded text-xs">{job.details.status}</span>
          </p>
        </div>
      </div>

      {/* Company and Customer Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded border">
          <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">Company</h3>
          <div className="space-y-1">
            <p className="font-semibold text-gray-700">{company?.name || "Company Name"}</p>
            {company?.address && <p className="text-gray-600 text-xs">{company.address}</p>}
            {company?.phone && <p className="text-gray-600 text-xs">{company.phone}</p>}
            {company?.email && <p className="text-gray-600 text-xs">{company.email}</p>}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded border">
          <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">Customer</h3>
          <div className="space-y-1">
            <p className="font-semibold text-gray-700">{job.customer.name}</p>
            <p className="text-gray-600 text-xs">{job.customer.phone}</p>
            {job.customer.email && <p className="text-gray-600 text-xs">{job.customer.email}</p>}
          </div>
        </div>
      </div>

      {/* Device Information */}
      <div className="bg-gray-50 p-4 rounded border mb-6">
        <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">Device Details</h3>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Device:</span>
            <span className="ml-2 text-gray-600">{job.device.name}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Model:</span>
            <span className="ml-2 text-gray-600">{job.device.model}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Condition:</span>
            <span className="ml-2 text-gray-600">{job.device.condition}</span>
          </p>
        </div>
      </div>

      {/* Problem and Fees */}
      <div className="bg-gray-50 p-4 rounded border mb-6">
        <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">Job Details</h3>
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-gray-700 mb-1">Problem Description:</p>
            <p className="text-gray-600 text-sm whitespace-pre-line">{job.details.problem}</p>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="font-semibold text-gray-700">Handling Fees:</span>
            <span className="text-lg font-bold text-gray-800">{formatCurrency(job.details.handling_fees)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
        <p>Generated on {format(new Date(), "MMM d, yyyy 'at' HH:mm")}</p>
        <p className="mt-1">Thank you for your business!</p>
      </div>
    </div>
  );
};
