import { deepMap } from "nanostores";

/**
 * Using Nanostores to share states/data between components.
 *
 * DeepMap store allows us to use nested objects and keep the reactivity (unlike
 * a regular map). This is useful because then we can have multiple sub-stores
 * inside one master store. Each sub-store corresponds to a specific and unique
 * key `storeKey`.
 * Would be nice to have a better way to do this, but unfortunately in .astro
 * files, we can't really use the stores directly.
 *
 * So here is the solution:
 * Each component that needs to use a store will have to import this file and
 * write data under the key `storeKey`. The actual `storeKey` value comes from
 * the .astro file, where the components are imported and used, by passing it
 * along as a prop e.g. `<MyComponent storeKey="uniqueStoreName" />`.
 */

export const $multiStore = deepMap(() => ({})); // Define it as an empty object

/**
 * Update the sub-store
 *
 * Create a new object `updatedStores` by spreading the existing stores and
 * adding/updating a specfic sub-store using the `storeKey`. Then update the
 * master store with this new object.
 */
export function updateStore(storeKey, newStoreValue) {
  if (!storeKey) {
    throw new Error(
      "`storeKey` is needed to use `updateStore` on the correct store.",
    );
  }
  const updatedStores = { ...$multiStore.get(), [storeKey]: newStoreValue };
  $multiStore.set(updatedStores);
}

/**
 * Clear the sub-store
 *
 * Update the sub-store with a `null` value.
 */
export function clearStore(storeKey) {
  updateStore(storeKey, null);
}

/**
 * Add array item to the sub-store
 *
 * Create a new array `newStoreValue` by spreading the existing store's array
 * and adding the new value to it. Then update the store with this new array.
 */
export function addArrayItemToStore(storeKey, value) {
  if (!storeKey) {
    throw new Error(
      "`storeKey` is needed to use `addArrayItemToStore` on the correct store.",
    );
  }
  const currentStore = $multiStore.get();
  const newStoreValue = [...currentStore[storeKey], value];
  updateStore(storeKey, newStoreValue);
}

/**
 * Remove a specific array item from the sub-store
 *
 * Create a new array `newStoreValue` by spreading the existing store's array
 * and filtering out the item which matches the `value` argument.
 * If ´key´ is provided, treat the array as an array of objects and remove the
 * object which `key` matches the `value` argument.
 * If no `key` is provided, treat the array as a regular array and remove the
 * item which matches the `value`.
 * Then update the store with this new array.
 */
export function removeArrayItemFromStore(storeKey, value, key) {
  if (!storeKey) {
    throw new Error(
      "`storeKey` is needed to use `removeArrayItemFromStore` on the correct store.",
    );
  }
  const currentStore = $multiStore.get();
  let newStoreValue;

  if (key) {
    newStoreValue = currentStore[storeKey].filter(
      (item) => item[key] !== value,
    );
  } else {
    newStoreValue = currentStore[storeKey].filter((item) => item !== value);
  }

  updateStore(storeKey, newStoreValue);
}

/**
 * Add object property to the sub-store
 *
 * Create a new object `newStoreValue` by spreading the existing store's object
 * and add the new `key` and `value` to it. Then update the store with this new
 * object.
 */
export function addObjectPropertyToStore(storeKey, key, value) {
  if (!storeKey) {
    throw new Error(
      "`storeKey` is needed to use `addObjectPropertyToStore` on the correct store.",
    );
  }
  const currentStore = $multiStore.get();

  const newStoreValue = { ...currentStore[storeKey] };
  newStoreValue[key] = value;
  updateStore(storeKey, newStoreValue);
}

/**
 * Remove a specific object property from the sub-store
 *
 * Create a new object `newStoreValue` by spreading the existing store's object
 * and delete the property which `key` matches the `propertyKey` argument.
 * Then update the store with this new object.
 */
export function removeObjectPropertyFromStore(storeKey, propertyKey) {
  if (!storeKey) {
    throw new Error(
      "`storeKey` is needed to use `removeObjectPropertyFromStore` on the correct store.",
    );
  }
  const currentStore = $multiStore.get();

  if (currentStore[storeKey].hasOwnProperty(propertyKey)) {
    const newStoreValue = { ...currentStore[storeKey] };
    delete newStoreValue[propertyKey];
    updateStore(storeKey, newStoreValue);
  }
}
