<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const { vocabList } = useVocabulary()
const searchQuery = ref('')

const filteredVocab = computed(() => {
  if (!searchQuery.value) return vocabList.value
  const query = searchQuery.value.toLowerCase()
  return vocabList.value.filter(item => 
    item.word.toLowerCase().includes(query) || 
    item.definition.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Vocabulary List</h1>
        <p class="text-gray-500 dark:text-gray-400">Your personal dictionary and progress.</p>
      </div>
      <div class="w-full sm:w-72">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          placeholder="Search words..."
          color="white"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="searchQuery !== ''"
              color="gray"
              variant="link"
              icon="i-lucide-x"
              :padded="false"
              @click="searchQuery = ''"
            />
          </template>
        </UInput>
      </div>
    </div>

    <!-- Grid Layout -->
    <div v-if="filteredVocab.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink 
        v-for="(item, index) in filteredVocab" 
        :key="item.id" 
        :to="`/vocabulary/${item.id}`"
        class="group block"
      >
        <UCard 
          :ui="{ body: { padding: 'p-6' }, ring: '', shadow: 'shadow-sm hover:shadow-md' }" 
          class="h-full border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
        >
          <!-- Hover Gradient Blob -->
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-primary-50 dark:bg-primary-900/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div class="relative z-10 space-y-4">
            <div class="flex justify-between items-start">
              <div>
                 <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{{ item.word }}</h3>
                 <p class="text-sm text-gray-400 font-mono">{{ item.phonetic }}</p>
              </div>
              <span class="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 uppercase tracking-wide">
                {{ item.type }}
              </span>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{{ item.definition }}</p>

            <div class="pt-2 flex items-center gap-2">
               <div class="flex gap-1" title="Mastery Level">
                  <div v-for="i in 3" :key="i" class="w-1.5 h-1.5 rounded-full" :class="i <= item.mastery ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'"></div>
               </div>
               <span class="text-xs text-gray-400" v-if="item.category">• {{ item.category }}</span>
            </div>
          </div>
        </UCard>
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <div class="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <NuxtIcon name="i-lucide-search" class="w-6 h-6 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white">No words found</h3>
      <p class="text-gray-500">Try adjusting your search query.</p>
    </div>
  </div>
</template>