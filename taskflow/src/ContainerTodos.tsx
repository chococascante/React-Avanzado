import { useState, useCallback } from "react";
import { ListaTodos } from "./ListaTodos";
import { useTareasContext } from "./TareasContext";

export const ContainerTodos = () => {
  const [nombre, setNombre] = useState("");
  const { listaTareas, agregarTarea } = useTareasContext();

  const onAgregarTareaClick = useCallback(() => {
    agregarTarea(nombre);
    setNombre("");
  }, [nombre, agregarTarea]);

  return (
    <>
      <h1>Lista de Tareas</h1>

      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <label htmlFor="nueva-tarea">Nueva tarea:</label>
          <input
            type="text"
            id="nueva-tarea"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <button type="button" onClick={onAgregarTareaClick}>
          Agregar tarea
        </button>
      </div>

      <ListaTodos listaTareas={listaTareas} />
    </>
  );
};
