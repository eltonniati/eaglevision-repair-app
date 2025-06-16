import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share2, Printer, Download } from "lucide-react";
import { useInvoiceDetails } from "@/hooks/use-invoice-details";
import { InvoiceNotFound } from "@/components/invoice/InvoiceNotFound";
import { useIsMobile } from "@/hooks/use-mobile";
import { DatabaseInvoice } from "@/lib/types";
import { downloadInvoicePdf, shareInvoice } from "@/utils/invoice-pdf-utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { StatusBadge } from "@/components/invoice/StatusBadge";
import { formatCurrency } from "@/lib/currency-utils";

const InvoiceDetail = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const { invoice, loading, getInvoice } = useInvoiceDetails();
  const [isPrinting, setIsPrinting] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (invoiceId) {
      getInvoice(invoiceId);
    }
  }, [invoiceId]);

  const handleDownload = async () => {
    if (!printableRef.current || !invoice) {
      toast.error("Invoice content not available");
      return;
    }

    setIsPrinting(true);
    try {
      await downloadInvoicePdf(printableRef, invoice.invoice_number || 'INV');
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download invoice');
    } finally {
      setIsPrinting(false);
    }
  };

  const handleShare = async () => {
    if (!invoice) return;
    
    try {
      const customerName = (invoice as any).jobs?.customer_name || 'Customer';
      await shareInvoice(printableRef, invoice.invoice_number || 'INV', customerName);
    } catch (error) {
      console.error("Share error:", error);
      toast.error("Failed to share invoice");
    }
  };

  const handleBackToList = () => {
    navigate("/job-cards");
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
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
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <Button variant="outline" size="sm" onClick={handleBackToList} className="no-print">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Job Cards
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownload}
              disabled={isPrinting}
              className="no-print"
            >
              <Download className="mr-1 h-4 w-4" />
              Download
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare}
              disabled={isPrinting}
              className="no-print"
            >
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
            <Button 
              size="sm" 
              onClick={() => window.print()}
              disabled={isPrinting}
              className="no-print"
            >
              <Printer className="mr-1 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
        
        {/* Printable invoice content with proper A4 dimensions and margins */}
        <div 
          ref={printableRef}
          className="bg-white p-6 print:p-0"
          style={{
            width: '210mm',
            minHeight: '297mm',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
        >
          <div className="p-6 print:p-10" style={{ boxSizing: 'border-box' }}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold">Invoice #{databaseInvoice.invoice_number}</h1>
                <p className="text-sm text-gray-600">
                  Created on {format(new Date(databaseInvoice.created_at), "MMMM d, yyyy")}
                  {databaseInvoice.due_date && ` • Due by ${format(new Date(databaseInvoice.due_date), "MMMM d, yyyy")}`}
                </p>
              </div>
              <StatusBadge status={databaseInvoice.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-lg font-semibold mb-2">From</h2>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">Your Company</p>
                  <p>123 Business Rd</p>
                  <p>City, State 10001</p>
                  <p>Phone: (123) 456-7890</p>
                  <p>Email: billing@company.com</p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Bill To</h2>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{databaseInvoice.bill_description}</p>
                  {databaseInvoice.job_id && <p>Job #: {databaseInvoice.job_id}</p>}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Items</h2>
              <Table className="border">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-1/2 font-bold">Description</TableHead>
                    <TableHead className="text-right font-bold">Qty</TableHead>
                    <TableHead className="text-right font-bold">Price</TableHead>
                    <TableHead className="text-right font-bold">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {databaseInvoice.line_items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(item.unit_price)}</TableCell>
                      <TableCell className="text-right font-medium">{formatCurrency(item.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end mb-8">
              <div className="w-full md:w-1/2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium">{formatCurrency(databaseInvoice.subtotal)}</span>
                  </div>
                  {databaseInvoice.taxes.map((tax, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{tax.name} ({tax.rate}%):</span>
                      <span className="font-medium">{formatCurrency(tax.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-bold">Total:</span>
                    <span className="text-lg font-bold">{formatCurrency(databaseInvoice.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {databaseInvoice.notes && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Notes</h2>
                <p className="text-sm whitespace-pre-wrap">{databaseInvoice.notes}</p>
              </div>
            )}

            {databaseInvoice.terms && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Terms</h2>
                <p className="text-sm whitespace-pre-wrap">{databaseInvoice.terms}</p>
              </div>
            )}

            <div className="border-t pt-4 text-center text-sm text-gray-600">
              <p>Thank you for your business!</p>
              <p>Please make payments payable to Your Company</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
