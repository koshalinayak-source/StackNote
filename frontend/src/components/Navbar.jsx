import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme((prev) => (prev === "sunset" ? "garden" : "sunset"));
  };

  return (
    <header>
      
      <div className="navbar bg-base-100 px-4">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">StackNote</a>
        </div>

        <div className="flex items-center gap-3 ">
          {/* ✅ Clean "New Note" button */}
          <Link to="/create" className="btn btn-neutral gap-2 normal-case">
            <PlusIcon className="w-4 h-4" />
            New Note
          </Link>

          <input
            type="checkbox"
            className="toggle theme-controller bg-base-content"
            onChange={toggleTheme}
            checked={theme === "garden"}
          />

          {/* ✅ Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
