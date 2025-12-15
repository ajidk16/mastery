<script setup lang="ts">
definePageMeta({
  layout: 'default' // Or dashboard, but usually assessment is standalone
})

const step = ref(1)
const totalSteps = 4
const progress = computed(() => (step.value / totalSteps) * 100)
const isRecording = ref(false)

function nextStep() {
  if (step.value < totalSteps) step.value++
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <div class="max-w-xl w-full space-y-8">
          <!-- Progress -->
          <div class="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
             <div class="bg-primary-500 h-2 rounded-full transition-all duration-500" :style="{ width: `${progress}%` }" />
          </div>

          <!-- Step 1: Goals -->
          <div v-if="step === 1" class="space-y-6 text-center animate-slide-up">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Why do you want to learn English?</h1>
              <div class="grid gap-4">
                  <button @click="nextStep" class="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all font-medium text-left">
                      Career advancement
                  </button>
                  <button @click="nextStep" class="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all font-medium text-left">
                      Travel & Culture
                  </button>
                  <button @click="nextStep" class="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all font-medium text-left">
                      Personal Growth
                  </button>
              </div>
          </div>

          <!-- Step 2: Self Assessment -->
          <div v-if="step === 2" class="space-y-6 text-center animate-slide-up">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">How confident are you?</h1>
              <div class="space-y-4">
                  <input type="range" min="0" max="100" class="w-full accent-primary-500" />
                  <p class="text-gray-500">I can introduce myself but struggle with complex topics</p>
              </div>
              <NuxtButton @click="nextStep" size="lg" class="gradient-primary">Next</NuxtButton>
          </div>

           <!-- Step 3: Speaking Test -->
          <div v-if="step === 3" class="space-y-6 text-center animate-slide-up">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Let's hear your voice</h1>
              <p class="text-gray-500">Read this sentence aloud:</p>
              
              <div class="glass-card p-6 rounded-2xl">
                  <p class="text-lg font-medium text-gray-800 dark:text-gray-200">"The quick brown fox jumps over the lazy dog."</p>
              </div>

              <div class="flex justify-center">
                  <button 
                    @click="isRecording = !isRecording"
                    class="w-20 h-20 rounded-full flex items-center justify-center transition-all"
                    :class="isRecording ? 'bg-red-500 scale-110 shadow-lg shadow-red-500/40' : 'bg-primary-500 shadow-lg shadow-primary-500/40'"
                   >
                     <NuxtIcon :name="isRecording ? 'i-lucide-square' : 'i-lucide-mic'" class="w-8 h-8 text-white" />
                  </button>
              </div>
              
              <div v-if="!isRecording" class="pt-4">
                  <NuxtButton @click="nextStep" variant="ghost">Skip for now</NuxtButton>
                   <NuxtButton v-if="true" @click="nextStep" class="ml-2">Analyze Result</NuxtButton>
              </div>
          </div>

          <!-- Step 4: Result -->
           <div v-if="step === 4" class="space-y-6 text-center animate-slide-up">
              <div class="w-24 h-24 rounded-full gradient-primary mx-auto flex items-center justify-center">
                  <span class="text-4xl font-bold text-white">B1</span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Your Starting Level: Intermediate</h1>
              <p class="text-gray-500">You have a solid foundation! We'll focus on fluency and vocabulary.</p>
              
              <NuxtLink to="/dashboard">
                  <NuxtButton size="xl" class="gradient-primary px-8">Start Learning</NuxtButton>
              </NuxtLink>
           </div>
      </div>
  </div>
</template>
