<script setup lang="ts">
/**
 * AppToast - Wrapper/Helper for toast notifications
 * 
 * This component provides a convenient way to show toasts.
 * Use the `useAppToast` composable for programmatic access.
 * 
 * Example usage:
 * const { success, error, info, warning } = useAppToast()
 * success('File uploaded successfully')
 * error('Failed to save changes')
 */

export interface ToastOptions {
  title: string
  description?: string
  duration?: number
  icon?: string
}
</script>

<script lang="ts">
// Composable for toast notifications
export function useAppToast() {
  const toast = useToast()

  function success(title: string, options?: Partial<ToastOptions>) {
    toast.add({
      title,
      description: options?.description,
      icon: options?.icon || 'i-lucide-check-circle',
      color: 'success',
      duration: options?.duration || 4000,
    })
  }

  function error(title: string, options?: Partial<ToastOptions>) {
    toast.add({
      title,
      description: options?.description,
      icon: options?.icon || 'i-lucide-x-circle',
      color: 'error',
      duration: options?.duration || 5000,
    })
  }

  function info(title: string, options?: Partial<ToastOptions>) {
    toast.add({
      title,
      description: options?.description,
      icon: options?.icon || 'i-lucide-info',
      color: 'info',
      duration: options?.duration || 4000,
    })
  }

  function warning(title: string, options?: Partial<ToastOptions>) {
    toast.add({
      title,
      description: options?.description,
      icon: options?.icon || 'i-lucide-alert-triangle',
      color: 'warning',
      duration: options?.duration || 4500,
    })
  }

  function custom(options: ToastOptions & { color?: string }) {
    toast.add({
      title: options.title,
      description: options.description,
      icon: options.icon,
      color: options.color as any,
      duration: options.duration || 4000,
    })
  }

  return {
    success,
    error,
    info,
    warning,
    custom,
    toast, // Raw toast for advanced usage
  }
}
</script>

<template>
  <!-- This component is primarily for the composable export -->
  <!-- Toasts are rendered by the NuxtApp/Toaster component -->
  <slot />
</template>
