<template>
  <div v-if="singularTeam && role == 'admin'">
    <div v-if="userInFilter && allCustomDictionaryIds!.length > enabledCustomDictionaryIds!.length">
      <BaseActionLink @click="teamsStore.toggleShowDisabledDictionaries()" class="text-sm">
        {{ showDisabledDictionaries ? "Hide" : "Show" }} disabled dictionaries
      </BaseActionLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTeamsStore, type TTeam, type TUserInFilter } from "@stores/teamsStore";

import { type AstroGlobal } from "astro";
import getRole from "@scripts/helpers/getRole";

import BaseActionLink from "@components/BaseActionLink/BaseActionLink.vue";

type TProps = { astro: AstroGlobal };
const props = defineProps<TProps>();
const params = props.astro.params;
const currentTeamId = Number(params.id);
const role = getRole(props.astro);

const teamsStore = useTeamsStore();
const singularTeam = computed(() => teamsStore.getTeamById(currentTeamId) as TTeam);
const userInFilter = computed(() => teamsStore.userInFilter as TUserInFilter);
const allCustomDictionaryIds = computed(() =>
  teamsStore.getAllCustomDictionaryIdsInTeam(singularTeam.value.id),
);
const enabledCustomDictionaryIds = computed(() => singularTeam.value.enabledCustomDictionaryIds);
const showDisabledDictionaries = computed(() => teamsStore.showDisabledDictionaries);
</script>
