import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, CircularProgress } from '@mui/material';

const ProductViewPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`api/product/${id}`); // Adjust the API URL as needed
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch product:', err);
                setError('Failed to fetch product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <CircularProgress />
            </Grid>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" textAlign="center">
                {error}
            </Typography>
        );
    }

    return (
        <div className='main-container'>
            <Paper elevation={3} style={{ padding: 20, margin: '20px auto', maxWidth: 600 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Product Details
                </Typography>
                {product ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Category ID:</strong> {product.cat_id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Supplier ID:</strong> {product.sup_id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Product Name:</strong> {product.product_name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Product Code:</strong> {product.product_code}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Product Garage:</strong> {product.product_garage}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Product Route:</strong> {product.product_route}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Product Image:</strong> {product.product_image}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Buy Date:</strong> {product.buy_date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Expire Date:</strong> {product.expire_date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Buying Price:</strong> {product.buying_price}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Price:</strong> {product.price}</Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1">Product not found</Typography>
                )}
            </Paper>
        </div>

    );
};

export default ProductViewPage;
