"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-purple-50" />
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-linear-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-linear-to-tr from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Welcome to the Future of Discussions
          </Badge>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Connect Through
            <span className="block bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Meaningful Threads
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join conversations that matter. Share ideas, build communities, and
            discover perspectives that challenge and inspire you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/register">
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link href="#threads">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
              >
                Explore Threads
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
              <MessageSquare className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Engaging Discussions
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Dive deep into topics with threaded conversations
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
              <Users className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Active Community
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Connect with like-minded people worldwide
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
              <TrendingUp className="w-8 h-8 text-pink-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Trending Topics
              </h3>
              <p className="text-gray-600 text-center text-sm">
                Stay updated with the latest discussions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
