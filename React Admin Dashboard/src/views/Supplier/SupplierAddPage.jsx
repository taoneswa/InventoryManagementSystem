import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function SupplierAddPage() {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    shop_name: "",
    address: "",
    type: "",
    city: "",
    bank_name: "",
    account_holder: "",
    bank_branch: "",
    account_number: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    axiosClient
      .post("/suppliers", supplier)
      .then(() => {
        setLoading(false);
        setNotification("Supplier was successfully added");
        navigate("/suppliers");
      })
      .catch((err) => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <>
      <h1>Add New Supplier</h1>
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
              value={supplier.name}
              onChange={(ev) =>
                setSupplier({ ...supplier, name: ev.target.value })
              }
              placeholder="Name"
            />
            <input
              value={supplier.email}
              onChange={(ev) =>
                setSupplier({ ...supplier, email: ev.target.value })
              }
              placeholder="Email"
            />
            <input
              value={supplier.phone}
              onChange={(ev) =>
                setSupplier({ ...supplier, phone: ev.target.value })
              }
              placeholder="Phone"
            />
            <input
              value={supplier.photo}
              onChange={(ev) =>
                setSupplier({ ...supplier, photo: ev.target.value })
              }
              placeholder="Photo"
            />
            <input
              value={supplier.shop_name}
              onChange={(ev) =>
                setSupplier({ ...supplier, shop_name: ev.target.value })
              }
              placeholder="Shop Name"
            />
            <input
              value={supplier.address}
              onChange={(ev) =>
                setSupplier({ ...supplier, address: ev.target.value })
              }
              placeholder="Address"
            />
            <input
              value={supplier.type}
              onChange={(ev) =>
                setSupplier({ ...supplier, type: ev.target.value })
              }
              placeholder="Type"
            />
            <input
              value={supplier.city}
              onChange={(ev) =>
                setSupplier({ ...supplier, city: ev.target.value })
              }
              placeholder="City"
            />
            <input
              value={supplier.bank_name}
              onChange={(ev) =>
                setSupplier({ ...supplier, bank_name: ev.target.value })
              }
              placeholder="Bank Name"
            />
            <input
              value={supplier.account_holder}
              onChange={(ev) =>
                setSupplier({ ...supplier, account_holder: ev.target.value })
              }
              placeholder="Account Holder"
            />
            <input
              value={supplier.bank_branch}
              onChange={(ev) =>
                setSupplier({ ...supplier, bank_branch: ev.target.value })
              }
              placeholder="Bank Branch"
            />
            <input
              value={supplier.account_number}
              onChange={(ev) =>
                setSupplier({ ...supplier, account_number: ev.target.value })
              }
              placeholder="Account Number"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
