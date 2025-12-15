<script setup lang="ts">
definePageMeta({
  layout: "onboarding",
});

const router = useRouter();

interface Level {
  id: string;
  level: string;
  title: string;
  description: string;
  examples: string[];
  gradient: string;
}

const levels: Level[] = [
  {
    id: "beginner",
    level: "A1-A2",
    title: "Beginner",
    description: "I know basic words and phrases",
    examples: ["Hello", "My name is...", "How are you?"],
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: "elementary",
    level: "A2-B1",
    title: "Elementary",
    description: "I can have simple conversations",
    examples: ["I work at...", "I like to...", "Can you help me?"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "intermediate",
    level: "B1-B2",
    title: "Intermediate",
    description: "I can discuss various topics",
    examples: ["In my opinion...", "The advantage is...", "I would suggest..."],
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "upper",
    level: "B2-C1",
    title: "Upper Intermediate",
    description: "I speak fluently but want to improve",
    examples: [
      "From my perspective...",
      "It's worth noting...",
      "Having said that...",
    ],
    gradient: "from-purple-500 to-violet-600",
  },
  {
    id: "advanced",
    level: "C1-C2",
    title: "Advanced",
    description: "I want to sound more natural",
    examples: [
      "Nuanced expressions",
      "Idiomatic speech",
      "Professional fluency",
    ],
    gradient: "from-pink-500 to-rose-600",
  },
];

const selectedLevel = ref<string | null>(null);

function selectLevel(id: string) {
  selectedLevel.value = id;
}

function handleContinue() {
  router.push("/learning-preference");
}

function handleTakeTest() {
  router.push("/learning-preference");
}
</script>

<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="text-center space-y-3 animate-slide-up">
      <h1
        class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
      >
        What's your
        <span class="text-primary-600 dark:text-primary-400">level</span>?
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        This helps us create the perfect learning path for you
      </p>
    </div>

    <!-- Level options -->
    <div class="space-y-3">
      <button
        v-for="(level, index) in levels"
        :key="level.id"
        class="w-full group relative p-5 rounded-2xl transition-all duration-500 text-left animate-slide-up opacity-0"
        :class="[
          selectedLevel === level.id
            ? 'glass-card ring-2 ring-primary-500/50 shadow-xl'
            : 'glass-subtle hover:bg-white/70 dark:hover:bg-gray-800/50',
        ]"
        :style="{
          animationDelay: `${index * 0.08}s`,
          animationFillMode: 'forwards',
        }"
        @click="selectLevel(level.id)"
      >
        <div class="flex items-start gap-4">
          <!-- Level badge with gradient -->
          <div
            class="px-3 py-2 rounded-xl text-sm font-bold shrink-0 transition-all duration-500"
            :class="[
              selectedLevel === level.id
                ? `bg-linear-to-br ${level.gradient} text-white shadow-lg`
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:scale-105',
            ]"
          >
            {{ level.level }}
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-gray-900 dark:text-white text-lg">
              {{ level.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ level.description }}
            </p>
            <!-- Example phrases with glass effect -->
            <div class="flex flex-wrap gap-2 mt-3">
              <span
                v-for="example in level.examples"
                :key="example"
                class="text-xs px-3 py-1.5 rounded-full glass-subtle text-gray-600 dark:text-gray-300"
              >
                "{{ example }}"
              </span>
            </div>
          </div>

          <!-- Radio indicator -->
          <div
            class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-all duration-300"
            :class="[
              selectedLevel === level.id
                ? 'border-primary-500 scale-110'
                : 'border-gray-300 dark:border-gray-600 group-hover:border-primary-400',
            ]"
          >
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 scale-0"
              enter-to-class="opacity-100 scale-100"
            >
              <div
                v-if="selectedLevel === level.id"
                class="w-3 h-3 rounded-full bg-primary-500"
              />
            </Transition>
          </div>
        </div>
      </button>
    </div>

    <!-- Actions -->
    <div class="space-y-4 pt-4">
      <button
        :disabled="!selectedLevel"
        class="w-full group relative flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-2xl transition-all duration-300"
        :class="[
          selectedLevel
            ? 'gradient-primary shadow-xl glow-primary hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]'
            : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed',
        ]"
        @click="handleContinue"
      >
        <span>Continue</span>
        <NuxtIcon
          name="i-lucide-arrow-right"
          class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      <div class="relative py-4">
        <div class="absolute inset-0 flex items-center">
          <div
            class="w-full border-t border-gray-200/50 dark:border-gray-700/50"
          />
        </div>
        <div class="relative flex justify-center text-sm">
          <span
            class="px-4 text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-full"
          >
            or
          </span>
        </div>
      </div>

      <button
        class="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass-subtle hover:bg-white/70 dark:hover:bg-gray-800/70 text-gray-700 dark:text-gray-200 font-medium transition-all duration-300"
        @click="handleTakeTest"
      >
        <NuxtIcon
          name="i-lucide-clipboard-check"
          class="w-5 h-5 text-primary-500"
        />
        Take a quick assessment
      </button>
    </div>
  </div>
</template>
