# Font sizes

Search and replace all instances of the following classes in this exact order:

1. `text-9xl` -> `text-17xl` \*
2. `text-8xl` -> `text-14xl` \*
3. `text-7xl` -> `text-12xl` \*
4. `text-6xl` -> `text-10xl` \*
5. `text-5xl` -> `text-8xl` \*
6. `text-4xl` -> `text-6xl` \*
7. `text-3xl` -> `text-4xl`
8. `text-2xl` -> `text-3xl`
9. ~~`text-xl` -> `text-xl`~~
10. ~~`text-lg` -> `text-lg`~~
11. ~~`text-base` -> `text-base`~~
12. ~~`text-sm` -> `text-sm`~~
13. ~~`text-xs` -> `text-xs`~~

# Colors

### Stone

Search and replace all instances of the following classes in this exact order:

1. `stone-50 ` -> `common-25 `
2. `stone-100` -> `common-50`
3. `stone-200` -> `common-100`
4. `stone-300` -> `common-150`
5. `stone-400` -> `common-350`
6. ~~`stone-500` -> `common-500`~~
7. `stone-600` -> `common-650`
8. ~~`stone-700` -> `common-700`~~
9. `stone-800` -> `common-850`
10. ~~`stone-900` -> `common-900`~~
11. `stone-950` -> `common-975`

**NB!** Notice the space after `50 ` and `25 `.

### Primary

Search and replace all instances of the following classes in this exact order:

1. `primary-50 ` -> `primary-25 `
2. `primary-100` -> `primary-50`
3. `primary-200` -> `primary-100`
4. `primary-300` -> `primary-200`
5. `primary-400` -> `primary-350`
6. ~~`primary-500` -> `primary-500`~~
7. `primary-600` -> `primary-650`
8. `primary-700` -> `primary-750`
9. `primary-800` -> `primary-850`
10. ~~`primary-900` -> `primary-900`~~
11. `primary-950` -> `primary-975`

**NB!** Notice the space after `50 ` and `25 `.

### Secondary

Search and replace all instances of the following classes in this exact order:

1. `secondary-50 ` -> `secondary-25 `
2. `secondary-100` -> `secondary-50`
3. `secondary-200` -> `secondary-100`
4. `secondary-300` -> `secondary-150`
5. `secondary-400` -> `secondary-350`
6. ~~`secondary-500` -> `secondary-500`~~
7. `secondary-600` -> `secondary-650`
8. `secondary-700` -> `secondary-750`
9. `secondary-800` -> `secondary-850`
10. ~~`secondary-900` -> `secondary-900`~~
11. `secondary-950` -> `secondary-975`

**NB!** Notice the space after `50 ` and `25 `.

### Red

Search and replace all instances of the following classes in this exact order:

1. ~~`red-50 ` -> `red-50 `~~
2. ~~`red-100` -> `red-100`~~
3. `red-200` -> `red-150`
4. `red-300` -> `red-250`
5. `red-400` -> `red-350`
6. `red-500` -> `red-450`
7. `red-600` -> `red-500`
8. `red-700` -> `red-600`
9. `red-800` -> `red-650`
10. `red-900` -> `red-700`
11. `red-950` -> `red-850`

**NB!** Notice the space after `50 ` and `25 `.

# Shadows

Search and replace all instances of the following classes in this exact order:

1. `shadow-sm` -> `shadow-xs`
2. `(?<!\.)shadow(?![-?=:])` -> `shadow-sm` (enable regex)
3. `shadow-lg+` -> `shadow-lg` (disable regex)

Regex explanation: "shadow" which is not preceded by a `.` and not followed by `-`, `?`, `=` or `:`.

# Border radius

Search and replace all instances of the following classes in this exact order:

1. `rounded-sm` -> `rounded-px`
2. `(?<!\.)rounded(?![-?=:])` -> `rounded-xs` (enable regex)
3. `rounded-md` -> `rounded-sm`
4. `rounded-lg` -> `rounded-md`
5. `rounded-xl` -> `rounded-lg`
6. `rounded-2xl` -> `rounded-xl`
7. `rounded-3xl` -> `rounded-2xl` \*

Regex explanation: "rounded" which is not preceded by a `.` and not followed by `-`, `?`, `=` or `:`.

---

Strikethrough values represent the values that stay the same.
Values marked with `*` are most likely not (yet) used in this project.
