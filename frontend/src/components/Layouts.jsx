import Sidebar, { SidebarItem } from "./Sidebar";
import { Link } from "react-router-dom";
import { Home, LayoutDashboard, Layers, StickyNote, Cog, Network } from "lucide-react";

export default function MainLayout({ children, title }) {
  const rol = localStorage.getItem("rol");

  return (
    <div className="min-h-screen flex">
      <Sidebar>
        {rol === "medico" && (
          <>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/dashboard"/>
            <SidebarItem icon={<StickyNote size={20} />} text="Listado Pacientes" to="/pacientes"/>
            <SidebarItem icon={<Layers size={20} />} text="Registrar Paciente" to="/registropaciente"/>
            <SidebarItem icon={<Network size={20} />} text="Analisis Radiografia" to="/analisisradiografia"/>
          </>
        )}
        {rol === "administrador" && (
          <>
            <SidebarItem icon={<Cog size={20} />} text="Configuración" />
          </>
        )}
      </Sidebar>

      <div className="flex-1 flex flex-col min-h-0">
        <header className="bg-white shadow flex-shrink-0">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-teal-400"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto px-1 py-1 ">
          {children}
        </main>
      </div>
    </div>
  );
}
