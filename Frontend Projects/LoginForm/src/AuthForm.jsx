import { useState } from "react";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            SignUp
          </button>
        </div>
        {isLogin ? (
          <form className="form" onSubmit={(event) => event.preventDefault()}>
            <h2>Login Form</h2>
            <input type="email" name="email" placeholder="Email" autoComplete="email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            <a href="#forgot-password">Forgot Password?</a>
            <button type="submit">Login</button>
            <p>
              Not a Member?{" "}
              <a
                href="#signup"
                onClick={(event) => {
                  event.preventDefault();
                  setIsLogin(false);
                }}
              >
                SignUp now
              </a>
            </p>
          </form>
        ) : (
          <form className="form" onSubmit={(event) => event.preventDefault()}>
            <h2>Sign Up Form</h2>
            <input type="text" name="name" placeholder="Name" autoComplete="name" required />
            <input type="email" name="email" placeholder="Email" autoComplete="email" required />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              required
            />
            <button type="submit">Sign Up</button>
            <p>
              Already a Member?{" "}
              <a
                href="#login"
                onClick={(event) => {
                  event.preventDefault();
                  setIsLogin(true);
                }}
              >
                Login now
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
