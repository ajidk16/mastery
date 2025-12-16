<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
type SessionState = "intro" | "recording" | "processing" | "ai_speaking" | "feedback";

interface FeedbackItem {
  type: "Pronunciation" | "Grammar" | "Fluency";
  text: string;
  score?: number;
}

interface Topic {
  id: number;
  title: string;
  context: string;
  role: string;
}

// Route & Navigation
const route = useRoute();
const router = useRouter();

// State
const state = ref<SessionState>("intro");
const isRecording = ref(false);
const timer = ref(0);
let timerInterval: ReturnType<typeof setInterval> | null = null;

// Mock Data
const topic: Topic = {
  id: Number(route.params.id),
  title: "Ordering Coffee",
  context: "Ask the barista for a latte with oat milk.",
  role: "Customer",
};

const interaction = ref({
  userText: "",
  aiText: "Hi! Welcome to Roasted Bean. What can I get started for you today?",
  feedback: [] as FeedbackItem[],
});

const turnCount = ref(0);

// Lifecycle
onMounted(() => {
  // Start with AI speaking after a short delay
  setTimeout(() => {
    state.value = "ai_speaking";
    setTimeout(() => {
      state.value = "intro";
    }, 3000);
  }, 500);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

// Recording Functions
function toggleRecording() {
  if (isRecording.value) {
    stopRecording();
  } else {
    startRecording();
  }
}

function startRecording() {
  isRecording.value = true;
  state.value = "recording";
  timer.value = 0;
  timerInterval = setInterval(() => {
    timer.value++;
  }, 1000);

  // Auto stop after 4 seconds (demo)
  setTimeout(() => {
    if (isRecording.value) stopRecording();
  }, 4000);
}

function stopRecording() {
  isRecording.value = false;
  if (timerInterval) clearInterval(timerInterval);
  state.value = "processing";

  // Simulate processing -> feedback
  setTimeout(() => {
    state.value = "feedback";
    interaction.value.userText = "Can I have a latte with oat milk, please?";
    interaction.value.feedback = [
      { type: "Pronunciation", text: "Great clarity on 'Latte', but watch the 'Oat' sound.", score: 85 },
      { type: "Grammar", text: "Perfect request structure.", score: 95 },
    ];
    turnCount.value++;
  }, 2000);
}

function nextTurn() {
  state.value = "ai_speaking";
  interaction.value.aiText = "Sure thing! Would you like that hot or iced?";
  interaction.value.feedback = [];

  setTimeout(() => {
    state.value = "intro";
  }, 3000);
}

function exitSession() {
  router.push("/practice/speaking");
}

// Computed
const formattedTimer = computed(() => {
  const mins = Math.floor(timer.value / 60).toString().padStart(2, "0");
  const secs = (timer.value % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
});

const overallScore = computed(() => {
  if (!interaction.value.feedback.length) return 0;
  const total = interaction.value.feedback.reduce((sum, f) => sum + (f.score || 0), 0);
  return Math.round(total / interaction.value.feedback.length);
});
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col relative bg-white dark:bg-gray-950 rounded-3xl overflow-hidden">
    <!-- Top Bar -->
    <div class="flex items-center justify-between p-4 z-10 border-b border-gray-100 dark:border-gray-800">
      <NuxtButton color="neutral" variant="ghost" icon="i-lucide-x" @click="exitSession" />
      <div class="text-center">
        <h2 class="font-bold text-gray-900 dark:text-white">{{ topic.title }}</h2>
        <p class="text-xs text-green-500 font-medium flex items-center justify-center gap-1">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live Session
        </p>
      </div>
      <NuxtBadge color="primary" variant="subtle" size="sm">
        Turn {{ turnCount + 1 }}
      </NuxtBadge>
    </div>

    <!-- Main Area -->
    <div class="flex-1 flex flex-col items-center justify-center p-6 relative overflow-y-auto">
      <!-- STATE: AI Speaking -->
      <div v-if="state === 'ai_speaking'" class="text-center space-y-8 animate-fade-in">
        <div class="relative inline-block">
          <div class="w-32 h-32 rounded-full bg-linear-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-primary-500/40 relative z-10">
            <NuxtIcon name="i-lucide-bot" class="w-12 h-12 text-white" />
          </div>
          <div class="absolute inset-0 rounded-full border-2 border-primary-500 animate-ping opacity-50" />
        </div>

        <NuxtCard variant="outline" class="max-w-md mx-auto rounded-tl-none">
          <p class="text-xl font-medium text-gray-800 dark:text-gray-200">
            "{{ interaction.aiText }}"
          </p>
        </NuxtCard>
      </div>

      <!-- STATE: Recording -->
      <div v-else-if="state === 'recording'" class="text-center w-full max-w-md space-y-12 animate-fade-in">
        <div class="h-24 flex items-center justify-center gap-1">
          <!-- Waveform Animation -->
          <div
            v-for="i in 12"
            :key="i"
            class="w-2 bg-primary-500 rounded-full animate-pulse"
            :style="{ height: Math.random() * 60 + 20 + 'px', animationDuration: Math.random() * 0.5 + 0.3 + 's' }"
          />
        </div>
        <p class="text-5xl font-mono font-bold text-gray-900 dark:text-white tracking-widest">
          {{ formattedTimer }}
        </p>
        <p class="text-gray-500">Listening...</p>
      </div>

      <!-- STATE: Processing -->
      <div v-else-if="state === 'processing'" class="text-center animate-fade-in">
        <NuxtIcon name="i-lucide-loader-2" class="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
        <p class="text-lg font-medium text-gray-600 dark:text-gray-300">Analyzing speech...</p>
      </div>

      <!-- STATE: Feedback -->
      <div v-else-if="state === 'feedback'" class="w-full max-w-md space-y-6 animate-fade-in">
        <!-- User's Speech -->
        <div class="text-center">
          <p class="text-sm text-gray-500 mb-2">You said:</p>
          <p class="text-xl font-medium text-gray-900 dark:text-white">"{{ interaction.userText }}"</p>
        </div>

        <!-- Overall Score -->
        <div class="flex justify-center">
          <div class="w-20 h-20 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg">
            <span class="text-2xl font-bold text-white">{{ overallScore }}%</span>
          </div>
        </div>

        <!-- Feedback Items -->
        <div class="space-y-3">
          <NuxtCard
            v-for="(fb, idx) in interaction.feedback"
            :key="idx"
            variant="outline"
            :ui="{ body: 'p-4' }"
          >
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                <NuxtIcon
                  :name="fb.type === 'Pronunciation' ? 'i-lucide-mic' : fb.type === 'Grammar' ? 'i-lucide-check' : 'i-lucide-zap'"
                  class="w-4 h-4 text-primary-600 dark:text-primary-400"
                />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                    {{ fb.type }}
                  </span>
                  <NuxtBadge
                    v-if="fb.score"
                    :color="fb.score >= 90 ? 'success' : fb.score >= 70 ? 'warning' : 'error'"
                    variant="subtle"
                    size="xs"
                  >
                    {{ fb.score }}%
                  </NuxtBadge>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">{{ fb.text }}</p>
              </div>
            </div>
          </NuxtCard>
        </div>

        <NuxtButton @click="nextTurn" block size="xl" color="primary" trailing-icon="i-lucide-arrow-right">
          Continue Conversation
        </NuxtButton>
      </div>

      <!-- STATE: Intro (Waiting for user) -->
      <div v-else class="text-center space-y-4 animate-fade-in">
        <p class="text-gray-500 text-lg">Your turn to speak</p>
        <NuxtCard variant="soft" :ui="{ body: 'p-4' }" class="inline-block">
          <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
            Hint: Answer the question or ask for details.
          </p>
        </NuxtCard>
      </div>
    </div>

    <!-- Bottom Control -->
    <div v-if="state === 'intro' || state === 'recording'" class="p-8 pb-12 flex justify-center">
      <button
        @click="toggleRecording"
        class="group relative flex items-center justify-center focus:outline-none"
      >
        <div
          class="absolute inset-0 rounded-full bg-primary-500 transition-all duration-300"
          :class="isRecording ? 'opacity-20 scale-150 animate-pulse' : 'opacity-0 scale-100'"
        />
        <div
          class="w-24 h-24 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-105"
          :class="isRecording ? 'bg-red-500 shadow-red-500/30' : 'bg-linear-to-br from-primary-500 to-indigo-600 shadow-primary-500/30'"
        >
          <NuxtIcon
            :name="isRecording ? 'i-lucide-square' : 'i-lucide-mic'"
            class="w-10 h-10 text-white transition-transform duration-300"
            :class="{ 'scale-110': isRecording }"
          />
        </div>

        <div v-if="!isRecording" class="absolute -bottom-10 text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Tap to speak
        </div>
      </button>
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
