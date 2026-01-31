import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { updateUserData } from "./auth-slicce";

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const authState = useSelector((state: any) => state.authSlice || state.auth);
  const user = authState?.user;
  const token = authState?.token;

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone_number: user.phone_number?.replace("+998", ""),
        username: user.username,
      });
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    if (!token) return message.error("Token topilmadi!");

    setLoading(true);

    const payload = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      phone_number: `+998${values.phone_number.trim()}`,
      username: values.username,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/user/account-details?access_token=${token}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        // 1. Yangi foydalanuvchi ob'ektini hosil qilish
        const updatedUser = { ...user, ...payload };

        // 2. Cookieni yangilash
        Cookies.set("user_data", JSON.stringify(updatedUser), { expires: 7 });

        // 3. Reduxni yangilash
        dispatch(updateUserData(payload));

        message.success("Ma'lumotlar muvaffaqiyatli saqlandi!");
      }
    } catch (error: any) {
      // 500 xatoligida backenddan kelgan aniq xabarni ko'rish
      const errorData = error.response?.data;
      console.error("Xatolik tafsiloti:", errorData);

      message.error(errorData?.message || "Saqlashda xatolik yuz berdi (500)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-[18px] font-bold text-[#3D3D3D] mb-8 border-b border-[#46A358]/20 pb-2">
        Personal Information
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
      >
        <Form.Item
          name="name"
          label="First name *"
          rules={[{ required: true }]}
        >
          <Input className="h-[40px]" />
        </Form.Item>

        <Form.Item
          name="surname"
          label="Last name *"
          rules={[{ required: true }]}
        >
          <Input className="h-[40px]" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email *"
          rules={[{ required: true, type: "email" }]}
        >
          <Input className="h-[40px]" />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone number *"
          rules={[
            {
              required: true,
              pattern: /^\d{9}$/,
              message: "9 ta raqam kiriting!",
            },
          ]}
        >
          <div className="flex border border-[#d9d9d9] rounded-[4px] focus-within:border-[#46A358]">
            <span className="p-2 bg-gray-50 border-r text-gray-500">+998</span>
            <Input className="border-none h-[38px] w-full focus:ring-0 outline-none" />
          </div>
        </Form.Item>

        <Form.Item
          name="username"
          label="Username *"
          rules={[{ required: true }]}
        >
          <Input className="h-[40px]" />
        </Form.Item>

        <div className="md:col-span-2 mt-6">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-[#46A358] hover:bg-[#3d8d4c] border-none h-[45px] px-12 font-bold"
          >
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfilePage;
