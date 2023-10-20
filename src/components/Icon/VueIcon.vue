<template>
  <svg v-bind="attributes" v-html="props.data?.content"></svg>
</template>

<script setup lang="ts">
import { type TProps } from "@components/Icon/Icon.types";
import mergeAttributes from "@scripts/helpers/mergeAttributes";

const props = defineProps<TProps>();
const attributes = mergeAttributes(
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: props.data?.fill || "",
    stroke: props.data?.stroke || "",
    viewBox: props.data?.viewBox || "",
    "aria-hidden": "true",
  },
  props.attributes,
);
</script>
