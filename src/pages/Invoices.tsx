
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Printer } from "lucide-react";
import { useInvoiceDetails } from "@/hooks/use-invoice-details";
import { PrintableInvoice } from "@/components/invoice/PrintableInvoice";
import { InvoiceNotFound } from "@/components/invoice/InvoiceNotFound";
import { PrintDialog } from "@/components/invoice/PrintDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { handleInvoicePrint } from "@/components/job/utils/print-utils";
import { DatabaseInvoice } from "@/lib/types";

const InvoiceDetail = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const { invoice, loading, getInvoice } = useInvoiceDetails();
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const printableInvoiceRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (invoiceId) {
      getInvoice(invoiceId);
    }
  }, [invoiceId]);

  const handlePrintOrPDF = () => {
    if (!printableInvoiceRef.current || !invoice) {
      toast.error('Unable to print invoice. Content not found.');
      return;
    }

    setIsPrinting(true);
    const content = printableInvoiceRef.current.innerHTML;
    handleInvoicePrint(content, invoice.invoice_number);
    setIsPrinting(false);
    setShowPrintDialog(false);
    toast.success("Invoice printed/saved successfully");
  };

  const handleBackToList = () => {
    navigate("/job-cards");
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return <InvoiceNotFound onBack={handleBackToList} />;
  }

  // Ensure invoice has required id field for DatabaseInvoice compatibility
  const databaseInvoice: DatabaseInvoice = {
    ...invoice,
    id: invoice.id || '', // Provide default empty string if id is undefined
    job_id: invoice.job_id,
    bill_description: invoice.bill_description,
    bill_amount: invoice.bill_amount,
    total: invoice.total,
    created_at: invoice.created_at || new Date().toISOString(),
    invoice_number: invoice.invoice_number,
    invoice_data: {
      status: invoice.status,
      issue_date: invoice.issue_date,
      due_date: invoice.due_date,
      line_items: invoice.line_items,
      taxes: invoice.taxes,
      subtotal: invoice.subtotal,
      tax_total: invoice.tax_total,
      notes: invoice.notes,
      terms: invoice.terms
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" onClick={handleBackToList}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Job Cards
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setShowPrintDialog(true)}
          >
            <Printer className="mr-1 h-4 w-4" />
            {isMobile ? "Save as PDF" : "Print Invoice"}
          </Button>
        </div>
        
        <div 
          ref={printableInvoiceRef} 
          id="print-content"
          className={`print-content rounded-lg shadow-sm bg-white ${isPrinting ? 'printing' : ''}`}
        >
          <PrintableInvoice invoice={databaseInvoice} />
        </div>
      </div>

      <PrintDialog 
        open={showPrintDialog} 
        onOpenChange={setShowPrintDialog}
        onPrint={handlePrintOrPDF}
      />
    </div>
  );
};

export default InvoiceDetail;
