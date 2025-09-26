import Sidebar, { SidebarItem } from "./Sidebar";
import { Link } from "react-router-dom";
import { Home, LayoutDashboard, Layers, StickyNote, Cog } from "lucide-react";

export default function MainLayout({ children, title }) {
  const rol = localStorage.getItem("rol");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar>
        {rol === "medico" && (
          <>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/dashboard"/>
            <SidebarItem icon={<StickyNote size={20} />} text="Listado Pacientes" to="/pacientes"/>
            <SidebarItem icon={<Layers size={20} />} text="Registrar Paciente" to="/registropaciente"/>
          </>
        )}
        {rol === "administrador" && (
          <>
            <SidebarItem icon={<Cog size={20} />} text="Configuración" />
          </>
        )}
      </Sidebar>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow">
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

        <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
