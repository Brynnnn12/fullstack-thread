"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ThreadDetailLoadingPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Thread Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Thread Header */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-sm border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-3/5" />
                <Skeleton className="h-6 w-2/5" />
              </div>
              <div className="flex items-center space-x-6">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm shadow-sm border-0"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex items-center space-x-6">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Create Comment Section */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-sm border-0">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
