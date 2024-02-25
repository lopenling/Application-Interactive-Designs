<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBoxValue">
    <desc>Book Edit Streamline Icon: https://streamlinehq.com</desc>
    <defs></defs>
    <!-- <title>book-edit</title> -->
    <path
      d="M8.249 23.25H3A2.25 2.25 0 0 1 0.751 21"
      fill="none"
      stroke="currentcolor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="M18.751 9V1.5A0.75 0.75 0 0 0 18 0.75H3.751a3 3 0 0 0 -3 3V21A2.25 2.25 0 0 1 3 18.75h6"
      fill="none"
      stroke="currentcolor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="M22.629 14.87 15 22.5l-3.75 0.75 0.75 -3.75 7.63 -7.63a2.114 2.114 0 0 1 2.992 0l0.008 0.008a2.116 2.116 0 0 1 -0.001 2.992Z"
      fill="none"
      stroke="currentcolor"
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
