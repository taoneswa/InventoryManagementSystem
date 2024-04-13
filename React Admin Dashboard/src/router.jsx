import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import EmployeeListPage from "./views/Employees/EmployeeListPage";
import ReportsListPage from "./views/Reports/ReportsListPage";
import SalaryListPage from "./views/Salary/SalaryListPage";
import CustomerListPage from "./views/Customers/CustomersListPage";
import ProductListPage from "./views/Product/ProductListPage";
import Siderbar from "./Sidebar";
import Home from "./Home";
const router = createBrowserRouter([
  {
    path: '/',
    element: <Siderbar />,
    children: [
      {
        path: '/',
        element: <Navigate to="/users" />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/employee',
        element: <EmployeeListPage />
      },
      {
        path: '/reports',
        element: <ReportsListPage />
      },
      {
        path: '/salary',
        element: <SalaryListPage />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/customer',
        element: <CustomerListPage />,
      },
      {
        path: '/product',
        element: <ProductListPage />
      }

    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Signup />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
])

export default router;
