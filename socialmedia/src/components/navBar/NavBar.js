import React from 'react'
import { Link,NavLink } from 'react-router-dom'

import "./NavBar.css"

function NavBar() {
  return (
    <div className="navbar">
        <NavLink to="/" className="navbar-item">
            <span>Fit Together</span>
        </NavLink>

        <NavLink to="/profile" className="navbar-item">
            <span className='profile'>Profile</span>
        </NavLink>

    </div>
  )
}

export default NavBar