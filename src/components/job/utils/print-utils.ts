
import { toast } from "sonner";
import { useReactToPrint } from "react-to-print";

// Print preparation utility
export const usePrintJob = (printRef: React.RefObject<HTMLDivElement>, jobCardNumber: string) => {
  const handlePrint = useReactToPrint({
    documentTitle: `JobCard_${jobCardNumber || "unknown"}`,
    onBeforePrint: () => {
      toast.info("Preparing document for printing...");
      // Set up a class on the document body for print styling
      document.body.classList.add('is-printing');
      return Promise.resolve();
    },
    onAfterPrint: () => {
      toast.success("Printed successfully");
      document.body.classList.remove('is-printing');
    },
    onPrintError: (error) => {
      console.error("Print error:", error);
      toast.error("Failed to print");
      document.body.classList.remove('is-printing');
    },
    // Fixed: pass the ref object directly rather than a function returning the current value
    contentRef: printRef,
  });

  const onPrintButtonClick = () => {
    if (typeof handlePrint === 'function') {
      // Create a promise that resolves after the print function is called
      return new Promise<void>((resolve) => {
        handlePrint();
        setTimeout(() => resolve(), 100);
      });
    }
    return Promise.resolve();
  };

  return { onPrintButtonClick };
};
