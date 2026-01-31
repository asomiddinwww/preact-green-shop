import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  UserOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { useReduxDispatch } from "../../../hooks/useRedux";
import { logOut } from "../../../redux/auth-slice";

const { confirm } = Modal;

const ProfileLayout: React.FC = () => {
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    {
      key: "account",
      label: "Account Details",
      icon: <UserOutlined />,
      path: "/ProfilePage",
    },
    {
      key: "products",
      label: "My Products",
      icon: <ShoppingOutlined />,
      path: "/my-products",
    },
    {
      key: "address",
      label: "Address",
      icon: <EnvironmentOutlined />,
      path: "/address",
    },
    {
      key: "wishlist",
      label: "Wishlist",
      icon: <HeartOutlined />,
      path: "/like",
    },
    {
      key: "orders",
      label: "Track Order",
      icon: <HistoryOutlined />,
      path: "/orders",
    },
  ];

  // Logout funksiyasi modal bilan
  const showLogoutConfirm = () => {
    confirm({
      title: "Tizimdan chiqmoqchimisiz?",
      icon: <ExclamationCircleOutlined />,
      content:
        "Chiqish tugmasini bossangiz, akkauntingizdan chiqasiz va sahifa yangilanadi.",
      okText: "Ha, chiqish",
      okType: "danger",
      cancelText: "Bekor qilish",
      centered: true,
      onOk() {
        dispatch(logOut());

        localStorage.clear();

        navigate("/");

        window.location.reload();
      },
      onCancel() {
        console.log("Logout bekor qilindi");
      },
    });
  };

  return (
    <div className="w-[90%] max-w-[1200px] m-auto mt-10 pt-5 mb-20 flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-[280px] bg-[#FBFBFB] h-fit rounded-[3px] p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col">
          {sidebarItems.map((item) => (
            <div
              key={item.key}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-l-4 mb-1 ${
                location.pathname === item.path
                  ? "bg-white text-[#46A358] border-[#46A358] font-bold shadow-sm"
                  : "border-transparent text-[#3D3D3D] hover:text-[#46A358] hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[15px]">{item.label}</span>
            </div>
          ))}

          <div
            onClick={showLogoutConfirm}
            className="flex items-center gap-3 p-3 mt-4 cursor-pointer text-red-500 hover:bg-red-50 transition-all border-l-4 border-transparent active:scale-95"
          >
            <LogoutOutlined className="text-lg" />
            <span className="text-[15px] font-bold">Log out</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-[500px] bg-white rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
