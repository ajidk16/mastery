<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const weeklyActivity = [
  { day: 'Mon', value: 40, active: false },
  { day: 'Tue', value: 70, active: false },
  { day: 'Wed', value: 30, active: false },
  { day: 'Thu', value: 85, active: true },
  { day: 'Fri', value: 50, active: false },
  { day: 'Sat', value: 20, active: false },
  { day: 'Sun', value: 0, active: false },
]

const skills = [
  { name: 'Pronunciation', level: 65, color: 'text-blue-500', bg: 'bg-blue-500' },
  { name: 'Vocabulary', level: 42, color: 'text-green-500', bg: 'bg-green-500' },
  { name: 'Grammar', level: 58, color: 'text-purple-500', bg: 'bg-purple-500' },
  { name: 'Fluency', level: 35, color: 'text-orange-500', bg: 'bg-orange-500' },
]
</script>

<template>
  <div class="space-y-8">
     <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Your Progress</h1>
      <p class="text-gray-500 dark:text-gray-400">Keep up the momentum!</p>
    </div>
    
    <!-- Weekly Activity Chart -->
    <div class="glass-card p-6 rounded-3xl">
       <div class="flex items-center justify-between mb-8">
          <h3 class="font-bold text-gray-900 dark:text-white">Weekly Activity</h3>
          <span class="text-sm text-gray-500">Last 7 Days</span>
       </div>
       
       <div class="flex items-end justify-between h-48 gap-2">
          <div 
             v-for="day in weeklyActivity" 
             :key="day.day"
             class="flex flex-col items-center gap-2 flex-1"
          >
             <div class="relative w-full flex justify-center h-full items-end group">
                <div 
                   class="w-full max-w-[24px] rounded-t-lg transition-all duration-500 ease-out relative group-hover:opacity-80"
                   :class="day.active ? 'gradient-primary' : 'bg-gray-100 dark:bg-gray-800'"
                   :style="{ height: `${day.value}%` }"
                >
                   <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {{ day.value }}m
                   </div>
                </div>
             </div>
             <span class="text-xs font-medium text-gray-500" :class="day.active ? 'text-primary-600 dark:text-primary-400' : ''">
                {{ day.day }}
             </span>
          </div>
       </div>
    </div>

    <!-- Skills Breakdown -->
    <div class="grid md:grid-cols-2 gap-6">
       <!-- Skills -->
       <div class="glass-card p-6 rounded-3xl">
          <h3 class="font-bold text-gray-900 dark:text-white mb-6">Skill Breakdown</h3>
          <div class="space-y-6">
             <div v-for="skill in skills" :key="skill.name">
                <div class="flex justify-between text-sm mb-2">
                   <span class="font-medium text-gray-700 dark:text-gray-300">{{ skill.name }}</span>
                   <span class="font-bold" :class="skill.color">{{ skill.level }}%</span>
                </div>
                <div class="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                   <div 
                        class="h-full rounded-full transition-all duration-1000 ease-out" 
                        :class="skill.bg" 
                        :style="{ width: `${skill.level}%` }"
                   />
                </div>
             </div>
          </div>
       </div>

       <!-- Insight/Stats -->
       <div class="space-y-6">
          <div class="glass-card p-6 rounded-3xl flex items-center justify-between">
              <div>
                 <p class="text-sm text-gray-500 dark:text-gray-400">Total Speaking Time</p>
                 <p class="text-2xl font-bold text-gray-900 dark:text-white">12.5 hrs</p>
              </div>
               <div class="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <NuxtIcon name="i-lucide-clock" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
               </div>
          </div>

          <div class="glass-card p-6 rounded-3xl flex items-center justify-between">
              <div>
                 <p class="text-sm text-gray-500 dark:text-gray-400">Words Learned</p>
                 <p class="text-2xl font-bold text-gray-900 dark:text-white">842</p>
              </div>
               <div class="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <NuxtIcon name="i-lucide-book" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
               </div>
          </div>
       </div>
    </div>
  </div>
</template>
