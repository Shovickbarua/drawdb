import { useEffect, useState, useContext, useCallback } from "react";
import { Button, List, Divider, Input, Select } from "@douyinfe/semi-ui";
import { db } from "../../../data/db";
import {
  listProjectFiles,
  readDiagramFile,
  writeDiagramFile,
  deleteDiagramFile,
} from "../../../utils/fileSystem";
import {
  useDiagram,
  useTypes,
  useEnums,
  useNotes,
  useAreas,
  useUndoRedo,
  useTransform,
} from "../../../hooks";
import { databases } from "../../../data/databases";
import { nanoid } from "nanoid";
import { IdContext } from "../../Workspace";
import { DB } from "../../../data/constants";

export default function ProjectsTab() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDb, setProjectDb] = useState(DB.GENERIC);
  const { setTitle, setGistId, setDiagramId } = useContext(IdContext);
  const { setUndoStack, setRedoStack } = useUndoRedo();
  const { setTransform } = useTransform();
  const { setTables, setRelationships, setDatabase } = useDiagram();
  const { setAreas } = useAreas();
  const { setNotes } = useNotes();
  const { setTypes } = useTypes();
  const { setEnums } = useEnums();

  const refresh = useCallback(async () => {
    setLoading(true);
    const fs = await listProjectFiles();
    setFiles(fs);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const openFile = async (handle) => {
    const data = await readDiagramFile(handle);
    if (!data) return;
    setUndoStack([]);
    setRedoStack([]);
    setGistId("");
    setDatabase(data.database);
    setTitle(data.title ?? handle.name.replace(/\.json$/i, ""));
    setTables(data.tables ?? []);
    setRelationships(data.relationships ?? []);
    setNotes(data.notes ?? []);
    setAreas(data.subjectAreas ?? []);
    if (data.transform) {
      setTransform(data.transform);
    } else {
      setTransform({ pan: { x: 0, y: 0 }, zoom: 1 });
    }
    if (databases[data.database]?.hasTypes) {
      if (data.types) {
        setTypes(
          data.types.map((t) =>
            t.id
              ? t
              : {
                  ...t,
                  id: nanoid(),
                  fields: (t.fields ?? []).map((f) =>
                    f.id ? f : { ...f, id: nanoid() }
                  ),
                }
          )
        );
      } else {
        setTypes([]);
      }
    }
    if (databases[data.database]?.hasEnums) {
      setEnums(
        (data.enums ?? []).map((e) => (!e.id ? { ...e, id: nanoid() } : e))
      );
    }
    setDiagramId(0);
    window.name = "";
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Button onClick={() => refresh()} loading={loading}>
          Refresh
        </Button>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <Input
          placeholder="Project name"
          value={projectName}
          onChange={(v) => setProjectName(v)}
          style={{ width: 240 }}
        />
        <Select
          style={{ width: 200 }}
          value={projectDb}
          onChange={(v) => setProjectDb(v)}
          optionList={Object.values(databases).map((d) => ({
            label: d.name,
            value: d.label,
          }))}
        />
        <Button
          type="secondary"
          disabled={projectName.trim() === ""}
          onClick={async () => {
            if (projectName.trim() === "") return;
            const now = new Date();
            const id = await db.diagrams.add({
              database: projectDb,
              name: projectName.trim(),
              gistId: "",
              lastModified: now,
              tables: [],
              references: [],
              notes: [],
              areas: [],
              todos: [],
              pan: { x: 0, y: 0 },
              zoom: 1,
              ...(databases[projectDb].hasEnums && { enums: [] }),
              ...(databases[projectDb].hasTypes && { types: [] }),
            });
            setDiagramId(id);
            window.name = `d ${id}`;
            setGistId("");
            setDatabase(projectDb);
            setTitle(projectName.trim());
            setTables([]);
            setRelationships([]);
            setNotes([]);
            setAreas([]);
            setTypes([]);
            setEnums([]);
            setTransform({ pan: { x: 0, y: 0 }, zoom: 1 });
            setUndoStack([]);
            setRedoStack([]);
            const ok = await writeDiagramFile(projectName.trim(), {
              tables: [],
              relationships: [],
              notes: [],
              subjectAreas: [],
              database: projectDb,
              title: projectName.trim(),
              transform: { pan: { x: 0, y: 0 }, zoom: 1 },
              enums: [],
              types: [],
            });
            if (!ok) return;
            await refresh();
            
          }}
        >
          Create Project
        </Button>
      </div>
      <>
        <Divider margin={8} />
          {files.length === 0 ? (
            <div>No JSON projects found</div>
          ) : (
            <List
              dataSource={files}
              renderItem={(item) => (
                <List.Item
                  extra={
                    <>
                      <Button style={{ marginRight: 8 }} onClick={() => openFile(item.handle)}>Open</Button>
                      <Button type="danger" onClick={async () => {
                        const ok = await deleteDiagramFile(item.name);
                        if (ok) {
                          await refresh();
                        }
                      }}>Delete</Button>
                    </>
                  }
                >
                  {item.name}
                </List.Item>
              )}
            />
          )}
      </>
    </div>
  );
}
