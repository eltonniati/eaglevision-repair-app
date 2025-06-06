import { DatabaseInvoice } from "@/lib/types";

export const PrintableInvoice = ({ invoice }: { invoice: DatabaseInvoice }) => {
  return (
    <div className="w-full h-full flex flex-col" style={{ minHeight: '297mm' }}>
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">INVOICE</h1>
            <p className="text-sm text-muted-foreground">#{invoice.invoice_number}</p>
          </div>
          <div className="text-right">
            {/* Your company info */}
          </div>
        </div>
      </header>

      {/* Invoice Details */}
      <div className="flex-1 grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="font-semibold mb-2">Bill To:</h2>
          <p>{invoice.jobs?.customer_name}</p>
          {/* Add more customer details */}
        </div>
        <div className="text-right">
          <div className="mb-2">
            <span className="font-semibold">Date Issued:</span> {invoice.invoice_data.issue_date}
          </div>
          <div>
            <span className="font-semibold">Due Date:</span> {invoice.invoice_data.due_date}
          </div>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Description</th>
              <th className="text-right py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.invoice_data.line_items?.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.description}</td>
                <td className="text-right py-2">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals Section */}
      <div className="ml-auto w-64 mb-8">
        <div className="flex justify-between py-2">
          <span>Subtotal:</span>
          <span>{invoice.invoice_data.subtotal}</span>
        </div>
        {invoice.invoice_data.taxes?.map((tax, index) => (
          <div key={index} className="flex justify-between py-2">
            <span>{tax.name} ({tax.rate}%):</span>
            <span>{tax.amount}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total:</span>
          <span>{invoice.total}</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-8 border-t">
        {invoice.invoice_data.notes && (
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Notes</h3>
            <p className="text-sm">{invoice.invoice_data.notes}</p>
          </div>
        )}
        {invoice.invoice_data.terms && (
          <div>
            <h3 className="font-semibold mb-1">Terms</h3>
            <p className="text-sm">{invoice.invoice_data.terms}</p>
          </div>
        )}
      </footer>
    </div>
  );
};
export default InvoiceDetail;
