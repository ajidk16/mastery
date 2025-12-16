<script setup lang="ts">
definePageMeta({
  layout: 'default' 
})

const step = ref(1)
const totalSteps = 5
const progress = computed(() => (step.value / totalSteps) * 100)
const isRecording = ref(false)
const isAudioPlaying = ref(false)
const writingText = ref('')

function nextStep() {
  if (step.value < totalSteps) step.value++
}

function toggleAudio() {
  isAudioPlaying.value = !isAudioPlaying.value
  // Simulate playback finish
  if(isAudioPlaying.value) {
    setTimeout(() => {
        isAudioPlaying.value = false
    }, 3000)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <div class="max-w-xl w-full space-y-8">
          <!-- Progress -->
          <div class="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
             <div class="bg-primary-500 h-2 rounded-full transition-all duration-500" :style="{ width: `${progress}%` }" />
          </div>

          <!-- Step 1: Instruction (Singkat & Welcoming) -->
          <div v-if="step === 1" class="space-y-6 text-center animate-slide-up">
              <div class="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-6">
                 <NuxtIcon name="i-lucide-award" class="w-10 h-10 text-primary-600 dark:text-primary-400" />
              </div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Let's find your starting point</h1>
              <p class="text-lg text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
                 No grades, no pressure. Just a quick check to personalize your experience.
              </p>
              
              <div class="pt-4">
                 <NuxtButton @click="nextStep" size="xl" class="gradient-primary px-10">
                    <span class="flex items-center gap-2">
                       Start Assessment
                       <NuxtIcon name="i-lucide-arrow-right" class="w-5 h-5" />
                    </span>
                 </NuxtButton>
                 <p class="text-sm text-gray-400 mt-4">Takes about 2 minutes</p>
              </div>
          </div>

          <!-- Step 2: Listening Task -->
          <div v-if="step === 2" class="space-y-6 animate-slide-up">
              <div class="text-center space-y-2">
                 <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Listening Check</h2>
                 <p class="text-gray-500">Listen to the clip and choose the best response.</p>
              </div>

              <!-- Audio Player UI -->
              <div class="glass-card p-6 rounded-2xl flex items-center gap-4">
                 <button 
                   @click="toggleAudio"
                   class="w-12 h-12 rounded-full bg-secondary-500 flex items-center justify-center text-white hover:bg-secondary-600 transition-colors shadow-lg shadow-secondary-500/30"
                 >
                    <NuxtIcon :name="isAudioPlaying ? 'i-lucide-pause' : 'i-lucide-play'" class="w-6 h-6 fill-current" />
                 </button>
                 <div class="flex-1">
                    <div class="h-10 flex items-center gap-1">
                       <span v-for="i in 20" :key="i" class="w-1 bg-gray-200 dark:bg-gray-700 rounded-full" :class="{'bg-secondary-500 animate-pulse': isAudioPlaying}" :style="{height: Math.random() * 24 + 8 + 'px'}" />
                    </div>
                 </div>
              </div>

              <!-- Options -->
              <div class="grid gap-3">
                 <button @click="nextStep" class="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all font-medium text-left">
                    "I am going to the library."
                 </button>
                 <button @click="nextStep" class="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all font-medium text-left">
                    "Yes, I have it."
                 </button>
                 <button @click="nextStep" class="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all font-medium text-left">
                     "It's 10 o'clock."
                 </button>
              </div>
          </div>

           <!-- Step 3: Speaking Task (Mic-based) -->
          <div v-if="step === 3" class="space-y-8 text-center animate-slide-up">
              <div class="space-y-2">
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Speaking Check</h2>
                  <p class="text-gray-500">Read this sentence clearly:</p>
              </div>
              
              <div class="glass-card p-8 rounded-3xl relative overflow-hidden">
                  <p class="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                     "I would like to order a coffee with no sugar, please."
                  </p>
              </div>

              <div class="flex justify-center flex-col items-center gap-4">
                  <button 
                    @click="isRecording = !isRecording"
                    class="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 border-4"
                    :class="isRecording ? 'border-red-100 bg-red-500 shadow-xl shadow-red-500/30 scale-105' : 'border-primary-100 bg-primary-500 shadow-xl shadow-primary-500/30 hover:scale-105'"
                   >
                     <NuxtIcon :name="isRecording ? 'i-lucide-square' : 'i-lucide-mic'" class="w-10 h-10 text-white" />
                  </button>
                   <p v-if="isRecording" class="text-red-500 font-medium animate-pulse">Listening...</p>
                   <p v-else class="text-gray-400 text-sm">Tap to record</p>
              </div>
              
              <div v-if="!isRecording" class="pt-2">
                   <NuxtButton v-if="true" @click="nextStep" variant="ghost" class="text-gray-500">Skip</NuxtButton>
                   <!-- In real app, this appears after recording -->
                   <NuxtButton @click="nextStep" class="ml-2">Next</NuxtButton>
              </div>
          </div>

          <!-- Step 4: Writing Mini Task -->
          <div v-if="step === 4" class="space-y-6 animate-slide-up">
              <div class="text-center space-y-2">
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Quick Writing</h2>
                  <p class="text-gray-500">Complete the sentence below:</p>
              </div>

              <div class="glass-card p-6 rounded-2xl space-y-4">
                  <p class="text-lg text-gray-700 dark:text-gray-300 font-medium">
                      "If I could travel anywhere, I would go to..."
                  </p>
                  <textarea 
                    v-model="writingText"
                    class="w-full h-32 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-hidden transition-all resize-none"
                    placeholder="Type your answer here..."
                  ></textarea>
              </div>

              <NuxtButton @click="nextStep" block size="xl" class="gradient-primary" :disabled="writingText.length < 5">
                  Finish Assessment
              </NuxtButton>
          </div>

          <!-- Step 5: Result Summary (No Raw Scores) -->
           <div v-if="step === 5" class="space-y-8 text-center animate-slide-up">
              <div class="relative inline-block">
                  <div class="absolute inset-0 bg-primary-500 blur-2xl opacity-20" />
                  <div class="relative w-32 h-32 rounded-full gradient-primary mx-auto flex flex-col items-center justify-center border-4 border-white dark:border-gray-900 shadow-xl">
                      <span class="text-3xl font-bold text-white">B1</span>
                      <span class="text-[10px] text-white/80 uppercase tracking-widest font-bold">Level</span>
                  </div>
              </div>
              
              <div class="space-y-2">
                 <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Intermediate</h1>
                 <p class="text-gray-500 text-lg">You can handle most travel and lifestyle situations.</p>
              </div>
              
              <!-- Recommendation Card -->
              <div class="glass-card p-6 rounded-2xl text-left bg-primary-50/50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-800">
                  <h3 class="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <NuxtIcon name="i-lucide-sparkles" class="w-5 h-5 text-primary-500" />
                      Our Recommendation
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      Focus on <span class="font-bold text-primary-600 dark:text-primary-400">conversational fluency</span>. You have the vocabulary, now let's build the confidence to use it spontaneously.
                  </p>

                   <div class="flex flex-wrap gap-2">
                      <span class="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Daily Conversation</span>
                      <span class="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Roleplay</span>
                   </div>
              </div>
              
              <NuxtLink to="/dashboard">
                  <NuxtButton size="xl" class="gradient-primary px-12 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all">
                      Start Your Journey
                  </NuxtButton>
              </NuxtLink>
           </div>
      </div>
  </div>
</template>
