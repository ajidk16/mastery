<script setup lang="ts">
/**
 * Default Layout - Premium design
 * Main application layout with glassmorphism navigation
 */
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 gradient-mesh">
    <!-- Top Navigation -->
    <AppTopNav />

    <!-- Main content with padding for fixed headers/footers -->
    <main class="pt-20 pb-24 md:pb-12 min-h-screen">
      <slot />
    </main>

    <!-- Bottom Navigation (mobile only) -->
    <AppBottomNav />
  </div>
</template>
