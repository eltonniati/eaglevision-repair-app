import { format } from "date-fns";
import { DatabaseInvoice } from "@/lib/types";
import { useCompany } from "@/hooks/use-company";
import { useLanguage } from "@/contexts/LanguageContext";
import { Signature } from "@/components/common/Signature";

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

  // Detect mobile for responsive styling
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
        fontSize: isMobile ? '3.5vw' : '12px',
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
        border: isMobile ? '0.5vw solid #333' : '1px solid #333',
        padding: isMobile ? '3vw' : '16px',
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
          marginBottom: isMobile ? '3vw' : '16px',
          width: '100%',
          minHeight: isMobile ? '10vw' : '50px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '2vw' : '8px' }}>
            {company?.logo_url && (
              <img 
                src={company.logo_url} 
                alt="Company Logo" 
                style={{ 
                  height: isMobile ? '8vw' : '35px', 
                  width: isMobile ? '8vw' : '35px', 
                  objectFit: 'contain' 
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <h1 style={{ 
                fontSize: isMobile ? '6vw' : '22px', 
                fontWeight: 'bold', 
                margin: '0 0 2px 0',
                color: '#000'
              }}>{t.invoice}</h1>
              <p style={{ 
                fontSize: isMobile ? '4vw' : '16px', 
                fontWeight: '600', 
                margin: '0',
                color: '#000'
              }}>#{invoice.invoice_number}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '3vw' : '12px', color: '#000' }}>
              <strong>{t.issueDate}:</strong> {format(new Date(invoiceData.issue_date), "MMM d, yyyy")}
            </p>
            <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '3vw' : '12px', color: '#000' }}>
              <strong>{t.dueDate}:</strong> {format(new Date(invoiceData.due_date), "MMM d, yyyy")}
            </p>
            <p style={{ margin: '0', fontSize: isMobile ? '3vw' : '12px', color: '#000' }}>
              <strong>{t.status}:</strong> {invoiceData.status}
            </p>
          </div>
        </div>

        {/* Company and Customer Info */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: isMobile ? '3vw' : '20px',
          marginBottom: isMobile ? '3vw' : '16px',
          width: '100%',
          minHeight: isMobile ? '20vw' : '100px'
        }}>
          <div>
            <h2 style={{ 
              fontSize: isMobile ? '3.5vw' : '14px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '2px',
              marginBottom: isMobile ? '2vw' : '8px',
              color: '#000'
            }}>{t.from}</h2>
            {company ? (
              <div>
                <p style={{ margin: '0 0 2px 0', fontWeight: 'bold', fontSize: isMobile ? '3vw' : '12px', color: '#000' }}>{company.name}</p>
                <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>{company.address}</p>
                <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>{company.phone}</p>
                <p style={{ margin: '0', fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>{company.email}</p>
              </div>
            ) : (
              <p style={{ margin: '0', fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>{t.companyInfoNotAvailable}</p>
            )}
          </div>
          <div>
            <h2 style={{ 
              fontSize: isMobile ? '3.5vw' : '14px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '2px',
              marginBottom: isMobile ? '2vw' : '8px',
              color: '#000'
            }}>{t.billTo}</h2>
            {invoice.jobs && (
              <div>
                <p style={{ margin: '0 0 2px 0', fontWeight: 'bold', fontSize: isMobile ? '3vw' : '12px', color: '#000' }}>{invoice.jobs.customer_name}</p>
                <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>{invoice.jobs.customer_phone}</p>
                {invoice.jobs.customer_email && <p style={{ margin: '0', fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>{invoice.jobs.customer_email}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Invoice Details */}
        <div style={{ marginBottom: isMobile ? '3vw' : '16px', minHeight: isMobile ? '15vw' : '80px' }}>
          <h2 style={{ 
            fontSize: isMobile ? '3.5vw' : '14px', 
            fontWeight: 'bold', 
            borderBottom: '1px solid #000',
            paddingBottom: '2px',
            marginBottom: isMobile ? '2vw' : '8px',
            color: '#000'
          }}>{t.invoiceDetails}</h2>
          <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>
            <strong>{t.description}:</strong> {invoice.bill_description}
          </p>
          {invoice.jobs && (
            <div>
              <p style={{ margin: '0 0 2px 0', fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>
                <strong>{t.device}:</strong> {invoice.jobs.device_name} {invoice.jobs.device_model}
              </p>
              <p style={{ margin: '0', fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>
                <strong>{t.problem}:</strong> {invoice.jobs.problem}
              </p>
            </div>
          )}
        </div>

        {/* Line Items */}
        {invoiceData.line_items && invoiceData.line_items.length > 0 && (
          <div style={{ marginBottom: isMobile ? '3vw' : '16px', flex: '1', minHeight: isMobile ? '30vw' : '150px' }}>
            <h2 style={{ 
              fontSize: isMobile ? '3.5vw' : '14px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #000',
              paddingBottom: '2px',
              marginBottom: isMobile ? '2vw' : '8px',
              color: '#000'
            }}>{t.lineItems}</h2>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              border: '1px solid #000'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: isMobile ? '1vw' : '8px', 
                    textAlign: 'left',
                    fontSize: isMobile ? '2.5vw' : '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{t.description}</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: isMobile ? '1vw' : '8px', 
                    textAlign: 'center',
                    fontSize: isMobile ? '2.5vw' : '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{t.qty}</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: isMobile ? '1vw' : '8px', 
                    textAlign: 'right',
                    fontSize: isMobile ? '2.5vw' : '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{t.unitPrice}</th>
                  <th style={{ 
                    border: '1px solid #000', 
                    padding: isMobile ? '1vw' : '8px', 
                    textAlign: 'right',
                    fontSize: isMobile ? '2.5vw' : '10px',
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{t.amount}</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.line_items.map((item, index) => (
                  <tr key={index}>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: isMobile ? '0.8vw' : '6px',
                      fontSize: isMobile ? '2.2vw' : '9px',
                      color: '#000'
                    }}>{item.description}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: isMobile ? '0.8vw' : '6px', 
                      textAlign: 'center',
                      fontSize: isMobile ? '2.2vw' : '9px',
                      color: '#000'
                    }}>{item.quantity}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: isMobile ? '0.8vw' : '6px', 
                      textAlign: 'right',
                      fontSize: isMobile ? '2.2vw' : '9px',
                      color: '#000'
                    }}>{formatCurrency(item.unit_price)}</td>
                    <td style={{ 
                      border: '1px solid #000', 
                      padding: isMobile ? '0.8vw' : '6px', 
                      textAlign: 'right',
                      fontSize: isMobile ? '2.2vw' : '9px',
                      color: '#000'
                    }}>{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totals */}
        <div style={{ marginBottom: isMobile ? '3vw' : '16px', minHeight: isMobile ? '15vw' : '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: isMobile ? '35vw' : '200px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                borderBottom: '1px solid #000',
                paddingBottom: '2px',
                marginBottom: '2px'
              }}>
                <span style={{ fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>{t.subtotal}:</span>
                <span style={{ fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>{formatCurrency(invoiceData.subtotal || 0)}</span>
              </div>
              {displayTaxes && displayTaxes.length > 0 && (
                <>
                  {displayTaxes.map((tax, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #000',
                      paddingBottom: '2px',
                      marginBottom: '2px'
                    }}>
                      <span style={{ fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>{tax.name} ({tax.rate}%):</span>
                      <span style={{ fontSize: isMobile ? '2.5vw' : '11px', color: '#000' }}>{formatCurrency(tax.amount)}</span>
                    </div>
                  ))}
                </>
              )}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontWeight: 'bold',
                fontSize: isMobile ? '3.2vw' : '13px',
                borderTop: '2px solid #000',
                paddingTop: isMobile ? '1vw' : '8px',
                color: '#000'
              }}>
                <span>{t.total}:</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        {(invoiceData.notes || invoiceData.terms) && (
          <div style={{ marginBottom: isMobile ? '3vw' : '16px', minHeight: isMobile ? '10vw' : '60px' }}>
            {invoiceData.notes && (
              <div style={{ marginBottom: isMobile ? '2vw' : '10px' }}>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: isMobile ? '2.5vw' : '11px',
                  marginBottom: '2px',
                  color: '#000'
                }}>{t.notes}:</h3>
                <p style={{ 
                  whiteSpace: 'pre-line',
                  margin: '0',
                  fontSize: isMobile ? '2.2vw' : '9px',
                  color: '#000'
                }}>{invoiceData.notes}</p>
              </div>
            )}
            {invoiceData.terms && (
              <div>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: isMobile ? '2.5vw' : '11px',
                  marginBottom: '2px',
                  color: '#000'
                }}>{t.termsConditions}:</h3>
                <p style={{ 
                  whiteSpace: 'pre-line',
                  margin: '0',
                  fontSize: isMobile ? '2.2vw' : '9px',
                  color: '#000'
                }}>{invoiceData.terms}</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ 
          textAlign: 'center',
          fontSize: isMobile ? '2.2vw' : '10px',
          color: '#666',
          borderTop: '1px solid #ccc',
          paddingTop: isMobile ? '1vw' : '8px',
          marginTop: 'auto',
          minHeight: isMobile ? '5vw' : '30px'
        }}>
          <p style={{ margin: '0 0 1px 0' }}>{t.thankYou}</p>
          <p style={{ margin: '0' }}>{t.generatedOn}: {format(new Date(), "MMM d, yyyy HH:mm")}</p>
        </div>

        {/* Signature */}
        <div style={{
          textAlign: 'center',
          fontSize: isMobile ? '2vw' : '9px',
          color: '#000',
          borderTop: '1px solid #ccc',
          paddingTop: isMobile ? '1vw' : '8px',
          marginTop: isMobile ? '2vw' : '12px',
          minHeight: isMobile ? '8vw' : '40px'
        }}>
          <p style={{ margin: '0 0 2px 0', fontWeight: 'bold' }}>Made by Elton Niati</p>
          <p style={{ margin: '0 0 1px 0' }}>🌐 eaglevision.dev30.com</p>
          <p style={{ margin: '0 0 1px 0' }}>📱 WhatsApp: 027659132527</p>
          <p style={{ margin: '0 0 1px 0' }}>📘 Facebook: eaglevisiondev30</p>
          <p style={{ margin: '0' }}>🐦 Twitter: eaglevisiondev30</p>
        </div>
      </div>
    </div>
  );
};
