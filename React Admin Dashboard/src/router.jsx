import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import Home from "./Home";
import EmployeeListPage from "./views/Employees/EmployeeListPage";
import EmployeeAddPage from "./views/Employees/EmployeeAddPage";
import EmployeeEditPage from "./views/Employees/EmployeeEditPage";
import EmployeeViewPage from "./views/Employees/EmployeeViewPage";
import ReportsListPage from "./views/Reports/ReportsListPage";
import ReportsViewPage from "./views/Reports/ReportsViewPage";
import ProductListPage from "./views/Products/ProductListPage";
import ProductViewPage from "./views/Products/ProductViewPage";
import OrderingListPage from "./views/Ordering/OrderingListPage";
import SalaryListPage from "./views/Salary/SalaryListPage";
import CustomerListPage from "./views/Customer/CustomerListPage";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
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
      // Added routes
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/employee',
        element: <EmployeeListPage />
      },
      {
        path: '/employee/add',
        element: <EmployeeAddPage />
      },
      {
        path: '/employee/edit/:id',
        element: <EmployeeEditPage />
      },
      {
        path: '/employee/view/:id',
        element: <EmployeeViewPage />
      },
      {
        path: '/reports',
        element: <ReportsListPage />
      },
      {
        path: '/reports/view/:id',
        element: <ReportsViewPage />
      },
      {
        path: '/product',
        element: <ProductListPage />
      },
      {
        path: '/product/view/:id',
        element: <ProductViewPage />
      },
      {
        path: '/ordering',
        element: <OrderingListPage />
      },
      {
        path: '/salary',
        element: <SalaryListPage />
      },
      {
        path: '/customer',
        element: <CustomerListPage />
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
        path: '/signup',
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
