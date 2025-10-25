import { Separator } from "@/components/ui/separator";
import { Users, MessageSquare, TrendingUp, Clock } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "12.5K",
      label: "Active Members",
      description: "Growing community",
    },
    {
      icon: MessageSquare,
      value: "45.2K",
      label: "Total Threads",
      description: "Discussions created",
    },
    {
      icon: TrendingUp,
      value: "892",
      label: "Daily Posts",
      description: "Active conversations",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Always Live",
      description: "Round the clock",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join a Thriving Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with thousands of passionate individuals sharing ideas,
            knowledge, and experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        <Separator className="my-16" />

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Latest Discussions
          </h3>
          <p className="text-gray-600 mb-8">
            Explore trending topics and join the conversation below
          </p>
        </div>
      </div>
    </section>
  );
}
