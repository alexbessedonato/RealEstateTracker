import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
      <Skeleton className="h-40 w-full rounded-xl bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Skeleton className="h-20 w-full rounded-xl bg-gray-200" />
        <Skeleton className="h-20 w-full rounded-xl bg-gray-200" />
        <Skeleton className="h-20 w-full rounded-xl bg-gray-200" />
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Skeleton className="h-32 min-w-0 flex-1 rounded-xl bg-gray-200" />
        <Skeleton className="h-32 min-w-0 flex-1 rounded-xl bg-gray-200" />
      </div>
    </section>
  );
};