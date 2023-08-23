import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import routes from 'template/routes'
import Icon from 'components/MasterIcon'

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  const getClasses = () => {
    let defClass = 'topnav'
    defClass = openMenu ? `${defClass} responsive` : defClass
    return defClass
  }

  return (
    <nav className={getClasses()}>
      {routes?.map((r) => (
        <NavLink to={r._path} key={r._id}>
          {r._name}
        </NavLink>
      ))}

      <NavLink onClick={() => toggleMenu()} className="icon">
        <Icon svgName="mobile-menu" size="medium" />
      </NavLink>
    </nav>
  )
}

export default NavBar
