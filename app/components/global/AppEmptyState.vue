<script setup lang="ts">
interface Props {
  icon?: string
  title: string
  description?: string
  actionLabel?: string
  actionIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'i-lucide-inbox',
})

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
    <!-- Decorative background with animation -->
    <div class="relative mb-8">
      <!-- Animated outer rings -->
      <div class="absolute inset-0 -m-8 rounded-full bg-linear-to-r from-primary-200/40 to-secondary-200/40 dark:from-primary-800/20 dark:to-secondary-800/20 animate-glow-pulse" />
      <div class="absolute inset-0 -m-4 rounded-full bg-linear-to-r from-primary-100/60 to-secondary-100/60 dark:from-primary-900/30 dark:to-secondary-900/30 animate-glow-pulse" style="animation-delay: -1.5s" />
      
      <!-- Glass container -->
      <div class="relative w-24 h-24 rounded-3xl glass-card flex items-center justify-center">
        <span
          :class="icon"
          class="w-12 h-12 text-gray-400 dark:text-gray-500 animate-float-slow"
        />
      </div>
    </div>

    <!-- Content -->
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
      {{ title }}
    </h3>
    <p
      v-if="description"
      class="text-gray-500 dark:text-gray-400 max-w-sm mb-8 leading-relaxed"
    >
      {{ description }}
    </p>

    <!-- Action button with glow -->
    <NuxtButton
      v-if="actionLabel"
      :icon="actionIcon"
      size="lg"
      class="gradient-primary border-0 shadow-lg glow-primary hover:shadow-xl transition-all duration-300"
      @click="emit('action')"
    >
      {{ actionLabel }}
    </NuxtButton>

    <!-- Optional slot for custom content -->
    <slot />
  </div>
</template>
