import { Link, useNavigate } from "react-router-dom";
import Prices from "./price";
import { useRef } from "react";
import { usegetCoupon } from "../../../hooks/useQuery/useQueryAction";
import { Form } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { useReduxSelector } from "../../../hooks/useRedux";

const CardTotal = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { data, coupon } = useReduxSelector((state) => state.shopSlice);
  const { mutate, isPending } = usegetCoupon();

  const getCoupon = () => {
    let couponValue: string = inputRef.current?.value || "";
    mutate({ coupon_code: couponValue });
  };

  const handleCheckout = () => {
    Cookies.set("checkout_data", JSON.stringify(data));
    Cookies.set("applied_coupon", String(coupon));

    navigate("/proced-checkout");
  };

  return (
    <div className="w-[450px]!">
      <h3 className="pb-5 text-[#3D3D3D] font-bold text-[18px]">Card Total</h3>
      <Form onFinish={getCoupon} className="flex h-[40px] mt-[35px]">
        <input
          ref={inputRef}
          name="coupon"
          placeholder="Enter coupon code here..."
          className="border w-4/5 border-[#46A358] pl-[15px] placeholder:font-light rounded-l-lg rounded-r-none outline-none"
        />
        <button
          type="submit"
          className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-1/5 rounded-l-none"
        >
          {isPending ? <LoadingOutlined /> : <span>Apply</span>}
        </button>
      </Form>

      <Prices />

      <button
        onClick={handleCheckout}
        className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-full h-[40px] mt-[30px] font-bold"
      >
        Proceed To Checkout
      </button>

      <Link to={"/"} className="flex justify-center">
        <button className="mt-[14px] text-[#46A358] cursor-pointer">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default CardTotal;
