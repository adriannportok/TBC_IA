import { useEffect } from "react";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import { Home, LayoutDashboard, Layers, StickyNote } from "lucide-react";

function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token) {
      window.location.href = "/";
    }

    if (rol === "administrador") {
      console.log("Vista de administrador");
    } else if (rol === "medico") {
      console.log("Vista de médico");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Inicio" alert />
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active
        />
        {localStorage.getItem("rol") === "medico" && (
          <SidebarItem icon={<StickyNote size={20} />} text="Pacientes" />
        )}
        <SidebarItem icon={<Layers size={20} />} text="Reportes" />
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard TB-CNN
            </h1>
            <button
              onClick={handleLogout}
              className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-teal-400"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <p className="text-center mt-40 text-gray-500">
                  Bienvenido al sistema TB-CNN
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
