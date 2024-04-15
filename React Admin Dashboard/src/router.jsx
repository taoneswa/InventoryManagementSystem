import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import './App.css'
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Header from './Header.jsx'
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import ReportsListPage from "./views/Reports/ReportsListPage";
import SalaryListPage from "./views/Salary/SalaryListPage";
import Siderbar from "./Sidebar.jsx";
import Home from "./Home";
import BrandViewPage from "./views/Brand/BrandViewPage.jsx";
import BrandAddPage from "./views/Brand/BrandAddPage.jsx";
import CategoryViewPage from "./views/Categories/CategoryViewPage.jsx";
import ProductViewPage from "./views/Product/ProductViewPage.jsx";
import ProductAdd from "./views/Product/ProductAddPage.jsx";
import StockViewPage from "./views/Stock/StockViewPage.jsx";
import StockAddPage from "./views/Stock/StockAddPage.jsx";
import EmployeeViewPage from "./views/Employees/EmployeeViewPage.jsx";
import EmployeeAddPage from "./views/Employees/EmployeeAddPage.jsx";
import CustomersViewPage from "./views/Customers/CustomersViewPage.jsx";
import CustomersAddPage from "./views/Customers/CustomersAddPage.jsx";
import SupplierViewPage from "./views/Supplier/SupplierViewPage.jsx";
import SupplierAddPage from "./views/Supplier/SupplierAddPage.jsx";
const router = createBrowserRouter([

  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/users',
        element: <Navigate to="/users" />
      },
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/brands',
        element: <BrandViewPage />
      },
      {
        path: '/categories',
        element: <CategoryViewPage />
      },
      {
        path: '/products',
        element: <ProductViewPage />
      },
      {
        path: '/stock',
        element: <StockViewPage />
      },

      {
        path: '/stock/new',
        element: <StockAddPage key="stockCreate" />
      },

      {
        path: '/products/new',
        element: <ProductAdd key="productCreate" />
      },

      {
        path: '/brands/new',
        element: <BrandAddPage key="brandCreate" />
      },

      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/employees/new',
        element: <EmployeeAddPage key="employeeCreate"
        />
      },

      {
        path: '/brands/:id',
        element: <BrandAddPage key="brandUpdate" />
      },

      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/customers/:id',
        element: <CustomersAddPage key="customerUpdate" />
      },
      {
        path: '/employees',
        element: <EmployeeViewPage />
      },
      {
        path: '/suppliers',
        element: <SupplierViewPage />
      },
      {
        path: '/suppliers',
        element: <SupplierAddPage key="supplierCreate" />
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
        path: '/customers',
        element: <CustomersViewPage />,
      },



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
