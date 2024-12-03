import { defineStore } from "pinia";

export const useGlossaryStore = defineStore("glossary", {
  state: () => ({
    isSidebarVisible: false,
    isSidebarInTransition: false,
  }),
  actions: {
    controlSidebarVisibility(value: boolean) {
      if (this.isSidebarInTransition) return;
      this.isSidebarVisible = value;
    },
  },
});
