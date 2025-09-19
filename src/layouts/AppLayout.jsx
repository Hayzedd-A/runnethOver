import { Outlet } from "react-router-dom";
  import Sidebar from "../shared/Sidebar.jsx";
  import AppNav from "../shared/AppNav.jsx";

  export default function AppLayout() {
    return (
      <div className="min-h-screen ">
        {/* Desktop sidebar */}
        <div className="hidden md:flex">
          <Sidebar variant="side" />
          <div className="flex-1 flex flex-col min-h-screen">
            <AppNav />
            <main className="flex-1 container-px py-6">
              <Outlet />
            </main>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col min-h-screen">
          <AppNav />
          <main className="flex-1 container-px py-4">
            <Outlet />
          </main>
          <Sidebar variant="bottom" />
        </div>
      </div>
    );
  }