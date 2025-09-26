import logo from "../assets/pulmones.png";
import user from "../assets/userdoc.svg";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { createContext, useState, useContext } from "react";
import { Link } from "react-router-dom";


const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <aside className="h-screen">
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
              className="p-1.5 rounded-lg bg-gray-50
                    hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t border-gray-200 flex p-3">
            <img src={user} className="w-10 h-10 rounded-md" />
            <div
              className={`flex justify-between items-center
                    overflow-hidden transition-all ${
                      expanded ? "w-52 ml-3" : "w-0"
                    } `}
            >
              <div className="flex flex-col items-start leading-4">
                <h4 className="font-semibold">{localStorage.getItem("nombres")} {localStorage.getItem("apellidos")}</h4>
                <span>{localStorage.getItem('rol')}</span>
              </div>

              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, to, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium
    rounded-md cursor-pointer transition-colors group 
${
  active
    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
    : "hover:bg-indigo-50 text-gray-600"
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
                bg-indigo-100 text-indigo-800 text-sm invisible opacity-20-translate-x-3 
                transition-all group-hover:visible group-hover:opacity-100 group-hover:transllate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
