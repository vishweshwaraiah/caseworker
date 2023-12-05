import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { menuOnlyRoutes } from 'template/routes'
import Icon from 'components/JvIcon'
import { classNames } from 'helpers/globals'

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  const getClasses = () => {
    const classList = ['topnav']

    if (openMenu) {
      classList.push('responsive')
    }

    return classNames(classList)
  }

  return (
    <nav className={getClasses()}>
      {menuOnlyRoutes?.map((r) => (
        <NavLink to={r.routePath} key={r.routeId}>
          {r.routeName}
        </NavLink>
      ))}
      <NavLink onClick={() => toggleMenu()} className="icon">
        <Icon svgName="mobile-menu" size="medium" />
      </NavLink>
    </nav>
  )
}

export default NavBar
