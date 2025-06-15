
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, Languages } from "lucide-react";
import SignOutButton from "@/components/auth/SignOutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  companyName?: string;
}

export default function DashboardHeader({ companyName }: DashboardHeaderProps) {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "ln", name: "Lingála", flag: "🇨🇩" },
    { code: "kg", name: "Kikóngó", flag: "🇨🇩" },
    { code: "sw", name: "Swahili", flag: "🇨🇩" },
    { code: "ts", name: "Tshiluba", flag: "🇨🇩" },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.dashboard}</h1>
        <p className="text-gray-500 mt-1">
          {companyName ? `${t.welcomeTitle} ${companyName}` : t.welcomeSubtitle}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <Languages className="h-4 w-4" />
              <span>{currentLanguage.flag} {currentLanguage.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t.selectLanguage}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code}
                onClick={() => setLanguage(lang.code as any)}
                className={language === lang.code ? "bg-gray-100" : ""}
              >
                {lang.flag} {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {!companyName && (
          <Button 
            onClick={() => navigate("/company-profile")}
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Settings className="h-4 w-4" />
            {t.updateProfile}
          </Button>
        )}
        <Button 
          onClick={() => navigate("/job-cards/new")}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <PlusCircle className="h-4 w-4" />
          {t.createJobCard}
        </Button>
        <SignOutButton className="w-full sm:w-auto" />
      </div>
    </div>
  );
}
