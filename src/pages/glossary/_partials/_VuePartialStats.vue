<template>
  <div
    v-if="props.role === 'admin'"
    class="mb-12 flex flex-row flex-wrap gap-x-6 gap-y-1 sm:mb-6 sm:justify-end"
  >
    <div class="mt-2 flex items-center text-sm text-stone-500">
      <VueIcon
        :data="IconDataBookEdit"
        :attributes="{ class: `mr-1.5 h-5 w-5 flex-shrink-0 text-stone-400` }"
      />
      0/{{ MAX_CUSTOM_DICTIONARIES }} custom
    </div>

    <div class="mt-2 flex items-center text-sm text-stone-500">
      <VueIcon
        :data="IconDataBookClose2"
        :attributes="{ class: `mr-1.5 h-5 w-5 flex-shrink-0 text-stone-400` }"
      />
      {{ dictionaries.filter((item) => item.enabled).length }}/{{
        dictionaries.length
      }}
      native
    </div>

    <div class="mt-2 flex items-center text-sm text-stone-500">
      <VueIcon
        :data="IconDataSingleNeutral"
        :attributes="{ class: `mr-1.5 h-5 w-5 flex-shrink-0 text-stone-400` }"
      />
      {{ users.length }}
    </div>
  </div>

  <div v-else class="flex h-12"></div>
</template>

<script setup lang="ts">
import { type TRole } from "@lib/types";
import { MAX_CUSTOM_DICTIONARIES } from "@scripts/data/constants";

import dictionariesData from "@scripts/data/dictionariesData";
import organizationUsersData from "@scripts/data/organizationUsersData";

import VueIcon from "@components/Icon/VueIcon.vue";
import {
  IconDataBookClose2,
  IconDataBookEdit,
  IconDataSingleNeutral,
} from "@scripts/icons/streamline/regular.mjs";

// Get dictionaries and users data
const dictionaries = dictionariesData();
const users = organizationUsersData();

// Define partial props
type TProps = { role?: TRole };
const props = defineProps<TProps>();
</script>
