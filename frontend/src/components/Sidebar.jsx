import logo from "../assets/pulmones.png";
import userMedico from "../assets/userdoc.svg"; // Médico
import userAdministrador from "../assets/usuarioadministrador.svg"; // Administrador
import { ChevronFirst, ChevronLast } from "lucide-react";
import { createContext, useState, useContext } from "react";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  // Obtener el rol del usuario desde localStorage
  const rol = localStorage.getItem("rol");

  // Seleccionar el SVG según el rol
  const userIcon = rol === "administrador" ? userAdministrador : userMedico;

  return (
    <>
      <aside className="h-screen"> {/* Corregido: era "height:200vh", debe ser clase Tailwind */}
        <nav className="h-full flex flex-col bg-white border-r border-gray-200 shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div className="flex items-center overflow-hidden transition-all">
              <img
                src={logo}
                className={`transition-all ${expanded ? "w-12" : "w-0"}`}
                alt="Logo"
              />
              <span
                className={`ml-3 font-bold text-2xl text-indigo-800 transition-all ${
                  expanded ? "opacity-100" : "opacity-0 w-0"
                }`}
              >
                TB-CNN
              </span>
            </div>

            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-white hover:bg-teal-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t border-gray-200 flex p-3">
            <img src={userIcon} className="w-10 h-10 rounded-md" alt="Usuario" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="flex flex-col items-start leading-4">
                <h4 className="font-semibold">
                  {localStorage.getItem("nombres")} {localStorage.getItem("apellidos")}
                </h4>
                <span>{rol || "Invitado"}</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

// Tu componente SidebarItem permanece igual
export function SidebarItem({ icon, text, to, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-teal-100 text-gray-600"
      }`}
    >
      {icon}
      <Link
        to={to}
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
      >
        {text}
      </Link>

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 
                bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 
                transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}