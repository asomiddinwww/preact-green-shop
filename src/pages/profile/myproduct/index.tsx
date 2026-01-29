import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useReduxSelector } from "../../../hooks/useRedux";
import Card from "../../../components/dashboard/products/card";

const MyProducts: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useReduxSelector((state) => state.shopSlice);

  return (
    <div className="w-full animate-fade-in">
      <div className="flex items-center justify-between border-b border-[#46A358]/20 pb-4 mb-8">
        <h2 className="text-[20px] font-bold text-[#3D3D3D]">My Products</h2>
        <span className="text-[#46A358] font-medium bg-[#46A358]/10 px-3 py-1 rounded-full text-sm">
          Total: {data?.length || 0} Items
        </span>
      </div>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-start">
          {data.map((item: any) => (
            <div
              key={item._id}
              className="w-full flex justify-center md:justify-start"
            >
              <Card {...item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-[#FBFBFB] rounded-3xl border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingCartOutlined className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-[#3D3D3D]">
            No products found
          </h3>
          <p className="text-gray-400 text-sm mb-6 text-center max-w-[250px]">
            You haven't added any products to your list yet.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#46A358] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#3d8d4c] transition-all"
          >
            Go Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
