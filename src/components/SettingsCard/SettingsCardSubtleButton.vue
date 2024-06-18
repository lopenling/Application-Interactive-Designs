<template>
  <button
    v-bind="$attrs"
    type="button"
    class="rounded-md px-2.5 py-1.5 text-sm text-stone-400/80 transition hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-0"
  >
    <slot></slot>
  </button>
</template>
