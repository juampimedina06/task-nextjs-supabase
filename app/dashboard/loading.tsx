import { Skeleton } from "@/components/ui/skeleton";
import { LayoutGrid } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <LayoutGrid size={32} />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </nav>

      {/* Content */}
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <Skeleton className="mb-4 h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}