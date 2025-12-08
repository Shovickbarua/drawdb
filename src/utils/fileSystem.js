import { db } from "../data/db";

async function getOpfsDiagramsDir() {
  try {
    const root = await navigator.storage.getDirectory();
    const dir = await root.getDirectoryHandle("diagrams", { create: true });
    return dir;
  } catch {
    return null;
  }
}

export async function chooseDiagramsDir() {
  try {
    const dir = await window.showDirectoryPicker();
    return dir;
  } catch {
    return null;
  }
}

export async function setDiagramsDir(handle) {
  try {
    await db.settings.put({ key: "diagramsDir", value: handle });
    return true;
  } catch {
    return false;
  }
}

export async function getDiagramsDir() {
  try {
    console.log("Getting diagramsDir from Dexie settings...");
    const rec = await db.settings.get("diagramsDir");
    console.log("Dexie settings result:", rec);
    let handle = rec?.value ?? null;
    if (!handle) {
      console.log("No handle in settings, using OPFS fallback...");
      const opfs = await getOpfsDiagramsDir();
      if (opfs) {
        await setDiagramsDir(opfs);
        handle = opfs;
        console.log("OPFS diagrams directory set and saved.");
      }
    }
    return handle;
  } catch (e) {
    console.error("Error getting diagramsDir from Dexie:", e);
    return null;
  }
}

export async function writeDiagramFile(name, payload) {
  if (!name) return false;
  try {
    console.log("writeDiagramFile called with name:", name);
    let dir = await getDiagramsDir();
    console.log("Current directory handle:", dir);
    if (!dir) {
      console.log("No directory set, prompting user to choose...");
      dir = await chooseDiagramsDir();
      console.log("User selected directory:", dir);
      if (!dir) {
        console.log("User cancelled directory selection");
        return false;
      }
      await setDiagramsDir(dir);
      console.log("Directory saved to settings");
    }
    const fileName = `${name}.json`;
    console.log("Creating file:", fileName);
    const fileHandle = await dir.getFileHandle(fileName, { create: true });
    console.log("File handle obtained:", fileHandle);
    const writable = await fileHandle.createWritable();
    console.log("Writable stream created");
    await writable.write(
      new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    );
    console.log("Data written to file");
    await writable.close();
    console.log("File closed successfully");
    return true;
  } catch (e) {
    console.error("Error in writeDiagramFile:", e);
    return false;
  }
}

export async function listProjectFiles() {
  try {
    const dir = await getDiagramsDir();
    if (!dir) return [];
    const files = [];
    for await (const [name, handle] of dir.entries()) {
      if (handle.kind === "file" && name.toLowerCase().endsWith(".json")) {
        files.push({ name, handle });
      }
    }
    return files;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function readDiagramFile(fileHandle) {
  try {
    const f = await fileHandle.getFile();
    const text = await f.text();
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function deleteDiagramFile(fileName) {
  try {
    const dir = await getDiagramsDir();
    if (!dir) return false;
    const name = fileName.toLowerCase().endsWith(".json") ? fileName : `${fileName}.json`;
    await dir.removeEntry(name);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
