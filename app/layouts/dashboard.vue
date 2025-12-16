<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from "@nuxt/ui";

const route = useRoute();
const router = useRouter();
const colorMode = useColorMode();

// Mobile sidebar state
const isMobileMenuOpen = ref(false);

// Navigation items
const navigationItems: NavigationMenuItem[][] = [
  [
    {
      label: "Home",
      icon: "i-lucide-home",
      to: "/dashboard",
    },
    {
      label: "Practice",
      icon: "i-lucide-mic",
      to: "/practice",
    },
    {
      label: "Vocabulary",
      icon: "i-lucide-book-a",
      to: "/vocabulary",
    },
    {
      label: "Progress",
      icon: "i-lucide-bar-chart-2",
      to: "/progress",
    },
  ],
  [
    {
      label: "Assessment",
      icon: "i-lucide-clipboard-check",
      to: "/assessment",
    },
    {
      label: "AI Twin",
      icon: "i-lucide-bot",
      to: "/speaking-twin",
    },
  ],
];

// User dropdown items
const userMenuItems: DropdownMenuItem[][] = [
  [
    {
      label: "Profile",
      icon: "i-lucide-user",
      to: "/settings/profile",
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      to: "/settings",
    },
  ],
  [
    {
      label: "Dark Mode",
      icon: colorMode.value === "dark" ? "i-lucide-sun" : "i-lucide-moon",
      onSelect: () => {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
      },
    },
  ],
  [
    {
      label: "Log out",
      icon: "i-lucide-log-out",
      color: "error" as const,
      onSelect: () => {
        router.push("/");
      },
    },
  ],
];

// User data (mock)
const user = {
  name: "User Name",
  email: "user@example.com",
  avatar: "",
  plan: "Free Plan",
};

// Stats
const streak = ref(12);
const gems = ref(450);

// Get page title from route
const pageTitle = computed(() => {
  const name = route.name?.toString() || "";
  return name
    .replace("core-", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
});

// Check if link is active
function isActive(to: string): boolean {
  return route.path === to || route.path.startsWith(to + "/");
}

// Close mobile menu on route change
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  }
);
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
    <!-- Desktop Sidebar -->
    <aside
      class="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 transition-all duration-300"
    >
      <!-- Logo -->
      <div class="p-6">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
            class="w-10 h-10 rounded-xl bg-linear-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform"
          >
            <span class="text-white font-bold text-lg">M</span>
          </div>
          <span class="font-bold text-xl text-gray-900 dark:text-white">Mastery</span>
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 overflow-y-auto">
        <div v-for="(group, groupIndex) in navigationItems" :key="groupIndex" class="mb-6">
          <div v-if="groupIndex > 0" class="h-px bg-gray-100 dark:bg-gray-800 mb-4" />
          <div class="space-y-1">
            <NuxtLink
              v-for="item in group"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium group"
              :class="
                isActive(item.to as string)
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              "
            >
              <NuxtIcon
                :name="item.icon!"
                class="w-5 h-5 transition-transform group-hover:scale-110"
              />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </nav>

      <!-- User Profile -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-800">
        <NuxtDropdownMenu :items="userMenuItems">
          <button
            class="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
          >
            <NuxtAvatar
              :src="user.avatar"
              :alt="user.name"
              icon="i-lucide-user"
              size="sm"
              class="ring-2 ring-gray-100 dark:ring-gray-800 group-hover:ring-primary-200 dark:group-hover:ring-primary-800 transition-all"
            />
            <div class="flex-1 text-left min-w-0">
              <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {{ user.name }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                {{ user.plan }}
              </p>
            </div>
            <NuxtIcon
              name="i-lucide-chevron-right"
              class="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
            />
          </button>
        </NuxtDropdownMenu>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Top Header -->
      <header
        class="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-6 flex items-center justify-between gap-4"
      >
        <!-- Left: Mobile Menu + Title -->
        <div class="flex items-center gap-4">
          <!-- Mobile Menu Button -->
          <NuxtButton
            class="lg:hidden"
            color="neutral"
            variant="ghost"
            icon="i-lucide-menu"
            @click="isMobileMenuOpen = true"
          />

          <!-- Mobile Logo -->
          <NuxtLink to="/dashboard" class="lg:hidden">
            <div
              class="w-8 h-8 rounded-lg bg-linear-to-br from-primary-500 to-indigo-600 flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">M</span>
            </div>
          </NuxtLink>

          <!-- Page Title -->
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white hidden sm:block">
            {{ pageTitle }}
          </h1>
        </div>

        <!-- Right: Stats & Actions -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Streak -->
          <div
            class="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 rounded-full border border-orange-100 dark:border-orange-900/50 transition-transform hover:scale-105"
          >
            <NuxtIcon name="i-lucide-flame" class="w-4 h-4 text-orange-500" />
            <span class="text-sm font-bold text-orange-600 dark:text-orange-400">{{ streak }}</span>
          </div>

          <!-- Gems -->
          <div
            class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-900/50 transition-transform hover:scale-105"
          >
            <NuxtIcon name="i-lucide-diamond" class="w-4 h-4 text-secondary-500" />
            <span class="text-sm font-bold text-secondary-600 dark:text-secondary-400">{{ gems }}</span>
          </div>

          <!-- Settings (Desktop only) -->
          <NuxtButton
            to="/settings"
            class="hidden sm:flex"
            color="neutral"
            variant="ghost"
            icon="i-lucide-settings"
          />
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
        <div class="max-w-4xl mx-auto w-full animate-fade-in">
          <slot />
        </div>
      </main>

      <!-- Mobile Bottom Navigation -->
      <nav
        class="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 pb-safe fixed bottom-0 inset-x-0 z-50"
      >
        <div class="flex justify-around items-center px-2">
          <NuxtLink
            v-for="item in navigationItems[0]"
            :key="item.to"
            :to="item.to"
            class="flex flex-col items-center gap-1 p-3 rounded-xl transition-all min-w-[64px]"
            :class="
              isActive(item.to as string)
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-400 dark:text-gray-500'
            "
          >
            <NuxtIcon
              :name="item.icon!"
              class="w-6 h-6 transition-transform"
              :class="isActive(item.to as string) ? 'scale-110' : ''"
            />
            <span class="text-[10px] font-medium">{{ item.label }}</span>
          </NuxtLink>
        </div>
      </nav>

      <!-- Mobile Padding Shim -->
      <div class="lg:hidden h-20" />
    </div>

    <!-- Mobile Sidebar Overlay -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
          @click="isMobileMenuOpen = false"
        />
      </Transition>

      <Transition name="slide">
        <aside
          v-if="isMobileMenuOpen"
          class="fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 z-50 lg:hidden flex flex-col shadow-2xl"
        >
          <!-- Mobile Header -->
          <div class="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
            <NuxtLink to="/dashboard" class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl bg-linear-to-br from-primary-500 to-indigo-600 flex items-center justify-center"
              >
                <span class="text-white font-bold text-lg">M</span>
              </div>
              <span class="font-bold text-xl text-gray-900 dark:text-white">Mastery</span>
            </NuxtLink>
            <NuxtButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              @click="isMobileMenuOpen = false"
            />
          </div>

          <!-- Mobile Navigation -->
          <nav class="flex-1 p-4 overflow-y-auto">
            <div v-for="(group, groupIndex) in navigationItems" :key="groupIndex" class="mb-6">
              <div v-if="groupIndex > 0" class="h-px bg-gray-100 dark:bg-gray-800 mb-4" />
              <div class="space-y-1">
                <NuxtLink
                  v-for="item in group"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium"
                  :class="
                    isActive(item.to as string)
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  "
                >
                  <NuxtIcon :name="item.icon!" class="w-5 h-5" />
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </div>
            </div>
          </nav>

          <!-- Mobile User -->
          <div class="p-4 border-t border-gray-200 dark:border-gray-800">
            <NuxtLink
              to="/settings/profile"
              class="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <NuxtAvatar
                :src="user.avatar"
                :alt="user.name"
                icon="i-lucide-user"
                size="sm"
              />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {{ user.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.plan }}</p>
              </div>
              <NuxtIcon name="i-lucide-chevron-right" class="w-4 h-4 text-gray-400" />
            </NuxtLink>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
