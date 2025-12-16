<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  questions: number;
  status: "completed" | "in-progress" | "locked";
  score?: number;
}

interface AssessmentResult {
  overall: number;
  speaking: number;
  listening: number;
  reading: number;
  writing: number;
  level: string;
  date: string;
}

// Assessment sections
const sections: AssessmentSection[] = [
  {
    id: "speaking",
    title: "Speaking Assessment",
    description: "AI-powered conversation to evaluate pronunciation, fluency, and expression.",
    icon: "i-lucide-mic",
    duration: "10 mins",
    questions: 5,
    status: "completed",
    score: 78,
  },
  {
    id: "listening",
    title: "Listening Comprehension",
    description: "Audio clips with comprehension questions to test your understanding.",
    icon: "i-lucide-headphones",
    duration: "15 mins",
    questions: 20,
    status: "in-progress",
  },
  {
    id: "reading",
    title: "Reading Proficiency",
    description: "Passages with questions to assess vocabulary and comprehension.",
    icon: "i-lucide-book-open",
    duration: "20 mins",
    questions: 25,
    status: "locked",
  },
  {
    id: "writing",
    title: "Writing Evaluation",
    description: "Structured prompts to evaluate grammar, coherence, and style.",
    icon: "i-lucide-pencil",
    duration: "15 mins",
    questions: 3,
    status: "locked",
  },
];

// Last assessment result (mock)
const lastResult: AssessmentResult = {
  overall: 72,
  speaking: 78,
  listening: 68,
  reading: 75,
  writing: 65,
  level: "Intermediate (B1)",
  date: "Dec 10, 2024",
};

const statusConfig: Record<string, { color: string; label: string; icon: string }> = {
  completed: { color: "success", label: "Completed", icon: "i-lucide-check-circle" },
  "in-progress": { color: "warning", label: "In Progress", icon: "i-lucide-loader-2" },
  locked: { color: "neutral", label: "Locked", icon: "i-lucide-lock" },
};

const completedSections = computed(() => sections.filter((s) => s.status === "completed").length);

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600 dark:text-green-400";
  if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Skill Assessment
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Evaluate your English proficiency across all skills
        </p>
      </div>
      <NuxtBadge color="primary" variant="subtle" size="md">
        <NuxtIcon name="i-lucide-award" class="w-4 h-4 mr-1" />
        {{ lastResult.level }}
      </NuxtBadge>
    </div>

    <!-- Progress Overview -->
    <div class="glass-card p-6 rounded-3xl">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <!-- Overall Score Circle -->
        <div class="relative">
          <div class="w-32 h-32 rounded-full flex items-center justify-center bg-linear-to-br from-primary-500 to-indigo-600 shadow-xl shadow-primary-500/30">
            <div class="w-24 h-24 rounded-full bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
              <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ lastResult.overall }}</span>
              <span class="text-xs text-gray-500">Overall</span>
            </div>
          </div>
        </div>

        <!-- Skill Breakdown -->
        <div class="flex-1 w-full space-y-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <NuxtIcon name="i-lucide-mic" class="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <p class="text-2xl font-bold" :class="getScoreColor(lastResult.speaking)">{{ lastResult.speaking }}</p>
              <p class="text-xs text-gray-500">Speaking</p>
            </div>
            <div class="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <NuxtIcon name="i-lucide-headphones" class="w-5 h-5 mx-auto mb-1 text-cyan-500" />
              <p class="text-2xl font-bold" :class="getScoreColor(lastResult.listening)">{{ lastResult.listening }}</p>
              <p class="text-xs text-gray-500">Listening</p>
            </div>
            <div class="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <NuxtIcon name="i-lucide-book-open" class="w-5 h-5 mx-auto mb-1 text-green-500" />
              <p class="text-2xl font-bold" :class="getScoreColor(lastResult.reading)">{{ lastResult.reading }}</p>
              <p class="text-xs text-gray-500">Reading</p>
            </div>
            <div class="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <NuxtIcon name="i-lucide-pencil" class="w-5 h-5 mx-auto mb-1 text-purple-500" />
              <p class="text-2xl font-bold" :class="getScoreColor(lastResult.writing)">{{ lastResult.writing }}</p>
              <p class="text-xs text-gray-500">Writing</p>
            </div>
          </div>
          <div class="flex items-center justify-between text-sm text-gray-500">
            <span>Last assessed: {{ lastResult.date }}</span>
            <NuxtButton size="xs" color="neutral" variant="ghost" trailing-icon="i-lucide-history">
              View History
            </NuxtButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Assessment Progress -->
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Current Assessment</h2>
      <NuxtBadge variant="soft" color="primary" size="sm">
        {{ completedSections }}/{{ sections.length }} Complete
      </NuxtBadge>
    </div>

    <!-- Assessment Sections -->
    <div class="space-y-4">
      <div
        v-for="section in sections"
        :key="section.id"
        class="group glass-card p-6 rounded-2xl transition-all duration-300"
        :class="section.status === 'locked' ? 'opacity-60' : 'hover:shadow-lg hover:-translate-y-1'"
      >
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <!-- Icon & Info -->
          <div class="flex items-center gap-4 flex-1">
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
              :class="section.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30' : section.status === 'in-progress' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-gray-100 dark:bg-gray-800'"
            >
              <NuxtIcon
                :name="section.icon"
                class="w-7 h-7"
                :class="section.status === 'completed' ? 'text-green-600 dark:text-green-400' : section.status === 'in-progress' ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400'"
              />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-bold text-gray-900 dark:text-white">{{ section.title }}</h3>
                <NuxtBadge
                  :color="statusConfig[section.status].color as any"
                  variant="subtle"
                  size="xs"
                >
                  <NuxtIcon :name="statusConfig[section.status].icon" class="w-3 h-3 mr-1" :class="section.status === 'in-progress' ? 'animate-spin' : ''" />
                  {{ statusConfig[section.status].label }}
                </NuxtBadge>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{{ section.description }}</p>
              <div class="flex items-center gap-4 mt-2 text-xs text-gray-400">
                <span><NuxtIcon name="i-lucide-clock" class="w-3 h-3 inline mr-1" />{{ section.duration }}</span>
                <span><NuxtIcon name="i-lucide-help-circle" class="w-3 h-3 inline mr-1" />{{ section.questions }} questions</span>
              </div>
            </div>
          </div>

          <!-- Score or Action -->
          <div class="flex items-center gap-4">
            <div v-if="section.score" class="text-center">
              <p class="text-3xl font-bold" :class="getScoreColor(section.score)">{{ section.score }}</p>
              <p class="text-xs text-gray-500">Score</p>
            </div>
            <NuxtButton
              :color="section.status === 'completed' ? 'success' : section.status === 'in-progress' ? 'warning' : 'neutral'"
              :variant="section.status === 'locked' ? 'outline' : 'solid'"
              :disabled="section.status === 'locked'"
            >
              <NuxtIcon
                :name="section.status === 'completed' ? 'i-lucide-rotate-ccw' : section.status === 'in-progress' ? 'i-lucide-play' : 'i-lucide-lock'"
                class="w-4 h-4 mr-2"
              />
              {{ section.status === 'completed' ? 'Retake' : section.status === 'in-progress' ? 'Continue' : 'Locked' }}
            </NuxtButton>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="glass-card p-6 rounded-2xl border-l-4 border-l-primary-500 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
          <NuxtIcon name="i-lucide-target" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 class="font-bold text-gray-900 dark:text-white">Start Fresh Assessment</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Take all sections to get an updated proficiency level.</p>
        </div>
      </div>
      <NuxtButton color="primary" size="lg" trailing-icon="i-lucide-arrow-right">
        Begin Full Assessment
      </NuxtButton>
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
