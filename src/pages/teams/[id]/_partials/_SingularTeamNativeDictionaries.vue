<template>
  <div v-if="singularTeam && role == 'admin'">
    <CardHeader>
      <CardHeaderHeading>
        <span v-if="userInFilter">
          {{
            !teamsStore.isUserInvitePendingByUserIdInTeam(userInFilter.id, singularTeam.id)
              ? usersStore.getPossessiveFirstNameById(userInFilter.id)
              : "Invitee's"
          }}
        </span>
        Native dictionaries
      </CardHeaderHeading>
    </CardHeader>

    <SettingsCard class="divide-y">
      <SettingsCardRowExpandableToggle
        v-if="allNativeDictionaries && !userInFilter && state == 'filled'"
        v-for="dictionary in allNativeDictionaries"
        :key="`native-${componentKey}-${dictionary.id}`"
        :modelValue="
          teamsStore.isNativeDictionaryEnabledByDictionaryIdInTeam(dictionary.id, singularTeam.id)!
        "
        @update:modelValue="
          teamsStore.toggleNativeDictionaryInTeam({
            dictionaryId: dictionary.id,
            teamId: singularTeam.id,
          })
        "
      >
        {{ dictionary.name }}
        <span
          v-if="
            teamsStore.isDictionaryIdInNativeDictionaryExlcudedUsers(dictionary.id, singularTeam.id)
          "
          class="font-normal text-stone-400/80"
          title="Some users are excluded"
          v-text="'*'"
        />

        <template #expandableArea>
          <SettingsCardSubRowToggle
            v-for="user in sortedUsers"
            :modelValue="
              !teamsStore.isUserExcludedFromNativeDictionary(
                user.id,
                dictionary.id,
                singularTeam.id,
              )!
            "
            @update:modelValue="
              ($event) => {
                teamsStore.updateUserExcludedFromNativeDictionary({
                  userId: user.id,
                  dictionaryId: dictionary.id,
                  value: $event,
                  teamId: singularTeam.id,
                });
              }
            "
            :is-grayscale="
              !teamsStore.isNativeDictionaryEnabledByDictionaryIdInTeam(
                dictionary.id,
                singularTeam.id,
              )
            "
          >
            <span v-if="user.invitePending" class="block truncate">{{ user.email }}</span>
            <span v-else>{{ usersStore.getUserFullNameById(user.id) || user.email }}</span>

            <template #extraData v-if="!user.invitePending">
              {{ user.email }}
            </template>
          </SettingsCardSubRowToggle>
        </template>
      </SettingsCardRowExpandableToggle>

      <!-- Filter applied -->

      <SettingsCardRowToggle
        v-if="userInFilter"
        v-for="dictionary in showDisabledDictionaries
          ? allNativeDictionaries
          : enabledNativeDictionaries"
        :modelValue="
          !teamsStore.isUserExcludedFromNativeDictionary(
            userInFilter!.id,
            dictionary.id,
            singularTeam.id,
          )!
        "
        @update:modelValue="
          teamsStore.updateUserExcludedFromNativeDictionary({
            userId: userInFilter.id,
            dictionaryId: dictionary.id,
            value: $event,
            teamId: singularTeam.id,
          })
        "
        appearance="secondary"
      >
        {{ dictionary.name }}
        <span
          v-if="
            !teamsStore.isNativeDictionaryEnabledByDictionaryIdInTeam(
              dictionary.id,
              singularTeam.id,
            )
          "
          class="font-normal text-stone-400/80"
        >
          &ndash; Disabled
        </span>
      </SettingsCardRowToggle>

      <!-- No rows -->

      <SettingsCardRowMessage
        v-if="
          userInFilter &&
          !showDisabledDictionaries &&
          enabledNativeDictionaries.length === 0 &&
          allNativeDictionaries.length > 0
        "
      >
        No native dictionaries enabled
      </SettingsCardRowMessage>
    </SettingsCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useTeamsStore, type TTeam, type TUserInFilter } from "@stores/teamsStore";
import { useUsersStore, type TUser } from "@stores/usersStore";
import { useDictionariesStore } from "@stores/dictionariesStore";

import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";
import getState from "@scripts/helpers/getState";

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
const currentTeamId = Number(params.id);
const role = getRole(props.astro);
const state = getState(props.astro);

const teamsStore = useTeamsStore();
const usersStore = useUsersStore();
const dictionariesStore = useDictionariesStore();
const singularTeam = computed(() => teamsStore.getTeamById(currentTeamId) as TTeam);
const userInFilter = computed(() => teamsStore.userInFilter as TUserInFilter);
const showDisabledDictionaries = computed(() => teamsStore.showDisabledDictionaries);

const users = computed(() => {
  const userIds = teamsStore.getAllUserIdsInTeam(singularTeam.value.id)!;
  return usersStore.getUsersByIds(userIds) as TUser[];
});

const sortedUsers = computed(() => {
  return users.value
    .map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      invitePending: teamsStore.isUserInvitePendingByUserIdInTeam(user.id, singularTeam.value!.id),
    }))
    .sort(
      (a: any, b: any) =>
        // First sort by invite status (pending invites last)
        a.invitePending - b.invitePending ||
        // Then sort by first name if it exists, otherwise by email
        (a.firstName || a.email)
          .toLowerCase()
          .localeCompare((b.firstName || b.email).toLowerCase()),
    );
});

const allNativeDictionaries = computed(() => dictionariesStore.nativeDictionaries);

const enabledNativeDictionaries = computed(() => {
  const enabledNativeDictionaryIds = singularTeam.value.enabledNativeDictionaryIds;
  return dictionariesStore.getNativeDictionariesByIds(enabledNativeDictionaryIds);
});

// Force components to re-render onmount to fix rendering bug. Hopefully not
// needed in prodction and is only Astro + Vue combo problem?
const componentKey = ref(0);
onMounted(() => {
  componentKey.value++;
});
</script>
