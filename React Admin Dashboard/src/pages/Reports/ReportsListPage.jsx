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

const ReportsListPage = () => {
    const [reports, setReports] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("api/reports", {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                setReports(response.data);
                console.log(response);
            } catch (error) {
                console.error("Failed to fetch reports:", error);
                setSnackbar({ open: true, message: "Failed to fetch reports" });
            }
        };

        fetchReports();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.0.1:8000/reports/${id}`); // Adjust the API URL as needed
            setReports(reports.filter((report) => report.id !== id));
            setSnackbar({ open: true, message: "Report deleted successfully" });
        } catch (error) {
            console.error("Failed to delete report:", error);
            setSnackbar({ open: true, message: "Failed to delete report" });
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
                            <TableCell>Description</TableCell>
                            <TableCell>Inventory ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>{report.name}</TableCell>
                                <TableCell>{report.description}</TableCell>
                                <TableCell>{report.inventory_id}</TableCell>
                                <TableCell>{report.type}</TableCell>
                                <TableCell>{report.user_id}</TableCell>
                                <TableCell>{report.status}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/report/view/${report.id}`}
                                        color="info">
                                        View
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/report/edit/${report.id}`}
                                        color="primary">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(report.id)}
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
                                    to="/report/add"
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

export default ReportsListPage;
