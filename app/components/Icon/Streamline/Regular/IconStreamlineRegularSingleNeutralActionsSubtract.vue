<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBox">
    <desc>Single Neutral Actions Subtract Streamline Icon: https://streamlinehq.com</desc>
    <path
      d="M0.75 17.25a6.753 6.753 0 0 1 9.4 -6.208"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="M3.375 4.875a4.125 4.125 0 1 0 8.25 0 4.125 4.125 0 1 0 -8.25 0Z"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="M11.25 17.249a6 6 0 1 0 12 0 6 6 0 1 0 -12 0Z"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="m14.25 17.249 6 0"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  strokeWidth: Number,
  expandBy: Number,
});

let viewBox = "0 0 24 24";
let defaultStrokeWidth = 1.5;
let strokeWidth = props.strokeWidth || defaultStrokeWidth;

let expandBy = props.expandBy;
if (expandBy == undefined) {
  expandBy = (strokeWidth - defaultStrokeWidth) / 2;
}
viewBox = viewBox
  .split(" ")
  .map((value, index) => parseInt(value) + (index < 2 ? -expandBy : expandBy * 2))
  .join(" ");
</script>
