import React, { useState } from 'react';
import { BsCart3, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    const [showInventorySubMenu, setShowInventorySubMenu] = useState(false);

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
                    <a href="dashboard">
                        <BsFillArchiveFill className='icon' /> Dashboard
                    </a>
                </li>

                <li className='sidebar-list-item'>
                    <a href="">
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
                    <a href="salary">
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
            </ul>
        </aside>
    );
}

export default Sidebar;
