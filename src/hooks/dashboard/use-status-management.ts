
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, CheckCircle, ShoppingBag } from "lucide-react";

export function useStatusManagement() {
  const { t } = useLanguage();

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

  return {
    getStatusColor,
    getStatusIcon
  };
}
