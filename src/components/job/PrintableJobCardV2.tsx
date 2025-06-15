
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
      className="w-full bg-white text-black print-container" 
      style={{ 
        width: '100%',
        maxWidth: '375px',
        margin: '0 auto',
        padding: '15px',
        fontSize: '10px',
        lineHeight: '1.3',
        fontFamily: 'Arial, sans-serif',
        boxSizing: 'border-box',
        background: 'white',
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
      }}
    >
      <div style={{ 
        border: '2px solid #333',
        padding: '12px',
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
          marginBottom: '16px',
          width: '100%',
          minHeight: '50px',
          paddingBottom: '12px',
          borderBottom: '1px solid #ddd'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {company?.logo_url && (
              <img 
                src={company.logo_url}
                alt="Company Logo" 
                style={{ 
                  height: '30px', 
                  width: '30px', 
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
                fontSize: '16px', 
                fontWeight: 'bold', 
                margin: '0 0 4px 0',
                color: '#000',
                letterSpacing: '1px',
                textAlign: 'center'
              }}>JOB CARD</h1>
              <p style={{ 
                fontSize: '12px', 
                fontWeight: '600', 
                margin: 0,
                color: '#555'
              }}>#{job?.job_card_number}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '9px', color: '#000' }}>
              <strong>Created:</strong> 
              <span style={{ marginLeft: '4px' }}>{format(new Date(job?.created_at || new Date()), "MMM d, yyyy")}</span>
            </p>
            <p style={{ margin: '0 0 4px 0', fontSize: '9px', color: '#000' }}>
              <strong>Status:</strong> 
              <span style={{ marginLeft: '4px', padding: '2px 4px', backgroundColor: '#f0f0f0', borderRadius: '2px' }}>{job.details.status}</span>
            </p>
          </div>
        </div>

        {/* Company and Customer Info */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '12px',
          marginBottom: '12px',
          width: '100%'
        }}>
          <div style={{ 
            padding: '8px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #e9ecef'
          }}>
            <h2 style={{ 
              fontSize: '11px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #ccc',
              paddingBottom: '4px',
              marginBottom: '6px',
              color: '#000'
            }}>Company</h2>
            <div style={{ lineHeight: '1.4' }}>
              <p style={{ margin: '0 0 3px 0', fontWeight: 'bold', fontSize: '9px', color: '#000' }}>{company?.name ?? "Company Name"}</p>
              {company?.address && (
                <p style={{ margin: '0 0 2px 0', fontSize: '8px', color: '#333' }}>{company.address}</p>
              )}
              {company?.phone && (
                <p style={{ margin: '0 0 2px 0', fontSize: '8px', color: '#333' }}>{company.phone}</p>
              )}
              {company?.email && (
                <p style={{ margin: '0', fontSize: '8px', color: '#333' }}>{company.email}</p>
              )}
            </div>
          </div>
          <div style={{ 
            padding: '8px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #e9ecef'
          }}>
            <h2 style={{ 
              fontSize: '11px', 
              fontWeight: 'bold', 
              borderBottom: '1px solid #ccc',
              paddingBottom: '4px',
              marginBottom: '6px',
              color: '#000'
            }}>Customer</h2>
            <div style={{ lineHeight: '1.4' }}>
              <p style={{ margin: '0 0 3px 0', fontWeight: 'bold', fontSize: '9px', color: '#000' }}>{customerName}</p>
              <p style={{ margin: '0 0 2px 0', fontSize: '8px', color: '#333' }}>{customerPhone}</p>
              {customerEmail && <p style={{ margin: '0', fontSize: '8px', color: '#333' }}>{customerEmail}</p>}
            </div>
          </div>
        </div>

        {/* Device Info */}
        <div style={{ 
          marginBottom: '12px',
          padding: '8px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #e9ecef'
        }}>
          <h2 style={{ 
            fontSize: '11px', 
            fontWeight: 'bold', 
            borderBottom: '1px solid #ccc',
            paddingBottom: '4px',
            marginBottom: '6px',
            color: '#000'
          }}>Device Details</h2>
          <p style={{ margin: '0 0 3px 0', fontSize: '8px', color: '#000', lineHeight: '1.4' }}>
            <strong>Name:</strong> <span style={{ marginLeft: '4px' }}>{deviceName}</span>
          </p>
          <p style={{ margin: '0 0 2px 0', fontSize: '8px', color: '#000' }}>
            <strong>Model:</strong> <span style={{ marginLeft: '4px' }}>{deviceModel}</span>
          </p>
          <p style={{ margin: '0', fontSize: '8px', color: '#000' }}>
            <strong>Condition:</strong> <span style={{ marginLeft: '4px' }}>{deviceCondition}</span>
          </p>
        </div>

        {/* Problem and Fees */}
        <div style={{ 
          marginBottom: '12px',
          padding: '8px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #e9ecef'
        }}>
          <h2 style={{ 
            fontSize: '11px', 
            fontWeight: 'bold', 
            borderBottom: '1px solid #ccc',
            paddingBottom: '4px',
            marginBottom: '6px',
            color: '#000'
          }}>Job Details</h2>
          <p style={{ margin: '0 0 3px 0', fontSize: '8px', color: '#000', lineHeight: '1.4' }}>
            <strong>Problem:</strong> <span style={{ marginLeft: '4px' }}>{problem}</span>
          </p>
          <p style={{ margin: '0', fontSize: '8px', color: '#000' }}>
            <strong>Handling Fees:</strong> <span style={{ marginLeft: '4px' }}>{formatCurrency(handlingFees)}</span>
          </p>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center',
          fontSize: '7px',
          color: '#666',
          borderTop: '1px solid #ccc',
          paddingTop: '8px',
          marginTop: 'auto',
          backgroundColor: '#f8f9fa'
        }}>
          <p style={{ margin: '0' }}>Generated: {format(new Date(), "MMM d, yyyy HH:mm")}</p>
        </div>
      </div>
    </div>
  );
};
