import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function EmployeeAddPage() {
  const navigate = useNavigate();
  const { setNotification } = useStateContext();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
    nid_no: "",
    experience: "",
    address: "",
    city: "",
    salary: "",
    vacation: ""
  });

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setLoading(true);
    axiosClient
      .post("/employees", employee)
      .then(() => {
        setNotification("Employee was successfully added");
        navigate("/employees");
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
      <h1>Add Employee</h1>
      <div className="card animated fadeInDown">
        <form onSubmit={onSubmit}>
          <input
            value={employee.name}
            onChange={(ev) =>
              setEmployee({ ...employee, name: ev.target.value })
            }
            placeholder="Name"
          />
          <input
            value={employee.email}
            onChange={(ev) =>
              setEmployee({ ...employee, email: ev.target.value })
            }
            placeholder="Email"
          />
          <input
            value={employee.phone}
            onChange={(ev) =>
              setEmployee({ ...employee, phone: ev.target.value })
            }
            placeholder="Phone"
          />
          <input
            value={employee.photo}
            onChange={(ev) =>
              setEmployee({ ...employee, photo: ev.target.value })
            }
            placeholder="Photo URL"
          />
          <input
            value={employee.nid_no}
            onChange={(ev) =>
              setEmployee({ ...employee, nid_no: ev.target.value })
            }
            placeholder="NID No"
          />
          <input
            value={employee.experience}
            onChange={(ev) =>
              setEmployee({ ...employee, experience: ev.target.value })
            }
            placeholder="Experience"
          />
          <input
            value={employee.address}
            onChange={(ev) =>
              setEmployee({ ...employee, address: ev.target.value })
            }
            placeholder="Address"
          />
          <input
            value={employee.city}
            onChange={(ev) =>
              setEmployee({ ...employee, city: ev.target.value })
            }
            placeholder="City"
          />
          <input
            value={employee.salary}
            onChange={(ev) =>
              setEmployee({ ...employee, salary: ev.target.value })
            }
            placeholder="Salary"
          />
          <input
            value={employee.vacation}
            onChange={(ev) =>
              setEmployee({ ...employee, vacation: ev.target.value })
            }
            placeholder="Vacation"
          />
          <button className="btn">Add Employee</button>
        </form>
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
