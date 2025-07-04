
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Home, 
  Settings, 
  ClipboardList, 
  Menu, 
  X,
  LogOut,
  Globe
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Language } from "@/lib/app-translations";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut, session } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const navItems: NavItem[] = [
    {
      label: t.dashboard,
      href: "/dashboard",
      icon: <Home className="h-4 w-4" />
    },
    {
      label: t.jobCards,
      href: "/job-cards",
      icon: <ClipboardList className="h-4 w-4" />
    },
    {
      label: t.invoices,
      href: "/invoices",
      icon: <FileText className="h-4 w-4" />
    },
    {
      label: t.companyProfile,
      href: "/company-profile",
      icon: <Settings className="h-4 w-4" />
    },
    {
      label: t.settings,
      href: "/settings",
      icon: <Settings className="h-4 w-4" />
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case 'en': return 'EN';
      case 'fr': return 'FR';
      case 'pt': return 'PT';
      case 'es': return 'ES';
      case 'ln': return 'LN';
      case 'kg': return 'KG';
      case 'sw': return 'SW';
      case 'ts': return 'TS';
      default: return 'EN';
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 py-2 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-fixflow-400 to-fixflow-600 p-2 rounded">
                <ClipboardList className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">FixFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {session && (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                      location.pathname === item.href
                        ? "text-fixflow-600 bg-fixflow-50"
                        : "text-gray-600 hover:text-fixflow-600 hover:bg-gray-50"
                    )}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
                
                {/* Language Selector */}
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                    <SelectTrigger className="w-20 h-8 text-xs">
                      <SelectValue placeholder="Lang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">{t.english}</SelectItem>
                      <SelectItem value="fr">{t.french}</SelectItem>
                      <SelectItem value="pt">{t.portuguese}</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="ln">Lingála</SelectItem>
                      <SelectItem value="kg">Kikongo</SelectItem>
                      <SelectItem value="sw">Kiswahili</SelectItem>
                      <SelectItem value="ts">Tshiluba</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2 text-gray-600"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t.logout}
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {session && (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-base font-medium rounded-md transition-all duration-200",
                      location.pathname === item.href
                        ? "text-fixflow-600 bg-fixflow-50"
                        : "text-gray-600 hover:text-fixflow-600 hover:bg-gray-50"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Language Selector */}
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{t.language}</span>
                  </div>
                  <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t.selectLanguage} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">{t.english}</SelectItem>
                      <SelectItem value="fr">{t.french}</SelectItem>
                      <SelectItem value="pt">{t.portuguese}</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="ln">Lingála</SelectItem>
                      <SelectItem value="kg">Kikongo</SelectItem>
                      <SelectItem value="sw">Kiswahili</SelectItem>
                      <SelectItem value="ts">Tshiluba</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <button
                  className="flex items-center w-full px-3 py-2 text-base font-medium rounded-md text-gray-600 hover:text-fixflow-600 hover:bg-gray-50"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut();
                  }}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  {t.logout}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
