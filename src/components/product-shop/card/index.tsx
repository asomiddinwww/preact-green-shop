import { DeleteFilled } from "@ant-design/icons";
import type { FC } from "react";
import { useReduxDispatch } from "../../../hooks/useRedux";
import { decrement, deleteData, increment } from "../../../redux/shop-slice";
import type { ShopCardType } from "../../../@types/inedx";

const Card: FC<ShopCardType> = (props) => {
  const { main_image, title, _id, price, counter, userPrice } = props;
  const dispatch = useReduxDispatch();

  return (
    <div className="my-5 bg-[#fbfbfb] p-3 flex flex-col sm:flex-row items-center justify-between rounded-lg gap-4 relative">
      <div className="flex items-center gap-4 w-full sm:w-[35%]">
        <img
          className="w-[60px] h-[60px] xs:w-[70px] xs:h-[70px] object-contain flex-shrink-0"
          src={main_image}
          alt={title}
        />
        <div className="min-w-0">
          <h3 className="text-[14px] xs:text-[16px] font-medium truncate">
            {title}
          </h3>
          <p className="text-[11px] xs:text-[12px] font-normal text-gray-400">
            <span className="text-[#A5A5A5]">SKU: </span> {_id.slice(0, 8)}...
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between w-full sm:w-[60%] gap-2 border-t sm:border-none pt-2 sm:pt-0">
        <div className="text-[#727272] text-[14px] xs:text-[16px] font-medium">
          <span className="sm:hidden text-gray-400 text-xs block">Price:</span>$
          {price}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(decrement(_id))}
            className="w-[24px] h-[24px] bg-[#46A358] rounded-full text-white flex items-center justify-center hover:bg-[#3d8d4c] active:scale-95 transition-all"
          >
            -
          </button>
          <span className="text-[15px] xs:text-[17px] min-w-[20px] text-center font-semibold">
            {counter}
          </span>
          <button
            onClick={() => dispatch(increment(_id))}
            className="w-[24px] h-[24px] bg-[#46A358] rounded-full text-white flex items-center justify-center hover:bg-[#3d8d4c] active:scale-95 transition-all"
          >
            +
          </button>
        </div>

        <div className="text-[#46A358] text-[14px] xs:text-[16px] font-bold">
          <span className="sm:hidden text-gray-400 text-xs block">Total:</span>$
          {userPrice?.toFixed(2)}
        </div>
      </div>
      <DeleteFilled
        onClick={() => dispatch(deleteData(_id))}
        className="text-[#727272] text-[18px] xs:text-[20px] cursor-pointer hover:text-red-500 transition-colors absolute top-2 right-2 sm:static"
      />
    </div>
  );
};

export default Card;
