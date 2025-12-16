<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface VocabCard {
  id: number;
  word: string;
  phonetic: string;
  type: string;
  definition: string;
  context: string;
  mastery: number;
  isPlaying?: boolean;
}

const { vocabList: allVocab } = useVocabulary();

// Daily deck (first 3 words)
const vocabList = computed<VocabCard[]>(() => (allVocab.value || []).slice(0, 3));

// State
const activeIndex = ref(0);
const isFlipped = ref(false);

const currentCard = computed(() => vocabList.value[activeIndex.value]);

// Navigation
function nextCard() {
  isFlipped.value = false;
  setTimeout(() => {
    activeIndex.value = (activeIndex.value + 1) % vocabList.value.length;
  }, 300);
}

function prevCard() {
  isFlipped.value = false;
  setTimeout(() => {
    activeIndex.value = activeIndex.value === 0 
      ? vocabList.value.length - 1 
      : activeIndex.value - 1;
  }, 300);
}

// Text-to-Speech
function playAudio() {
  if (!currentCard.value) return;

  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(currentCard.value.word);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    utterance.pitch = 1;

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
  }
}
</script>

<template>
  <div class="space-y-6 h-[calc(100vh-10rem)] flex flex-col animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Daily Words
        </h1>
        <p class="text-gray-500 dark:text-gray-400">Contextual Learning Mode</p>
      </div>
      <div class="flex items-center gap-3">
        <NuxtBadge color="primary" variant="subtle" size="md">
          {{ activeIndex + 1 }} / {{ vocabList.length }}
        </NuxtBadge>
        <NuxtButton
          to="/vocabulary/list"
          color="neutral"
          variant="ghost"
          icon="i-lucide-list"
          class="hidden sm:flex"
        >
          View All
        </NuxtButton>
      </div>
    </div>

    <!-- Card Navigation (Desktop) -->
    <div class="hidden md:flex items-center justify-center gap-2">
      <NuxtButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-chevron-left"
        :disabled="vocabList.length <= 1"
        @click="prevCard"
      />
      <div class="flex gap-2">
        <button
          v-for="(_, idx) in vocabList"
          :key="idx"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="idx === activeIndex ? 'bg-primary-500 scale-125' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'"
          @click="activeIndex = idx; isFlipped = false"
        />
      </div>
      <NuxtButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-chevron-right"
        :disabled="vocabList.length <= 1"
        @click="nextCard"
      />
    </div>

    <!-- Main Card Area -->
    <div class="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full perspective">
      <div
        class="relative w-full aspect-[4/5] md:aspect-[4/3] transition-transform duration-700 transform-style-3d cursor-pointer"
        :class="{ 'rotate-y-180': isFlipped }"
        @click="isFlipped = !isFlipped"
      >
        <!-- Front: Word & Phonetic -->
        <div
          class="absolute inset-0 backface-hidden glass-card rounded-3xl p-8 md:p-12 flex flex-col justify-between border-b-4 border-primary-200 dark:border-primary-900 shadow-xl overflow-hidden"
        >
          <!-- Decorative -->
          <div class="absolute top-0 right-0 w-48 h-48 bg-primary-500/5 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />

          <!-- Header -->
          <div class="flex items-center justify-between relative z-10">
            <NuxtBadge color="primary" variant="subtle" size="sm" class="uppercase tracking-wider">
              {{ currentCard?.type }}
            </NuxtBadge>
            <NuxtButton
              color="neutral"
              variant="ghost"
              :icon="'i-lucide-volume-2'"
              @click.stop="playAudio"
            />
          </div>

          <!-- Main Word -->
          <div class="text-center space-y-4 relative z-10">
            <h2 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
              {{ currentCard?.word }}
            </h2>
            <p class="text-gray-400 font-mono text-lg md:text-xl">
              {{ currentCard?.phonetic }}
            </p>
          </div>

          <!-- Footer -->
          <div class="text-center relative z-10">
            <p class="text-gray-400 text-sm font-medium mb-2 flex items-center justify-center gap-2">
              <NuxtIcon name="i-lucide-rotate-3d" class="w-4 h-4" />
              Tap to see definition
            </p>
            <div class="w-12 h-1 bg-gray-200 dark:bg-gray-700/50 rounded-full mx-auto" />
          </div>
        </div>

        <!-- Back: Definition & Context -->
        <div
          class="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-3xl p-8 md:p-10 flex flex-col justify-between bg-white dark:bg-gray-900 shadow-xl overflow-y-auto"
        >
          <div class="space-y-6">
            <!-- Definition -->
            <div>
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <NuxtIcon name="i-lucide-book-open" class="w-4 h-4" />
                Definition
              </h3>
              <p class="text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                {{ currentCard?.definition }}
              </p>
            </div>

            <!-- Context -->
            <div>
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <NuxtIcon name="i-lucide-quote" class="w-4 h-4" />
                In Context
              </h3>
              <NuxtCard variant="soft" class="border-l-4 border-primary-500">
                <p
                  class="text-lg md:text-xl text-gray-900 dark:text-white font-serif italic leading-relaxed"
                  v-html="currentCard?.context"
                />
              </NuxtCard>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-xs font-bold text-gray-400 uppercase mb-1">Mastery</span>
              <div class="flex gap-1">
                <div
                  v-for="i in 3"
                  :key="i"
                  class="w-6 h-2 rounded-full transition-colors"
                  :class="i <= Number(currentCard?.mastery) ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'"
                />
              </div>
            </div>

            <NuxtButton
              @click.stop="nextCard"
              color="primary"
              size="lg"
              trailing-icon="i-lucide-arrow-right"
            >
              Next Word
            </NuxtButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="text-center pb-4">
      <NuxtLink
        to="/vocabulary/list"
        class="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors"
      >
        <NuxtIcon name="i-lucide-list" class="w-4 h-4" />
        View full vocabulary list
        <NuxtIcon name="i-lucide-arrow-right" class="w-3 h-3" />
      </NuxtLink>
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

.perspective {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
