
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, Printer } from "lucide-react";

interface JobDetailHeaderProps {
  onBack: () => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  handleSave: () => Promise<boolean>;
  handlePrint: () => void;
  isMobile: boolean;
}

export const JobDetailHeader: React.FC<JobDetailHeaderProps> = ({
  onBack,
  isEditMode,
  setIsEditMode,
  handleSave,
  handlePrint,
  isMobile
}) => {
  return (
    <div className="flex justify-between items-center mb-4 no-print">
      <Button variant="outline" size="sm" onClick={onBack} className="no-print">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Job Cards
      </Button>
      
      <div className="flex gap-2">
        {isEditMode ? (
          <>
            <Button variant="default" size="sm" onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsEditMode(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handlePrint}
              className="no-print"
            >
              <Printer className="mr-1 h-4 w-4" />
              {isMobile ? "Save as PDF" : "Print Job Card"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditMode(true)}
              className="no-print"
            >
              Edit Job Card
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
