<script setup lang="ts">
definePageMeta({
  name: 'core-settings',
  layout: 'dashboard'
})

const route = useRoute()

const sections = [
  { id: 'profile', label: 'Profile', icon: 'i-lucide-user', to: '/settings/profile' },
  { id: 'learning', label: 'Learning Preferences', icon: 'i-lucide-graduation-cap', to: '/settings/learning' },
  { id: 'subscription', label: 'Subscription', icon: 'i-lucide-credit-card', to: '/settings/subscription' },
  { id: 'notifications', label: 'Notifications', icon: 'i-lucide-bell', to: '/settings/notifications' },
  { id: 'privacy', label: 'Privacy & Data', icon: 'i-lucide-shield', to: '/settings/privacy' },
  { id: 'security', label: 'Security', icon: 'i-lucide-lock', to: '/settings/security' },
  { id: 'help', label: 'Help & Support', icon: 'i-lucide-help-circle', to: '/settings/help' }
]
</script>

<template>
  <div class="space-y-8 pb-20">
    <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p class="text-gray-500 dark:text-gray-400">Manage your account and learning preferences.</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
      <!-- Quick Nav for Desktop -->
      <nav class="hidden lg:block w-64 sticky top-24 shrink-0 space-y-8">
        <div>
            <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-widest px-4 mb-3">Menu</h3>
            <div class="space-y-1">
            <NuxtLink
                v-for="section in sections"
                :key="section.id"
                :to="section.to"
                class="group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                active-class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200 dark:ring-gray-700"
                :class="route.path === section.to ? '' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'"
            >
                <div 
                    class="p-1.5 rounded-lg transition-colors"
                    :class="route.path === section.to ? 'bg-primary-50 dark:bg-primary-900/10' : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700'"
                >
                    <NuxtIcon 
                        :name="section.icon" 
                        class="w-4 h-4" 
                        :class="route.path === section.to ? 'text-primary-500' : 'text-gray-500'" 
                    />
                </div>
                {{ section.label }}
            </NuxtLink>
            </div>
        </div>

        <!-- Logout in sidebar -->
        <div class="px-4">
             <UButton
                color="gray"
                variant="ghost" 
                class="w-full justify-start text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 px-0"
                size="md"
             >
                <div class="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 mr-3">
                     <NuxtIcon name="i-lucide-log-out" class="w-4 h-4" />
                </div>
                Log Out
             </UButton>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="flex-1 w-full max-w-2xl min-h-[400px]">
         <NuxtPage />
      </div>
    </div>
  </div>
</template>
