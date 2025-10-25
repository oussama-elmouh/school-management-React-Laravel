import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {  LOGIN_ROUTE, STUDENT_DASHBORD_ROUTE } from "../router";

export default function GuestLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate
  useEffect(()=>{
  if(!window.localStorage.getItem('ACCES_TOKEN')){
    navigate(STUDENT_DASHBORD_ROUTE)
  }
  })
  return (
    <div className={darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}>
      {/* Header */}
      <header  >
      <div
        className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
        <div className="text-2xl text-white font-semibold inline-flex items-center">
          {/* Logo et titre */}
          {/*  <Logo/> */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
              alt="logo"
              className="w-10 h-10 bg-white rounded-full p-1"
            />
            <span className="text-xl font-semibold ml-2">School Management</span>
          </div>

          {/* Menu */}
          <nav>
            <ul className="  text-white flex items-center space-x-6 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-indigo-300 transition">Home</Link>
              </li>
              <li>
                <Link to={LOGIN_ROUTE} className="hover:text-indigo-300 transition">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-300 transition">Register</Link>
              </li>
              <li>
                <Link to="/users" className="hover:text-indigo-300 transition">Users</Link>
              </li>
              <li>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="px-3 py-1 rounded bg-white text-gray-800 hover:bg-gray-200 transition"
                >
                  {darkMode ? "Light" : "Dark"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto p-4 ">
  <Outlet />
</main>



      {/* Footer */}
      <footer  >
         
      </footer>
    </div>
  );
}
