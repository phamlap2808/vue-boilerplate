<template>
  <div class="flex flex-col h-screen w-full">
    <header class="p-4 bg-gray-800 text-white">Header</header>
    <main class="p-4">
      <slot />
    </main>
    <footer class="p-4 bg-gray-100">Footer</footer>
  </div>
</template>
