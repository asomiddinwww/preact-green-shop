import React from "react";
import { Loader } from "lucide-react";
import { Form, Input, message } from "antd";
import { useLoginMutation } from "../../../../../hooks/useQuery/useQueryAction";
// Firebase importlari
import { signInWithPopup } from "firebase/auth";
import { setAuhorizationModalVisiblty } from "../../../../../redux/modal-store";
import { useReduxDispatch } from "../../../../../hooks/useRedux";
import { setCredentials } from "../../../../../redux/auth-slice";
import { auth, googleProvider } from "../../../../../router/fitebase";

const Login: React.FC = () => {
  const dispatch = useReduxDispatch();
  const { mutate, isPending } = useLoginMutation();

  const handleAuthSuccess = (res: any) => {
    const responseData = res?.data || res;
    const token = responseData?.token;
    const user = responseData?.user;

    if (token && user) {
      dispatch(setCredentials({ token, user }));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      message.success("Muvaffaqiyatli kirdingiz!");
      dispatch(setAuhorizationModalVisiblty());

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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const idToken = await user.getIdToken();

      const payload = {
        email: user.email,
        password: "google-auth-password",
        access_token: idToken,
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
    } catch (error) {
      console.error("Firebase Google Auth Error:", error);
      message.error("Google tizimiga ulanishda xatolik!");
    }
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
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
        >
          <img
            src="data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_9_990)'%3e%3cpath%20d='M16.4336%2017.6055C14.6992%2019.0703%2012.4493%2020%2010%2020C6.35547%2020%203.15621%2017.9922%201.42188%2015.0625L2.07117%2012.0695L4.94922%2011.5352C5.61719%2013.6914%207.63278%2015.2734%2010%2015.2734C11.1484%2015.2734%2012.2148%2014.9102%2013.0938%2014.2656L15.8594%2014.6875L16.4336%2017.6055Z'%20fill='%2359C36A'%20/%3e%3cpath%20d='M16.4336%2017.6055L15.8594%2014.6875L13.0937%2014.2656C12.2148%2014.9102%2011.1484%2015.2734%2010%2015.2734V20C12.4493%2020%2014.6992%2019.0703%2016.4336%2017.6055Z'%20fill='%2300A66C'%20/%3e%3cpath%20d='M4.72656%2010C4.72656%2010.539%204.8086%2011.0546%204.94922%2011.5352L1.42188%2015.0625C0.542969%2013.5859%200%2011.8515%200%2010C0%208.1484%200.542969%206.41406%201.42188%204.9375L4.25285%205.42473L4.94922%208.46484C4.8086%208.94527%204.72656%209.4609%204.72656%2010Z'%20fill='%23FFDA2D'%20/%3e%3cpath%20d='M20%2010C20%2013.0468%2018.5899%2015.7773%2016.4336%2017.6055L13.0938%2014.2656C13.7734%2013.7734%2014.3477%2013.1171%2014.7227%2012.3437H10C9.67184%2012.3437%209.41406%2012.0859%209.41406%2011.7578V8.24219C9.41406%207.91402%209.67184%207.65625%2010%207.65625H19.25C19.5312%207.65625%2019.7773%207.85543%2019.8242%208.13668C19.9414%208.74609%2020%209.37887%2020%2010Z'%20fill='%234086F4'%20/%3e%3cpath%20d='M14.7227%2012.3437C14.3477%2013.1171%2013.7734%2013.7734%2013.0938%2014.2656L16.4336%2017.6055C18.5899%2015.7773%2020%2013.0469%2020%2010C20%209.37887%2019.9414%208.74609%2019.8242%208.13668C19.7773%207.85543%2019.5312%207.65625%2019.25%207.65625H10V12.3437H14.7227Z'%20fill='%234175DF'%20/%3e%3cpath%20d='M16.5977%202.79293C16.6094%202.95699%2016.5391%203.10937%2016.4336%203.22652L13.9258%205.72262C13.7266%205.93355%2013.3985%205.95699%2013.1641%205.78121C12.2382%205.08984%2011.1484%204.72656%2010%204.72656C7.63278%204.72656%205.61719%206.30855%204.94922%208.46484L1.42188%204.9375C3.15621%202.00781%206.35547%200%2010%200C12.332%200%2014.6055%200.859375%2016.3867%202.35934C16.5156%202.46484%2016.5859%202.62887%2016.5977%202.79293Z'%20fill='%23FF641A'%20/%3e%3cpath%20d='M13.1641%205.78121C13.3984%205.95703%2013.7265%205.93355%2013.9257%205.72262L16.4336%203.22652C16.5391%203.10938%2016.6094%202.95703%2016.5976%202.79293C16.5859%202.62883%2016.5156%202.46484%2016.3867%202.35934C14.6055%200.859375%2012.332%200%2010%200V4.72656C11.1484%204.72656%2012.2382%205.08984%2013.1641%205.78121Z'%20fill='%23F03800'%20/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_9_990'%3e%3crect%20width='20'%20height='20'%20fill='white'%20/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
            className="w-5 h-5"
            alt="G"
          />
          Google orqali kirish
        </button>
      </div>
    </div>
  );
};

export default Login;
