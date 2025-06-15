
import { format } from "date-fns";
import { Job, Company } from "@/lib/types";

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
  // A4 in px at 96dpi ≈ 794x1123
  const A4_WIDTH_PX = 794;
  const CARD_PADDING = 24;

  return (
    <div
      // Outer container: Center everything, white BG, 100vw/100vh, so html2canvas takes correct bounds
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}
      className="print-pdf-root"
    >
      <div
        // Inner job card: centered, full A4 width on desktop/tablet, 100% on mobile
        style={{
          width: '100%',
          maxWidth: `${A4_WIDTH_PX}px`,
          minHeight: '1100px',
          background: 'white',
          border: '2px solid #333',
          borderRadius: '8px',
          margin: 0,
          boxSizing: 'border-box',
          padding: `${CARD_PADDING}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header with Company Info and Logo */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '24px',
          width: '100%',
          minHeight: '80px',
          paddingBottom: '16px',
          borderBottom: '2px solid #333'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {company?.logo_url && (
              <img 
                src={company.logo_url}
                alt="Company Logo" 
                style={{ 
                  height: '60px', 
                  width: '60px', 
                  objectFit: 'contain',
                  border: '1px solid #eee',
                  borderRadius: '4px'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <h1 style={{ 
                fontSize: '28px', 
                fontWeight: 'bold', 
                margin: '0 0 8px 0',
                color: '#000',
                letterSpacing: '2px',
                textAlign: 'left'
              }}>JOB CARD</h1>
              <p style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                margin: 0,
                color: '#555'
              }}>#{job?.job_card_number}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#000' }}>
              <strong>Created:</strong> 
              <span style={{ marginLeft: '8px' }}>{format(new Date(job?.created_at || new Date()), "MMM d, yyyy")}</span>
            </p>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#000' }}>
              <strong>Status:</strong> 
              <span style={{ 
                marginLeft: '8px', 
                padding: '4px 8px', 
                backgroundColor: '#f0f0f0', 
                borderRadius: '4px',
                fontSize: '12px'
              }}>{job.details.status}</span>
            </p>
          </div>
        </div>

        {/* Company and Customer Info */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          marginBottom: '20px',
          width: '100%'
        }}>
          <div style={{ 
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            minHeight: '120px'
          }}>
            <h2 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              borderBottom: '2px solid #333',
              paddingBottom: '8px',
              marginBottom: '12px',
              color: '#000'
            }}>Company Information</h2>
            <div style={{ lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: '14px', color: '#000' }}>{company?.name ?? "Company Name"}</p>
              {company?.address && (
                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#333' }}>{company.address}</p>
              )}
              {company?.phone && (
                <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#333' }}>Phone: {company.phone}</p>
              )}
              {company?.email && (
                <p style={{ margin: '0', fontSize: '12px', color: '#333' }}>Email: {company.email}</p>
              )}
            </div>
          </div>
          <div style={{ 
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            minHeight: '120px'
          }}>
            <h2 style={{ 
              fontSize: '16px', 
              fontWeight: 'bold', 
              borderBottom: '2px solid #333',
              paddingBottom: '8px',
              marginBottom: '12px',
              color: '#000'
            }}>Customer Information</h2>
            <div style={{ lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: '14px', color: '#000' }}>{customerName}</p>
              <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#333' }}>Phone: {customerPhone}</p>
              {customerEmail && <p style={{ margin: '0', fontSize: '12px', color: '#333' }}>{customerEmail}</p>}
            </div>
          </div>
        </div>

        {/* Device Info */}
        <div style={{ 
          marginBottom: '20px',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          minHeight: '100px'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            borderBottom: '2px solid #333',
            paddingBottom: '8px',
            marginBottom: '12px',
            color: '#000'
          }}>Device Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <p style={{ margin: '0', fontSize: '12px', color: '#000', lineHeight: '1.6' }}>
              <strong>Device Name:</strong><br />
              <span style={{ fontSize: '14px', color: '#333' }}>{deviceName}</span>
            </p>
            <p style={{ margin: '0', fontSize: '12px', color: '#000' }}>
              <strong>Model:</strong><br />
              <span style={{ fontSize: '14px', color: '#333' }}>{deviceModel}</span>
            </p>
            <p style={{ margin: '0', fontSize: '12px', color: '#000' }}>
              <strong>Condition:</strong><br />
              <span style={{ fontSize: '14px', color: '#333' }}>{deviceCondition}</span>
            </p>
          </div>
        </div>

        {/* Problem Description - takes more space */}
        <div style={{ 
          marginBottom: '20px',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          flex: '1',
          minHeight: '150px'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            borderBottom: '2px solid #333',
            paddingBottom: '8px',
            marginBottom: '12px',
            color: '#000'
          }}>Problem Description & Details</h2>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#000', fontWeight: 'bold' }}>
              Reported Problem:
            </p>
            <div style={{ 
              padding: '12px',
              backgroundColor: '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              minHeight: '60px',
              fontSize: '14px',
              color: '#333',
              lineHeight: '1.5'
            }}>
              {problem}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <p style={{ margin: '0', fontSize: '12px', color: '#000' }}>
              <strong>Handling Fees:</strong><br />
              <span style={{ fontSize: '18px', color: '#333', fontWeight: 'bold' }}>{formatCurrency(handlingFees)}</span>
            </p>
            <p style={{ margin: '0', fontSize: '12px', color: '#000' }}>
              <strong>Job Status:</strong><br />
              <span style={{ 
                fontSize: '14px', 
                color: '#333',
                padding: '4px 8px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                display: 'inline-block'
              }}>{job.details.status}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center',
          fontSize: '11px',
          color: '#666',
          borderTop: '2px solid #333',
          paddingTop: '12px',
          marginTop: 'auto',
          backgroundColor: '#f8f9fa',
          padding: '12px',
          borderRadius: '4px'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>
            Generated on: {format(new Date(), "MMM d, yyyy 'at' HH:mm")}
          </p>
          <p style={{ margin: '4px 0 0 0', fontSize: '10px' }}>
            This job card serves as official documentation of the repair service request.
          </p>
        </div>
      </div>
    </div>
  );
};
