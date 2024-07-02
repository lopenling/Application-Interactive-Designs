<template>
  <div
    class="flex flex-row items-start justify-between gap-2 px-4 pb-6 pt-4 text-sm text-stone-700 sm:items-center sm:py-4"
  >
    <div
      class="flex min-w-0 grow flex-col items-start gap-x-4 gap-y-2 2xs:flex-row sm:items-center"
    >
      <BaseAvatar
        :user-id="props.userId"
        :subdue-image="props.subdueImage"
        :hide-image="invitePending"
        size-class="size-9"
      />

      <div class="flex w-full min-w-0 grow flex-col gap-x-4 gap-y-2 sm:flex-row sm:items-center">
        <div :class="['flex min-w-0 flex-col', slots.extraData ? 'basis-1/2' : 'basis-full']">
          <div class="text-sm font-medium text-stone-700">
            <span v-if="!invitePending">
              {{ usersStore.getUserFullNameById(user.id) }}
            </span>
            <span v-if="invitePending" :title="user.email" class="block truncate">
              {{ usersStore.getUserById(user.id)!.email }}
            </span>
          </div>

          <div class="text-xs leading-5 text-stone-500/85">
            <span v-if="!invitePending" :title="user.email" class="block truncate">
              {{ usersStore.getUserById(user.id)!.email }}
            </span>
            <span v-if="invitePending">Invite pending</span>
          </div>
        </div>

        <div v-if="slots.extraData" class="flex min-w-0 basis-1/2 text-sm text-stone-500/85">
          <slot name="extraData" />
        </div>
      </div>
    </div>

    <div class="flex shrink-0 flex-col justify-start gap-2 xs:flex-row sm:w-auto sm:justify-start">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import BaseAvatar from "@components/BaseAvatar/BaseAvatar.vue";
import { useTeamsStore, type TTeam } from "@stores/teamsStore";
import { useUsersStore, type TUser } from "@stores/usersStore";

type TProps = {
  userId: TUser["id"];
  teamId: TTeam["id"];
  subdueImage?: boolean;
};
const props = defineProps<TProps>();
const slots = useSlots();
const teamsStore = useTeamsStore();
const usersStore = useUsersStore();
const user = computed(() => usersStore.getUserById(props.userId)! as TUser);
const invitePending = computed(() =>
  teamsStore.isUserInvitePendingByUserIdInTeam(props.userId, props.teamId),
);
</script>
