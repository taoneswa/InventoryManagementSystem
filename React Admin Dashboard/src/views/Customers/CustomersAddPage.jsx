import { useState } from "react";
import axiosClient from "../../axios-client.js";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function CustomersAddPage() {
  const navigate = useNavigate();
  const { setNotification } = useStateContext();

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    shop_name: '',
    address: '',
    city: '',
    bank_name: '',
    account_holder: '',
    bank_branch: '',
    account_number: '',
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    axiosClient.post('/customers', customer)
      .then(() => {
        setLoading(false);
        setNotification('Customer was successfully added');
        navigate('/customers');
      })
      .catch(err => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div>
      <h1>Add Customer</h1>
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={customer.name}
              onChange={ev => setCustomer({ ...customer, name: ev.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              value={customer.email}
              onChange={ev => setCustomer({ ...customer, email: ev.target.value })}
              placeholder="Email"
            />
            <input
              type="text"
              value={customer.phone}
              onChange={ev => setCustomer({ ...customer, phone: ev.target.value })}
              placeholder="Phone"
            />
            <input
              type="text"
              value={customer.photo}
              onChange={ev => setCustomer({ ...customer, photo: ev.target.value })}
              placeholder="Photo"
            />
            <input
              type="text"
              value={customer.shop_name}
              onChange={ev => setCustomer({ ...customer, shop_name: ev.target.value })}
              placeholder="Shop Name"
            />
            <input
              type="text"
              value={customer.address}
              onChange={ev => setCustomer({ ...customer, address: ev.target.value })}
              placeholder="Address"
            />
            <input
              type="text"
              value={customer.city}
              onChange={ev => setCustomer({ ...customer, city: ev.target.value })}
              placeholder="City"
            />
            <input
              type="text"
              value={customer.bank_name}
              onChange={ev => setCustomer({ ...customer, bank_name: ev.target.value })}
              placeholder="Bank Name"
            />
            <input
              type="text"
              value={customer.account_holder}
              onChange={ev => setCustomer({ ...customer, account_holder: ev.target.value })}
              placeholder="Account Holder"
            />
            <input
              type="text"
              value={customer.bank_branch}
              onChange={ev => setCustomer({ ...customer, bank_branch: ev.target.value })}
              placeholder="Bank Branch"
            />
            <input
              type="text"
              value={customer.account_number}
              onChange={ev => setCustomer({ ...customer, account_number: ev.target.value })}
              placeholder="Account Number"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
