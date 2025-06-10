
import { Header } from "@/components/layout/Header";
import { LanguageSettings } from "@/components/settings/LanguageSettings";
import { useLanguage } from "@/contexts/LanguageContext";

const Settings = () => {
  const { t } = useLanguage();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <Header 
        title={t.settings}
        description={t.managePreferences}
      />
      
      <div className="space-y-6">
        <LanguageSettings />
      </div>
    </div>
  );
};

export default Settings;
