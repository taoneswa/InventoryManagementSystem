import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function CategoryViewPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getCategories();
  }, []);

  const onDeleteClick = category => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    axiosClient.delete(`/categories/${category.id}`)
      .then(() => {
        setNotification('Category was successfully deleted');
        getCategories();
      });
  };

  const getCategories = () => {
    setLoading(true);
    axiosClient.get('/categories')
      .then(({ data }) => {
        setLoading(false);
        setCategories(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Categories</h1>
        <Link className="btn-add" to="/categories/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="3" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {categories && categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.category_name}</td>
                  <td>
                    <Link className="btn-edit" to={`/categories/${category.id}`}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={() => onDeleteClick(category)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  );
}
