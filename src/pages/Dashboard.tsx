import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useJobs } from "@/hooks/use-jobs";
import { useCompany } from "@/hooks/use-company";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, PlusCircle, ClipboardList, Settings, ShoppingBag, Clock, CheckCircle, Languages } from "lucide-react";
import SignOutButton from "@/components/auth/SignOutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const { session } = useAuth();
  const { jobs, loading: jobsLoading, updateJob, fetchJobs } = useJobs();
  const { company, loading: companyLoading } = useCompany();
  const { t, language, setLanguage } = useLanguage();
  const [jobsByStatus, setJobsByStatus] = useState<{ [key: string]: number }>({});
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

  // Status translations mapping
  const statusTranslations = {
    "In Progress": t.inProgress,
    "Completed": t.completed,
    "Finished": t.completed,
    "Waiting for Parts": t.waitingForParts
  };

  // Reverse mapping for status translations
  const reverseStatusTranslations = {
    [t.inProgress]: "In Progress",
    [t.completed]: "Completed",
    [t.waitingForParts]: "Waiting for Parts"
  };

  useEffect(() => {
    if (!jobsLoading && jobs) {
      updateStatusCounts();
    }
  }, [jobs, jobsLoading, t]);

  const updateStatusCounts = () => {
    const statusCounts: { [key: string]: number } = {
      [t.inProgress]: 0,
      [t.completed]: 0,
      [t.waitingForParts]: 0,
    };

    jobs.forEach((job) => {
      const translatedStatus = statusTranslations[job.details.status] || job.details.status;
      if (statusCounts[translatedStatus] !== undefined) {
        statusCounts[translatedStatus]++;
      }
    });

    setJobsByStatus(statusCounts);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
      case t.inProgress:
        return "bg-blue-100 text-blue-800";
      case "Finished":
      case "Completed":
      case t.completed:
        return "bg-green-100 text-green-800";
      case "Waiting for Parts":
      case t.waitingForParts:
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
      case t.inProgress:
        return <Clock className="h-4 w-4" />;
      case "Finished":
      case "Completed":
      case t.completed:
        return <CheckCircle className="h-4 w-4" />;
      case "Waiting for Parts":
      case t.waitingForParts:
        return <ShoppingBag className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      // Convert translated status back to original status in string
      const originalStatus = reverseStatusTranslations[newStatus] || newStatus;
      // Find the job to get its current data for the update 
      const jobToUpdate = jobs.find(j => j.id === jobId);
      if (!jobToUpdate) return;
      // Only status is changing here (for dashboard quick action)
      const updates = {
        ...jobToUpdate,
        details: {
          ...jobToUpdate.details,
          status: originalStatus as import("@/lib/types").JobStatus,
        },
      };
      // Push to Supabase!
      await updateJob(jobId, updates);

      // Optionally refetch jobs to update numbers right away (Supabase realtime should also keep sync)
      fetchJobs && fetchJobs();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const isLoading = jobsLoading || companyLoading;
  const recentJobs = jobs.slice(0, 5);

  const handleCardClick = (status: string | null) => {
    navigate("/job-cards", { state: status ? { status } : undefined });
  };

  if (!session) {
    navigate("/");
    return null;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.dashboard}</h1>
          <p className="text-gray-500 mt-1">
            {company?.name ? `${t.welcomeTitle} ${company.name}` : t.welcomeSubtitle}
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
              <DropdownMenuLabel>{t.selectLanguage || "Select language"}</DropdownMenuLabel>
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

          {!company && (
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

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Job Cards */}
          <Card
            role="button"
            tabIndex={0}
            className="hover:shadow-md cursor-pointer transition"
            onClick={() => handleCardClick(null)}
            onKeyDown={e => { if (e.key === 'Enter') handleCardClick(null); }}
            aria-label={t.totalJobCards}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {t.jobCards}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{jobs.length}</div>
              <p className="text-sm text-gray-500 mt-1">{t.totalJobCards}</p>
            </CardContent>
          </Card>
          
          {/* Jobs By Status */}
          {Object.entries(jobsByStatus).map(([status, count]) => (
            <Card
              key={status}
              role="button"
              tabIndex={0}
              className="hover:shadow-md cursor-pointer transition"
              onClick={() => handleCardClick(status)}
              onKeyDown={e => { if (e.key === 'Enter') handleCardClick(status); }}
              aria-label={status}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    <span>{status}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{count}</div>
                <p className="text-sm text-gray-500 mt-1">
                  {status === t.inProgress && t.jobsInProgress}
                  {status === t.completed && t.jobsCompleted}
                  {status === t.waitingForParts && t.jobsWaitingParts}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>{t.recentJobCards}</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/job-cards")}
                  className="text-gray-500 hover:text-gray-900"
                >
                  {t.viewAll}
                </Button>
              </div>
              <CardDescription>
                {t.recentJobsDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {jobsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-md"></div>
                  ))}
                </div>
              ) : recentJobs.length > 0 ? (
                <div className="space-y-4">
                  {recentJobs.map((job) => {
                    const translatedStatus = statusTranslations[job.details.status] || job.details.status;
                    return (
                      <div 
                        key={job.id} 
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-md hover:bg-gray-50"
                      >
                        <div className="flex-1 mb-2 sm:mb-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <span 
                              className="font-medium text-gray-900 cursor-pointer hover:underline"
                              onClick={() => navigate(`/job-cards/${job.id}`)}
                            >
                              #{job.job_card_number}
                            </span>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Badge 
                                  className={`${getStatusColor(job.details.status)} cursor-pointer`}
                                >
                                  {translatedStatus}
                                </Badge>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Change status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleStatusChange(job.id, t.inProgress)}>
                                  {t.inProgress}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(job.id, t.completed)}>
                                  {t.completed}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(job.id, t.waitingForParts)}>
                                  {t.waitingForParts}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {t.customer}: {job.customer.name} • {t.device}: {job.device.name} {job.device.model}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/job-cards/${job.id}`)}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <ArrowRightIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ClipboardList className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">{t.noJobCardsFound}</h3>
                  <p className="text-gray-500 mt-1">
                    {t.createFirstJobCard}
                  </p>
                  <Button 
                    onClick={() => navigate("/job-cards/new")}
                    className="mt-4"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    {t.createJobCard}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t.companyProfile}</CardTitle>
              <CardDescription>
                {t.companyProfileDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {companyLoading ? (
                <div className="space-y-4">
                  <div className="h-8 bg-gray-100 animate-pulse rounded-md"></div>
                  <div className="h-8 bg-gray-100 animate-pulse rounded-md"></div>
                </div>
              ) : company ? (
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
        </div>
      </div>
    </div>
  );
}
