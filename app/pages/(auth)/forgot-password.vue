<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const isLoading = ref(false)
const isSubmitted = ref(false)

async function handleSubmit() {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
  isSubmitted.value = true
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center space-y-3">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-card mb-4">
        <div class="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center glow-primary">
          <span class="i-lucide-key-round w-7 h-7 text-white" />
        </div>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
        Forgot password?
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-lg">
        No worries, we'll send you reset instructions
      </p>
    </div>

    <!-- Glass Form Card -->
    <div class="glass-card rounded-3xl p-8 hover-lift">
      <!-- Success state -->
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        mode="out-in"
      >
        <div v-if="isSubmitted" class="text-center space-y-6 py-4">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-green-400 to-emerald-500 shadow-lg glow-secondary">
            <span class="i-lucide-mail-check w-10 h-10 text-white" />
          </div>
          <div class="space-y-2">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Check your email
            </h2>
            <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              We've sent a password reset link to
              <span class="font-semibold text-gray-900 dark:text-white block mt-1">{{ email }}</span>
            </p>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 pt-2">
            Didn't receive the email?
            <button
              class="text-primary-600 dark:text-primary-400 hover:underline font-semibold ml-1"
              @click="isSubmitted = false"
            >
              Click to resend
            </button>
          </p>
        </div>

        <!-- Form state -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-6">
          <NuxtFormField label="Email address" name="email" size="lg">
            <NuxtInput
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              icon="i-lucide-mail"
              size="lg"
              class="w-full"
              required
            />
          </NuxtFormField>

          <NuxtButton
            type="submit"
            block
            size="xl"
            :loading="isLoading"
            class="gradient-primary border-0 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
          >
            <span class="flex items-center gap-2">
              Reset password
              <span class="i-lucide-send w-5 h-5" />
            </span>
          </NuxtButton>
        </form>
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
