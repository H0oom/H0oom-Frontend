import { Skeleton } from '@/shared/ui/skeleton';

export function UserCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white" />
          </div>
          <div className="flex flex-col">
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <Skeleton className="h-5 w-5 rounded" />
      </div>
    </div>
  );
}
