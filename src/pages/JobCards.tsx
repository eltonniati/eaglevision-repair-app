import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Printer, Trash2 } from "lucide-react";
import { useJobs } from "@/hooks/use-jobs";
import { useCompanies } from "@/hooks/use-companies";
import { JobStatus } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PrintDialog } from "@/components/invoice/PrintDialog";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);
};

const PrintableJobCard = ({ 
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
}: { 
  job: any, 
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  deviceName: string,
  deviceModel: string,
  deviceCondition: string,
  problem: string,
  handlingFees: number,
  companyName: string
}) => (
  <div className="p-6" id="printable-content">
    <div className="border-2 border-gray-200 p-6">
      {/* ... rest of your printable job card content ... */}
    </div>
  </div>
);

const JobDetail = () => {
  // ... (keep all your existing state and hooks)

  const printableRef = useRef<HTMLDivElement>(null);
  const previewPrintableRef = useRef<HTMLDivElement>(null);

  const handlePrintOrPDF = useReactToPrint({
    documentTitle: `JobCard_${job?.job_card_number || "unknown"}`,
    content: () => printableRef.current || previewPrintableRef.current,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 15mm;
      }
      @media print {
        body {
          background: white !important;
          color: black !important;
          visibility: hidden;
        }
        #printable-content, #printable-content * {
          visibility: visible;
        }
        .no-print {
          display: none !important;
        }
        a {
          text-decoration: none !important;
        }
        #printable-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 0;
        }
      }
    `,
    onBeforeGetContent: () => {
      document.body.classList.add('printing');
      return new Promise((resolve) => {
        setTimeout(resolve, 300); // Small delay to ensure content is ready
      });
    },
    onAfterPrint: () => {
      document.body.classList.remove('printing');
      setIsPreviewMode(false);
      toast.success("Job card printed successfully");
    },
    onPrintError: (error) => {
      console.error("Print error:", error);
      document.body.classList.remove('printing');
      toast.error("Failed to print job card");
      setIsPreviewMode(false);
    },
  });

  const handlePrintNow = () => {
    handlePrintOrPDF();
  };

  // ... (keep all your other functions)

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* ... (keep your existing UI) */}

      {isPreviewMode ? (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4 no-print">
            <h2 className="text-2xl font-bold">Job Card Preview</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsPreviewMode(false)}>
                Back to Details
              </Button>
              <Button onClick={handlePrintNow}>
                <Printer className="mr-2 h-4 w-4" />
                Print Now
              </Button>
            </div>
          </div>
          
          <div ref={previewPrintableRef}>
            <PrintableJobCard 
              job={job}
              customerName={editedCustomerName}
              customerPhone={editedCustomerPhone}
              customerEmail={editedCustomerEmail}
              deviceName={editedDeviceName}
              deviceModel={editedDeviceModel}
              deviceCondition={editedDeviceCondition}
              problem={editedProblem}
              handlingFees={editedHandlingFees}
              companyName={editedCompanyName}
            />
          </div>
        </div>
      ) : (
        // ... (rest of your existing UI)
      )}

      {/* Hidden printable content for direct printing */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <div ref={printableRef}>
          <PrintableJobCard 
            job={job}
            customerName={editedCustomerName}
            customerPhone={editedCustomerPhone}
            customerEmail={editedCustomerEmail}
            deviceName={editedDeviceName}
            deviceModel={editedDeviceModel}
            deviceCondition={editedDeviceCondition}
            problem={editedProblem}
            handlingFees={editedHandlingFees}
            companyName={editedCompanyName}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
