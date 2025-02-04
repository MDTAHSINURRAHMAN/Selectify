import { useContext } from "react";
import { FaRegUser, FaUser, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const links = [
    {
      key: 1,
      label: "Home",
      to: "/",
      isPublic: true,
    },
    {
      key: 2,
      label: "Queries",
      to: "/queries",
      isPublic: true,
    },
    {
      key: 3,
      label: "Recommendations for me",
      to: "/recommendations",
      isPublic: false,
    },
    {
      key: 4,
      label: "My Queries",
      to: "/my-queries",
      isPublic: false,
    },
    {
      key: 5,
      label: "My Recommendations",
      to: "/my-recommendations",
      isPublic: false,
    },
  ];

  // Filter links based on user authentication
  const filteredLinks = links.filter((link) => link.isPublic || user);
  return (
    <div className="w-11/12 mx-auto navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown relative">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[9999] absolute left-0 top-full w-56 p-0 shadow"
          >
            {filteredLinks.map((link) => (
              <li key={link.key}>
                <NavLink
                  className={({ isActive }) =>
                    `tracking-widest text-md font-medium font-poppins ${
                      isActive
                        ? "text-hover-color"
                        : "text-black hover:text-hover-color"
                    }`
                  }
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <Link
          to="/"
          className="text-xl md:text-2xl lg:text-4xl font-extrabold text-navColor tracking-widest leading-tight"
        ></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-5">
          {filteredLinks.map((link) => (
            <li key={link.key}>
              <NavLink
                className={({ isActive }) =>
                  `tracking-widest text-md font-medium font-poppins ${
                    isActive
                      ? "text-hover-color"
                      : "text-black hover:text-hover-color"
                  }`
                }
                to={link.to}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {user && user?.email ? (
          <div className="flex gap-3 items-center">
            <div className="relative group w-8 md:w-10 h-8 md:h-10">
            </div>

            {/* Logout Button */}
            <div
              onClick={logOut}
              className="flex items-center gap-2 font-karla tracking-widest px-2 md:px-3 py-2 bg-banner-title hover:bg-hover-color text-white font-medium rounded-md cursor-pointer"
            >
              <FaSignOutAlt />
              Logout
            </div>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <Link
              to="/auth/login"
              className="flex items-center gap-2 font-karla px-3 py-2 bg-banner-title hover:bg-hover-color text-white font-medium rounded-md cursor-pointer"
            >
              <FaRegUser />
              <h2>Login</h2>
            </Link>
            <Link
              to="/auth/register"
              className="flex items-center gap-2 font-karla px-3 py-2 bg-banner-title hover:bg-hover-color text-white font-medium rounded-md cursor-pointer"
            >
              <FaUserPlus />
              <h2>Register</h2>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
