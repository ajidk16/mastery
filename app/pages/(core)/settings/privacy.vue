<script setup lang="ts">
const toast = useToast()
const isSaving = ref(false)

const privacy = reactive({
  audioRecording: true,
  publicProfile: false
})

async function savePrivacy() {
  isSaving.value = true
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))
  isSaving.value = false
  
  toast.add({
    title: 'Privacy Settings Updated',
    description: 'Your privacy settings have been saved.',
    icon: 'i-lucide-check-circle',
    color: 'success'
  })
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Privacy & Data</h2>
    
    <UCard>
      <div class="space-y-6">
        <div class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg flex gap-3">
          <NuxtIcon name="i-lucide-shield-check" class="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div class="space-y-1">
            <p class="text-sm font-medium text-blue-900 dark:text-blue-200">Your data is yours</p>
            <p class="text-xs text-blue-700 dark:text-blue-300">We only use your audio recordings to provide feedback on your pronunciation. They are not used for any other purpose.</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Allow Audio Analysis</p>
            <p class="text-sm text-gray-500">Required for pronunciation feedback.</p>
          </div>
          <UToggle v-model="privacy.audioRecording" color="success" />
        </div>

        <!-- Update Button -->
        <div class="flex justify-end pt-2">
            <UButton 
                size="lg" 
                color="primary" 
                :loading="isSaving"
                @click="savePrivacy"
                icon="i-lucide-save"
            >
                Update Privacy Settings
            </UButton>
        </div>

        <hr class="border-gray-100 dark:border-gray-800" />
        
        <div class="space-y-3">
          <UButton variant="outline" color="gray" block icon="i-lucide-download">Download My Data</UButton>
          <UButton variant="ghost" color="red" block icon="i-lucide-trash-2" class="opacity-75 hover:opacity-100">Delete Account</UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>
