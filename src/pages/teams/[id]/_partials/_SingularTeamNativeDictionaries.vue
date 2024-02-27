<template>
  <div v-if="singularTeam && role == 'admin'">
    <CardHeader>
      <CardHeaderHeading>
        Native dictionaries

        <template
          #extraHeading
          v-if="singularTeam.enabledNativeDictionaryIds.length > 0 && selectedUserInFilterInStore"
        >
          &ndash; {{ getUserFullNameById(selectedUserInFilterInStore!.id) }}
        </template>
      </CardHeaderHeading>
    </CardHeader>

    <SettingsCard>
      <SettingsCardRowExpandableToggle
        v-if="!selectedUserInFilterInStore"
        v-for="(dictionary, index) in nativeDictionariesInStore"
        @update:modelValue="
          updateTeamsNativeDictionariesData({
            dictionaryId: dictionary.id,
            payload: $event,
            teamId: singularTeamId,
          })
        "
        :is-toggled="singularTeam.enabledNativeDictionaryIds.includes(dictionary.id)"
        :index="index"
      >
        {{ dictionary.name }}
        <span
          v-if="
            isDictionaryInExcludedUsers({
              dictionaryId: dictionary.id,
              teamId: singularTeamId,
              dictionaryType: 'native',
            })
          "
          class="font-normal text-stone-400/80"
          title="Some users are excluded"
        >
          *
        </span>

        <template #expandableArea>
          <SettingsCardSubRowToggle
            v-for="(user, index) in usersInStore.filter((user) =>
              combinedUserIds.includes(user.id),
            )"
            @update:modelValue="
              updateTeamsExcludedUsersData({
                userId: user.id,
                dictionaryId: dictionary.id,
                payload: $event,
                teamId: singularTeamId,
                dictionaryType: 'native',
              })
            "
            :is-toggled="
              !isUserExcludedFromDictionary({
                userId: user.id,
                dictionaryId: dictionary.id,
                teamId: singularTeamId,
                dictionaryType: 'native',
              })
            "
            :is-grayscale="!singularTeam.enabledNativeDictionaryIds.includes(dictionary.id)"
            :index="index"
          >
            {{ getUserFullNameById(user.id) }}

            <template #extraData>{{ user.email }}</template>
          </SettingsCardSubRowToggle>
        </template>
      </SettingsCardRowExpandableToggle>

      <!-- Filter applied -->

      <SettingsCardRowToggle
        v-if="selectedUserInFilterInStore"
        v-for="(dictionary, index) in nativeDictionariesInStore.filter((dictionary) =>
          showDisabledDictionariesInStore
            ? true
            : singularTeam.enabledNativeDictionaryIds.includes(dictionary.id),
        )"
        @update:modelValue="
          updateTeamsExcludedUsersData({
            userId: selectedUserInFilterInStore.id,
            dictionaryId: dictionary.id,
            payload: $event,
            teamId: singularTeamId,
            dictionaryType: 'native',
          })
        "
        :is-toggled="
          !isUserExcludedFromDictionary({
            userId: selectedUserInFilterInStore.id,
            dictionaryId: dictionary.id,
            teamId: singularTeamId,
            dictionaryType: 'native',
          })
        "
        :index="index"
        appearance="secondary"
      >
        {{ dictionary.name }}
        <span
          v-if="!singularTeam.enabledNativeDictionaryIds.includes(dictionary.id)"
          class="font-normal text-stone-400/80"
        >
          &ndash; Disabled
        </span>
      </SettingsCardRowToggle>

      <!-- No rows -->

      <SettingsCardRowMessage
        v-if="
          selectedUserInFilterInStore &&
          !showDisabledDictionariesInStore &&
          singularTeam.enabledNativeDictionaryIds.length === 0
        "
      >
        No native dictionaries enabled
      </SettingsCardRowMessage>
    </SettingsCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore, updateStore } from "@stores/componentStates.mjs";

import { type AstroGlobal } from "astro";
import { type TUser } from "@scripts/data/usersData";
import { type TTeam } from "@scripts/data/teamsData";
import { type TNativeDictionary } from "@scripts/data/nativeDictionariesData";
import { type TOption } from "@components/BaseCombobox/BaseCombobox.types";

import getRole from "@scripts/helpers/getRole";
import isUserExcludedFromDictionary from "@scripts/helpers/isUserExcludedFromDictionary";
import isDictionaryInExcludedUsers from "@scripts/helpers/isDictionaryInExcludedUsers";
import getUserFullNameById from "@scripts/helpers/getUserFullNameById";
import updateTeamsNativeDictionariesData from "@scripts/helpers/updateTeamsNativeDictionariesData";
import updateTeamsExcludedUsersData from "@scripts/helpers/updateTeamsExcludedUsersData";

import usersData from "@scripts/data/usersData";
import teamsData from "@scripts/data/teamsData";
import nativeDictionariesData from "@scripts/data/nativeDictionariesData";

import CardHeader from "@components/CardHeader/CardHeader.vue";
import CardHeaderHeading from "@components/CardHeader/CardHeaderHeading.vue";
import SettingsCard from "@components/SettingsCard/SettingsCard.vue";
import SettingsCardRowToggle from "@components/SettingsCard/SettingsCardRowToggle.vue";
import SettingsCardRowExpandableToggle from "@components/SettingsCard/SettingsCardRowExpandableToggle.vue";
import SettingsCardSubRowToggle from "@components/SettingsCard/SettingsCardSubRowToggle.vue";
import SettingsCardRowMessage from "@components/SettingsCard/SettingsCardRowMessage.vue";

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const params = props.astro.params;
const singularTeamId = Number(params.id);

const role = getRole(props.astro);
const users = usersData();
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
if (!multiStore.value["users"]) updateStore("users", users);
if (!multiStore.value["teams"]) updateStore("teams", teams);
if (!multiStore.value["nativeDictionaries"]) updateStore("nativeDictionaries", nativeDictionaries);
if (!multiStore.value["selectedUserInFilter"]) updateStore("selectedUserInFilter", null);
if (!multiStore.value["showDisabledDictionaries"]) updateStore("showDisabledDictionaries", false);

const usersInStore = computed(() => multiStore.value["users"] as TUser[]);
const teamsInStore = computed(() => multiStore.value["teams"] as TTeam[]);
const singularTeam = computed(
  () => teamsInStore.value.find((team) => team.id === singularTeamId) as TTeam,
);
const nativeDictionariesInStore = computed(
  () => multiStore.value["nativeDictionaries"] as TNativeDictionary[],
);
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
