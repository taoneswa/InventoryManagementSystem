import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client.js";
import { useParams, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function StockEditPage() {
    const { id } = useParams(); // Assuming you have a route parameter for the stock ID
    const navigate = useNavigate();
    const [stock, setStock] = useState({
        product_id: "",
        quantity: "",
        amount: "",
        total_amount: ""
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    // Fetch the existing stock data when the component mounts
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/stocks/${id}/`)
            .then((response) => {
                setLoading(false);
                setStock(response.data); // Assuming the response contains stock data
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error fetching stock data:", err);
                // Handle error appropriately
            });
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        axiosClient
            .put(`/stocks/${id}`, stock) // Assuming you have a PUT endpoint for updating stocks
            .then(() => {
                setLoading(false);
                setNotification("Stock was successfully updated");
                navigate("/stocks");
            })
            .catch((err) => {
                setLoading(false);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                } else {
                    // Handle other errors
                    setErrors({ general: "Something went wrong. Please try again later." });
                }
            });
    };

    return (
        <>
            <h1>Edit Stock</h1>
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            value={stock.product_id}
                            onChange={(ev) => setStock({ ...stock, product_id: ev.target.value })}
                            placeholder="Product ID"
                        />
                        <input
                            type="text"
                            value={stock.quantity}
                            onChange={(ev) => setStock({ ...stock, quantity: ev.target.value })}
                            placeholder="Quantity"
                        />
                        <input
                            type="text"
                            value={stock.amount}
                            onChange={(ev) => setStock({ ...stock, amount: ev.target.value })}
                            placeholder="Amount"
                        />
                        <input
                            type="text"
                            value={stock.total_amount}
                            onChange={(ev) => setStock({ ...stock, total_amount: ev.target.value })}
                            placeholder="Total Amount"
                        />
                        <button className="btn" disabled={loading}>Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
