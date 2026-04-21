import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-sm rounded-4xl border bg-background p-6">
        <div className="space-y-4">
          <Skeleton className="mx-auto h-10 w-40" />
          <Skeleton className="mx-auto h-4 w-64" />

          <div className="space-y-4 pt-6">
            <div>
              <Skeleton className="mb-2 h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="mt-4 h-10 w-full" />
            <Skeleton className="mt-3 h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}