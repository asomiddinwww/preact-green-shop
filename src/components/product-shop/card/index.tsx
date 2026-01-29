import { DeleteFilled } from "@ant-design/icons";
import type { FC } from "react";
import { useReduxDispatch } from "../../../hooks/useRedux";
import { decrement, deleteData, increment } from "../../../redux/shop-slice";
import type { ShopCardType } from "../../../@types/inedx";

const Card: FC<ShopCardType> = (props) => {
  const { main_image, title, _id, price, counter, userPrice } = props;
  const dispatch = useReduxDispatch();
  return (
    <div className="my-5 bg-[#fbfbfb] p-2 flex items-center justify-between rounded-lg">
      <div className="flex items-center gap-4 w-[40%]">
        <img className="w-[70px] h-[70px]" src={main_image} alt="" />
        <div>
          <h3 className="text-[16px] font-medium">{title}</h3>
          <p className="text-[14px] font-normal pt-[10px] max-sm:text-[12px] ">
            <span className="text-[#A5A5A5]">SKU: </span> {_id}
          </p>
        </div>
      </div>
      <div className="text-[#727272] text-[16px] font-medium w-[20%]">
        ${price}
      </div>
      <div className="flex items-center gap-3 w-[20%]">
        <button
          onClick={() => dispatch(decrement(_id))}
          className="w-[25px] h-[25px] bg-[#46A358] rounded-full text-white"
        >
          -
        </button>
        <span className="text-[17px]">{counter}</span>
        <button
          onClick={() => dispatch(increment(_id))}
          className="w-[25px] h-[25px] bg-[#46A358] rounded-full text-white"
        >
          +
        </button>
      </div>
      <div className="text-[#727272] text-[16px] font-medium w-[20%]">
        {userPrice?.toFixed(2)} $
      </div>
      <DeleteFilled
        onClick={() => dispatch(deleteData(_id))}
        className="text-[#727272] text-[20px] cursor-pointer"
      />
    </div>
  );
};

export default Card;
