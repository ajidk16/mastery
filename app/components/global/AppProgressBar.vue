<script setup lang="ts">
interface Props {
  modelValue?: number
  max?: number
  steps?: string[]
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success'
  animated?: boolean
  glow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 100,
  showPercentage: false,
  size: 'md',
  color: 'primary',
  animated: true,
  glow: true
})

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.modelValue / props.max) * 100))
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'h-1.5'
    case 'lg': return 'h-4'
    default: return 'h-2.5'
  }
})

const gradientClasses = computed(() => {
  switch (props.color) {
    case 'secondary': return 'from-secondary-400 via-secondary-500 to-teal-600'
    case 'success': return 'from-green-400 via-green-500 to-emerald-600'
    default: return 'from-primary-400 via-primary-500 to-indigo-600'
  }
})

const glowColor = computed(() => {
  switch (props.color) {
    case 'secondary': return 'bg-secondary-500'
    case 'success': return 'bg-green-500'
    default: return 'bg-primary-500'
  }
})
</script>

<template>
  <div class="space-y-3">
    <!-- Steps indicator (if provided) -->
    <div v-if="steps?.length" class="flex items-center justify-between text-sm">
      <span
        v-for="(step, index) in steps"
        :key="step"
        class="font-medium transition-all duration-500"
        :class="[
          index < modelValue
            ? 'text-primary-600 dark:text-primary-400'
            : index === modelValue
              ? 'text-gray-900 dark:text-white font-semibold'
              : 'text-gray-400 dark:text-gray-500'
        ]"
      >
        {{ step }}
      </span>
    </div>

    <!-- Progress bar container -->
    <div class="relative">
      <!-- Track with glass effect -->
      <div
        class="w-full rounded-full overflow-hidden glass-subtle"
        :class="sizeClasses"
      >
        <!-- Progress fill with gradient -->
        <div
          class="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
          :style="{ width: `${percentage}%` }"
        >
          <!-- Gradient background -->
          <div :class="`absolute inset-0 bg-linear-to-r ${gradientClasses}`" />
          
          <!-- Shimmer effect -->
          <div 
            v-if="animated && percentage > 0 && percentage < 100" 
            class="absolute inset-0 animate-shimmer opacity-40"
          />
        </div>
      </div>

      <!-- Glow effect under progress -->
      <div 
        v-if="glow && percentage > 5"
        class="absolute -bottom-1 h-3 blur-md rounded-full opacity-40 transition-all duration-700 ease-out"
        :class="glowColor"
        :style="{ width: `${percentage}%` }"
      />

      <!-- Percentage label -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div
          v-if="showPercentage"
          class="absolute -top-7 text-xs font-bold px-2 py-1 rounded-lg glass-subtle transition-all duration-700 ease-out"
          :style="{ left: `calc(${Math.min(percentage, 95)}% - 20px)` }"
        >
          {{ Math.round(percentage) }}%
        </div>
      </Transition>
    </div>

    <!-- Step dots indicator -->
    <div v-if="steps?.length" class="flex justify-between px-1">
      <div
        v-for="(_, index) in steps"
        :key="index"
        class="relative"
      >
        <div
          class="w-3 h-3 rounded-full transition-all duration-500"
          :class="[
            index <= modelValue
              ? 'bg-primary-500 scale-100'
              : 'bg-gray-300 dark:bg-gray-600 scale-75'
          ]"
        />
        <!-- Glow for completed steps -->
        <div
          v-if="index <= modelValue"
          class="absolute inset-0 bg-primary-500 rounded-full blur-sm opacity-50"
        />
      </div>
    </div>
  </div>
</template>
