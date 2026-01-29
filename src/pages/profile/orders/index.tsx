import React from "react";
import { useReduxSelector } from "../../../hooks/useRedux";
import { ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useReduxSelector((state) => state.shopSlice);

  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-[20px] font-bold text-[#3D3D3D] mb-6">
        Track your Orders
      </h2>

      {data && data.length > 0 ? (
        <div className="w-full overflow-hidden">
          {/* Jadval Sarlavhasi */}
          <div className="grid grid-cols-5 pb-4 border-b border-[#46A358]/20 px-4 text-[#3D3D3D] font-bold text-[15px]">
            <div className="col-span-2">Product Name</div>
            <div className="text-center">Purchase Date</div>
            <div className="text-center">Total Price</div>
            <div className="text-right">Action</div>
          </div>

          {/* Jadval Tanasi - Har bir card uchun alohida qator */}
          <div className="flex flex-col gap-3 mt-4">
            {data.map((item: any, index: number) => (
              <div
                key={item._id + index}
                className="grid grid-cols-5 items-center px-4 py-4 bg-[#FBFBFB] hover:bg-white hover:shadow-sm transition-all rounded-[4px] border border-transparent hover:border-[#46A358]/10"
              >
                {/* 1 & 2: Mahsulot (Shop Card) ma'lumotlari */}
                <div className="col-span-2 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-md overflow-hidden border border-gray-100 flex-shrink-0">
                    <img
                      src={item.main_image}
                      alt={item.common_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-bold text-[#3D3D3D] text-[14px]">
                      {item.common_name}
                    </span>
                    <span className="text-[11px] text-gray-400 uppercase">
                      SKU: {item._id.slice(-6)}
                    </span>
                  </div>
                </div>

                <div className="text-center font-medium text-[#727272] text-[14px]">
                  {new Date().toISOString().split("T")[0]}
                </div>

                {/* 4: Mahsulotning umumiy narxi (Shop narxi) */}
                <div className="text-center font-bold text-[#46A358] text-[15px]">
                  $ {(item.userPrice || item.price).toFixed(2)}
                </div>

                {/* 5: More info (Sahifasiga o'tish) */}
                <div className="text-right">
                  <button
                    className="text-[#46A358] font-bold hover:underline text-[14px]"
                    onClick={() =>
                      navigate(`/shop/${item.category}/${item._id}`)
                    }
                  >
                    More info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Mahsulot bo'lmaganda */
        <div className="flex flex-col items-center justify-center py-24 bg-[#FBFBFB] rounded-xl border border-dashed border-gray-200">
          <ShoppingOutlined className="text-5xl text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-[#3D3D3D]">No Shop History</h3>
          <p className="text-gray-400 mb-6">
            You haven't purchased any cards yet.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#46A358] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#3d8d4c] transition-all"
          >
            Go to Shop
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
