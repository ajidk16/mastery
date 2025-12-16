<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const dailyGoal = 3
const currentProgress = 1
const percentage = computed(() => (currentProgress / dailyGoal) * 100)
</script>

<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div class="flex items-center justify-between">
       <div class="space-y-1">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Today's Focus
          </h1>
          <p class="text-gray-500 dark:text-gray-400">
            Keep your streak alive!
          </p>
       </div>
       <div class="text-right hidden sm:block">
          <p class="text-sm font-medium text-gray-500">Daily Goal</p>
          <div class="flex items-center gap-2">
             <div class="w-24 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div class="h-full bg-green-500 rounded-full" :style="{ width: `${percentage}%` }" />
             </div>
             <span class="text-sm font-bold text-gray-900 dark:text-white">{{ currentProgress }}/{{ dailyGoal }}</span>
          </div>
       </div>
    </div>

    <!-- Primary CTA: Start Speaking -->
    <!-- Ideally this links to the next recommended speaking lesson or the speaking hub -->
    <div class="relative group">
       <div class="absolute inset-0 bg-primary-500/20 rounded-[2rem] blur-xl transform group-hover:scale-105 transition-transform duration-500" />
       
       <NuxtLink 
         to="/practice/speaking"
         class="relative block bg-linear-to-br from-primary-600 to-indigo-700 rounded-[2rem] p-8 md:p-10 text-white overflow-hidden shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-300 transform group-hover:-translate-y-1"
       >
          <!-- Background decoration -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

          <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
             <div class="space-y-4 max-w-lg">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium text-white/90 border border-white/10">
                   <NuxtIcon name="i-lucide-sparkles" class="w-4 h-4" />
                   Recommended for you
                </div>
                
                <div>
                  <h2 class="text-3xl md:text-4xl font-bold mb-2">Start Speaking</h2>
                  <p class="text-primary-100 text-lg leading-relaxed">
                     Practice "Ordering Coffee" to boost your confidence in daily situations.
                  </p>
                </div>

                <div class="flex items-center gap-6 pt-2">
                   <div class="flex items-center gap-2 text-primary-100">
                      <NuxtIcon name="i-lucide-clock" class="w-5 h-5" />
                      <span>5 mins</span>
                   </div>
                   <div class="flex items-center gap-2 text-primary-100">
                      <NuxtIcon name="i-lucide-bar-chart" class="w-5 h-5" />
                      <span>Beginner Friendly</span>
                   </div>
                </div>
             </div>

             <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white text-primary-600 flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300">
                 <NuxtIcon name="i-lucide-mic" class="w-8 h-8 md:w-10 md:h-10 fill-current" />
             </div>
          </div>
       </NuxtLink>
    </div>

    <!-- Secondary Actions -->
    <div class="grid grid-cols-2 gap-4 md:gap-6">
       <!-- Writing -->
       <NuxtLink to="/practice/writing" class="glass-card p-6 rounded-3xl hover:border-primary-500/30 hover:shadow-lg transition-all group">
           <div class="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <NuxtIcon name="i-lucide-pencil" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
           </div>
           <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Writing Practice</h3>
           <p class="text-sm text-gray-500 leading-relaxed">Refine your grammar with 2 min exercises</p>
       </NuxtLink>

       <!-- Vocabulary -->
       <NuxtLink to="/vocabulary" class="glass-card p-6 rounded-3xl hover:border-primary-500/30 hover:shadow-lg transition-all group">
           <div class="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <NuxtIcon name="i-lucide-book-a" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
           </div>
           <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">Vocabulary</h3>
           <p class="text-sm text-gray-500 leading-relaxed">Learn 3 new words from context</p>
       </NuxtLink>
    </div>

    <!-- Last Session Summary & Reminder -->
    <div class="glass-card p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-l-secondary-500">
        <div class="flex items-start gap-4">
             <div class="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center shrink-0">
                <NuxtIcon name="i-lucide-history" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
             </div>
             <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Last Session</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">You practiced "Self Introduction" yesterday.</p>
                <div class="flex items-center gap-2 mt-2">
                   <div class="h-1.5 w-24 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div class="h-full bg-secondary-500 w-3/4" />
                   </div>
                   <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">Good job!</span>
                </div>
             </div>
        </div>
        
        <div class="text-center md:text-right bg-gray-50 dark:bg-gray-800/50 px-4 py-3 rounded-xl">
             <p class="text-xs text-gray-500 mb-1">Next milestone</p>
             <p class="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5 justify-center md:justify-end">
                <NuxtIcon name="i-lucide-trophy" class="w-4 h-4 text-yellow-500" />
                Reach 7 Day Streak
             </p>
        </div>
    </div>

  </div>
</template>
