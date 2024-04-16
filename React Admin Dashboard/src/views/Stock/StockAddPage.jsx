import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function StockAddPage() {
  const navigate = useNavigate();
  const [stock, setStock] = useState({
    product_id: '',
    quantity: '',
    amount: '',
    total_amount: ''
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    setStock(prevState => ({ ...prevState, "product_id": parseInt(stock.product_id) }))
    axiosClient
      .post("/stock", stock)
      .then(() => {
        setNotification("Stock was successfully added");
        navigate("/stock");
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
      <h1>Add Stock</h1>
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
            <label htmlFor="product_id">Product ID</label>
            <input
              type="text"
              id="product_id"
              value={stock.product_id}
              onChange={(ev) => setStock({ ...stock, product_id: ev.target.value })}
              placeholder="Product ID"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              value={stock.quantity}
              onChange={(ev) => setStock({ ...stock, quantity: ev.target.value })}
              placeholder="Quantity"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              id="amount"
              value={stock.amount}
              onChange={(ev) => setStock({ ...stock, amount: ev.target.value })}
              placeholder="Amount"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="total_amount">Total Amount</label>
            <input
              type="text"
              id="total_amount"
              value={stock.total_amount}
              onChange={(ev) => setStock({ ...stock, total_amount: ev.target.value })}
              placeholder="Total Amount"
              required
            />
          </div>
          <button className="btn">Add Stock</button>
        </form>
      </div>
    </>
  );
}
