<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const prompt = "Describe your ideal vacation destination."
const userText = ref('')
const isSubmitting = ref(false)
const showResult = ref(false)

const feedback = {
  original: "I want go to Japan because I like anime and food.",
  corrected: "I want <span class='text-green-500 font-bold'>to</span> go to Japan because I like anime and <span class='text-green-500 font-bold'>the</span> food.",
  explanation: "Don't forget the particle 'to' after 'want', and use 'the' when referring to specific food culture implies."
}

function submitWriting() {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    showResult.value = true
  }, 2000)
}
</script>

<template>
  <div class="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Writing Lab</h1>
      <p class="text-gray-500 dark:text-gray-400">Refine your grammar and style</p>
    </div>

    <div class="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        <!-- Prompt & Input -->
        <div class="glass-card p-6 rounded-3xl flex-1 flex flex-col gap-4">
             <div class="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl">
                 <h3 class="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-1">Topic</h3>
                 <p class="text-lg font-medium text-primary-700 dark:text-primary-300">"{{ prompt }}"</p>
             </div>

             <textarea 
               v-model="userText"
               class="flex-1 w-full bg-transparent resize-none focus:outline-hidden text-lg leading-relaxed text-gray-800 dark:text-gray-200 placeholder-gray-400"
               placeholder="Start typing here..."
               :disabled="showResult"
             ></textarea>
             
             <div class="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                 <span class="text-sm text-gray-400">{{ userText.length }} chars</span>
                 <NuxtButton 
                    v-if="!showResult"
                    @click="submitWriting" 
                    class="gradient-primary"
                    :loading="isSubmitting"
                    :disabled="!userText"
                 >
                    Check Grammar
                 </NuxtButton>
                 <NuxtButton 
                    v-else
                    @click="showResult = false" 
                    variant="ghost" 
                 >
                    Try Again
                 </NuxtButton>
             </div>
        </div>

        <!-- Feedback Pane -->
        <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-x-10"
            enter-to-class="opacity-100 translate-x-0"
        >
            <div v-if="showResult" class="glass-card p-6 rounded-3xl flex-1 border-green-200 dark:border-green-900 overflow-y-auto">
                 <h3 class="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <NuxtIcon name="i-lucide-wand-2" class="w-5 h-5 text-green-500" />
                    AI Feedback
                 </h3>

                 <div class="space-y-6">
                     <div>
                        <p class="text-sm text-gray-500 mb-2">Correction</p>
                        <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                            <!-- In real app, render diff text safely -->
                            <div v-html="feedback.corrected"></div>
                        </div>
                     </div>

                     <div>
                        <p class="text-sm text-gray-500 mb-2">Explanation</p>
                        <div class="flex gap-3">
                             <div class="w-1 bg-green-500 rounded-full" />
                             <p class="text-gray-600 dark:text-gray-300">{{ feedback.explanation }}</p>
                        </div>
                     </div>
                     
                     <div class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
                         <div>
                             <p class="text-sm text-gray-500">Grammar Score</p>
                             <p class="text-2xl font-bold text-gray-900 dark:text-white">8.5<span class="text-sm font-normal text-gray-400">/10</span></p>
                         </div>
                          <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                              <NuxtIcon name="i-lucide-check" class="w-6 h-6 text-green-500" />
                          </div>
                     </div>
                 </div>
            </div>
        </Transition>
    </div>
  </div>
</template>
