import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();


  useEffect(() => {
    if (token) {
      axiosClient.get('/user')
        .then(({ data }) => {
          setUser(data)
        })
    }
  }, []);
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
        <Link to="/">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>
        <Link to="/stock">Stock</Link>
        <Link to="/brands">Brand</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/suppliers">Suppliers</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/sales">Sales</Link>
        <Link to="/purchases">Purchases</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/returns">Returns</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/settings">Settings</Link>
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
