<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const showPassword = ref(false)

async function handleLogin() {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isLoading.value = false
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center space-y-3">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
        Welcome back
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-lg">
        Sign in to continue your learning journey
      </p>
    </div>

    <!-- Glass Form Card -->
    <div class="glass-card rounded-3xl p-8 hover-lift">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email -->
        <NuxtFormField label="Email address" name="email" size="lg">
          <NuxtInput
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            icon="i-lucide-mail"
            size="lg"
            class="w-full"
            required
          />
        </NuxtFormField>

        <!-- Password -->
        <NuxtFormField name="password" size="lg">
          <!-- <template #label> -->
            <label for="password" class="flex items-center justify-between w-full mb-1">
              <span>Password</span>
              <NuxtLink
                to="/forgot-password"
                class="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
              >
                Forgot password?
              </NuxtLink>
            </label>
          <!-- </template> -->
          <NuxtInput
            id="password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            icon="i-lucide-lock"
            size="lg"
            class="w-full"
            required
          >
            <template #trailing>
              <NuxtButton
                type="button"
                color="neutral"
                variant="ghost"
                size="xs"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                @click="showPassword = !showPassword"
              />
            </template>
          </NuxtInput>
        </NuxtFormField>

        <!-- Remember me -->
        <div class="flex items-center gap-3">
          <NuxtCheckbox id="remember" v-model="rememberMe" />
          <label for="remember" class="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
            Remember me for 30 days
          </label>
        </div>

        <!-- Submit -->
        <NuxtButton
          type="submit"
          block
          size="xl"
          :loading="isLoading"
          class="mt-4 gradient-primary border-0 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
        >
          <span class="flex items-center gap-2">
            Sign in
            <span class="i-lucide-arrow-right w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </NuxtButton>
      </form>

      <!-- Divider -->
      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200/50 dark:border-gray-700/50" />
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-full">
            Or continue with
          </span>
        </div>
      </div>

      <!-- Social login -->
      <div class="grid grid-cols-2 gap-4">
        <NuxtButton
          color="neutral"
          variant="outline"
          size="lg"
          block
          class="hover:bg-white/60 dark:hover:bg-gray-700/40 transition-all duration-300"
        >
          <span class="i-simple-icons-google w-5 h-5 mr-2" />
          Google
        </NuxtButton>
        <NuxtButton
          color="neutral"
          variant="outline"
          size="lg"
          block
          class="hover:bg-white/60 dark:hover:bg-gray-700/40 transition-all duration-300"
        >
          <span class="i-simple-icons-apple w-5 h-5 mr-2" />
          Apple
        </NuxtButton>
      </div>
    </div>

    <!-- Register link -->
    <p class="text-center text-sm text-gray-600 dark:text-gray-400">
      Don't have an account?
      <NuxtLink
        to="/register"
        class="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors ml-1"
      >
        Sign up for free
      </NuxtLink>
    </p>
  </div>
</template>
