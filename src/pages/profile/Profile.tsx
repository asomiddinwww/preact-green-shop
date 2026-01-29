import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, Upload, message } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useReduxDispatch } from "../../hooks/useRedux";
import { logOut } from "../../redux/auth-slice";

const ProfilePage: React.FC = () => {
  const dispatch = useReduxDispatch();
  const [form] = Form.useForm();
  const { user } = useSelector((state: any) => state.authSlice);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName || user.name || "",
        lastName: user.lastName || user.surname || "",
        email: user.email || "",
        phone: user.phone_number || "",
        username: user.username || "",
      });
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log("Yuborilayotgan ma'lumotlar:", values);
      message.success("O'zgarishlar muvaffaqiyatli saqlandi!");
    } catch (error) {
      message.error("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  const sidebarItems = [
    {
      key: "account",
      label: "Account Details",
      icon: <UserOutlined />,
      active: true,
    },
    { key: "products", label: "My Products", icon: <ShoppingOutlined /> },
    { key: "address", label: "Address", icon: <EnvironmentOutlined /> },
    { key: "wishlist", label: "Wishlist", icon: <HeartOutlined /> },
    { key: "orders", label: "Track Order", icon: <HistoryOutlined /> },
  ];

  return (
    <div className="w-[90%] max-w-[1200px] m-auto mt-10 mb-20 flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-[280px] bg-[#FBFBFB] h-fit rounded-[3px] p-4">
        <div className="flex flex-col">
          {sidebarItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-l-4 ${
                item.active
                  ? "bg-white text-[#46A358] border-[#46A358] font-bold"
                  : "border-transparent text-[#3D3D3D] hover:text-[#46A358]"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-[15px]">{item.label}</span>
            </div>
          ))}

          <div
            onClick={() => dispatch(logOut())}
            className="flex items-center gap-3 p-3 mt-4 cursor-pointer text-red-500 hover:bg-red-50 transition-all border-l-4 border-transparent"
          >
            <LogoutOutlined className="text-lg" />
            <span className="text-[15px] font-bold">Log out</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - ACCOUNT DETAILS */}
      <div className="flex-1">
        <h2 className="text-[17px] font-bold text-[#3D3D3D] mb-8 border-b border-[#46A358]/20 pb-2">
          Personal Information
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
        >
          <Form.Item
            name="firstName"
            label={
              <span className="text-[#3D3D3D]">
                First name <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: "Ismingizni kiriting!" }]}
          >
            <Input className="p-2.5 rounded-[3px] border-[#EAEAEA]" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={
              <span className="text-[#3D3D3D]">
                Last name <span className="text-red-500">*</span>
              </span>
            }
            rules={[{ required: true, message: "Familiyangizni kiriting!" }]}
          >
            <Input className="p-2.5 rounded-[3px] border-[#EAEAEA]" />
          </Form.Item>

          <Form.Item
            name="email"
            label={
              <span className="text-[#3D3D3D]">
                Email <span className="text-red-500">*</span>
              </span>
            }
            rules={[
              {
                required: true,
                type: "email",
                message: "To'g'ri email kiriting!",
              },
            ]}
          >
            <Input className="p-2.5 rounded-[3px] border-[#EAEAEA]" />
          </Form.Item>

          <Form.Item
            name="phone"
            label={
              <span className="text-[#3D3D3D]">
                Phone number <span className="text-red-500">*</span>
              </span>
            }
          >
            <div className="flex border border-[#EAEAEA] rounded-[3px] overflow-hidden focus-within:border-[#46A358]">
              <span className="p-2.5 bg-transparent border-r border-[#EAEAEA] text-[#3D3D3D]">
                +998
              </span>
              <Input className="border-none hover:border-none focus:shadow-none p-2.5 w-full" />
            </div>
          </Form.Item>

          <Form.Item
            name="username"
            label={
              <span className="text-[#3D3D3D]">
                Username <span className="text-red-500">*</span>
              </span>
            }
          >
            <Input
              className="p-2.5 rounded-[3px] border-[#EAEAEA]"
              placeholder="Enter your username..."
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-[#3D3D3D]">
                Image <span className="text-red-500">*</span>
              </span>
            }
          >
            <Upload maxCount={1} listType="picture">
              <Button
                icon={<UploadOutlined />}
                className="w-full flex items-center justify-center p-5 border-[#EAEAEA]"
              >
                Upload
              </Button>
            </Upload>
          </Form.Item>

          <div className="md:col-span-2 mt-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-[#46A358] hover:bg-[#3d8d4c] !important border-none h-[45px] px-10 rounded-[3px] font-bold"
            >
              Save changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;
