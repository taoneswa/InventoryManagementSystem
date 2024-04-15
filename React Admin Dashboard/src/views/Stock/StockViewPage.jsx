import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function StockViewPage() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getStock();
  }, []);

  const getStock = () => {
    setLoading(true);
    axiosClient.get('/stock')
      .then(({ data }) => {
        setLoading(false);
        setStock(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Stock</h1>
        <Link className="btn-add" to="/stock/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {stock.map(item => (
                <tr key={item.product_id}>
                  <td>{item.product_id}</td>
                  <td>{item.quantity}</td>
                  <td>{item.amount}</td>
                  <td>{item.total_amount}</td>
                  <td>
                    <Link className="btn-edit" to={`/stock/${item.product_id}`}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={() => onDeleteClick(item)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
