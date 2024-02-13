<template>
  <button
    v-bind="$attrs"
    type="button"
    class="rounded-md px-2.5 py-1.5 text-sm text-stone-400/80 underline decoration-transparent decoration-2 underline-offset-2 transition hover:bg-stone-100 hover:text-stone-700"
  >
    <slot></slot>
  </button>
</template>
