import { format } from "date-fns";
import { Job, Company } from "@/lib/types";
import { useCompany } from "@/hooks/use-company";

interface PrintableJobCardV2Props {
  job: Job;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deviceName: string;
  deviceModel: string;
  deviceCondition: string;
  problem: string;
  handlingFees: number;
  company: Company | null;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-ZA", {
    style: 'currency',
    currency: 'ZAR'
  }).format(amount);
};

export const PrintableJobCardV2 = ({
  job, 
  customerName, 
  customerPhone, 
  customerEmail, 
  deviceName, 
  deviceModel, 
  deviceCondition, 
  problem,
  handlingFees,
  company,
}: PrintableJobCardV2Props) => {
  const isMobile = typeof window !== 'undefined' && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // Use a placeholder logo if logo_url missing/broken
  const fallbackLogo = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&q=80"; // Placeholder image

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
        flexDirection: 'column',
        margin: '0'
      }}>
        {/* Header with Company Info and Logo */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: isMobile ? '5vw' : '24px',
          width: '100%',
          minHeight: isMobile ? '12vw' : '60px',
          paddingBottom: isMobile ? '3vw' : '16px',
          borderBottom: '1px solid #ddd'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '3vw' : '12px' }}>
            <img 
              src={company?.logo_url || fallbackLogo}
              alt="Company Logo" 
              style={{ 
                height: isMobile ? '10vw' : '45px', 
                width: isMobile ? '10vw' : '45px', 
                objectFit: 'contain',
                border: '1px solid #eee',
                borderRadius: '4px',
                background: '#fafafa'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // Only change if not already the placeholder
                if (target && !target.src.includes(fallbackLogo)) target.src = fallbackLogo;
              }}
            />
            <div>
              <h1 style={{ 
                fontSize: isMobile ? '7vw' : '28px', 
                fontWeight: 'bold', 
                margin: '0 0 4px 0',
                color: '#000',
                letterSpacing: '1px'
              }}>JOB CARD</h1>
              <p style={{ 
                fontSize: isMobile ? '4.5vw' : '18px', 
                fontWeight: 600, 
                margin: 0,
                color: '#555'
              }}>#{job?.job_card_number}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 6px 0', fontSize: isMobile ? '3.5vw' : '13px', color: '#000' }}>
              <strong>Created Date:</strong> 
              <span style={{ marginLeft: '8px' }}>{format(new Date(job?.created_at || new Date()), "MMM d, yyyy")}</span>
            </p>
            <p style={{ margin: '0 0 6px 0', fontSize: isMobile ? '3.5vw' : '13px', color: '#000' }}>
              <strong>Status:</strong> 
              <span style={{ marginLeft: '8px', padding: '2px 8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>{job.details.status}</span>
            </p>
          </div>
        </div>

        {/* Company and Customer Info */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: isMobile ? '4vw' : '24px',
          marginBottom: isMobile ? '4vw' : '20px',
          width: '100%',
          minHeight: isMobile ? '25vw' : '120px'
        }}>
          <div style={{ 
            padding: isMobile ? '3vw' : '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            border: '1px solid #e9ecef'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '4vw' : '16px', 
              fontWeight: 'bold', 
              borderBottom: '2px solid #000',
              paddingBottom: '6px',
              marginBottom: isMobile ? '3vw' : '12px',
              color: '#000'
            }}>Company</h2>
            <div style={{ lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: isMobile ? '3.5vw' : '14px', color: '#000' }}>{company?.name ?? "Company Name"}</p>
              {company?.address && (
                <p style={{ margin: '0 0 4px 0', fontSize: isMobile ? '3vw' : '12px', color: '#333' }}>{company.address}</p>
              )}
              {company?.phone && (
                <p style={{ margin: '0 0 4px 0', fontSize: isMobile ? '3vw' : '12px', color: '#333' }}>{company.phone}</p>
              )}
              {company?.email && (
                <p style={{ margin: '0', fontSize: isMobile ? '3vw' : '12px', color: '#333' }}>{company.email}</p>
              )}
            </div>
          </div>
          <div style={{ 
            padding: isMobile ? '3vw' : '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            border: '1px solid #e9ecef'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '4vw' : '16px', 
              fontWeight: 'bold', 
              borderBottom: '2px solid #000',
              paddingBottom: '6px',
              marginBottom: isMobile ? '3vw' : '12px',
              color: '#000'
            }}>Customer</h2>
            <div style={{ lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: isMobile ? '3.5vw' : '14px', color: '#000' }}>{customerName}</p>
              <p style={{ margin: '0 0 4px 0', fontSize: isMobile ? '3vw' : '12px', color: '#333' }}>{customerPhone}</p>
              {customerEmail && <p style={{ margin: '0', fontSize: isMobile ? '3vw' : '12px', color: '#333' }}>{customerEmail}</p>}
            </div>
          </div>
        </div>

        {/* Device Info */}
        <div style={{ 
          marginBottom: isMobile ? '4vw' : '20px', 
          minHeight: isMobile ? '12vw' : '60px',
          padding: isMobile ? '3vw' : '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #e9ecef'
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '4vw' : '16px', 
            fontWeight: 'bold', 
            borderBottom: '2px solid #000',
            paddingBottom: '6px',
            marginBottom: isMobile ? '3vw' : '12px',
            color: '#000'
          }}>Device Details</h2>
          <p style={{ margin: '0 0 6px 0', fontSize: isMobile ? '3vw' : '12px', color: '#000', lineHeight: '1.6' }}>
            <strong>Name:</strong> <span style={{ marginLeft: '8px' }}>{deviceName}</span>
          </p>
          <p style={{ margin: '0 0 4px 0', fontSize: isMobile ? '3vw' : '12px', color: '#000' }}>
            <strong>Model:</strong> <span style={{ marginLeft: '8px' }}>{deviceModel}</span>
          </p>
          <p style={{ margin: '0', fontSize: isMobile ? '3vw' : '12px', color: '#000' }}>
            <strong>Condition:</strong> <span style={{ marginLeft: '8px' }}>{deviceCondition}</span>
          </p>
        </div>

        {/* Problem and Fees */}
        <div style={{ 
          marginBottom: isMobile ? '4vw' : '20px', 
          minHeight: isMobile ? '10vw' : '50px',
          padding: isMobile ? '3vw' : '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #e9ecef'
        }}>
          <h2 style={{ 
            fontSize: isMobile ? '4vw' : '16px', 
            fontWeight: 'bold', 
            borderBottom: '2px solid #000',
            paddingBottom: '6px',
            marginBottom: isMobile ? '3vw' : '12px',
            color: '#000'
          }}>Job Details</h2>
          <p style={{ margin: '0 0 6px 0', fontSize: isMobile ? '3vw' : '12px', color: '#000', lineHeight: '1.6' }}>
            <strong>Problem:</strong> <span style={{ marginLeft: '8px' }}>{problem}</span>
          </p>
          <p style={{ margin: '0', fontSize: isMobile ? '3vw' : '12px', color: '#000' }}>
            <strong>Handling Fees:</strong> <span style={{ marginLeft: '8px' }}>{formatCurrency(handlingFees)}</span>
          </p>
        </div>

        {/* Footer with generated date */}
        <div style={{ 
          textAlign: 'center',
          fontSize: isMobile ? '2.8vw' : '11px',
          color: '#666',
          borderTop: '2px solid #ccc',
          paddingTop: isMobile ? '2vw' : '12px',
          marginTop: 'auto',
          minHeight: isMobile ? '6vw' : '40px',
          backgroundColor: '#f8f9fa'
        }}>
          <p style={{ margin: '0' }}>Generated on: {format(new Date(), "MMM d, yyyy HH:mm")}</p>
        </div>
      </div>
    </div>
  );
};
