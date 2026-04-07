import React from "react";
import { ElementoLista } from "./ElementoLista";

interface ListaTodosProps {
  listaTareas: string[];
}

export const ListaTodos: React.FC<ListaTodosProps> = ({ listaTareas }) => {
  if (listaTareas.length === 0) {
    return <p>No hay tareas pendientes</p>;
  }
  return (
    <ul>
      {listaTareas.map((tarea) => (
        <ElementoLista key={tarea} tarea={tarea} />
      ))}
    </ul>
  );
};
