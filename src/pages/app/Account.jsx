import { useState } from "react";
  import { useAuth } from "../../context/AuthContext.jsx";
  import { required, validate } from "../../utils/validators.js";

  export default function Account() {
    const { user, updateAccount } = useAuth();
    const [fields, setFields] = useState({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      gender: user?.gender || "unspecified",
      email: user?.email || "",
      avatarFile: null,
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");

    const rules = {
      firstName: [required],
      lastName: [required],
      gender: [required],
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      const errs = validate(fields, rules);
      setErrors(errs);
      setMsg("");
      if (Object.keys(errs).length) return;
      try {
        setSaving(true);
        const avatarUrl = fields.avatarFile ? URL.createObjectURL(fields.avatarFile) : user.avatarUrl;
        await updateAccount({
          firstName: fields.firstName,
          lastName: fields.lastName,
          gender: fields.gender,
          avatarUrl,
        });
        setMsg("Profile updated");
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Account</h1>
        <form onSubmit={onSubmit} className="max-w-2xl space-y-4">
          {msg && <div className="text-sm text-green-700">{msg}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium" htmlFor="firstName">First name</label>
              <input
                id="firstName"
                className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-brand-500"
                value={fields.firstName}
                onChange={(e) => setFields({ ...fields, firstName: e.target.value })}
              />
              {errors.firstName && <div className="text-xs text-red-600 mt-1">{errors.firstName}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-brand-500"
                value={fields.lastName}
                onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
              />
              {errors.lastName && <div className="text-xs text-red-600 mt-1">{errors.lastName}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium" htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="mt-1 w-full rounded-md border-gray-300 px-3 py-2 focus:ring-2 focus:ring-brand-500"
                value={fields.gender}
                onChange={(e) => setFields({ ...fields, gender: e.target.value })}
              >
                <option value="unspecified">Unspecified</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
              {errors.gender && <div className="text-xs text-red-600 mt-1">{errors.gender}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="email">Email</label>
              <input
                id="email"
                className="mt-1 w-full rounded-md border-gray-200 px-3 py-2 bg-gray-50"
                value={fields.email}
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="avatar">Profile image</label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="mt-1"
              onChange={(e) => setFields({ ...fields, avatarFile: e.target.files?.[0] || null })}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    );
  }