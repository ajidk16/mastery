<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const mode = ref<'current' | 'future'>('current')
const isPlaying = ref(false)
const audioProgress = ref(0)
let audioInterval: any

// Mock Data
const user = {
    name: 'You Now',
    description: 'Good foundation, but hesitant with complex sentences.',
    level: 'Intermediate (B1)',
    color: 'from-gray-500 to-slate-600',
    icon: 'i-lucide-user'
}

const twin = {
    name: 'Future You',
    description: 'Fluent, confident, and uses idiomatic expressions naturally.',
    level: 'Advanced (C1)',
    color: 'from-primary-500 to-indigo-600',
    icon: 'i-lucide-sparkles'
}

// Logic to toggle play state
function togglePlay() {
    isPlaying.value = !isPlaying.value
    
    if (isPlaying.value) {
        audioInterval = setInterval(() => {
            if (audioProgress.value >= 100) {
                resetAudio()
            } else {
                audioProgress.value += 1
            }
        }, 50)
    } else {
        clearInterval(audioInterval)
    }
}

function resetAudio() {
    isPlaying.value = false
    audioProgress.value = 0
    clearInterval(audioInterval)
}

function switchMode(newMode: 'current' | 'future') {
    mode.value = newMode
    resetAudio()
}

const activeProfile = computed(() => mode.value === 'current' ? user : twin)
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col justify-between max-w-lg mx-auto w-full relative">
     
    <!-- Header -->
    <div class="text-center space-y-2 pt-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">AI Speaking Twin</h1>
        <p class="text-gray-500 dark:text-gray-400">Hear the difference 6 months can make.</p>
    </div>

    <!-- Main Visual Area (Switchable) -->
    <div class="flex-1 flex flex-col items-center justify-center p-6">
        
        <!-- Profile Visual -->
        <div class="relative group cursor-pointer" @click="togglePlay">
             <!-- Dynamic Glow -->
             <div 
                class="absolute inset-0 rounded-full blur-3xl opacity-40 transition-all duration-1000"
                :class="mode === 'future' ? 'bg-indigo-500' : 'bg-gray-400'"
             />
             
             <!-- Avatar Circle -->
             <div 
                class="w-48 h-48 rounded-full bg-linear-to-br flex items-center justify-center shadow-2xl relative z-10 transition-all duration-500"
                :class="activeProfile.color"
             >
                 <NuxtIcon :name="activeProfile.icon" class="w-20 h-20 text-white" />
                 
                 <!-- Play Overlay -->
                 <div class="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                     <NuxtIcon :name="isPlaying ? 'i-lucide-pause' : 'i-lucide-play'" class="w-12 h-12 text-white fill-current" />
                 </div>
                 
                 <!-- Ring Progress -->
                 <svg class="absolute inset-0 -rotate-90 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="transparent" stroke="white" stroke-width="2" stroke-opacity="0.2" />
                    <circle 
                        cx="50" cy="50" r="48" 
                        fill="transparent" 
                        stroke="white" 
                        stroke-width="2" 
                        stroke-dasharray="301.59" 
                        :stroke-dashoffset="301.59 - (audioProgress / 100) * 301.59"
                        class="transition-all duration-100 ease-linear"
                    />
                 </svg>
             </div>
        </div>

        <!-- Text Info -->
        <div class="text-center mt-8 space-y-4 animate-fade-in relative h-32">
            <Transition
                mode="out-in"
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="transform translate-y-4 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-4 opacity-0"
            >
                <div :key="mode">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ activeProfile.name }}</h2>
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" :class="mode === 'future' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'">
                        {{ activeProfile.level }}
                    </span>
                    <p class="text-gray-600 dark:text-gray-300 max-w-xs mx-auto text-sm leading-relaxed">
                        "{{ activeProfile.description }}"
                    </p>
                </div>
            </Transition>
        </div>
    </div>

    <!-- Toggle Slider Control -->
    <div class="p-6 pb-8">
        <div class="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full flex relative shadow-inner">
             <!-- Sliding Background using absolute layout (simplified via flex spacing here for reliability) -->
             <button 
                @click="switchMode('current')"
                class="flex-1 py-4 rounded-full text-sm font-bold transition-all duration-300 relative z-10 flex items-center justify-center gap-2"
                :class="mode === 'current' ? 'bg-white dark:bg-gray-700 shadow-md text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'"
             >
                <NuxtIcon name="i-lucide-user" class="w-4 h-4" />
                Current You
             </button>
             <button 
                @click="switchMode('future')"
                class="flex-1 py-4 rounded-full text-sm font-bold transition-all duration-300 relative z-10 flex items-center justify-center gap-2"
                :class="mode === 'future' ? 'gradient-primary text-white shadow-lg shadow-primary-500/20' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'"
             >
                <NuxtIcon name="i-lucide-sparkles" class="w-4 h-4" />
                Future You
             </button>
        </div>
        
        <p class="text-xs text-center text-gray-400 mt-4 italic">
            "Regular practice bridges this gap."
        </p>
    </div>

  </div>
</template>
