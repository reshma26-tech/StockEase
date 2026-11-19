function Login({ onLogin, onRegister }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>StockEase</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <span onClick={onRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;