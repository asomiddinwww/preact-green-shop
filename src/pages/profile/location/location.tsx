import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

interface AuthState {
  user: any;
  token: string | null;
}

const LocationPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { user, token } = useSelector(
    (state: { authSlice: AuthState }) => state.authSlice,
  );
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // 1. Cookie-dan ma'lumotni yuklash (100% kafolat)
    const savedAddress = Cookies.get("user_billing_address");
    if (savedAddress) {
      form.setFieldsValue(JSON.parse(savedAddress));
    } else if (user?.billing_address) {
      form.setFieldsValue(user.billing_address);
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    if (!token) return message.error("Token topilmadi!");

    setLoading(true);

    // DIQQAT: _id qismiga user._id o'zini bering (tokenni emas!)
    const payload = {
      _id: user?._id || user?.id, // Bu yerda faqat ID bo'lishi kerak
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
      phone_number: user?.phone_number,
      billing_address: {
        country: values.country,
        town: values.town,
        street_address: values.street_address,
        state: values.state,
        zip: values.zip,
        extra_address: values.extra_address || "",
      },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/user/address?access_token=${token}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        // 2. MA'LUMOTNI 100% COOKIE-GA YOZISH
        Cookies.set("user_billing_address", JSON.stringify(values), {
          expires: 7,
        });
        message.success("Manzil saqlandi va Cookie yangilandi!");
      }
    } catch (error: any) {
      console.error("500 Xato tafsiloti:", error.response?.data);
      message.error("Server ma'lumotni qabul qilmadi (ID xatosi)!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8"
      >
        <Form.Item
          name="country"
          label="Country / Region *"
          rules={[{ required: true }]}
        >
          <Input className="h-[40px]" />
        </Form.Item>
        <Form.Item name="town" label="Town city *" rules={[{ required: true }]}>
          <Input className="h-[40px]" />
        </Form.Item>
        <Form.Item
          name="street_address"
          label="Street address *"
          rules={[{ required: true }]}
        >
          <Input className="h-[40px]" />
        </Form.Item>
        <Form.Item name="extra_address" label="Extra address">
          <Input className="h-[40px]" />
        </Form.Item>
        <Form.Item name="state" label="State *" rules={[{ required: true }]}>
          <Input className="h-[40px]" />
        </Form.Item>
        <Form.Item name="zip" label="Zip *" rules={[{ required: true }]}>
          <Input className="h-[40px]" />
        </Form.Item>

        <div className="md:col-span-2 mt-4">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-[#46A358] h-[40px] px-10 border-none font-bold"
          >
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LocationPage;
