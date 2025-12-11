import axios from "axios";
const API_BASE = (import.meta?.env?.VITE_API_URL ?? "https://drawdb-jfdn.onrender.com").replace(/\/$/, "");

let authToken = null;
export function setAuthToken(token) {
  authToken = token;
}
function isLoggedIn() {
  return !!authToken;
}

export async function writeDiagramFile(name, payload) {
  if (!name) return false;
  try {
    if (isLoggedIn()) {
      const base = name.replace(/\.json$/i, "");
      // Try create first, then update (idempotent if already exists)
      try {
        await axios.post(
          `${API_BASE}/api/projects`,
          { name: base, content: payload },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
      } catch (e) {
        // If already exists or create failed, proceed to PUT
      }
      await axios.put(
        `${API_BASE}/api/projects/` + encodeURIComponent(base),
        { content: payload },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return true;
    }
    return false;
  } catch (e) {
    console.error("Error in writeDiagramFile:", e);
    return false;
  }
}

export async function listProjectFiles() {
  try {
    if (isLoggedIn()) {
      const r = await axios.get(`${API_BASE}/api/projects`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return (r.data.files || []).map((name) => ({ name }));
    }
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function readDiagramFile(fileHandle) {
  try {
    if (isLoggedIn()) {
      const r = await axios.get(
        `${API_BASE}/api/projects/` + encodeURIComponent(fileHandle.name.replace(/\.json$/i, "")),
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return r.data;
    }
    return null;
  } catch {
    return null;
  }
}

export async function readDiagramByName(name) {
  try {
    const r = await axios.get(
      `${API_BASE}/api/projects/` + encodeURIComponent(name.replace(/\.json$/i, "")),
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    return r.data;
  } catch {
    return null;
  }
}

export async function deleteDiagramFile(fileName) {
  try {
    if (isLoggedIn()) {
      await axios.delete(`${API_BASE}/api/projects/` + encodeURIComponent(fileName.replace(/\.json$/i, "")), {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}
