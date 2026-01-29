import { Modal } from "antd";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { setAuhorizationModalVisiblty } from "../../../../redux/modal-store";
import { useState } from "react";
import Login from "./login";
import Register from "./register";

const AuthorizationModal = () => {
  const dispatch = useReduxDispatch();
  const { authorizationModalVisiblity } = useReduxSelector(
    (state) => state.modalSlice,
  );
  const [state, setState] = useState<string>("login");
  return (
    <Modal
      open={authorizationModalVisiblity}
      footer={false}
      onCancel={() => dispatch(setAuhorizationModalVisiblty())}
    >
      <div className="mt-10">
        <div className="flex items-center justify-center gap-4">
          <div
            className={`text-xl cursor-pointer ${state === "login" && "text-[#46A358]"}`}
            onClick={() => setState("login")}
          >
            Login
          </div>
          <div className="bg-[#3D3D3D] w-[1px] h-5"></div>
          <div
            className={`text-xl cursor-pointer ${state === "register" && "text-[#46A358]"}`}
            onClick={() => setState("register")}
          >
            Register
          </div>
        </div>
        {state === "login" ? <Login /> : <Register />}
      </div>
    </Modal>
  );
};

export default AuthorizationModal;
