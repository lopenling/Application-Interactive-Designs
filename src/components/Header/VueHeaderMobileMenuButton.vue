<template>
  <button
    @click="handleButtonClick"
    class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:hover:bg-stone-100 sm:hover:text-stone-500"
    style="-webkit-tap-highlight-color: transparent"
  >
    <span class="absolute -inset-0.5"></span>
    <span class="sr-only">Open main menu</span>
    <VueIcon
      v-if="!subStore"
      :data="IconDataNavigationMenu"
      :attributes="{ class: `block h-6 w-6` }"
    />
    <VueIcon
      v-else
      :data="IconDataClose"
      :attributes="{ class: `block h-6 w-6` }"
    />
    <div class="ml-4">
      <img
        v-if="user.imageUrl"
        class="h-8 w-8 rounded-md"
        :src="user.imageUrl"
        alt=""
      />
      <span
        v-else
        class="flex h-8 w-8 items-center justify-center rounded-md bg-primary-400/25 text-center text-sm font-bold tracking-tight text-primary-600/75 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 group-hover:bg-primary-400/40 group-hover:text-primary-600/90"
      >
        <span>{{ user.initials }}</span>
      </span>
    </div>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";

import VueIcon from "@components/Icon/VueIcon.vue";
import {
  IconDataNavigationMenu,
  IconDataClose,
} from "@scripts/icons/streamline/regular.mjs";

import userData from "@scripts/data/userData";
const user = userData("admin");

// Set up the store
const multiStore = useStore($multiStore);
let subStore = computed(() => multiStore.value["mobileMenuVisible"]);

// Set initial value for the `mobileMenuVisible` sub-store
updateStore("mobileMenuVisible", false);

// Toggle the boolean value when the button is clicked
const handleButtonClick = () => {
  updateStore("mobileMenuVisible", !subStore.value);
};
</script>
