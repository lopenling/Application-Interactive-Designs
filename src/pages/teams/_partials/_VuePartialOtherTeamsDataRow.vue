<template>
  <div :class="[props.index == 0 ? '' : 'border-t']">
    <div
      class="flex items-center justify-between gap-2 px-4 text-sm text-stone-700"
    >
      <div class="py-4">
        {{ props.team.name }}
      </div>

      <button
        @click="
          console.log(
            'TODO: Show confirmation modal where user can confirm leaving by typing the team name',
          )
        "
        type="button"
        class="rounded-md p-1.5 text-sm text-stone-400/80 underline decoration-transparent decoration-2 underline-offset-2 transition hover:bg-stone-100 hover:text-stone-700"
      >
        Leave team
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type TTeam } from "@scripts/data/teamsData";

// Define partial props
type TProps = {
  team: TTeam;
  index: number;
};
const props = defineProps<TProps>();
</script>
