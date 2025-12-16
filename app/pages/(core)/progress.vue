<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

// Mock data for visualizations
const fluencyTrend = [30, 35, 42, 45, 50, 58, 62] // Weekly trend
const speakingConfidence = 75 // 0-100

const mistakes = [
    { type: 'Grammar', count: 12, label: 'Past tense usage', solved: true },
    { type: 'Pronunciation', count: 8, label: "'TH' sound", solved: false },
    { type: 'Vocabulary', count: 5, label: 'Formal greetings', solved: true },
]
</script>

<template>
  <div class="space-y-8">
     <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Your Growth</h1>
        <p class="text-gray-500 dark:text-gray-400">See how far you've come</p>
      </div>
      <div class="hidden sm:flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/10 px-4 py-2 rounded-full border border-yellow-100 dark:border-yellow-900/30">
          <NuxtIcon name="i-lucide-trophy" class="w-5 h-5 text-yellow-500" />
          <span class="text-sm font-bold text-yellow-700 dark:text-yellow-500">Top 10% Learner</span>
      </div>
    </div>
    
    <!-- Hero Stats Grid -->
    <div class="grid sm:grid-cols-2 gap-6">
        <!-- Fluency Trend (Simplified Visual) -->
        <div class="glass-card p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[200px]">
            <div class="relative z-10">
                <div class="flex items-center gap-2 mb-2">
                    <div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <NuxtIcon name="i-lucide-trending-up" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 class="font-bold text-gray-900 dark:text-white">Fluency Score</h3>
                </div>
                <div class="flex items-baseline gap-2">
                    <span class="text-4xl font-bold text-gray-900 dark:text-white">62</span>
                    <span class="text-sm text-green-500 font-medium flex items-center">
                        <NuxtIcon name="i-lucide-arrow-up" class="w-3 h-3" />
                        +4 pts
                    </span>
                </div>
                <p class="text-sm text-gray-500 mt-1">Consistency is paying off!</p>
            </div>

            <!-- Visualization (CSS-only Line Chart) -->
            <div class="absolute bottom-0 inset-x-0 h-24 flex items-end justify-between px-6 pb-6 gap-2">
                <div 
                    v-for="(score, i) in fluencyTrend" 
                    :key="i"
                    class="w-full bg-primary-100 dark:bg-primary-900/20 rounded-t-lg relative group"
                    :style="{ height: `${score}%` }"
                >
                    <div class="absolute inset-x-0 top-0 h-1 bg-primary-500 rounded-full" />
                </div>
            </div>
            
             <!-- Decorative bg -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl pointer-events-none" />
        </div>

        <!-- Confidence Level -->
        <div class="glass-card p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[200px]">
             <div>
                 <div class="flex items-center gap-2 mb-2">
                    <div class="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <NuxtIcon name="i-lucide-zap" class="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 class="font-bold text-gray-900 dark:text-white">Confidence Level</h3>
                </div>
                
                <div class="mt-4 relative pt-4">
                     <!-- Gauge Visual -->
                     <div class="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                         <div class="h-full bg-linear-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000" :style="{ width: `${speakingConfidence}%` }" />
                     </div>
                     <div class="flex justify-between mt-2 text-sm font-medium">
                         <span class="text-gray-400">Shy</span>
                         <span class="text-gray-900 dark:text-white font-bold">{{ speakingConfidence }}%</span>
                         <span class="text-gray-400">Bold</span>
                     </div>
                </div>
             </div>

             <div class="bg-orange-50 dark:bg-orange-900/10 p-3 rounded-xl flex gap-3 items-start border border-orange-100 dark:border-orange-900/20">
                 <NuxtIcon name="i-lucide-quote" class="w-8 h-8 text-orange-400 shrink-0 opacity-50" />
                 <p class="text-sm text-gray-700 dark:text-gray-300 italic">"You sounded much more assertive in the Business Roleplay yesterday." - AI Coach</p>
             </div>
        </div>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
        <!-- Speaking Duration Chart -->
        <div class="space-y-4">
            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <NuxtIcon name="i-lucide-clock" class="w-5 h-5 text-gray-400" />
                Time Spoken (mins)
            </h3>
            <div class="glass-card p-6 rounded-3xl h-64 flex items-end gap-3">
                 <div 
                    v-for="(val, i) in [15, 25, 10, 45, 30, 60, 20]" 
                    :key="i" 
                    class="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl relative group hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
                >
                    <div 
                        class="absolute bottom-0 inset-x-0 bg-gray-800 dark:bg-gray-200 rounded-xl transition-all duration-700"
                        :class="i === 5 ? 'gradient-primary !bg-none' : ''"
                        :style="{ height: `${(val/60)*100}%` }"
                    >
                         <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {{ val }} mins
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Common Mistakes -> Conquered Challenges -->
        <div class="space-y-4">
            <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <NuxtIcon name="i-lucide-check-circle-2" class="w-5 h-5 text-gray-400" />
                Challenges Conquered
            </h3>
            <div class="glass-card p-6 rounded-3xl space-y-4">
                <div 
                    v-for="item in mistakes" 
                    :key="item.label"
                    class="flex items-center justify-between p-3 rounded-xl transition-all"
                    :class="item.solved ? 'bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20' : 'bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 opacity-75'"
                >
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="item.solved ? 'bg-green-100 dark:bg-green-900/40' : 'bg-gray-100 dark:bg-gray-800'">
                            <NuxtIcon :name="item.solved ? 'i-lucide-check' : 'i-lucide-alert-circle'" class="w-5 h-5" :class="item.solved ? 'text-green-600 dark:text-green-400' : 'text-gray-400'" />
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ item.label }}</p>
                            <p class="text-xs text-gray-500">{{ item.type }}</p>
                        </div>
                    </div>
                    <span v-if="item.solved" class="text-xs font-bold text-green-600 dark:text-green-400 bg-white dark:bg-black/20 px-2 py-1 rounded-full">SOLVED</span>
                    <span v-else class="text-xs font-medium text-gray-400">In Progress</span>
                </div>
            </div>
             <p class="text-xs text-center text-gray-500">We track patterns to help you improve faster.</p>
        </div>
    </div>
  </div>
</template>
