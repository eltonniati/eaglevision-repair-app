
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
    <div 
      className="w-full bg-white text-black print-container" 
      style={{ 
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        margin: '0 auto',
        fontSize: '12px',
        lineHeight: '1.4',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      <div className="border-2 border-gray-300" style={{ 
        padding: '15mm',
        height: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Header with Company Info and Logo */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '15mm',
          width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {company?.logo_url && (
              <img 
                src={company.logo_url} 
                alt="Company Logo" 
                style={{ 
                  height: '40px', 
                  width: '40px', 
                  objectFit: 'contain' 
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <h1 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                margin: '0 0 5px 0' 
              }}>INVOICE</h1>
              <p style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                margin: '0' 
              }}>#{invoice.invoice_number}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 5px 0' }}>
              <strong>Issue Date:</strong> {format(new Date(invoiceData.issue_date), "MMM d, yyyy")}
            </p>
            <p style={{ margin: '0 0 5px 0' }}>
              <strong>Due Date:</strong> {format(new Date(invoiceData.due_date), "MMM d, yyyy")}
            </p>
            <p style={{ margin: '0' }}>
              <strong>Status:</strong> {invoiceData.status}
            </p>
          </div>
        </div>

        {/* Company and Customer Info */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '15mm',
          width: '100%'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '5px',
              marginBottom: '10px'
            }}>From</h2>
            {company ? (
              <div>
                <p style={{ margin: '0 0 3px 0', fontWeight: 'bold' }}>{company.name}</p>
                <p style={{ margin: '0 0 3px 0' }}>{company.address}</p>
                <p style={{ margin: '0 0 3px 0' }}>{company.phone}</p>
                <p style={{ margin: '0' }}>{company.email}</p>
              </div>
            ) : (
              <p style={{ margin: '0' }}>Company information not available</p>
            )}
          </div>
          <div>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '5px',
              marginBottom: '10px'
            }}>Bill To</h2>
            {invoice.jobs && (
              <div>
                <p style={{ margin: '0 0 3px 0', fontWeight: 'bold' }}>{invoice.jobs.customer_name}</p>
                <p style={{ margin: '0 0 3px 0' }}>{invoice.jobs.customer_phone}</p>
                {invoice.jobs.customer_email && <p style={{ margin: '0' }}>{invoice.jobs.customer_email}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Invoice Details */}
        <div style={{ marginBottom: '15mm' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            borderBottom: '1px solid #000',
            paddingBottom: '5px',
            marginBottom: '10px'
          }}>Invoice Details</h2>
          <p style={{ margin: '0 0 5px 0' }}>
            <strong>Description:</strong> {invoice.bill_description}
          </p>
          {invoice.jobs && (
            <div>
              <p style={{ margin: '0 0 5px 0' }}>
                <strong>Device:</strong> {invoice.jobs.device_name} {invoice.jobs.device_model}
              </p>
              <p style={{ margin: '0' }}>
                <strong>Problem:</strong> {invoice.jobs.problem}
              </p>
            </div>
          )}
        </div>

        {/* Line Items */}
        {invoiceData.line_items && invoiceData.line_items.length > 0 && (
          <div style={{ marginBottom: '15mm' }}>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '5px',
              marginBottom: '10px'
            }}>Line Items</h2>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              border: '1px solid #000'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    textAlign: 'left',
                    fontSize: '12px'
                  }}>Description</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    textAlign: 'center',
                    fontSize: '12px'
                  }}>Qty</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    textAlign: 'right',
                    fontSize: '12px'
                  }}>Unit Price</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    textAlign: 'right',
                    fontSize: '12px'
                  }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.line_items.map((item, index) => (
                  <tr key={index}>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '8px',
                      fontSize: '11px'
                    }}>{item.description}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '8px', 
                      textAlign: 'center',
                      fontSize: '11px'
                    }}>{item.quantity}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '8px', 
                      textAlign: 'right',
                      fontSize: '11px'
                    }}>{formatCurrency(item.unit_price)}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '8px', 
                      textAlign: 'right',
                      fontSize: '11px'
                    }}>{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totals */}
        <div style={{ marginBottom: '15mm' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '200px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                borderBottom: '1px solid #000',
                paddingBottom: '5px',
                marginBottom: '5px'
              }}>
                <span>Subtotal:</span>
                <span>{formatCurrency(invoiceData.subtotal || 0)}</span>
              </div>
              {invoiceData.taxes && invoiceData.taxes.length > 0 && (
                <>
                  {invoiceData.taxes.map((tax, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #000',
                      paddingBottom: '5px',
                      marginBottom: '5px'
                    }}>
                      <span>{tax.name} ({tax.rate}%):</span>
                      <span>{formatCurrency(tax.amount)}</span>
                    </div>
                  ))}
                </>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: '14px',
                borderTop: '2px solid #000',
                paddingTop: '8px'
              }}>
                <span>Total:</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        {(invoiceData.notes || invoiceData.terms) && (
          <div style={{ marginBottom: '15mm' }}>
            {invoiceData.notes && (
              <div style={{ marginBottom: '10mm' }}>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: '12px',
                  marginBottom: '5px'
                }}>Notes:</h3>
                <p style={{ 
                  whiteSpace: 'pre-line',
                  margin: '0',
                  fontSize: '11px'
                }}>{invoiceData.notes}</p>
              </div>
            )}
            {invoiceData.terms && (
              <div>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: '12px',
                  marginBottom: '5px'
                }}>Terms & Conditions:</h3>
                <p style={{ 
                  whiteSpace: 'pre-line',
                  margin: '0',
                  fontSize: '11px'
                }}>{invoiceData.terms}</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ 
          textAlign: 'center',
          fontSize: '10px',
          color: '#666',
          borderTop: '1px solid #ccc',
          paddingTop: '10px'
        }}>
          <p style={{ margin: '0 0 5px 0' }}>Thank you for your business!</p>
          <p style={{ margin: '0' }}>Generated on: {format(new Date(), "MMM d, yyyy HH:mm")}</p>
        </div>
      </div>
    </div>
  );
};
