import { jsPDF } from "jspdf";
import { toast } from "sonner";
import { Invoice, InvoiceLineItem, InvoiceTax } from "@/lib/types";

// Utility to paginate invoice table for jsPDF export
function paginateLineItems(
  doc: jsPDF, 
  startY: number, 
  items: InvoiceLineItem[], 
  taxes: InvoiceTax[],
  subtotal: number,
  total: number,
  maxRowsPerPage: number = 18
) {
  let y = startY;
  let page = 1;
  const rowHeight = 9;
  const left = 20, right = 190;
  doc.setFontSize(10);
  let shownRows = 0;

  // Table headers
  function drawHeader(curY: number) {
    doc.setFont("helvetica", "bold");
    doc.text("Description", left, curY);
    doc.text("Qty", 115, curY, { align: "center" });
    doc.text("Unit Price", 140, curY, { align: "right" });
    doc.text("Amount", right, curY, { align: "right" });
    doc.setDrawColor(200);
    doc.line(left, curY + 2, right, curY + 2);
    doc.setFont("helvetica", "normal");
  }

  drawHeader(y);
  y += rowHeight;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // Draw row
    doc.setFont("helvetica", "normal");
    doc.text(String(item.description), left, y);
    doc.text(String(item.quantity), 115, y, { align: "center" });
    doc.text(
      (item.unit_price as number).toFixed(2), 
      140, 
      y, 
      { align: "right" }
    );
    doc.text(
      (item.amount as number).toFixed(2), 
      right, 
      y, 
      { align: "right" }
    );
    y += rowHeight;
    shownRows++;

    if (shownRows >= maxRowsPerPage && i < items.length - 1) {
      // Add page, repeat header
      doc.addPage();
      y = 30;
      drawHeader(y);
      y += rowHeight;
      shownRows = 0;
      page++;
    }
  }

  // Summary box (new page if needed)
  const afterTable = y + 24;
  if (afterTable > 275) {
    doc.addPage();
    y = 30;
  }

  // Totals and taxes summary
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal:", 155, y + 6, { align: "right" });
  doc.text(subtotal.toFixed(2), right, y + 6, { align: "right" });
  let ty = y + 15;
  for (const tax of taxes) {
    doc.setFont("helvetica", "normal");
    doc.text(`${tax.name} (${tax.rate}%):`, 155, ty, { align: "right" });
    doc.text(Number(tax.amount).toFixed(2), right, ty, { align: "right" });
    ty += 9;
  }
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL:", 155, ty, { align: "right" });
  doc.text(total.toFixed(2), right, ty, { align: "right" });

  return ty + 10;
}

// Generate PDF for Invoice
export const generateInvoicePdf = async (
  invoice: Invoice,
  company?: { name?: string; address?: string; phone?: string; email?: string },
  job?: { customer?: { name?: string; phone?: string; email?: string }, job_card_number?: string, device?: { name?: string, model?: string } }
) => {
  try {
    // PDF dimensions
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true
    });

    // Margins
    const left = 20, right = 190;
    let y = 18;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("INVOICE", left, y);

    doc.setFontSize(10);

    // Invoice number and dates
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice #: ${invoice.invoice_number || ""}`, left, y);
    y += 6;
    doc.text(`Date: ${invoice.issue_date ? invoice.issue_date : ""}`, left, y);
    doc.text(`Due: ${invoice.due_date ? invoice.due_date : ""}`, left + 46, y);

    // Company and Customer
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("From:", left, y);
    doc.text("Bill To:", left + 70, y);

    doc.setFont("helvetica", "normal");
    if (company) {
      doc.text(company.name || "", left, y + 6);
      doc.text(company.address || "", left, y + 11);
      doc.text(company.phone || "", left, y + 16);
      doc.text(company.email || "", left, y + 21);
    }
    if (job && job.customer) {
      doc.text(job.customer.name || "", left + 70, y + 6);
      doc.text(job.customer.phone || "", left + 70, y + 11);
      if (job.customer.email) doc.text(job.customer.email, left + 70, y + 16);
    }

    // Job Details
    y += 28;
    doc.setFont("helvetica", "bold");
    doc.text("Job Details:", left, y);
    doc.setFont("helvetica", "normal");
    y += 6;
    if (job && job.job_card_number) {
      doc.text(`Job Card #: ${job.job_card_number}`, left, y);
      if (job.device) {
        doc.text(
          `Device: ${job.device.name} ${job.device.model || ""}`,
          left,
          y + 6
        );
      }
    }

    // Table
    y += 14;
    y = paginateLineItems(
      doc,
      y,
      invoice.line_items,
      invoice.taxes || [],
      invoice.subtotal || 0,
      invoice.total
    );

    // Notes/Terms
    doc.setFont("helvetica", "bold");
    y += 8;
    if (invoice.notes) {
      doc.text("Notes:", left, y);
      doc.setFont("helvetica", "normal");
      doc.text(invoice.notes, left, y + 6, {
        maxWidth: right - left
      });
      y += 11;
    }
    if (invoice.terms) {
      doc.setFont("helvetica", "bold");
      doc.text("Terms & Conditions:", left, y);
      doc.setFont("helvetica", "normal");
      doc.text(invoice.terms, left, y + 6, {
        maxWidth: right - left
      });
      y += 11;
    }

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      left,
      287
    );

    return doc;
  } catch (e) {
    toast.error("Failed to generate invoice PDF");
    throw e;
  }
};

// Download invoice as PDF
export const downloadInvoicePdf = async (
  invoice: Invoice, 
  company?: { name?: string; address?: string; phone?: string; email?: string },
  job?: { customer?: { name?: string; phone?: string; email?: string }, job_card_number?: string, device?: { name?: string, model?: string } }
) => {
  try {
    const pdf = await generateInvoicePdf(invoice, company, job);
    pdf.save(`Invoice_${invoice.invoice_number || ""}.pdf`);
    toast.success("Invoice downloaded successfully");
    return true;
  } catch {
    return false;
  }
};

// Share invoice via native share API or fallback
export const shareInvoice = async (
  invoice: Invoice,
  customerName: string,
  company?: { name?: string; address?: string; phone?: string; email?: string },
  job?: { customer?: { name?: string; phone?: string; email?: string }, job_card_number?: string, device?: { name?: string, model?: string } }
) => {
  try {
    const text = `Invoice #${invoice.invoice_number} for ${customerName}\nAmount: ${invoice.total}\nDue: ${invoice.due_date}`;
    
    if (navigator.share) {
      const { blob } = await getInvoicePdfAsBlob(invoice, company, job);
      await navigator.share({
        title: `Invoice #${invoice.invoice_number}`,
        text: text,
        files: [new File([blob], `Invoice_${invoice.invoice_number}.pdf`, { type: 'application/pdf' })]
      });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    }
  } catch (err) {
    console.error('Error sharing:', err);
    throw err;
  }
};

// Email invoice
export const emailInvoice = async (
  invoice: Invoice,
  customerName: string,
  customerEmail?: string,
  company?: { name?: string; address?: string; phone?: string; email?: string },
  job?: { customer?: { name?: string; phone?: string; email?: string }, job_card_number?: string, device?: { name?: string, model?: string } }
) => {
  try {
    const subject = `Invoice #${invoice.invoice_number} for ${customerName}`;
    const body = `Invoice #${invoice.invoice_number}\n\nCustomer: ${customerName}\nAmount: ${invoice.total}\nDue Date: ${invoice.due_date}\n\nPlease find attached your invoice.`;
    
    window.location.href = `mailto:${customerEmail || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};

// Get invoice PDF as blob for sharing/email
export const getInvoicePdfAsBlob = async (
  invoice: Invoice,
  company?: { name?: string; address?: string; phone?: string; email?: string },
  job?: { customer?: { name?: string; phone?: string; email?: string }, job_card_number?: string, device?: { name?: string, model?: string } }
) => {
  const pdf = await generateInvoicePdf(invoice, company, job);
  return {
    blob: pdf.output("blob"),
    pdf
  };
};
