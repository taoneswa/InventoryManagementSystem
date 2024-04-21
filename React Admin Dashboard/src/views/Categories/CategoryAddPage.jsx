import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function CategoryAddPage() {
    const navigate = useNavigate();
    const [stock, setStock] = useState({
        cat_id: '',
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        setStock(prevState => ({ ...prevState, "cat_id": parseInt(stock.cat_id) }))
        axiosClient
            .post("/categories", stock)
            .then(() => {
                setNotification("Category was successfully added");
                navigate("/categories");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <>
            <h1>Add Category</h1>
            <div className="card animated fadeInDown">
                <form onSubmit={onSubmit}>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="product_id">Category</label>
                        <input
                            type="text"
                            id="cat_id"
                            value={stock.cat_id}
                            onChange={(ev) => setStock({ ...stock, cat_id: ev.target.value })}
                            placeholder="Category"
                            required
                        />
                    </div>
                    <button className="btn">Add Category</button>
                </form>
            </div>
        </>
    );
}
