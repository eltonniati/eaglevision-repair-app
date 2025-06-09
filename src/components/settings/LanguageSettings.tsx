
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/app-translations";

export const LanguageSettings = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.language}</CardTitle>
        <CardDescription>{t.selectLanguage}</CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t.selectLanguage} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t.english}</SelectItem>
            <SelectItem value="fr">{t.french}</SelectItem>
            <SelectItem value="pt">{t.portuguese}</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
