<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBoxValue">
    <desc>Warning Circle Streamline Icon: https://streamlinehq.com</desc>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11.25 21.375a10.125 10.125 0 1 0 0 -20.25 10.125 10.125 0 0 0 0 20.25Z"
      :stroke-width="strokeWidth"
    ></path>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11.25 6.1875v4.5"
      :stroke-width="strokeWidth"
    ></path>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11.25 16.3035a0.5625 0.5625 0 0 1 0 -1.125"
      :stroke-width="strokeWidth"
    ></path>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11.25 16.3035a0.5625 0.5625 0 0 0 0 -1.125"
      :stroke-width="strokeWidth"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const attrs = useAttrs();
let viewBoxValue = "-0.75 -0.75 24 24";
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
