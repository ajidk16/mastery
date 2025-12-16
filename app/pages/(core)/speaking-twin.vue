<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  timestamp: string;
  pronunciation?: { word: string; score: number }[];
}

interface TwinPersonality {
  id: string;
  name: string;
  avatar: string;
  description: string;
  accent: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

// Available AI Twins
const twins: TwinPersonality[] = [
  {
    id: "sarah",
    name: "Sarah",
    avatar: "👩‍💼",
    description: "Friendly business professional from New York",
    accent: "American",
    difficulty: "Easy",
  },
  {
    id: "james",
    name: "James",
    avatar: "👨‍🎓",
    description: "Patient university professor from London",
    accent: "British",
    difficulty: "Medium",
  },
  {
    id: "emma",
    name: "Emma",
    avatar: "👩‍⚕️",
    description: "Energetic travel blogger from Sydney",
    accent: "Australian",
    difficulty: "Medium",
  },
  {
    id: "alex",
    name: "Alex",
    avatar: "🧑‍💻",
    description: "Tech entrepreneur who speaks fast",
    accent: "American",
    difficulty: "Hard",
  },
];

// State
const selectedTwin = ref<TwinPersonality | null>(null);
const isRecording = ref(false);
const isProcessing = ref(false);
const isAiSpeaking = ref(false);
const userInput = ref("");

const conversation: Ref<Message[]> = ref([]);

const difficultyColors: Record<string, string> = {
  Easy: "success",
  Medium: "warning",
  Hard: "error",
};

// Select a twin to chat with
function selectTwin(twin: TwinPersonality) {
  selectedTwin.value = twin;
  conversation.value = [
    {
      id: 1,
      role: "ai",
      content: `Hi there! I'm ${twin.name}. ${twin.description}. Ready to practice your English with me?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ];
}

function exitChat() {
  selectedTwin.value = null;
  conversation.value = [];
}

// Simulate recording
function toggleRecording() {
  if (isRecording.value) {
    stopRecording();
  } else {
    startRecording();
  }
}

function startRecording() {
  isRecording.value = true;
}

function stopRecording() {
  isRecording.value = false;
  isProcessing.value = true;

  // Simulate processing
  setTimeout(() => {
    isProcessing.value = false;
    addUserMessage("How has your day been so far?");
    simulateAiResponse();
  }, 1500);
}

function addUserMessage(text: string) {
  conversation.value.push({
    id: conversation.value.length + 1,
    role: "user",
    content: text,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    pronunciation: [
      { word: "day", score: 95 },
      { word: "been", score: 88 },
    ],
  });
}

function simulateAiResponse() {
  isAiSpeaking.value = true;
  setTimeout(() => {
    conversation.value.push({
      id: conversation.value.length + 1,
      role: "ai",
      content: "It's been great, thank you for asking! I've been reading about sustainable travel. Do you enjoy traveling?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    isAiSpeaking.value = false;
  }, 2000);
}

function sendTextMessage() {
  if (!userInput.value.trim()) return;
  addUserMessage(userInput.value);
  userInput.value = "";
  simulateAiResponse();
}
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
    <!-- Twin Selection View -->
    <template v-if="!selectedTwin">
      <div class="space-y-8">
        <!-- Header -->
        <div class="space-y-1">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            AI Speaking Twin
          </h1>
          <p class="text-gray-500 dark:text-gray-400">
            Choose a conversation partner and practice speaking naturally
          </p>
        </div>

        <!-- How It Works -->
        <div class="glass-card p-6 rounded-2xl">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <NuxtIcon name="i-lucide-sparkles" class="w-5 h-5 text-primary-500" />
            How It Works
          </h3>
          <div class="grid sm:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-3">
                <span class="text-xl">1️⃣</span>
              </div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">Choose a Twin</h4>
              <p class="text-sm text-gray-500">Select an AI personality that matches your learning style.</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-3">
                <span class="text-xl">2️⃣</span>
              </div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">Have a Conversation</h4>
              <p class="text-sm text-gray-500">Speak naturally. The AI responds in real-time.</p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-3">
                <span class="text-xl">3️⃣</span>
              </div>
              <h4 class="font-medium text-gray-900 dark:text-white mb-1">Get Feedback</h4>
              <p class="text-sm text-gray-500">Receive instant pronunciation and grammar tips.</p>
            </div>
          </div>
        </div>

        <!-- Twin Selection Grid -->
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Your Twin</h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="twin in twins"
              :key="twin.id"
              class="group glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary-500/30"
              @click="selectTwin(twin)"
            >
              <div class="flex items-start gap-4">
                <div class="text-5xl">{{ twin.avatar }}</div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {{ twin.name }}
                    </h3>
                    <NuxtBadge :color="difficultyColors[twin.difficulty] as any" variant="subtle" size="xs">
                      {{ twin.difficulty }}
                    </NuxtBadge>
                  </div>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ twin.description }}</p>
                  <div class="flex items-center gap-1 text-xs text-gray-400">
                    <NuxtIcon name="i-lucide-volume-2" class="w-3 h-3" />
                    {{ twin.accent }} Accent
                  </div>
                </div>
                <div class="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors">
                  <NuxtIcon name="i-lucide-arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Chat Interface -->
    <template v-else>
      <!-- Chat Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <NuxtButton color="neutral" variant="ghost" icon="i-lucide-arrow-left" size="sm" @click="exitChat" />
          <div class="text-3xl">{{ selectedTwin.avatar }}</div>
          <div>
            <h2 class="font-bold text-gray-900 dark:text-white">{{ selectedTwin.name }}</h2>
            <p class="text-xs text-green-500 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {{ isAiSpeaking ? 'Speaking...' : 'Online' }}
            </p>
          </div>
        </div>
        <NuxtBadge :color="difficultyColors[selectedTwin.difficulty] as any" variant="subtle" size="sm">
          {{ selectedTwin.accent }}
        </NuxtBadge>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-for="msg in conversation"
          :key="msg.id"
          class="flex"
          :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[80%] p-4 rounded-2xl"
            :class="msg.role === 'user' ? 'bg-primary-500 text-white rounded-br-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm'"
          >
            <p>{{ msg.content }}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs opacity-70">{{ msg.timestamp }}</span>
              <!-- Pronunciation feedback for user messages -->
              <div v-if="msg.role === 'user' && msg.pronunciation" class="flex gap-1">
                <NuxtBadge
                  v-for="p in msg.pronunciation"
                  :key="p.word"
                  :color="p.score >= 90 ? 'success' : p.score >= 70 ? 'warning' : 'error'"
                  variant="solid"
                  size="xs"
                >
                  {{ p.word }}: {{ p.score }}%
                </NuxtBadge>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Speaking Indicator -->
        <div v-if="isAiSpeaking" class="flex justify-start">
          <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl rounded-bl-sm">
            <div class="flex gap-1">
              <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0ms" />
              <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 150ms" />
              <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 300ms" />
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 border-t border-gray-100 dark:border-gray-800">
        <div class="flex items-center gap-3">
          <NuxtInput
            v-model="userInput"
            placeholder="Type your message..."
            class="flex-1"
            @keyup.enter="sendTextMessage"
          />
          <NuxtButton
            color="neutral"
            variant="outline"
            icon="i-lucide-send"
            :disabled="!userInput.trim()"
            @click="sendTextMessage"
          />
          <NuxtButton
            :color="isRecording ? 'error' : 'primary'"
            :icon="isRecording ? 'i-lucide-square' : 'i-lucide-mic'"
            :loading="isProcessing"
            @click="toggleRecording"
          >
            {{ isRecording ? 'Stop' : 'Speak' }}
          </NuxtButton>
        </div>
        <p class="text-xs text-gray-400 text-center mt-2">
          Tap "Speak" to record your voice or type a message
        </p>
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
