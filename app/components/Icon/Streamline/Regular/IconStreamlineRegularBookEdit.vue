<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" :viewBox="viewBox">
    <desc>Book Edit Streamline Icon: https://streamlinehq.com</desc>
    <path
      d="M8.249 23.25H3A2.25 2.25 0 0 1 0.751 21"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="M18.751 9V1.5A0.75 0.75 0 0 0 18 0.75H3.751a3 3 0 0 0 -3 3V21A2.25 2.25 0 0 1 3 18.75h6"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    ></path>
    <path
      d="M22.629 14.87 15 22.5l-3.75 0.75 0.75 -3.75 7.63 -7.63a2.114 2.114 0 0 1 2.992 0l0.008 0.008a2.116 2.116 0 0 1 -0.001 2.992Z"
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
