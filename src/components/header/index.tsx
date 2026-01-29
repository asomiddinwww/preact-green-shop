import { useState } from "react";
import logo from "../../img/Logo.svg";
import search from "../../img/search.svg";
import shop from "../../img/shop.svg";
import log from "../../img/Logout.svg";
import { Badge, Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { setAuhorizationModalVisiblty } from "../../redux/modal-store";
import { logOut } from "../../redux/auth-slice";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const Header = () => {
  const dispatch = useReduxDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { data } = useReduxSelector((state) => state.shopSlice);
  const { user, token } = useReduxSelector((state) => state.authSlice);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/home");
  };

  return (
    <div className="w-full border-b-1 border-[#46A35880] fixed bg-white z-50">
      <div className="w-[95%] md:w-[90%] m-auto flex p-3 md:p-4 items-center justify-between">
        <div className="flex-shrink-0">
          <img src={logo} alt="logo" className="w-[120px] md:w-auto" />
        </div>

        <div className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-10">
            <NavLink
              to={"/home"}
              className={({ isActive }) =>
                isActive
                  ? "border-b-3 pb-3 border-[#46A358]"
                  : "pb-3 border-b-3 border-[#ffffff00]"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "border-b-[3px] pb-3 border-[#46A358]"
                  : "pb-3 border-b-[3px] border-transparent"
              }
            >
              Shop
            </NavLink>
            <NavLink
              to={"/Blogs"}
              className={({ isActive }) =>
                isActive
                  ? "border-b-3 pb-3 border-[#46A358]"
                  : "pb-3 border-b-3 border-[#ffffff00]"
              }
            >
              Blog
            </NavLink>
          </ul>
        </div>

        <div className="flex items-center gap-3 md:gap-7">
          <img src={search} alt="search" className="w-5 cursor-pointer" />

          <div className="cursor-pointer" onClick={() => navigate("shop")}>
            <Badge count={data.length}>
              <img src={shop} alt="shop" />
            </Badge>
          </div>

          {token ? (
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/profile")}
                className="font-semibold text-[white]! p-2.5! pl-4! !pr-4 rounded-[5px] bg-[#46A358]! hover:underline"
              >
                {user?.name || user?.email || "Profile"}
              </Button>

              <img
                src={log}
                alt="logout"
                className="w-5 cursor-pointer"
                onClick={handleLogout}
                title="Logout"
              />
            </div>
          ) : (
            <Button
              onClick={() => dispatch(setAuhorizationModalVisiblty())}
              type="primary"
              className=" xs:!flex !items-center !gap-2 !bg-[#46A358] !h-9 !font-700"
            >
              <img src={log} alt="log" /> Login
            </Button>
          )}

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-2xl text-[#46A358]">
              {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed z-999 w-full h-[100vh] bg-white border-b border-[#46A35880] transition-all duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 py-6">
          <NavLink
            onClick={toggleMenu}
            to={"/home"}
            className="text-lg font-medium"
          >
            Home
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to={"/shop"}
            className="text-lg font-medium"
          >
            Shop
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to={"/Plant"}
            className="text-lg font-medium"
          >
            Plant Care
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to={"/Blogs"}
            className="text-lg font-medium"
          >
            Blog
          </NavLink>

          {/* MOBILE AUTH */}
          {token ? (
            <button
              onClick={() => {
                navigate("/profile");
                toggleMenu();
              }}
              className="text-lg font-semibold text-[#46A358]"
            >
              {user?.name || user?.email || "Profile"}
            </button>
          ) : (
            <Button
              onClick={() => {
                dispatch(setAuhorizationModalVisiblty());
                toggleMenu();
              }}
              type="primary"
              className="xs:!hidden !flex !items-center !gap-2 !bg-[#46A358] !h-9"
            >
              <img src={log} alt="log" /> Login
            </Button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
