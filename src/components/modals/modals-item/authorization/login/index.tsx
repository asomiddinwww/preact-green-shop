import React from "react";
import { Loader } from "lucide-react";
import { Form, Input, message } from "antd";
import { useLoginMutation } from "../../../../../hooks/useQuery/useQueryAction";
import { GoogleLogin } from "@react-oauth/google";
import { setAuhorizationModalVisiblty } from "../../../../../redux/modal-store";
import { useReduxDispatch } from "../../../../../hooks/useRedux";
import { setCredentials } from "../../../../../redux/auth-slice";

const Login: React.FC = () => {
  const dispatch = useReduxDispatch();

  const { mutate, isPending } = useLoginMutation();

  const onFinish = (values: any) => {
    mutate(values, {
      onSuccess: (res: any) => {
        const { token, user } = res.data;

        dispatch(setCredentials({ token, user }));

        message.success("Muvaffaqiyatli kirdingiz!");
        window.location.reload();
        dispatch(setAuhorizationModalVisiblty());
      },
      onError: () => message.error("Xato!"),
    });
  };

  const handleGoogleSuccess = (response: any) => {
    const payload = {
      email: "google-auth",
      password: "google-auth-password",
      access_token: response.credential,
    };

    message.loading("Tizimga kirilmoqda...");

    mutate(payload as any, {
      onSuccess: () => {
        message.success("Muvaffaqiyatli kirdingiz!");
      },
      onError: (err: any) => {
        console.log("Xato tafsiloti:", err.response?.data);
        message.error("Backend ma'lumotni qabul qilmadi.");
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#3D3D3D]">Xush kelibsiz</h2>
        <p className="text-gray-500 mt-2">
          Iltimos, ma'lumotlaringizni kiriting
        </p>
      </div>

      <Form onFinish={onFinish} layout="vertical" className="space-y-4">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
              message: "To'g'ri email kiriting!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="email@example.com"
            className="rounded-lg py-2.5"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Parol"
          rules={[{ required: true, message: "Parolni kiriting!" }]}
        >
          <Input.Password
            size="large"
            placeholder="••••••••"
            className="rounded-lg py-2.5"
          />
        </Form.Item>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#46A358] text-white py-3 rounded-lg font-semibold hover:bg-[#3d8d4c] transition flex justify-center items-center disabled:opacity-50"
        >
          {isPending ? <Loader className="animate-spin w-5 h-5" /> : "Kirish"}
        </button>
      </Form>

      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-sm text-gray-400">yoki</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => message.error("Google orqali kirishda xatolik!")}
          useOneTap
          theme="outline"
          shape="rectangular"
          width="100%"
        />
      </div>
    </div>
  );
};

export default Login;
