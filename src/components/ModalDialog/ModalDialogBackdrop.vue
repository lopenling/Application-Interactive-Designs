<template>
  <TransitionChild
    as="template"
    enter="ease-out duration-300"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="ease-in duration-200"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div class="fixed inset-0 overflow-hidden bg-transparent transition-opacity sm:bg-stone-950/5">
      <div
        class="absolute left-1/2 top-1/2 h-[100vw] w-[100vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-stone-100/60 from-0% to-stone-200 to-90% sm:bg-gradient-radial sm:from-stone-100/75 sm:from-40% sm:to-stone-200 sm:to-100% portrait:h-[100vh] portrait:w-[100vh]"
      />
    </div>
  </TransitionChild>
</template>

<script setup lang="ts">
import { TransitionChild } from "@headlessui/vue";
</script>
