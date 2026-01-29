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

  // Umumiy login qilish funksiyasi (kod takrorlanmasligi uchun)
  const handleAuthSuccess = (res: any) => {
    // Backenddan kelayotgan resni tekshirish:
    // Ba'zan res.data ichida bo'ladi, ba'zan res ichida
    const responseData = res?.data || res;
    const token = responseData?.token;
    const user = responseData?.user;

    if (token && user) {
      // 1. Redux-ga saqlash
      dispatch(setCredentials({ token, user }));

      // 2. LocalStorage-ga qo'lda saqlash (reload bo'lganda o'chib ketmasligi uchun)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      message.success("Muvaffaqiyatli kirdingiz!");

      // 3. Modalni yopish
      dispatch(setAuhorizationModalVisiblty());

      // 4. Sahifani yangilash (ozgina kechikish bilan)
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      console.error("Format xatosi! Kelgan ma'lumot:", res);
      message.error("Backenddan noto'g'ri ma'lumot keldi!");
    }
  };

  const onFinish = (values: any) => {
    mutate(values, {
      onSuccess: (res: any) => {
        handleAuthSuccess(res);
      },
      onError: (err: any) => {
        const errorMsg =
          err.response?.data?.message || "Email yoki parol xato!";
        message.error(errorMsg);
      },
    });
  };

  const handleGoogleSuccess = (response: any) => {
    const payload = {
      email: "google-auth", // Backend talabiga qarab o'zgartiring
      password: "google-auth-password",
      access_token: response.credential,
    };

    message.loading({
      content: "Google orqali kirilmoqda...",
      key: "google_loading",
    });

    mutate(payload as any, {
      onSuccess: (res: any) => {
        message.destroy("google_loading");
        handleAuthSuccess(res);
      },
      onError: (err: any) => {
        message.destroy("google_loading");
        console.log("Google Auth Error:", err.response?.data);
        message.error("Google orqali kirishda xatolik!");
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
            { required: true, message: "Emailni kiriting!" },
            { type: "email", message: "To'g'ri email formatini kiriting!" },
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
          theme="outline"
          shape="rectangular"
          width="320"
        />
      </div>
    </div>
  );
};

export default Login;
