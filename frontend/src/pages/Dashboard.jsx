import { useEffect, useState } from "react";
import Layout from "../components/Layouts";
import { Users, Activity, FileText } from "lucide-react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState({
    total_pacientes: 0,
    predicciones_positivas: 0,
    ultimas_predicciones: [],
    stats_mensuales: []
  });
  const [fetchError, setFetchError] = useState(null);
  const [foundUsername, setFoundUsername] = useState(null);

  useEffect(() => {
    // Buscar el username en varias claves posibles del localStorage.
    const keysToTry = ["username", "usuario", "user", "userData", "usuario_data"];
    let username = null;

    for (const key of keysToTry) {
      const val = localStorage.getItem(key);
      if (!val) continue;
      // si es JSON, intentar parsear y extraer campos comunes
      try {
        const parsed = JSON.parse(val);
        if (parsed) {
          if (parsed.username) {
            username = parsed.username;
            break;
          }
          if (parsed.usuario) {
            username = parsed.usuario;
            break;
          }
          if (parsed.user) {
            username = parsed.user;
            break;
          }
        }
      } catch (e) {
        // no es JSON, usar el valor tal cual
        username = val;
        break;
      }
    }

    setFoundUsername(username);

    // const rol = localStorage.getItem("rol"); // No necesitamos esta verificación ya que el Layout maneja la visibilidad

    // Función para obtener los datos del dashboard
    const fetchDashboardData = async () => {
      if (!username) {
        // No redirigimos, solo guardamos el error para mostrar en UI
        setFetchError('No se encontró usuario en localStorage.');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/dashboard/stats`, {
          params: { username }
        });

        if (res.data && !res.data.error) {
          setStats(res.data);
          setFetchError(null);
        } else if (res.data && res.data.error) {
          setFetchError(res.data.error);
        }
      } catch (error) {
        setFetchError(error.message || String(error));
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout title="Panel Principal">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Bienvenido al sistema <span className="text-teal-600">TB-CNN</span>
          </h1>

          {fetchError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
              {fetchError}
            </div>
          )}

          {/* Tarjetas resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="p-5 bg-white rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500">Pacientes registrados</p>
                <h2 className="text-2xl font-bold">{stats.total_pacientes}</h2>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>

            <div className="p-5 bg-white rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500">Casos positivos TBC</p>
                <h2 className="text-2xl font-bold">{stats.predicciones_positivas}</h2>
              </div>
              <Activity className="w-10 h-10 text-red-500" />
            </div>

            <div className="p-5 bg-white rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total análisis</p>
                <h2 className="text-2xl font-bold">{stats.ultimas_predicciones.length}</h2>
              </div>
              <FileText className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          {/* Gráfico de estadísticas mensuales */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h3 className="text-lg font-semibold mb-4">
              Casos Positivos/Negativos de los últimos 6 meses
            </h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.stats_mensuales}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar name="Porcentajes mayores a 50 %" dataKey="porcentaje_positivos" fill="#ef4444" />
                  <Bar name="Porcentajes menores a 50 %" dataKey="porcentaje_negativos" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabla de últimos análisis */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h3 className="text-lg font-semibold mb-4">Últimos análisis realizados</h3>
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">Paciente</th>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">Resultado</th>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">Fecha</th>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">Imagen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.ultimas_predicciones.map((prediccion, index) => (
                  <tr key={index}>
                    <td className="px-6 py-3">{prediccion.nombre_paciente}</td>
                    <td className={`px-6 py-3 font-semibold ${
                      prediccion.porcentaje > 50 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {prediccion.porcentaje > 50 ? 'Positivo' : 'Negativo'} ({prediccion.porcentaje.toFixed(1)}%)
                    </td>
                    <td className="px-6 py-3">{new Date(prediccion.fecha).toLocaleDateString()}</td>
                    <td className="px-6 py-3">
                      <a 
                        href={prediccion.ruta_imagen} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Ver imagen
                      </a>
                    </td>
                  </tr>
                ))}
                {stats.ultimas_predicciones.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-3 text-center text-gray-500">
                      No hay análisis realizados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
