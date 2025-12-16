<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

// Types
interface SpeakingTopic {
  id: number;
  title: string;
  role: string;
  context: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  duration: string;
  completed: boolean;
}

// Topics data (max 5 as per UX rule)
const topics: SpeakingTopic[] = [
  {
    id: 1,
    title: "Ordering Coffee",
    role: "Customer",
    context: "You are at a busy cafe in London. Order a latte and asking for a pastry recommendation.",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600",
    duration: "5 mins",
    completed: true,
  },
  {
    id: 2,
    title: "Job Interview",
    role: "Candidate",
    context: 'Answer "Tell me about yourself" and describe your biggest strength.',
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    duration: "10 mins",
    completed: false,
  },
  {
    id: 3,
    title: "Hotel Check-in",
    role: "Guest",
    context: "You have a reservation but want to upgrade to a room with a sea view.",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
    duration: "7 mins",
    completed: false,
  },
  {
    id: 4,
    title: "Asking Directions",
    role: "Tourist",
    context: "You are lost in New York. Ask a stranger how to get to Central Park.",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600",
    duration: "5 mins",
    completed: false,
  },
];

const levelColors: Record<string, string> = {
  Beginner: "success",
  Intermediate: "warning",
  Advanced: "error",
};

const completedCount = computed(() => topics.filter((t) => t.completed).length);
</script>

<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Speaking Scenarios
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Pick a role and start talking in seconds.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <NuxtBadge variant="soft" color="success" size="sm">
          {{ completedCount }}/{{ topics.length }} Completed
        </NuxtBadge>
        <NuxtButton to="/practice" color="neutral" variant="ghost" leading-icon="i-lucide-arrow-left">
          Back
        </NuxtButton>
      </div>
    </div>

    <!-- Quick Tips -->
    <div class="glass-card p-4 rounded-2xl border-l-4 border-l-blue-500 flex items-start gap-3">
      <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
        <NuxtIcon name="i-lucide-lightbulb" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          <strong>Tip:</strong> Speak naturally and don't worry about mistakes. The AI will provide helpful feedback after each turn.
        </p>
      </div>
    </div>

    <!-- Topics Grid -->
    <div class="grid md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="topic in topics"
        :key="topic.id"
        :to="`/practice/speaking/${topic.id}`"
        class="group glass-card rounded-[2rem] overflow-hidden hover:border-primary-500/30 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 flex flex-col"
      >
        <!-- Image Header -->
        <div class="relative h-32 overflow-hidden">
          <img
            :src="topic.image"
            :alt="topic.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          <!-- Completed Badge -->
          <div v-if="topic.completed" class="absolute top-3 right-3">
            <NuxtBadge color="success" variant="solid" size="sm">
              <NuxtIcon name="i-lucide-check" class="w-3 h-3 mr-1" />
              Completed
            </NuxtBadge>
          </div>

          <!-- Duration -->
          <div class="absolute bottom-3 left-3 flex items-center gap-2">
            <NuxtBadge :color="levelColors[topic.level] as any" variant="solid" size="xs">
              {{ topic.level }}
            </NuxtBadge>
            <span class="text-xs text-white/80">
              <NuxtIcon name="i-lucide-clock" class="w-3 h-3 inline mr-1" />
              {{ topic.duration }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 flex-1 flex flex-col">
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ topic.title }}
            </h3>
            <div class="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors shrink-0">
              <NuxtIcon name="i-lucide-arrow-up-right" class="w-4 h-4" />
            </div>
          </div>

          <div class="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-4">
            <p class="text-xs font-bold text-gray-400 uppercase mb-1">Your Role: {{ topic.role }}</p>
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
              {{ topic.context }}
            </p>
          </div>

          <div class="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-medium">
            <NuxtIcon name="i-lucide-play-circle" class="w-5 h-5" />
            {{ topic.completed ? 'Practice Again' : 'Start Practice' }}
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- AI Twin CTA -->
    <div class="glass-card p-6 rounded-2xl border-l-4 border-l-pink-500 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center shrink-0">
          <NuxtIcon name="i-lucide-bot" class="w-6 h-6 text-pink-600 dark:text-pink-400" />
        </div>
        <div>
          <h3 class="font-bold text-gray-900 dark:text-white">Want free conversation?</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Try our AI Speaking Twin for open-ended practice.</p>
        </div>
      </div>
      <NuxtButton to="/speaking-twin" color="secondary" variant="soft" trailing-icon="i-lucide-arrow-right">
        Try AI Twin
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
