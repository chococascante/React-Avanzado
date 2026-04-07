import { useState, useEffect } from "react";

export const Prueba = () => {
  console.log("Dentro del componente Prueba");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 1. Si el arreglo está vacío, el efecto se ejecutará solo una vez después del primer renderizado del componente. Es útil para realizar tareas de inicialización, como cargar datos o configurar suscripciones. (componentDidMount).
   * 2. Si el arreglo contiene variables, el efecto se ejecutará después de cada renderizado en el que alguna de esas variables haya cambiado. Esto es útil para realizar tareas que dependen de cambios específicos en el estado o en las props. (componentDidUpdate).
   */
  useEffect(() => {
    /**
     * Este mae es componentDidUnmount, se ejecuta cuando el componente se desmonta, es decir, cuando se elimina del DOM. Es útil para limpiar recursos, cancelar suscripciones o realizar cualquier tarea de limpieza necesaria para evitar fugas de memoria.
     */
    return () => {};
  }, [nombre]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!loading && error) {
    return <div>Error: {error}</div>;
  }

  /**
   * El return es el render.
   */
  return nombre ? (
    <div>
      <h1>Hola, {nombre}!</h1>
    </div>
  ) : (
    <div>
      <p>No hay nombre</p>
    </div>
  );
};
