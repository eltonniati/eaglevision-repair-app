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
        maxWidth: '210mm',
        padding: '10mm',
        margin: '0',
        fontSize: '12px',
        lineHeight: '1.4',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'visible',
        background: 'white',
        color: 'black'
      }}
    >
      <div style={{ 
        border: '1px solid #333',
        padding: '15px',
        height: 'calc(100% - 30px)',
        boxSizing: 'border-box',
        background: 'white'
      }}>
        {/* Header with Company Info and Logo */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '15px',
          width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {company?.logo_url && (
              <img 
                src={company.logo_url} 
                alt="Company Logo" 
                style={{ 
                  height: '35px', 
                  width: '35px', 
                  objectFit: 'contain' 
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <h1 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                margin: '0 0 5px 0',
                color: '#000'
              }}>INVOICE</h1>
              <p style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                margin: '0',
                color: '#000'
              }}>#{invoice.invoice_number}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#000' }}>
              <strong>Issue Date:</strong> {format(new Date(invoiceData.issue_date), "MMM d, yyyy")}
            </p>
            <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#000' }}>
              <strong>Due Date:</strong> {format(new Date(invoiceData.due_date), "MMM d, yyyy")}
            </p>
            <p style={{ margin: '0', fontSize: '12px', color: '#000' }}>
              <strong>Status:</strong> {invoiceData.status}
            </p>
          </div>
        </div>

        {/* Company and Customer Info */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '15px',
          width: '100%'
        }}>
          <div>
            <h2 style={{ 
              fontSize: '13px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '5px',
              marginBottom: '8px',
              color: '#000'
            }}>From</h2>
            {company ? (
              <div>
                <p style={{ margin: '0 0 3px 0', fontWeight: 'bold', fontSize: '12px', color: '#000' }}>{company.name}</p>
                <p style={{ margin: '0 0 3px 0', fontSize: '11px', color: '#000' }}>{company.address}</p>
                <p style={{ margin: '0 0 3px 0', fontSize: '11px', color: '#000' }}>{company.phone}</p>
                <p style={{ margin: '0', fontSize: '11px', color: '#000' }}>{company.email}</p>
              </div>
            ) : (
              <p style={{ margin: '0', fontSize: '11px', color: '#000' }}>Company information not available</p>
            )}
          </div>
          <div>
            <h2 style={{ 
              fontSize: '13px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '5px',
              marginBottom: '8px',
              color: '#000'
            }}>Bill To</h2>
            {invoice.jobs && (
              <div>
                <p style={{ margin: '0 0 3px 0', fontWeight: 'bold', fontSize: '12px', color: '#000' }}>{invoice.jobs.customer_name}</p>
                <p style={{ margin: '0 0 3px 0', fontSize: '11px', color: '#000' }}>{invoice.jobs.customer_phone}</p>
                {invoice.jobs.customer_email && <p style={{ margin: '0', fontSize: '11px', color: '#000' }}>{invoice.jobs.customer_email}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Invoice Details */}
        <div style={{ marginBottom: '15px' }}>
          <h2 style={{ 
            fontSize: '13px', 
            fontWeight: 'bold', 
            borderBottom: '1px solid #000',
            paddingBottom: '5px',
            marginBottom: '8px',
            color: '#000'
          }}>Invoice Details</h2>
          <p style={{ margin: '0 0 5px 0', fontSize: '11px', color: '#000' }}>
            <strong>Description:</strong> {invoice.bill_description}
          </p>
          {invoice.jobs && (
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '11px', color: '#000' }}>
                <strong>Device:</strong> {invoice.jobs.device_name} {invoice.jobs.device_model}
              </p>
              <p style={{ margin: '0', fontSize: '11px', color: '#000' }}>
                <strong>Problem:</strong> {invoice.jobs.problem}
              </p>
            </div>
          )}
        </div>

        {/* Line Items */}
        {invoiceData.line_items && invoiceData.line_items.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <h2 style={{ 
              fontSize: '13px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '5px',
              marginBottom: '8px',
              color: '#000'
            }}>Line Items</h2>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              border: '1px solid #000'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    textAlign: 'left',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>Description</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    textAlign: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>Qty</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    textAlign: 'right',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>Unit Price</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: '8px', 
                    textAlign: 'right',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.line_items.map((item, index) => (
                  <tr key={index}>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px',
                      fontSize: '9px',
                      color: '#000'
                    }}>{item.description}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px', 
                      textAlign: 'center',
                      fontSize: '9px',
                      color: '#000'
                    }}>{item.quantity}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px', 
                      textAlign: 'right',
                      fontSize: '9px',
                      color: '#000'
                    }}>{formatCurrency(item.unit_price)}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: '6px', 
                      textAlign: 'right',
                      fontSize: '9px',
                      color: '#000'
                    }}>{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totals */}
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '200px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                borderBottom: '1px solid #000',
                paddingBottom: '5px',
                marginBottom: '5px'
              }}>
                <span style={{ fontSize: '11px', color: '#000' }}>Subtotal:</span>
                <span style={{ fontSize: '11px', color: '#000' }}>{formatCurrency(invoiceData.subtotal || 0)}</span>
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
                      <span style={{ fontSize: '11px', color: '#000' }}>{tax.name} ({tax.rate}%):</span>
                      <span style={{ fontSize: '11px', color: '#000' }}>{formatCurrency(tax.amount)}</span>
                    </div>
                  ))}
                </>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: '12px',
                borderTop: '2px solid #000',
                paddingTop: '8px',
                color: '#000'
              }}>
                <span>Total:</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        {(invoiceData.notes || invoiceData.terms) && (
          <div style={{ marginBottom: '15px' }}>
            {invoiceData.notes && (
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: '11px',
                  marginBottom: '5px',
                  color: '#000'
                }}>Notes:</h3>
                <p style={{ 
                  whiteSpace: 'pre-line',
                  margin: '0',
                  fontSize: '9px',
                  color: '#000'
                }}>{invoiceData.notes}</p>
              </div>
            )}
            {invoiceData.terms && (
              <div>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: '11px',
                  marginBottom: '5px',
                  color: '#000'
                }}>Terms & Conditions:</h3>
                <p style={{ 
                  whiteSpace: 'pre-line',
                  margin: '0',
                  fontSize: '9px',
                  color: '#000'
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
          paddingTop: '8px',
          marginTop: '15px'
        }}>
          <p style={{ margin: '0 0 3px 0' }}>Thank you for your business!</p>
          <p style={{ margin: '0' }}>Generated on: {format(new Date(), "MMM d, yyyy HH:mm")}</p>
        </div>
      </div>
    </div>
  );
};
