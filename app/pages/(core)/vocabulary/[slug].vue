<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface VocabWord {
  id: number;
  word: string;
  phonetic: string;
  type: string;
  definition: string;
  context: string;
  example?: string;
  category?: string;
  mastery: number;
}

const route = useRoute();
const { getWordById, generateScenario } = useVocabulary();

// Fetch word data
const { data: word, pending, error } = await useAsyncData<VocabWord>(
  `vocab-${route.params.slug}`,
  () => getWordById(route.params.slug as string)
);

// Audio playback
const isPlaying = ref(false);

function playAudio() {
  if (!word.value) return;

  if ("speechSynthesis" in window) {
    isPlaying.value = true;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word.value.word);
    utterance.lang = "en-US";
    utterance.rate = 0.8;

    utterance.onend = () => {
      isPlaying.value = false;
    };

    const voices = synth.getVoices();
    const preferredVoice =
      voices.find((v) => v.name === "Daniel") ||
      voices.find((v) => v.name === "Google US English") ||
      voices.find((v) => v.lang === "en-US") ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    synth.speak(utterance);
    setTimeout(() => (isPlaying.value = false), 3000);
  }
}

// AI Scenario
const scenario = ref("");
const loadingScenario = ref(false);

async function startScenario() {
  if (!word.value) return;
  loadingScenario.value = true;
  try {
    const res = await generateScenario(word.value.word);
    scenario.value = res.scenario;
  } catch (e) {
    console.error(e);
    scenario.value = "Failed to generate scenario. Please try again.";
  } finally {
    loadingScenario.value = false;
  }
}

// Mastery level helper
function getMasteryLabel(level: number): string {
  if (level >= 3) return "Mastered";
  if (level >= 2) return "Familiar";
  if (level >= 1) return "Learning";
  return "New";
}

function getMasteryColor(level: number): string {
  if (level >= 3) return "success";
  if (level >= 2) return "warning";
  return "neutral";
}
</script>

<template>
  <!-- Loading State -->
  <div v-if="pending" class="flex flex-col items-center justify-center py-20 gap-4">
    <NuxtIcon name="i-lucide-loader-2" class="animate-spin w-10 h-10 text-primary-500" />
    <p class="text-gray-500">Loading word...</p>
  </div>

  <!-- Word Found -->
  <div v-else-if="word" class="max-w-4xl mx-auto space-y-8 animate-fade-in">
    <!-- Breadcrumb -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-sm">
        <NuxtButton
          to="/vocabulary/list"
          color="neutral"
          variant="ghost"
          size="sm"
          leading-icon="i-lucide-arrow-left"
        >
          Back to List
        </NuxtButton>
      </div>
      <div class="flex items-center gap-2">
        <NuxtBadge :color="getMasteryColor(word.mastery) as any" variant="subtle" size="sm">
          {{ getMasteryLabel(word.mastery) }}
        </NuxtBadge>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <!-- Main Word Card -->
      <div class="md:col-span-2 space-y-6">
        <NuxtCard variant="outline" :ui="{ body: 'p-8' }" class="relative overflow-hidden">
          <!-- Decorative Letter -->
          <div class="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <span class="text-[12rem] font-serif text-primary-500 select-none leading-none">
              {{ word.word.charAt(0).toUpperCase() }}
            </span>
          </div>

          <div class="relative z-10 space-y-6">
            <!-- Badges -->
            <div class="flex items-center gap-2 flex-wrap">
              <NuxtBadge color="primary" variant="subtle" size="sm" class="uppercase tracking-wider">
                {{ word.type }}
              </NuxtBadge>
              <NuxtBadge v-if="word.category" color="neutral" variant="outline" size="sm">
                {{ word.category }}
              </NuxtBadge>
            </div>

            <!-- Word & Audio -->
            <div class="flex items-end gap-4">
              <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                {{ word.word }}
              </h1>
              <div class="flex items-center gap-3 mb-2">
                <NuxtButton
                  color="neutral"
                  variant="soft"
                  :icon="isPlaying ? 'i-lucide-volume-2' : 'i-lucide-volume-1'"
                  :class="isPlaying ? 'animate-pulse' : ''"
                  @click="playAudio"
                />
                <span class="text-xl text-gray-400 font-mono">{{ word.phonetic }}</span>
              </div>
            </div>

            <!-- Definition -->
            <div>
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <NuxtIcon name="i-lucide-book-open" class="w-4 h-4" />
                Definition
              </h3>
              <p class="text-xl text-gray-900 dark:text-gray-100 font-medium leading-relaxed">
                {{ word.definition }}
              </p>
            </div>

            <NuxtDivider />

            <!-- Context -->
            <div>
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <NuxtIcon name="i-lucide-quote" class="w-4 h-4" />
                Contextual Usage
              </h3>
              <div class="bg-primary-50 dark:bg-primary-900/10 p-6 rounded-2xl border-l-4 border-primary-500">
                <p class="text-lg text-gray-900 dark:text-white font-serif italic" v-html="word.context" />
              </div>
            </div>

            <!-- Example -->
            <div v-if="word.example">
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <NuxtIcon name="i-lucide-message-circle" class="w-4 h-4" />
                Another Example
              </h3>
              <p class="text-gray-600 dark:text-gray-300">{{ word.example }}</p>
            </div>
          </div>
        </NuxtCard>

        <!-- AI Generated Scenario -->
        <NuxtCard
          v-if="scenario"
          variant="soft"
          :ui="{ body: 'p-6' }"
          class="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900 animate-fade-in"
        >
          <div class="flex items-start gap-3 mb-4">
            <div class="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
              <NuxtIcon name="i-lucide-sparkles" class="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 class="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              AI Generated Conversation
            </h3>
          </div>
          <pre class="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300 leading-relaxed">{{ scenario }}</pre>
        </NuxtCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Mastery Card -->
        <NuxtCard variant="outline" :ui="{ body: 'p-6' }">
          <div class="text-center space-y-4">
            <h3 class="text-sm font-semibold text-gray-500 uppercase">Current Mastery</h3>
            <div class="flex justify-center gap-2">
              <div
                v-for="i in 3"
                :key="i"
                class="w-4 h-12 rounded-full transition-all duration-500"
                :class="i <= word.mastery ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'"
              />
            </div>
            <NuxtBadge :color="getMasteryColor(word.mastery) as any" variant="subtle" size="md">
              Level {{ word.mastery }}/3 • {{ getMasteryLabel(word.mastery) }}
            </NuxtBadge>
            <NuxtButton block color="neutral" variant="soft" leading-icon="i-lucide-dumbbell">
              Practice This Word
            </NuxtButton>
          </div>
        </NuxtCard>

        <!-- AI Scenario CTA -->
        <div class="bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white text-center space-y-4 shadow-lg">
          <NuxtIcon name="i-lucide-sparkles" class="w-10 h-10 mx-auto opacity-80" />
          <div>
            <h3 class="font-bold text-lg">AI Scenario</h3>
            <p class="text-white/80 text-sm">Generate a conversation using this word.</p>
          </div>
          <NuxtButton
            :loading="loadingScenario"
            color="white"
            variant="solid"
            block
            class="text-indigo-600"
            @click="startScenario"
          >
            {{ loadingScenario ? "Generating..." : "Start Scenario" }}
          </NuxtButton>
        </div>

        <!-- Related Actions -->
        <NuxtCard variant="soft" :ui="{ body: 'p-4' }">
          <div class="space-y-2">
            <NuxtButton to="/vocabulary" color="neutral" variant="ghost" block leading-icon="i-lucide-layers" class="justify-start">
              Daily Words
            </NuxtButton>
            <NuxtButton to="/vocabulary/list" color="neutral" variant="ghost" block leading-icon="i-lucide-list" class="justify-start">
              Full List
            </NuxtButton>
          </div>
        </NuxtCard>
      </div>
    </div>
  </div>

  <!-- Word Not Found -->
  <div v-else class="flex flex-col items-center justify-center h-96 text-center space-y-4">
    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
      <NuxtIcon name="i-lucide-search-x" class="w-8 h-8 text-gray-400" />
    </div>
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Word not found</h3>
    <p class="text-gray-500">The word you're looking for doesn't exist in your vocabulary.</p>
    <NuxtButton to="/vocabulary/list" color="primary" variant="soft" leading-icon="i-lucide-arrow-left">
      Return to list
    </NuxtButton>
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
