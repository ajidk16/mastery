<script setup lang="ts">
/**
 * Contact Page - Get in touch
 */
definePageMeta({
  layout: "marketing",
});

// Types
interface ContactMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
  value: string;
  action?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// Contact methods
const contactMethods: ContactMethod[] = [
  {
    id: "email",
    title: "Email Us",
    description: "We respond within 24 hours",
    icon: "i-lucide-mail",
    value: "hello@mastery.id",
    action: "mailto:hello@mastery.id",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Chat langsung dengan tim kami",
    icon: "i-lucide-message-circle",
    value: "+62 812-3456-7890",
    action: "https://wa.me/6281234567890",
  },
  {
    id: "twitter",
    title: "Twitter / X",
    description: "DM kami kapan saja",
    icon: "i-lucide-twitter",
    value: "@masteryid",
    action: "https://twitter.com/masteryid",
  },
];

// FAQs
const faqs: FAQ[] = [
  {
    question: "Bagaimana cara memulai?",
    answer:
      "Cukup daftar gratis, tes level kamu selama 5 menit, dan langsung mulai latihan speaking dengan AI partner kami.",
  },
  {
    question: "Apakah ada free trial?",
    answer:
      "Ya! Kamu bisa menggunakan fitur dasar secara gratis selamanya. Upgrade ke Pro kapan saja untuk akses unlimited.",
  },
  {
    question: "Berapa lama untuk melihat progress?",
    answer:
      "Kebanyakan user mulai merasakan peningkatan confidence dalam 2-4 minggu latihan rutin (15-30 menit/hari).",
  },
  {
    question: "Bisa cancel subscription kapan saja?",
    answer:
      "Tentu! Kamu bisa cancel Pro subscription kapan saja. Tidak ada kontrak atau commitment jangka panjang.",
  },
];

// Form state
const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);

async function handleSubmit() {
  if (!form.name || !form.email || !form.message) return;

  isSubmitting.value = true;
  // Simulate API call
  await new Promise((r) => setTimeout(r, 1500));
  isSubmitting.value = false;
  isSubmitted.value = true;

  // Reset after showing success
  setTimeout(() => {
    form.name = "";
    form.email = "";
    form.subject = "";
    form.message = "";
    isSubmitted.value = false;
  }, 3000);
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-6 group">
          <div class="relative">
            <div
              class="absolute inset-0 bg-primary-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"
            />
            <div
              class="relative w-10 h-10 rounded-xl bg-linear-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg"
            >
              <span class="text-white font-bold text-lg">M</span>
            </div>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white">Mastery</span>
        </NuxtLink>

        <NuxtButton to="/" color="neutral" variant="ghost" leading-icon="i-lucide-arrow-left">
          Back to Home
        </NuxtButton>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Get in
          <span class="bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Ada pertanyaan atau feedback? Tim kami siap membantu kamu.
        </p>
      </div>
    </section>

    <!-- Contact Methods -->
    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid sm:grid-cols-3 gap-6 mb-16">
          <a
            v-for="method in contactMethods"
            :key="method.id"
            :href="method.action"
            target="_blank"
            rel="noopener noreferrer"
            class="group glass-card rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <NuxtIcon :name="method.icon" class="w-7 h-7 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ method.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ method.description }}</p>
            <p class="text-sm font-medium text-primary-600 dark:text-primary-400">{{ method.value }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a Message</h2>
          <p class="text-gray-500 dark:text-gray-400">
            We'll get back to you within 24 hours
          </p>
        </div>

        <!-- Success Message -->
        <div
          v-if="isSubmitted"
          class="glass-card rounded-2xl p-8 text-center animate-fade-in"
        >
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <NuxtIcon name="i-lucide-check" class="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
          <p class="text-gray-500 dark:text-gray-400">
            Thanks for reaching out. We'll get back to you soon.
          </p>
        </div>

        <!-- Form -->
        <form v-else class="glass-card rounded-2xl p-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="grid sm:grid-cols-2 gap-6">
            <NuxtFormField label="Name" name="name" required>
              <NuxtInput
                v-model="form.name"
                placeholder="Your name"
                leading-icon="i-lucide-user"
                class="w-full"
              />
            </NuxtFormField>

            <NuxtFormField label="Email" name="email" required>
              <NuxtInput
                v-model="form.email"
                type="email"
                placeholder="email@example.com"
                leading-icon="i-lucide-mail"
                class="w-full"
              />
            </NuxtFormField>
          </div>

          <NuxtFormField label="Subject" name="subject">
            <NuxtInput
              v-model="form.subject"
              placeholder="What's this about?"
              leading-icon="i-lucide-help-circle"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField label="Message" name="message" required>
            <NuxtTextarea
              v-model="form.message"
              placeholder="Tell us how we can help..."
              :rows="5"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtButton
            type="submit"
            size="lg"
            :loading="isSubmitting"
            :disabled="!form.name || !form.email || !form.message"
            class="w-full bg-linear-to-r from-primary-500 to-indigo-600 border-0 shadow-lg shadow-primary-500/25"
          >
            <span class="flex items-center gap-2">
              Send Message
              <NuxtIcon name="i-lucide-send" class="w-5 h-5" />
            </span>
          </NuxtButton>
        </form>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p class="text-gray-500 dark:text-gray-400">
            Pertanyaan yang sering ditanyakan
          </p>
        </div>

        <NuxtAccordion
          :items="faqs.map((faq, i) => ({ label: faq.question, content: faq.answer, value: `faq-${i}` }))"
          :ui="{
            item: 'glass-card rounded-xl mb-3 px-4 hover:shadow-lg transition-shadow',
          }"
        />
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200/50 dark:border-gray-800/50">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-6">
          <div class="w-8 h-8 rounded-lg bg-linear-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
            <span class="text-white font-bold text-sm">M</span>
          </div>
          <span class="font-semibold text-gray-900 dark:text-white">Mastery</span>
        </div>

        <div class="flex items-center gap-6 text-sm">
          <NuxtLink
            to="/privacy"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Privacy
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Terms
          </NuxtLink>
        </div>

        <p class="text-sm text-gray-500 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Mastery. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
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