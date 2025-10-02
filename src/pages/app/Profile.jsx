// Profile page: shows centered avatar + name on the left, and profile info on the right.
  // Assumes it's rendered inside AppLayout (which provides Sidebar and AppNav).
  import { Link } from "react-router-dom";
  import { useAuth } from "../../context/AuthContext.jsx";
  import * as api from "../../services/api.js";

  export default function Profile() {
    const { user } = useAuth();

    const initials =
      (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");
    const displayInitials = initials ? initials.toUpperCase() : "U";

    // Get the full avatar URL
    const avatarUrl = user?.avatarUrl ? api.getProfileImageUrl(user.avatarUrl) : null;

    return (
      <div className="h-full grid rounded-xl p-4 md:p-8 lg:text-2xl bg-white lg:flex">
        {/* Left: centered avatar + name */}
        <section className="flex-1">
          <div className="h-full p-8 flex flex-col items-center justify-center text-center">
            <div className="relative">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={`${user?.firstName || "User"} avatar`}
                  className="w-48 h-48 rounded-full object-cover ring-4 ring-brand-50"
                />
              ) : (
                <div className="w-48 h-48 rounded-full bg-accent-500 text-white grid place-items-center text-8xl ring-4 ring-brand-50">
                  {displayInitials}
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className="font-semibold text-xl">
                {(user?.firstName || "") + (user?.lastName ? ` ${user.lastName}` : "") || "User"}
              </div>
              <div className=" text-gray-500 mt-1">{user?.email || "-"}</div>
            </div>

            {/* <div className="mt-6">
              <Link
                to="/app/account"
                className="inline-flex items-center px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700"
              >
                Edit profile
              </Link>
            </div> */}
          </div>
        {/* Right: profile info */}
        </section>
        <section className="h-full flex-1">
          <div className="h-full lg:p-8 lg:rounded-bl-2xl rounded-t-2xl lg:rounded-tr-none bg-gradient-to-b from-accent-50 to-[rgb(253,162,113)] text-white">
            <div className=" px-6 py-4 font-semibold">Profile information</div>
            <div className="lg:p-6 p-2">
              <dl className="grid  gap-6">
                <div className="flex gap-4 items-center">
                  <dt className="font-medium ">First name:</dt>
                  <dd className=" text-gray-50">{user?.firstName || "-"}</dd>
                </div>
                <div className="flex gap-4 items-center">
                  <dt className="font-medium ">Last name:</dt>
                  <dd className="  text-gray-50">{user?.lastName || "-"}</dd>
                </div>
                <div className="flex gap-4 items-center">
                  <dt className="font-medium ">Email:</dt>
                  <dd className=" text-gray-50 ">{user?.email || "-"}</dd>
                </div>
                <div className="flex gap-4 items-center">
                  <dt className=" ">Gender:</dt>
                  <dd className=" text-gray-50">
                    <span className="inline-flex capitalize items-center px-2 py-0.5 ">
                      {user?.gender || "unspecified"}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    );
  }