
import { format } from "date-fns";
import { DatabaseInvoice } from "@/lib/types";
import { useCompany } from "@/hooks/use-company";

interface PrintableInvoiceProps {
  invoice: DatabaseInvoice;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount);
};

export const PrintableInvoice = ({ invoice }: PrintableInvoiceProps) => {
  const { company } = useCompany();
  
  const invoiceData = invoice.invoice_data || {
    status: "Draft",
    issue_date: new Date().toISOString(),
    due_date: new Date().toISOString(),
    line_items: [],
    taxes: [],
    subtotal: 0,
    tax_total: 0,
    notes: "",
    terms: ""
  };

  return (
    <div className="p-6 print:p-4 print:block print:visible print:w-full print:text-black bg-white text-black max-w-4xl mx-auto print:max-w-none print:mx-0">
      <div className="border-2 border-gray-200 p-6 print:border print:border-gray-300 print:p-4 print:text-xs">
        {/* Header with Company Info and Logo */}
        <div className="flex justify-between items-start mb-6 print:mb-4">
          <div className="flex items-center gap-4 print:gap-2">
            {company?.logo_url && (
              <img 
                src={company.logo_url} 
                alt="Company Logo" 
                className="h-16 w-16 print:h-12 print:w-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <h1 className="text-3xl print:text-xl font-bold text-black">INVOICE</h1>
              <p className="text-lg print:text-sm font-medium text-black">#{invoice.invoice_number}</p>
            </div>
          </div>
          <div className="text-right text-black print:text-xs">
            <p><strong>Issue Date:</strong> {format(new Date(invoiceData.issue_date), "MMM d, yyyy")}</p>
            <p><strong>Due Date:</strong> {format(new Date(invoiceData.due_date), "MMM d, yyyy")}</p>
            <p><strong>Status:</strong> {invoiceData.status}</p>
          </div>
        </div>

        {/* Company and Customer Info */}
        <div className="grid grid-cols-2 gap-6 print:gap-4 mb-6 print:mb-4 text-black print:text-xs">
          <div>
            <h2 className="text-lg print:text-sm font-semibold border-b mb-2 print:mb-1 text-black">From</h2>
            {company ? (
              <>
                <p className="font-semibold">{company.name}</p>
                <p>{company.address}</p>
                <p>{company.phone}</p>
                <p>{company.email}</p>
              </>
            ) : (
              <p>Company information not available</p>
            )}
          </div>
          <div>
            <h2 className="text-lg print:text-sm font-semibold border-b mb-2 print:mb-1 text-black">Bill To</h2>
            {invoice.jobs && (
              <>
                <p className="font-semibold">{invoice.jobs.customer_name}</p>
                <p>{invoice.jobs.customer_phone}</p>
                {invoice.jobs.customer_email && <p>{invoice.jobs.customer_email}</p>}
              </>
            )}
          </div>
        </div>

        {/* Invoice Details */}
        <div className="mb-6 print:mb-4 text-black print:text-xs">
          <h2 className="text-lg print:text-sm font-semibold border-b mb-2 print:mb-1 text-black">Invoice Details</h2>
          <p><strong>Description:</strong> {invoice.bill_description}</p>
          {invoice.jobs && (
            <>
              <p><strong>Device:</strong> {invoice.jobs.device_name} {invoice.jobs.device_model}</p>
              <p><strong>Problem:</strong> {invoice.jobs.problem}</p>
            </>
          )}
        </div>

        {/* Line Items */}
        {invoiceData.line_items && invoiceData.line_items.length > 0 && (
          <div className="mb-6 print:mb-4 text-black print:text-xs">
            <h2 className="text-lg print:text-sm font-semibold border-b mb-2 print:mb-1 text-black">Line Items</h2>
            <table className="w-full border-collapse border border-gray-300 print:text-xs">
              <thead>
                <tr className="bg-gray-100 print:bg-gray-200">
                  <th className="border border-gray-300 p-2 print:p-1 text-left">Description</th>
                  <th className="border border-gray-300 p-2 print:p-1 text-center">Qty</th>
                  <th className="border border-gray-300 p-2 print:p-1 text-right">Unit Price</th>
                  <th className="border border-gray-300 p-2 print:p-1 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.line_items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 print:p-1">{item.description}</td>
                    <td className="border border-gray-300 p-2 print:p-1 text-center">{item.quantity}</td>
                    <td className="border border-gray-300 p-2 print:p-1 text-right">{formatCurrency(item.unit_price)}</td>
                    <td className="border border-gray-300 p-2 print:p-1 text-right">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totals */}
        <div className="mb-6 print:mb-4 text-black print:text-xs">
          <div className="flex justify-end">
            <div className="w-64 print:w-48">
              <div className="flex justify-between border-b py-2 print:py-1">
                <span>Subtotal:</span>
                <span>{formatCurrency(invoiceData.subtotal || 0)}</span>
              </div>
              {invoiceData.taxes && invoiceData.taxes.length > 0 && (
                <>
                  {invoiceData.taxes.map((tax, index) => (
                    <div key={index} className="flex justify-between border-b py-2 print:py-1">
                      <span>{tax.name} ({tax.rate}%):</span>
                      <span>{formatCurrency(tax.amount)}</span>
                    </div>
                  ))}
                </>
              )}
              <div className="flex justify-between font-bold text-lg print:text-sm py-2 print:py-1 border-t-2">
                <span>Total:</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        {(invoiceData.notes || invoiceData.terms) && (
          <div className="mb-6 print:mb-4 text-black print:text-xs">
            {invoiceData.notes && (
              <div className="mb-4 print:mb-2">
                <h3 className="font-semibold mb-2 print:mb-1">Notes:</h3>
                <p className="whitespace-pre-line">{invoiceData.notes}</p>
              </div>
            )}
            {invoiceData.terms && (
              <div>
                <h3 className="font-semibold mb-2 print:mb-1">Terms & Conditions:</h3>
                <p className="whitespace-pre-line">{invoiceData.terms}</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm print:text-xs text-gray-500 mt-6 print:mt-4 pt-4 print:pt-2 border-t text-black">
          <p>Thank you for your business!</p>
          <p className="mt-1">Generated on: {format(new Date(), "MMM d, yyyy HH:mm")}</p>
        </div>
      </div>
    </div>
  );
};
