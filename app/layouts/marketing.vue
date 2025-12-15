<script setup lang="ts">
/**
 * Marketing Layout - Optimized for conversion
 * Minimal, distraction-free layout for landing pages
 */
</script>

<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Animated gradient mesh background -->
    <div class="fixed inset-0 bg-linear-to-br from-slate-50 via-white to-primary-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/20 gradient-mesh" />
    
    <!-- Animated background blobs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <!-- Primary blob -->
      <div class="absolute -top-40 -right-40 w-[600px] h-[600px] bg-linear-to-br from-primary-400/20 to-primary-600/10 dark:from-primary-500/10 dark:to-primary-700/5 rounded-full blur-3xl animate-blob" />
      
      <!-- Secondary blob -->
      <div class="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-linear-to-tr from-secondary-400/15 to-secondary-600/10 dark:from-secondary-500/8 dark:to-secondary-700/4 rounded-full blur-3xl animate-blob" style="animation-delay: -4s" />
      
      <!-- Accent blob -->
      <div class="absolute -bottom-40 right-1/4 w-[400px] h-[400px] bg-linear-to-tl from-primary-300/15 to-secondary-400/10 dark:from-primary-600/8 dark:to-secondary-500/5 rounded-full blur-3xl animate-blob" style="animation-delay: -2s" />
    </div>

    <!-- Main content -->
    <main class="relative z-10">
      <slot />
    </main>
  </div>
</template>
