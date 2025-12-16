<script setup lang="ts">
/**
 * Privacy Policy Page
 */
definePageMeta({
  layout: "marketing",
});

// Types
interface PolicySection {
  id: string;
  title: string;
  content: string[];
}

const formatContent = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>');
};

// Last updated
const lastUpdated = "December 16, 2024";

// Policy sections
const sections: PolicySection[] = [
  {
    id: "intro",
    title: "Introduction",
    content: [
      "At Mastery, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered English learning platform.",
      "By using Mastery, you agree to the collection and use of information in accordance with this policy.",
    ],
  },
  {
    id: "collection",
    title: "Information We Collect",
    content: [
      "**Personal Information:** When you register, we collect your name, email address, and optionally your profile picture.",
      "**Voice Data:** When you practice speaking, we temporarily process your voice to provide feedback. Voice recordings are not permanently stored unless you opt-in for progress tracking.",
      "**Usage Data:** We collect information about how you use our service, including learning progress, session duration, and feature usage.",
      "**Device Information:** We may collect device type, operating system, browser type, and IP address for analytics and security purposes.",
    ],
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    content: [
      "• Provide and improve our AI learning services",
      "• Personalize your learning experience",
      "• Track and display your learning progress",
      "• Send important updates about your account",
      "• Analyze usage patterns to improve our platform",
      "• Prevent fraud and ensure security",
    ],
  },
  {
    id: "sharing",
    title: "Information Sharing",
    content: [
      "We do not sell your personal information. We may share data with:",
      "**Service Providers:** Third-party services that help us operate our platform (e.g., hosting, analytics).",
      "**Legal Requirements:** When required by law or to protect our rights and users.",
      "**Business Transfers:** In the event of a merger or acquisition, user information may be transferred.",
    ],
  },
  {
    id: "security",
    title: "Data Security",
    content: [
      "We implement industry-standard security measures to protect your data, including:",
      "• Encryption of data in transit and at rest",
      "• Regular security audits and vulnerability testing",
      "• Access controls and authentication mechanisms",
      "• Secure data centers with physical security measures",
    ],
  },
  {
    id: "rights",
    title: "Your Rights",
    content: [
      "You have the right to:",
      "• Access your personal data",
      "• Request correction of inaccurate data",
      "• Request deletion of your data",
      "• Export your data in a portable format",
      "• Opt-out of marketing communications",
      "To exercise these rights, please contact us at privacy@mastery.id",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content: [
      "We use cookies and similar technologies to:",
      "• Keep you logged in",
      "• Remember your preferences",
      "• Analyze site traffic and usage",
      "You can control cookie settings through your browser preferences.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    content: [
      "Mastery is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the \"Last Updated\" date.",
      "We encourage you to review this Privacy Policy periodically for any changes.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      "If you have questions about this Privacy Policy, please contact us:",
      "• Email: privacy@mastery.id",
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
        <NuxtBadge color="primary" variant="subtle" size="md" class="mb-6">
          <NuxtIcon name="i-lucide-shield-check" class="w-4 h-4 mr-1" />
          Your Privacy Matters
        </NuxtBadge>
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        <p class="text-lg text-gray-500 dark:text-gray-400">
          Last updated: {{ lastUpdated }}
        </p>
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
                class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400"
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

        <!-- CTA -->
        <div class="mt-8 text-center">
          <p class="text-gray-500 dark:text-gray-400 mb-4">
            Have questions about our privacy practices?
          </p>
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
            to="/terms"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Terms
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