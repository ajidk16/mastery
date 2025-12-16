<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface ListeningExercise {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  type: "Podcast" | "Conversation" | "News" | "Song";
  thumbnail: string;
  isLocked: boolean;
}

// Exercise data
const exercises: ListeningExercise[] = [
  {
    id: 1,
    title: "Coffee Shop Conversations",
    description: "Listen to real conversations at a busy cafe and answer comprehension questions.",
    duration: "5 mins",
    level: "Beginner",
    type: "Conversation",
    thumbnail: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=400",
    isLocked: false,
  },
  {
    id: 2,
    title: "Tech News Brief",
    description: "Stay updated with the latest tech news while improving your listening skills.",
    duration: "8 mins",
    level: "Intermediate",
    type: "News",
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400",
    isLocked: false,
  },
  {
    id: 3,
    title: "Travel Podcast Episode",
    description: "Join travelers sharing their adventures around the world.",
    duration: "12 mins",
    level: "Intermediate",
    type: "Podcast",
    thumbnail: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=400",
    isLocked: true,
  },
  {
    id: 4,
    title: "Pop Song Lyrics",
    description: "Learn English through popular songs with fill-in-the-blank exercises.",
    duration: "4 mins",
    level: "Beginner",
    type: "Song",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400",
    isLocked: true,
  },
];

const typeIcons: Record<string, string> = {
  Podcast: "i-lucide-podcast",
  Conversation: "i-lucide-message-circle",
  News: "i-lucide-newspaper",
  Song: "i-lucide-music",
};

const levelColors: Record<string, string> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <NuxtBadge color="info" variant="subtle" size="sm">Coming Soon</NuxtBadge>
        </div>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Listening Practice
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Train your ear with real-world audio content
        </p>
      </div>
      <NuxtButton to="/practice" color="neutral" variant="ghost" leading-icon="i-lucide-arrow-left">
        Back to Practice
      </NuxtButton>
    </div>

    <!-- Coming Soon Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-linear-to-br from-cyan-500 to-blue-600 p-8 text-white">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-6">
        <div class="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
          <NuxtIcon name="i-lucide-headphones" class="w-10 h-10 text-white" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-2xl font-bold mb-2">Listening Module Coming Soon!</h2>
          <p class="text-cyan-100 max-w-lg">
            We're working on immersive audio experiences including podcasts, news, conversations, and music-based learning.
          </p>
        </div>
        <NuxtButton color="white" variant="solid" size="lg" disabled class="shrink-0">
          <NuxtIcon name="i-lucide-bell" class="w-5 h-5 mr-2" />
          Notify Me
        </NuxtButton>
      </div>
    </div>

    <!-- Preview Grid -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview Content</h2>
      <div class="grid sm:grid-cols-2 gap-6">
        <div
          v-for="exercise in exercises"
          :key="exercise.id"
          class="group glass-card rounded-2xl overflow-hidden transition-all duration-300"
          :class="exercise.isLocked ? 'opacity-60' : 'hover:shadow-xl hover:-translate-y-1'"
        >
          <!-- Thumbnail -->
          <div class="relative h-40 overflow-hidden">
            <img
              :src="exercise.thumbnail"
              :alt="exercise.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            
            <!-- Type Badge -->
            <div class="absolute top-3 left-3">
              <NuxtBadge color="neutral" variant="solid" size="sm">
                <NuxtIcon :name="typeIcons[exercise.type]" class="w-3 h-3 mr-1" />
                {{ exercise.type }}
              </NuxtBadge>
            </div>

            <!-- Lock Overlay -->
            <div v-if="exercise.isLocked" class="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <NuxtIcon name="i-lucide-lock" class="w-6 h-6 text-white" />
              </div>
            </div>

            <!-- Duration -->
            <div class="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
              <span class="text-xs font-medium text-white">{{ exercise.duration }}</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 space-y-3">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ exercise.title }}
              </h3>
              <NuxtBadge :color="levelColors[exercise.level] as any" variant="subtle" size="xs">
                {{ exercise.level }}
              </NuxtBadge>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {{ exercise.description }}
            </p>
            <NuxtButton
              :disabled="exercise.isLocked"
              color="primary"
              :variant="exercise.isLocked ? 'outline' : 'soft'"
              size="sm"
              block
            >
              <NuxtIcon :name="exercise.isLocked ? 'i-lucide-lock' : 'i-lucide-play'" class="w-4 h-4 mr-2" />
              {{ exercise.isLocked ? 'Locked' : 'Start Listening' }}
            </NuxtButton>
          </div>
        </div>
      </div>
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
