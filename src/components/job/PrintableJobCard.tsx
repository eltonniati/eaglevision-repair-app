
import { format } from "date-fns";
import { Job } from "@/lib/types";
import { Signature } from "@/components/common/Signature";

interface PrintableJobCardProps { 
  job: Job, 
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  deviceName: string,
  deviceModel: string,
  deviceCondition: string,
  problem: string,
  handlingFees: number,
  companyName: string,
  companyLogoUrl?: string,
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount);
};

export const PrintableJobCard = ({ 
  job, 
  customerName, 
  customerPhone, 
  customerEmail, 
  deviceName, 
  deviceModel, 
  deviceCondition, 
  problem,
  handlingFees,
  companyName,
  companyLogoUrl,
}: PrintableJobCardProps) => (
  <div className="p-6 print:block print:visible print:w-full print:text-black bg-white text-black">
    <div className="border-2 border-gray-200 p-6 print:border print:border-gray-300">
      <div className="flex justify-between items-start mb-8">
        {/* LOGO SECTION */}
        <div className="flex items-center gap-4">
          <img
            src={companyLogoUrl || "/logo.png"}
            alt="Company Logo"
            className="h-14 w-14 object-contain bg-white border rounded print:border print:border-gray-300"
            style={{ minWidth: 56, minHeight: 56, background: "#fff" }}
            onError={e => {
              (e.target as HTMLImageElement).src = "https://placehold.co/56x56?text=Logo";
            }}
          />
          <div>
            <h1 className="text-3xl font-bold text-black">JOB CARD</h1>
            <p className="text-lg font-medium text-black">#{job?.job_card_number}</p>
          </div>
        </div>
        <div className="text-right text-black">
          <p><strong>Created Date:</strong> {format(new Date(job?.created_at || new Date()), "MMMM d, yyyy")}</p>
          <p><strong>Status:</strong> {job?.details.status}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8 text-black">
        <div>
          <h2 className="text-lg font-semibold border-b mb-2 text-black">Company</h2>
          <p>{companyName}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold border-b mb-2 text-black">Customer</h2>
          <p>{customerName}</p>
          <p>{customerPhone}</p>
          <p>{customerEmail}</p>
        </div>
      </div>

      <div className="mb-8 text-black">
        <h2 className="text-lg font-semibold border-b mb-2 text-black">Device</h2>
        <p><strong>Name:</strong> {deviceName}</p>
        <p><strong>Model:</strong> {deviceModel}</p>
        <p><strong>Condition:</strong> {deviceCondition}</p>
      </div>

      <div className="mb-8 text-black">
        <h2 className="text-lg font-semibold border-b mb-2 text-black">Details</h2>
        <p><strong>Problem:</strong> {problem}</p>
        <p><strong>Handling Fees:</strong> {formatCurrency(handlingFees)}</p>
      </div>

      <div className="mt-6 text-sm text-center border-t pt-2 text-black">
        <p>Generated on: {format(new Date(), "MMMM d, yyyy HH:mm")}</p>
        <div className="mt-2">
          <Signature className="text-black" />
        </div>
      </div>
    </div>
  </div>
);
