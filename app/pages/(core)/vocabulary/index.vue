<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const vocabList = [
  { word: 'Ubiquitous', definition: 'Present, appearing, or found everywhere.', example: 'Smartphones are ubiquitous nowadays.', flipped: false },
  { word: 'Ephemeral', definition: 'Lasting for a very short time.', example: 'Fashions are ephemeral, changing with every season.', flipped: false },
  { word: 'Serendipity', definition: 'The occurrence of events by chance in a happy or beneficial way.', example: 'Meeting my old friend was pure serendipity.', flipped: false },
]

function toggleCard(index: number) {
  vocabList[index].flipped = !vocabList[index].flipped
}
</script>

<template>
  <div class="space-y-8">
     <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Vocabulary Deck</h1>
        <p class="text-gray-500 dark:text-gray-400">Master 3 new words today</p>
      </div>
      <NuxtButton variant="ghost" icon="i-lucide-plus">Add Word</NuxtButton>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
           v-for="(card, index) in vocabList"
           :key="card.word"
           class="h-64 perspective cursor-pointer group"
           @click="toggleCard(index)"
        >
            <div 
               class="relative w-full h-full text-center transition-transform duration-700 transform-style-3d"
               :class="{'rotate-y-180': card.flipped}"
            >
                <!-- Front -->
                <div class="absolute inset-0 backface-hidden glass-card rounded-3xl flex flex-col items-center justify-center p-6 border-b-4 border-b-gray-200 dark:border-b-gray-800 active:border-b-0 active:translate-y-1 transition-all">
                     <span class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Word</span>
                     <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{{ card.word }}</h3>
                     <p class="text-primary-600 font-medium text-sm">Tap to reveal</p>
                </div>

                <!-- Back -->
                <div class="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-3xl flex flex-col items-center justify-center p-6 bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-900/30">
                     <h3 class="text-xl font-bold text-primary-700 dark:text-primary-300 mb-2">{{ card.word }}</h3>
                     <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">{{ card.definition }}</p>
                     <p class="text-xs text-gray-500 italic">"{{ card.example }}"</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
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
