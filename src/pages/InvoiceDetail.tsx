
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Printer } from "lucide-react";
import { useInvoiceDetails } from "@/hooks/use-invoice-details";
import { PrintableInvoice } from "@/components/invoice/PrintableInvoice";
import { InvoiceNotFound } from "@/components/invoice/InvoiceNotFound";
import { PrintDialog } from "@/components/invoice/PrintDialog";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const prepareForPrinting = () => {
    // Add classes to help with print styling
    document.body.classList.add('is-printing');
    // Hide all dialogs and unnecessary elements
    const dialogs = document.querySelectorAll('[role="dialog"]');
    dialogs.forEach(dialog => {
      dialog.classList.add('no-print');
    });
  };

  const cleanupAfterPrinting = () => {
    document.body.classList.remove('is-printing');
    setIsPrinting(false);
    setShowPrintDialog(false);
  };

  const handlePrintOrPDF = useReactToPrint({
    documentTitle: `Invoice_${invoice?.invoice_number || "unknown"}`,
    // Changed from content to contentRef to match the expected property
    contentRef: () => printableInvoiceRef.current,
    onBeforeGetContent: () => {
      setIsPrinting(true);
      return new Promise<void>((resolve) => {
        prepareForPrinting();
        setTimeout(resolve, 300);
      });
    },
    onAfterPrint: () => {
      cleanupAfterPrinting();
      toast.success("Invoice printed/saved successfully");
    },
    onPrintError: (error) => {
      console.error("Print error:", error);
      cleanupAfterPrinting();
      toast.error("Failed to print invoice");
    },
    removeAfterPrint: true,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
    `,
  });

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

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center mb-4 no-print">
          <Button variant="outline" size="sm" onClick={handleBackToList} className="no-print">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Job Cards
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setShowPrintDialog(true)}
            className="no-print"
          >
            <Printer className="mr-1 h-4 w-4" />
            {isMobile ? "Save as PDF" : "Print Invoice"}
          </Button>
        </div>
        
        <div 
          ref={printableInvoiceRef} 
          id="print-content"
          className="print-content rounded-lg shadow-sm bg-white"
        >
          <PrintableInvoice invoice={invoice} />
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
};

export default InvoiceDetail;
