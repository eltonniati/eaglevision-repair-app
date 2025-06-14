
import React from "react";
import { MANUALS } from "./ManualData";

interface Props {
  language: keyof typeof MANUALS;
}

const UserManualSections: React.FC<Props> = ({ language }) => {
  return (
    <div className="mt-8 rounded bg-muted p-4 text-sm manual-content" style={{ background: "#fafbfc" }}>
      {MANUALS[language].sections.map((section, idx) => (
        <div key={section.title + idx} className="mb-8">
          <div className="font-semibold text-base mb-2">{section.title}</div>
          {Array.isArray(section.text) ? (
            section.text.map((line, i) => <div key={i} className="mb-1">{line}</div>)
          ) : (
            <div className="mb-2">{section.text}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserManualSections;
