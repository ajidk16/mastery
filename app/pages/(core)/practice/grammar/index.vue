<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface GrammarLesson {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: number;
  completed: boolean;
  progress: number;
}

// Grammar lessons data
const lessons: GrammarLesson[] = [
  {
    id: 1,
    title: "Present Tense Basics",
    description: "Master the simple present tense for everyday actions and habits.",
    category: "Tenses",
    difficulty: "Easy",
    questions: 10,
    completed: true,
    progress: 100,
  },
  {
    id: 2,
    title: "Past Tense Mastery",
    description: "Learn regular and irregular past tense verbs through interactive exercises.",
    category: "Tenses",
    difficulty: "Medium",
    questions: 15,
    completed: false,
    progress: 60,
  },
  {
    id: 3,
    title: "Articles: A, An, The",
    description: "Understand when to use definite and indefinite articles correctly.",
    category: "Articles",
    difficulty: "Easy",
    questions: 12,
    completed: false,
    progress: 0,
  },
  {
    id: 4,
    title: "Conditional Sentences",
    description: "Explore if-clauses and their different types in English.",
    category: "Conditionals",
    difficulty: "Hard",
    questions: 20,
    completed: false,
    progress: 0,
  },
  {
    id: 5,
    title: "Prepositions of Place",
    description: "Practice using in, on, at, and more positional prepositions.",
    category: "Prepositions",
    difficulty: "Easy",
    questions: 8,
    completed: false,
    progress: 0,
  },
  {
    id: 6,
    title: "Modal Verbs",
    description: "Learn can, could, may, might, must, should and their uses.",
    category: "Verbs",
    difficulty: "Medium",
    questions: 14,
    completed: false,
    progress: 0,
  },
];

const categories = computed(() => [...new Set(lessons.map((l) => l.category))]);
const selectedCategory = ref<string | null>(null);

const filteredLessons = computed(() => {
  if (!selectedCategory.value) return lessons;
  return lessons.filter((l) => l.category === selectedCategory.value);
});

const difficultyColors: Record<string, string> = {
  Easy: "success",
  Medium: "warning",
  Hard: "error",
};

const completedCount = computed(() => lessons.filter((l) => l.completed).length);
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <NuxtBadge color="warning" variant="subtle" size="sm">Coming Soon</NuxtBadge>
        </div>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Grammar Drills
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Strengthen your grammar with interactive exercises
        </p>
      </div>
      <NuxtButton to="/practice" color="neutral" variant="ghost" leading-icon="i-lucide-arrow-left">
        Back to Practice
      </NuxtButton>
    </div>

    <!-- Coming Soon Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-linear-to-br from-orange-500 to-red-600 p-8 text-white">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div class="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
          <NuxtIcon name="i-lucide-book-check" class="w-10 h-10 text-white" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-2xl font-bold mb-2">Grammar Module Coming Soon!</h2>
          <p class="text-orange-100 max-w-lg">
            We're building comprehensive grammar exercises with instant feedback and detailed explanations.
          </p>
        </div>
        <NuxtButton color="white" variant="solid" size="lg" disabled class="shrink-0">
          <NuxtIcon name="i-lucide-bell" class="w-5 h-5 mr-2" />
          Notify Me
        </NuxtButton>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4">
      <div class="glass-card p-4 rounded-2xl text-center">
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ lessons.length }}</p>
        <p class="text-sm text-gray-500">Total Lessons</p>
      </div>
      <div class="glass-card p-4 rounded-2xl text-center">
        <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ completedCount }}</p>
        <p class="text-sm text-gray-500">Completed</p>
      </div>
      <div class="glass-card p-4 rounded-2xl text-center">
        <p class="text-3xl font-bold text-orange-600 dark:text-orange-400">{{ categories.length }}</p>
        <p class="text-sm text-gray-500">Categories</p>
      </div>
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap gap-2">
      <NuxtButton
        :color="!selectedCategory ? 'primary' : 'neutral'"
        :variant="!selectedCategory ? 'solid' : 'outline'"
        size="sm"
        @click="selectedCategory = null"
      >
        All
      </NuxtButton>
      <NuxtButton
        v-for="cat in categories"
        :key="cat"
        :color="selectedCategory === cat ? 'primary' : 'neutral'"
        :variant="selectedCategory === cat ? 'solid' : 'outline'"
        size="sm"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </NuxtButton>
    </div>

    <!-- Lessons Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="lesson in filteredLessons"
        :key="lesson.id"
        class="group glass-card p-5 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <div class="flex items-start justify-between mb-3">
          <NuxtBadge :color="difficultyColors[lesson.difficulty] as any" variant="subtle" size="xs">
            {{ lesson.difficulty }}
          </NuxtBadge>
          <NuxtIcon
            v-if="lesson.completed"
            name="i-lucide-check-circle-2"
            class="w-5 h-5 text-green-500"
          />
        </div>

        <h3 class="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {{ lesson.title }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {{ lesson.description }}
        </p>

        <div class="flex items-center justify-between text-xs text-gray-400 mb-3">
          <span>{{ lesson.category }}</span>
          <span>{{ lesson.questions }} questions</span>
        </div>

        <NuxtProgress
          v-if="lesson.progress > 0"
          :model-value="lesson.progress"
          size="sm"
          :color="lesson.completed ? 'success' : 'primary'"
          class="mb-3"
        />

        <NuxtButton
          :color="lesson.completed ? 'success' : 'primary'"
          :variant="lesson.completed ? 'outline' : 'soft'"
          size="sm"
          block
          disabled
        >
          <NuxtIcon :name="lesson.completed ? 'i-lucide-rotate-ccw' : 'i-lucide-play'" class="w-4 h-4 mr-2" />
          {{ lesson.completed ? 'Review' : 'Start' }}
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
