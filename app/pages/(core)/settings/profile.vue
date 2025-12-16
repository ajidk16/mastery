<script setup lang="ts">
const toast = useToast()
const isSaving = ref(false)

// Mock initial data - in a real app this would come from an API
const profile = reactive({
  name: 'User Name',
  username: 'username',
  email: 'user@example.com',
  isEmailVerified: true,
  avatarUrl: '',
  level: 'B1',
  goal: 'Fluent conversation for travel'
})

// Simulate fetching data
onMounted(async () => {
    // This makes it feel dynamic
    // In production: await refresh()
})

async function saveProfile() {
  isSaving.value = true
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  isSaving.value = false
  
  toast.add({
    title: 'Profile Updated',
    description: 'Your changes have been saved successfully.',
    icon: 'i-lucide-check-circle',
    color: 'success'
  })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
    </div>

    <UCard :ui="{ body: { padding: 'p-0 sm:p-0' }, ring: '', shadow: 'shadow-lg shadow-gray-200/50 dark:shadow-none', background: 'bg-white dark:bg-gray-900' }" class="overflow-hidden border border-gray-100 dark:border-gray-800">
      <!-- Header Background -->
      <div class="h-32 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"></div>

      <div class="px-6 pb-6 -mt-12 relative">
        <div class="flex flex-col sm:flex-row items-end sm:items-center gap-6">
          <!-- Avatar -->
          <div class="relative group shrink-0">
            <div class="p-1 rounded-full bg-white dark:bg-gray-900">
              <UAvatar
                :src="profile.avatarUrl"
                :alt="profile.name"
                size="3xl"
                img-class="object-cover"
                class="w-24! h-24! ring-1 ring-gray-100 dark:ring-gray-800"
              />
            </div>
            <button class="absolute bottom-1 right-1 p-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-primary-500 transition-colors shadow-sm cursor-pointer">
              <NuxtIcon name="i-lucide-camera" class="w-4 h-4" />
            </button>
          </div>

          <!-- Name & Info -->
          <div class="flex-1 w-full space-y-2 mb-2">
            <div class="flex items-center justify-between">
              <UInput
                v-model="profile.name"
                variant="none"
                size="xl"
                class="p-0! font-bold text-2xl text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 px-0 placeholder-gray-400"
                :ui="{ padding: { xl: 'px-0 py-1' } }"
                placeholder="Your Name"
              />
              <UButton variant="ghost" color="gray" icon="i-lucide-edit-2" class="opacity-50 hover:opacity-100" />
            </div>

            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span class="flex items-center gap-1.5">
                <NuxtIcon name="i-lucide-at-sign" class="w-3.5 h-3.5" />
                {{ profile.username }}
              </span>
              <span class="w-1 h-1 rounded-full bg-gray-300"></span>
              <span class="flex items-center gap-1.5">
                <NuxtIcon name="i-lucide-trophy" class="w-3.5 h-3.5" />
                {{ profile.level }} Level
              </span>
            </div>
          </div>
        </div>

        <div class="mt-8 grid gap-6">
          <!-- Email -->
          <div class="group p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
              <span v-if="profile.isEmailVerified" class="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <NuxtIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" /> Checked
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-900 dark:text-white font-medium">{{ profile.email }}</span>
              <NuxtIcon name="i-lucide-lock" class="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <!-- Goal -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">My Learning Goal</label>
            <UTextarea
              v-model="profile.goal"
              autoresize
              :rows="2"
              placeholder="Why are you learning English?"
              class="bg-white dark:bg-gray-900"
              :ui="{ color: { white: { outline: 'shadow-none ring-1 ring-gray-200 dark:ring-gray-800 focus:ring-2 focus:ring-primary-500' } } }"
            />
          </div>

          <!-- Update Button -->
          <div class="flex justify-end pt-2">
             <UButton 
                size="lg" 
                color="primary" 
                :loading="isSaving"
                @click="saveProfile"
                icon="i-lucide-save"
             >
                Update Profile
             </UButton>
          </div>

        </div>
      </div>
    </UCard>
  </div>
</template>
