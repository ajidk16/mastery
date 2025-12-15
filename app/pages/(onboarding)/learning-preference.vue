<script setup lang="ts">
definePageMeta({
  layout: "onboarding",
});

const router = useRouter();

interface Preference {
  id: string;
  category: string;
  question: string;
  options: {
    value: string;
    label: string;
    icon: string;
    gradient: string;
  }[];
}

const preferences: Preference[] = [
  {
    id: "time",
    category: "Daily Goal",
    question: "How much time can you practice daily?",
    options: [
      {
        value: "5",
        label: "5 min",
        icon: "i-lucide-zap",
        gradient: "from-yellow-400 to-orange-500",
      },
      {
        value: "10",
        label: "10 min",
        icon: "i-lucide-flame",
        gradient: "from-orange-500 to-red-500",
      },
      {
        value: "15",
        label: "15 min",
        icon: "i-lucide-rocket",
        gradient: "from-blue-500 to-indigo-600",
      },
      {
        value: "30",
        label: "30+ min",
        icon: "i-lucide-trophy",
        gradient: "from-purple-500 to-violet-600",
      },
    ],
  },
  {
    id: "style",
    category: "Learning Style",
    question: "How do you prefer to learn?",
    options: [
      {
        value: "conversation",
        label: "Conversations",
        icon: "i-lucide-message-circle",
        gradient: "from-cyan-500 to-teal-600",
      },
      {
        value: "structured",
        label: "Structured",
        icon: "i-lucide-book-open",
        gradient: "from-blue-500 to-indigo-600",
      },
      {
        value: "roleplay",
        label: "Roleplay",
        icon: "i-lucide-drama",
        gradient: "from-pink-500 to-rose-600",
      },
      {
        value: "mixed",
        label: "Mix",
        icon: "i-lucide-layers",
        gradient: "from-purple-500 to-violet-600",
      },
    ],
  },
  {
    id: "reminder",
    category: "Reminders",
    question: "Best time to practice?",
    options: [
      {
        value: "morning",
        label: "Morning",
        icon: "i-lucide-sunrise",
        gradient: "from-yellow-400 to-orange-500",
      },
      {
        value: "afternoon",
        label: "Afternoon",
        icon: "i-lucide-sun",
        gradient: "from-orange-500 to-amber-500",
      },
      {
        value: "evening",
        label: "Evening",
        icon: "i-lucide-sunset",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        value: "none",
        label: "No reminder",
        icon: "i-lucide-bell-off",
        gradient: "from-gray-400 to-gray-600",
      },
    ],
  },
];

const answers = ref<Record<string, string>>({});
const currentQuestion = ref(0);

const isComplete = computed(() =>
  preferences.every((p) => answers.value[p.id])
);
const currentPref = computed(() => preferences[currentQuestion.value]);

function selectOption(prefId: string, value: string) {
  answers.value[prefId] = value;

  setTimeout(() => {
    if (currentQuestion.value < preferences.length - 1) {
      currentQuestion.value++;
    }
  }, 400);
}

function handleContinue() {
  router.push("/permission-request");
}
</script>

<template>
  <div class="space-y-10">
    <!-- Header with animation -->
    <div class="text-center space-y-3 animate-slide-up">
      <p
        class="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider"
      >
        {{ currentPref.category }}
      </p>
      <h1
        class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
      >
        {{ currentPref.question }}
      </h1>
    </div>

    <!-- Question progress dots -->
    <div class="flex justify-center gap-3">
      <button
        v-for="(pref, index) in preferences"
        :key="pref.id"
        class="relative h-2.5 rounded-full transition-all duration-500 overflow-hidden"
        :class="[
          index === currentQuestion ? 'w-10' : 'w-2.5',
          answers[pref.id] ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600',
        ]"
        @click="currentQuestion = index"
      >
        <div
          v-if="index === currentQuestion"
          class="absolute inset-0 gradient-primary animate-shimmer"
        />
      </button>
    </div>

    <!-- Options grid with animation -->
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="(option, index) in currentPref.options"
        :key="option.value"
        class="group relative p-6 sm:p-8 rounded-3xl transition-all duration-500 animate-scale-in opacity-0"
        :class="[
          answers[currentPref.id] === option.value
            ? 'glass-card ring-2 ring-primary-500/50 shadow-xl scale-[1.02]'
            : 'glass-subtle hover:bg-white/70 dark:hover:bg-gray-800/60',
        ]"
        :style="{
          animationDelay: `${index * 0.1}s`,
          animationFillMode: 'forwards',
        }"
        @click="selectOption(currentPref.id, option.value)"
      >
        <!-- Icon with gradient -->
        <div
          class="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-500"
          :class="[
            answers[currentPref.id] === option.value
              ? `bg-linear-to-br ${option.gradient} shadow-lg`
              : 'bg-gray-100 dark:bg-gray-800 group-hover:scale-110',
          ]"
        >
          <NuxtIcon
            :name="option.icon"
            class="w-8 h-8 transition-colors duration-300"
            :style="{
              color: answers[currentPref.id] === option.value ? 'white' : '',
            }"
          />
        </div>

        <!-- Label -->
        <span
          class="font-semibold text-lg transition-colors duration-300 block"
          :class="[
            answers[currentPref.id] === option.value
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-700 dark:text-gray-200',
          ]"
        >
          {{ option.label }}
        </span>

        <!-- Checkmark badge -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-0 rotate-180"
          enter-to-class="opacity-100 scale-100 rotate-0"
        >
          <div
            v-if="answers[currentPref.id] === option.value"
            class="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center shadow-lg"
          >
            <span class="i-lucide-check w-4 h-4 text-white" />
          </div>
        </Transition>
      </button>
    </div>

    <!-- Summary card when complete -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
    >
      <div
        v-if="isComplete"
        class="p-6 rounded-3xl glass-card border-2 border-primary-500/20"
      >
        <h3
          class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
        >
          <NuxtIcon name="i-lucide-sparkles" class="w-5 h-5 text-primary-500" />
          Your preferences
        </h3>
        <div class="grid gap-3 text-sm">
          <div
            v-for="pref in preferences"
            :key="pref.id"
            class="flex items-center gap-3 p-3 rounded-xl glass-subtle"
          >
            <span class="font-medium text-gray-500 dark:text-gray-400 w-24"
              >{{ pref.category }}:</span
            >
            <span class="font-semibold text-gray-900 dark:text-white">
              {{
                pref.options.find((o) => o.value === answers[pref.id])?.label
              }}
            </span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Continue button -->
    <div class="pt-4">
      <button
        :disabled="!isComplete"
        class="w-full group relative flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-2xl transition-all duration-300 overflow-hidden"
        :class="[
          isComplete
            ? 'gradient-primary shadow-xl glow-primary hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]'
            : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed',
        ]"
        @click="handleContinue"
      >
        <div
          v-if="isComplete"
          class="absolute inset-0 animate-shimmer opacity-30"
        />
        <span class="relative">Continue</span>
        <NuxtIcon
          name="i-lucide-arrow-right"
          class="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </div>
  </div>
</template>
