
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { LANGS } from "./ManualData";

interface Props {
  language: string;
  setLanguage: (lang: string) => void;
  onDownload: () => void;
  onPrint: () => void;
  onBack: () => void;
}

const UserManualHeader: React.FC<Props> = ({
  language,
  setLanguage,
  onDownload,
  onPrint,
  onBack
}) => (
  <div className="mb-4 flex items-center">
    <Button
      variant="ghost"
      onClick={onBack}
      className="flex items-center gap-2"
      aria-label="Back to dashboard"
      title="Exit manual and return to dashboard"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">Back</span>
    </Button>
    <h1 className="text-3xl font-bold flex-1 text-center -ml-10">
      User Manual
    </h1>
  </div>
);

export const UserManualLanguageAndActions: React.FC<{
  language: string;
  setLanguage: (l: string) => void;
  onDownload: () => void;
  onPrint: () => void;
}> = ({ language, setLanguage, onDownload, onPrint }) => (
  <div className="mb-6 flex flex-col items-center gap-2">
    <label className="font-medium">Choose your language:</label>
    <select
      className="border p-2 rounded"
      value={language}
      onChange={e => setLanguage(e.target.value)}
    >
      {LANGS.map(lang => (
        <option key={lang.code} value={lang.code}>{lang.label}</option>
      ))}
    </select>
    <div className="flex gap-2 mt-2">
      <Button onClick={onDownload}>
        Download PDF
      </Button>
      <Button variant="outline" onClick={onPrint}>
        <Printer className="w-4 h-4 mr-1" />
        Print
      </Button>
    </div>
  </div>
);

export default UserManualHeader;
