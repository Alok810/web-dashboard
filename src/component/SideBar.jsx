import React from "react";
import { NavLink } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import logoLottie from "../assets/Images/Logo.lottie";

function SideBar() {
  return (
    <aside
      className="flex flex-col justify-between md:w-80 lg:w-80 w-64 min-h-screen border border-gray-200 z-10 shadow-lg"
      style={{
        background: "linear-gradient( #fce7f3 0%, #e0f2fe 50%, #e0f2fe 100%)",
        color: "#3e67c8",
      }}
    >
<div className="py-3 text-center border-b-2 border-gray-200 ">
  <NavLink to="/">
    <div className="mx-auto w-25 h-25 rounded-2xl shadow-lg z-10 pointer-events-none"> {/* Slightly smaller size */}
      <DotLottieReact
        src={logoLottie}
        autoplay
        loop
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  </NavLink>
</div>


      <nav className="text-sm h-full text-[#3e67c8]">
        <ul className="flex flex-col">
          <li className="px-4 cursor-pointer hover:bg-gray-100">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
              }
              to="/"
            >
              <span className="py-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                  />
                </svg>
                Dashboard
              </span>
            </NavLink>
          </li>

          <li className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-[#3e67c8]">
            User Management
          </li>

          <li className="px-4 cursor-pointer hover:bg-gray-100">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
              }
              to="/vulnerability-scan"
            >
              <span className="py-3 flex items-center">
                Vulnerability Scan
              </span>
            </NavLink>
          </li>

          <li className="cursor-pointer hover:bg-gray-100">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
              }
              to="/honeypot-monitor"
            >
              <span className="px-4 py-3 flex items-center">
                Honeypot Monitoring
              </span>
            </NavLink>
          </li>

          <li className="px-4 cursor-pointer hover:bg-gray-100">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
              }
              to="/password-manager"
            >
              <span className="py-3 flex items-center">
                Password Manager
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        <div className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-[#3e67c8]">
          Profile & Settings
        </div>
        <div className="py-3 text-sm text-center text-[#3e67c8] border-t border-gray-200">
          <ul className="flex flex-col">
            <li className="px-4 cursor-pointer hover:bg-gray-100">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
                }
                to="/profile"
              >
                <span className="py-3 flex items-center">
                  Profile
                </span>
              </NavLink>
            </li>

            <li className="px-4 cursor-pointer hover:bg-gray-100">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-[#3e67c8] font-bold" : "text-[#3e67c8]"
                }
                to="/settings"
              >
                <span className="py-3 flex items-center">
                  Settings
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
