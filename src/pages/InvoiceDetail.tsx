
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share } from "lucide-react";
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

  const handlePrintOrPDF = useReactToPrint({
    documentTitle: `Invoice_${invoice?.invoice_number || "unknown"}`,
    contentRef: printableInvoiceRef,
    onBeforePrint: () => {
      setIsPrinting(true);
      return new Promise<void>((resolve) => {
        setTimeout(resolve, 100);
      });
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      setShowPrintDialog(false);
      toast.success("Invoice printed/saved successfully");
    },
    onPrintError: (error) => {
      console.error("Print error:", error);
      toast.error("Failed to print invoice");
      setIsPrinting(false);
      setShowPrintDialog(false);
    },
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

  const handleShare = async () => {
    if (!invoice) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Invoice #${invoice.invoice_number}`,
          text: `Invoice details for #${invoice.invoice_number}`,
        });
        toast.success("Invoice shared successfully");
      } else {
        // Fallback for WhatsApp
        const text = `Invoice #${invoice.invoice_number} - Total: ${invoice.total}`;
        const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(text)}`;
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share invoice");
    }
    setShowPrintDialog(false);
  };

  const handleEmail = () => {
    if (!invoice) return;
    
    const subject = encodeURIComponent(`Invoice #${invoice.invoice_number}`);
    const body = encodeURIComponent(`Please find attached Invoice #${invoice.invoice_number}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowPrintDialog(false);
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
        <div className="flex justify-between items-center mb-4">
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
            {isMobile ? (
              <>
                <Share className="mr-1 h-4 w-4" />
                Share
              </>
            ) : (
              <>
                <Share className="mr-1 h-4 w-4" />
                Print/Share
              </>
            )}
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
        onShare={handleShare}
        onEmail={handleEmail}
        invoiceNumber={invoice.invoice_number}
      />
    </div>
  );
};

export default InvoiceDetail;
