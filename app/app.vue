<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 p-8 font-sans transition-colors duration-300">
    <div class="max-w-3xl mx-auto space-y-12">
      <!-- Headers & Typography -->
      <div class="space-y-4">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white font-sans">Prinsip Warna & Typography</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Verifying the implementation of Inter, Plus Jakarta Sans, and Satoshi fonts.
        </p>
      </div>

      <!-- Colors -->
      <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Color Palette</h2>
        
        <!-- Primary -->
        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Primary (Indigo)</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="h-16 rounded-lg bg-primary-500 flex items-center justify-center text-white font-medium">Primary 500</div>
            <div class="h-16 rounded-lg bg-primary-600 flex items-center justify-center text-white font-medium">Primary 600</div>
            <div class="h-16 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-medium">Indigo 500</div>
            <div class="h-16 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-medium">Indigo 600</div>
          </div>
        </div>

        <!-- Secondary -->
        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Secondary (Teal / Mint)</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="h-16 rounded-lg bg-secondary-400 flex items-center justify-center text-white font-medium">Secondary 400</div>
            <div class="h-16 rounded-lg bg-secondary-500 flex items-center justify-center text-white font-medium">Secondary 500</div>
            <div class="h-16 rounded-lg bg-teal-400 flex items-center justify-center text-white font-medium">Teal 400</div>
            <div class="h-16 rounded-lg bg-teal-500 flex items-center justify-center text-white font-medium">Teal 500</div>
          </div>
        </div>

        <!-- Backgrounds -->
         <div class="space-y-2">
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Backgrounds</p>
          <div class="grid grid-cols-2 gap-4">
             <div class="h-24 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-900">Light: #FFFFFF</div>
             <div class="h-24 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center text-white">Dark: #0F172A</div>
          </div>
        </div>
      </div>
      
      <!-- Feedback -->
       <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Feedback Colors</h2>
        <div class="grid grid-cols-3 gap-4">
           <div class="h-12 rounded bg-green-500 flex items-center justify-center text-white">Success</div>
           <div class="h-12 rounded bg-yellow-400 flex items-center justify-center text-gray-900">Warning</div>
           <div class="h-12 rounded bg-red-400 flex items-center justify-center text-white">Error</div>
        </div>
       </div>

    </div>
  </div>
</template>
