import React, { useEffect, useState } from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
const SalaryListPage = () => {
    const [salary, setSalary] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await axios.get("/salary", {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                setSalary(response.data);
                console.log(response)
            } catch (error) {
                console.error("Failed to fetch Salaries:", error);
                setSnackbar({ open: true, message: "Failed to fetch Salaries" });
            }
        };

        fetchSalary();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.0.1:8000/salary/${id}`); // Adjust the API URL as needed
            setSalary(salary.filter((salary) => salary.id !== id));
            setSnackbar({ open: true, message: "Salary deleted successfully" });
        } catch (error) {
            console.error("Failed to delete salaries:", error);
            setSnackbar({ open: true, message: "Failed to delete salary" });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <main className='main-container'>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Salary Month</TableCell>
                            <TableCell>Salary Year</TableCell>
                            <TableCell>Advance Salary</TableCell>
                            <TableCell>Paid Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salary.map((salary, index) => (
                            <TableRow key={index}>
                                <TableCell>{salary.employee_id}</TableCell>
                                <TableCell>{salary.salary_month}</TableCell>
                                <TableCell>{salary.salary_year}</TableCell>
                                <TableCell>{salary.advance_salary}</TableCell>
                                <TableCell>{salary.paid_amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
            />
        </main>
    )
}

export default SalaryListPage;
