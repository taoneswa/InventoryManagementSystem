import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const ProductEditPage = ({ match }) => {
    const [productData, setProductData] = useState({
        cat_id: '',
        sup_id: '',
        product_name: '',
        product_code: '',
        product_garage: '',
        product_route: '',
        product_image: '',
        buy_date: '',
        expire_date: '',
        buying_price: '',
        price: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const productId = match.params.id; // Assuming you're using react-router

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`/api/products/${productId}`); // Adjust API URL as needed
                setProductData(response.data);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setSnackbarMessage('Failed to fetch product data!');
                setSnackbarOpen(true);
            }
        };

        fetchProductData();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/products/${productId}`, productData); // Adjust API URL as needed
            if (response.status === 200) {
                setSnackbarMessage('Product updated successfully!');
                setSnackbarOpen(true);
                // Optionally redirect or perform further actions
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setSnackbarMessage('Failed to update product!');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
                <Paper style={{ padding: 20, marginTop: 30 }}>
                    <Typography variant="h6" gutterBottom>
                        Edit Product
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {Object.keys(productData).map((key) =>
                                key !== 'id' && key !== 'product_image' ? ( // Assuming 'id' and 'product_image' should not be edited
                                    <Grid item xs={12} sm={6} key={key}>
                                        <TextField
                                            fullWidth
                                            label={key.replace(/_/g, ' ').toUpperCase()}
                                            variant="outlined"
                                            name={key}
                                            value={productData[key]}
                                            onChange={handleChange}
                                            type={key.includes('date') ? 'date' : 'text'}
                                        />
                                    </Grid>
                                ) : null,
                            )}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
        </Grid>
    );
};

export default ProductEditPage;
