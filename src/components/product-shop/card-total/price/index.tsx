import { useEffect, useRef } from "react";
import { useReduxSelector } from "../../../../hooks/useRedux";
import toast, { Toaster } from "react-hot-toast";

const Prices = () => {
  const cupon_title_style = "text-[#3D3D3D] text-[15px] font-normal";

  const { data, coupon } = useReduxSelector((state) => state.shopSlice);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (coupon > 0) {
      toast.success("Kuponingiz qabul qilindi!", {
        id: "coupon-success",
        position: "top-center",
      });
    } else if (coupon === 0 || coupon === null) {
      toast.error("Kuponingiz mavjud emas!", {
        id: "coupon-error",
        position: "top-center",
      });
    }
  }, [coupon]);

  const totalPrice = data.reduce(
    (total, value) => (total += value.userPrice),
    0,
  );

  const totalWithCoupon: number =
    +(totalPrice - (totalPrice * coupon) / 100 + 16).toFixed(2) || 0;

  return (
    <div>
      <Toaster />

      <div className="mt-[20px]">
        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Subtotal</h3>
          <h2 className="text-[#3D3D3D] text-[18px] font-medium">
            ${totalPrice?.toFixed(2)}
          </h2>
        </div>

        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Coupon Discount</h3>
          <h2 className="text-[#3D3D3D] text-[15px] font-bold">
            {coupon ? `${coupon}%` : "0%"}
          </h2>
        </div>

        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Shipping</h3>
          <h2 className="text-[#3D3D3D] text-[18px] font-medium">$16.0</h2>
        </div>
      </div>

      <div>
        <div className="flex justify-between mt-[20px] border-t pt-4">
          <h2 className="text-[#3D3D3D] text-[16px] font-bold">Total:</h2>
          <div>
            <h1 className="text-[#46A358] text-[18px] font-bold">
              ${coupon ? totalWithCoupon : (totalPrice + 16).toFixed(2)}
            </h1>
            {Boolean(coupon) && (
              <h1 className="font-bold text-[14px] text-red-500">
                $-{((totalPrice * coupon) / 100).toFixed(2)}
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prices;
