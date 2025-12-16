<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Practice category types
interface PracticeCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  to: string;
  badge?: string;
  badgeColor?: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
  progress?: number;
  isLocked?: boolean;
}

// Practice categories data
const categories: PracticeCategory[] = [
  {
    id: "speaking",
    title: "Speaking Practice",
    description: "Real-world conversations with AI, pronunciation drills, and role-play scenarios.",
    icon: "i-lucide-mic",
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    borderColor: "hover:border-blue-500/50",
    to: "/practice/speaking",
    badge: "Recommended",
    badgeColor: "primary",
    progress: 65,
  },
  {
    id: "writing",
    title: "Writing Laboratory",
    description: "Essay reviews, grammar correction, and structured writing exercises.",
    icon: "i-lucide-pencil",
    iconColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    borderColor: "hover:border-purple-500/50",
    to: "/practice/writing",
    progress: 30,
    isLocked: true,
  },
  {
    id: "listening",
    title: "Listening Challenge",
    description: "Audio comprehension tests, podcast exercises, and accent training.",
    icon: "i-lucide-headphones",
    iconColor: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    borderColor: "hover:border-green-500/50",
    to: "/practice/listening",
    badge: "Coming Soon",
    badgeColor: "neutral",
    isLocked: true,
  },
  {
    id: "grammar",
    title: "Grammar Drills",
    description: "Interactive exercises to strengthen vocabulary and grammar rules.",
    icon: "i-lucide-book-check",
    iconColor: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    borderColor: "hover:border-orange-500/50",
    to: "/practice/grammar",
    badge: "Coming Soon",
    badgeColor: "neutral",
    isLocked: true,
  },
];

// Quick stats
interface QuickStat {
  label: string;
  value: string;
  icon: string;
  trend?: "up" | "down";
  trendValue?: string;
}

const quickStats: QuickStat[] = [
  { label: "Total Sessions", value: "24", icon: "i-lucide-calendar-check", trend: "up", trendValue: "+3 this week" },
  { label: "Current Streak", value: "7 days", icon: "i-lucide-flame", trend: "up", trendValue: "Keep it up!" },
  { label: "Words Learned", value: "156", icon: "i-lucide-book-a" },
];

// Recent activity
interface RecentActivity {
  id: number;
  title: string;
  type: string;
  date: string;
  score?: number;
}

const recentActivities: RecentActivity[] = [
  { id: 1, title: "Ordering Coffee", type: "Speaking", date: "Today", score: 85 },
  { id: 2, title: "Self Introduction", type: "Speaking", date: "Yesterday", score: 72 },
  { id: 3, title: "Email Writing", type: "Writing", date: "3 days ago", score: 90 },
];
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Practice Arena
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Hone your skills in a safe and engaging environment
        </p>
      </div>
      <NuxtButton
        to="/progress"
        color="neutral"
        variant="ghost"
        trailing-icon="i-lucide-bar-chart-3"
        class="self-start sm:self-auto"
      >
        View Progress
      </NuxtButton>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        v-for="stat in quickStats"
        :key="stat.label"
        class="glass-card p-4 rounded-2xl flex items-center gap-4 group hover:shadow-md transition-all duration-300"
      >
        <div
          class="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
        >
          <NuxtIcon :name="stat.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ stat.label }}</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
          <p v-if="stat.trendValue" class="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
            <NuxtIcon v-if="stat.trend === 'up'" name="i-lucide-trending-up" class="w-3 h-3" />
            {{ stat.trendValue }}
          </p>
        </div>
      </div>
    </div>

    <!-- Practice Categories Grid -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Your Practice</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <component
          :is="category.isLocked ? 'div' : NuxtLink"
          v-for="category in categories"
          :key="category.id"
          :to="category.isLocked ? undefined : category.to"
          class="group glass-card p-6 rounded-3xl flex flex-col gap-4 transition-all duration-300 relative overflow-hidden"
          :class="[
            category.borderColor,
            category.isLocked ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
          ]"
        >
          <!-- Background decoration -->
          <div
            class="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
            :class="category.bgColor"
          />

          <!-- Header -->
          <div class="flex items-start justify-between relative z-10">
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
                :class="category.bgColor"
              >
                <NuxtIcon :name="category.icon" class="w-7 h-7" :class="category.iconColor" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {{ category.title }}
                </h3>
                <NuxtBadge
                  v-if="category.badge"
                  :color="category.badgeColor"
                  variant="subtle"
                  size="xs"
                  class="mt-1"
                >
                  {{ category.badge }}
                </NuxtBadge>
              </div>
            </div>

            <!-- Arrow / Lock indicator -->
            <div
              class="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all duration-300"
              :class="category.isLocked ? '' : 'group-hover:bg-primary-500 group-hover:border-primary-500'"
            >
              <NuxtIcon
                :name="category.isLocked ? 'i-lucide-lock' : 'i-lucide-arrow-right'"
                class="w-5 h-5 text-gray-400"
                :class="category.isLocked ? '' : 'group-hover:text-white'"
              />
            </div>
          </div>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed relative z-10">
            {{ category.description }}
          </p>

          <!-- Progress bar (if available) -->
          <div v-if="category.progress !== undefined && !category.isLocked" class="relative z-10">
            <div class="flex items-center justify-between text-xs mb-2">
              <span class="text-gray-500 dark:text-gray-400">Progress</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ category.progress }}%</span>
            </div>
            <NuxtProgress :model-value="category.progress" size="sm" color="primary" />
          </div>
        </component>
      </div>
    </div>

    <!-- Recent Activity -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        <NuxtButton to="/progress" variant="link" color="neutral" size="sm" trailing-icon="i-lucide-chevron-right">
          See all
        </NuxtButton>
      </div>

      <NuxtCard variant="outline" :ui="{ body: 'p-0' }">
        <ul class="divide-y divide-gray-100 dark:divide-gray-800">
          <li
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <NuxtIcon
                  :name="activity.type === 'Speaking' ? 'i-lucide-mic' : 'i-lucide-pencil'"
                  class="w-5 h-5 text-gray-500"
                />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
                <p class="text-xs text-gray-500">{{ activity.type }} • {{ activity.date }}</p>
              </div>
            </div>
            <div v-if="activity.score" class="flex items-center gap-2">
              <span
                class="text-sm font-bold"
                :class="activity.score >= 80 ? 'text-green-600 dark:text-green-400' : activity.score >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'"
              >
                {{ activity.score }}%
              </span>
              <NuxtIcon name="i-lucide-star" class="w-4 h-4 text-yellow-500" />
            </div>
          </li>
        </ul>
      </NuxtCard>
    </div>

    <!-- Motivational CTA -->
    <div class="relative group">
      <div class="absolute inset-0 bg-linear-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500" />
      <div class="relative glass-card p-6 md:p-8 rounded-3xl border-l-4 border-l-primary-500 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
            <NuxtIcon name="i-lucide-rocket" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 class="font-bold text-gray-900 dark:text-white">Ready to level up?</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Complete 3 more sessions today to unlock a new achievement!</p>
          </div>
        </div>
        <NuxtButton
          to="/practice/speaking"
          color="primary"
          size="lg"
          trailing-icon="i-lucide-arrow-right"
          class="shrink-0 w-full md:w-auto"
        >
          Start Now
        </NuxtButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
