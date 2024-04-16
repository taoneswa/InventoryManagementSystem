import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";

export default function OrderingViewPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        setLoading(true);
        axiosClient.get('/orders')
            .then(({ data }) => {
                setLoading(false);
                setOrders(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>Ordering View Page</h1>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Product Code</th>
                            <th>Order Date</th>
                            <th>Delivery Date</th>
                            <th>Quantity</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <tbody>
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {orders && orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.product_name}</td>
                                    <td>{order.description}</td>
                                    <td>{order.product_code}</td>
                                    <td>{order.order_date}</td>
                                    <td>{order.delivery_date}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.total_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
