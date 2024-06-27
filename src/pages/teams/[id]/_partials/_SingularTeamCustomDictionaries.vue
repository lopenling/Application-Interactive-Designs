<template>
  <div v-if="singularTeam && role == 'admin'">
    <CardHeader>
      <CardHeaderHeading>
        Custom dictionaries

        <template
          #extraHeading
          v-if="singularTeam.enabledCustomDictionaryIds.length > 0 && selectedUserInFilterInStore"
        >
          &ndash; {{ getUserFullNameById(selectedUserInFilterInStore.id) }}
        </template>
      </CardHeaderHeading>

      <template #button>
        <CardHeaderButton @click="openModalTeamNewCustomDictionary()" :iconComponent="IconAdd">
          New dictionary
        </CardHeaderButton>
      </template>
    </CardHeader>

    <SettingsCard class="divide-y">
      <SettingsCardRowExpandableToggle
        v-if="
          combinedCustomDictionaryIds.length > 0 &&
          !selectedUserInFilterInStore &&
          state == 'filled'
        "
        v-for="dictionary in customDictionariesInStore.filter((dictionary) =>
          combinedCustomDictionaryIds.includes(dictionary.id),
        )"
        @update:modelValue="
          updateTeamsCustomDictionariesData({
            dictionaryId: dictionary.id,
            payload: $event,
            teamId: singularTeamId,
          })
        "
        :is-toggled="singularTeam.enabledCustomDictionaryIds.includes(dictionary.id)"
      >
        {{ dictionary.name }}
        <span
          v-if="
            isDictionaryInExcludedUsers({
              dictionaryId: dictionary.id,
              teamId: singularTeamId,
              dictionaryType: 'custom',
            })
          "
          class="font-normal text-stone-400/80"
          title="Some users are excluded"
        >
          *
        </span>

        <template #extraButtons>
          <SettingsCardSubtleButton
            @click="openModalTeamEditCustomDictionary({ dictionaryId: dictionary.id })"
            :iconComponent="IconAdd"
          >
            Edit
          </SettingsCardSubtleButton>
        </template>
        <template #expandableArea>
          <SettingsCardSubRowToggle
            v-for="user in usersInStore.filter((user) => combinedUserIds.includes(user.id))"
            @update:modelValue="
              updateTeamsExcludedUsersData({
                userId: user.id,
                dictionaryId: dictionary.id,
                payload: $event,
                teamId: singularTeamId,
                dictionaryType: 'custom',
              })
            "
            :is-toggled="
              !isUserExcludedFromDictionary({
                userId: user.id,
                dictionaryId: dictionary.id,
                teamId: singularTeamId,
                dictionaryType: 'custom',
              })
            "
            :is-grayscale="!singularTeam.enabledCustomDictionaryIds.includes(dictionary.id)"
          >
            {{ getUserFullNameById(user.id) }}

            <template #extraData>{{ user.email }}</template>
          </SettingsCardSubRowToggle>
        </template>
      </SettingsCardRowExpandableToggle>

      <!-- Filter applied -->

      <SettingsCardRowToggle
        v-if="selectedUserInFilterInStore"
        v-for="dictionary in customDictionariesInStore.filter((dictionary) =>
          showDisabledDictionariesInStore
            ? singularTeam.enabledCustomDictionaryIds.includes(dictionary.id) ||
              singularTeam.disabledCustomDictionaryIds.includes(dictionary.id)
            : singularTeam.enabledCustomDictionaryIds.includes(dictionary.id),
        )"
        @update:modelValue="
          updateTeamsExcludedUsersData({
            userId: selectedUserInFilterInStore.id,
            dictionaryId: dictionary.id,
            payload: $event,
            teamId: singularTeamId,
            dictionaryType: 'custom',
          })
        "
        :is-toggled="
          !isUserExcludedFromDictionary({
            userId: selectedUserInFilterInStore.id,
            dictionaryId: dictionary.id,
            teamId: singularTeamId,
            dictionaryType: 'custom',
          })
        "
        appearance="secondary"
      >
        {{ dictionary.name }}
        <span
          v-if="!singularTeam.enabledCustomDictionaryIds.includes(dictionary.id)"
          class="font-normal text-stone-400/80"
        >
          &ndash; Disabled
        </span>
      </SettingsCardRowToggle>

      <!-- No rows -->

      <SettingsCardRowMessage v-if="combinedCustomDictionaryIds.length === 0 || state == 'empty'">
        No dictionaries created yet
      </SettingsCardRowMessage>

      <SettingsCardRowMessage
        v-if="
          selectedUserInFilterInStore &&
          !showDisabledDictionariesInStore &&
          singularTeam.enabledCustomDictionaryIds.length === 0 &&
          combinedCustomDictionaryIds.length !== 0
        "
      >
        No custom dictionaries enabled
      </SettingsCardRowMessage>
    </SettingsCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";
import eventBus from "@scripts/general/eventBus";

import { type AstroGlobal } from "astro";
import { type TTeam } from "@scripts/data/teamsData";
import { type TUser } from "@scripts/data/usersData";
import { type TCustomDictionary } from "@scripts/data/customDictionariesData";
import { type TOption } from "@components/BaseCombobox/BaseCombobox.types";
import { type TSingularTeamModalEditCustomDictionary } from "./_SingularTeamModalEditCustomDictionary.vue";

import usersData from "@scripts/data/usersData";
import teamsData from "@scripts/data/teamsData";
import customDictionariesData from "@scripts/data/customDictionariesData";

import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";
import isUserExcludedFromDictionary from "@scripts/helpers/isUserExcludedFromDictionary";
import isDictionaryInExcludedUsers from "@scripts/helpers/isDictionaryInExcludedUsers";
import getUserFullNameById from "@scripts/helpers/getUserFullNameById";
import updateTeamsCustomDictionariesData from "@scripts/helpers/updateTeamsCustomDictionariesData";
import updateTeamsExcludedUsersData from "@scripts/helpers/updateTeamsExcludedUsersData";

import CardHeader from "@components/CardHeader/CardHeader.vue";
import CardHeaderHeading from "@components/CardHeader/CardHeaderHeading.vue";
import CardHeaderButton from "@components/CardHeader/CardHeaderButton.vue";
import SettingsCard from "@components/SettingsCard/SettingsCard.vue";
import SettingsCardRowToggle from "@components/SettingsCard/SettingsCardRowToggle.vue";
import SettingsCardRowExpandableToggle from "@components/SettingsCard/SettingsCardRowExpandableToggle.vue";
import SettingsCardSubRowToggle from "@components/SettingsCard/SettingsCardSubRowToggle.vue";
import SettingsCardRowMessage from "@components/SettingsCard/SettingsCardRowMessage.vue";
import SettingsCardSubtleButton from "@components/SettingsCard/SettingsCardSubtleButton.vue";

import IconAdd from "@components/icons/streamline/regular/IconAdd.vue";

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const params = props.astro.params;
const singularTeamId = Number(params.id);

const role = getRole(props.astro);
const state = getState(props.astro);
const users = usersData();
const teams = teamsData();
const customDictionaries = customDictionariesData();

const openModalTeamNewCustomDictionary = () => {
  eventBus.emit("open-modal", { name: "team-new-custom-dictionary" });
};
const openModalTeamEditCustomDictionary = (data: TSingularTeamModalEditCustomDictionary) => {
  eventBus.emit("open-modal", { name: "team-edit-custom-dictionary", data: data });
};

/**
 * Store
 *
 * Setup the multi-store.
 * Setup the sub-store inside multi-store by assigning a `storeKey` and initial value.
 * Reactively get data from stores
 */

const multiStore = useStore($multiStore);
if (!multiStore.value["users"]) updateStore("users", users);
if (!multiStore.value["teams"]) updateStore("teams", teams);
if (!multiStore.value["customDictionaries"]) updateStore("customDictionaries", customDictionaries);
if (!multiStore.value["selectedUserInFilter"]) updateStore("selectedUserInFilter", null);
if (!multiStore.value["showDisabledDictionaries"]) updateStore("showDisabledDictionaries", false);

const usersInStore = computed(() => multiStore.value["users"] as TUser[]);
const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);
const singularTeam = computed(
  () => teamsInStore.value.find((team) => team.id === singularTeamId) as TTeam,
);
const customDictionariesInStore = computed(
  () => multiStore.value["customDictionaries"] as TCustomDictionary[],
);
const combinedCustomDictionaryIds = computed(() => [
  ...singularTeam.value.enabledCustomDictionaryIds,
  ...singularTeam.value.disabledCustomDictionaryIds,
]);
const combinedUserIds = computed(() => [
  ...singularTeam.value.adminUserIds,
  ...singularTeam.value.memberUserIds,
]);
const selectedUserInFilterInStore = computed(
  () => multiStore.value["selectedUserInFilter"] as TOption,
);
const showDisabledDictionariesInStore = computed(
  () => multiStore.value["showDisabledDictionaries"] as boolean,
);
</script>
