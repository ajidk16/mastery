<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

// Max 5 topics as per UX rule
const topics = [
  {
    id: 1,
    title: 'Ordering Coffee',
    role: 'Customer',
    context: 'You are at a busy cafe in London. Order a latte and asking for a pastry recommendation.',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600',
    color: 'text-orange-500'
  },
  {
    id: 2,
    title: 'Job Interview',
    role: 'Candidate',
    context: 'Answer "Tell me about yourself" and describe your biggest strength.',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    color: 'text-blue-500'
  },
   {
    id: 3,
    title: 'Hotel Check-in',
    role: 'Guest',
    context: 'You have a reservation but want to upgrade to a room with a sea view.',
    level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
    color: 'text-indigo-500'
  },
   {
    id: 4,
    title: 'Asking Directions',
    role: 'Tourist',
    context: 'You are lost in New York. Ask a stranger how to get to Central Park.',
    level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600',
    color: 'text-green-500'
  }
]
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Speaking Scenarios</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Pick a role and start talking in seconds.</p>
      </div>
    </div>

    <!-- Topic Grid (Max 4-5 items) -->
    <div class="grid md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="topic in topics"
        :key="topic.id"
        :to="`/practice/speaking/${topic.id}`"
        class="group glass-card p-6 rounded-[2rem] hover:border-primary-500/30 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 flex flex-col h-full"
      >
        <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
                 <div class="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                     <img :src="topic.image" class="w-full h-full object-cover" alt="" />
                 </div>
                 <div>
                     <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                        {{ topic.title }}
                     </h3>
                     <span :class="topic.color" class="text-xs font-bold uppercase tracking-wider">
                        {{ topic.level }}
                     </span>
                 </div>
            </div>
            
            <div class="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-colors">
                <NuxtIcon name="i-lucide-arrow-up-right" class="w-4 h-4" />
            </div>
        </div>

        <div class="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-4">
             <p class="text-xs font-bold text-gray-400 uppercase mb-1">Your Role: {{ topic.role }}</p>
             <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {{ topic.context }}
             </p>
        </div>

        <div class="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-medium">
             <NuxtIcon name="i-lucide-play-circle" class="w-5 h-5" />
             Start Practice
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
