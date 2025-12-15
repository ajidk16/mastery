<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const dailyGoal = 3
const currentProgress = 1
const percentage = computed(() => (currentProgress / dailyGoal) * 100)

const recommended = [
  {
    title: 'Introduce Yourself',
    type: 'Speaking',
    duration: '5 min',
    difficulty: 'Easy',
    icon: 'i-lucide-mic',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    title: 'Ordering Coffee',
    type: 'Roleplay',
    duration: '8 min',
    difficulty: 'Medium',
     icon: 'i-lucide-drama',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20'
  }
]
</script>

<template>
  <div class="space-y-8">
    <!-- Welcome Header -->
    <div class="space-y-1">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        Good morning, User! ☀️
      </h1>
      <p class="text-gray-500 dark:text-gray-400">
        Ready to continue your mastery journey?
      </p>
    </div>

    <!-- Daily Goal Card -->
    <div class="glass-card p-6 rounded-2xl relative overflow-hidden group">
       <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-500/20 transition-colors" />
       
       <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
             <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Daily Goal</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Complete 3 lessons to keep your streak</p>
             </div>
             <div class="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                <NuxtIcon name="i-lucide-target" class="w-6 h-6 text-primary-500" />
             </div>
          </div>

          <div class="space-y-2">
             <div class="flex items-center justify-between text-sm">
                <span class="font-medium text-gray-700 dark:text-gray-300">{{ currentProgress }}/{{ dailyGoal }} completed</span>
                <span class="text-primary-600 dark:text-primary-400 font-bold">{{ Math.round(percentage) }}%</span>
             </div>
             <div class="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  class="h-full gradient-primary rounded-full transition-all duration-1000 ease-out"
                  :style="{ width: `${percentage}%` }"
                />
             </div>
          </div>

          <div class="mt-6 flex justify-end">
             <NuxtButton class="gradient-primary border-0" icon="i-lucide-play">
                Continue Learning
             </NuxtButton>
          </div>
       </div>
    </div>

    <!-- Recommended for you -->
    <div class="space-y-4">
       <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Recommended for you</h2>
          <NuxtLink to="/practice" class="text-sm text-primary-600 dark:text-primary-400 font-medium hover:text-primary-500">
            View all
          </NuxtLink>
       </div>

       <div class="grid gap-4">
          <button 
             v-for="lesson in recommended" 
             :key="lesson.title"
             class="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary-500/50 hover:shadow-lg dark:hover:shadow-none hover:shadow-primary-500/5 transition-all group text-left"
          >
             <div class="flex items-center gap-4">
                <div :class="`w-12 h-12 rounded-xl flex items-center justify-center ${lesson.bg}`">
                   <NuxtIcon :name="lesson.icon" :class="`w-6 h-6 ${lesson.color}`" />
                </div>
                <div>
                   <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {{ lesson.title }}
                   </h3>
                   <div class="flex items-center gap-3 text-xs text-gray-500">
                      <span>{{ lesson.type }}</span>
                      <span>•</span>
                      <span>{{ lesson.duration }}</span>
                      <span>•</span>
                      <span class="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 font-medium">
                         {{ lesson.difficulty }}
                      </span>
                   </div>
                </div>
             </div>
             <div>
                <NuxtIcon name="i-lucide-chevron-right" class="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
             </div>
          </button>
       </div>
    </div>
  </div>
</template>
