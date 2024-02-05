<template>
  <div :class="[props.index == 0 ? '' : 'border-t']">
    <a
      :href="'/teams/' + props.team.id"
      class="group flex items-center justify-between gap-2 px-4 text-stone-700 transition hover:bg-stone-50"
    >
      <div class="py-4 text-sm">
        <span
          class="underline decoration-transparent decoration-2 underline-offset-2 transition group-hover:text-primary-700 group-hover:decoration-primary-400/40"
        >
          {{ props.team.name }}
        </span>
      </div>

      <span
        class="rounded-md px-1.5 text-primary-500/70 transition group-hover:translate-x-1 group-hover:text-primary-600/70"
      >
        <VueIcon
          :data="IconDataArrowRight"
          :attributes="{ class: `h-4 w-4` }"
        />
      </span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { type TTeam } from "@scripts/data/teamsData";
import VueIcon from "@components/Icon/VueIcon.vue";
import { IconDataArrowRight } from "@scripts/icons/streamline/regular.mjs";

// Define partial props
type TProps = {
  team: TTeam;
  index: number;
};
const props = defineProps<TProps>();
</script>
