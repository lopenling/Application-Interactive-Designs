import { computed } from "vue";
import { useStore } from "@nanostores/vue";
import { $multiStore } from "@stores/componentStates.mjs";
import { type TUser } from "@scripts/data/usersData";

/**
 * Get User Full Name By Id
 *
 * Find the user by its `id` from `users` store and retrun both `firstName` and
 * `lastName` as a single string.
 */

export default function getUserFullNameById(id: number) {
  const multiStore = useStore($multiStore);
  const usersInStore = computed(() => multiStore.value["users"] as TUser[]);

  const { firstName, lastName } = usersInStore.value.find((user) => user.id === id) || {};
  return `${firstName ? firstName : ""} ${lastName ? lastName : ""}`;
}
