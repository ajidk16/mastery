<script setup lang="ts">
/**
 * Auth Layout - Premium glassmorphism design
 * Clean, centered layout for authentication pages
 */
definePageMeta({
  layout: false
})
</script>

<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Animated gradient mesh background -->
    <div class="fixed inset-0 bg-linear-to-br from-slate-50 via-white to-primary-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/30 gradient-mesh" />
    
    <!-- Animated background blobs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <!-- Primary blob -->
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] bg-linear-to-br from-primary-400/30 to-primary-600/20 dark:from-primary-500/15 dark:to-primary-700/10 rounded-full blur-3xl animate-blob" />
      
      <!-- Secondary blob -->
      <div class="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-linear-to-tr from-secondary-400/25 to-secondary-600/15 dark:from-secondary-500/10 dark:to-secondary-700/5 rounded-full blur-3xl animate-blob" style="animation-delay: -4s" />
      
      <!-- Floating accent dots -->
      <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-float opacity-60" />
      <div class="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary-400 rounded-full animate-float-slow opacity-50" style="animation-delay: -2s" />
      <div class="absolute bottom-1/4 right-1/4 w-2 h-2 bg-primary-300 rounded-full animate-float opacity-40" style="animation-delay: -3s" />
    </div>

    <!-- Header -->
    <header class="relative z-10 p-6">
      <NuxtLink to="/" class="inline-flex items-center gap-3 group">
        <div class="relative">
          <div class="absolute inset-0 bg-primary-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
          <div class="relative w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <span class="text-white font-bold text-lg">M</span>
          </div>
        </div>
        <span class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          Mastery
        </span>
      </NuxtLink>
    </header>

    <!-- Main content -->
    <main class="relative z-10 flex-1 flex items-center justify-center px-4 py-8 min-h-[calc(100vh-160px)]">
      <div class="w-full max-w-md animate-slide-up">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 p-6 text-center">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        © {{ new Date().getFullYear() }} Mastery. All rights reserved.
      </p>
    </footer>
  </div>
</template>
