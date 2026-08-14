import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve(process.cwd(), process.argv[2] ?? path.join("dist", "client"));

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(filePath);
    return entry.isFile() && entry.name.endsWith(".html") ? [filePath] : [];
  }));
  return nested.flat();
}

const files = (await htmlFiles(outputRoot)).filter((file) => {
  const relative = path.relative(outputRoot, file).replaceAll(path.sep, "/");
  return relative === "fr.html" || relative.startsWith("fr/");
});
let localizedCount = 0;
for (const file of files) {
  const html = await readFile(file, "utf8");
  if (html.includes('<html lang="fr-CA" data-language="fr"')) continue;
  const localized = html.replace(
    /<html lang="en-CA" data-language="en"/,
    '<html lang="fr-CA" data-language="fr"',
  );
  if (localized === html) throw new Error(`Could not localize the root language in ${file}`);
  await writeFile(file, localized, "utf8");
  localizedCount += 1;
}

if (files.length === 0) throw new Error(`No French HTML responses found in ${outputRoot}`);
console.log(`Verified ${files.length} French HTML responses in ${outputRoot}; localized ${localizedCount} build artifacts to fr-CA.`);
