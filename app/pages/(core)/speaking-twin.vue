<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const isPlayingOriginal = ref(false)
const isPlayingTwin = ref(false)

function toggleOriginal() {
  if (isPlayingTwin.value) isPlayingTwin.value = false
  isPlayingOriginal.value = !isPlayingOriginal.value
}

function toggleTwin() {
  if (isPlayingOriginal.value) isPlayingOriginal.value = false
  isPlayingTwin.value = !isPlayingTwin.value
}
</script>

<template>
  <div class="space-y-8">
     <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
           AI Speaking Twin
           <span class="px-2 py-0.5 rounded-full bg-linear-to-r from-primary-500 to-secondary-500 text-[10px] text-white font-bold uppercase tracking-wider">Beta</span>
        </h1>
        <p class="text-gray-500 dark:text-gray-400">Hear your potential fluent self</p>
     </div>

     <div class="grid md:grid-cols-2 gap-8 items-center h-[60vh] md:h-auto">
        <!-- Current You -->
        <div class="glass-card p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group hover-lift border-gray-200 dark:border-gray-800">
             <div class="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center relative">
                 <NuxtIcon name="i-lucide-user" class="w-16 h-16 text-gray-400" />
                 
                 <div v-if="isPlayingOriginal" class="absolute inset-0 rounded-full border-2 border-gray-400 animate-ping opacity-20" />
             </div>
             
             <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">You Now</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Current Proficiency: A2</p>
             </div>

             <button 
               @click="toggleOriginal"
               class="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
               :class="isPlayingOriginal ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'"
            >
                <NuxtIcon :name="isPlayingOriginal ? 'i-lucide-pause' : 'i-lucide-play'" class="w-6 h-6 fill-current" />
             </button>
             
             <div class="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-12 flex items-center px-4">
                 <div class="flex-1 flex gap-1 items-center justify-center h-full">
                     <span class="w-1 h-3 bg-gray-400 rounded-full animate-pulse" style="animation-duration: 0.8s" />
                     <span class="w-1 h-5 bg-gray-400 rounded-full animate-pulse" style="animation-duration: 1.2s" />
                     <span class="w-1 h-2 bg-gray-400 rounded-full animate-pulse" style="animation-duration: 0.5s" />
                     <span class="w-1 h-4 bg-gray-400 rounded-full animate-pulse" style="animation-duration: 0.9s" />
                 </div>
             </div>
        </div>

        <!-- Arrow on desktop, down on mobile -->
        <div class="flex justify-center md:rotate-0 rotate-90">
             <NuxtIcon name="i-lucide-arrow-right" class="w-8 h-8 text-gray-300 dark:text-gray-600" />
        </div>

        <!-- Future You -->
        <div class="glass-card p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden group hover-lift border-primary-100 dark:border-primary-900/30 shadow-2xl shadow-primary-500/10">
             <div class="absolute inset-0 bg-linear-to-b from-primary-500/5 to-transparent pointer-events-none" />

             <div class="w-32 h-32 rounded-full gradient-primary flex items-center justify-center relative shadow-lg shadow-primary-500/30">
                 <NuxtIcon name="i-lucide-sparkles" class="w-16 h-16 text-white" />
                 
                 <div v-if="isPlayingTwin" class="absolute inset-0 rounded-full border-2 border-primary-500 animate-ping opacity-30" />
             </div>
             
             <div>
                <h3 class="text-xl font-bold bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Future You</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Predicted Proficiency: C1 (Fluent)</p>
             </div>

             <button 
               @click="toggleTwin"
               class="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 gradient-primary text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105"
            >
                <NuxtIcon :name="isPlayingTwin ? 'i-lucide-pause' : 'i-lucide-play'" class="w-6 h-6 fill-current" />
             </button>

              <div class="w-full bg-primary-50 dark:bg-primary-900/20 rounded-full h-12 flex items-center px-4">
                 <div class="flex-1 flex gap-1 items-center justify-center h-full">
                     <span 
                        v-for="i in 12" :key="i"
                        class="w-1 bg-primary-400 rounded-full animate-pulse"
                        :style="{ height: `${Math.random() * 24 + 8}px`, animationDuration: `${Math.random() * 0.5 + 0.5}s` }" 
                     />
                 </div>
             </div>
        </div>
     </div>
  </div>
</template>
