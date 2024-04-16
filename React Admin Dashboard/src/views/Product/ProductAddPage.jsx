import { useState, useEffect } from "react";
import axiosClient from "../../axios-client.js";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function ProductAdd() {
  const navigate = useNavigate();
  const { setNotification } = useStateContext();

  const [product, setProduct] = useState({
    cat_id: "",
    sup_id: "",
    brand_id: "",
    product_id: "",
    product_name: "",
    product_code: "",
    product_garage: "",
    product_route: "",
    product_image: "",
    buy_date: "",
    expire_date: "",
    buying_price: "",
    price: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleImageChange = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProduct({ ...product, product_image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    axiosClient
      .post("/products", product)
      .then(() => {
        setLoading(false);
        setNotification("Product was successfully added");
        navigate("/products");
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
      <h1>Add Product</h1>
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
              value={product.cat_id}
              onChange={(ev) =>
                setProduct({ ...product, cat_id: ev.target.value })
              }
              placeholder="Category ID"
            />
            <input
              value={product.sup_id}
              onChange={(ev) =>
                setProduct({ ...product, sup_id: ev.target.value })
              }
              placeholder="Supplier ID"
            />
            <input
              value={product.brand_id}
              onChange={(ev) =>
                setProduct({ ...product, brand_id: ev.target.value })
              }
              placeholder="Brand ID"
            />
            <input
              value={product.product_id}
              onChange={(ev) =>
                setProduct({ ...product, product_id: ev.target.value })
              }
              placeholder="Product ID"
            />
            <input
              value={product.product_name}
              onChange={(ev) =>
                setProduct({ ...product, product_name: ev.target.value })
              }
              placeholder="Product Name"
            />
            <input
              value={product.product_code}
              onChange={(ev) =>
                setProduct({ ...product, product_code: ev.target.value })
              }
              placeholder="Product Code"
            />
            <input
              value={product.product_garage}
              onChange={(ev) =>
                setProduct({ ...product, product_garage: ev.target.value })
              }
              placeholder="Product Garage"
            />
            <input
              value={product.product_route}
              onChange={(ev) =>
                setProduct({ ...product, product_route: ev.target.value })
              }
              placeholder="Product Route"
            />
            <input
              type="file"
              onChange={(ev) => handleImageChange(ev)}
              accept="image/*"
            />

            <input
              type="date"
              value={product.buy_date}
              onChange={(ev) =>
                setProduct({ ...product, buy_date: ev.target.value })
              }
              placeholder="Buy Date"
            />
            <input
              type="date"
              value={product.expire_date}
              onChange={(ev) =>
                setProduct({ ...product, expire_date: ev.target.value })
              }
              placeholder="Expire Date"
            />
            <input
              type="number"
              value={product.buying_price}
              onChange={(ev) =>
                setProduct({ ...product, buying_price: ev.target.value })
              }
              placeholder="Buying Price"
            />
            <input
              type="number"
              value={product.price}
              onChange={(ev) =>
                setProduct({ ...product, price: ev.target.value })
              }
              placeholder="Price"
            />
            <button className="btn">Add Product</button>
          </form>
        )}
      </div>
    </>
  );
}
