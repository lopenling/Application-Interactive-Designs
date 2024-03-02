<template>
  <button
    @click="handleButtonClick"
    class="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0 sm:hover:bg-stone-100 sm:hover:text-stone-500"
    style="-webkit-tap-highlight-color: transparent"
  >
    <span class="absolute -inset-0.5"></span>
    <span class="sr-only">Open main menu</span>
    <VueIcon
      v-if="!subStore"
      :data="IconDataNavigationMenu"
      :attributes="{ class: `block h-6 w-6` }"
    />
    <VueIcon v-else :data="IconDataClose" :attributes="{ class: `block h-6 w-6` }" />
    <div class="ml-4">
      <BaseAvatar
        :user="signedInUser"
        :group-hover="true"
        :hide-image="state == 'empty'"
        size-class="size-8"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import { type AstroGlobal } from "astro";
import signedInUserData from "@scripts/data/signedInUserData";
import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";

import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";

import BaseAvatar from "@components/BaseAvatar/BaseAvatar.vue";
import VueIcon from "@components/Icon/VueIcon.vue";
import { IconDataNavigationMenu, IconDataClose } from "@scripts/icons/streamline/regular.mjs";

type TProps = { astro: AstroGlobal };

const props = defineProps<TProps>();
const role = getRole(props.astro);
const state = getState(props.astro);
const signedInUser = signedInUserData(role);

// Set up the store
const multiStore = useStore($multiStore);
let subStore = computed(() => multiStore.value["mobileMenuVisible"]);

// Set initial value for the `mobileMenuVisible` sub-store
updateStore("mobileMenuVisible", false);

// Toggle the boolean value in store when the button is clicked
const handleButtonClick = () => {
  updateStore("mobileMenuVisible", !subStore.value);
};
</script>
