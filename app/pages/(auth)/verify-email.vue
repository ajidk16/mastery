<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const route = useRoute()
const code = ref(['', '', '', '', '', ''])
const isLoading = ref(false)
const isVerified = ref(false)
const resendCooldown = ref(0)

const inputRefs = ref<HTMLInputElement[]>([])

const email = computed(() => route.query.email || 'your email')
const isComplete = computed(() => code.value.every(digit => digit !== ''))

function handleInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value

  if (value.length > 1) {
    code.value[index] = value.slice(-1)
    return
  }

  code.value[index] = value

  if (value && index < 5) {
    inputRefs.value[index + 1]?.focus()
  }
}

function handleKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !code.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  const paste = event.clipboardData?.getData('text') || ''
  const digits = paste.replace(/\D/g, '').slice(0, 6)

  digits.split('').forEach((digit, index) => {
    if (index < 6) code.value[index] = digit
  })

  inputRefs.value[Math.min(digits.length, 5)]?.focus()
}

async function handleVerify() {
  if (!isComplete.value) return

  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
  isVerified.value = true
}

async function handleResend() {
  if (resendCooldown.value > 0) return

  resendCooldown.value = 60

  const interval = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}

watch(isComplete, (complete) => {
  if (complete) {
    handleVerify()
  }
})
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center space-y-3">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-card mb-4">
        <div class="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center glow-primary animate-glow-pulse">
          <span class="i-lucide-mail-check w-7 h-7 text-white" />
        </div>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
        Verify your email
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-lg">
        We've sent a code to <span class="font-semibold text-gray-900 dark:text-white">{{ email }}</span>
      </p>
    </div>

    <!-- Glass Card -->
    <div class="glass-card rounded-3xl p-8 hover-lift">
      <!-- Success state -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        mode="out-in"
      >
        <div v-if="isVerified" class="text-center space-y-6 py-4">
          <div class="relative inline-flex">
            <div class="absolute inset-0 -m-4 rounded-full border-4 border-green-500/20 animate-ping" style="animation-duration: 1.5s" />
            <div class="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-linear-to-br from-green-400 to-emerald-500 shadow-xl glow-secondary">
              <span class="i-lucide-check w-12 h-12 text-white" />
            </div>
          </div>
          <div class="space-y-2">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Email verified!
            </h2>
            <p class="text-gray-500 dark:text-gray-400">
              Your email has been successfully verified
            </p>
          </div>
          <NuxtButton
            to="/welcome"
            size="xl"
            class="gradient-primary border-0 shadow-lg glow-primary hover:shadow-xl transition-all duration-300"
          >
            <span class="flex items-center gap-2">
              Continue to onboarding
              <span class="i-lucide-arrow-right w-5 h-5" />
            </span>
          </NuxtButton>
        </div>

        <!-- Verification form -->
        <div v-else class="space-y-8">
          <!-- Code input -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              Enter verification code
            </label>
            <div class="flex gap-3 justify-center" @paste="handlePaste">
              <input
                v-for="(_, index) in code"
                :key="index"
                :ref="el => inputRefs[index] = el as HTMLInputElement"
                v-model="code[index]"
                type="text"
                inputmode="numeric"
                maxlength="1"
                class="w-14 h-16 text-center text-2xl font-bold rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-600"
                :class="{ 'ring-2 ring-primary-500 border-primary-500 bg-white dark:bg-gray-800': code[index] }"
                @input="handleInput(index, $event)"
                @keydown="handleKeydown(index, $event)"
              />
            </div>
          </div>

          <!-- Loading indicator -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
          >
            <div v-if="isLoading" class="flex justify-center">
              <div class="w-full max-w-xs">
                <div class="h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <div class="h-full w-full gradient-primary origin-left animate-pulse" />
                </div>
                <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Verifying...
                </p>
              </div>
            </div>
          </Transition>

          <!-- Resend -->
          <div class="text-center">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Didn't receive the code?
              <button
                v-if="resendCooldown <= 0"
                class="text-primary-600 dark:text-primary-400 hover:underline font-semibold ml-1"
                @click="handleResend"
              >
                Resend
              </button>
              <span v-else class="text-gray-400 ml-1">
                Resend in {{ resendCooldown }}s
              </span>
            </p>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Back to login -->
    <div class="text-center">
      <NuxtLink
        to="/login"
        class="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2 rounded-xl glass-subtle hover:bg-white/60 dark:hover:bg-gray-800/60"
      >
        <span class="i-lucide-arrow-left w-4 h-4" />
        Back to login
      </NuxtLink>
    </div>
  </div>
</template>
