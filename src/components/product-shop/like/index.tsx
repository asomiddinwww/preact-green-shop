import React from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import { getData, removeFromWishlist } from "../../../redux/shop-slice";

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();

  const { wishlist } = useReduxSelector((state) => state.shopSlice);

  return (
    <div className="max-w-[100%] mx-auto p-5 font-sans">
      <h2 className="text-[#3D3D3D] text-2xl font-bold border-b border-[#EAEAEA] pb-4">
        My Wishlist
      </h2>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-8">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="border border-[#F5F5F5] rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
            >
              <div className="bg-[#FBFBFB] p-5 flex justify-center items-center h-[220px]">
                <img
                  src={product.main_image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
              </div>

              <div className="p-4">
                <h4 className="text-[#3D3D3D] text-lg font-medium truncate">
                  {product.title}
                </h4>
                <p className="text-[#46A358] font-bold text-xl mt-2">
                  $
                  {product.discount_price
                    ? product.discount_price
                    : product.price}
                  .00
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => dispatch(getData(product))}
                    className="flex-1 bg-[#46A358] text-white flex items-center justify-center gap-2 py-2 rounded-md font-semibold hover:bg-[#3d8b4a] transition-colors text-sm"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => dispatch(removeFromWishlist(product._id))}
                    className="bg-[#FFEBEB] text-[#FF4B4B] p-2 rounded-md hover:bg-[#ffdada] transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <div className="flex justify-center mb-4 text-[#A5A5A5]">
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <h3 className="text-[#A5A5A5] text-xl">
            Sizning sevimlilar ro'yxatingiz bo'sh.
          </h3>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-[#46A358] font-medium hover:underline text-lg"
          >
            Xarid qilishni davom ettiring
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
