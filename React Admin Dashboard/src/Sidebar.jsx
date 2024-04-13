import React, { useState } from 'react';
import { BsCart3, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';
import { useStateContext } from './pages/ContextsProvider';
import { Navigate } from 'react-router-dom'; // Import Navigate from React Router

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [showInventorySubMenu, setShowInventorySubMenu] = useState(false);
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data)
      })
  }, [])

  const toggleInventorySubMenu = () => {
    setShowInventorySubMenu(!showInventorySubMenu);
  };

  const handleMouseEnter = () => {
    setShowInventorySubMenu(true);
  };

  const handleMouseLeave = () => {
    setShowInventorySubMenu(false);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> INVENTORY MANAGEMENT SYS
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="/">
            <BsFillArchiveFill className='icon' /> Dashboard
          </a>
        </li>

        <li className='sidebar-list-item'>
          <a href="customer">
            <BsPeopleFill className='icon' /> Customers
          </a>
        </li>
        <li className='sidebar-list-item'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a href="#">
            <BsListCheck className='icon' /> Inventory
          </a>
          {showInventorySubMenu && (
            <ul className="submenu">
              <li>
                <a href="/brand">
                  <span className="submenu-icon"><BsFillGrid3X3GapFill /></span> Brands
                </a>
              </li>
              <li>
                <a href="/category">
                  <span className="submenu-icon"><BsFillGrid3X3GapFill /></span> Categories
                </a>
              </li>
              <li>
                <a href="/product">
                  <span className="submenu-icon"><BsFillArchiveFill /></span> Products
                </a>
              </li>
              <li>
                <a href="/stock">
                  <span className="submenu-icon"><BsFillArchiveFill /></span> Stock
                </a>
              </li>
              <li>
                <a href="/supplier">
                  <span className="submenu-icon"><BsFillArchiveFill /></span> Suppliers
                </a>
              </li>
              <li>
                <a href="ordering">
                  <span className="submenu-icon"><BsFillArchiveFill /></span> Ordering
                </a>
              </li>
              <li>
                <a href="/transactions">
                  <span className="submenu-icon"><BsFillArchiveFill /></span> Transactions
                </a>
              </li>
            </ul>
          )}
        </li>

        <li className='sidebar-list-item'>
          <a href="/salary">
            <BsMenuButtonWideFill className='icon' /> Salaries
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsMenuButtonWideFill className='icon' /> Attendance
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="employee">
            <BsMenuButtonWideFill className='icon' /> Employees
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/reports">
            <BsMenuButtonWideFill className='icon' /> Reports
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsFillGearFill className='icon' /> Setting
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/users">
            <BsFillGearFill className='icon' /> Users
          </a>
        </li>

      </ul>
      <div>
        {user.name} &nbsp; &nbsp;
        <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
      </div>
    </aside>
  );
}

export default Sidebar;
