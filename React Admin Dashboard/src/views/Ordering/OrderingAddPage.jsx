import React, { useState } from "react";
import axiosClient from "../../axios-client.js";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function OrderingAddPage() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        product_name: "",
        description: "",
        product_code: "",
        order_date: "",
        delivery_date: "",
        quantity: "",
        total_amount: ""
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        axiosClient
            .post("/orders", order)
            .then(() => {
                setLoading(false);
                setNotification("Order was successfully created");
                navigate("/orders");
                // Reset form after successful submission
                setOrder({
                    product_name: "",
                    description: "",
                    product_code: "",
                    order_date: "",
                    delivery_date: "",
                    quantity: "",
                    total_amount: ""
                });
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
            <h1>New Order</h1>
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
                            value={order.product_name}
                            onChange={(ev) => setOrder({ ...order, product_name: ev.target.value })}
                            placeholder="Product Name"
                        />
                        <input
                            type="text"
                            value={order.description}
                            onChange={(ev) => setOrder({ ...order, description: ev.target.value })}
                            placeholder="Description"
                        />
                        <input
                            type="text"
                            value={order.product_code}
                            onChange={(ev) => setOrder({ ...order, product_code: ev.target.value })}
                            placeholder="Product Code"
                        />
                        <input
                            type="date"
                            value={order.order_date}
                            onChange={(ev) => setOrder({ ...order, order_date: ev.target.value })}
                            placeholder="Order Date"
                        />
                        <input
                            type="date"
                            value={order.delivery_date}
                            onChange={(ev) => setOrder({ ...order, delivery_date: ev.target.value })}
                            placeholder="Delivery Date"
                        />
                        <input
                            type="number"
                            value={order.quantity}
                            onChange={(ev) => setOrder({ ...order, quantity: ev.target.value })}
                            placeholder="Quantity"
                        />
                        <input
                            type="number"
                            value={order.total_amount}
                            onChange={(ev) => setOrder({ ...order, total_amount: ev.target.value })}
                            placeholder="Total Amount"
                        />
                        <button className="btn" disabled={loading}>Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
