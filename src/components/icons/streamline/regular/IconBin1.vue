<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBoxValue">
    <desc>Bin 1 Streamline Icon: https://streamlinehq.com</desc>
    <g>
      <path
        d="m1 5 22 0"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        :stroke-width="strokeWidth"
      ></path>
      <path
        d="M14.25 1h-4.5a1.5 1.5 0 0 0 -1.5 1.5V5h7.5V2.5a1.5 1.5 0 0 0 -1.5 -1.5Z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        :stroke-width="strokeWidth"
      ></path>
      <path
        d="m9.75 17.75 0 -7.5"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        :stroke-width="strokeWidth"
      ></path>
      <path
        d="m14.25 17.75 0 -7.5"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        :stroke-width="strokeWidth"
      ></path>
      <path
        d="M18.86 21.62A1.49 1.49 0 0 1 17.37 23H6.63a1.49 1.49 0 0 1 -1.49 -1.38L3.75 5h16.5Z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        :stroke-width="strokeWidth"
      ></path>
    </g>
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
