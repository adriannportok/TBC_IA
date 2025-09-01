import { useEffect } from 'react';


function Dashboard() {
  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usermed');
    window.location.href = '/';
  };

  return (
    
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard TB-CNN</h1>
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
          {/* Contenido del dashboard */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <p className="text-center mt-40 text-gray-500">Bienvenido al sistema TB-CNN</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;