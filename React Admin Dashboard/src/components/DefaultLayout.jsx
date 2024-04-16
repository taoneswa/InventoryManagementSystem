import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import { FaHome, FaUsers, FaBoxes, FaCubes, FaListAlt, FaTags, FaUserFriends, FaTruck, FaClipboardList, FaChartLine, FaMoneyBillAlt, FaUndoAlt, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';


export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();


  useEffect(() => {
    if (token) {
      axiosClient.get('/user')
        .then(({ data }) => {
          setUser(data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [token]); // Add token as a dependency

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

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/"><FaHome /> Dashboard</Link>
        <Link to="/products"><FaBoxes /> Products</Link>
        <Link to="/stock"><FaCubes /> Stock</Link>
        <Link to="/brands"><FaListAlt /> Brand</Link>
        <Link to="/customers"><FaUserFriends /> Customers</Link>
        <Link to="/suppliers"><FaTruck /> Suppliers</Link>
        <Link to="/categories"><FaTags /> Categories</Link>
        <Link to="/orders"><FaClipboardList /> Orders</Link>
        <Link to="/transactions"><FaChartLine /> Transactions</Link>
        <Link to="/reports"><FaMoneyBillAlt /> Reports</Link>
        <Link to="/sales"><FaUndoAlt /> Sales</Link>
        <Link to="/purchases"><FaUndoAlt /> Purchases</Link>
        <Link to="/expenses"><FaMoneyBillAlt /> Expenses</Link>
        <Link to="/returns"><FaUndoAlt /> Returns</Link>
        <Link to="/employees"><FaUser /> Employees</Link>
        <Link to="/users"><FaUsers /> Users</Link>
        <Link to="/settings"><FaCog /> Settings</Link>
      </aside>

      <div className="content">
        <header>
          <div>
            Inventory Management System
          </div>
          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="/logout">Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
