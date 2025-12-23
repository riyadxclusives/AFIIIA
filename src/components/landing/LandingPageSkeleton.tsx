import { Skeleton } from "@/components/ui/skeleton";

const LandingPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Skeleton */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl" />
              <Skeleton className="h-6 w-20 sm:w-24" />
            </div>
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-14" />
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Skeleton className="h-9 w-16" />
              <Skeleton className="h-9 w-24" />
            </div>
            <Skeleton className="md:hidden h-6 w-6" />
          </div>
        </div>
      </nav>

      {/* Hero Skeleton */}
      <section className="min-h-[100svh] flex items-center justify-center pt-16 sm:pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-6 sm:mb-8 rounded-full" />
            <Skeleton className="h-12 sm:h-16 w-full max-w-lg mx-auto mb-2" />
            <Skeleton className="h-12 sm:h-16 w-full max-w-md mx-auto mb-6" />
            <Skeleton className="h-5 w-full max-w-2xl mx-auto mb-2" />
            <Skeleton className="h-5 w-full max-w-xl mx-auto mb-8 sm:mb-10" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Skeleton className="h-12 w-full sm:w-40" />
              <Skeleton className="h-12 w-full sm:w-40" />
            </div>
            <div className="mt-12 sm:mt-16 flex items-center justify-center gap-4 sm:gap-6">
              <div className="flex -space-x-2 sm:-space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                ))}
              </div>
              <div>
                <Skeleton className="h-5 w-16 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Skeleton */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
            <Skeleton className="h-10 sm:h-12 w-full max-w-md mx-auto mb-2" />
            <Skeleton className="h-10 sm:h-12 w-full max-w-sm mx-auto mb-4 sm:mb-6" />
            <Skeleton className="h-5 w-full max-w-xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="p-4 sm:p-5 md:p-6 rounded-2xl border border-border/50">
                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 sm:mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageSkeleton;
