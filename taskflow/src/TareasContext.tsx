import React, { useMemo, useCallback, type PropsWithChildren } from "react";

// Definimos la interfaz para el contexto de tareas
interface TareasContextProps {
  listaTareas: string[];
  agregarTarea: (tarea: string) => void;
}

// Creamos el contexto con un valor por defecto
const TareasContext = React.createContext<TareasContextProps>({
  listaTareas: [],
  agregarTarea: () => {},
});

// Creamos el proveedor del contexto
export const TareasContextProvider: React.FC<PropsWithChildren> = React.memo(
  ({ children }) => {
    const [listaTareas, setListaTareas] = React.useState<string[]>([]);

    const agregarTarea = useCallback(
      (tarea: string) => {
        setListaTareas([...listaTareas, tarea]);
      },
      [listaTareas],
    );

    const contextValue: TareasContextProps = useMemo(
      () => ({
        listaTareas,
        agregarTarea,
      }),
      [listaTareas, agregarTarea],
    );
    return (
      <TareasContext.Provider value={contextValue}>
        {children}
      </TareasContext.Provider>
    );
  },
);

// Hook personalizado para usar el contexto de tareas
// eslint-disable-next-line react-refresh/only-export-components
export const useTareasContext = () =>
  React.useContext<TareasContextProps>(TareasContext);
