
import fondo from "./assets/perfecta.jpg";
import logo from "./assets/dr.png";
import './App.css'

function App() {

  return (
    <>
      <div
        className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondo})` }}
      >


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white/80 p-6 rounded-xl shadow-lg">
        <img 
            src={logo}
            alt="Your Company" 
            className="mx-auto h-25 w-auto" 
          />
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Bienvenido
          </h2>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="usermed" className="block text-sm font-medium text-gray-900 text-left">
  Nombre de usuario
</label>
<div className="mt-2">
  <input 
    id="usermed" 
    type="text" 
    name="usermed" 
    required 
    autoComplete="username" 
    className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
               text-gray-900 outline-1 outline-gray-300 
               placeholder:text-gray-400 focus:outline-2 
               focus:outline-teal-600 sm:text-sm" 
  />
</div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input 
                  id="password" 
                  type="password" 
                  name="password" 
                  required 
                  autoComplete="current-password" 
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
                             text-gray-900 outline-1 outline-gray-300 
                             placeholder:text-gray-400 focus:outline-2 
                             focus:outline-indigo-600 sm:text-sm" 
                />
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className="flex w-full justify-center rounded-md bg-teal-600 
                           px-3 py-1.5 text-sm font-semibold text-white shadow 
                           hover:bg-teal-500 
                           focus-visible:outline-2 focus-visible:outline-offset-2 
                           focus-visible:outline-teal-600"
              >
                Ingresar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Olvidaste tu contraseña?{" "}
            <a href="#" className="font-semibold text-teal-600 hover:text-teal-500">
              Contactar al soporte
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default App
