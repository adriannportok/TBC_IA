import { useEffect } from "react";
import Layout from "../components/Layouts";
import { Users, Activity, FileText, Stethoscope, Bell } from "lucide-react";

function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token) window.location.href = "/";

    console.log(
      rol === "administrador" ? "Vista de administrador" : "Vista de médico"
    );
  }, []);

  return (
    <Layout title="Panel Principal">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Bienvenido al sistema <span className="text-teal-600">TB-CNN</span>
          </h1>

          {/* Tarjetas resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="p-5 bg-white rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500">Pacientes registrados</p>
                <h2 className="text-2xl font-bold">120</h2>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>

            <div className="p-5 bg-white rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500">Radiografías analizadas</p>
                <h2 className="text-2xl font-bold">342</h2>
              </div>
              <Activity className="w-10 h-10 text-green-500" />
            </div>

            <div className="p-5 bg-white rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500">Reportes generados</p>
                <h2 className="text-2xl font-bold">57</h2>
              </div>
              <FileText className="w-10 h-10 text-yellow-500" />
            </div>

            <div className="p-5 bg-white rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500">Médicos activos</p>
                <h2 className="text-2xl font-bold">8</h2>
              </div>
              <Stethoscope className="w-10 h-10 text-purple-500" />
            </div>
          </div>

          {/* Gráfico placeholder */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h3 className="text-lg font-semibold mb-4">
              Análisis de radiografías
            </h3>
            <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-xl">
              <p>📊 Aquí irá el gráfico de resultados</p>
            </div>
          </div>

          {/* Tabla de últimos análisis */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h3 className="text-lg font-semibold mb-4">Últimos análisis realizados</h3>
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">Paciente</th>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">DNI</th>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">Resultado</th>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-3">María López</td>
                  <td className="px-6 py-3">72435689</td>
                  <td className="px-6 py-3 text-green-600 font-semibold">Negativo</td>
                  <td className="px-6 py-3">20/10/2025</td>
                </tr>
                <tr>
                  <td className="px-6 py-3">Juan Pérez</td>
                  <td className="px-6 py-3">72548123</td>
                  <td className="px-6 py-3 text-red-600 font-semibold">Positivo</td>
                  <td className="px-6 py-3">19/10/2025</td>
                </tr>
                <tr>
                  <td className="px-6 py-3">Lucía Torres</td>
                  <td className="px-6 py-3">71459320</td>
                  <td className="px-6 py-3 text-green-600 font-semibold">Negativo</td>
                  <td className="px-6 py-3">18/10/2025</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Actividad reciente</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <Bell className="text-blue-500" size={18} />
                Se registró un nuevo paciente <strong>Pedro Gómez</strong>.
              </li>
              <li className="flex items-center gap-2">
                <Bell className="text-green-500" size={18} />
                Se completó un análisis con resultado <strong>Negativo</strong>.
              </li>
              <li className="flex items-center gap-2">
                <Bell className="text-yellow-500" size={18} />
                Un médico revisó el reporte de <strong>María López</strong>.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
