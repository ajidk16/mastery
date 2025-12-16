<script setup lang="ts">
const toast = useToast()
const isSaving = ref(false)

const security = reactive({
  twoFactor: false
})

async function saveSecurity() {
  isSaving.value = true
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))
  isSaving.value = false
  
  toast.add({
    title: 'Security Settings Updated',
    description: 'Your security preferences have been saved.',
    icon: 'i-lucide-check-circle',
    color: 'success'
  })
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Security</h2>
    
    <NuxtCard>
      <div class="space-y-4">
        <NuxtButton variant="outline" block icon="i-lucide-key-round" class="justify-between">
          Change Password
          <NuxtIcon name="i-lucide-chevron-right" class="w-4 h-4" />
        </NuxtButton>
        
        <div class="flex items-center justify-between py-2">
          <div>
            <p class="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
            <p class="text-sm text-gray-500">Add an extra layer of security.</p>
          </div>
          <NuxtSwitch v-model="security.twoFactor" />
        </div>

        <!-- Update Button -->
        <div class="flex justify-end pt-2">
            <NuxtButton 
                size="lg" 
                color="primary" 
                :loading="isSaving"
                @click="saveSecurity"
                icon="i-lucide-save"
            >
                Update Security Settings
            </NuxtButton>
        </div>
      </div>
    </NuxtCard>
  </div>
</template>
