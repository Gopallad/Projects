import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, listEmployee } from "../services/EmployeeService";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const loadEmployees = useCallback(async () => {
    try {
      const { data } = await listEmployee();
      if (!Array.isArray(data)) {
        throw new Error("The employee service returned an unexpected response.");
      }
      setEmployees(data);
    } catch {
      setError("Could not load employees. Check the connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  function refreshEmployees() {
    setLoading(true);
    setError("");
    loadEmployees();
  }

  useEffect(() => {
    let isMounted = true;

    listEmployee()
      .then(({ data }) => {
        if (!Array.isArray(data)) {
          throw new Error(
            "The employee service returned an unexpected response.",
          );
        }
        if (isMounted) setEmployees(data);
      })
      .catch(() => {
        if (isMounted) {
          setError(
            "Could not load employees. Check the connection and try again.",
          );
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return employees;

    return employees.filter((employee) =>
      [employee.id, employee.firstName, employee.lastName, employee.email]
        .some((value) => String(value ?? "").toLowerCase().includes(query)),
    );
  }, [employees, search]);

  async function removeEmployee(employee) {
    const fullName = `${employee.firstName} ${employee.lastName}`.trim();
    if (
      !window.confirm(
        `Delete ${fullName || `employee #${employee.id}`}? This action cannot be undone.`,
      )
    ) {
      return;
    }

    setActionError("");
    setDeletingId(employee.id);
    try {
      await deleteEmployee(employee.id);
      setEmployees((current) =>
        current.filter((item) => item.id !== employee.id),
      );
    } catch {
      setActionError(
        `Could not delete ${fullName || `employee #${employee.id}`}. Please try again.`,
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="employee-page" aria-labelledby="employee-list-title">
      <div className="employee-page-header">
        <div>
          <p className="employee-eyebrow">PEOPLE DIRECTORY</p>
          <h1 id="employee-list-title">Employees</h1>
          <p className="employee-page-description">
            Manage your team and keep employee details up to date.
          </p>
        </div>
        <button
          className="btn btn-primary employee-add-button"
          onClick={() => navigate("/add-employee")}
        >
          <span aria-hidden="true">+</span> Add employee
        </button>
      </div>

      {actionError && (
        <div className="alert alert-danger" role="alert">
          {actionError}
        </div>
      )}
      {error && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between gap-3" role="alert">
          <span>{error}</span>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={refreshEmployees}
            disabled={loading}
          >
            Try again
          </button>
        </div>
      )}

      <div className="employee-list-card">
        <div className="employee-list-toolbar">
          <div>
            <h2 className="employee-list-heading">Team members</h2>
            <p className="employee-count" aria-live="polite">
              {loading
                ? "Loading employees…"
                : `${employees.length} ${employees.length === 1 ? "employee" : "employees"}`}
            </p>
          </div>
          <div className="employee-list-controls">
            <label className="visually-hidden" htmlFor="employee-search">
              Search employees
            </label>
            <input
              id="employee-search"
              className="form-control employee-search"
              type="search"
              placeholder="Search employees"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              onClick={refreshEmployees}
              disabled={loading}
              aria-label="Refresh employee list"
            >
              Refresh
            </button>
          </div>
        </div>

        {!error && (
          <div className="table-responsive">
            <table className="table employee-table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First name</th>
                  <th scope="col">Last name</th>
                  <th scope="col">Email</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="employee-table-message">
                      <span role="status">Loading employees…</span>
                    </td>
                  </tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="employee-table-message">
                      {employees.length === 0
                        ? "No employees yet. Add an employee to get started."
                        : "No employees match your search."}
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="employee-id">#{employee.id}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td className="employee-email">{employee.email}</td>
                      <td>
                        <div className="employee-row-actions">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              navigate(`/edit-employee/${employee.id}`)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removeEmployee(employee)}
                            disabled={deletingId !== null}
                          >
                            {deletingId === employee.id
                              ? "Deleting…"
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListEmployeeComponent;
