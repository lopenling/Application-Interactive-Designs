/**
 * Convert SVG Icons to JavaScript:
 *
 * In summary, this script is designed to take a directory of SVG files, convert
 * them into JavaScript modules, and organize them in a way that makes it easy to
 * use these SVG icons in a web application. It also takes care of cleaning up
 * the output directory and handling errors along the way.
 */

/**
 * Importing Modules:
 *
 * Importing necessary Node.js modules such as fs (file system operations) and
 * path (file path handling). The fs module is used to read and write files,
 * and the path module is used to handle file paths.
 */
import fs from "fs/promises";
import path, { join } from "path";

/**
 * Promisifying File System Methods:
 *
 * It uses the fs.promises API to promisify file system methods like readdir,
 * readFile, writeFile, mkdir, unlink, and rmdir. This allows using these methods
 * with async/await syntax for cleaner code.
 */
const readdir = fs.readdir; // Read the contents of a directory
const readFile = fs.readFile; // Read the content of a files
const writeFile = fs.writeFile; // Write content to a file
const mkdir = fs.mkdir; // Make a new directory
const unlink = fs.unlink; // Delete a file
const rmdir = fs.rmdir; // Remove a directory

/**
 * Function kebabToPascalCase
 * @param {string} string - Expects a string in kebab-case
 * @summary Converts a string from kebab-case to PascalCase
 *
 * This function works by splitting the string into an array of words, and then
 * converting the first letter of each word to uppercase and the rest of the
 * letters to lowercase. The array of words is then joined back together into a
 * single string.
 */
function kebabToPascalCase(string) {
  return string
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

/**
 * Function kebabToCamelCase
 * @param {string} string - Expects a string in kebab-case
 * @summary Converts a string from kebab-case to camelCase
 *
 * This function works by splitting the string into an array of words, and then
 * converting the first letter of each word to uppercase and the rest of the
 * letters to lowercase. The first word is converted to lowercase.  The array of
 * words is then joined back together into a single string.
 */
function kebabToCamelCase(string) {
  return string
    .split("-")
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

/**
 * Function deleteDirectoryContents
 * @param {string} dir - Expects a directory path
 * @summary Recursively deletes all files and directories within a specified
 * directory
 *
 * This function works by reading the contents of the directory, and then
 * creating an array of promises to delete each entry in the directory. This is
 * necessary because the delete operations are asynchronous and must be handled
 * one at a time to avoid errors.
 *
 * - If the entry is a symbolic link, the function ignores it.
 * - If the entry is a directory, the function calls itself recursively to delete
 *   the contents of the directory before deleting the directory itself.
 * - If the entry is a file, the function deletes the file.
 *
 * Once the array of promises is created, it is passed to Promise.all to wait for
 * all delete operations to complete before returning.
 */
async function deleteDirectoryContents(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  const deletePromises = entries.map(async (entry) => {
    const entryPath = path.join(dir, entry.name);

    if (entry.isSymbolicLink()) {
      console.log(`Skipping symbolic link: ${entryPath}`);
      return;
    }
    if (entry.isDirectory()) {
      await deleteDirectoryContents(entryPath);
      await rmdir(entryPath);
    } else {
      await unlink(entryPath);
    }
  });

  await Promise.all(deletePromises);
}

/**
 * Function processDirectory:
 * @param {string} inputDir - Expects a directory path
 * @param {string} outputDir - Expects a directory path
 * @summary Processes a directory of SVG files and subdirectories
 *
 * The processDirectory function takes an input directory and an output directory
 * as arguments. It reads the contents of the input directory and iterates
 * through the entries (files and subdirectories).
 *
 * For each entry:
 * If it's a directory, it creates a corresponding directory in the output
 * directory and recursively processes the contents.
 * If it's an SVG file (identified by the ".svg" extension), it does the
 * following:
 * - Reads the SVG content from the file.
 * - Extracts information like the viewBox and fill values from the SVG data.
 * - Generates a JavaScript module that exports a function for rendering the SVG
 *   with customizable attributes.
 * - Writes this JavaScript module to the output directory.
 */
async function processDirectory(inputDir, outputDir) {
  const entries = await readdir(inputDir, { withFileTypes: true });

  const iconPromises = entries.map(async (entry) => {
    const inputPath = path.join(inputDir, entry.name);
    const outputPath = path.join(outputDir, entry.name);

    if (entry.isDirectory()) {
      // If the entry is a directory, create a corresponding directory in the
      // output directory and process this directory recursively.
      await mkdir(outputPath, { recursive: true });
      return processDirectory(inputPath, outputPath);
    } else if (path.extname(entry.name) === ".svg") {
      // If the entry is an SVG file, process it
      console.log(`Processing SVG file: ${inputPath}`);

      // Read the SVG file
      const data = await readFile(inputPath, "utf8");

      // Convert the filename to PascalCase and prepend "Icon" for the exported
      // component name (e.g. "arrow-left.svg" becomes "IconArrowLeft").
      const filename = path.basename(entry.name, ".svg");
      const pascalCaseFilename = kebabToPascalCase(filename);
      const iconName = `Icon${pascalCaseFilename}`;
      const iconDataName = `IconData${pascalCaseFilename}`;

      // Search for a `viewbox` attribute in the SVG data and extract the value
      // inside the quotes if found. If no match is found, default to an empty
      // string.
      const viewBoxMatch = data.match(/viewBox=(["'])(.*?)\1/);
      const viewBoxValue = viewBoxMatch ? viewBoxMatch[2] : "";

      // Search for a `fill` attribute in the SVG data and extract the value
      // inside the quotes if found. If no match is found, default to
      // `currentColor`.
      const fillMatch = data.match(/fill=(["'])(.*?)\1/);
      const fillValue = fillMatch ? fillMatch[2] : "currentColor";

      // Generate the JS module content
      // If `fill` is set to `none`, then `stroke` is set to `currentColor`,
      // indicating that the icon should be rendered as a stroked path.
      // Otherwise, the `fill` is set to `currentColor` and `stroke` is set to
      // `none`, indicating that the icon should be rendered as a filled path.
      const jsContent = `
export const ${iconName} = ({
  fill = ${fillValue == "none" ? '"none"' : '"currentColor"'},
  stroke = ${fillValue == "none" ? '"currentColor"' : '"none"'},
  className = "",
  ariaHidden = "true",
} = {}) => {
  return \`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBoxValue}" $\{
      (fill ? \` fill="\${fill}"\` : "") +
      (stroke ? \` stroke="\${stroke}"\` : "") +
      (className ? \` class="\${className}"\` : "") +
      (ariaHidden ? \` aria-hidden="\${ariaHidden}"\` : "")
    }${data.slice(data.indexOf(">"))}
  \`;
};
export const ${iconDataName} = {
  fill: ${fillValue == "none" ? '"none"' : '"currentColor"'},
  stroke: ${fillValue == "none" ? '"currentColor"' : '"none"'},
  viewBox: "${viewBoxValue}",
  content: \`${data.slice(data.indexOf(">") + 1).replace("</svg>", "")}\`
};
`;

      // Define the output filename and path
      const outputFilenameWithPath = path.join(
        path.dirname(outputPath),
        `${iconName}.mjs`,
      );

      console.log(`Writing to output file: ${outputFilenameWithPath}`);

      // Write the JS module to the output file
      await writeFile(outputFilenameWithPath, jsContent);

      // Return the icon name so that we can generate an index file that
      // re-exports all of the components.
      return `${iconName}`;
    }
  });

  // Wait for all SVG files to be processed
  const icons = await Promise.all(iconPromises);
  // Flatten the array of icon names into a single array and remove any falsy
  // values.
  const iconExports = icons.flat().filter(Boolean);

  // For each icon group (e.g. "regular", "solid", etc.), generate an index file
  // that re-exports all of the components, which allows us to import icons from
  // a single file.
  if (iconExports.length > 0) {
    // path.dirname returns the directory name of a path. We use this to get the
    // parent directory of the output directory, where the index file will be
    // written.
    const indexPath = `${path.dirname(outputDir)}/`;
    // path.basename returns the last portion of a path. We use this to get the
    // name of the output directory, which will be used as the filename for the
    // index file.
    const indexFilename = `${kebabToCamelCase(path.basename(outputDir))}.mjs`;
    // Combine the index file name and path
    const indexFilenameWithPath = join(indexPath, indexFilename);

    console.log(`Writing to index file: ${indexFilenameWithPath}`);

    // Generate the index file content
    const indexContent = iconExports
      .map(
        (icon) =>
          `export { ${icon}, ${icon.replace(
            /^Icon/,
            "IconData",
          )} } from "./${path.basename(outputDir)}/${icon}.mjs";`,
      )
      .join("\n");

    // Write the index file
    await writeFile(indexFilenameWithPath, indexContent);
  }
}

/**
 * Configuring the Script:
 * Define the input and output directories
 */
const inputDir = "./svg-icons";
const outputDir = "./src/scripts/icons";

/**
 * Starting the Script:
 * 1. Delete the contents of the output directory
 * 2. Create the output directory if it doesn't exist
 * 3. Process the input directory
 * 4. Handle any errors that occur during the process
 */
async function startScript() {
  try {
    await deleteDirectoryContents(outputDir);
    await mkdir(outputDir, { recursive: true });
    await processDirectory(inputDir, outputDir);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

startScript();
