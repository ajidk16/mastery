<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const vocabList = [
  { 
      word: 'Serendipity', 
      phonetic: '/ˌser.ənˈdɪp.ə.ti/',
      type: 'noun',
      definition: 'The fact of finding interesting or valuable things by chance.', 
      context: 'Meeting my best friend at the airport was pure <span class="text-primary-600 font-bold">serendipity</span>.', 
      mastery: 2, // 1-3
      isPlaying: false
  },
  { 
      word: 'Ephemeral', 
       phonetic: '/ɪˈfem.ər.əl/',
      type: 'adjective',
      definition: 'Lasting for a very short time.', 
      context: 'Fashion trends are often <span class="text-primary-600 font-bold">ephemeral</span>.', 
      mastery: 1, 
      isPlaying: false
  },
   { 
      word: 'Resilient', 
      phonetic: '/rɪˈzɪl.jənt/',
      type: 'adjective',
      definition: 'Able to withstand or recover quickly from difficult conditions.', 
      context: 'She is remarkably <span class="text-primary-600 font-bold">resilient</span> despite the setbacks.', 
      mastery: 3, 
      isPlaying: false
  }
]

// State to track current card index
const activeIndex = ref(0)
const isFlipped = ref(false)

const currentCard = computed(() => vocabList[activeIndex.value])

function nextCard() {
    isFlipped.value = false
    setTimeout(() => {
        activeIndex.value = (activeIndex.value + 1) % vocabList.length
    }, 300)
}

function playAudio() {
    currentCard.value.isPlaying = true
    setTimeout(() => {
        currentCard.value.isPlaying = false
    }, 1500)
}
</script>

<template>
  <div class="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
     <!-- Header -->
     <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Daily Words</h1>
        <p class="text-gray-500 dark:text-gray-400">Contextual Learning Mode</p>
      </div>
       <div class="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          {{ activeIndex + 1 }} / {{ vocabList.length }}
       </div>
    </div>

    <!-- Main Card Area -->
    <div class="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full perspective">
        <div 
           class="relative w-full aspect-[4/5] md:aspect-[4/3] transition-transform duration-700 transform-style-3d cursor-pointer"
           :class="{'rotate-y-180': isFlipped}"
           @click="isFlipped = !isFlipped"
        >
             <!-- Front: Meaning & Context -->
             <div class="absolute inset-0 backface-hidden glass-card rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between border-b-8 border-gray-200 dark:border-gray-800 shadow-xl">
                 <div class="flex items-center justify-between">
                     <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest border border-primary-100 dark:border-primary-900/30">
                        {{ currentCard.type }}
                     </span>
                     <button @click.stop="playAudio" class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors z-10">
                        <NuxtIcon :name="currentCard.isPlaying ? 'i-lucide-volume-2' : 'i-lucide-volume-1'" class="w-5 h-5" />
                     </button>
                 </div>

                 <div class="space-y-6 text-center">
                      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">{{ currentCard.word }}</h2>
                      <p class="text-gray-400 font-mono text-lg">{{ currentCard.phonetic }}</p>
                 </div>

                 <div class="text-center">
                    <p class="text-gray-400 text-sm font-medium mb-2">Tap to see usage</p>
                    <div class="w-8 h-1 bg-gray-200 dark:bg-gray-700/50 rounded-full mx-auto" />
                 </div>
             </div>

             <!-- Back: Context & Mastery (The "Learning" Side) -->
             <div class="absolute inset-0 backface-hidden rotate-y-180 glass-card rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl overflow-y-auto">
                 <div>
                     <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Meaning</h3>
                     <p class="text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-8">
                        {{ currentCard.definition }}
                     </p>
                     
                     <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Context</h3>
                     <div class="p-6 rounded-2xl bg-primary-50 dark:bg-primary-900/10 border-l-4 border-primary-500">
                         <p class="text-xl md:text-2xl text-gray-900 dark:text-white font-serif leading-relaxed" v-html="currentCard.context"></p>
                     </div>
                 </div>

                 <div class="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                     <div class="flex flex-col">
                        <span class="text-xs font-bold text-gray-400 uppercase mb-1">Mastery</span>
                        <div class="flex gap-1">
                           <div v-for="i in 3" :key="i" class="w-6 h-2 rounded-full" :class="i <= currentCard.mastery ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'" />
                        </div>
                     </div>
                     
                     <NuxtButton @click.stop="nextCard" size="lg" class="gradient-primary px-6 rounded-full shadow-lg shadow-primary-500/20">
                        Next Word
                     </NuxtButton>
                 </div>
             </div>
        </div>
    </div>
    
    <!-- Review CTA -->
    <div class="text-center pb-4 animate-slide-up">
        <button class="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors underline decoration-dotted underline-offset-4">
            View full vocabulary list
        </button>
    </div>
  </div>
</template>

<style scoped>
.perspective { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
</style>
