import "./App.css";
import { ContainerTodos } from "./ContainerTodos";
import { TareasContextProvider } from "./TareasContext";

function App() {
  return (
    <>
      <TareasContextProvider>
        <ContainerTodos />
      </TareasContextProvider>
    </>
  );
}

export default App;
