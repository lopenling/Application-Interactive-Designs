<template>
  <div class="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
    <h3 class="text-base font-semibold leading-8 text-stone-900">
      Custom dictionaries
      <span
        v-if="glossaryFilterUser && glossaryFilterUser.value"
        class="font-normal text-stone-500"
      >
        ({{ glossaryFilterUser.value }})
      </span>
    </h3>

    <!---- Button ---->
    <div
      v-if="props.role === 'admin'"
      :class="[glossaryFilterUser && 'hidden sm:block']"
    >
      <button
        type="button"
        class="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        :class="[glossaryFilterUser && 'invisible']"
      >
        Add dictionary
      </button>
    </div>
  </div>

  <!---- Data ---->
  <div
    class="-mx-4 mb-12 overflow-hidden bg-white sm:mx-0 sm:rounded-lg sm:shadow"
  >
    <div>
      <div class="text-center">
        <p class="px-4 py-4 text-sm text-stone-500">
          <span v-if="props.role === 'admin'">No custom dictionaries yet</span>
          <span v-else>No custom dictionaries</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TRole } from "@lib/types";

import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore } from "@stores/componentStates.mjs";

// Define partial props
type TProps = { role?: TRole };
const props = defineProps<TProps>();

// Setup the store
const multiStore = useStore($multiStore);
const glossaryFilterUser = computed(
  () => multiStore.value["glossaryFilterUser"],
) as any;
</script>
