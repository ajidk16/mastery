<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const topics = [
  {
    id: 1,
    title: 'Daily Conversation',
    description: 'Casual chats about weather, hobbies, and plans.',
    levels: ['A1', 'A2'],
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400',
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 2,
    title: 'Business English',
    description: 'Meetings, presentations, and professional etiquette.',
    levels: ['B1', 'B2'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400',
     color: 'from-blue-400 to-indigo-600'
  },
   {
    id: 3,
    title: 'Travel Survival',
    description: 'Airport, hotel check-in, and asking for directions.',
    levels: ['A2', 'B1'],
    image: 'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&q=80&w=400',
     color: 'from-orange-400 to-red-600'
  }
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/practice" class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <NuxtIcon name="i-lucide-arrow-left" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Speaking Topics</h1>
        <p class="text-gray-500 dark:text-gray-400">Choose a scenario</p>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-6">
      <NuxtLink
        v-for="topic in topics"
        :key="topic.id"
        :to="`/practice/speaking/${topic.id}`"
        class="group relative overflow-hidden rounded-2xl aspect-[4/3] flex flex-col justify-end p-6 hover-lift cursor-pointer"
      >
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0">
           <img :src="topic.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
           <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div class="relative z-10">
           <div class="flex flex-wrap gap-2 mb-3">
              <span 
                v-for="level in topic.levels" 
                :key="level"
                class="px-2 py-0.5 rounded text-xs font-bold bg-white/20 text-white backdrop-blur-md"
              >
                {{ level }}
              </span>
           </div>
           
           <h3 class="text-xl font-bold text-white mb-1 group-hover:text-primary-200 transition-colors">
              {{ topic.title }}
           </h3>
           <p class="text-gray-200 text-sm line-clamp-2 mb-4 opacity-90">
              {{ topic.description }}
           </p>

           <div class="flex items-center gap-2 text-white font-medium text-sm group-hover:translate-x-1 transition-transform">
              Start Practice
              <NuxtIcon name="i-lucide-arrow-right" class="w-4 h-4" />
           </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
