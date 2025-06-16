import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Printer, Share2, Download } from "lucide-react";
import { format } from "date-fns";
import { Invoice } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";
import { formatCurrency } from "@/lib/currency-utils";
import { downloadInvoicePdf, shareInvoice } from "@/utils/invoice-pdf-utils";
import { toast } from "sonner";

interface InvoiceDetailsProps {
  invoice: Invoice;
  onPrint?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
}

export const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  const printableRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    try {
      await downloadInvoicePdf(printableRef, invoice.invoice_number || 'INV');
      toast.success("Invoice downloaded successfully");
    } catch (error) {
      toast.error("Failed to download invoice");
    }
  };

  const handleShare = async () => {
    try {
      await shareInvoice(printableRef, invoice.invoice_number || 'INV');
    } catch (error) {
      toast.error("Failed to share invoice");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>

      {/* Printable area with A4 dimensions */}
      <div 
        ref={printableRef}
        className="bg-white p-8 shadow-none"
        style={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto'
        }}
      >
        <Card className="border-none shadow-none">
          <CardHeader className="flex flex-row items-start justify-between p-0 pb-6">
            <div>
              <CardTitle className="text-2xl">Invoice #{invoice.invoice_number}</CardTitle>
              <CardDescription className="text-sm">
                Created on {format(new Date(invoice.created_at!), "MMMM d, yyyy")}
                {invoice.due_date && ` • Due by ${format(new Date(invoice.due_date), "MMMM d, yyyy")}`}
              </CardDescription>
            </div>
            <StatusBadge status={invoice.status} />
          </CardHeader>

          <CardContent className="space-y-8 p-0">
            {/* Bill To and From sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Bill From</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">Your Company Name</p>
                  <p>123 Business Street</p>
                  <p>City, State 10001</p>
                  <p>Phone: (123) 456-7890</p>
                  <p>Email: contact@company.com</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Bill To</h3>
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{invoice.bill_description}</p>
                  {invoice.job_id && <p>Job #: {invoice.job_id}</p>}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Items</h3>
              <Table className="border">
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="font-bold">Description</TableHead>
                    <TableHead className="text-right font-bold">Quantity</TableHead>
                    <TableHead className="text-right font-bold">Unit Price</TableHead>
                    <TableHead className="text-right font-bold">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.line_items.map((item, idx) => (
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

            {/* Summary Section */}
            <div className="ml-auto w-full md:w-1/2">
              <h3 className="text-lg font-semibold mb-4">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <Label className="text-muted-foreground">Subtotal</Label>
                  <p className="font-medium">{formatCurrency(invoice.subtotal)}</p>
                </div>
                
                {invoice.taxes.map((tax, index) => (
                  <div key={index} className="flex justify-between">
                    <Label className="text-muted-foreground">{tax.name} ({tax.rate}%)</Label>
                    <p className="font-medium">{formatCurrency(tax.amount)}</p>
                  </div>
                ))}
                
                <div className="flex justify-between border-t pt-3 mt-2">
                  <Label className="font-bold">Total</Label>
                  <p className="text-lg font-bold">{formatCurrency(invoice.total)}</p>
                </div>
              </div>
            </div>

            {/* Notes and Terms */}
            {invoice.notes && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Notes</h3>
                <p className="text-sm">{invoice.notes}</p>
              </div>
            )}

            {invoice.terms && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Terms & Conditions</h3>
                <p className="text-sm">{invoice.terms}</p>
              </div>
            )}

            {/* Footer */}
            <div className="border-t pt-4 mt-8 text-center text-xs text-muted-foreground">
              <p>Thank you for your business!</p>
              <p className="mt-1">Please make payments payable to Your Company Name</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
