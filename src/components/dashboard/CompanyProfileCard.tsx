
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Company } from "@/lib/types";

interface CompanyProfileCardProps {
  company: Company | null;
  isLoading: boolean;
  t: any;
}

export default function CompanyProfileCard({ company, isLoading, t }: CompanyProfileCardProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.companyProfile}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-8 bg-gray-100 animate-pulse rounded-md"></div>
            <div className="h-8 bg-gray-100 animate-pulse rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.companyProfile}</CardTitle>
        <CardDescription>
          {t.companyProfileDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {company ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t.companyName}</h3>
              <p className="text-gray-900">{company.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t.companyAddress}</h3>
              <p className="text-gray-900">{company.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">{t.contactInformation}</h3>
              <p className="text-gray-900">{company.phone}</p>
              <p className="text-gray-900">{company.email}</p>
            </div>
            {company.logo_url && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Logo</h3>
                <img 
                  src={company.logo_url} 
                  alt="Company logo" 
                  className="h-16 object-contain mt-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <Settings className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-900 font-medium">{t.updateProfile}</h3>
            <p className="text-gray-500 text-sm mt-1">
              {t.managePreferences}
            </p>
            <Button 
              onClick={() => navigate("/company-profile")}
              className="mt-4"
              variant="outline"
            >
              {t.updateProfile}
            </Button>
          </div>
        )}
      </CardContent>
      {company && (
        <CardFooter>
          <Button 
            onClick={() => navigate("/company-profile")}
            variant="outline"
            className="w-full"
          >
            {t.editProfile}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
