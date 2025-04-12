import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "@/hooks/use-jobs";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PlusCircle, Printer } from "lucide-react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { PrintableJobCards } from "@/components/job/PrintableJobCards";
import { useIsMobile } from "@/hooks/use-mobile";

const formatCurrency = (amount: number = 0) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Finished":
      return "bg-green-100 text-green-800";
    case "Waiting for Parts":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function JobCards() {
  const { jobs, loading } = useJobs();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const printableRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [showPrintDialog, setShowPrintDialog] = useState(false);

  const prepareForPrinting = () => {
    document.body.classList.add('is-printing');
    const dialogs = document.querySelectorAll('[role="dialog"]');
    dialogs.forEach(dialog => {
      dialog.classList.add('no-print');
    });
  };

  const cleanupAfterPrinting = () => {
    document.body.classList.remove('is-printing');
    setShowPrintDialog(false);
  };

  const handlePrintOrPDF = useReactToPrint({
    documentTitle: "Job_Cards_Report",
    contentRef: printableRef,
    onBeforePrint: () => {
      return new Promise<void>((resolve) => {
        prepareForPrinting();
        setTimeout(resolve, 300);
      });
    },
    onAfterPrint: () => {
      cleanupAfterPrinting();
    },
    onPrintError: (error) => {
      console.error("Print error:", error);
      cleanupAfterPrinting();
      toast.error("Failed to print job cards");
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
    `,
  });

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchTerm === "" ||
      job.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.job_card_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.device.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || job.details.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/dashboard")}
          className="no-print"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={() => navigate("/job-cards/new")}
            className="no-print"
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            New Job Card
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setShowPrintDialog(true)}
            className="no-print"
          >
            <Printer className="mr-1 h-4 w-4" />
            {isMobile ? "PDF" : "Print All"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 no-print">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search jobs..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Finished">Finished</SelectItem>
            <SelectItem value="Waiting for Parts">Waiting for Parts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading job cards...
                </TableCell>
              </TableRow>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/job-cards/${job.id}`)}
                >
                  <TableCell className="font-medium">
                    {job.job_card_number}
                  </TableCell>
                  <TableCell>{job.customer.name}</TableCell>
                  <TableCell>
                    {job.device.name} {job.device.model}
                  </TableCell>
                  <TableCell>
                    {format(new Date(job.created_at!), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(job.details.handling_fees)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(job.details.status)}>
                      {job.details.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No job cards found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div style={{ display: 'none' }}>
        <div ref={printableRef}>
          <PrintableJobCards jobs={filteredJobs} />
        </div>
      </div>

      <PrintDialog 
        open={showPrintDialog} 
        onOpenChange={setShowPrintDialog}
        onPrint={handlePrintOrPDF}
        showPreviewOption={false}
      />
    </div>
  );
}
