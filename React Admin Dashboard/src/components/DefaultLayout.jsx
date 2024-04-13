import { Link, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsCart3, BsFillArchiveFill, BsPeopleFill, BsListCheck, BsFillGrid3X3GapFill, BsMenuButtonWideFill, BsFillGearFill } from "react-icons/bs";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider";

export default function DefaultLayout() {
  const [showInventorySubMenu, setShowInventorySubMenu] = useState(false);
  const { user, token, setUser, setToken, notification } = useStateContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = ev => {
    ev.preventDefault();

    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      });
  };

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);

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
          <Link to="/">
            <BsFillArchiveFill className='icon' /> Dashboard
          </Link>
        </li>

        <li className='sidebar-list-item'>
          <Link to="customer">
            <BsPeopleFill className='icon' /> Customers
          </Link>
        </li>
        <li className='sidebar-list-item'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="#">
            <BsListCheck className='icon' /> Inventory
          </Link>
          {showInventorySubMenu && (
            <ul className="submenu">
              <li>
                <Link to="/brand">
                  <span className="submenu-icon"><BsFillGrid3X3GapFill /></span> Brands
                </Link>
              </li>
              <li>
                <Link to="/category">
                  <span className="submenu-icon"><BsFillGrid3X3GapFill /></span> Categories
                </Link>
              </li>
              <li>
                <Link to="/product">
                  <span className="submenu-icon"><BsFillArchiveFill /></span> Products
                </Link>
              </li>
              <li>
                <Link to="/stock">
                  <span className="submenu-icon"><BsFillArchiveFill /></span> Stock
                </Link>
              </li>
              <li>
                <Link to="/supplier">
                  <span className="submenu-icon"><BsFillArchiveFill /></span> Suppliers
                </Link>
              </li>
              <li>
                <Link to="ordering">
                  <span className="submenu-icon"><BsFillArchiveFill /></span> Ordering
                </Link>
              </li>
              <li>
                <Link to="/transactions">
                  <span className="submenu-icon"><BsFillArchiveFill /></span> Transactions
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className='sidebar-list-item'>
          <Link to="/salary">
            <BsMenuButtonWideFill className='icon' /> Salaries
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="">
            <BsMenuButtonWideFill className='icon' /> Attendance
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="employee">
            <BsMenuButtonWideFill className='icon' /> Employees
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/reports">
            <BsMenuButtonWideFill className='icon' /> Reports
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="">
            <BsFillGearFill className='icon' /> Setting
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/users">
            <BsFillGearFill className='icon' /> Users
          </Link>
        </li>
      </ul>
      <div>
        {user.name} &nbsp; &nbsp;
        <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
      </div>
    </aside>
  );
}
