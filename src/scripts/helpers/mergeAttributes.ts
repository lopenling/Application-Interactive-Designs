/**
 * Merge attributes
 *
 * This function merges two objects of attributes, and concatenates the class
 * attribute if it exists in both objects. It also removes duplicate
 * whitespace characters and the string "undefined" from the class attribute.
 * @param {object} a - Expects an object of attributes
 * @param {object} b - Expects an object of attributes
 * @returns {object} Merged object
 */

type TAttributesObject = Record<string, string> | undefined;

export default function mergeAttributes(
  a: TAttributesObject,
  b: TAttributesObject,
) {
  if (a && b) {
    return {
      ...a,
      ...b,
      class: `${a.class || ""} ${b.class || ""}`
        .replace(/undefined/g, "")
        .replace(/\s+/g, " "),
    };
  } else if (a) {
    a.class = (a.class || "").replace(/undefined/g, "").replace(/\s+/g, " ");
    return a;
  } else if (b) {
    b.class = (b.class || "").replace(/undefined/g, "").replace(/\s+/g, " ");
    return b;
  }
}
