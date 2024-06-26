/**
 * This function sorts an array of objects by a key in ascending order.
 * Slice is used to create a shallow copy of the array to prevent mutation.

 * @param array - Expects an array of objects
 * @param prop - Expects a string key
 * @returns Sorted array
 */

export default function sortArrayByKey(array: any[], prop: string) {
  return array.slice().sort((a, b) => {
    if (a[prop] < b[prop]) {
      return -1;
    } else if (a[prop] > b[prop]) {
      return 1;
    } else {
      return 0;
    }
  });
}
