<script setup lang="ts">
const route = useRoute()

const navItems = ref([
  { label: 'Home', icon: 'i-lucide-home', to: '/' },
  { label: 'Learn', icon: 'i-lucide-book-open', to: '/learn' },
  { label: 'Practice', icon: 'i-lucide-mic', to: '/practice' },
  { label: 'Progress', icon: 'i-lucide-trending-up', to: '/progress' },
])

const userMenuItems = ref([
  { label: 'Profile', icon: 'i-lucide-user', to: '/profile' },
  { label: 'Settings', icon: 'i-lucide-settings', to: '/settings' },
  { label: 'Logout', icon: 'i-lucide-log-out', click: () => {} },
])

const isScrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  isScrolled.value = window.scrollY > 10
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm border-b border-gray-100 dark:border-gray-800'
        : 'bg-transparent'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <span class="text-white font-bold text-sm">M</span>
          </div>
          <span class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
            Mastery
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            :class="[
              route.path === item.to
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          <!-- Streak indicator -->
          <div class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-50 dark:bg-secondary-950/50 text-secondary-600 dark:text-secondary-400">
            <span class="i-lucide-flame w-4 h-4" />
            <span class="text-sm font-medium">7</span>
          </div>

          <!-- User Avatar / Auth -->
          <NuxtDropdown :items="[userMenuItems]">
            <NuxtButton
              color="neutral"
              variant="ghost"
              class="rounded-full"
              square
            >
              <NuxtAvatar
                src=""
                alt="User"
                :ui="{
                  root: 'ring-2 ring-primary-500/20'
                }"
                size="sm"
              />
            </NuxtButton>
          </NuxtDropdown>
        </div>
      </div>
    </nav>
  </header>
</template>
