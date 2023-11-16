/**
 * renderSlot
 *
 * This function is basically a wrapper around Astro's `Astro.slots.render` method.
 * https://docs.astro.build/en/reference/api-reference/#astroslotsrender
 *
 * Used for passing through html from Astro component into the Vue component,
 * when dealing with multiple named slots.
 * @param {string} name - Expects a string of the slot name
 * @param {object} Astro - Expects the Astro object
 * @returns {string} HTML string
 */
export default async function renderSlot(name: string, Astro: any) {
  return await Astro.slots.render(name);
}
