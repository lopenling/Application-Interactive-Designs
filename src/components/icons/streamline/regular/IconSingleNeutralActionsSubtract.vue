<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBoxValue">
    <desc>Single Neutral Actions Subtract Streamline Icon: https://streamlinehq.com</desc>
    <path
      d="M0.75 17.25a6.753 6.753 0 0 1 9.4 -6.208"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="M3.375 4.875a4.125 4.125 0 1 0 8.25 0 4.125 4.125 0 1 0 -8.25 0Z"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="M11.25 17.249a6 6 0 1 0 12 0 6 6 0 1 0 -12 0Z"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="m14.25 17.249 6 0"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const attrs = useAttrs();
let viewBoxValue = "0 0 24 24";
let strokeWidth = "1.5";

if (attrs["data-expand-by"]) {
  viewBoxValue = viewBoxValue
    .split(" ")
    .map((value, index) => {
      if (index < 2) {
        return parseInt(value) - Number(attrs["data-expand-by"]);
      } else {
        return parseInt(value) + Number(attrs["data-expand-by"]) * 2;
      }
    })
    .join(" ");
}
if (attrs["data-stroke-width"]) strokeWidth = attrs["data-stroke-width"].toString();
</script>
