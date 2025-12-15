<script setup lang="ts">
/**
 * Landing / Index page - Premium demo
 */
const isAuthenticated = ref(false)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero section with animation -->
    <div class="text-center mb-16 animate-slide-up">
      <h1 class="text-5xl sm:text-6xl font-bold mb-6">
        <span class="bg-linear-to-r from-gray-900 via-primary-600 to-gray-900 dark:from-white dark:via-primary-400 dark:to-white bg-clip-text text-transparent">
          Welcome to Mastery
        </span>
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Your AI-powered English speaking companion
      </p>
    </div>

    <!-- Quick actions with stagger animation -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      <NuxtLink
        to="/welcome"
        class="group relative p-8 rounded-3xl overflow-hidden animate-slide-up opacity-0 stagger-1"
        style="animation-fill-mode: forwards"
      >
        <!-- Gradient background -->
        <div class="absolute inset-0 gradient-primary opacity-90" />
        <!-- Shimmer overlay -->
        <div class="absolute inset-0 animate-shimmer opacity-20" />
        <!-- Glow -->
        <div class="absolute inset-0 glow-primary" />
        
        <div class="relative z-10 text-white">
          <span class="i-lucide-play-circle w-10 h-10 mb-6 block group-hover:scale-110 transition-transform duration-300" />
          <h3 class="text-xl font-bold mb-2">Start Onboarding</h3>
          <p class="text-white/80">Begin your learning journey</p>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/login"
        class="group p-8 rounded-3xl glass-card hover-lift animate-slide-up opacity-0 stagger-2"
        style="animation-fill-mode: forwards"
      >
        <span class="i-lucide-log-in w-10 h-10 mb-6 block text-gray-600 dark:text-gray-300 group-hover:text-primary-500 transition-all duration-300 group-hover:scale-110" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Login</h3>
        <p class="text-gray-500 dark:text-gray-400">Access your account</p>
      </NuxtLink>

      <NuxtLink
        to="/register"
        class="group p-8 rounded-3xl glass-card hover-lift animate-slide-up opacity-0 stagger-3"
        style="animation-fill-mode: forwards"
      >
        <span class="i-lucide-user-plus w-10 h-10 mb-6 block text-gray-600 dark:text-gray-300 group-hover:text-secondary-500 transition-all duration-300 group-hover:scale-110" />
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Register</h3>
        <p class="text-gray-500 dark:text-gray-400">Create a new account</p>
      </NuxtLink>
    </div>

    <!-- Component showcase -->
    <div class="space-y-16">
      <section class="animate-slide-up opacity-0 stagger-4" style="animation-fill-mode: forwards">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Component Showcase
        </h2>

        <div class="grid gap-8">
          <!-- Progress bar demo -->
          <div class="p-8 rounded-3xl glass-card">
            <h3 class="font-bold text-gray-900 dark:text-white mb-6 text-lg">Progress Bars</h3>
            <div class="space-y-8">
              <AppProgressBar :model-value="65" :max="100" show-percentage glow />
              <AppProgressBar :model-value="2" :steps="['Goals', 'Level', 'Prefs', 'Setup']" />
              <AppProgressBar :model-value="80" :max="100" color="secondary" size="lg" />
            </div>
          </div>

          <!-- Loading skeleton demo -->
          <div class="p-8 rounded-3xl glass-card">
            <h3 class="font-bold text-gray-900 dark:text-white mb-6 text-lg">Loading States</h3>
            <div class="grid sm:grid-cols-2 gap-6">
              <AppLoadingSkeleton variant="card" :lines="2" show-avatar />
              <AppLoadingSkeleton variant="avatar" />
            </div>
          </div>

          <!-- Empty state demo -->
          <div class="rounded-3xl glass-card overflow-hidden">
            <AppEmptyState
              title="No lessons yet"
              description="Start your first speaking session to see your progress here"
              action-label="Start Learning"
              action-icon="i-lucide-play"
              @action="() => {}"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
