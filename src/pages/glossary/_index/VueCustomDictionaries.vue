<template as="div">
  <div class="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
    <h3 class="text-base font-semibold leading-6 text-stone-900">
      <span v-if="subStore">
        Custom dictionaries
        <span class="font-normal">({{ subStore.value }})</span>
      </span>
      <span v-else>Custom dictionaries</span>
    </h3>
    <div class="sm:ml-4" :class="[subStore && 'hidden sm:block']">
      <button
        type="button"
        class="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        :class="[subStore && 'invisible']"
      >
        Create new
      </button>
    </div>
  </div>

  <div class="mb-12 overflow-hidden bg-white px-4 py-4 sm:rounded-lg sm:shadow">
    <div class="text-center">
      <p class="text-sm text-stone-500">No custom dictionaries yet</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore } from "@stores/componentStates.mjs";

// Store setup
const storeKey = "glossaryFilterUsers";

const multiStore = useStore($multiStore);
const subStore = ref(null); // Define subStore as a reactive variable

onMounted(() => {
  $multiStore.subscribe(() => {
    subStore.value = multiStore.value[storeKey]; // Update subStore
  });
});
</script>
