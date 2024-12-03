/**
 * Set page metadata layout to false unless the current route's meta
 * specifies a layout name.
 */
export default defineNuxtRouteMiddleware((to) => {
  if (!to.matched[0].meta.layout) {
    setPageLayout(false);
  }
});
