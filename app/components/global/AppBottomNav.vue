<script setup lang="ts">
const route = useRoute()

const navItems = ref([
  { label: 'Home', icon: 'i-lucide-home', to: '/' },
  { label: 'Learn', icon: 'i-lucide-book-open', to: '/learn' },
  { label: 'Practice', icon: 'i-lucide-mic', to: '/practice' },
  { label: 'Progress', icon: 'i-lucide-trending-up', to: '/progress' },
  { label: 'Profile', icon: 'i-lucide-user', to: '/profile' },
])
</script>

<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/20 dark:border-gray-700/30 safe-area-pb">
    <div class="flex items-center justify-around h-18 px-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="relative flex flex-col items-center justify-center gap-1 py-3 px-4 rounded-2xl transition-all duration-300"
        :class="[
          route.path === item.to
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
        ]"
      >
        <!-- Active background glow -->
        <div
          v-if="route.path === item.to"
          class="absolute inset-1 bg-primary-500/10 dark:bg-primary-500/20 rounded-2xl"
        />
        
        <div class="relative">
          <!-- Icon with scale animation -->
          <span
            :class="item.icon"
            class="w-6 h-6 transition-transform duration-300"
            :style="{ transform: route.path === item.to ? 'scale(1.1)' : 'scale(1)' }"
          />
          
          <!-- Active glow under icon -->
          <div
            v-if="route.path === item.to"
            class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary-500 rounded-full blur-sm"
          />
        </div>
        
        <span
          class="text-[10px] font-medium transition-all duration-300"
          :class="[
            route.path === item.to ? 'opacity-100' : 'opacity-60'
          ]"
        >
          {{ item.label }}
        </span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.safe-area-pb {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.h-18 {
  height: 4.5rem;
}
</style>
