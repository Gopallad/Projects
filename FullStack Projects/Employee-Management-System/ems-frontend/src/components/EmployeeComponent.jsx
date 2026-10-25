import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadedEmployeeId, setLoadedEmployeeId] = useState(null);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const loading = isEditing && loadedEmployeeId !== id;

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    getEmployee(id)
      .then(({ data }) => {
        if (!isMounted) return;
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load employee. Please try again.");
        }
      })
      .finally(() => {
        if (isMounted) setLoadedEmployeeId(id);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  function handleFirstName(e) {
    setFirstName(e.target.value);
    setErrors((current) => ({ ...current, firstName: "" }));
  }

  function handleLastName(e) {
    setLastName(e.target.value);
    setErrors((current) => ({ ...current, lastName: "" }));
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    setErrors((current) => ({ ...current, email: "" }));
  }

  function validateForm() {
    const nextErrors = {
      firstName: firstName.trim() ? "" : "First name is required",
      lastName: lastName.trim() ? "" : "Last name is required",
      email: "",
    };

    if (!email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }

    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  }

  async function saveEmployee(e) {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const employee = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    };

    setSaving(true);
    try {
      if (isEditing) {
        await updateEmployee(id, employee);
      } else {
        await createEmployee(employee);
      }
      navigate("/employees");
    } catch {
      setError(
        `Unable to ${isEditing ? "update" : "save"} employee. Please try again.`,
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="employee-page employee-form-page">
      <button
        type="button"
        className="back-link"
        onClick={() => navigate("/employees")}
      >
        <span aria-hidden="true">←</span> Back to employees
      </button>
      <div className="employee-form-card">
        <div className="employee-form-heading">
          <span className="employee-form-icon" aria-hidden="true">
            {isEditing ? "✎" : "+"}
          </span>
          <div>
            <p className="employee-eyebrow">
              {isEditing ? "EMPLOYEE DETAILS" : "TEAM DIRECTORY"}
            </p>
            <h1>
            {isEditing ? "Update Employee" : "Add Employee"}
            </h1>
            <p className="employee-page-description">
              {isEditing
                ? "Update this person's contact information."
                : "Add someone new to your employee directory."}
            </p>
          </div>
        </div>

        <div className="employee-form-body">
          {loading ? (
            <p className="form-status" role="status">
              Loading employee details…
            </p>
          ) : (
            <form onSubmit={saveEmployee} noValidate>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="e.g. Alex"
                  name="firstName"
                  value={firstName}
                  className="form-control"
                  onChange={handleFirstName}
                  autoComplete="given-name"
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={
                    errors.firstName ? "firstName-error" : "firstName-help"
                  }
                />
                {errors.firstName ? (
                  <div id="firstName-error" className="field-error">
                    {errors.firstName}
                  </div>
                ) : (
                  <div id="firstName-help" className="field-help">
                    Use the employee's preferred first name.
                  </div>
                )}
              </div>

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="e.g. Morgan"
                  name="lastName"
                  value={lastName}
                  className="form-control"
                  onChange={handleLastName}
                  autoComplete="family-name"
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={
                    errors.lastName ? "lastName-error" : "lastName-help"
                  }
                />
                {errors.lastName ? (
                  <div id="lastName-error" className="field-error">
                    {errors.lastName}
                  </div>
                ) : (
                  <div id="lastName-help" className="field-help">
                    Add a family name or surname.
                  </div>
                )}
              </div>

              <div className="form-group mb-4">
                <label className="form-label" htmlFor="email">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  name="email"
                  value={email}
                  className="form-control"
                  onChange={handleEmail}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : "email-help"}
                />
                {errors.email ? (
                  <div id="email-error" className="field-error">
                    {errors.email}
                  </div>
                ) : (
                  <div id="email-help" className="field-help">
                    Use a valid email address for work contact.
                  </div>
                )}
              </div>

              <div className="employee-form-actions">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => navigate("/employees")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary employee-save-button"
                  disabled={saving}
                >
                  {saving
                    ? "Saving…"
                    : isEditing
                      ? "Save changes"
                      : "Add employee"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmployeeComponent;
