// Profile page: shows centered avatar + name on the left, and profile info on the right.
  // Assumes it's rendered inside AppLayout (which provides Sidebar and AppNav).
  import { Link } from "react-router-dom";
  import { useAuth } from "../../context/AuthContext.jsx";

  export default function Profile() {
    const { user } = useAuth();

    const initials =
      (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");
    const displayInitials = initials ? initials.toUpperCase() : "U";

    return (
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: centered avatar + name */}
        <section className="lg:col-span-1">
          <div className="h-full rounded-xl border bg-white p-8 flex flex-col items-center justify-center text-center">
            <div className="relative">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={`${user?.firstName || "User"} avatar`}
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-brand-50"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-brand-600 text-white grid place-items-center text-3xl ring-4 ring-brand-50">
                  {displayInitials}
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className="font-semibold text-xl">
                {(user?.firstName || "") + (user?.lastName ? ` ${user.lastName}` : "") || "User"}
              </div>
              <div className="text-sm text-gray-500 mt-1">{user?.email || "-"}</div>
            </div>

            <div className="mt-6">
              <Link
                to="/app/account"
                className="inline-flex items-center px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700"
              >
                Edit profile
              </Link>
            </div>
          </div>
        </section>

        {/* Right: profile info */}
        <section className="lg:col-span-2">
          <div className="rounded-xl border bg-white overflow-hidden">
            <div className="border-b px-6 py-4 font-semibold">Profile information</div>
            <div className="p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm text-gray-500">First name</dt>
                  <dd className="mt-1 font-medium">{user?.firstName || "-"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Last name</dt>
                  <dd className="mt-1 font-medium">{user?.lastName || "-"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="mt-1 font-medium">{user?.email || "-"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Gender</dt>
                  <dd className="mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-sm">
                      {user?.gender || "unspecified"}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">User ID</dt>
                  <dd className="mt-1 font-mono text-sm text-gray-700 break-all">
                    {user?.id || "-"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    );
  }