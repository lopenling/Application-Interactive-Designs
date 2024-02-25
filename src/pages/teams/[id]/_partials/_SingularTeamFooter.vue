<template>
  <div v-if="singularTeam && role == 'admin'">
    <div
      v-if="
        selectedUserInFilterInStore &&
        (singularTeam.disabledCustomDictionaryIds.length > 0 ||
          singularTeam.enabledNativeDictionaryIds.length < nativeDictionariesInStore.length)
      "
      class="col-span-full self-center md:col-span-6"
    >
      <BaseActionLink
        @click="updateStore('showDisabledDictionaries', !showDisabledDictionariesInStore)"
      >
        <span v-if="!showDisabledDictionariesInStore">Show</span>
        <span v-else>Hide</span>
        disabled dictionaries
      </BaseActionLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";

import { type AstroGlobal } from "astro";
import { type TNativeDictionary } from "@scripts/data/nativeDictionariesData";
import { type TTeam } from "@scripts/data/teamsData";
import { type TOption } from "@components/BaseCombobox/BaseCombobox.types";

import getRole from "@scripts/helpers/getRole";
import teamsData from "@scripts/data/teamsData";
import nativeDictionariesData from "@scripts/data/nativeDictionariesData";

import BaseActionLink from "@components/BaseActionLink/BaseActionLink.vue";

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const params = props.astro.params;

const role = getRole(props.astro);
const teams = teamsData();
const nativeDictionaries = nativeDictionariesData();

/**
 * Store
 *
 * Setup the multi-store.
 * Setup the sub-store inside multi-store by assigning a `storeKey` and initial value.
 * Reactively get data from stores
 */

const multiStore = useStore($multiStore);
if (!multiStore.value["teams"]) updateStore("teams", teams);
if (!multiStore.value["nativeDictionaries"]) updateStore("nativeDictionaries", nativeDictionaries);
if (!multiStore.value["selectedUserInFilter"]) updateStore("selectedUserInFilter", null);
if (!multiStore.value["showDisabledDictionaries"]) updateStore("showDisabledDictionaries", false);

const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);
const singularTeam = computed(
  () => teamsInStore.value.find((team) => team.id === Number(params.id)) as TTeam,
);
const nativeDictionariesInStore = computed(
  () => multiStore.value["nativeDictionaries"] as TNativeDictionary[],
);
const selectedUserInFilterInStore = computed(
  () => multiStore.value["selectedUserInFilter"] as TOption,
);
const showDisabledDictionariesInStore = computed(
  () => multiStore.value["showDisabledDictionaries"] as boolean,
);
</script>
