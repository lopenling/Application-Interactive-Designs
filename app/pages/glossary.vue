<template>
  <NuxtLayout name="glossary">
    <template #default>
      <div class="container-md">
        Main content placeholder<br />
        <button type="button" @click="store.controlSidebarVisibility(!store.isSidebarVisible)">
          Button placeholder
        </button>
      </div>
    </template>
    <template #sidebar-content>Sidebar content placeholder</template>
    <template #sidebar-footer>Sidebar footer placeholder </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
const store = useGlossaryStore();
</script>
