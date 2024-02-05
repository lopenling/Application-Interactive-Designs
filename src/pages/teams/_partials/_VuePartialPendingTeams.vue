<template>
  <div
    v-if="teamsUndecidedInvites.length > 0"
    class="group/wrapper -mt-4 mb-12 flex flex-col gap-y-4 sm:gap-y-2"
  >
    <div
      v-for="invite in teamsUndecidedInvites"
      class="flex flex-col rounded-md border border-secondary-500/15 bg-secondary-200/60 transition-opacity group-hover/wrapper:opacity-50 hover:group-hover/wrapper:opacity-100 sm:flex-row"
    >
      <div class="grow p-4 text-sm text-secondary-600">
        {{ invite.author }} invites you to join
        <span class="font-semibold">{{ invite.team }}</span> as
        {{ invite.role }}
      </div>

      <div class="group -mt-2 flex items-center text-sm sm:mt-0">
        <button
          @click="closeInvite(invite.id)"
          class="basis-full p-2 font-medium text-secondary-700 transition hover:text-secondary-800 group-hover:opacity-50 hover:group-hover:opacity-100 sm:px-6"
        >
          Reject
        </button>
        <span class="flex h-5 shrink-0 border-r border-secondary-500/25"></span>
        <button
          @click="closeInvite(invite.id)"
          class="basis-full p-2 font-medium text-secondary-700 transition hover:text-secondary-800 group-hover:opacity-50 hover:group-hover:opacity-100 sm:px-6"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import {
  $multiStore,
  updateStore,
  removeArrayItemFromStore,
} from "@stores/componentStates.mjs";

const invites = [
  {
    id: 1,
    team: "Omega",
    role: "Administrator",
    author: "Joseph Miller",
  },
  // {
  //   id: 2,
  //   team: "Sigma",
  //   role: "Member",
  //   author: "Joseph Miller",
  // },
];

// Setup the store
const multiStore = useStore($multiStore);
const teamsUndecidedInvites = computed(
  () => multiStore.value["teamsUndecidedInvites"],
) as any;

// Setting initial value to the store
updateStore("teamsUndecidedInvites", invites);

// Remove the item from the store when the button is clicked
const closeInvite = (inviteId: number) => {
  removeArrayItemFromStore("teamsUndecidedInvites", inviteId, "id");
};
</script>
