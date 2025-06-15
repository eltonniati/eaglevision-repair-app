
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
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '20px',
        boxSizing: 'border-box'
      }}
      className="print-pdf-root"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          minHeight: '1000px',
          background: 'white',
          border: '2px solid #333',
          borderRadius: '8px',
          padding: '30px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto'
        }}
      >
        {/* Header with Company Info and Logo */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #333'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {company?.logo_url && (
              <img 
                src={company.logo_url}
                alt="Company Logo" 
                style={{ 
                  height: '70px', 
                  width: '70px', 
                  objectFit: 'contain',
                  border: '1px solid #eee',
                  borderRadius: '6px'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <h1 style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                margin: '0 0 10px 0',
                color: '#000',
                letterSpacing: '2px'
              }}>JOB CARD</h1>
              <p style={{ 
                fontSize: '20px', 
                fontWeight: '600', 
                margin: 0,
                color: '#555'
              }}>#{job?.job_card_number}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#000' }}>
              <strong>Created:</strong> 
              <span style={{ marginLeft: '10px' }}>{format(new Date(job?.created_at || new Date()), "MMM d, yyyy")}</span>
            </p>
            <p style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#000' }}>
              <strong>Status:</strong> 
              <span style={{ 
                marginLeft: '10px', 
                padding: '6px 12px', 
                backgroundColor: '#f0f0f0', 
                borderRadius: '6px',
                fontSize: '14px'
              }}>{job.details.status}</span>
            </p>
          </div>
        </div>

        {/* Company and Customer Info */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '25px',
          marginBottom: '25px'
        }}>
          <div style={{ 
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #e9ecef',
            minHeight: '140px'
          }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              borderBottom: '2px solid #333',
              paddingBottom: '10px',
              marginBottom: '15px',
              color: '#000'
            }}>Company Information</h2>
            <div style={{ lineHeight: '1.8' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '16px', color: '#000' }}>{company?.name ?? "Company Name"}</p>
              {company?.address && (
                <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#333' }}>{company.address}</p>
              )}
              {company?.phone && (
                <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#333' }}>Phone: {company.phone}</p>
              )}
              {company?.email && (
                <p style={{ margin: '0', fontSize: '14px', color: '#333' }}>Email: {company.email}</p>
              )}
            </div>
          </div>
          <div style={{ 
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #e9ecef',
            minHeight: '140px'
          }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              borderBottom: '2px solid #333',
              paddingBottom: '10px',
              marginBottom: '15px',
              color: '#000'
            }}>Customer Information</h2>
            <div style={{ lineHeight: '1.8' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '16px', color: '#000' }}>{customerName}</p>
              <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#333' }}>Phone: {customerPhone}</p>
              {customerEmail && <p style={{ margin: '0', fontSize: '14px', color: '#333' }}>{customerEmail}</p>}
            </div>
          </div>
        </div>

        {/* Device Info */}
        <div style={{ 
          marginBottom: '25px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          border: '1px solid #e9ecef',
          minHeight: '120px'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            borderBottom: '2px solid #333',
            paddingBottom: '10px',
            marginBottom: '15px',
            color: '#000'
          }}>Device Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#000', lineHeight: '1.6' }}>
              <strong>Device Name:</strong><br />
              <span style={{ fontSize: '16px', color: '#333' }}>{deviceName}</span>
            </p>
            <p style={{ margin: '0', fontSize: '14px', color: '#000' }}>
              <strong>Model:</strong><br />
              <span style={{ fontSize: '16px', color: '#333' }}>{deviceModel}</span>
            </p>
            <p style={{ margin: '0', fontSize: '14px', color: '#000' }}>
              <strong>Condition:</strong><br />
              <span style={{ fontSize: '16px', color: '#333' }}>{deviceCondition}</span>
            </p>
          </div>
        </div>

        {/* Problem Description - takes more space */}
        <div style={{ 
          marginBottom: '25px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          border: '1px solid #e9ecef',
          flex: '1',
          minHeight: '200px'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            borderBottom: '2px solid #333',
            paddingBottom: '10px',
            marginBottom: '15px',
            color: '#000'
          }}>Problem Description & Details</h2>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#000', fontWeight: 'bold' }}>
              Reported Problem:
            </p>
            <div style={{ 
              padding: '15px',
              backgroundColor: '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '6px',
              minHeight: '80px',
              fontSize: '16px',
              color: '#333',
              lineHeight: '1.6'
            }}>
              {problem}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#000' }}>
              <strong>Handling Fees:</strong><br />
              <span style={{ fontSize: '20px', color: '#333', fontWeight: 'bold' }}>{formatCurrency(handlingFees)}</span>
            </p>
            <p style={{ margin: '0', fontSize: '14px', color: '#000' }}>
              <strong>Job Status:</strong><br />
              <span style={{ 
                fontSize: '16px', 
                color: '#333',
                padding: '6px 12px',
                backgroundColor: '#e9ecef',
                borderRadius: '6px',
                display: 'inline-block'
              }}>{job.details.status}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center',
          fontSize: '13px',
          color: '#666',
          borderTop: '2px solid #333',
          paddingTop: '15px',
          marginTop: 'auto',
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '6px'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>
            Generated on: {format(new Date(), "MMM d, yyyy 'at' HH:mm")}
          </p>
          <p style={{ margin: '6px 0 0 0', fontSize: '12px' }}>
            This job card serves as official documentation of the repair service request.
          </p>
        </div>
      </div>
    </div>
  );
};
