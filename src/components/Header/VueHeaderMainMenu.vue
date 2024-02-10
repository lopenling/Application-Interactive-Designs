<template>
  <nav class="-my-px flex gap-x-8">
    <a
      v-for="item in navigation"
      :href="item.href"
      :class="[
        item.current
          ? 'border-primary-500 text-stone-900'
          : 'border-transparent text-stone-500 hover:border-stone-300 hover:text-stone-700',
        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition',
      ]"
      :aria-current="item.current ? 'page' : undefined"
    >
      {{ item.name }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { type AstroGlobal } from "astro";
import navigationData from "@scripts/data/navigationData";

type TProps = { astro: AstroGlobal };

const props = defineProps<TProps>();
const navigation = navigationData(props.astro);
</script>
