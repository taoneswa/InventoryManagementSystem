import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function BrandViewPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getBrands();
  }, []);

  const onDeleteClick = (brand) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) {
      return;
    }
    axiosClient
      .delete(`api/brands/${brand.id}`)
      .then(() => {
        setNotification("Brand was successfully deleted");
        getBrands();
      })
      .catch((error) => {
        console.error("Error deleting brand:", error);
      });
  };

  const getBrands = () => {
    setLoading(true);
    axiosClient.get('api/brands')
      .then((data) => {
        console.log(data.data);
        console.log(data.data);
        console.log(data.data);

        setLoading(false);
        setBrands(data.data); // Corrected to setBrands
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching brands:", error);
      });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Brands</h1>
        <Link className="btn-add" to="/brands/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category ID</th>
              <th>Supplier ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {brands && brands.map((brand) => (
                <tr key={brand.id}>
                  <td>{brand.name}</td>
                  <td>{brand.cat_id}</td>
                  <td>{brand.sup_id}</td>
                  <td>
                    <Link className="btn-edit" to={"/brands/edit/" + brand.id}>
                      Edit
                    </Link>
                    &nbsp;
                    <button className="btn-delete" onClick={(ev) => onDeleteClick(brand)}>
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
