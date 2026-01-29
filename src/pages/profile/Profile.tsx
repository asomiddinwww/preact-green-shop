import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ProfilePage: React.FC = () => {
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

  const onFinish = async () => {
    setLoading(true);
    try {
      message.success("O'zgarishlar muvaffaqiyatli saqlandi!");
    } catch (error) {
      message.error("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
          label="First name *"
          rules={[{ required: true, message: "Ismingizni kiriting!" }]}
        >
          <Input className="p-2.5 rounded-[3px] border-[#EAEAEA]" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last name *"
          rules={[{ required: true, message: "Familiyangizni kiriting!" }]}
        >
          <Input className="p-2.5 rounded-[3px] border-[#EAEAEA]" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email *"
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

        <Form.Item name="phone" label="Phone number *">
          <div className="flex border border-[#EAEAEA] rounded-[3px] overflow-hidden">
            <span className="p-2.5 bg-gray-50 border-r border-[#EAEAEA]">
              +998
            </span>
            <Input className="border-none p-2.5 w-full focus:shadow-none" />
          </div>
        </Form.Item>

        <Form.Item name="username" label="Username *">
          <Input className="p-2.5 rounded-[3px] border-[#EAEAEA]" />
        </Form.Item>

        <Form.Item label="Image *">
          <Upload maxCount={1} listType="picture">
            <Button icon={<UploadOutlined />} className="w-full h-[45px]">
              Upload Image
            </Button>
          </Upload>
        </Form.Item>

        <div className="md:col-span-2 mt-4">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-[#46A358] hover:bg-[#3d8d4c] border-none h-[45px] px-10 rounded-[3px] font-bold"
          >
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfilePage;
