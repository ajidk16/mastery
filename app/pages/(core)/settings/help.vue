<script setup lang="ts">
// Help component static mostly
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Help & Support</h2>
    
    <div class="grid sm:grid-cols-2 gap-4">
      <UCard class="hover:border-primary-500 transition-colors cursor-pointer group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/10 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
            <NuxtIcon name="i-lucide-book-open" class="w-5 h-5" />
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-white">FAQs</p>
            <p class="text-xs text-gray-500">Instant answers</p>
          </div>
        </div>
      </UCard>
      <UCard class="hover:border-primary-500 transition-colors cursor-pointer group">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/10 flex items-center justify-center text-primary-500 group-hover:scale-110 transition-transform">
            <NuxtIcon name="i-lucide-message-circle" class="w-5 h-5" />
          </div>
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Contact Support</p>
            <p class="text-xs text-gray-500">Get help</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
