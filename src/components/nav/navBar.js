import React from "react"
import { Link } from "react-router-dom"
import "./navBar.css"

export const NavBar = (props) => {
  return (
    <nav className="navbar">

      <ul className="navbar">
        <li className="navbar__item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="navbar__item">
          <Link className="nav-link" to="/Entries">Entries</Link>
        </li>
        <li className="navbar__item">
          <Link className="nav-link" to="/Friends">Friends</Link>
        </li>
      </ul>
    </nav>
  )
}
