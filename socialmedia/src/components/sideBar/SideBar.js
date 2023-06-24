import React from 'react'
import { Link,NavLink } from 'react-router-dom'

import "./SideBar.css"

function SideBar() {
  return (
    <div className='sidebar'>
        <NavLink to="/" className="sidebar-item" >
            <i className="fa-sharp fa-solid fa-house"></i>
            <span>Home</span>
        </NavLink>
        <NavLink to="/explore" className="sidebar-item" >
            <i className="fa-sharp fa-solid fa-compass"></i>
            <span>Explore</span>
        </NavLink>
        <NavLink to="/signup" className="sidebar-item" >
            <i className="fa-solid fa-bookmark"></i>
            <span>Bookmark</span>
        </NavLink>
        <NavLink to="/signup" className="sidebar-item" >
            <i className="fa-sharp fa-solid fa-heart"></i>
            <span>Likes</span>
        </NavLink>
    </div>
  )
}

export default SideBar