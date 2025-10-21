import { useState } from "react";
import Layout from "../components/Layouts";

function Pacientes() {
  const [filtros, setFiltros] = useState({
    nombreCompleto: "",
    dni: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const [pacientes, setPacientes] = useState([
    // Datos de ejemplo - reemplazar con datos reales
    {
      id: 1,
      nombreCompleto: "Juan Pérez García",
      dni: "12345678",
      fechaNacimiento: "1990-05-15",
      edad: "35",
      sexo: "M",
    },
    {
      id: 2,
      nombreCompleto: "María López Martínez",
      dni: "87654321",
      fechaNacimiento: "1985-12-20",
      edad: "39",
      sexo: "F",
    },
  ]);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBuscar = () => {
    // Lógica para buscar pacientes con los filtros aplicados
    console.log("Buscando pacientes con filtros:", filtros);
    // Aquí iría la llamada a la API o filtrado local
  };

  const handleGuardarPDF = () => {
    // Lógica para generar y guardar PDF
    console.log("Generando PDF...");
    // Aquí iría la generación del PDF
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES");
  };

  return (
    <Layout title="Listado de Pacientes">
      <div className="px-2 sm:px-4 py-2">
        <div className="mb-4">
          <h2 className="text-left font-bold text-gray-700">
            Listado de pacientes registrados
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 w-full">
          {/* Filtros y Botones */}
          <div className="mb-6 pb-6 border-b border-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-1 h-5 bg-teal-600 mr-3 rounded"></span>
              Filtros de Búsqueda
            </h3>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
              {/* Filtros - lado izquierdo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full lg:w-auto flex-1">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="nombreCompleto"
                    className="block text-sm font-medium text-gray-700 mb-2 text-left"
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombreCompleto"
                    name="nombreCompleto"
                    value={filtros.nombreCompleto}
                    onChange={handleFiltroChange}
                    placeholder="Buscar por nombre"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="dni"
                    className="block text-sm font-medium text-gray-700 mb-2 text-left"
                  >
                    DNI
                  </label>
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    value={filtros.dni}
                    onChange={handleFiltroChange}
                    placeholder="Buscar por DNI"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label
                        htmlFor="fechaInicio"
                        className="block text-sm font-medium text-gray-700 mb-2 text-left"
                      >
                        Fecha inicio
                      </label>
                      <input
                        type="date"
                        id="fechaInicio"
                        name="fechaInicio"
                        value={filtros.fechaInicio}
                        onChange={handleFiltroChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="fechaFin"
                        className="block text-sm font-medium text-gray-700 mb-2 text-left"
                      >
                        Fecha fin
                      </label>
                      <input
                        type="date"
                        id="fechaFin"
                        name="fechaFin"
                        value={filtros.fechaFin}
                        onChange={handleFiltroChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones - lado derecho */}
              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto flex-shrink-0">
                <button
                  type="button"
                  onClick={handleBuscar}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Buscar
                </button>
                <button
                  type="button"
                  onClick={handleGuardarPDF}
                  className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Guardar PDF
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de pacientes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-1 h-5 bg-teal-600 mr-3 rounded"></span>
              Resultados
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-medium text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nombre completo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-medium text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DNI
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-medium text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Fecha de nacimiento
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-medium text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      edad
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-medium text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Sexo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pacientes.map((paciente) => (
                    <tr key={paciente.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {paciente.nombreCompleto}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {paciente.dni}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatearFecha(paciente.fechaNacimiento)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {paciente.edad}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {paciente.sexo === "M" ? "Masculino" : "Femenino"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pacientes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No se encontraron pacientes
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Pacientes;
