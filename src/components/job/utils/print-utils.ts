
import { downloadJobCardPdf } from "./job-pdf-utils";
import { toast } from "sonner";
import { isMobileDevice } from "./device-utils";

export const handleJobCardPrint = (content: string, jobNumber?: string) => {
  try {
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      throw new Error('Unable to open print window. Please check your browser settings.');
    }

    const title = `Job Card ${jobNumber ? `#${jobNumber}` : ''}`;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.4;
              color: #000;
              background: #fff;
              font-size: 12px;
              width: 100%;
              height: 100%;
            }
            
            .print-container {
              width: 100%;
              max-width: 375px;
              margin: 0 auto;
              padding: 15px;
              background: white;
              min-height: 100vh;
              font-size: 10px;
              line-height: 1.3;
            }
            
            h1, h2, h3 {
              color: #000 !important;
              margin-bottom: 8px;
            }
            
            h1 {
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 5px;
            }
            
            h2 {
              font-size: 12px;
              font-weight: bold;
              border-bottom: 1px solid #ccc;
              padding-bottom: 4px;
              margin-bottom: 8px;
            }
            
            h3 {
              font-size: 11px;
              font-weight: bold;
              margin-bottom: 6px;
            }
            
            p {
              margin-bottom: 4px;
              color: #000;
              font-size: 9px;
            }
            
            .grid {
              display: grid;
              gap: 12px;
              margin-bottom: 12px;
            }
            
            .grid-cols-2 {
              grid-template-columns: 1fr 1fr;
            }
            
            .card {
              border: 1px solid #ddd;
              padding: 8px;
              border-radius: 4px;
              background: #f8f9fa;
            }
            
            .card h3 {
              border-bottom: 1px solid #eee;
              padding-bottom: 4px;
              margin-bottom: 6px;
            }
            
            .font-medium {
              font-weight: 600;
            }
            
            .text-center {
              text-align: center;
            }
            
            .mb-8 {
              margin-bottom: 16px;
            }
            
            .mb-4 {
              margin-bottom: 8px;
            }
            
            .whitespace-pre-line {
              white-space: pre-line;
            }
            
            .border-t {
              border-top: 1px solid #ccc;
              padding-top: 8px;
            }
            
            .text-sm {
              font-size: 8px;
            }
            
            .text-gray-500 {
              color: #666 !important;
            }
            
            .no-print {
              display: none;
            }
            
            img {
              max-width: 30px;
              max-height: 30px;
              object-fit: contain;
            }
            
            @media print {
              body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
                font-size: 10px;
              }
              
              .print-container {
                margin: 0;
                padding: 8px;
                max-width: none;
                min-height: auto;
                width: 100%;
              }
              
              .no-print {
                display: none !important;
              }
              
              h1, h2, h3, p, span, div {
                color: #000 !important;
              }
              
              page-break-inside: avoid;
            }
            
            @media screen and (max-width: 480px) {
              .print-container {
                padding: 10px;
                font-size: 9px;
              }
              
              h1 {
                font-size: 14px;
              }
              
              h2 {
                font-size: 11px;
              }
              
              h3 {
                font-size: 10px;
              }
              
              p {
                font-size: 8px;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${content}
          </div>
          <script>
            window.onload = function() {
              try {
                window.print();
              } catch (e) {
                console.error('Print failed:', e);
              }
            };
            
            window.onafterprint = function() {
              try {
                window.close();
              } catch (e) {
                console.log('Could not close window automatically');
              }
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
  } catch (error) {
    console.error('Print error:', error);
    throw error;
  }
};

export const handleInvoicePrint = (content: string, invoiceNumber?: string) => {
  try {
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      throw new Error('Unable to open print window. Please check your browser settings.');
    }

    const title = `Invoice ${invoiceNumber ? `#${invoiceNumber}` : ''}`;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.4;
              color: #000;
              background: #fff;
              font-size: 12px;
            }
            
            .print-container {
              width: 100%;
              max-width: 375px;
              margin: 0 auto;
              padding: 15px;
              background: white;
              min-height: 100vh;
            }
            
            h1, h2, h3 {
              color: #000 !important;
              margin-bottom: 8px;
            }
            
            h1 {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            
            h2 {
              font-size: 14px;
              font-weight: bold;
              border-bottom: 1px solid #ccc;
              padding-bottom: 4px;
              margin-bottom: 8px;
            }
            
            h3 {
              font-size: 12px;
              font-weight: bold;
              margin-bottom: 6px;
            }
            
            p {
              margin-bottom: 4px;
              color: #000;
              font-size: 10px;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 8px 0;
              font-size: 9px;
            }
            
            th, td {
              border: 1px solid #ddd;
              padding: 4px;
              text-align: left;
              color: #000;
            }
            
            th {
              background-color: #f5f5f5;
              font-weight: bold;
              font-size: 8px;
            }
            
            .text-center {
              text-align: center;
            }
            
            .text-right {
              text-align: right;
            }
            
            .grid {
              display: grid;
              gap: 12px;
              margin-bottom: 12px;
            }
            
            .grid-cols-2 {
              grid-template-columns: 1fr 1fr;
            }
            
            .font-semibold {
              font-weight: 600;
            }
            
            .border-b {
              border-bottom: 1px solid #ccc;
              padding-bottom: 4px;
              margin-bottom: 6px;
            }
            
            .border-t {
              border-top: 1px solid #ccc;
              padding-top: 8px;
            }
            
            .border-t-2 {
              border-top: 2px solid #000;
              padding-top: 6px;
            }
            
            .text-sm {
              font-size: 8px;
            }
            
            .text-lg {
              font-size: 12px;
            }
            
            .font-bold {
              font-weight: bold;
            }
            
            .flex {
              display: flex;
            }
            
            .justify-between {
              justify-content: space-between;
            }
            
            .justify-end {
              justify-content: flex-end;
            }
            
            .items-start {
              align-items: flex-start;
            }
            
            .items-center {
              align-items: center;
            }
            
            .gap-4 {
              gap: 8px;
            }
            
            .mb-8 {
              margin-bottom: 16px;
            }
            
            .mb-4 {
              margin-bottom: 8px;
            }
            
            .mb-2 {
              margin-bottom: 4px;
            }
            
            .mt-1 {
              margin-top: 2px;
            }
            
            .mt-8 {
              margin-top: 16px;
            }
            
            .pt-4 {
              padding-top: 8px;
            }
            
            .py-2 {
              padding-top: 4px;
              padding-bottom: 4px;
            }
            
            .w-64 {
              width: 128px;
            }
            
            .object-contain {
              object-fit: contain;
            }
            
            .h-16 {
              height: 32px;
            }
            
            .w-16 {
              width: 32px;
            }
            
            .whitespace-pre-line {
              white-space: pre-line;
            }
            
            .no-print {
              display: none;
            }
            
            @media print {
              body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
                font-size: 10px;
              }
              
              .print-container {
                margin: 0;
                padding: 8px;
                max-width: none;
                min-height: auto;
                width: 100%;
              }
              
              .no-print {
                display: none !important;
              }
              
              h1, h2, h3, p, span, div, td, th {
                color: #000 !important;
              }
              
              page-break-inside: avoid;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${content}
          </div>
          <script>
            window.onload = function() {
              try {
                window.print();
              } catch (e) {
                console.error('Print failed:', e);
              }
            };
            
            window.onafterprint = function() {
              try {
                window.close();
              } catch (e) {
                console.log('Could not close window automatically');
              }
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
  } catch (error) {
    console.error('Print error:', error);
    throw error;
  }
};

// Universal print handler that works consistently across all devices
export const handlePrint = async (
  printRef: React.RefObject<HTMLDivElement>,
  jobNumber?: string
) => {
  if (!printRef.current) {
    throw new Error('Print reference is not available');
  }

  // Always use PDF generation for consistent results
  await downloadJobCardPdf(printRef, jobNumber || "JobCard");
  toast.success("PDF generated for printing - use your PDF viewer's print option for best results");
};
