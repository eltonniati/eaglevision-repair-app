
import { format } from "date-fns";
import { DatabaseInvoice } from "@/lib/types";
import { useCompany } from "@/hooks/use-company";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

  const invoiceData = invoice.invoice_data || {
    status: "Draft",
    issue_date: new Date().toISOString(),
    due_date: new Date().toISOString(),
    line_items: [],
    taxes: [],
    subtotal: 0,
    tax_total: 0,
    notes: "",
    terms: "",
    vat_enabled: false
  };

  // Filter out VAT taxes if VAT is not enabled
  const displayTaxes = invoiceData.vat_enabled 
    ? invoiceData.taxes || []
    : (invoiceData.taxes || []).filter(tax => !tax.name.toLowerCase().includes('vat'));

  // Device detection for responsive styling
  const isMobile = typeof window !== 'undefined' && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <div 
      className="w-full bg-white text-black print-container" 
      style={{ 
        width: isMobile ? '100vw' : '210mm',
        height: isMobile ? '100vh' : '297mm',
        minHeight: isMobile ? '100vh' : '297mm',
        maxWidth: isMobile ? '100vw' : '210mm',
        padding: '0',
        margin: '0 auto',
        fontSize: isMobile ? '4vw' : '14px',
        lineHeight: '1.5',
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
        border: isMobile ? '0.8vw solid #333' : '2px solid #333',
        padding: isMobile ? '4vw' : '20px',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        background: 'white',
        display: 'flex',
        flexDirection: "column",
        margin: '0'
      }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-start",
            marginBottom: isMobile ? "5vw" : "24px",
            width: "100%",
            minHeight: isMobile ? "12vw" : "60px",
            paddingBottom: isMobile ? "3vw" : "16px",
            borderBottom: "1px solid #ddd",
            gap: isMobile ? "3vw" : undefined,
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "3vw" : "12px",
          }}>
            {company?.logo_url && (
              <img
                src={company.logo_url}
                alt="Company Logo"
                style={{
                  height: isMobile ? "10vw" : "45px",
                  width: isMobile ? "10vw" : "45px",
                  objectFit: "contain",
                  border: "1px solid #eee",
                  borderRadius: "4px",
                }}
                onError={e => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <div>
              <h1
                style={{
                  fontSize: isMobile ? "7vw" : "28px",
                  fontWeight: "bold",
                  margin: "0 0 4px 0",
                  color: "#000",
                  letterSpacing: "1px"
                }}
              >
                {t.invoice}
              </h1>
              <p style={{
                fontSize: isMobile ? "4.5vw" : "18px",
                fontWeight: 600,
                margin: 0,
                color: "#555"
              }}>#{invoice.invoice_number}</p>
            </div>
          </div>
          <div style={{ textAlign: isMobile ? "left" : "right", marginTop: isMobile ? "2vw" : 0 }}>
            <p style={{ margin: '0 0 6px 0', fontSize: isMobile ? '3.5vw' : '13px', color: '#000' }}>
              <strong>{t.issueDate}:</strong> 
              <span style={{ marginLeft: '8px' }}>{format(new Date(invoiceData.issue_date), "MMM d, yyyy")}</span>
            </p>
            <p style={{ margin: '0 0 6px 0', fontSize: isMobile ? '3.5vw' : '13px', color: '#000' }}>
              <strong>{t.dueDate}:</strong> 
              <span style={{ marginLeft: '8px' }}>{format(new Date(invoiceData.due_date), "MMM d, yyyy")}</span>
            </p>
            <p style={{ margin: '0', fontSize: isMobile ? '3.5vw' : '13px', color: '#000' }}>
              <strong>{t.status}:</strong> 
              <span style={{
                marginLeft: "8px",
                padding: "2px 8px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px"
              }}>{invoiceData.status}</span>
            </p>
          </div>
        </div>

        {/* COMPANY AND CUSTOMER INFO */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "4vw" : "24px",
            marginBottom: isMobile ? "4vw" : "20px",
            width: "100%",
            minHeight: isMobile ? "25vw" : "120px"
          }}
        >
          <div style={{
            padding: isMobile ? "3vw" : "12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            border: "1px solid #e9ecef",
            marginBottom: isMobile ? "3vw" : 0
          }}>
            <h2 style={{
              fontSize: isMobile ? "4vw" : "16px",
              fontWeight: "bold",
              borderBottom: "2px solid #000",
              paddingBottom: "6px",
              marginBottom: isMobile ? "3vw" : "12px",
              color: "#000"
            }}>{t.from}</h2>
            {company ? (
              <div style={{ lineHeight: "1.6" }}>
                <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: isMobile ? '3.5vw' : '14px', color: '#000' }}>{company.name}</p>
                <p style={{ margin: '0 0 4px 0', fontSize: isMobile ? '3vw' : '12px', color: '#333' }}>{company.address}</p>
                <p style={{ margin: '0 0 4px 0', fontSize: isMobile ? '3vw' : '12px', color: '#333' }}>{company.phone}</p>
                <p style={{ margin: '0', fontSize: isMobile ? '3vw' : '12px', color: '#333' }}>{company.email}</p>
              </div>
            ) : (
              <p style={{ margin: '0', fontSize: isMobile ? '3vw' : '12px', color: '#666' }}>{t.companyInfoNotAvailable}</p>
            )}
          </div>
          <div style={{
            padding: isMobile ? "3vw" : "12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            border: "1px solid #e9ecef",
          }}>
            <h2 style={{
              fontSize: isMobile ? "4vw" : "16px",
              fontWeight: "bold",
              borderBottom: "2px solid #000",
              paddingBottom: "6px",
              marginBottom: isMobile ? "3vw" : "12px",
              color: "#000"
            }}>{t.billTo}</h2>
            {invoice.jobs && (
              <div style={{ lineHeight: "1.6" }}>
                <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: isMobile ? '3.5vw' : '14px', color: '#000' }}>{invoice.jobs.customer_name}</p>
                <p style={{ margin: '0 0 4px 0', fontSize: isMobile ? '3vw' : '12px', color: '#333' }}>{invoice.jobs.customer_phone}</p>
                {invoice.jobs.customer_email && <p style={{ margin: '0', fontSize: isMobile ? '3vw' : '12px', color: '#333' }}>{invoice.jobs.customer_email}</p>}
              </div>
            )}
          </div>
        </div>

        {/* INVOICE DETAILS */}
        <div style={{
          marginBottom: isMobile ? "4vw" : "20px",
          minHeight: isMobile ? "18vw" : "90px",
          padding: isMobile ? "3vw" : "12px",
          backgroundColor: "#f8f9fa",
          borderRadius: "6px",
          border: "1px solid #e9ecef"
        }}>
          <h2 style={{
            fontSize: isMobile ? "4vw" : "16px",
            fontWeight: "bold",
            borderBottom: "2px solid #000",
            paddingBottom: "6px",
            marginBottom: isMobile ? "3vw" : "12px",
            color: "#000"
          }}>{t.invoiceDetails}</h2>
          <p style={{ margin: '0 0 6px 0', fontSize: isMobile ? '3vw' : '12px', color: '#000', lineHeight: '1.6' }}>
            <strong>{t.description}:</strong> 
            <span style={{ marginLeft: '8px' }}>{invoice.bill_description}</span>
          </p>
          {invoice.jobs && (
            <div style={{ lineHeight: "1.6" }}>
              <p style={{ margin: '0 0 6px 0', fontSize: isMobile ? '3vw' : '12px', color: '#000' }}>
                <strong>{t.device}:</strong> 
                <span style={{ marginLeft: "8px" }}>{invoice.jobs.device_name} {invoice.jobs.device_model}</span>
              </p>
              <p style={{ margin: "0", fontSize: isMobile ? "3vw" : "12px", color: "#000" }}>
                <strong>{t.problem}:</strong>
                <span style={{ marginLeft: "8px" }}>{invoice.jobs.problem}</span>
              </p>
            </div>
          )}
        </div>

        {/* LINE ITEMS TABLE */}
        {invoiceData.line_items && invoiceData.line_items.length > 0 && (
          <div style={{
            marginBottom: isMobile ? "4vw" : "20px",
            flex: "1",
            minHeight: isMobile ? "35vw" : "180px",
            width: "100%",
            overflowX: "auto"
          }}>
            <h2 style={{
              fontSize: isMobile ? "4vw" : "16px",
              fontWeight: "bold",
              borderBottom: "2px solid #000",
              paddingBottom: "6px",
              marginBottom: isMobile ? "3vw" : "12px",
              color: "#000"
            }}>{t.lineItems}</h2>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "2px solid #000",
              backgroundColor: "white"
            }}>
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                  <th style={{
                    border: "1px solid #333",
                    padding: isMobile ? "2vw" : "12px",
                    textAlign: "left",
                    fontSize: isMobile ? "3vw" : "12px",
                    fontWeight: "bold",
                    color: "#000"
                  }}>{t.description}</th>
                  <th style={{
                    border: "1px solid #333",
                    padding: isMobile ? "2vw" : "12px",
                    textAlign: "center",
                    fontSize: isMobile ? "3vw" : "12px",
                    fontWeight: "bold",
                    color: "#000"
                  }}>{t.qty}</th>
                  <th style={{
                    border: "1px solid #333",
                    padding: isMobile ? "2vw" : "12px",
                    textAlign: "right",
                    fontSize: isMobile ? "3vw" : "12px",
                    fontWeight: "bold",
                    color: "#000"
                  }}>{t.unitPrice}</th>
                  <th style={{
                    border: "1px solid #333",
                    padding: isMobile ? "2vw" : "12px",
                    textAlign: "right",
                    fontSize: isMobile ? "3vw" : "12px",
                    fontWeight: "bold",
                    color: "#000"
                  }}>{t.amount}</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.line_items.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9" }}>
                    <td style={{
                      border: "1px solid #333",
                      padding: isMobile ? "1.5vw" : "10px",
                      fontSize: isMobile ? "2.8vw" : "11px",
                      color: "#000",
                      lineHeight: "1.4"
                    }}>{item.description}</td>
                    <td style={{
                      border: "1px solid #333",
                      padding: isMobile ? "1.5vw" : "10px",
                      textAlign: "center",
                      fontSize: isMobile ? "2.8vw" : "11px",
                      color: "#000"
                    }}>{item.quantity}</td>
                    <td style={{
                      border: "1px solid #333",
                      padding: isMobile ? "1.5vw" : "10px",
                      textAlign: "right",
                      fontSize: isMobile ? "2.8vw" : "11px",
                      color: "#000"
                    }}>{formatCurrency(item.unit_price)}</td>
                    <td style={{
                      border: "1px solid #333",
                      padding: isMobile ? "1.5vw" : "10px",
                      textAlign: "right",
                      fontSize: isMobile ? "2.8vw" : "11px",
                      color: "#000",
                      fontWeight: "bold"
                    }}>{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TOTALS SECTION - always at the bottom for mobile */}
        <div style={{
          marginBottom: isMobile ? "4vw" : "20px",
          minHeight: isMobile ? "18vw" : "90px",
          width: "100%",
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "flex-end"
        }}>
          <div style={{
            width: isMobile ? "100%" : "250px",
            border: "2px solid #333",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            padding: isMobile ? "2vw" : "12px"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #ddd",
              paddingBottom: "6px",
              marginBottom: "6px"
            }}>
              <span style={{ fontSize: isMobile ? "3vw" : "12px", color: "#000" }}>{t.subtotal}:</span>
              <span style={{ fontSize: isMobile ? "3vw" : "12px", color: "#000", marginLeft: '16px' }}>{formatCurrency(invoiceData.subtotal || 0)}</span>
            </div>
            {displayTaxes && displayTaxes.length > 0 && (
              <>
                {displayTaxes.map((tax, index) => (
                  <div key={index} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "6px",
                    marginBottom: "6px"
                  }}>
                    <span style={{ fontSize: isMobile ? "3vw" : "12px", color: "#000" }}>{tax.name} ({tax.rate}%):</span>
                    <span style={{ fontSize: isMobile ? "3vw" : "12px", color: "#000", marginLeft: "16px" }}>{formatCurrency(tax.amount)}</span>
                  </div>
                ))}
              </>
            )}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: isMobile ? "3.8vw" : "15px",
              borderTop: "2px solid #000",
              paddingTop: isMobile ? "2vw" : "12px",
              color: "#000",
              backgroundColor: "#e9ecef",
              padding: isMobile ? "2vw" : "8px",
              borderRadius: "4px",
              marginTop: "8px"
            }}>
              <span>{t.total}:</span>
              <span style={{ marginLeft: "16px" }}>{formatCurrency(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* NOTES AND TERMS */}
        {(invoiceData.notes || invoiceData.terms) && (
          <div style={{
            marginBottom: isMobile ? "4vw" : "20px",
            minHeight: isMobile ? "12vw" : "70px",
            padding: isMobile ? "3vw" : "12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            border: "1px solid #e9ecef"
          }}>
            {invoiceData.notes && (
              <div style={{ marginBottom: isMobile ? "3vw" : "12px" }}>
                <h3 style={{
                  fontWeight: "bold",
                  fontSize: isMobile ? "3vw" : "13px",
                  marginBottom: "6px",
                  color: "#000"
                }}>{t.notes}:</h3>
                <p style={{
                  whiteSpace: "pre-line",
                  margin: "0",
                  fontSize: isMobile ? "2.8vw" : "11px",
                  color: "#333",
                  lineHeight: "1.5"
                }}>{invoiceData.notes}</p>
              </div>
            )}
            {invoiceData.terms && (
              <div>
                <h3 style={{
                  fontWeight: "bold",
                  fontSize: isMobile ? "3vw" : "13px",
                  marginBottom: "6px",
                  color: "#000"
                }}>{t.termsConditions}:</h3>
                <p style={{
                  whiteSpace: "pre-line",
                  margin: "0",
                  fontSize: isMobile ? "2.8vw" : "11px",
                  color: "#333",
                  lineHeight: "1.5"
                }}>{invoiceData.terms}</p>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div style={{
          textAlign: "center",
          fontSize: isMobile ? "2.8vw" : "11px",
          color: "#666",
          borderTop: "2px solid #ccc",
          paddingTop: isMobile ? "2vw" : "12px",
          marginTop: "auto",
          minHeight: isMobile ? "6vw" : "40px",
          backgroundColor: "#f8f9fa"
        }}>
          <p style={{ margin: "0 0 4px 0", fontWeight: "bold" }}>{t.thankYou}</p>
          <p style={{ margin: "0" }}>{t.generatedOn}: {format(new Date(), "MMM d, yyyy HH:mm")}</p>
        </div>
      </div>
    </div>
  );
};

