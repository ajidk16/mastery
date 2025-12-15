<script setup lang="ts">
/**
 * Landing Page - High conversion SaaS landing
 * AI-powered English learning platform
 */
definePageMeta({
  layout: 'marketing'
})

const features = [
  {
    icon: 'i-lucide-mic',
    title: 'AI Speaking Partner 24/7',
    description: 'Latihan speaking kapan saja, tanpa perlu cari partner'
  },
  {
    icon: 'i-lucide-zap',
    title: 'Real-time Feedback',
    description: 'Koreksi pronunciation & grammar langsung saat kamu bicara'
  },
  {
    icon: 'i-lucide-target',
    title: 'Personalized Learning',
    description: 'Materi yang disesuaikan dengan level dan tujuan kamu'
  },
  {
    icon: 'i-lucide-trending-up',
    title: 'Track Your Progress',
    description: 'Lihat perkembangan speaking skill kamu setiap hari'
  }
]

const steps = [
  {
    number: '01',
    title: 'Tes Level Kamu',
    description: '5 menit assessment untuk mengetahui starting point kamu'
  },
  {
    number: '02',
    title: 'Mulai Latihan Speaking',
    description: 'Roleplay dengan AI: interview, meeting, casual chat'
  },
  {
    number: '03',
    title: 'Lihat Progress Kamu',
    description: 'Track improvement dan dengar perbedaan suara kamu'
  }
]

const pricing = {
  free: {
    name: 'Free',
    price: 'Rp 0',
    description: 'Untuk mulai belajar',
    features: [
      '5 menit speaking/hari',
      'Basic feedback',
      'Progress tracker'
    ],
    cta: 'Mulai Gratis',
    highlighted: false
  },
  pro: {
    name: 'Pro',
    price: 'Rp 79k',
    period: '/bulan',
    description: 'Untuk hasil maksimal',
    features: [
      'Unlimited speaking',
      'AI Speaking Twin',
      'Advanced feedback',
      'Priority support'
    ],
    cta: 'Upgrade ke Pro',
    highlighted: true
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <header class="fixed top-0 inset-x-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="relative">
              <div class="absolute inset-0 bg-primary-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <div class="relative w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-lg">M</span>
              </div>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">Mastery</span>
          </NuxtLink>

          <!-- CTA -->
          <NuxtLink to="/register">
            <NuxtButton
              size="lg"
              class="gradient-primary border-0 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all"
            >
              <span class="hidden sm:inline">Mulai Gratis</span>
              <span class="sm:hidden">Daftar</span>
            </NuxtButton>
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="animate-slide-up">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-subtle text-sm font-medium text-gray-700 dark:text-gray-300 mb-8">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>10,000+ learners sudah bergabung</span>
          </div>

          <!-- Headline -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span class="text-gray-900 dark:text-white">Speak English</span>
            <br />
            <span class="bg-linear-to-r from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Confidently
            </span>
            <br />
            <span class="text-gray-900 dark:text-white">with AI</span>
          </h1>

          <!-- Subheadline -->
          <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Latihan speaking kapan saja, tanpa malu salah.
            <br class="hidden sm:block" />
            <span class="text-gray-500 dark:text-gray-400">Partner AI yang sabar dan selalu siap.</span>
          </p>

          <!-- CTA -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink to="/register">
              <NuxtButton
                size="xl"
                class="gradient-primary border-0 shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-300 px-8"
              >
                <span class="flex items-center gap-2">
                  Mulai Gratis
                  <NuxtIcon name="i-lucide-arrow-right" class="w-5 h-5" />
                </span>
              </NuxtButton>
            </NuxtLink>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Tanpa kartu kredit • Langsung mulai
            </p>
          </div>
        </div>

        <!-- Hero Visual Placeholder -->
        <div class="mt-16 animate-slide-up stagger-2" style="animation-fill-mode: forwards; opacity: 0">
          <div class="relative max-w-3xl mx-auto">
            <div class="absolute inset-0 bg-linear-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl" />
            <div class="relative glass-card rounded-3xl p-8 sm:p-12">
              <!-- Mock Chat Interface -->
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                    <NuxtIcon name="i-lucide-bot" class="w-5 h-5 text-white" />
                  </div>
                  <div class="glass-subtle rounded-2xl rounded-tl-sm px-4 py-3 max-w-xs">
                    <p class="text-gray-700 dark:text-gray-300 text-sm">Hi! Let's practice. Tell me about your weekend plans.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 justify-end">
                  <div class="bg-primary-500/10 dark:bg-primary-500/20 rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
                    <p class="text-gray-700 dark:text-gray-300 text-sm">I will go to the beach with my friends...</p>
                  </div>
                  <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                    <NuxtIcon name="i-lucide-user" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                    <NuxtIcon name="i-lucide-bot" class="w-5 h-5 text-white" />
                  </div>
                  <div class="glass-subtle rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm">
                    <p class="text-gray-700 dark:text-gray-300 text-sm">
                      Great! Small tip: 
                      <span class="text-primary-600 dark:text-primary-400 font-medium">"I'm going"</span>
                      sounds more natural than "I will go" for plans. 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Familiar dengan ini?
          </h2>
        </div>

        <div class="grid sm:grid-cols-3 gap-6">
          <div class="glass-card rounded-2xl p-6 text-center hover-lift">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <NuxtIcon name="i-lucide-message-circle-x" class="w-8 h-8 text-red-500" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Bisa baca, nggak berani ngomong</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Grammar bagus di tulisan, tapi blank pas mau speaking</p>
          </div>

          <div class="glass-card rounded-2xl p-6 text-center hover-lift">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <NuxtIcon name="i-lucide-user-x" class="w-8 h-8 text-orange-500" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Nggak ada partner latihan</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Mau latihan sama siapa? Malu kalau salah</p>
          </div>

          <div class="glass-card rounded-2xl p-6 text-center hover-lift">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <NuxtIcon name="i-lucide-trending-down" class="w-8 h-8 text-yellow-600" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Belajar tapi nggak progress</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Sudah belajar lama, tapi kok stuck di level yang sama</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Solusi untuk kamu
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI Speaking Partner yang sabar, available 24/7, dan nggak akan judge kamu
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="glass-card rounded-2xl p-6 hover-lift animate-slide-up opacity-0"
            :class="`stagger-${index + 1}`"
            style="animation-fill-mode: forwards"
          >
            <div class="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
              <NuxtIcon :name="feature.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Speaking Twin Section (Killer Feature) -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <!-- Special background -->
      <div class="absolute inset-0 bg-linear-to-br from-primary-600 via-primary-700 to-indigo-900" />
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-100" />
      
      <div class="max-w-4xl mx-auto relative z-10">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-sm font-semibold text-white mb-6">
            <NuxtIcon name="i-lucide-sparkles" class="w-4 h-4" />
            Fitur Unggulan
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            AI Speaking Twin
          </h2>
          <p class="text-xl text-white/80 max-w-2xl mx-auto">
            Dengar perbedaan suara kamu <span class="text-secondary-300 font-semibold">sekarang</span> vs 
            <span class="text-secondary-300 font-semibold">versi kamu yang sudah fluent</span>
          </p>
        </div>

        <!-- Visual Demo -->
        <div class="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div class="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-gray-400/30 flex items-center justify-center">
                <NuxtIcon name="i-lucide-user" class="w-5 h-5 text-white/70" />
              </div>
              <div>
                <p class="text-white font-medium">Kamu Sekarang</p>
                <p class="text-white/60 text-sm">Current level</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <button class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <NuxtIcon name="i-lucide-play" class="w-5 h-5 text-white" />
              </button>
              <div class="flex-1 h-8 rounded-full bg-white/10 overflow-hidden">
                <div class="h-full w-2/3 bg-white/30 rounded-full" />
              </div>
            </div>
          </div>

          <div class="bg-secondary-500/20 backdrop-blur-xl rounded-2xl p-6 border border-secondary-400/30">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-full bg-secondary-400/30 flex items-center justify-center">
                <NuxtIcon name="i-lucide-sparkles" class="w-5 h-5 text-secondary-200" />
              </div>
              <div>
                <p class="text-white font-medium">Versi Fluent Kamu</p>
                <p class="text-secondary-200 text-sm">Your potential</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 rounded-xl bg-white/10">
              <button class="w-10 h-10 rounded-full bg-secondary-400/30 flex items-center justify-center hover:bg-secondary-400/40 transition-colors">
                <NuxtIcon name="i-lucide-play" class="w-5 h-5 text-white" />
              </button>
              <div class="flex-1 h-8 rounded-full bg-white/10 overflow-hidden">
                <div class="h-full w-full bg-linear-to-r from-secondary-400/50 to-secondary-300/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <p class="text-center text-white/60 mt-8 text-lg">
          Progress yang <span class="text-white font-semibold">terasa nyata</span>, bukan cuma angka
        </p>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mulai dalam 3 langkah
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Simpel, tanpa ribet
          </p>
        </div>

        <div class="grid sm:grid-cols-3 gap-8">
          <div
            v-for="step in steps"
            :key="step.number"
            class="text-center"
          >
            <div class="w-16 h-16 mx-auto mb-6 rounded-2xl glass-card flex items-center justify-center">
              <span class="text-2xl font-bold bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                {{ step.number }}
              </span>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2 text-lg">{{ step.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Preview -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pilih yang cocok untuk kamu
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Mulai gratis, upgrade kapan saja
          </p>
        </div>

        <div class="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <!-- Free -->
          <div class="glass-card rounded-3xl p-8 hover-lift">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ pricing.free.name }}</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">{{ pricing.free.description }}</p>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900 dark:text-white">{{ pricing.free.price }}</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li
                v-for="feature in pricing.free.features"
                :key="feature"
                class="flex items-center gap-3 text-gray-600 dark:text-gray-300"
              >
                <NuxtIcon name="i-lucide-check" class="w-5 h-5 text-green-500" />
                {{ feature }}
              </li>
            </ul>
            <NuxtLink to="/register" class="block">
              <NuxtButton
                block
                size="lg"
                color="neutral"
                variant="outline"
              >
                {{ pricing.free.cta }}
              </NuxtButton>
            </NuxtLink>
          </div>

          <!-- Pro -->
          <div class="relative glass-card rounded-3xl p-8 hover-lift ring-2 ring-primary-500">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2">
              <span class="px-4 py-1 rounded-full text-xs font-semibold text-white gradient-primary">
                RECOMMENDED
              </span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ pricing.pro.name }}</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">{{ pricing.pro.description }}</p>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900 dark:text-white">{{ pricing.pro.price }}</span>
              <span class="text-gray-500 dark:text-gray-400">{{ pricing.pro.period }}</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li
                v-for="feature in pricing.pro.features"
                :key="feature"
                class="flex items-center gap-3 text-gray-600 dark:text-gray-300"
              >
                <NuxtIcon name="i-lucide-check" class="w-5 h-5 text-primary-500" />
                {{ feature }}
              </li>
            </ul>
            <NuxtLink to="/register" class="block">
              <NuxtButton
                block
                size="lg"
                class="gradient-primary border-0 shadow-lg shadow-primary-500/25"
              >
                {{ pricing.pro.cta }}
              </NuxtButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Siap untuk mulai
          <span class="bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
            speaking journey
          </span>
          kamu?
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-10">
          10,000+ orang sudah membuktikan. Giliran kamu.
        </p>
        <NuxtLink to="/register">
          <NuxtButton
            size="xl"
            class="gradient-primary border-0 shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-300 px-10"
          >
            <span class="flex items-center gap-2">
              Mulai Gratis Sekarang
              <NuxtIcon name="i-lucide-arrow-right" class="w-5 h-5" />
            </span>
          </NuxtButton>
        </NuxtLink>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Tanpa kartu kredit • Setup 2 menit
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200/50 dark:border-gray-800/50">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span class="text-white font-bold text-sm">M</span>
            </div>
            <span class="font-semibold text-gray-900 dark:text-white">Mastery</span>
          </div>

          <!-- Links -->
          <div class="flex items-center gap-6 text-sm">
            <NuxtLink to="/privacy" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              Privacy
            </NuxtLink>
            <NuxtLink to="/terms" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              Terms
            </NuxtLink>
            <NuxtLink to="/contact" class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              Contact
            </NuxtLink>
          </div>

          <!-- Copyright -->
          <p class="text-sm text-gray-500 dark:text-gray-400">
            © {{ new Date().getFullYear() }} Mastery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
