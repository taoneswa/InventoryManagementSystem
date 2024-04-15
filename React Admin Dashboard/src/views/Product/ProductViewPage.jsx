import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function ProductViewPage() {
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
      .delete(`/products/${product.id}`)
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
      .get("/products")
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
        <h1>Products</h1>
        <Link className="btn-add" to="/products/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category ID</th>
              <th>Supplier ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Garage</th>
              <th>Route</th>
              <th>Image</th>
              <th>Buy Date</th>
              <th>Expire Date</th>
              <th>Buying Price</th>
              <th>Price</th>
              <th>Actions</th>
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
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.cat_id}</td>
                  <td>{p.sup_id}</td>
                  <td>{p.product_name}</td>
                  <td>{p.product_code}</td>
                  <td>{p.product_garage}</td>
                  <td>{p.product_route}</td>
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
