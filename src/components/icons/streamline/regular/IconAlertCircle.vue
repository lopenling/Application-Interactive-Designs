<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBoxValue">
    <desc>Alert Circle Streamline Icon: https://streamlinehq.com</desc>
    <path
      stroke="currentColor"
      d="M12 17.25c-0.2071 0 -0.375 -0.1679 -0.375 -0.375s0.1679 -0.375 0.375 -0.375"
      :stroke-width="strokeWidth"
    ></path>
    <path
      stroke="currentColor"
      d="M12 17.25c0.2071 0 0.375 -0.1679 0.375 -0.375S12.2071 16.5 12 16.5"
      :stroke-width="strokeWidth"
    ></path>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-miterlimit="10"
      d="M12 13.5V5.25"
      :stroke-width="strokeWidth"
    ></path>
    <path
      stroke="currentColor"
      stroke-miterlimit="10"
      d="M12 23.25c6.2132 0 11.25 -5.0368 11.25 -11.25S18.2132 0.75 12 0.75 0.75 5.7868 0.75 12 5.7868 23.25 12 23.25Z"
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
