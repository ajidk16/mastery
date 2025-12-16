<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface WritingPrompt {
  id: number;
  title: string;
  description: string;
  category: "Essay" | "Email" | "Story" | "Review";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  wordLimit: string;
  timeLimit: string;
  completed: boolean;
}

// Writing prompts data
const prompts: WritingPrompt[] = [
  {
    id: 1,
    title: "Describe Your Favorite Place",
    description: "Write a descriptive paragraph about a place that holds special meaning to you.",
    category: "Essay",
    difficulty: "Beginner",
    wordLimit: "100-150",
    timeLimit: "10 mins",
    completed: true,
  },
  {
    id: 2,
    title: "Professional Email Request",
    description: "Write an email to your manager requesting time off for a personal matter.",
    category: "Email",
    difficulty: "Intermediate",
    wordLimit: "80-120",
    timeLimit: "8 mins",
    completed: false,
  },
  {
    id: 3,
    title: "Continue The Story",
    description: "Read the opening paragraph and continue the narrative creatively.",
    category: "Story",
    difficulty: "Advanced",
    wordLimit: "200-300",
    timeLimit: "15 mins",
    completed: false,
  },
  {
    id: 4,
    title: "Restaurant Review",
    description: "Write a balanced review of a restaurant you've visited recently.",
    category: "Review",
    difficulty: "Intermediate",
    wordLimit: "150-200",
    timeLimit: "12 mins",
    completed: false,
  },
];

const categoryIcons: Record<string, string> = {
  Essay: "i-lucide-file-text",
  Email: "i-lucide-mail",
  Story: "i-lucide-book-open",
  Review: "i-lucide-star",
};

const difficultyColors: Record<string, string> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};

// Writing session state
const selectedPrompt = ref<WritingPrompt | null>(null);
const userText = ref("");
const isSubmitting = ref(false);

const wordCount = computed(() => {
  if (!userText.value.trim()) return 0;
  return userText.value.trim().split(/\s+/).length;
});

function selectPrompt(prompt: WritingPrompt) {
  selectedPrompt.value = prompt;
  userText.value = "";
}

function cancelWriting() {
  selectedPrompt.value = null;
  userText.value = "";
}

async function submitWriting() {
  if (!selectedPrompt.value || wordCount.value < 10) return;
  isSubmitting.value = true;
  // Simulate API submission
  await new Promise((r) => setTimeout(r, 2000));
  isSubmitting.value = false;
  selectedPrompt.value = null;
  userText.value = "";
}
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Writing Laboratory
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Improve your writing with AI-powered feedback
        </p>
      </div>
      <NuxtButton to="/practice" color="neutral" variant="ghost" leading-icon="i-lucide-arrow-left">
        Back to Practice
      </NuxtButton>
    </div>

    <!-- Writing Interface (when prompt selected) -->
    <template v-if="selectedPrompt">
      <NuxtCard variant="outline" :ui="{ body: 'p-6' }">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <NuxtIcon :name="categoryIcons[selectedPrompt.category]" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 class="font-bold text-gray-900 dark:text-white">{{ selectedPrompt.title }}</h2>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <NuxtBadge :color="difficultyColors[selectedPrompt.difficulty] as any" variant="subtle" size="xs">
                    {{ selectedPrompt.difficulty }}
                  </NuxtBadge>
                  <span>•</span>
                  <span>{{ selectedPrompt.wordLimit }} words</span>
                  <span>•</span>
                  <span>{{ selectedPrompt.timeLimit }}</span>
                </div>
              </div>
            </div>
            <NuxtButton color="neutral" variant="ghost" icon="i-lucide-x" @click="cancelWriting" />
          </div>
        </template>

        <div class="space-y-4">
          <div class="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p class="text-sm text-gray-600 dark:text-gray-300">
              <strong>Prompt:</strong> {{ selectedPrompt.description }}
            </p>
          </div>

          <NuxtTextarea
            v-model="userText"
            placeholder="Start writing here..."
            :rows="10"
            class="w-full"
            autofocus
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4 text-sm">
              <span :class="wordCount >= 10 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'">
                <NuxtIcon name="i-lucide-text-cursor" class="w-4 h-4 inline mr-1" />
                {{ wordCount }} words
              </span>
            </div>
            <div class="flex gap-2">
              <NuxtButton color="neutral" variant="outline" @click="cancelWriting">
                Cancel
              </NuxtButton>
              <NuxtButton
                color="primary"
                :loading="isSubmitting"
                :disabled="wordCount < 10"
                @click="submitWriting"
              >
                <NuxtIcon name="i-lucide-send" class="w-4 h-4 mr-2" />
                Submit for Review
              </NuxtButton>
            </div>
          </div>
        </div>
      </NuxtCard>
    </template>

    <!-- Prompt Selection Grid -->
    <template v-else>
      <!-- Quick Tips -->
      <div class="glass-card p-6 rounded-2xl border-l-4 border-l-purple-500">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
            <NuxtIcon name="i-lucide-lightbulb" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Writing Tips</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Focus on clarity and structure. Our AI will provide instant feedback on grammar, vocabulary, and style.
            </p>
          </div>
        </div>
      </div>

      <!-- Prompts Grid -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose a Writing Prompt</h2>
        <div class="grid sm:grid-cols-2 gap-6">
          <div
            v-for="prompt in prompts"
            :key="prompt.id"
            class="group glass-card p-6 rounded-2xl transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:border-purple-500/30"
            @click="selectPrompt(prompt)"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 group-hover:scale-110 transition-transform">
                <NuxtIcon :name="categoryIcons[prompt.category]" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div class="flex items-center gap-2">
                <NuxtBadge :color="difficultyColors[prompt.difficulty] as any" variant="subtle" size="xs">
                  {{ prompt.difficulty }}
                </NuxtBadge>
                <NuxtIcon
                  v-if="prompt.completed"
                  name="i-lucide-check-circle-2"
                  class="w-5 h-5 text-green-500"
                />
              </div>
            </div>

            <h3 class="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {{ prompt.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
              {{ prompt.description }}
            </p>

            <div class="flex items-center justify-between text-xs text-gray-400">
              <span class="flex items-center gap-1">
                <NuxtIcon name="i-lucide-text-cursor" class="w-3 h-3" />
                {{ prompt.wordLimit }} words
              </span>
              <span class="flex items-center gap-1">
                <NuxtIcon name="i-lucide-clock" class="w-3 h-3" />
                {{ prompt.timeLimit }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
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
