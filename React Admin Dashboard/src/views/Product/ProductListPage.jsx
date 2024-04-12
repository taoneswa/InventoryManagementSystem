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

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/product", {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                setProducts(response.data);
                console.log(response)
            } catch (error) {
                console.error("Failed to fetch employees:", error);
                setSnackbar({ open: true, message: "Failed to fetch employees" });
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
           await axios.delete(`http://127.0.0.1:8000/api/product/${id}`);
            await axios.delete(`http://127.0.0.0.1:8000/product/${id}`);
            setProducts(products.filter((product) => product.id !== id));
            setSnackbar({ open: true, message: "Product deleted successfully" });
        } catch (error) {
            console.error("Failed to delete product:", error);
            setSnackbar({ open: true, message: "Failed to delete product" });
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
                            <TableCell>Category ID</TableCell>
                            <TableCell>Supplier ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Product Code</TableCell>
                            <TableCell>Product Garage</TableCell>
                            <TableCell>Product Route</TableCell>
                            <TableCell>Product Image</TableCell>
                            <TableCell>Buy Date</TableCell>
                            <TableCell>Expire Date</TableCell>
                            <TableCell>Buying Price</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.cat_id}</TableCell>
                                <TableCell>{product.sup_id}</TableCell>
                                <TableCell>{product.product_name}</TableCell>
                                <TableCell>{product.product_code}</TableCell>
                                <TableCell>{product.product_garage}</TableCell>
                                <TableCell>{product.product_route}</TableCell>
                                <TableCell>{product.product_image}</TableCell>
                                <TableCell>{product.buy_date}</TableCell>
                                <TableCell>{product.expire_date}</TableCell>
                                <TableCell>{product.buying_price}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/product/view/${product.id}`}
                                        color="info">
                                        View
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/product/edit/${product.id}`}
                                        color="primary">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(product.id)}
                                        color="secondary">
                                        Delete
                                    </Button>
                                </TableCell>
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
    );
};

export default ProductListPage;
