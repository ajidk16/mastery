<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const isRecording = ref(false)
const conversationState = ref<'idle' | 'recording' | 'processing' | 'ai_speaking'>('idle')
const showFeedback = ref(false)

// Simulated conversation
const messages = ref([
  {
     role: 'ai',
     text: "Hi there! I'm your AI partner. Are you ready to practice talking about your hobbies?",
     audio: true
  }
])

function toggleRecording() {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

function startRecording() {
  isRecording.value = true
  conversationState.value = 'recording'
  // Simulate recording duration or finish action
  setTimeout(() => {
     if(isRecording.value) stopRecording()
  }, 3000)
}

function stopRecording() {
  isRecording.value = false
  conversationState.value = 'processing'
  
  // Simulate user input
  messages.value.push({
    role: 'user',
    text: "Yes, I am ready. I like playing guitar.",
    audio: false
  })

  // Simulate AI processing and response
  setTimeout(() => {
    showFeedback.value = true
    setTimeout(() => {
        showFeedback.value = false
        conversationState.value = 'ai_speaking'
        messages.value.push({
            role: 'ai',
            text: "That's wonderful! playing musical instruments is creative. How long have you been playing?",
            audio: true
        })
        setTimeout(() => {
             conversationState.value = 'idle'
        }, 3000)
    }, 4000) // Time to read feedback
  }, 1500)
}

function exitSession() {
  if (confirm('End practice session?')) {
    router.push('/practice/speaking')
  }
}
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col relative">
    <!-- Header -->
    <div class="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent">
        <button @click="exitSession" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <NuxtIcon name="i-lucide-x" class="w-6 h-6 text-gray-500" />
        </button>
        <div class="text-sm font-medium text-gray-500">Daily Conversation</div>
        <div class="w-10"></div> <!-- Spacer -->
    </div>

    <!-- Main Visual / Conversation Area -->
    <div class="flex-1 flex flex-col items-center justify-center p-4 space-y-8">
        
        <!-- AI Avatar Visual -->
        <div class="relative">
             <div 
                class="w-32 h-32 rounded-full gradient-primary flex items-center justify-center shadow-2xl transition-all duration-500"
                :class="{'scale-110 shadow-primary-500/50': conversationState === 'ai_speaking', 'animate-pulse': conversationState === 'processing'}"
             >
                <NuxtIcon name="i-lucide-bot" class="w-16 h-16 text-white" />
             </div>
             
             <!-- Ripples when AI speaking -->
             <div v-if="conversationState === 'ai_speaking'" class="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-ping" />
        </div>

        <!-- Latest Message Display -->
        <div class="max-w-md w-full text-center space-y-4 min-h-[120px]">
             <Transition
                mode="out-in"
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform translate-y-4 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-4 opacity-0"
            >
                <p :key="messages[messages.length - 1].text" class="text-xl font-medium text-gray-800 dark:text-gray-200">
                    "{{ messages[messages.length - 1].text }}"
                </p>
            </Transition>
        </div>


        <!-- Live Feedback Overlay -->
        <Transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-300 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div v-if="showFeedback" class="absolute inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto glass-card p-6 rounded-2xl shadow-xl z-20 border-green-200 dark:border-green-900 bg-green-50/90 dark:bg-green-950/90 backdrop-blur-xl">
                 <div class="flex items-start gap-4">
                    <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                        <NuxtIcon name="i-lucide-check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h4 class="font-bold text-gray-900 dark:text-white mb-1">Good usage!</h4>
                        <p class="text-sm text-gray-700 dark:text-gray-300">
                           Using <span class="font-bold text-green-600 dark:text-green-400">"I like playing..."</span> is perfect here. You sounded confident!
                        </p>
                    </div>
                 </div>
            </div>
        </Transition>

    </div>


    <!-- Controls -->
    <div class="p-8 pb-12 flex items-center justify-center relative">
         <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
         
         <div class="relative z-10 flex items-center gap-8">
             <button class="p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                 <NuxtIcon name="i-lucide-keyboard" class="w-6 h-6" />
             </button>

             <!-- Mic Button -->
             <button 
                @click="toggleRecording"
                class="w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                :class="isRecording ? 'bg-red-500 shadow-red-500/40 scale-110' : 'gradient-primary shadow-primary-500/40 hover:scale-105'"
             >
                <NuxtIcon 
                    :name="isRecording ? 'i-lucide-square' : 'i-lucide-mic'" 
                    class="w-8 h-8 text-white transition-transform"
                    :class="{'animate-pulse': isRecording}"
                />
             </button>

              <button class="p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                 <NuxtIcon name="i-lucide-lightbulb" class="w-6 h-6" />
             </button>
         </div>
    </div>
  </div>
</template>
