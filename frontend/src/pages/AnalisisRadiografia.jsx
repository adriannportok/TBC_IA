import { useEffect } from "react";
import Layout from "../components/Layouts";
import { Home, Layers, StickyNote, Cog } from "lucide-react";

function AnalisisRadiografia() {
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
    <Layout title="Análisis de Radiografía">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <p className="text-center mt-40 text-gray-500">
                  Bienvenido al sistema TB-CNN
                </p>
              </div>
            </div>
          </div>
    </Layout>

  );
}

export default AnalisisRadiografia;
