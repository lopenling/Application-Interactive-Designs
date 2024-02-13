<template>
  <div class="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
    <div>
      <slot name="default" />
    </div>

    <div>
      <slot name="button" />
    </div>
  </div>
</template>
