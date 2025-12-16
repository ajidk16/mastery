<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const { getWordById } = useVocabulary()

const word = computed(() => getWordById(route.params.slug as string))

// Redirect if not found (simple handling)
if (!word.value) {
  // In a real app, maybe navigateTo('/vocabulary/list')
}

// Mock play audio
const isPlaying = ref(false)
function playAudio() {
  isPlaying.value = true
  setTimeout(() => isPlaying.value = false, 1500)
}
</script>

<template>
  <div v-if="word" class="max-w-4xl mx-auto space-y-8 animate-fade-in">
    <!-- Breadcrumb / Back -->
    <div class="flex items-center gap-2 text-sm text-gray-500">
      <NuxtLink to="/vocabulary/list" class="hover:text-primary-600 transition-colors flex items-center gap-1">
        <NuxtIcon name="i-lucide-arrow-left" class="w-4 h-4" />
        Back to List
      </NuxtLink>
      <span class="text-gray-300">/</span>
      <span class="text-gray-900 dark:text-white font-medium">{{ word.word }}</span>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <!-- Main Word Card -->
      <div class="md:col-span-2 space-y-6">
        <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
          <div class="absolute top-0 right-0 p-6 opacity-10">
            <span class="text-9xl font-serif text-primary-500 select-none">{{ word.word.charAt(0) }}</span>
          </div>

          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-4">
              <span class="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest border border-primary-100 dark:border-primary-900/30">
                {{ word.type }}
              </span>
              <span v-if="word.category" class="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500">
                {{ word.category }}
              </span>
            </div>

            <div class="flex items-end gap-4 mb-6">
              <h1 class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">{{ word.word }}</h1>
              <div class="flex items-center gap-2 mb-2">
                 <button 
                  @click="playAudio" 
                  class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors group"
                >
                  <NuxtIcon :name="isPlaying ? 'i-lucide-volume-2' : 'i-lucide-volume-1'" class="w-5 h-5" />
                </button>
                <span class="text-xl text-gray-400 font-mono">{{ word.phonetic }}</span>
              </div>
            </div>

            <div class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Definition</h3>
                <p class="text-xl text-gray-900 dark:text-gray-100 font-medium leading-relaxed">{{ word.definition }}</p>
              </div>

              <hr class="border-gray-100 dark:border-gray-800"/>

              <div>
                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Contextual Usage</h3>
                <div class="bg-primary-50 dark:bg-primary-900/10 p-6 rounded-2xl border-l-4 border-primary-500">
                  <p class="text-lg text-gray-900 dark:text-white font-serif italic" v-html="word.context"></p>
                </div>
              </div>
              
              <div v-if="word.example">
                <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Another Example</h3>
                <p class="text-gray-600 dark:text-gray-300">{{ word.example }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar / Stats -->
      <div class="space-y-6">
        <!-- Mastery Card -->
        <UCard :ui="{ body: { padding: 'p-6' } }">
          <div class="text-center space-y-4">
            <h3 class="text-sm font-semibold text-gray-500 uppercase">Current Mastery</h3>
            <div class="flex justify-center gap-2">
              <div v-for="i in 3" :key="i" class="w-3 h-10 rounded-full transition-all duration-500" :class="i <= word.mastery ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'" />
            </div>
            <p class="text-sm text-gray-400">Level {{ word.mastery }}/3</p>
            <UButton block color="gray" variant="solid" icon="i-lucide-dumbbell">Practice This Word</UButton>
          </div>
        </UCard>

        <!-- Related/Action -->
        <div class="bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white text-center space-y-4 shadow-lg">
          <NuxtIcon name="i-lucide-sparkles" class="w-10 h-10 mx-auto opacity-80" />
          <div>
            <h3 class="font-bold text-lg">AI Scenario</h3>
            <p class="text-white/80 text-sm">Generate a conversation utilizing this word.</p>
          </div>
          <UButton color="white" variant="solid" block class="text-indigo-600">Start Scenario</UButton>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center h-96 text-center space-y-4">
    <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
      <NuxtIcon name="i-lucide-search-x" class="w-8 h-8 text-gray-400" />
    </div>
    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Word not found</h3>
    <UButton to="/vocabulary/list" color="gray" variant="ghost">Return to list</UButton>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
