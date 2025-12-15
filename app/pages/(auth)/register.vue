<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const isLoading = ref(false)
const showPassword = ref(false)

const passwordStrength = computed(() => {
  const pwd = password.value
  if (!pwd) return { score: 0, label: '', color: '', gradient: '' }
  
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[a-z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  
  if (score <= 2) return { score, label: 'Weak', color: 'text-red-500', gradient: 'from-red-500 to-red-400' }
  if (score <= 3) return { score, label: 'Fair', color: 'text-yellow-500', gradient: 'from-yellow-500 to-yellow-400' }
  if (score <= 4) return { score, label: 'Good', color: 'text-green-400', gradient: 'from-green-500 to-green-400' }
  return { score, label: 'Strong', color: 'text-green-500', gradient: 'from-green-500 to-emerald-400' }
})

const passwordsMatch = computed(() => {
  if (!confirmPassword.value) return true
  return password.value === confirmPassword.value
})

async function handleRegister() {
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
        Create your account
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-lg">
        Start your English mastery journey today
      </p>
    </div>

    <!-- Glass Form Card -->
    <div class="glass-card rounded-3xl p-8 hover-lift">
      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Name -->
        <div class="animate-slide-up opacity-0 stagger-1" style="animation-fill-mode: forwards">
          <NuxtFormField label="Full name" name="name" size="lg">
            <NuxtInput
              id="name"
              v-model="name"
              type="text"
              placeholder="John Doe"
              icon="i-lucide-user"
              size="lg"
              class="w-full"
              required
            />
          </NuxtFormField>
        </div>

        <!-- Email -->
        <div class="animate-slide-up opacity-0 stagger-2" style="animation-fill-mode: forwards">
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
        </div>

        <!-- Password -->
        <div class="animate-slide-up opacity-0 stagger-3" style="animation-fill-mode: forwards">
          <NuxtFormField label="Password" name="password" size="lg">
            <NuxtInput
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Create a strong password"
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
          
          <!-- Password strength indicator -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div v-if="password" class="space-y-2 pt-2">
              <div class="flex gap-1.5">
                <div
                  v-for="i in 5"
                  :key="i"
                  class="h-1.5 flex-1 rounded-full transition-all duration-500 ease-out"
                  :class="i <= passwordStrength.score ? `bg-linear-to-r ${passwordStrength.gradient}` : 'bg-gray-200 dark:bg-gray-700'"
                />
              </div>
              <p class="text-xs font-medium" :class="passwordStrength.color">
                {{ passwordStrength.label }} password
              </p>
            </div>
          </Transition>
        </div>

        <!-- Confirm Password -->
        <div class="animate-slide-up opacity-0 stagger-4" style="animation-fill-mode: forwards">
          <NuxtFormField label="Confirm password" name="confirmPassword" size="lg">
            <NuxtInput
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              icon="i-lucide-lock"
              size="lg"
              class="w-full"
              required
              :color="!passwordsMatch ? 'error' : undefined"
            />
          </NuxtFormField>
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <p v-if="!passwordsMatch" class="text-xs text-red-500 flex items-center gap-1 mt-1">
              <span class="i-lucide-alert-circle w-3 h-3" />
              Passwords do not match
            </p>
          </Transition>
        </div>

        <!-- Terms -->
        <div class="flex items-start gap-3 animate-slide-up opacity-0 stagger-5" style="animation-fill-mode: forwards">
          <NuxtCheckbox id="terms" v-model="agreeTerms" class="mt-0.5" />
          <label for="terms" class="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none leading-relaxed">
            I agree to the
            <NuxtLink to="/terms" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">Terms of Service</NuxtLink>
            and
            <NuxtLink to="/privacy" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">Privacy Policy</NuxtLink>
          </label>
        </div>

        <!-- Submit -->
        <NuxtButton
          type="submit"
          block
          size="xl"
          :loading="isLoading"
          :disabled="!agreeTerms || !passwordsMatch"
          class="mt-6 gradient-primary border-0 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
        >
          <span class="flex items-center gap-2">
            Create account
            <span class="i-lucide-sparkles w-5 h-5" />
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
            Or sign up with
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

    <!-- Login link -->
    <p class="text-center text-sm text-gray-600 dark:text-gray-400">
      Already have an account?
      <NuxtLink
        to="/login"
        class="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors ml-1"
      >
        Sign in
      </NuxtLink>
    </p>
  </div>
</template>
