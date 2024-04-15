import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function SupplierViewPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getProducts();
  }, []);

  const onDeleteClick = product => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    axiosClient
      .delete(`/suppliers/${product.id}`)
      .then(() => {
        setNotification("Product was successfully deleted");
        getProducts();
      })
      .catch(error => {
        console.error("Error deleting product:", error);
      });
  };

  const getProducts = () => {
    setLoading(true);
    axiosClient
      .get("/suppliers")
      .then(({ data }) => {
        setLoading(false);
        setProducts(data.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Suppliers Details</h1>
        <Link className="btn-add" to="/products/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Pone</th>
              <th>Shop Name</th>
              <th>Photo</th>
              <th>Address</th>
              <th>Type</th>
              <th>City</th>
              <th>Bank Name</th>
              <th>Account Holder</th>
              <th>Bank Branch</th>
              <th>Account Number</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="13" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {products && products.map(p => (
                <tr key={p.email}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{p.shop_name}</td>
                  <td>{p.photo}</td>
                  <td>{p.address}</td>
                  <td>{p.type}</td>
                  <td>{p.city}</td>
                  <td>{p.bank_name}</td>
                  <td>{p.account_holder}</td>
                  <td>{p.bank_branch}</td>
                  <td>{p.account_number}</td>


                  <td>
                    {p.product_image && (
                      <img src={p.product_image} alt={p.product_name} style={{ width: "50px", height: "auto" }} />
                    )}
                  </td>
                  <td>{p.buy_date}</td>
                  <td>{p.expire_date}</td>
                  <td>{p.buying_price}</td>
                  <td>{p.price}</td>
                  <td>
                    <Link className="btn-edit" to={`/products/${p.id}`}>
                      Edit
                    </Link>
                    &nbsp;
                    <button className="btn-delete" onClick={() => onDeleteClick(p)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
