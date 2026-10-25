import { Link, NavLink } from "react-router-dom";

const HeaderComponent = () => (
  <header className="app-header">
    <nav className="navbar navbar-expand navbar-light">
      <div className="container app-header-inner">
        <Link className="navbar-brand app-brand" to="/">
          <span className="app-brand-mark" aria-hidden="true">
            T
          </span>
          <span>
            <strong>Teamspace</strong>
            <small>Employee management</small>
          </span>
        </Link>
        <div className="app-nav-links">
          <NavLink
            to="/employees"
            end
            className={({ isActive }) =>
              `app-nav-link${isActive ? " active" : ""}`
            }
          >
            Employees
          </NavLink>
          <NavLink
            to="/add-employee"
            className={({ isActive }) =>
              `app-nav-link${isActive ? " active" : ""}`
            }
          >
            Add employee
          </NavLink>
        </div>
      </div>
    </nav>
  </header>
);

export default HeaderComponent;
