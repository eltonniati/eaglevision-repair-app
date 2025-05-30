
import { Invoice } from "@/lib/types";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/currency-utils";

interface PrintableInvoiceProps {
  invoice: Invoice;
}

export const PrintableInvoice = ({ invoice }: PrintableInvoiceProps) => {
  return (
    <div className="p-4 bg-white print:p-0 print:m-0">
      <div className="border border-gray-200 p-4 max-w-[210mm] mx-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">INVOICE</h1>
            <p className="text-base font-medium">{invoice?.invoice_number}</p>
          </div>
          <div className="text-right text-sm">
            <p><strong>Issue Date:</strong> {format(new Date(invoice?.issue_date || new Date()), "MMMM d, yyyy")}</p>
            <p><strong>Due Date:</strong> {format(new Date(invoice?.due_date || new Date()), "MMMM d, yyyy")}</p>
            <p className="mt-1">
              <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-800 font-medium text-xs">
                {invoice?.status}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <h2 className="text-base font-semibold border-b mb-1">Bill To</h2>
            <p>{invoice?.bill_description}</p>
          </div>
        </div>

        <div className="mb-4 overflow-x-auto">
          <h2 className="text-base font-semibold border-b mb-1">Items</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-1">Description</th>
                <th className="py-1 text-right">Qty</th>
                <th className="py-1 text-right">Unit Price</th>
                <th className="py-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.line_items.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-1">{item.description}</td>
                  <td className="py-1 text-right">{item.quantity}</td>
                  <td className="py-1 text-right">{formatCurrency(item.unit_price)}</td>
                  <td className="py-1 text-right">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-4">
          <div className="w-48 text-sm">
            <div className="flex justify-between border-b py-1">
              <span>Subtotal</span>
              <span>{formatCurrency(invoice?.subtotal || 0)}</span>
            </div>
            {invoice?.taxes.map((tax, index) => (
              <div key={index} className="flex justify-between border-b py-1">
                <span>{tax.name} ({tax.rate}%)</span>
                <span>{formatCurrency(tax.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold py-1">
              <span>Total</span>
              <span>{formatCurrency(invoice?.total || 0)}</span>
            </div>
          </div>
        </div>

        {invoice?.notes && (
          <div className="mb-3 text-sm">
            <h2 className="text-base font-semibold border-b mb-1">Notes</h2>
            <p>{invoice.notes}</p>
          </div>
        )}

        {invoice?.terms && (
          <div className="mb-3 text-sm">
            <h2 className="text-base font-semibold border-b mb-1">Terms & Conditions</h2>
            <p>{invoice.terms}</p>
          </div>
        )}

        <div className="mt-3 text-xs text-center border-t pt-1">
          <p>Generated on: {format(new Date(), "MMMM d, yyyy HH:mm")}</p>
        </div>
      </div>
    </div>
  );
};
