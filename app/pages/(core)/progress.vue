<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface FluencyData {
  day: string;
  score: number;
}

interface Challenge {
  id: number;
  type: "Grammar" | "Pronunciation" | "Vocabulary";
  label: string;
  count: number;
  solved: boolean;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface SkillBreakdown {
  name: string;
  score: number;
  color: string;
  icon: string;
}

// Fluency trend data
const fluencyData: FluencyData[] = [
  { day: "Mon", score: 30 },
  { day: "Tue", score: 35 },
  { day: "Wed", score: 42 },
  { day: "Thu", score: 45 },
  { day: "Fri", score: 50 },
  { day: "Sat", score: 58 },
  { day: "Sun", score: 62 },
];

const currentFluency = computed(() => fluencyData[fluencyData.length - 1].score);
const fluencyGain = computed(() => {
  const first = fluencyData[0].score;
  const last = fluencyData[fluencyData.length - 1].score;
  return last - first;
});

// Speaking confidence (0-100)
const speakingConfidence = ref(75);

// Time spoken data (minutes per day)
const timeSpokenData = [15, 25, 10, 45, 30, 60, 20];
const totalTimeSpoken = computed(() => timeSpokenData.reduce((a, b) => a + b, 0));

// Challenges conquered
const challenges: Challenge[] = [
  { id: 1, type: "Grammar", count: 12, label: "Past tense usage", solved: true },
  { id: 2, type: "Pronunciation", count: 8, label: "'TH' sound", solved: false },
  { id: 3, type: "Vocabulary", count: 5, label: "Formal greetings", solved: true },
  { id: 4, type: "Grammar", count: 3, label: "Conditional sentences", solved: false },
];

const solvedCount = computed(() => challenges.filter((c) => c.solved).length);

// Skill breakdown
const skills: SkillBreakdown[] = [
  { name: "Speaking", score: 72, color: "primary", icon: "i-lucide-mic" },
  { name: "Listening", score: 65, color: "info", icon: "i-lucide-headphones" },
  { name: "Reading", score: 80, color: "success", icon: "i-lucide-book-open" },
  { name: "Writing", score: 58, color: "warning", icon: "i-lucide-pencil" },
];

// Achievements
const achievements: Achievement[] = [
  { id: 1, title: "First Steps", description: "Complete your first lesson", icon: "i-lucide-footprints", unlocked: true, unlockedAt: "Dec 10" },
  { id: 2, title: "Week Warrior", description: "7-day learning streak", icon: "i-lucide-flame", unlocked: true, unlockedAt: "Dec 15" },
  { id: 3, title: "Vocabulary Master", description: "Learn 100 new words", icon: "i-lucide-book-a", unlocked: false },
  { id: 4, title: "Conversation Pro", description: "Complete 50 speaking sessions", icon: "i-lucide-message-circle", unlocked: false },
];

const unlockedAchievements = computed(() => achievements.filter((a) => a.unlocked).length);

// Tab items for period selector
const periodItems = [
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
];
const selectedPeriod = ref("week");
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Your Growth
        </h1>
        <p class="text-gray-500 dark:text-gray-400">See how far you've come</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- Period Selector -->
        <NuxtTabs
          v-model="selectedPeriod"
          :items="periodItems"
          size="sm"
          color="neutral"
          variant="pill"
          :ui="{ list: 'bg-gray-100 dark:bg-gray-800 p-1 rounded-lg' }"
        />
        <!-- Achievement Badge -->
        <div class="hidden sm:flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/10 px-4 py-2 rounded-full border border-yellow-100 dark:border-yellow-900/30">
          <NuxtIcon name="i-lucide-trophy" class="w-5 h-5 text-yellow-500" />
          <span class="text-sm font-bold text-yellow-700 dark:text-yellow-500">Top 10% Learner</span>
        </div>
      </div>
    </div>

    <!-- Hero Stats Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Fluency Score Card -->
      <div class="glass-card p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[220px] group">
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <NuxtIcon name="i-lucide-trending-up" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white">Fluency Score</h3>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-5xl font-bold text-gray-900 dark:text-white">{{ currentFluency }}</span>
            <NuxtBadge color="success" variant="subtle" size="sm">
              <NuxtIcon name="i-lucide-arrow-up" class="w-3 h-3 mr-1" />
              +{{ fluencyGain }} pts
            </NuxtBadge>
          </div>
          <p class="text-sm text-gray-500 mt-2">Consistency is paying off!</p>
        </div>

        <!-- Mini Chart -->
        <div class="absolute bottom-0 inset-x-0 h-20 flex items-end justify-between px-6 pb-4 gap-1.5">
          <div
            v-for="(data, i) in fluencyData"
            :key="i"
            class="flex-1 relative group/bar"
          >
            <div
              class="bg-primary-200 dark:bg-primary-900/40 rounded-t-md transition-all duration-500 hover:bg-primary-300 dark:hover:bg-primary-800/60"
              :style="{ height: `${data.score}%` }"
            >
              <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                {{ data.score }}
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      <!-- Confidence Level Card -->
      <div class="glass-card p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[220px] group">
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <NuxtIcon name="i-lucide-zap" class="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white">Confidence Level</h3>
          </div>

          <div class="mt-4">
            <NuxtProgress :model-value="speakingConfidence" color="warning" size="lg" class="mb-2" />
            <div class="flex justify-between text-sm font-medium">
              <span class="text-gray-400">Shy</span>
              <span class="text-gray-900 dark:text-white font-bold">{{ speakingConfidence }}%</span>
              <span class="text-gray-400">Bold</span>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-xl flex gap-3 items-start border border-orange-100 dark:border-orange-900/20 mt-4">
          <NuxtIcon name="i-lucide-quote" class="w-6 h-6 text-orange-400 shrink-0 opacity-50" />
          <p class="text-sm text-gray-700 dark:text-gray-300 italic">"You sounded much more assertive in the Business Roleplay yesterday."</p>
        </div>

        <!-- Decorative -->
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      <!-- Time Spoken Card -->
      <div class="glass-card p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[220px] sm:col-span-2 lg:col-span-1 group">
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <NuxtIcon name="i-lucide-clock" class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white">Time Spoken</h3>
          </div>
          <div class="flex items-baseline gap-2">
            <span class="text-5xl font-bold text-gray-900 dark:text-white">{{ totalTimeSpoken }}</span>
            <span class="text-lg text-gray-500">mins</span>
          </div>
          <p class="text-sm text-gray-500 mt-2">This week's total practice time</p>
        </div>

        <!-- Bar Chart -->
        <div class="flex items-end gap-2 h-16 mt-4">
          <div
            v-for="(val, i) in timeSpokenData"
            :key="i"
            class="flex-1 relative group/bar"
          >
            <div
              class="rounded-md transition-all duration-500"
              :class="val === Math.max(...timeSpokenData) ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'"
              :style="{ height: `${(val / 60) * 100}%` }"
            >
              <div class="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-0.5 px-1.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10">
                {{ val }}m
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative -->
        <div class="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>
    </div>

    <!-- Skills & Challenges Section -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Skill Breakdown -->
      <NuxtCard variant="outline" :ui="{ body: 'p-6' }">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <NuxtIcon name="i-lucide-pie-chart" class="w-5 h-5 text-gray-400" />
              <h3 class="font-bold text-gray-900 dark:text-white">Skill Breakdown</h3>
            </div>
            <NuxtBadge variant="subtle" color="neutral" size="xs">This Month</NuxtBadge>
          </div>
        </template>

        <div class="space-y-4">
          <div v-for="skill in skills" :key="skill.name" class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <NuxtIcon :name="skill.icon" class="w-4 h-4 text-gray-500" />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ skill.name }}</span>
              </div>
              <span class="text-sm font-bold text-gray-900 dark:text-white">{{ skill.score }}%</span>
            </div>
            <NuxtProgress :model-value="skill.score" :color="skill.color as any" size="sm" />
          </div>
        </div>
      </NuxtCard>

      <!-- Challenges Conquered -->
      <NuxtCard variant="outline" :ui="{ body: 'p-6' }">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <NuxtIcon name="i-lucide-check-circle-2" class="w-5 h-5 text-gray-400" />
              <h3 class="font-bold text-gray-900 dark:text-white">Challenges Conquered</h3>
            </div>
            <NuxtBadge variant="soft" color="success" size="xs">{{ solvedCount }}/{{ challenges.length }}</NuxtBadge>
          </div>
        </template>

        <div class="space-y-3">
          <div
            v-for="item in challenges"
            :key="item.id"
            class="flex items-center justify-between p-3 rounded-xl transition-all duration-300"
            :class="item.solved ? 'bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20' : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800'"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                :class="item.solved ? 'bg-green-100 dark:bg-green-900/40' : 'bg-gray-100 dark:bg-gray-700'"
              >
                <NuxtIcon
                  :name="item.solved ? 'i-lucide-check' : 'i-lucide-target'"
                  class="w-4 h-4"
                  :class="item.solved ? 'text-green-600 dark:text-green-400' : 'text-gray-400'"
                />
              </div>
              <div>
                <p class="font-medium text-gray-900 dark:text-white text-sm">{{ item.label }}</p>
                <p class="text-xs text-gray-500">{{ item.type }}</p>
              </div>
            </div>
            <NuxtBadge
              :color="item.solved ? 'success' : 'neutral'"
              :variant="item.solved ? 'solid' : 'outline'"
              size="xs"
            >
              {{ item.solved ? 'Solved' : 'In Progress' }}
            </NuxtBadge>
          </div>
        </div>

        <template #footer>
          <p class="text-xs text-center text-gray-500">We track patterns to help you improve faster.</p>
        </template>
      </NuxtCard>
    </div>

    <!-- Achievements Section -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <NuxtIcon name="i-lucide-award" class="w-5 h-5 text-yellow-500" />
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Achievements</h2>
        </div>
        <NuxtBadge variant="subtle" color="warning" size="sm">{{ unlockedAchievements }}/{{ achievements.length }} Unlocked</NuxtBadge>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="achievement in achievements"
          :key="achievement.id"
          class="glass-card p-4 rounded-2xl text-center space-y-2 transition-all duration-300 group"
          :class="achievement.unlocked ? 'hover:shadow-lg hover:-translate-y-1' : 'opacity-50 grayscale'"
        >
          <div
            class="w-12 h-12 rounded-full mx-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            :class="achievement.unlocked ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-800'"
          >
            <NuxtIcon
              :name="achievement.icon"
              class="w-6 h-6"
              :class="achievement.unlocked ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400'"
            />
          </div>
          <h4 class="font-bold text-gray-900 dark:text-white text-sm">{{ achievement.title }}</h4>
          <p class="text-xs text-gray-500 line-clamp-2">{{ achievement.description }}</p>
          <p v-if="achievement.unlocked && achievement.unlockedAt" class="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
            <NuxtIcon name="i-lucide-check-circle" class="w-3 h-3 inline mr-1" />
            {{ achievement.unlockedAt }}
          </p>
          <NuxtIcon v-else name="i-lucide-lock" class="w-4 h-4 text-gray-300 dark:text-gray-600 mx-auto" />
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="relative group">
      <div class="absolute inset-0 bg-linear-to-r from-primary-500/10 to-purple-500/10 rounded-3xl blur-xl transform group-hover:scale-105 transition-transform duration-500" />
      <div class="relative glass-card p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-linear-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0">
            <NuxtIcon name="i-lucide-sparkles" class="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 class="font-bold text-xl text-gray-900 dark:text-white">Keep the momentum going!</h3>
            <p class="text-gray-500 dark:text-gray-400">You're doing great. Continue your learning journey today.</p>
          </div>
        </div>
        <NuxtButton
          to="/practice"
          color="primary"
          size="lg"
          trailing-icon="i-lucide-arrow-right"
          class="w-full md:w-auto shrink-0"
        >
          Start Practicing
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
