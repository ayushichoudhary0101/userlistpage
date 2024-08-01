import React, { useState, useEffect } from "react";
import './Userlist.css';
import { useDispatch, useSelector } from "react-redux";
import { userlistPage } from "../redux/Reducer/Auth/authReducer";

const Userlist = () => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { userList } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(userlistPage({ limit, skip: (page - 1) * limit }));
  }, [dispatch, limit, page]);

  useEffect(() => {
    if (userList.users) {
      setEmployees(userList.users);
      setTotalPages(Math.ceil(userList.total / limit));
    }
  }, [userList]);

  const handleFilterCountry = (e) => {
    setFilterCountry(e.target.value);
  };

  const handleFilterGender = (e) => {
    setFilterGender(e.target.value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      (filterCountry === "" || employee.address.country === filterCountry) &&
      (filterGender === "" || employee.gender === filterGender)
  );

  return (
    <div className="container">
      <div className="header">
        <h1>UserlistPage</h1>
        <div className="filter-container">
          <div className="filter-item">
            <label htmlFor="country">Country:</label>
            <select id="country" value={filterCountry} onChange={handleFilterCountry}>
              <option value="">All</option>
              {Array.from(new Set(employees.map((e) => e.address.country))).map(
                (country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="filter-item">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value={filterGender} onChange={handleFilterGender}>
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Full Name</th>
            <th>Demography</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.slice(0, limit).map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>
                <img
                  src={employee.image}
                  alt="Profile Picture"
                  className="profile-picture"
                />
              </td>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.gender}/{employee.age}</td>

              <td>
                {employee.address.city}, {employee.address.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Userlist;
