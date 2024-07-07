<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBoxValue">
    <desc>Validation Check Streamline Icon: https://streamlinehq.com</desc>
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M1.125 14.0625 5.0512500000000005 18.900000000000002a2.1847499999999997 2.1847499999999997 0 0 0 3.375 -0.020249999999999997L21.375 2.8125"
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
