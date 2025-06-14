
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGS } from "@/pages/user-manual/ManualData";
import { Languages } from "lucide-react";

export default function LanguageSelect() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 justify-end mb-4">
      <Languages className="w-4 h-4 text-muted-foreground" aria-hidden />
      <select
        className="border rounded px-2 py-1 bg-white text-sm"
        value={language}
        onChange={e => setLanguage(e.target.value as any)}
        aria-label="Select language"
      >
        {LANGS.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
