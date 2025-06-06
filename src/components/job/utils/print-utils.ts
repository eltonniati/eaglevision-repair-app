
import { toast } from "sonner";
import { Job } from "@/lib/types";

// Print preparation utility
export const usePrintJob = (printRef: React.RefObject<HTMLDivElement>, jobCardNumber: string) => {
  const onPrintButtonClick = () => {
    return new Promise<void>((resolve) => {
      handlePrint(printRef, jobCardNumber);
      setTimeout(() => resolve(), 100);
    });
  };

  return { onPrintButtonClick };
};

// Enhanced print handler for job cards
export const handlePrint = (printRef: React.RefObject<HTMLDivElement>, jobCardNumber: string) => {
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    toast.error('Unable to open print window. Please check your browser settings.');
    return;
  }

  if (!printRef.current) {
    toast.error('Print content not found.');
    printWindow.close();
    return;
  }

  const content = printRef.current.innerHTML;
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Job Card ${jobCardNumber}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            color: black !important;
            background: white !important;
          }
          * {
            color: black !important;
            background: white !important;
          }
          h1, h2, h3 { 
            color: black !important; 
            border-bottom: 2px solid #ccc; 
            padding-bottom: 10px; 
            margin: 20px 0 10px 0;
          }
          table { 
            border-collapse: collapse; 
            width: 100%; 
            margin: 10px 0; 
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 8px; 
            text-align: left; 
            color: black !important;
          }
          th { 
            background-color: #f2f2f2 !important; 
            font-weight: bold; 
          }
          .print-card {
            border: 1px solid #ddd !important;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
          }
          .no-print { display: none; }
          @media print { 
            .no-print { display: none !important; }
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h1>Job Card ${jobCardNumber}</h1>
          <div class="no-print">
            <button onclick="window.print()" style="margin-right: 10px; padding: 8px 16px;">Print</button>
            <button onclick="window.close()" style="padding: 8px 16px;">Close</button>
          </div>
        </div>
        
        <div style="border: 2px solid #333; padding: 20px;">
          ${content}
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  
  printWindow.document.close();
  toast.success("Print window opened successfully");
};

// Print handler for invoices
export const handleInvoicePrint = (content: string, invoiceNumber: string) => {
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    toast.error('Unable to open print window. Please check your browser settings.');
    return;
  }
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            color: black !important;
            background: white !important;
          }
          * {
            color: black !important;
            background: white !important;
          }
          h1, h2, h3 { 
            color: black !important; 
            border-bottom: 2px solid #ccc; 
            padding-bottom: 10px; 
            margin: 20px 0 10px 0;
          }
          table { 
            border-collapse: collapse; 
            width: 100%; 
            margin: 10px 0; 
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 8px; 
            text-align: left; 
            color: black !important;
          }
          th { 
            background-color: #f2f2f2 !important; 
            font-weight: bold; 
          }
          .no-print { display: none; }
          @media print { 
            .no-print { display: none !important; }
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h1>Invoice ${invoiceNumber}</h1>
          <div class="no-print">
            <button onclick="window.print()" style="margin-right: 10px; padding: 8px 16px;">Print</button>
            <button onclick="window.close()" style="padding: 8px 16px;">Close</button>
          </div>
        </div>
        
        <div style="border: 2px solid #333; padding: 20px;">
          ${content}
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  
  printWindow.document.close();
  toast.success("Print window opened successfully");
};
