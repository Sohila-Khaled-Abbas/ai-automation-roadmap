import { readFile } from "node:fs/promises";
import process from "node:process";
import mysql from "mysql2/promise";
import { mapCatalogueResource, normalizeCatalogueUrl } from "../server/catalogueImport.ts";

const CATALOGUE_PATH = new URL("../docs/n8n-mastery-catalogue-extracted.json", import.meta.url);
const VALIDATION_PATH = new URL("../docs/n8n-mastery-catalogue-url-validation.json", import.meta.url);
const apply = process.argv.includes("--apply");

const [catalogue, validation] = await Promise.all([
  readFile(CATALOGUE_PATH, "utf8").then(JSON.parse),
  readFile(VALIDATION_PATH, "utf8").then(JSON.parse),
]);

const validUrls = new Set(validation.results.filter((result) => result.status >= 200 && result.status < 400).map((result) => normalizeCatalogueUrl(result.url)));
const sourceResources = catalogue.records
  .filter((record) => record.urls.length === 1 && validUrls.has(normalizeCatalogueUrl(record.urls[0])))
  .map((record) => mapCatalogueResource({ ...record, url: record.urls[0] }));

const uniqueResources = [];
const seenUrls = new Set();
for (const resource of sourceResources) {
  if (!seenUrls.has(resource.url)) {
    seenUrls.add(resource.url);
    uniqueResources.push(resource);
  }
}

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required to import resources.");
const connection = await mysql.createConnection(process.env.DATABASE_URL);
try {
  const [existingRows] = await connection.execute("SELECT id, url FROM learningResources");
  const existingUrls = new Set(existingRows.map((row) => normalizeCatalogueUrl(row.url)));
  const candidates = uniqueResources.filter((resource) => !existingUrls.has(resource.url));
  const summary = {
    extractedRows: catalogue.extractedCatalogueRows,
    httpValidatedRows: sourceResources.length,
    uniqueValidatedUrls: uniqueResources.length,
    skippedInsideCatalogue: sourceResources.length - uniqueResources.length,
    skippedExistingLibrary: uniqueResources.length - candidates.length,
    candidates: candidates.length,
    byStage: Object.fromEntries(Object.entries(Object.groupBy(candidates, (resource) => resource.moduleId)).map(([stage, values]) => [stage, values.length])),
    byType: Object.fromEntries(Object.entries(Object.groupBy(candidates, (resource) => resource.resourceType)).map(([type, values]) => [type, values.length])),
  };

  if (!apply) {
    console.log(JSON.stringify({ mode: "dry-run", ...summary }, null, 2));
    process.exit(0);
  }

  await connection.beginTransaction();
  for (const resource of candidates) {
    await connection.execute(
      "INSERT INTO learningResources (moduleId, title, description, url, provider, resourceType, effort, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [resource.moduleId, resource.title, resource.description, resource.url, resource.provider, resource.resourceType, resource.effort, resource.source],
    );
  }
  await connection.commit();
  console.log(JSON.stringify({ mode: "apply", inserted: candidates.length, ...summary }, null, 2));
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  await connection.end();
}
