function Register({ onRegister, onLogin }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Registration successful!");

    onRegister();
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>StockEase</h1>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <label>Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?{" "}

          <span onClick={onLogin}>
            Login
          </span>

        </p>

      </div>

    </div>
  );
}

export default Register;