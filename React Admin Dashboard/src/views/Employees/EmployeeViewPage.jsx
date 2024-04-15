import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function EmployeeViewPage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    getEmployee();
  }, [id]);

  const getEmployee = () => {
    setLoading(true);
    axiosClient.get(`/employees/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setEmployee(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onDeleteClick = () => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    axiosClient.delete(`/employees/${id}`)
      .then(() => {
        setNotification('Employee was successfully deleted');
        // Redirect to employee list page or do any necessary action after deletion
      })
      .catch(() => {
        setNotification('Failed to delete employee');
      });
  };

  return (
    <div>
      <h1>Employee Details</h1>
      {loading && <p>Loading...</p>}
      {!loading && employee && (
        <div>
          <p>Name: {employee.name}</p>
          <p>Email: {employee.email}</p>
          <p>Phone: {employee.phone}</p>
          <p>National ID: {employee.nid_no}</p>
          <p>Experience: {employee.experience}</p>
          <p>Address: {employee.address}</p>
          <p>City: {employee.city}</p>
          <p>Salary: {employee.salary}</p>
          <p>Vacation: {employee.vacation}</p>
          {/* Assuming photo is a URL */}
          {employee.photo && (
            <div>
              <p>Photo:</p>
              <img src={employee.photo} alt="Employee Photo" />
            </div>
          )}
          <div>
            <Link className="btn-edit" to={`/employees/${id}/edit`}>Edit</Link>
            <button className="btn-delete" onClick={onDeleteClick}>Delete</button>
          </div>
        </div>
      )}
      {!loading && !employee && <p>Employee not found.</p>}
    </div>
  );
}
