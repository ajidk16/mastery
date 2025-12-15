<script setup lang="ts">
const route = useRoute()

const links = [
  { label: 'Home', icon: 'i-lucide-home', to: '/dashboard' },
  { label: 'Practice', icon: 'i-lucide-mic', to: '/practice' },
  { label: 'Vocabulary', icon: 'i-lucide-book-a', to: '/vocabulary' },
  { label: 'Progress', icon: 'i-lucide-bar-chart-2', to: '/progress' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row">
    <!-- Desktop Sidebar -->
    <aside class="hidden md:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0">
      <div class="p-6">
        <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span class="text-white font-bold text-sm">M</span>
            </div>
            <span class="font-bold text-xl text-gray-900 dark:text-white">Mastery</span>
        </div>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
          active-class="bg-primary-50 dark:bg-primary-900/10 !text-primary-600 dark:!text-primary-400"
        >
          <NuxtIcon :name="link.icon" class="w-5 h-5" />
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-gray-200 dark:border-gray-800">
        <button class="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div class="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
             <NuxtIcon name="i-lucide-user" class="w-full h-full p-2 text-gray-400" />
          </div>
          <div class="text-left">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">User Name</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Free Plan</p>
          </div>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-0">
        <!-- Top Bar (Mobile & Desktop) -->
        <header class="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-40 px-4 flex items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                 <div class="md:hidden w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <span class="text-white font-bold text-sm">M</span>
                 </div>
                 <h1 class="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                    {{ route.name?.toString().replace('core-', '').replace('-', ' ') }}
                 </h1>
            </div>

            <div class="flex items-center gap-3">
                 <!-- Streak -->
                 <div class="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 rounded-full border border-orange-100 dark:border-orange-900/50">
                    <NuxtIcon name="i-lucide-flame" class="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span class="text-sm font-bold text-orange-600 dark:text-orange-400">12</span>
                 </div>
                 <!-- Gems -->
                  <div class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/50">
                    <NuxtIcon name="i-lucide-diamond" class="w-4 h-4 text-secondary-500 fill-secondary-500" />
                    <span class="text-sm font-bold text-secondary-600 dark:text-secondary-400">450</span>
                 </div>
            </div>
        </header>

        <main class="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div class="max-w-3xl mx-auto w-full">
            <slot />
          </div>
        </main>
        
        <!-- Mobile Bottom Nav -->
        <nav class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pb-safe fixed bottom-0 inset-x-0 z-50">
            <div class="flex justify-around items-center px-2">
                 <NuxtLink
                  v-for="link in links"
                  :key="link.to"
                  :to="link.to"
                  class="flex flex-col items-center gap-1 p-3 rounded-xl transition-colors min-w-[64px]"
                  active-class="text-primary-600 dark:text-primary-400"
                  :class="route.path.startsWith(link.to) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'"
                >
                  <NuxtIcon :name="link.icon" class="w-6 h-6" />
                  <span class="text-[10px] font-medium">{{ link.label }}</span>
                </NuxtLink>
            </div>
        </nav>
        
        <!-- Mobile Padding shim -->
        <div class="md:hidden h-20"></div>
    </div>
  </div>
</template>
