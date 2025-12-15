<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  retryLabel?: string
  error?: Error | string | null
  showDetails?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  description: 'We encountered an unexpected error. Please try again.',
  retryLabel: 'Try Again',
  showDetails: false,
})

const emit = defineEmits<{
  retry: []
}>()

const errorMessage = computed(() => {
  if (!props.error) return null
  return typeof props.error === 'string' ? props.error : props.error.message
})
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
    <!-- Error icon with animated glow -->
    <div class="relative mb-8">
      <!-- Pulsing glow rings -->
      <div class="absolute inset-0 -m-6 rounded-full bg-red-500/10 animate-ping" style="animation-duration: 2s" />
      <div class="absolute inset-0 -m-3 rounded-full bg-red-500/20 animate-glow-pulse" />
      
      <!-- Glass container -->
      <div class="relative w-24 h-24 rounded-3xl bg-linear-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30 border border-red-200/50 dark:border-red-800/30 flex items-center justify-center shadow-xl shadow-red-500/10">
        <span class="i-lucide-alert-triangle w-12 h-12 text-red-500 dark:text-red-400 animate-float-slow" />
      </div>
    </div>

    <!-- Content -->
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
      {{ title }}
    </h3>
    <p class="text-gray-500 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
      {{ description }}
    </p>

    <!-- Error details with glass effect -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
    >
      <div
        v-if="showDetails && errorMessage"
        class="w-full max-w-md mb-8 p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/30 backdrop-blur-sm border border-red-200/50 dark:border-red-800/30"
      >
        <p class="text-xs text-red-600 dark:text-red-400 font-mono break-all text-left">
          {{ errorMessage }}
        </p>
      </div>
    </Transition>

    <!-- Actions -->
    <div class="flex items-center gap-4">
      <NuxtButton
        color="neutral"
        variant="outline"
        size="lg"
        icon="i-lucide-refresh-cw"
        class="glass-subtle hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300"
        @click="emit('retry')"
      >
        {{ retryLabel }}
      </NuxtButton>
      <slot name="actions" />
    </div>
  </div>
</template>
