<script setup lang="ts">
/**
 * Onboarding Layout - Premium immersive design
 * Full-screen layout with progress bar for onboarding flow
 */
definePageMeta({
  layout: false
})

const route = useRoute()

const steps = [
  { path: '/welcome', label: 'Welcome' },
  { path: '/goal-selection', label: 'Goals' },
  { path: '/level-assessment', label: 'Level' },
  { path: '/learning-preference', label: 'Preferences' },
  { path: '/permission-request', label: 'Setup' },
]

const currentStep = computed(() => {
  const index = steps.findIndex(s => route.path === s.path)
  return index === -1 ? 0 : index
})

const progress = computed(() => {
  return ((currentStep.value) / (steps.length - 1)) * 100
})
</script>

<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Animated gradient mesh background -->
    <div class="fixed inset-0 bg-linear-to-br from-slate-50 via-white to-primary-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/20 gradient-mesh" />

    <!-- Animated background decorations -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <!-- Large blob top right -->
      <div class="absolute top-0 right-0 w-[700px] h-[700px] -translate-y-1/4 translate-x-1/4">
        <div class="absolute inset-0 bg-linear-to-br from-primary-400/20 to-primary-600/10 dark:from-primary-500/10 dark:to-primary-700/5 rounded-full blur-3xl animate-blob" />
      </div>
      
      <!-- Medium blob bottom left -->
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] translate-y-1/4 -translate-x-1/4">
        <div class="absolute inset-0 bg-linear-to-tr from-secondary-400/20 to-secondary-600/10 dark:from-secondary-500/10 dark:to-secondary-700/5 rounded-full blur-3xl animate-blob" style="animation-delay: -4s" />
      </div>

      <!-- Small accents -->
      <div class="absolute top-1/4 left-1/6 w-32 h-32 bg-primary-300/20 dark:bg-primary-500/10 rounded-full blur-2xl animate-float" />
      <div class="absolute bottom-1/3 right-1/4 w-24 h-24 bg-secondary-300/20 dark:bg-secondary-500/10 rounded-full blur-2xl animate-float-slow" style="animation-delay: -2s" />
    </div>

    <!-- Header with progress -->
    <header class="relative z-10 p-4 sm:p-6">
      <div class="max-w-2xl mx-auto">
        <div class="flex items-center justify-between mb-4">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="relative">
              <div class="absolute inset-0 bg-primary-500 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <div class="relative w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <span class="text-white font-bold">M</span>
              </div>
            </div>
          </NuxtLink>

          <!-- Step indicator with glass effect -->
          <div class="px-4 py-1.5 rounded-full glass-subtle">
            <p class="text-sm text-gray-600 dark:text-gray-300">
              <span class="font-bold text-gray-900 dark:text-white">{{ currentStep + 1 }}</span>
              <span class="text-gray-400 dark:text-gray-500 mx-1">/</span>
              <span>{{ steps.length }}</span>
            </p>
          </div>

          <!-- Skip button -->
          <div class="w-16 flex justify-end">
            <NuxtButton
              v-if="currentStep > 0 && currentStep < steps.length - 1"
              to="/"
              color="neutral"
              variant="ghost"
              size="sm"
              class="hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              Skip
            </NuxtButton>
          </div>
        </div>

        <!-- Progress bar with glow -->
        <div class="relative">
          <div class="h-1.5 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-700 ease-out relative"
              :style="{ width: `${progress}%` }"
            >
              <div class="absolute inset-0 gradient-primary" />
              <div class="absolute inset-0 animate-shimmer opacity-50" />
            </div>
          </div>
          <!-- Glow under progress -->
          <div 
            class="absolute -bottom-2 h-4 blur-md gradient-primary opacity-30 rounded-full transition-all duration-700 ease-out"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="relative z-10 flex-1 flex items-center justify-center px-4 py-8 min-h-[calc(100vh-180px)]">
      <div class="w-full max-w-2xl">
        <slot />
      </div>
    </main>

    <!-- Footer spacer -->
    <div class="h-20 md:h-12" />
  </div>
</template>
