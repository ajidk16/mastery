<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface VocabItem {
  id: number;
  word: string;
  phonetic: string;
  type: string;
  definition: string;
  category?: string;
  mastery: number;
}

const { vocabList } = useVocabulary();

// Search and filter state
const searchQuery = ref("");
const selectedType = ref<string | null>(null);
const sortBy = ref<"word" | "mastery">("word");

// Get unique types for filter
const types = computed(() => {
  if (!vocabList.value) return [];
  return [...new Set(vocabList.value.map((v) => v.type))];
});

// Filtered vocabulary
const filteredVocab = computed<VocabItem[]>(() => {
  if (!vocabList.value) return [];

  let result = vocabList.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (item) =>
        item.word.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query)
    );
  }

  // Type filter
  if (selectedType.value) {
    result = result.filter((item) => item.type === selectedType.value);
  }

  // Sorting
  return [...result].sort((a, b) => {
    if (sortBy.value === "mastery") {
      return b.mastery - a.mastery;
    }
    return a.word.localeCompare(b.word);
  });
});

// Stats
const totalWords = computed(() => vocabList.value?.length || 0);
const masteredWords = computed(() => vocabList.value?.filter((v) => v.mastery >= 3).length || 0);

// Clear filters
function clearFilters() {
  searchQuery.value = "";
  selectedType.value = null;
}

// Mastery color helper
function getMasteryColor(level: number): string {
  if (level >= 3) return "bg-green-500";
  if (level >= 2) return "bg-yellow-500";
  if (level >= 1) return "bg-orange-500";
  return "bg-gray-300 dark:bg-gray-600";
}
</script>

<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Vocabulary List
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Your personal dictionary and progress
        </p>
      </div>
      <div class="flex items-center gap-3">
        <NuxtBadge color="success" variant="soft" size="sm">
          {{ masteredWords }} mastered
        </NuxtBadge>
        <NuxtBadge color="neutral" variant="outline" size="sm">
          {{ totalWords }} total
        </NuxtBadge>
      </div>
    </div>

    <!-- Search & Filters -->
    <NuxtCard variant="outline" :ui="{ body: 'p-4' }">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <NuxtInput
            v-model="searchQuery"
            placeholder="Search words or definitions..."
            leading-icon="i-lucide-search"
            :ui="{ trailing: 'pointer-events-auto' }"
          >
            <template #trailing>
              <NuxtButton
                v-if="searchQuery"
                color="neutral"
                variant="ghost"
                icon="i-lucide-x"
                size="xs"
                @click="searchQuery = ''"
              />
            </template>
          </NuxtInput>
        </div>

        <!-- Type Filter -->
        <div class="flex gap-2 flex-wrap">
          <NuxtButton
            :color="!selectedType ? 'primary' : 'neutral'"
            :variant="!selectedType ? 'soft' : 'ghost'"
            size="sm"
            @click="selectedType = null"
          >
            All
          </NuxtButton>
          <NuxtButton
            v-for="type in types"
            :key="type"
            :color="selectedType === type ? 'primary' : 'neutral'"
            :variant="selectedType === type ? 'soft' : 'ghost'"
            size="sm"
            @click="selectedType = type"
          >
            {{ type }}
          </NuxtButton>
        </div>

        <!-- Sort -->
        <NuxtDropdownMenu
          :items="[
            [
              { label: 'Alphabetical', icon: 'i-lucide-arrow-down-a-z', onSelect: () => sortBy = 'word' },
              { label: 'By Mastery', icon: 'i-lucide-bar-chart-2', onSelect: () => sortBy = 'mastery' }
            ]
          ]"
        >
          <NuxtButton color="neutral" variant="outline" size="sm" trailing-icon="i-lucide-chevron-down">
            Sort
          </NuxtButton>
        </NuxtDropdownMenu>
      </div>
    </NuxtCard>

    <!-- Results Count -->
    <div class="flex items-center justify-between text-sm text-gray-500">
      <span>{{ filteredVocab.length }} words found</span>
      <NuxtButton
        v-if="searchQuery || selectedType"
        color="neutral"
        variant="ghost"
        size="xs"
        leading-icon="i-lucide-x"
        @click="clearFilters"
      >
        Clear filters
      </NuxtButton>
    </div>

    <!-- Vocabulary Grid -->
    <div v-if="filteredVocab.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="item in filteredVocab"
        :key="item.id"
        :to="`/vocabulary/${item.id}`"
        class="group block"
      >
        <NuxtCard
          variant="outline"
          :ui="{ body: 'p-5' }"
          class="h-full transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
        >
          <!-- Hover Gradient -->
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-primary-50 dark:bg-primary-900/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div class="relative z-10 space-y-3">
            <!-- Header -->
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {{ item.word }}
                </h3>
                <p class="text-sm text-gray-400 font-mono">{{ item.phonetic }}</p>
              </div>
              <NuxtBadge color="neutral" variant="soft" size="xs" class="uppercase tracking-wide">
                {{ item.type }}
              </NuxtBadge>
            </div>

            <!-- Definition -->
            <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {{ item.definition }}
            </p>

            <!-- Footer -->
            <div class="pt-2 flex items-center justify-between">
              <!-- Mastery Dots -->
              <div class="flex items-center gap-2">
                <div class="flex gap-1" title="Mastery Level">
                  <div
                    v-for="i in 3"
                    :key="i"
                    class="w-2 h-2 rounded-full transition-colors"
                    :class="i <= item.mastery ? getMasteryColor(item.mastery) : 'bg-gray-200 dark:bg-gray-700'"
                  />
                </div>
                <span v-if="item.category" class="text-xs text-gray-400">
                  • {{ item.category }}
                </span>
              </div>

              <!-- Arrow -->
              <NuxtIcon
                name="i-lucide-arrow-right"
                class="w-4 h-4 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
              />
            </div>
          </div>
        </NuxtCard>
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20">
      <div class="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <NuxtIcon name="i-lucide-search" class="w-6 h-6 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No words found</h3>
      <p class="text-gray-500 mb-4">Try adjusting your search query or filters.</p>
      <NuxtButton color="primary" variant="soft" @click="clearFilters">
        Clear all filters
      </NuxtButton>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>