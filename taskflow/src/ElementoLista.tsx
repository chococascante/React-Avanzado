import React from "react";

interface ElementoListaProps {
  tarea: string;
}

export const ElementoLista: React.FC<ElementoListaProps> = React.memo(
  ({ tarea }) => {
    return <li>{tarea}</li>;
  },
);
