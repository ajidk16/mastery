<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface DailyGoal {
  current: number;
  target: number;
}

interface RecommendedLesson {
  title: string;
  description: string;
  duration: string;
  level: string;
  type: string;
  to: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  to: string;
}

interface LastSession {
  title: string;
  type: string;
  progress: number;
  feedback: string;
}

// Data
const dailyGoal: DailyGoal = {
  current: 1,
  target: 3,
};

const percentage = computed(() => (dailyGoal.current / dailyGoal.target) * 100);

const recommendedLesson: RecommendedLesson = {
  title: "Start Speaking",
  description: 'Practice "Ordering Coffee" to boost your confidence in daily situations.',
  duration: "5 mins",
  level: "Beginner Friendly",
  type: "Speaking",
  to: "/practice/speaking",
};

const quickActions: QuickAction[] = [
  {
    title: "Writing Practice",
    description: "Refine your grammar with 2 min exercises",
    icon: "i-lucide-pencil",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    to: "/practice/writing",
  },
  {
    title: "Vocabulary",
    description: "Learn 3 new words from context",
    icon: "i-lucide-book-a",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    to: "/vocabulary",
  },
];

const lastSession: LastSession = {
  title: "Self Introduction",
  type: "Speaking",
  progress: 75,
  feedback: "Good job!",
};

const streak = ref(7);
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Welcome Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Today's Focus
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Keep your streak alive!
        </p>
      </div>
      <div class="flex items-center gap-4">
        <!-- Streak Badge -->
        <div class="hidden sm:flex items-center gap-2 bg-orange-50 dark:bg-orange-900/10 px-4 py-2 rounded-full border border-orange-100 dark:border-orange-900/30">
          <NuxtIcon name="i-lucide-flame" class="w-5 h-5 text-orange-500" />
          <span class="text-sm font-bold text-orange-700 dark:text-orange-400">{{ streak }} Day Streak</span>
        </div>
        <!-- Daily Goal -->
        <div class="text-right">
          <p class="text-sm font-medium text-gray-500">Daily Goal</p>
          <div class="flex items-center gap-2">
            <NuxtProgress :model-value="percentage" size="sm" color="success" class="w-24" />
            <span class="text-sm font-bold text-gray-900 dark:text-white">{{ dailyGoal.current }}/{{ dailyGoal.target }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Primary CTA: Recommended Lesson -->
    <div class="relative group">
      <div class="absolute inset-0 bg-primary-500/20 rounded-[2rem] blur-xl transform group-hover:scale-105 transition-transform duration-500" />

      <NuxtLink
        :to="recommendedLesson.to"
        class="relative block bg-linear-to-br from-primary-600 to-indigo-700 rounded-[2rem] p-8 md:p-10 text-white overflow-hidden shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-300 transform group-hover:-translate-y-1"
      >
        <!-- Decorative backgrounds -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

        <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div class="space-y-4 max-w-lg">
            <NuxtBadge color="white" variant="subtle" size="sm" class="backdrop-blur-md">
              <NuxtIcon name="i-lucide-sparkles" class="w-4 h-4 mr-1" />
              Recommended for you
            </NuxtBadge>

            <div>
              <h2 class="text-3xl md:text-4xl font-bold mb-2">{{ recommendedLesson.title }}</h2>
              <p class="text-primary-100 text-lg leading-relaxed">
                {{ recommendedLesson.description }}
              </p>
            </div>

            <div class="flex items-center gap-6 pt-2">
              <div class="flex items-center gap-2 text-primary-100">
                <NuxtIcon name="i-lucide-clock" class="w-5 h-5" />
                <span>{{ recommendedLesson.duration }}</span>
              </div>
              <div class="flex items-center gap-2 text-primary-100">
                <NuxtIcon name="i-lucide-bar-chart" class="w-5 h-5" />
                <span>{{ recommendedLesson.level }}</span>
              </div>
            </div>
          </div>

          <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white text-primary-600 flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300">
            <NuxtIcon name="i-lucide-mic" class="w-8 h-8 md:w-10 md:h-10" />
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Quick Actions Grid -->
    <div class="grid grid-cols-2 gap-4 md:gap-6">
      <NuxtLink
        v-for="action in quickActions"
        :key="action.title"
        :to="action.to"
        class="glass-card p-6 rounded-3xl hover:border-primary-500/30 hover:shadow-lg transition-all duration-300 group"
      >
        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
          :class="action.iconBg"
        >
          <NuxtIcon :name="action.icon" class="w-6 h-6" :class="action.iconColor" />
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ action.title }}</h3>
        <p class="text-sm text-gray-500 leading-relaxed">{{ action.description }}</p>
      </NuxtLink>
    </div>

    <!-- Last Session Summary -->
    <div class="glass-card p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-secondary-500">
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center shrink-0">
          <NuxtIcon name="i-lucide-history" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
        </div>
        <div>
          <h4 class="font-semibold text-gray-900 dark:text-white">Last Session</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            You practiced "{{ lastSession.title }}" yesterday.
          </p>
          <div class="flex items-center gap-2 mt-2">
            <NuxtProgress :model-value="lastSession.progress" size="xs" color="secondary" class="w-24" />
            <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">{{ lastSession.feedback }}</span>
          </div>
        </div>
      </div>

      <div class="text-center md:text-right bg-gray-50 dark:bg-gray-800/50 px-4 py-3 rounded-xl">
        <p class="text-xs text-gray-500 mb-1">Next milestone</p>
        <p class="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5 justify-center md:justify-end">
          <NuxtIcon name="i-lucide-trophy" class="w-4 h-4 text-yellow-500" />
          Reach {{ streak }} Day Streak
        </p>
      </div>
    </div>

    <!-- Explore More -->
    <div class="grid sm:grid-cols-3 gap-4">
      <NuxtLink
        to="/assessment"
        class="glass-card p-4 rounded-2xl hover:border-primary-500/30 hover:shadow-md transition-all group flex items-center gap-3"
      >
        <div class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
          <NuxtIcon name="i-lucide-clipboard-check" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 class="font-medium text-gray-900 dark:text-white text-sm">Take Assessment</h4>
          <p class="text-xs text-gray-500">Check your level</p>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/speaking-twin"
        class="glass-card p-4 rounded-2xl hover:border-primary-500/30 hover:shadow-md transition-all group flex items-center gap-3"
      >
        <div class="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
          <NuxtIcon name="i-lucide-bot" class="w-5 h-5 text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <h4 class="font-medium text-gray-900 dark:text-white text-sm">AI Speaking Twin</h4>
          <p class="text-xs text-gray-500">Free conversation</p>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/progress"
        class="glass-card p-4 rounded-2xl hover:border-primary-500/30 hover:shadow-md transition-all group flex items-center gap-3"
      >
        <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
          <NuxtIcon name="i-lucide-trending-up" class="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h4 class="font-medium text-gray-900 dark:text-white text-sm">View Progress</h4>
          <p class="text-xs text-gray-500">Track growth</p>
        </div>
      </NuxtLink>
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
