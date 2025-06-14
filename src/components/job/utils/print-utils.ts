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
              font-size: 14px;
            }
            
            .print-container {
              max-width: 210mm;
              margin: 0 auto;
              padding: 15mm;
              background: white;
              min-height: 297mm;
            }
            
            h1, h2, h3 {
              color: #000 !important;
              margin-bottom: 10px;
            }
            
            h1 {
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 5px;
            }
            
            h2 {
              font-size: 18px;
              font-weight: bold;
              border-bottom: 2px solid #ccc;
              padding-bottom: 5px;
              margin-bottom: 15px;
            }
            
            h3 {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            p {
              margin-bottom: 8px;
              color: #000;
            }
            
            .grid {
              display: grid;
              gap: 20px;
              margin-bottom: 20px;
            }
            
            .grid-cols-2 {
              grid-template-columns: 1fr 1fr;
            }
            
            .card {
              border: 1px solid #ddd;
              padding: 15px;
              border-radius: 5px;
              background: #fff;
            }
            
            .card h3 {
              border-bottom: 1px solid #eee;
              padding-bottom: 8px;
              margin-bottom: 12px;
            }
            
            .font-medium {
              font-weight: 600;
            }
            
            .text-center {
              text-align: center;
            }
            
            .mb-8 {
              margin-bottom: 32px;
            }
            
            .mb-4 {
              margin-bottom: 16px;
            }
            
            .whitespace-pre-line {
              white-space: pre-line;
            }
            
            .border-t {
              border-top: 1px solid #ccc;
              padding-top: 15px;
            }
            
            .text-sm {
              font-size: 12px;
            }
            
            .text-gray-500 {
              color: #666 !important;
            }
            
            .no-print {
              display: none;
            }
            
            @media print {
              body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
              }
              
              .print-container {
                margin: 0;
                padding: 0;
                max-width: none;
                min-height: auto;
              }
              
              .no-print {
                display: none !important;
              }
              
              h1, h2, h3, p, span, div {
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
              line-height: 1.5;
              color: #000;
              background: #fff;
              font-size: 14px;
            }
            
            .print-container {
              max-width: 210mm;
              margin: 0 auto;
              padding: 15mm;
              background: white;
              min-height: 297mm;
            }
            
            h1, h2, h3 {
              color: #000 !important;
              margin-bottom: 10px;
            }
            
            h1 {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            
            h2 {
              font-size: 18px;
              font-weight: bold;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
              margin-bottom: 15px;
            }
            
            h3 {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            
            p {
              margin-bottom: 8px;
              color: #000;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            
            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
              color: #000;
            }
            
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            
            .text-center {
              text-align: center;
            }
            
            .text-right {
              text-align: right;
            }
            
            .grid {
              display: grid;
              gap: 20px;
              margin-bottom: 20px;
            }
            
            .grid-cols-2 {
              grid-template-columns: 1fr 1fr;
            }
            
            .font-semibold {
              font-weight: 600;
            }
            
            .border-b {
              border-bottom: 1px solid #ccc;
              padding-bottom: 8px;
              margin-bottom: 12px;
            }
            
            .border-t {
              border-top: 1px solid #ccc;
              padding-top: 15px;
            }
            
            .border-t-2 {
              border-top: 2px solid #000;
              padding-top: 10px;
            }
            
            .text-sm {
              font-size: 12px;
            }
            
            .text-lg {
              font-size: 18px;
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
              gap: 16px;
            }
            
            .mb-8 {
              margin-bottom: 32px;
            }
            
            .mb-4 {
              margin-bottom: 16px;
            }
            
            .mb-2 {
              margin-bottom: 8px;
            }
            
            .mt-1 {
              margin-top: 4px;
            }
            
            .mt-8 {
              margin-top: 32px;
            }
            
            .pt-4 {
              padding-top: 16px;
            }
            
            .py-2 {
              padding-top: 8px;
              padding-bottom: 8px;
            }
            
            .w-64 {
              width: 256px;
            }
            
            .object-contain {
              object-fit: contain;
            }
            
            .h-16 {
              height: 64px;
            }
            
            .w-16 {
              width: 64px;
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
              }
              
              .print-container {
                margin: 0;
                padding: 0;
                max-width: none;
                min-height: auto;
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

import { downloadPdf } from "./pdf-utils";
import { toast } from "sonner";
import { isMobileDevice } from "./device-utils";

// Export handlePrint as an alias for handleJobCardPrint for backward compatibility
export const handlePrint = async (
  printRef: React.RefObject<HTMLDivElement>,
  jobNumber?: string
) => {
  if (!printRef.current) {
    throw new Error('Print reference is not available');
  }

  // If on mobile, generate/download PDF instead of direct print
  if (isMobileDevice()) {
    await downloadPdf(printRef, jobNumber || "JobCard");
    toast.info(
      "For the best results on mobile, use the PDF viewer's print/share button after download."
    );
    return;
  }

  // Legacy desktop print flow
  const content = printRef.current.innerHTML;
  return handleJobCardPrint(content, jobNumber);
};
