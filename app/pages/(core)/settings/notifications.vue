<script setup lang="ts">
const toast = useToast()
const isSaving = ref(false)

const notifications = reactive({
  daily: true,
  speaking: false,
  progress: false,
  updates: false
})

async function saveNotifications() {
  isSaving.value = true
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))
  isSaving.value = false
  
  toast.add({
    title: 'Notifications Updated',
    description: 'Your notification preferences have been saved.',
    icon: 'i-lucide-check-circle',
    color: 'success'
  })
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
    
    <NuxtCard>
      <div class="divide-y divide-gray-100 dark:divide-gray-800">
        <div class="flex items-center justify-between py-4 first:pt-0">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Daily Reminder</p>
            <p class="text-sm text-gray-500">Get a friendly nudge to reach your daily goal.</p>
          </div>
          <NuxtSwitch v-model="notifications.daily" />
        </div>
        <div class="flex items-center justify-between py-4">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Speaking Prompts</p>
            <p class="text-sm text-gray-500">Receive random topics to practice speaking.</p>
          </div>
          <NuxtSwitch v-model="notifications.speaking" />
        </div>
        <div class="flex items-center justify-between py-4">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Weekly Progress</p>
            <p class="text-sm text-gray-500">A summary of your achievements sent every Monday.</p>
          </div>
          <NuxtSwitch v-model="notifications.progress" />
        </div>
        <div class="flex items-center justify-between py-4 last:pb-0">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Product Updates</p>
            <p class="text-sm text-gray-500">News about new features and improvements.</p>
          </div>
          <NuxtSwitch v-model="notifications.updates" />
        </div>
      </div>

       <!-- Update Button -->
      <div class="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
         <NuxtButton 
            size="lg" 
            color="primary" 
            :loading="isSaving"
            @click="saveNotifications"
            icon="i-lucide-save"
        >
            Update Notifications
        </NuxtButton>
      </div>
    </NuxtCard>
  </div>
</template>
