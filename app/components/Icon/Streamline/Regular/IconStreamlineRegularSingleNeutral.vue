<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBox">
    <desc>Single Neutral Streamline Icon: https://streamlinehq.com</desc>
    <path
      d="M6.75 6a5.25 5.25 0 1 0 10.5 0 5.25 5.25 0 1 0 -10.5 0Z"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="M2.25 23.25a9.75 9.75 0 0 1 19.5 0"
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
