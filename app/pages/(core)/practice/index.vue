<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div class="space-y-8">
     <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Practice Arena</h1>
        <p class="text-gray-500 dark:text-gray-400">Hone your skills in a safe environment</p>
     </div>

     <div class="grid gap-6">
        <NuxtLink to="/practice/speaking" class="glass-card p-6 rounded-2xl flex items-center gap-6 hover-lift group">
           <div class="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <NuxtIcon name="i-lucide-mic" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
           </div>
           <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">Speaking Practice</h3>
              <p class="text-gray-500 dark:text-gray-400">Conversations with AI, Pronunciation drills</p>
           </div>
           <div class="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors">
              <NuxtIcon name="i-lucide-arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-white" />
           </div>
        </NuxtLink>

         <NuxtLink to="/practice/writing" class="glass-card p-6 rounded-2xl flex items-center gap-6 hover-lift group opacity-75">
           <div class="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <NuxtIcon name="i-lucide-pencil" class="w-8 h-8 text-purple-600 dark:text-purple-400" />
           </div>
           <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">Writing Laboratory</h3>
              <p class="text-gray-500 dark:text-gray-400">Essay reviews, Grammar fix</p>
           </div>
            <div class="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors">
              <NuxtIcon name="i-lucide-lock" class="w-5 h-5 text-gray-400 group-hover:text-white" />
           </div>
        </NuxtLink>
     </div>
  </div>
</template>
