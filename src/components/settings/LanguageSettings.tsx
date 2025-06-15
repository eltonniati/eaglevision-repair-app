
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/app-translations";

export const LanguageSettings = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: "en", name: t.english, flag: "🇬🇧" },
    { code: "fr", name: t.french, flag: "🇫🇷" },
    { code: "pt", name: t.portuguese, flag: "🇵🇹" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ln", name: "Lingála", flag: "🇨🇩" },
    { code: "kg", name: "Kikóngó", flag: "🇨🇩" },
    { code: "sw", name: "Swahili", flag: "🇨🇩" },
    { code: "ts", name: "Tshiluba", flag: "🇨🇩" },
  ];

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
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
