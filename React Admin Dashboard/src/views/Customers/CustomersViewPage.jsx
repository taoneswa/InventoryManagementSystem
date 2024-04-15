import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function CustomersViewPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getCustomers();
  }, []);

  const onDeleteClick = customer => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }
    axiosClient.delete(`/customers/${customer.id}`)
      .then(() => {
        setNotification('Customer was successfully deleted');
        getCustomers();
      })
      .catch(error => {
        console.error('Error deleting customer:', error);
        setNotification('Error deleting customer');
      });
  }

  const getCustomers = () => {
    setLoading(true);
    axiosClient.get('/customers')
      .then(({ data }) => {
        setLoading(false);
        setCustomers(data.data);
      })
      .catch(error => {
        console.error('Error fetching customers:', error);
        setLoading(false);
        setNotification('Error fetching customers');
      });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Customers</h1>
        <Link className="btn-add" to="/customers/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Photo</th>
              <th>Shop Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Bank Name</th>
              <th>Account Holder</th>
              <th>Bank Branch</th>
              <th>Account Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="12" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {customers && customers.map(customer => (

                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td><img src={customer.photo} alt="Customer" /></td>
                  <td>{customer.shop_name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>{customer.bank_name}</td>
                  <td>{customer.account_holder}</td>
                  <td>{customer.bank_branch}</td>
                  <td>{customer.account_number}</td>
                  <td>
                    <Link className="btn-edit" to={`/customers/${customer.id}`}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={() => onDeleteClick(customer)}>Delete</button>
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
