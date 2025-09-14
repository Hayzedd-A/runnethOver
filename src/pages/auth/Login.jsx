import { useState } from "react";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import { useAuth } from "../../context/AuthContext.jsx";
  import { required, minLength, validate, email as emailV } from "../../utils/validators.js";

  export default function Login() {
    const { login } = useAuth();
    const [fields, setFields] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/app/search";

    const rules = {
      email: [required, emailV],
      password: [required, minLength(6)],
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      const errs = validate(fields, rules);
      setErrors(errs);
      if (Object.keys(errs).length) return;
      try {
        setSubmitting(true);
        await login(fields.email, fields.password);
        navigate(from, { replace: true });
      } catch (err) {
        setErrors({ form: err.message || "Login failed" });
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen grid md:grid-cols-2">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold">Welcome back</h1>
          <p className="text-gray-600 mt-2">Log in to access your saved items and account.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4 max-w-md">
            {errors.form && <div className="text-sm text-red-600">{errors.form}</div>}
            <div>
              <label className="block text-sm font-medium" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-brand-500"
                value={fields.email}
                onChange={(e) => setFields({ ...fields, email: e.target.value })}
              />
              {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-brand-500"
                value={fields.password}
                onChange={(e) => setFields({ ...fields, password: e.target.value })}
              />
              {errors.password && <div className="text-xs text-red-600 mt-1">{errors.password}</div>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 rounded-md bg-brand-600 text-white py-2 hover:bg-brand-700 disabled:opacity-50"
            >
              {submitting ? "Logging in..." : "Log in"}
            </button>

            <p className="text-sm text-gray-600">
              No account? <Link to="/signup" className="text-brand-700 hover:underline">Join the waitlist</Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
      </div>
    );
  }