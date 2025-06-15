
import { Language, AppTranslations } from './translations/types';
import { commonTranslations } from './translations/common';
import { navigationTranslations } from './translations/navigation';
import { authTranslations } from './translations/auth';
import { jobCardTranslations } from './translations/job-cards';
import { invoiceTranslations } from './translations/invoices';
import { settingsTranslations } from './translations/settings';
import { companyTranslations } from './translations/company';
import { statusTranslations } from './translations/status';
import { dashboardTranslations } from './translations/dashboard';
import { actionsTranslations } from './translations/actions';

// Export the Language type for backward compatibility
export type { Language, AppTranslations };

// Combine all translation objects for each language
export const translations: Record<Language, AppTranslations> = {} as Record<Language, AppTranslations>;

// Supported languages
const languages: Language[] = ['en', 'fr', 'pt', 'es', 'ln', 'kg', 'sw', 'ts'];

// Build the complete translations object by combining all feature translations
languages.forEach(lang => {
  translations[lang] = {
    ...commonTranslations[lang],
    ...navigationTranslations[lang],
    ...authTranslations[lang],
    ...jobCardTranslations[lang],
    ...invoiceTranslations[lang],
    ...settingsTranslations[lang],
    ...companyTranslations[lang],
    ...statusTranslations[lang],
    ...dashboardTranslations[lang],
    ...actionsTranslations[lang],
  };
});
