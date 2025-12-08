import Dexie from "dexie";
import { templateSeeds } from "./seeds";

export const db = new Dexie("drawDB");

db.version(7).stores({
  diagrams: "++id, lastModified, loadedFromGistId",
  templates: "++id, custom",
  settings: "key",
});

db.on("populate", (transaction) => {
  transaction.templates.bulkAdd(templateSeeds).catch((e) => console.log(e));
});
