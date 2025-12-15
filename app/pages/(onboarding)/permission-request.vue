<script setup lang="ts">
definePageMeta({
  layout: 'onboarding'
})

const router = useRouter()

const micPermission = ref<'pending' | 'granted' | 'denied'>('pending')
const isRequesting = ref(false)
const showSkipConfirm = ref(false)

async function requestMicPermission() {
  isRequesting.value = true
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach(track => track.stop())
    micPermission.value = 'granted'
  } catch (error) {
    micPermission.value = 'denied'
  }
  
  isRequesting.value = false
}

function handleContinue() {
  router.push('/')
}

function handleSkip() {
  showSkipConfirm.value = true
}

function confirmSkip() {
  showSkipConfirm.value = false
  router.push('/')
}
</script>

<template>
  <div class="space-y-10">
    <!-- Header -->
    <div class="text-center space-y-3 animate-slide-up">
      <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
        Enable <span class="text-primary-600 dark:text-primary-400">microphone</span>
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        To practice speaking, we need access to your microphone
      </p>
    </div>

    <!-- Mic illustration with animated states -->
    <div class="flex justify-center">
      <div class="relative w-48 h-48">
        <!-- Outer animated rings -->
        <Transition
          enter-active-class="transition-all duration-700 ease-out"
          enter-from-class="opacity-0 scale-75"
          enter-to-class="opacity-100 scale-100"
        >
          <template v-if="micPermission === 'granted'">
            <div class="absolute inset-0">
              <div class="absolute inset-0 rounded-full border-4 border-green-500/20 animate-ping" style="animation-duration: 2s" />
              <div class="absolute inset-4 rounded-full border-4 border-green-500/30 animate-ping" style="animation-duration: 2s; animation-delay: 0.5s" />
            </div>
          </template>
        </Transition>

        <!-- Glowing background -->
        <div
          class="absolute inset-0 rounded-full blur-2xl transition-all duration-700"
          :class="[
            micPermission === 'granted' ? 'bg-green-500/30' :
            micPermission === 'denied' ? 'bg-red-500/30' :
            'bg-primary-500/20 animate-glow-pulse'
          ]"
        />

        <!-- Glass outer ring -->
        <div class="absolute inset-4 rounded-full glass-card" />

        <!-- Main icon circle -->
        <div
          class="absolute inset-10 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700"
          :class="[
            micPermission === 'granted' ? 'bg-linear-to-br from-green-400 to-emerald-500 glow-secondary' :
            micPermission === 'denied' ? 'bg-linear-to-br from-red-400 to-red-500' :
            'gradient-primary glow-primary'
          ]"
        >
          <NuxtIcon
            class="w-14 h-14 text-white transition-transform duration-500"
            :name="
              micPermission === 'granted' ? 'i-lucide-check' :
              micPermission === 'denied' ? 'i-lucide-mic-off' :
              'i-lucide-mic'
            "
            :class="{
              'scale-110': micPermission === 'granted',
              'animate-float-slow': micPermission === 'pending'
            }"
          />
        </div>
      </div>
    </div>

    <!-- Status content -->
    <div class="text-center space-y-6">
      <!-- Pending state -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        mode="out-in"
      >
        <div v-if="micPermission === 'pending'" key="pending" class="space-y-8">
          <!-- Benefits card -->
          <div class="p-6 rounded-3xl glass-card max-w-md mx-auto">
            <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
              <span class="i-lucide-info w-5 h-5 text-primary-500" />
              Why we need this
            </h3>
            <ul class="space-y-3 text-left">
              <li class="flex items-start gap-3 p-3 rounded-xl glass-subtle">
                <div class="w-8 h-8 rounded-lg bg-linear-to-br from-primary-500 to-indigo-600 flex items-center justify-center shrink-0">
                  <NuxtIcon name="i-lucide-mic" class="w-4 h-4 text-white" />
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-300">Practice speaking with AI tutor</span>
              </li>
              <li class="flex items-start gap-3 p-3 rounded-xl glass-subtle">
                <div class="w-8 h-8 rounded-lg bg-linear-to-br from-secondary-500 to-teal-600 flex items-center justify-center shrink-0">
                  <NuxtIcon name="i-lucide-check-circle" class="w-4 h-4 text-white" />
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-300">Get real-time pronunciation feedback</span>
              </li>
              <li class="flex items-start gap-3 p-3 rounded-xl glass-subtle">
                <div class="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500 to-violet-600 flex items-center justify-center shrink-0">
                  <NuxtIcon name="i-lucide-trending-up" class="w-4 h-4 text-white" />
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-300">Track your fluency progress</span>
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <button
              :disabled="isRequesting"
              class="w-full group relative flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-2xl gradient-primary shadow-xl glow-primary hover:shadow-2xl transition-all duration-300 overflow-hidden disabled:opacity-70"
              @click="requestMicPermission"
            >
              <div class="absolute inset-0 animate-shimmer opacity-30" />
              <NuxtIcon v-if="isRequesting" name="i-lucide-loader-2" class="w-6 h-6 animate-spin" />
              <NuxtIcon v-else name="i-lucide-mic" class="w-6 h-6" />
              <span class="relative">{{ isRequesting ? 'Requesting...' : 'Enable Microphone' }}</span>
            </button>

            <button
              class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors px-4 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50"
              @click="handleSkip"
            >
              Skip for now
            </button>
          </div>
        </div>

        <!-- Granted state -->
        <div v-else-if="micPermission === 'granted'" key="granted" class="space-y-8">
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">
              🎉 Microphone enabled!
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              You're all set to start practicing
            </p>
          </div>

          <button
            class="w-full group relative flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white rounded-2xl bg-linear-to-br from-green-400 to-emerald-500 shadow-xl glow-secondary hover:shadow-2xl transition-all duration-300 overflow-hidden"
            @click="handleContinue"
          >
            <div class="absolute inset-0 animate-shimmer opacity-30" />
            <span class="relative">Start Learning</span>
            <NuxtIcon name="i-lucide-arrow-right" class="relative w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <!-- Denied state -->
        <div v-else key="denied" class="space-y-8">
          <div class="p-6 rounded-3xl bg-red-50/80 dark:bg-red-950/30 backdrop-blur-sm border border-red-200/50 dark:border-red-800/30 max-w-md mx-auto">
            <h3 class="font-bold text-red-600 dark:text-red-400 mb-3 flex items-center justify-center gap-2">
              <NuxtIcon name="i-lucide-alert-circle" class="w-5 h-5" />
              Microphone access denied
            </h3>
            <p class="text-sm text-red-600/80 dark:text-red-400/80">
              To enable later, go to your browser settings and allow microphone access for this site.
            </p>
          </div>

          <div class="space-y-4">
            <button
              class="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass-subtle hover:bg-white/70 dark:hover:bg-gray-800/70 text-gray-700 dark:text-gray-200 font-semibold transition-all duration-300"
              @click="requestMicPermission"
            >
              <NuxtIcon name="i-lucide-refresh-cw" class="w-5 h-5" />
              Try Again
            </button>

            <button
              class="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl gradient-primary text-white font-semibold shadow-lg transition-all duration-300"
              @click="handleContinue"
            >
              Continue without microphone
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Skip confirmation modal -->
    <AppModal
      v-model="showSkipConfirm"
      title="Skip microphone setup?"
      size="sm"
    >
      <template #body>
        <p class="text-gray-600 dark:text-gray-300">
          Without microphone access, you won't be able to practice speaking. You can enable it later in settings.
        </p>
      </template>

      <template #footer>
        <div class="flex gap-3 justify-end">
          <NuxtButton
            color="neutral"
            variant="ghost"
            @click="showSkipConfirm = false"
          >
            Go back
          </NuxtButton>
          <NuxtButton 
            class="gradient-primary border-0"
            @click="confirmSkip"
          >
            Skip anyway
          </NuxtButton>
        </div>
      </template>
    </AppModal>
  </div>
</template>
