<script setup lang="ts">
definePageMeta({
  layout: 'onboarding'
})

const router = useRouter()

// Typewriter effect
const headline = "Master English Speaking"
const displayedHeadline = ref('')
const showSubtext = ref(false)
const showFeatures = ref(false)
const showCTA = ref(false)

onMounted(() => {
  // Typewriter effect for headline
  let index = 0
  const typeInterval = setInterval(() => {
    if (index < headline.length) {
      displayedHeadline.value += headline[index]
      index++
    } else {
      clearInterval(typeInterval)
      setTimeout(() => {
        showSubtext.value = true
        setTimeout(() => {
          showFeatures.value = true
          setTimeout(() => {
            showCTA.value = true
          }, 300)
        }, 300)
      }, 200)
    }
  }, 40)
})

function handleStart() {
  router.push('/goal-selection')
}
</script>

<template>
  <div class="text-center space-y-10">
    <!-- Animated illustration -->
    <div class="relative mx-auto w-56 h-56 mb-10">
      <!-- Outer glow ring - animated -->
      <div class="absolute inset-0 rounded-full bg-linear-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 animate-spin-slow" />
      <div class="absolute inset-2 rounded-full bg-linear-to-r from-primary-400/15 to-secondary-400/15 animate-glow-pulse" />
      
      <!-- Glass outer ring -->
      <div class="absolute inset-4 rounded-full glass-subtle" />
      
      <!-- Main gradient circle -->
      <div class="absolute inset-8 rounded-full gradient-primary shadow-2xl glow-primary flex items-center justify-center overflow-hidden">
        <!-- Animated wave inside -->
        <div class="absolute inset-0">
          <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-white/10 rounded-t-full animate-float-slow" />
        </div>
        
        <!-- Icon -->
        <span class="i-lucide-mic w-16 h-16 text-white relative z-10 drop-shadow-lg" />
      </div>
      
      <!-- Floating accent elements -->
      <div class="absolute -top-2 -right-2 animate-float">
        <div class="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center shadow-lg glow-secondary">
          <span class="i-lucide-sparkles w-5 h-5 text-white" />
        </div>
      </div>
      <div class="absolute -bottom-1 -left-3 animate-float" style="animation-delay: -2s">
        <div class="w-8 h-8 rounded-lg bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
          <span class="i-lucide-star w-4 h-4 text-white" />
        </div>
      </div>
      <div class="absolute top-1/2 -right-6 animate-float-slow" style="animation-delay: -1s">
        <div class="w-6 h-6 rounded-full bg-linear-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-md">
          <span class="i-lucide-heart w-3 h-3 text-white" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="space-y-5">
      <!-- Headline with typewriter effect -->
      <h1 class="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white tracking-tight min-h-[1.2em]">
        <span class="bg-linear-to-r from-gray-900 via-primary-600 to-gray-900 dark:from-white dark:via-primary-400 dark:to-white bg-clip-text text-transparent">
          {{ displayedHeadline }}
        </span>
        <span 
          class="inline-block w-1 h-12 bg-primary-500 ml-1 animate-pulse rounded-full"
          :class="{ 'opacity-0': displayedHeadline.length === headline.length }"
        />
      </h1>

      <!-- Subtext -->
      <Transition
        enter-active-class="transition-all duration-700 ease-out"
        enter-from-class="opacity-0 translate-y-6 blur-sm"
        enter-to-class="opacity-100 translate-y-0 blur-0"
      >
        <p v-if="showSubtext" class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto leading-relaxed">
          Your AI-powered companion for
          <span class="text-primary-600 dark:text-primary-400 font-semibold">confident</span>,
          <span class="text-secondary-600 dark:text-secondary-400 font-semibold">fluent</span>
          conversations
        </p>
      </Transition>
    </div>

    <!-- Features -->
    <Transition
      enter-active-class="transition-all duration-700 delay-100 ease-out"
      enter-from-class="opacity-0 translate-y-6"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="showFeatures" class="flex flex-wrap justify-center gap-4 text-sm">
        <div class="flex items-center gap-2 px-4 py-2 rounded-full glass-subtle">
          <span class="i-lucide-check-circle w-5 h-5 text-green-500" />
          <span class="text-gray-700 dark:text-gray-300">Personalized lessons</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 rounded-full glass-subtle">
          <span class="i-lucide-check-circle w-5 h-5 text-green-500" />
          <span class="text-gray-700 dark:text-gray-300">Real-time feedback</span>
        </div>
        <div class="flex items-center gap-2 px-4 py-2 rounded-full glass-subtle">
          <span class="i-lucide-check-circle w-5 h-5 text-green-500" />
          <span class="text-gray-700 dark:text-gray-300">AI conversation partner</span>
        </div>
      </div>
    </Transition>

    <!-- CTA Button -->
    <Transition
      enter-active-class="transition-all duration-700 delay-200 ease-out"
      enter-from-class="opacity-0 scale-90"
      enter-to-class="opacity-100 scale-100"
    >
      <div v-if="showCTA" class="pt-6 space-y-4">
        <button
          class="group relative inline-flex items-center gap-3 px-10 py-5 text-lg font-semibold text-white rounded-2xl gradient-primary shadow-xl glow-primary hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          @click="handleStart"
        >
          <!-- Shimmer effect -->
          <div class="absolute inset-0 rounded-2xl overflow-hidden">
            <div class="absolute inset-0 animate-shimmer opacity-30" />
          </div>
          
          <span class="relative">Get Started</span>
          <span class="relative i-lucide-arrow-right w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
          <span class="i-lucide-shield-check w-4 h-4 text-green-500" />
          Free to start • No credit card required
        </p>
      </div>
    </Transition>
  </div>
</template>
