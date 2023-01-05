import { React, useState } from 'react'
import { NavLink } from "react-router-dom"
import './Sidebar.css'
import { BiSun, BiMoon, BiChevronRight, BiBug, BiSearchAlt, BiHomeAlt, BiCodeAlt } from "react-icons/bi";
import { FaFontAwesomeFlag, FaFingerprint, FaSkull } from "react-icons/fa";

const Sidebar = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const routes = [
    { path: "/dashboard", name: "Dashboard", icon: <BiHomeAlt /> },
    { path: "/forensics", name: "Forensics", icon: <BiSearchAlt /> },
    { path: "/crypto", name: "Cryptography", icon: <FaFingerprint /> },
    { path: "/pwn", name: "Pwn", icon: <FaSkull /> },
    { path: "/reversing", name: "Reverse Engineering", icon: <BiBug /> },
    { path: "/web", name: "Web", icon: <BiCodeAlt /> },
  ];

  return (
    <div className='container'>
      <div className={sideBarOpen ? 'sidebar' : 'sidebar close'}>
        <header>
          <div className='icon-text'>
            <div className='icon'>
              <FaFontAwesomeFlag />
            </div>
            <div className="logo-text">
              <span className='text'>FlagHoarder</span>
            </div>
          </div>
          <BiChevronRight className='toggle' onClick={toggleSideBar}>

          </BiChevronRight>
        </header>

        <div className='menu-bar'>
          <div className='menu'>
            <ul>
              {routes.map((route, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={route.path}
                      key={index}
                      className="link"
                      // activeClassName="active"
                      style={{ textDecoration: 'none', display: 'flex', height: '100%', width: '100%' }}
                    >
                      <div className='nav-link'>
                        <div className="icon">{route.icon}</div>
                        <div className="text">
                          {route.name}
                        </div>
                      </div>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="bottom-content">
            <li className="mode">
              <div className="sun-moon">
                {
                  sideBarOpen ?
                    <div className='d-icons'>
                      {
                        darkMode ?
                          <div className='icon-sun'>
                            <BiMoon />
                            <span className='d-text'> Dark Mode</span>
                          </div>
                          :
                          <div className='icon-moon'>
                            <BiSun />
                            <span className='d-text'> Light Mode</span>
                          </div>
                      }
                    </div>
                    : null
                }
              </div>

              <div className="toggle-switch" onClick={toggleDarkMode}>
                <span className="switch"></span>
              </div>
            </li>

          </div>
        </div>
      </div>
      <section className="home">
        {children}
      </section>
    </div>
  )
}

export default Sidebar