<script setup lang="ts">
definePageMeta({
  layout: "onboarding",
});

const router = useRouter();

interface Goal {
  id: string;
  icon: string;
  title: string;
  description: string;
  gradient: string;
  glow: string;
}

const goals: Goal[] = [
  {
    id: "career",
    icon: "i-lucide-briefcase",
    title: "Career Growth",
    description: "Nail job interviews and business meetings",
    gradient: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/20",
  },
  {
    id: "travel",
    icon: "i-lucide-plane",
    title: "Travel",
    description: "Communicate confidently while traveling",
    gradient: "from-cyan-500 to-teal-600",
    glow: "shadow-cyan-500/20",
  },
  {
    id: "academic",
    icon: "i-lucide-graduation-cap",
    title: "Academic",
    description: "Prepare for IELTS, TOEFL, or university",
    gradient: "from-purple-500 to-violet-600",
    glow: "shadow-purple-500/20",
  },
  {
    id: "daily",
    icon: "i-lucide-message-circle",
    title: "Daily Conversations",
    description: "Improve everyday speaking skills",
    gradient: "from-orange-500 to-red-500",
    glow: "shadow-orange-500/20",
  },
  {
    id: "confidence",
    icon: "i-lucide-sparkles",
    title: "Build Confidence",
    description: "Overcome speaking anxiety",
    gradient: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/20",
  },
  {
    id: "other",
    icon: "i-lucide-target",
    title: "Something Else",
    description: "I have a specific goal in mind",
    gradient: "from-gray-500 to-gray-700",
    glow: "shadow-gray-500/20",
  },
];

const selectedGoals = ref<string[]>([]);

function toggleGoal(id: string) {
  if (selectedGoals.value.includes(id)) {
    selectedGoals.value = selectedGoals.value.filter((g) => g !== id);
  } else {
    selectedGoals.value.push(id);
  }
}

function handleContinue() {
  router.push("/level-assessment");
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
        <span class="text-primary-600 dark:text-primary-400">goal</span>?
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Select one or more goals. We'll personalize your experience.
      </p>
    </div>

    <!-- Goals grid -->
    <div class="grid gap-4">
      <button
        v-for="(goal, index) in goals"
        :key="goal.id"
        class="group relative p-5 rounded-2xl transition-all duration-500 text-left animate-slide-up opacity-0"
        :class="[
          selectedGoals.includes(goal.id)
            ? `glass-card ring-2 ring-primary-500/50 shadow-xl ${goal.glow}`
            : 'glass-subtle hover:bg-white/70 dark:hover:bg-gray-800/50',
        ]"
        :style="{
          animationDelay: `${index * 0.08}s`,
          animationFillMode: 'forwards',
        }"
        @click="toggleGoal(goal.id)"
      >
        <div class="flex items-center gap-4">
          <!-- Icon -->
          <div
            class="relative w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500"
            :class="[
              selectedGoals.includes(goal.id)
                ? `bg-linear-to-br ${goal.gradient} shadow-lg ${goal.glow}`
                : 'bg-gray-100 dark:bg-gray-800 group-hover:scale-110',
            ]"
          >
            <NuxtIcon
              :name="goal.icon"
              class="w-7 h-7 transition-colors duration-300"
              :style="{ color: selectedGoals.includes(goal.id) ? 'white' : '' }"
            />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 dark:text-white text-lg">
              {{ goal.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {{ goal.description }}
            </p>
          </div>

          <!-- Checkbox -->
          <div
            class="w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300"
            :class="[
              selectedGoals.includes(goal.id)
                ? 'border-primary-500 bg-primary-500 scale-110'
                : 'border-gray-300 dark:border-gray-600 group-hover:border-primary-400',
            ]"
          >
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 scale-0"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-0"
            >
              <NuxtIcon
                name="i-lucide-check"
                v-if="selectedGoals.includes(goal.id)"
                class="w-4 h-4 text-white"
              />
            </Transition>
          </div>
        </div>
      </button>
    </div>

    <!-- Continue button -->
    <div class="pt-4 space-y-4">
      <button
        :disabled="selectedGoals.length === 0"
        class="w-full group relative flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-2xl transition-all duration-300"
        :class="[
          selectedGoals.length > 0
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

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <p
          v-if="selectedGoals.length === 0"
          class="text-center text-sm text-gray-500 dark:text-gray-400"
        >
          Select at least one goal to continue
        </p>
        <p
          v-else
          class="text-center text-sm text-primary-600 dark:text-primary-400 font-medium"
        >
          {{ selectedGoals.length }}
          {{ selectedGoals.length === 1 ? "goal" : "goals" }} selected
        </p>
      </Transition>
    </div>
  </div>
</template>
