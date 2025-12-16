<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const prompt = "Describe your ideal vacation destination."
const userText = ref('')
const isSubmitting = ref(false)
const showResult = ref(false)
const feedbackLevel = ref<'summary' | 'detailed'>('summary')

const rewriteSuggestion = "I would love to visit Japan because I have a strong interest in anime culture and enjoy Japanese cuisine."

const feedback = {
  original: "I want go to Japan because I like anime and food.",
  // Soft highlight using yellow/orange instead of red/green
  corrected: "I want <span class='bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded mx-0.5 border-b-2 border-yellow-400'>to</span> go to Japan because I like anime and <span class='bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded mx-0.5 border-b-2 border-yellow-400'>the</span> food.",
  tips: [
      { type: 'Grammar', text: "Use 'to' after 'want' (want to go)" },
      { type: 'Style', text: "Be specific: 'the food' sounds more natural here." }
  ]
}

function submitWriting() {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    showResult.value = true
  }, 1500)
}
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col relative">
    
    <!-- Header (fades out when writing starts) -->
    <Transition leave-active-class="duration-500 ease-in" leave-to-class="opacity-0 -translate-y-4">
        <div v-if="!userText && !showResult" class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Writing Focus</h1>
            <p class="text-gray-500 dark:text-gray-400">Express yourself freely. We'll help with the polish later.</p>
        </div>
    </Transition>

    <div class="flex-1 flex gap-8 min-h-0 relative">
        <!-- Main Editor Area -->
        <div 
            class="flex-1 flex flex-col transition-all duration-700 ease-in-out"
            :class="showResult ? 'max-w-xl' : 'max-w-3xl mx-auto w-full'"
        >
             <!-- Prompt Card -->
             <div class="mb-6 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                 <p class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Today's Prompt</p>
                 <p class="text-xl md:text-2xl font-serif text-gray-800 dark:text-gray-200 leading-relaxed">
                    "{{ prompt }}"
                 </p>
             </div>

             <!-- Editor -->
             <div class="flex-1 relative group">
                <textarea 
                  v-model="userText"
                  class="w-full h-full bg-transparent resize-none outline-hidden text-lg md:text-xl leading-loose text-gray-800 dark:text-gray-300 placeholder-gray-300 dark:placeholder-gray-700"
                  placeholder="Start writing..."
                  :disabled="showResult"
                  spellcheck="false"
                ></textarea>
                
                <!-- Focus Mode Indicator -->
                <div v-if="userText && !showResult" class="absolute bottom-4 right-4 text-xs text-gray-300 transition-opacity opacity-0 group-hover:opacity-100">
                    Focus Mode Active
                </div>
             </div>
             
             <!-- Action Bar -->
             <div class="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                 <span class="text-sm text-gray-400 font-medium">{{ userText.length }} characters</span>
                 
                 <div class="flex gap-4">
                     <NuxtButton 
                        v-if="showResult"
                        @click="showResult = false" 
                        variant="ghost" 
                        class="text-gray-500"
                     >
                        Edit text
                     </NuxtButton>

                     <NuxtButton 
                        v-if="!showResult"
                        @click="submitWriting" 
                        size="lg"
                        class="gradient-primary px-8 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all rounded-full"
                        :loading="isSubmitting"
                        :disabled="userText.length < 10"
                     >
                        Get Feedback
                     </NuxtButton>
                 </div>
             </div>
        </div>

        <!-- Feedback Sidebar (Slides in) -->
        <Transition
            enter-active-class="transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            enter-from-class="translate-x-full opacity-0 w-0"
            enter-to-class="translate-x-0 opacity-100 w-96 pl-8"
            leave-active-class="transition-all duration-500 ease-in"
            leave-from-class="translate-x-0 opacity-100 w-96 pl-8"
            leave-to-class="translate-x-full opacity-0 w-0"
        >
            <div v-if="showResult" class="w-96 pl-8 border-l border-gray-100 dark:border-gray-800 overflow-y-auto">
                 <div class="sticky top-0 space-y-8">
                     <!-- Feedback Tabs (Gradual) -->
                     <div class="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                         <button 
                            @click="feedbackLevel = 'summary'"
                            class="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
                            :class="feedbackLevel === 'summary' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900'"
                         >
                            Overview
                         </button>
                         <button 
                            @click="feedbackLevel = 'detailed'"
                            class="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
                            :class="feedbackLevel === 'detailed' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900'"
                         >
                            Details
                         </button>
                     </div>

                     <!-- Rewrite Suggestion (Friendly) -->
                     <div class="p-6 rounded-2xl bg-linear-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-900/30">
                         <h4 class="text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-3 flex items-center gap-2">
                            <NuxtIcon name="i-lucide-sparkles" class="w-4 h-4" />
                            A Smoother Way to Say It
                         </h4>
                         <p class="text-indigo-800 dark:text-indigo-100 leading-relaxed text-sm">
                            "{{ rewriteSuggestion }}"
                         </p>
                     </div>

                     <div v-if="feedbackLevel === 'detailed'" class="space-y-4 animate-slide-up">
                         <h4 class="font-bold text-gray-900 dark:text-white">Suggestions</h4>
                         <div 
                            v-for="(tip, idx) in feedback.tips" 
                            :key="idx"
                            class="p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/30 bg-yellow-50 dark:bg-yellow-900/10"
                         >
                             <span class="text-xs font-bold text-yellow-700 dark:text-yellow-500 uppercase tracking-wide mb-1 block">{{ tip.type }}</span>
                             <p class="text-sm text-gray-700 dark:text-gray-300">{{ tip.text }}</p>
                         </div>
                     </div>
                     
                     <div v-else class="space-y-4 animate-slide-up">
                        <div class="text-center p-8">
                            <div class="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl font-bold text-green-600 dark:text-green-400">Great</span>
                            </div>
                            <p class="text-gray-500 text-sm">Your message is clear! A few small tweaks style will make it shine.</p>
                        </div>
                     </div>

                 </div>
            </div>
        </Transition>
    </div>
  </div>
</template>
