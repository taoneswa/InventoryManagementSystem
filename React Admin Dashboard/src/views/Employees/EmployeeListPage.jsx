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
const EmployeeListPage = () => {
    const [employees, setEmployees] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("api/employee", {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                setEmployees(response.data);
                console.log(response)
            } catch (error) {
                console.error("Failed to fetch employees:", error);
                setSnackbar({ open: true, message: "Failed to fetch employees" });
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.0.1:8000/employees/${id}`); // Adjust the API URL as needed
            setEmployees(employees.filter((employee) => employee.id !== id));
            setSnackbar({ open: true, message: "Employee deleted successfully" });
        } catch (error) {
            console.error("Failed to delete employee:", error);
            setSnackbar({ open: true, message: "Failed to delete employee" });
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
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>NID No</TableCell>
                            <TableCell>Experience</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Vacation</TableCell>

                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.phone}</TableCell>
                                <TableCell>{employee.photo}</TableCell>
                                <TableCell>{employee.nid_no}</TableCell>
                                <TableCell>{employee.experience}</TableCell>
                                <TableCell>{employee.address}</TableCell>
                                <TableCell>{employee.phone}</TableCell>
                                <TableCell>{employee.city}</TableCell>
                                <TableCell>{employee.salary}</TableCell>
                                <TableCell>{employee.vacation}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/employee/view/${employee.id}`}
                                        color="info">
                                        View
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/employee/edit/${employee.id}`}
                                        color="primary">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(employee.id)}
                                        color="secondary">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={9}>
                                <Button
                                    component={Link}
                                    to="/employee/add"
                                    color="primary"
                                    fullWidth
                                    variant="contained">
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
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

export default EmployeeListPage;
