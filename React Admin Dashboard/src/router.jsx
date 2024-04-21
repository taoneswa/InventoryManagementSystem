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
import OrderingAddPage from "./views/Ordering/OrderingAddPage.jsx";
import OrderingViewPage from "./views/Ordering/OrderingViewPage.jsx";
import BrandEditPage from "./views/Brand/BrandEditPage.jsx";
import StockEditPage from "./views/Stock/StockEditPage.jsx";
import ProductEdit from "./views/Product/ProductEditPage.jsx";
import CategoryAddPage from "./views/Categories/CategoryAddPage.jsx";
const router = createBrowserRouter([

  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/',
        element: <Dashboard />
      },

      {
        path: '/brands',
        element: <BrandViewPage />
      },
      {
        path: '/brands/edit/:id',
        element: <BrandEditPage />
      },

      {
        path: '/orders',
        element: <OrderingViewPage />
      },
      {
        path: '/categories',
        element: <CategoryViewPage />
      },
      {
        path: '/categories/new',
        element: <CategoryAddPage key='categoryCreate' />
      },
      {
        path: '/orders',
        element: <OrderingAddPage key="orderCreate" />
      },
      {
        path: '/products',
        element: <ProductViewPage />
      },
      {
        path: '/products/edit/:id',
        element: <ProductEdit key="productUpdate" />
      },
      {
        path: '/stocks',
        element: <StockViewPage />
      },

      {
        path: '/stocks/new',
        element: <StockAddPage key="stockCreate" />
      },

      {
        path: '/stocks/edit/:id',
        element: <StockEditPage key="stockUpdate" />
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
