import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client.js";
import { useParams, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function BrandEditPage() {
    const { id } = useParams(); // Assuming you have a route parameter for the brand ID
    const navigate = useNavigate();
    const [brand, setBrand] = useState({
        name: "",
        cat_id: "",
        sup_id: ""
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    // Fetch the existing brand data when the component mounts
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`api/brands/${id}/`)
            .then((response) => {
                setLoading(false);
                setBrand(response.data); // Assuming the response contains brand data
            })
            .catch((err) => {
                setLoading(false);
                console.error("Error fetching brand data:", err);
                // Handle error appropriately
            });
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setLoading(true);
        axiosClient
            .put(`api/brands/${id}`, brand) // Assuming you have a PUT endpoint for updating brands
            .then(() => {
                setLoading(false);
                setNotification("Brand was successfully updated");
                navigate("/brands");
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
            <h1>Edit Brand</h1>
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
                            value={brand.name}
                            onChange={(ev) => setBrand({ ...brand, name: ev.target.value })}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={brand.cat_id}
                            onChange={(ev) => setBrand({ ...brand, cat_id: ev.target.value })}
                            placeholder="Category ID"
                        />
                        <input
                            type="text"
                            value={brand.sup_id}
                            onChange={(ev) => setBrand({ ...brand, sup_id: ev.target.value })}
                            placeholder="Supplier ID"
                        />
                        <button className="btn" disabled={loading}>Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
