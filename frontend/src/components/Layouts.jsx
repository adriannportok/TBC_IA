import { useState } from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import { Home, Layers, StickyNote, Cog, Network } from "lucide-react";

export default function MainLayout({ children, title }) {
  const rol = localStorage.getItem("rol");
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="min-h-screen flex text-left">
      <Sidebar onToggle={setExpanded}>
        {rol === "medico" && (
          <>
            <SidebarItem icon={<Home size={25} />} text="Dashboard" to="/dashboard" />
            <SidebarItem icon={<StickyNote size={25} />} text="Listado Pacientes" to="/pacientes" />
            <SidebarItem icon={<Layers size={25} />} text="Registrar Paciente" to="/registropaciente" />
            <SidebarItem icon={<Network size={25} />} text="Análisis Radiografía" to="/analisisradiografia" />
          </>
        )}
        {rol === "administrador" && (
          <>
            <SidebarItem icon={<Cog size={25} />} text="Configuración" />
          </>
        )}
      </Sidebar>

      <div
        className={`flex-1 flex flex-col min-h-0 transition-all duration-300 ${
          expanded ? "ml-64" : "ml-20"
        }`}
      >
        <header className="bg-teal-600 shadow flex-shrink-0">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-12 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow hover:bg-teal-400"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto px-10 py-1">{children}</main>
      </div>
    </div>
  );
}
