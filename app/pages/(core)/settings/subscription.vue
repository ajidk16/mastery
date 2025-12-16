<script setup lang="ts">
const subscription = reactive({
  plan: 'free', // 'free' | 'pro'
  nextBilling: '2024-01-14',
  price: 9.99
})
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Subscription & Billing</h2>

    <NuxtCard :ui="{ body: { padding: 'p-0 sm:p-0' } }">
      <div class="p-6 space-y-6">
        <!-- Current Plan -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500 uppercase tracking-widest">Current Plan</p>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1 capitalize">{{ subscription.plan }} Plan</h3>
            <p class="text-sm text-gray-500 mt-1" v-if="subscription.plan === 'free'">Upgrade to unlock unlimited practice.</p>
            <p class="text-sm text-gray-500 mt-1" v-else>Next billing on {{ subscription.nextBilling }}</p>
          </div>
          <div v-if="subscription.plan === 'free'" class="hidden sm:block">
            <NuxtButton size="xl" color="primary" icon="i-lucide-zap">Upgrade to Pro</NuxtButton>
          </div>
        </div>
        
        <!-- Feature Comparison (Mini) -->
        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-2">
          <div class="flex items-center gap-2">
            <NuxtIcon name="i-lucide-check" class="w-4 h-4 text-green-500" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Basic Vocabulary & Grammar</span>
          </div>
          <div class="flex items-center gap-2">
            <NuxtIcon name="i-lucide-check" class="w-4 h-4 text-green-500" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Unlimited Speaking Practice (Pro)</span>
          </div>
          <div class="flex items-center gap-2">
            <NuxtIcon name="i-lucide-check" class="w-4 h-4 text-green-500" />
            <span class="text-sm text-gray-700 dark:text-gray-300">AI Pronunciation Coach (Pro)</span>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <NuxtButton v-if="subscription.plan === 'free'" block size="lg" color="primary" class="sm:hidden">Upgrade to Pro</NuxtButton>
          <NuxtButton variant="link" color="gray" block class="text-gray-500">Manage Subscription</NuxtButton>
        </div>
      </div>
    </NuxtCard>
  </div>
</template>
