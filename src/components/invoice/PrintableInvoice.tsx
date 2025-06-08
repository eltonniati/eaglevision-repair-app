
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

  // Detect mobile for responsive styling
  const isMobile = typeof window !== 'undefined' && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <div 
      className="w-full bg-white text-black print-container" 
      style={{ 
        width: isMobile ? '375px' : '210mm',
        height: isMobile ? '667px' : '297mm',
        minHeight: isMobile ? '667px' : '297mm',
        maxWidth: isMobile ? '375px' : '210mm',
        maxHeight: isMobile ? '667px' : '297mm',
        padding: '0',
        margin: '0',
        fontSize: isMobile ? '10px' : '12px',
        lineHeight: '1.3',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        background: 'white',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}
    >
      <div style={{ 
        border: isMobile ? '2px solid #333' : '1px solid #333',
        padding: isMobile ? '12px' : '16px',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        margin: '0'
      }}>
        {/* Header with Company Info and Logo */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: isMobile ? '12px' : '16px',
          width: '100%',
          minHeight: isMobile ? '40px' : '50px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px' }}>
            {company?.logo_url && (
              <img 
                src={company.logo_url} 
                alt="Company Logo" 
                style={{ 
                  height: isMobile ? '24px' : '35px', 
                  width: isMobile ? '24px' : '35px', 
                  objectFit: 'contain' 
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <h1 style={{ 
                fontSize: isMobile ? '16px' : '22px', 
                fontWeight: 'bold', 
                margin: '0 0 2px 0',
                color: '#000'
              }}>INVOICE</h1>
              <p style={{ 
                fontSize: isMobile ? '12px' : '16px', 
                fontWeight: '600', 
                margin: '0',
                color: '#000'
              }}>#{invoice.invoice_number}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '9px' : '12px', color: '#000' }}>
              <strong>Issue Date:</strong> {format(new Date(invoiceData.issue_date), "MMM d, yyyy")}
            </p>
            <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '9px' : '12px', color: '#000' }}>
              <strong>Due Date:</strong> {format(new Date(invoiceData.due_date), "MMM d, yyyy")}
            </p>
            <p style={{ margin: '0', fontSize: isMobile ? '9px' : '12px', color: '#000' }}>
              <strong>Status:</strong> {invoiceData.status}
            </p>
          </div>
        </div>

        {/* Company and Customer Info */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: isMobile ? '12px' : '20px',
          marginBottom: isMobile ? '12px' : '16px',
          width: '100%',
          minHeight: isMobile ? '80px' : '100px'
        }}>
          <div>
            <h2 style={{ 
              fontSize: isMobile ? '11px' : '14px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '2px',
              marginBottom: isMobile ? '6px' : '8px',
              color: '#000'
            }}>From</h2>
            {company ? (
              <div>
                <p style={{ margin: '0 0 2px 0', fontWeight: 'bold', fontSize: isMobile ? '9px' : '12px', color: '#000' }}>{company.name}</p>
                <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '8px' : '11px', color: '#000' }}>{company.address}</p>
                <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '8px' : '11px', color: '#000' }}>{company.phone}</p>
                <p style={{ margin: '0', fontSize: isMobile ? '8px' : '11px', color: '#000' }}>{company.email}</p>
              </div>
            ) : (
              <p style={{ margin: '0', fontSize: isMobile ? '8px' : '11px', color: '#000' }}>Company information not available</p>
            )}
          </div>
          <div>
            <h2 style={{ 
              fontSize: isMobile ? '11px' : '14px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '2px',
              marginBottom: isMobile ? '6px' : '8px',
              color: '#000'
            }}>Bill To</h2>
            {invoice.jobs && (
              <div>
                <p style={{ margin: '0 0 2px 0', fontWeight: 'bold', fontSize: isMobile ? '9px' : '12px', color: '#000' }}>{invoice.jobs.customer_name}</p>
                <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '8px' : '11px', color: '#000' }}>{invoice.jobs.customer_phone}</p>
                {invoice.jobs.customer_email && <p style={{ margin: '0', fontSize: isMobile ? '8px' : '11px', color: '#000' }}>{invoice.jobs.customer_email}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Invoice Details */}
        <div style={{ marginBottom: isMobile ? '12px' : '16px', minHeight: isMobile ? '60px' : '80px' }}>
          <h2 style={{ 
            fontSize: isMobile ? '11px' : '14px', 
            fontWeight: 'bold', 
            borderBottom: '1px solid #000',
            paddingBottom: '2px',
            marginBottom: isMobile ? '6px' : '8px',
            color: '#000'
          }}>Invoice Details</h2>
          <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '8px' : '11px', color: '#000' }}>
            <strong>Description:</strong> {invoice.bill_description}
          </p>
          {invoice.jobs && (
            <div>
              <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '8px' : '11px', color: '#000' }}>
                <strong>Device:</strong> {invoice.jobs.device_name} {invoice.jobs.device_model}
              </p>
              <p style={{ margin: '0', fontSize: isMobile ? '8px' : '11px', color: '#000' }}>
                <strong>Problem:</strong> {invoice.jobs.problem}
              </p>
            </div>
          )}
        </div>

        {/* Line Items */}
        {invoiceData.line_items && invoiceData.line_items.length > 0 && (
          <div style={{ marginBottom: isMobile ? '12px' : '16px', flex: '1', minHeight: isMobile ? '120px' : '150px' }}>
            <h2 style={{ 
              fontSize: isMobile ? '11px' : '14px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '2px',
              marginBottom: isMobile ? '6px' : '8px',
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
                    padding: isMobile ? '4px' : '8px', 
                    textAlign: 'left',
                    fontSize: isMobile ? '8px' : '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>Description</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: isMobile ? '4px' : '8px', 
                    textAlign: 'center',
                    fontSize: isMobile ? '8px' : '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>Qty</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: isMobile ? '4px' : '8px', 
                    textAlign: 'right',
                    fontSize: isMobile ? '8px' : '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>Unit Price</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: isMobile ? '4px' : '8px', 
                    textAlign: 'right',
                    fontSize: isMobile ? '8px' : '10px',
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
                      padding: isMobile ? '3px' : '6px',
                      fontSize: isMobile ? '7px' : '9px',
                      color: '#000'
                    }}>{item.description}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: isMobile ? '3px' : '6px', 
                      textAlign: 'center',
                      fontSize: isMobile ? '7px' : '9px',
                      color: '#000'
                    }}>{item.quantity}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: isMobile ? '3px' : '6px', 
                      textAlign: 'right',
                      fontSize: isMobile ? '7px' : '9px',
                      color: '#000'
                    }}>{formatCurrency(item.unit_price)}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: isMobile ? '3px' : '6px', 
                      textAlign: 'right',
                      fontSize: isMobile ? '7px' : '9px',
                      color: '#000'
                    }}>{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totals */}
        <div style={{ marginBottom: isMobile ? '12px' : '16px', minHeight: isMobile ? '60px' : '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: isMobile ? '140px' : '200px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                borderBottom: '1px solid #000',
                paddingBottom: '2px',
                marginBottom: '2px'
              }}>
                <span style={{ fontSize: isMobile ? '8px' : '11px', color: '#000' }}>Subtotal:</span>
                <span style={{ fontSize: isMobile ? '8px' : '11px', color: '#000' }}>{formatCurrency(invoiceData.subtotal || 0)}</span>
              </div>
              {invoiceData.taxes && invoiceData.taxes.length > 0 && (
                <>
                  {invoiceData.taxes.map((tax, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #000',
                      paddingBottom: '2px',
                      marginBottom: '2px'
                    }}>
                      <span style={{ fontSize: isMobile ? '8px' : '11px', color: '#000' }}>{tax.name} ({tax.rate}%):</span>
                      <span style={{ fontSize: isMobile ? '8px' : '11px', color: '#000' }}>{formatCurrency(tax.amount)}</span>
                    </div>
                  ))}
                </>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: isMobile ? '10px' : '13px',
                borderTop: '2px solid #000',
                paddingTop: isMobile ? '4px' : '8px',
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
          <div style={{ marginBottom: isMobile ? '12px' : '16px', minHeight: isMobile ? '40px' : '60px' }}>
            {invoiceData.notes && (
              <div style={{ marginBottom: isMobile ? '6px' : '10px' }}>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: isMobile ? '8px' : '11px',
                  marginBottom: '2px',
                  color: '#000'
                }}>Notes:</h3>
                <p style={{ 
                  whiteSpace: 'pre-line',
                  margin: '0',
                  fontSize: isMobile ? '7px' : '9px',
                  color: '#000'
                }}>{invoiceData.notes}</p>
              </div>
            )}
            {invoiceData.terms && (
              <div>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: isMobile ? '8px' : '11px',
                  marginBottom: '2px',
                  color: '#000'
                }}>Terms & Conditions:</h3>
                <p style={{ 
                  whiteSpace: 'pre-line',
                  margin: '0',
                  fontSize: isMobile ? '7px' : '9px',
                  color: '#000'
                }}>{invoiceData.terms}</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ 
          textAlign: 'center',
          fontSize: isMobile ? '7px' : '10px',
          color: '#666',
          borderTop: '1px solid #ccc',
          paddingTop: isMobile ? '4px' : '8px',
          marginTop: 'auto',
          minHeight: isMobile ? '20px' : '30px'
        }}>
          <p style={{ margin: '0 0 1px 0' }}>Thank you for your business!</p>
          <p style={{ margin: '0' }}>Generated on: {format(new Date(), "MMM d, yyyy HH:mm")}</p>
        </div>
      </div>
    </div>
  );
};
