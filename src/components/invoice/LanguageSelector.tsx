
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Language } from "@/lib/invoice-translations";

interface LanguageSelectorProps {
  value: Language;
  onValueChange: (language: Language) => void;
}

export const LanguageSelector = ({ value, onValueChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language-select" className="text-sm font-medium">
        Language:
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="pt">Português</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
