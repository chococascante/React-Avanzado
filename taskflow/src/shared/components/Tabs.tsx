import {
  createContext,
  useContext,
  useState,
  useMemo,
  memo,
  useCallback,
  type ReactNode,
} from "react";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext(): TabsContextType {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error("Tabs compound components must be used inside <Tabs>");
  return context;
}

interface TabsProps {
  defaultTab: string;
  children: ReactNode;
}

function Tabs({ defaultTab, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const value = useMemo(() => ({ activeTab, setActiveTab }), [activeTab]);
  return (
    <TabsContext.Provider value={value}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "2px solid #e2e8f0",
        marginBottom: "16px",
      }}
    >
      {children}
    </div>
  );
}

interface TabProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

function Tab({ id, children }: TabProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === id;

  const handleClick = useCallback(() => {
    setActiveTab(id);
  }, [id, setActiveTab]);

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "12px 24px",
        border: "none",
        borderBottom: isActive ? "2px solid #3b82f6" : "2px solid transparent",
        backgroundColor: "transparent",
        color: isActive ? "#3b82f6" : "#64748b",
        fontWeight: isActive ? "600" : "400",
        cursor: "pointer",
        fontSize: "14px",
        marginBottom: "-2px",
      }}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

interface TabPanelProps {
  id: string;
  children: ReactNode;
}

function TabPanel({ id, children }: TabPanelProps) {
  const { activeTab } = useTabsContext();
  if (activeTab !== id) return null;
  return <div>{children}</div>;
}

// function Persona() {
//   let nombre = "Luisa";
//   let edad = 30;
//   const saludar = () => console.log("Hola");
//   return { nombre, edad, saludar };
// }

// const luis = {
//   nombre: "Luisa",
//   edad: 30,
// }

// luis.mascotas = 3;

// Compound Component pattern: adjuntar sub-componentes al componente padre
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export default Tabs;
