<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const isRecording = ref(false)
const state = ref<'intro' | 'recording' | 'processing' | 'ai_speaking' | 'feedback'>('intro')
const timer = ref(0)
let timerInterval: any

// Mock Data
const topic = {
    title: 'Ordering Coffee',
    context: 'Ask the barista for a latte with oat milk.',
    role: 'Customer'
}

const interaction = ref({
    userText: '',
    aiText: "Hi! Welcome to Roasted Bean. What can I get started for you today?",
    feedback: [
        { type: 'Pronunciation', text: "Great clarity on 'Latte', but watch the 'Oat' sound." },
        { type: 'Grammar', text: "Perfect request structure." }
    ]
})

onMounted(() => {
    // Start with AI speaking after a short delay
    setTimeout(() => {
        state.value = 'ai_speaking'
        setTimeout(() => {
             state.value = 'intro' // Ready for user
        }, 3000)
    }, 500)
})

function toggleRecording() {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

function startRecording() {
  isRecording.value = true
  state.value = 'recording'
  timer.value = 0
  timerInterval = setInterval(() => {
      timer.value++
  }, 1000)
  
  // Auto stop simulation
  setTimeout(() => {
      if(isRecording.value) stopRecording()
  }, 4000)
}

function stopRecording() {
  isRecording.value = false
  clearInterval(timerInterval)
  state.value = 'processing'
  
  // Simulate processing -> feedback
  setTimeout(() => {
       state.value = 'feedback'
       interaction.value.userText = "Can I have a latte with oat milk, please?"
  }, 2000)
}

function nextTurn() {
    state.value = 'ai_speaking'
    interaction.value.aiText = "Sure thing! Would you like that hot or iced?"
    setTimeout(() => {
        state.value = 'intro'
    }, 3000)
}

function exitSession() {
  if (confirm('End practice session?')) {
    router.push('/practice/speaking')
  }
}

const formattedTimer = computed(() => {
    const mins = Math.floor(timer.value / 60).toString().padStart(2, '0')
    const secs = (timer.value % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
})
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col relative bg-white dark:bg-gray-950">
    <!-- 1. Top Bar: Context & Exit -->
    <div class="flex items-center justify-between p-4 z-10">
        <button @click="exitSession" class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <NuxtIcon name="i-lucide-x" class="w-5 h-5 text-gray-500" />
        </button>
        <div class="text-center">
             <h2 class="font-bold text-gray-900 dark:text-white">{{ topic.title }}</h2>
             <p class="text-xs text-green-500 font-medium flex items-center justify-center gap-1">
                <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Session
             </p>
        </div>
        <div class="w-10" /> <!-- Spacer -->
    </div>

    <!-- 2. Main Area: Dynamic States -->
    <div class="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        <!-- STATE: AI Speaking (Bubble + Avatar) -->
        <div v-if="state === 'ai_speaking'" class="text-center space-y-8 animate-fade-in">
             <div class="relative inline-block">
                 <div class="w-32 h-32 rounded-full gradient-primary flex items-center justify-center shadow-2xl shadow-primary-500/40 relative z-10">
                     <NuxtIcon name="i-lucide-bot" class="w-12 h-12 text-white" />
                 </div>
                 <div class="absolute inset-0 rounded-full border-2 border-primary-500 animate-ping opacity-50" />
                 <div class="absolute inset-0 rounded-full border border-primary-300 animate-ping animation-delay-200 opacity-30" />
             </div>
             
             <div class="glass-card p-6 rounded-3xl max-w-md mx-auto rounded-tl-none border-primary-200 dark:border-primary-900">
                 <p class="text-xl font-medium text-gray-800 dark:text-gray-200">
                    "{{ interaction.aiText }}"
                 </p>
             </div>
        </div>

        <!-- STATE: Recording (Mic Focus + Waveform) -->
        <div v-else-if="state === 'recording'" class="text-center w-full max-w-md space-y-12 animate-fade-in">
             <div class="h-24 flex items-center justify-center gap-1">
                 <!-- CSS Waveform Simulation -->
                 <div v-for="i in 12" :key="i" 
                      class="w-2 bg-primary-500 rounded-full animate-pulse" 
                      :style="{ height: Math.random() * 60 + 20 + 'px', animationDuration: Math.random() * 0.5 + 0.3 + 's' }" 
                 />
             </div>
             <p class="text-4xl font-mono font-bold text-gray-900 dark:text-white tracking-widest">
                 {{ formattedTimer }}
             </p>
             <p class="text-gray-500">Listening...</p>
        </div>
        
        <!-- STATE: Processing -->
        <div v-else-if="state === 'processing'" class="text-center animate-fade-in">
             <NuxtIcon name="i-lucide-loader-2" class="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
             <p class="text-lg font-medium text-gray-600 dark:text-gray-300">Analyzing speech...</p>
        </div>

        <!-- STATE: Feedback (Actionable, Max 3) -->
        <div v-else-if="state === 'feedback'" class="w-full max-w-md space-y-6 animate-fade-in">
             <div class="text-center">
                 <p class="text-sm text-gray-500 mb-2">You said:</p>
                 <p class="text-xl font-medium text-gray-900 dark:text-white">"{{ interaction.userText }}"</p>
             </div>

             <div class="space-y-3">
                 <div v-for="(fb, idx) in interaction.feedback" :key="idx" class="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-4">
                     <div class="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0 mt-0.5">
                         <NuxtIcon :name="fb.type === 'Pronunciation' ? 'i-lucide-mic' : 'i-lucide-check'" class="w-4 h-4 text-primary-600 dark:text-primary-400" />
                     </div>
                     <div>
                         <span class="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide">{{ fb.type }}</span>
                         <p class="text-sm text-gray-700 dark:text-gray-300 mt-1">{{ fb.text }}</p>
                     </div>
                 </div>
             </div>
             
             <NuxtButton @click="nextTurn" block size="xl" class="gradient-primary mt-4 rounded-2xl">
                 Continue Conversation
             </NuxtButton>
        </div>

        <!-- STATE: Idle/Intro (Waiting for user) -->
        <div v-else class="text-center space-y-4 animate-fade-in">
             <p class="text-gray-500 text-lg">Your turn to speak</p>
             <div class="glass-card p-4 rounded-xl inline-block">
                 <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
                     Hint: Answer the question or ask for details.
                 </p>
             </div>
        </div>
    </div>

    <!-- 3. Bottom Control (Mic is Main focus) -->
    <div v-if="state === 'intro' || state === 'recording'" class="p-8 pb-12 flex justify-center">
        <button 
            @click="toggleRecording"
            class="group relative flex items-center justify-center"
        >
            <div 
                class="absolute inset-0 rounded-full bg-primary-500 transition-all duration-300" 
                :class="isRecording ? 'opacity-20 scale-150 animate-pulse' : 'opacity-0 scale-100'" 
            />
            <div 
                class="w-24 h-24 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-105"
                :class="isRecording ? 'bg-red-500 shadow-red-500/30' : 'gradient-primary shadow-primary-500/30'"
            >
                <NuxtIcon 
                    :name="isRecording ? 'i-lucide-square' : 'i-lucide-mic'" 
                    class="w-10 h-10 text-white fill-current transition-transform duration-300" 
                    :class="{'scale-110': isRecording}"
                />
            </div>
            
            <div v-if="!isRecording" class="absolute -bottom-10 text-sm font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Tap to speak
            </div>
        </button>
    </div>
  </div>
</template>

<style scoped>
.animation-delay-200 { animation-delay: 200ms; }
</style>
