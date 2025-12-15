<script setup lang="ts">
interface Props {
  variant?: 'card' | 'list' | 'avatar' | 'text' | 'custom'
  lines?: number
  showAvatar?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'card',
  lines: 3,
  showAvatar: false,
})
</script>

<template>
  <!-- Card variant with glass effect -->
  <div v-if="variant === 'card'" class="glass-card rounded-2xl p-6 space-y-4">
    <div class="flex items-center gap-4">
      <!-- Avatar skeleton with shimmer -->
      <div v-if="showAvatar" class="relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12">
        <div class="absolute inset-0 animate-shimmer" />
      </div>
      <div class="flex-1 space-y-2">
        <div class="relative overflow-hidden h-4 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700">
          <div class="absolute inset-0 animate-shimmer" />
        </div>
        <div class="relative overflow-hidden h-3 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700">
          <div class="absolute inset-0 animate-shimmer" style="animation-delay: 0.2s" />
        </div>
      </div>
    </div>
    <div class="space-y-2">
      <div 
        v-for="i in lines" 
        :key="i" 
        class="relative overflow-hidden h-3 rounded-lg bg-gray-200 dark:bg-gray-700"
        :class="i === lines ? 'w-2/3' : 'w-full'"
      >
        <div class="absolute inset-0 animate-shimmer" :style="{ animationDelay: `${i * 0.1}s` }" />
      </div>
    </div>
  </div>

  <!-- List variant with glass items -->
  <div v-else-if="variant === 'list'" class="space-y-3">
    <div 
      v-for="i in lines" 
      :key="i" 
      class="flex items-center gap-4 p-4 rounded-xl glass-subtle"
    >
      <div v-if="showAvatar" class="relative overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10 shrink-0">
        <div class="absolute inset-0 animate-shimmer" />
      </div>
      <div class="flex-1 space-y-2">
        <div class="relative overflow-hidden h-4 w-3/5 rounded-lg bg-gray-200 dark:bg-gray-700">
          <div class="absolute inset-0 animate-shimmer" />
        </div>
        <div class="relative overflow-hidden h-3 w-2/5 rounded-lg bg-gray-200 dark:bg-gray-700">
          <div class="absolute inset-0 animate-shimmer" style="animation-delay: 0.15s" />
        </div>
      </div>
      <div class="relative overflow-hidden h-8 w-20 rounded-lg bg-gray-200 dark:bg-gray-700">
        <div class="absolute inset-0 animate-shimmer" style="animation-delay: 0.3s" />
      </div>
    </div>
  </div>

  <!-- Avatar variant -->
  <div v-else-if="variant === 'avatar'" class="flex items-center gap-4">
    <div class="relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700 h-16 w-16">
      <div class="absolute inset-0 animate-shimmer" />
    </div>
    <div class="space-y-2">
      <div class="relative overflow-hidden h-5 w-32 rounded-lg bg-gray-200 dark:bg-gray-700">
        <div class="absolute inset-0 animate-shimmer" />
      </div>
      <div class="relative overflow-hidden h-3 w-24 rounded-lg bg-gray-200 dark:bg-gray-700">
        <div class="absolute inset-0 animate-shimmer" style="animation-delay: 0.2s" />
      </div>
    </div>
  </div>

  <!-- Text variant -->
  <div v-else-if="variant === 'text'" class="space-y-3">
    <div 
      v-for="i in lines" 
      :key="i" 
      class="relative overflow-hidden h-4 rounded-lg bg-gray-200 dark:bg-gray-700"
      :style="{ width: `${Math.random() * 40 + 60}%` }"
    >
      <div class="absolute inset-0 animate-shimmer" :style="{ animationDelay: `${i * 0.1}s` }" />
    </div>
  </div>

  <!-- Custom variant - use default slot -->
  <div v-else>
    <slot />
  </div>
</template>
