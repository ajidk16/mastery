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
  window.addEventListener('scroll', handleScroll, { passive: true })
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
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled
        ? 'glass shadow-lg shadow-gray-900/5 dark:shadow-black/20'
        : 'bg-transparent'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div class="relative">
            <div class="absolute inset-0 bg-primary-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            <div class="relative w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/20">
              <span class="text-white font-bold text-lg">M</span>
            </div>
          </div>
          <span class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
            Mastery
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1 p-1.5 rounded-2xl glass-subtle">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            :class="[
              route.path === item.to
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            ]"
          >
            <!-- Active background -->
            <div
              v-if="route.path === item.to"
              class="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            />
            <span class="relative">{{ item.label }}</span>
          </NuxtLink>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-4">
          <!-- Streak indicator with glow -->
          <div class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl glass-subtle group cursor-pointer hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300">
            <div class="relative">
              <span class="i-lucide-flame w-5 h-5 text-orange-500" />
              <div class="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
            </div>
            <span class="text-sm font-bold text-gray-900 dark:text-white">7</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">day streak</span>
          </div>

          <!-- User Avatar -->
          <NuxtDropdown :items="[userMenuItems]">
            <NuxtButton
              color="neutral"
              variant="ghost"
              class="rounded-full p-1 hover:bg-white/50 dark:hover:bg-gray-800/50"
              square
            >
              <div class="relative">
                <NuxtAvatar
                  src=""
                  alt="User"
                  size="sm"
                  :ui="{
                    root: 'ring-2 ring-primary-500/30 hover:ring-primary-500/60 transition-all duration-300'
                  }"
                />
                <!-- Online indicator -->
                <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
              </div>
            </NuxtButton>
          </NuxtDropdown>
        </div>
      </div>
    </nav>
  </header>
</template>
