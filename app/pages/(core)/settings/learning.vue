<script setup lang="ts">
const toast = useToast()
const isSaving = ref(false)

const preferences = reactive({
  dailyGoal: 15,
  practiceTypes: ['speaking', 'vocabulary'],
  difficulty: 'auto',
  reminderTime: '08:00'
})

const PRACTICE_OPTIONS = [
  { label: 'Speaking', value: 'speaking' },
  { label: 'Writing', value: 'writing' },
  { label: 'Vocabulary', value: 'vocabulary' },
  { label: 'Listening', value: 'listening' }
]

async function savePreferences() {
  isSaving.value = true
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))
  isSaving.value = false
  
  toast.add({
    title: 'Preferences Updated',
    description: 'Your learning preferences have been saved.',
    icon: 'i-lucide-check-circle',
    color: 'success'
  })
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Learning Preferences</h2>
    
    <UCard :ui="{ body: { padding: 'p-6' } }">
      <div class="space-y-8">
        <!-- Daily Goal -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <label class="text-base font-semibold text-gray-900 dark:text-white">Daily Goal</label>
              <p class="text-sm text-gray-500">How much time do you want to spend learning?</p>
            </div>
            <span class="text-xl font-bold text-primary-600 dark:text-primary-400">{{ preferences.dailyGoal }} min</span>
          </div>
          <URange
            v-model="preferences.dailyGoal"
            :min="5"
            :max="60"
            :step="5"
          />
          <div class="flex justify-between text-xs text-gray-400 font-medium">
            <span>Casual (5m)</span>
            <span>Serious (30m)</span>
            <span>Intense (60m)</span>
          </div>
        </div>

        <hr class="border-gray-100 dark:border-gray-800" />

        <!-- Practice Types -->
        <div class="space-y-3">
          <label class="text-base font-semibold text-gray-900 dark:text-white">Focus Skills</label>
          <p class="text-sm text-gray-500 pb-2">Select the skills you want to prioritize in your daily mix.</p>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              v-for="type in PRACTICE_OPTIONS"
              :key="type.value"
              class="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all"
              :class="preferences.practiceTypes.includes(type.value)
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-700 dark:text-primary-400' 
                : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 text-gray-500 hover:border-gray-300 dark:hover:border-gray-700'"
              @click="() => {
                if (preferences.practiceTypes.includes(type.value)) {
                  preferences.practiceTypes = preferences.practiceTypes.filter((t: string) => t !== type.value)
                } else {
                  preferences.practiceTypes.push(type.value)
                }
              }"
            >
              <!-- Simple Icon logic based on value -->
              <NuxtIcon v-if="type.value === 'speaking'" name="i-lucide-mic" class="w-6 h-6" />
              <NuxtIcon v-else-if="type.value === 'writing'" name="i-lucide-pencil" class="w-6 h-6" />
              <NuxtIcon v-else-if="type.value === 'vocabulary'" name="i-lucide-book-a" class="w-6 h-6" />
              <NuxtIcon v-else name="i-lucide-headphones" class="w-6 h-6" />
              
              <span class="text-sm font-medium">{{ type.label }}</span>
            </button>
          </div>
        </div>

        <hr class="border-gray-100 dark:border-gray-800" />

        <!-- Difficulty -->
        <div class="flex items-center justify-between">
          <div>
            <label class="text-base font-semibold text-gray-900 dark:text-white">Difficulty Level</label>
            <p class="text-sm text-gray-500">Let AI adjust difficulty automatically based on your performance.</p>
          </div>
          <div class="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              v-for="opt in ['auto', 'manual']"
              :key="opt"
              class="px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors"
              :class="preferences.difficulty === opt ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
              @click="preferences.difficulty = opt"
            >
              {{ opt }}
            </button>
          </div>
        </div>

        <!-- Reminder Time -->
        <div class="flex items-center justify-between">
          <div>
            <label class="text-base font-semibold text-gray-900 dark:text-white">Daily Reminder</label>
            <p class="text-sm text-gray-500">When should we remind you to practice?</p>
          </div>
          <input
            type="time"
            v-model="preferences.reminderTime"
            class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>

        <!-- Update Button -->
        <div class="flex justify-end pt-4">
            <UButton 
                size="lg" 
                color="primary" 
                :loading="isSaving"
                @click="savePreferences"
                icon="i-lucide-save"
            >
                Update Preferences
            </UButton>
        </div>

      </div>
    </UCard>
  </div>
</template>
