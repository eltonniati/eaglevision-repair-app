
import { Skeleton } from "@/components/ui/skeleton";

export const JobLoading = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-24 rounded-md mr-2" />
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-md p-6 space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-8 w-48 rounded-md" />
            <Skeleton className="h-8 w-32 rounded-md" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <Skeleton className="h-6 w-32 mb-2 rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
            <div>
              <Skeleton className="h-6 w-32 mb-2 rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>

          <div className="mt-4">
            <Skeleton className="h-6 w-32 mb-2 rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
