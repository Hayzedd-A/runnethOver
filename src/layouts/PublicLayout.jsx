import { Outlet } from "react-router-dom";
  import Nav from "../shared/Nav.jsx";

  export default function PublicLayout() {
    return (
      <div className="main-container min-h-screen text-[#2C1810] flex justify-between flex-col">
        <Nav />
        <main className="">
          <Outlet />
        </main>
        <footer className="text-center">

          <button className="btn-join w-fit ">Join the Waitlist!</button>
        </footer>
      </div>
    );
  }