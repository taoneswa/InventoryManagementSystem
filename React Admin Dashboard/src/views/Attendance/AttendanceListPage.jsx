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

const AttendanceListPage = () => {
    const [attendances, setAttendances] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    useEffect(() => {
        const fetchAttendances = async () => {
            try {
                const response = await axios.get("api/attendance", {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                setAttendances(response.data);
            } catch (error) {
                console.error("Failed to fetch attendances:", error);
                setSnackbar({ open: true, message: "Failed to fetch attendances" });
            }
        };

        fetchAttendances();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.0.1:8000/attendances/${id}`);
            setAttendances(attendances.filter((attendance) => attendance.id !== id));
            setSnackbar({ open: true, message: "Attendance deleted successfully" });
        } catch (error) {
            console.error("Failed to delete attendance:", error);
            setSnackbar({ open: true, message: "Failed to delete attendance" });
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
                            <TableCell>Att Date</TableCell>
                            <TableCell>Att Month</TableCell>
                            <TableCell>Att Year</TableCell>
                            <TableCell>Attendance</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendances.map((attendance) => (
                            <TableRow key={attendance.id}>
                                <TableCell>{attendance.employee_id}</TableCell>
                                <TableCell>{attendance.att_date}</TableCell>
                                <TableCell>{attendance.att_month}</TableCell>
                                <TableCell>{attendance.att_year}</TableCell>
                                <TableCell>{attendance.attendance}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/attendance/view/${attendance.id}`}
                                        color="info">
                                        View
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/attendance/edit/${attendance.id}`}
                                        color="primary">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(attendance.id)}
                                        color="secondary">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Button
                                    component={Link}
                                    to="/attendance/add"
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

export default AttendanceListPage;
