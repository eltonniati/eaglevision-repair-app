
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import UserManualHeader, { UserManualLanguageAndActions } from "./user-manual/UserManualHeader";
import UserManualSections from "./user-manual/UserManualSections";
import { MANUALS } from "./user-manual/ManualData";

export default function UserManualPage() {
  const [language, setLanguage] = useState<keyof typeof MANUALS>("en");
  const navigate = useNavigate();
  const manualRef = useRef<HTMLDivElement>(null);

  // Download PDF handler (text only)
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(MANUALS[language].label + " – User Manual", 10, 15);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    let y = 25;
    MANUALS[language].sections.forEach(section => {
      doc.setFont("helvetica", "bold");
      doc.text(section.title, 10, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      const textArr = Array.isArray(section.text) ? section.text : [section.text];
      textArr.forEach(para => {
        const lines = doc.splitTextToSize(para, 180);
        doc.text(lines, 10, y);
        y += lines.length * 6 + 2;
      });
      y += 4;
    });

    doc.save(
      `User_Manual_${MANUALS[language].label.replace(/[^a-zA-Z]/g, "")}.pdf`
    );
  };

  // Print handler: prints the div containing the manual
  const handlePrint = () => {
    if (!manualRef.current) return;
    const printContents = manualRef.current.innerHTML;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <title>User Manual</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body { font-family: Arial, sans-serif; color: #111; background: #fff }
            .manual-content { max-width: 700px; margin: auto; padding: 32px 8px; }
            .font-semibold { font-weight: 600 }
            .mb-2 { margin-bottom: 8px }
            .mb-8 { margin-bottom: 32px }
            .whitespace-pre-line { white-space: pre-line }
            .text-base { font-size: 1rem }
          </style>
        </head>
        <body>
          <div class="manual-content">
            <h1 style="font-size:2em;font-weight:bold;margin-bottom:1em; text-align:center;">User Manual</h1>
            ${printContents}
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  // Exit handler
  const handleExitManual = () => {
    if (window.history.length > 2) {
      navigate(-1);
      setTimeout(() => {
        if (window.location.pathname === "/user-manual") {
          navigate("/dashboard");
        }
      }, 200);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 px-2 sm:px-4 w-full">
      <UserManualHeader
        language={language}
        setLanguage={setLanguage}
        onDownload={handleDownload}
        onPrint={handlePrint}
        onBack={handleExitManual}
      />
      <UserManualLanguageAndActions
        language={language}
        setLanguage={setLanguage}
        onDownload={handleDownload}
        onPrint={handlePrint}
      />
      <div ref={manualRef}>
        <UserManualSections language={language} />
      </div>
    </div>
  );
}
