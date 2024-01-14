<template>
  <div class="pb-8 pt-4 sm:hidden" v-if="subStore">
    <div class="flex flex-col gap-1">
      <a
        v-for="item in navigation"
        @click="closeMobileMenu"
        :key="item.name"
        :href="item.href"
        :class="[
          item.current
            ? 'border-primary-500 bg-primary-50 font-semibold text-stone-900'
            : 'border-transparent text-stone-600 hover:border-stone-300 hover:bg-stone-50 hover:text-stone-800',
          'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
        ]"
        :aria-current="item.current ? 'page' : undefined"
      >
        {{ item.name }}
      </a>
    </div>

    <div class="my-4 border-b border-gray-100"></div>

    <div class="flex flex-col gap-1">
      <a
        v-for="item in userNavigation"
        @click="closeMobileMenu"
        :key="item.name"
        :href="item.href"
        :class="[
          item.current
            ? 'border-primary-500 bg-primary-50 font-semibold text-stone-900'
            : 'border-transparent text-stone-600 hover:border-stone-300 hover:bg-stone-50 hover:text-stone-800',
          'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
        ]"
      >
        {{ item.name }}
      </a>
    </div>

    <div class="my-4 border-b border-gray-100"></div>

    <div class="flex flex-col gap-1">
      <a
        v-for="item in userNavigationExtra"
        @click="closeMobileMenu"
        :key="item.name"
        :href="item.href"
        class="block px-4 py-2 text-base font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-800"
      >
        {{ item.name }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TProps } from "@components/Header/HeaderMobileMenu.types";
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";

import navigationData from "@scripts/data/navigationData";
import userNavigationData from "@scripts/data/userNavigationData";
import userNavigationExtraData from "@scripts/data/userNavigationExtraData";

const props = defineProps<TProps>();
const navigation = navigationData(props.currentPath, props.currentRole);
const userNavigation = userNavigationData(props.currentPath, props.currentRole);
const userNavigationExtra = userNavigationExtraData(props.currentRole);

// Set up the store
const multiStore = useStore($multiStore);
let subStore = computed(() => multiStore.value["mobileMenuVisible"]);

// Toggle the boolean value in store when the button is clicked
const closeMobileMenu = () => {
  updateStore("mobileMenuVisible", false);
};
</script>
