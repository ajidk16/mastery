<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  preventClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  preventClose: false,
})

const modelValue = defineModel<boolean>({ default: false })

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-sm'
    case 'lg': return 'max-w-2xl'
    case 'xl': return 'max-w-4xl'
    case 'full': return 'max-w-full mx-4'
    default: return 'max-w-lg'
  }
})
</script>

<template>
  <NuxtModal
    v-model:open="modelValue"
    :title="title"
    :description="description"
    :close="closable ? undefined : false"
    :ui="{
      content: `${sizeClasses} rounded-2xl`,
      header: 'p-6 pb-0',
      body: 'p-6',
      footer: 'p-6 pt-0',
      title: 'text-xl font-semibold',
      description: 'mt-2 text-muted',
    }"
    @update:open="(val: boolean) => {
      if (!val && preventClose) {
        modelValue = true
      }
    }"
  >
    <slot name="trigger" />

    <template #header>
      <slot name="header" />
    </template>

    <template #body>
      <slot />
    </template>

    <template #footer>
      <slot name="footer" />
    </template>
  </NuxtModal>
</template>
