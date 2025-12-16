<script setup lang="ts">
/**
 * Terms of Service Page
 */
definePageMeta({
  layout: "marketing",
});

// Types
interface TermsSection {
  id: string;
  title: string;
  content: string[];
}

// Helper function to format content
const formatContent = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>');
};

// Last updated
const lastUpdated = "December 16, 2024";

// Terms sections
const sections: TermsSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      "By accessing or using Mastery, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
      "If you do not agree with any of these terms, you are prohibited from using this service.",
    ],
  },
  {
    id: "description",
    title: "Service Description",
    content: [
      "Mastery is an AI-powered English learning platform that provides:",
      "• Interactive speaking practice with AI partners",
      "• Real-time pronunciation and grammar feedback",
      "• Personalized learning paths and progress tracking",
      "• Vocabulary building and contextual learning",
      "We reserve the right to modify, suspend, or discontinue any part of the service at any time.",
    ],
  },
  {
    id: "account",
    title: "User Accounts",
    content: [
      "**Registration:** You must provide accurate and complete information when creating an account.",
      "**Security:** You are responsible for maintaining the confidentiality of your account credentials.",
      "**Age Requirement:** You must be at least 13 years old to use Mastery.",
      "**One Account:** Each user may only maintain one active account.",
    ],
  },
  {
    id: "conduct",
    title: "Acceptable Use",
    content: [
      "You agree NOT to:",
      "• Use the service for any illegal purpose",
      "• Attempt to gain unauthorized access to our systems",
      "• Interfere with other users' enjoyment of the service",
      "• Upload malicious content or malware",
      "• Reverse engineer or attempt to extract source code",
      "• Share your account with others",
      "• Use automated systems or bots to access the service",
    ],
  },
  {
    id: "content",
    title: "User Content",
    content: [
      "**Your Content:** You retain ownership of content you create (e.g., practice recordings, written responses).",
      "**License:** By using Mastery, you grant us a limited license to process your content to provide and improve our services.",
      "**AI Training:** We may use anonymized, aggregated data to improve our AI models. Personal voice data is not used for training without explicit consent.",
    ],
  },
  {
    id: "subscription",
    title: "Subscriptions & Payments",
    content: [
      "**Free Tier:** Basic features are available for free with usage limits.",
      "**Pro Subscription:** Premium features require a paid subscription.",
      "**Billing:** Subscriptions are billed monthly or annually, as selected at purchase.",
      "**Cancellation:** You may cancel your subscription at any time. Access continues until the end of the billing period.",
      "**Refunds:** Refunds are available within 7 days of initial purchase if you're unsatisfied with our service.",
    ],
  },
  {
    id: "intellectual",
    title: "Intellectual Property",
    content: [
      "The Mastery platform, including its design, features, content, and AI technology, is protected by intellectual property laws.",
      "You may not copy, modify, distribute, or create derivative works without our written permission.",
      "The Mastery name, logo, and branding are trademarks of Mastery.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimers",
    content: [
      "**No Guarantee:** While we strive to provide effective learning tools, we cannot guarantee specific learning outcomes.",
      "**AI Limitations:** Our AI provides feedback based on patterns and may occasionally make errors.",
      "**Availability:** We aim for high availability but do not guarantee uninterrupted service.",
      "**Third Parties:** We are not responsible for third-party content or services linked from our platform.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, Mastery shall not be liable for:",
      "• Indirect, incidental, or consequential damages",
      "• Loss of data, profits, or business opportunities",
      "• Damages arising from service interruptions",
      "Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    content: [
      "**By You:** You may terminate your account at any time through account settings.",
      "**By Us:** We may suspend or terminate accounts that violate these terms.",
      "**Effect:** Upon termination, your right to use the service ends. We may retain certain data as required by law.",
    ],
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content: [
      "We may update these Terms of Service from time to time. Significant changes will be communicated via email or in-app notification.",
      "Continued use of the service after changes constitutes acceptance of the new terms.",
    ],
  },
  {
    id: "governing",
    title: "Governing Law",
    content: [
      "These terms are governed by the laws of Indonesia, without regard to conflict of law provisions.",
      "Any disputes shall be resolved in the courts of Jakarta, Indonesia.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    content: [
      "For questions about these Terms of Service:",
      "• Email: legal@mastery.id",
      "• Address: Jakarta, Indonesia",
    ],
  },
];
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
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
        <NuxtBadge color="neutral" variant="subtle" size="md" class="mb-6">
          <NuxtIcon name="i-lucide-file-text" class="w-4 h-4 mr-1" />
          Legal Agreement
        </NuxtBadge>
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Terms of Service
        </h1>
        <p class="text-lg text-gray-500 dark:text-gray-400">
          Last updated: {{ lastUpdated }}
        </p>
      </div>
    </section>

    <!-- Important Notice -->
    <section class="px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 flex gap-4">
          <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0">
            <NuxtIcon name="i-lucide-alert-triangle" class="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 class="font-semibold text-amber-900 dark:text-amber-100 mb-1">Please Read Carefully</h3>
            <p class="text-sm text-amber-700 dark:text-amber-300">
              By using Mastery, you agree to these terms. If you don't agree, please don't use our service.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="glass-card rounded-3xl p-8 md:p-12 space-y-10">
          <div
            v-for="section in sections"
            :key="section.id"
            class="scroll-mt-24"
            :id="section.id"
          >
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <span
                class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-400"
              >
                {{ sections.indexOf(section) + 1 }}
              </span>
              {{ section.title }}
            </h2>
            <div class="space-y-3 pl-11">
              <p
                v-for="(paragraph, idx) in section.content"
                :key="idx"
                class="text-gray-600 dark:text-gray-300 leading-relaxed"
                v-html="formatContent(paragraph)"
              ></p>
            </div>
          </div>
        </div>

        <!-- Quick Navigation -->
        <div class="mt-8 glass-card rounded-2xl p-6">
          <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
            Quick Navigation
          </h3>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="section in sections"
              :key="section.id"
              :href="`#${section.id}`"
              class="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {{ section.title }}
            </a>
          </div>
        </div>

        <!-- Related Links -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtButton to="/privacy" color="neutral" variant="soft" leading-icon="i-lucide-shield">
            Privacy Policy
          </NuxtButton>
          <NuxtButton to="/contact" color="primary" variant="soft" leading-icon="i-lucide-mail">
            Contact Us
          </NuxtButton>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200/50 dark:border-gray-800/50">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
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
            to="/contact"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Contact
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