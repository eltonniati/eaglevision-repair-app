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
import { DatabaseInvoice } from "@/lib/types";
import * as html2pdf from 'html2pdf.js';

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

  const generatePdf = async () => {
    if (!printableInvoiceRef.current || !invoice) return;

    const element = printableInvoiceRef.current;
    const opt = {
      margin: [15, 15, 15, 15], // [top, left, bottom, right] in mm
      filename: `${invoice.invoice_number || 'invoice'}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200
      },
      jsPDF: { 
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.page-break',
      }
    };

    // Clone element to avoid affecting the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.width = '210mm';
    clonedElement.style.padding = '20mm';
    document.body.appendChild(clonedElement);

    try {
      await html2pdf()
        .set(opt)
        .from(clonedElement)
        .toPdf()
        .get('pdf')
        .then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.text(
              `Page ${i} of ${totalPages}`,
              pdf.internal.pageSize.getWidth() - 25,
              pdf.internal.pageSize.getHeight() - 10
            );
          }
        })
        .save();
    } finally {
      document.body.removeChild(clonedElement);
    }
  };

  const handlePrintOrPDF = async () => {
    if (!printableInvoiceRef.current || !invoice) {
      toast.error('Unable to print invoice. Content not found.');
      return;
    }

    setIsPrinting(true);
    try {
      await generatePdf();
      toast.success("Invoice saved as PDF successfully");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF');
    } finally {
      setIsPrinting(false);
      setShowPrintDialog(false);
    }
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

  const databaseInvoice: DatabaseInvoice = {
    ...invoice,
    id: invoice.id || '',
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
    },
    jobs: (invoice as any).jobs
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center mb-4 no-print">
          <Button variant="outline" size="sm" onClick={handleBackToList}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Job Cards
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setShowPrintDialog(true)}
            disabled={isPrinting}
          >
            <Printer className="mr-1 h-4 w-4" />
            {isMobile ? "Save as PDF" : "Print Invoice"}
          </Button>
        </div>
        
        <div className="flex justify-center">
          <div 
            ref={printableInvoiceRef} 
            id="print-content"
            className="print-content bg-white rounded-lg shadow-sm"
          >
            <PrintableInvoice invoice={databaseInvoice} />
          </div>
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
