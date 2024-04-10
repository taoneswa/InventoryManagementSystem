import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { Route, Routes } from "react-router-dom";
import EmployeeListPage from './pages/Employees/EmployeeListPage'
import EmployeeAddPage from './pages/Employees/EmployeeAddPage'
import EmployeeEditPage from './pages/Employees/EmployeeEditPage'
import EmployeeViewPage from './pages/Employees/EmployeeViewPage'
import axios from 'axios';
import Report from './pages/Reports/ReportsViewPage'
import ReportsViewPage from './pages/Reports/ReportsViewPage'
import ProductViewPage from './pages/Product/ProductViewPage'
import ReportsListPage from './pages/Reports/ReportsListPage'
import ProductListPage from './pages/Product/ProductListPage'
import SalaryListPage from './pages/Salary/SalaryListPage'
import OrderingListPage from './pages/Ordering/OrderingListPage'

axios.defaults.baseURL = 'http://127.0.0.1:8000';
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Routes>
        <Route path="dashboard/" index element={<Home />} />

        <Route path="employee/" element={<EmployeeListPage />} />
        <Route path="employee/add/" element={<EmployeeAddPage />} />
        <Route path="employee/edit/:id/" element={<EmployeeEditPage />} />
        <Route path="employee/view/:id/" element={<EmployeeViewPage />} />

        <Route path="reports/" element={<ReportsListPage />} />
        <Route path="employee/add/" element={<EmployeeAddPage />} />
        <Route path="employee/edit/:id/" element={<EmployeeEditPage />} />
        <Route path="reports/view/:id/" element={<ReportsViewPage />} />



        <Route path="product/" element={<ProductListPage />} />
        <Route path="product/add/" element={<EmployeeAddPage />} />
        <Route path="product/edit/:id/" element={<EmployeeEditPage />} />
        <Route path="product/view/:id/" element={<ProductViewPage />} />



        <Route path="ordering/" element={<OrderingListPage />} />
        <Route path="product/add/" element={<EmployeeAddPage />} />
        <Route path="product/edit/:id/" element={<EmployeeEditPage />} />
        <Route path="product/view/:id/" element={<ProductViewPage />} />

        <Route path="salary/" element={<SalaryListPage />} />
        <Route path="product/add/" element={<EmployeeAddPage />} />
        <Route path="product/edit/:id/" element={<EmployeeEditPage />} />
        <Route path="product/view/:id/" element={<ProductViewPage />} />
      </Routes>

    </div>
  )
}

export default App
