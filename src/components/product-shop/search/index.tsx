import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Rate } from "antd";
import {
  HeartOutlined,
  ShoppingCartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { loaderApi } from "../../../generic/loader";
import type { ProductType, QueryType } from "../../../@types/inedx";
import { useQueryHandler } from "../../../hooks/useQuery/indexx";

const ProductPage = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { cateGoryLoader } = loaderApi();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("S");

  const {
    data: product,
    isLoading,
    isError,
  }: QueryType<ProductType> = useQueryHandler({
    url: `flower/category/${category}/${id}`,
    pathname: `product-details-${id}`,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        {cateGoryLoader()}
      </div>
    );

  if (isError || !product)
    return (
      <div className="text-center py-24 flex flex-col items-center gap-4">
        <div className="text-9xl opacity-10 font-black">404</div>
        <p className="text-2xl font-bold text-gray-400">Mahsulot topilmadi</p>
        <button
          onClick={() => navigate("/")}
          className="text-[#46A358] font-bold underline"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    );

  const images = product.detailed_images?.length
    ? product.detailed_images
    : [product.main_image];

  const currentImage = selectedImage || product.main_image;

  return (
    <div className="w-[92%] max-w-[1400px] m-auto mt-8 mb-24 font-sans">
      <nav className="mb-10 text-[14px] flex items-center gap-2 text-gray-400">
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer hover:text-[#46A358] transition-colors"
        >
          Home
        </span>
        <span>/</span>
        <span
          onClick={() => navigate(-1)}
          className="cursor-pointer hover:text-[#46A358] transition-colors capitalize"
        >
          {category}
        </span>
        <span>/</span>
        <span className="text-[#3D3D3D] font-semibold truncate max-w-[200px]">
          {product.title}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex flex-1 gap-6 h-fit lg:h-[600px]">
          <div className="flex flex-col gap-4 w-[85px] h-full overflow-y-auto hidden md:flex no-scrollbar">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`
                  w-full aspect-square p-1 bg-white cursor-pointer 
                  border-2 transition-all duration-300 flex justify-center items-center rounded-xl shadow-sm
                  ${currentImage === img ? "border-[#46A358]" : "border-transparent hover:border-[#46A358]/30"}
                `}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>

          <div className="flex-1 h-[400px] md:h-full bg-[#FBFBFB] rounded-[30px] overflow-hidden border border-gray-100 relative group shadow-sm flex items-center justify-center p-8">
            <Image
              src={currentImage}
              alt={product.title}
              className="object-contain max-h-full max-w-full mix-blend-multiply"
              preview={{
                mask: (
                  <div className="backdrop-blur-sm text-white font-bold">
                    PREVIEW
                  </div>
                ),
              }}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-[#3D3D3D] leading-tight mb-4">
              {product.title}
            </h1>
            <div className="flex items-center justify-between bg-[#46A358]/5 p-4 rounded-2xl">
              <span className="text-[#46A358] text-3xl font-black tracking-tighter">
                ${product.price?.toFixed(2)}
              </span>
              <div className="flex flex-col items-end">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={product.rate}
                  className="text-[#FFAC0C] text-sm"
                />
                <span className="text-[12px] text-gray-400 font-medium">
                  {product.views} verified reviews
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-[#3D3D3D] text-[16px] mb-2">
                Short Description:
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed italic">
                "
                {product.short_description ||
                  "Discover the beauty and elegance of our premium selection."}
                "
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#3D3D3D] text-[16px] mb-3">
                Select Size:
              </h3>
              <div className="flex gap-4">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center border-2 font-black transition-all duration-300
                      ${
                        selectedSize === size
                          ? "border-[#46A358] bg-[#46A358] text-white shadow-lg shadow-[#46A358]/30"
                          : "border-gray-100 text-gray-400 hover:border-[#46A358]/50 hover:text-[#46A358] bg-white"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button className="flex-1 min-w-[180px] bg-[#3D3D3D] text-white h-[55px] rounded-2xl font-black hover:bg-black transition-all shadow-xl active:scale-95 uppercase tracking-wider text-sm">
                Buy Now
              </button>

              <button className="flex-1 min-w-[180px] border-2 border-[#46A358] text-[#46A358] h-[55px] rounded-2xl font-black hover:bg-[#46A358] hover:text-white transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-sm active:scale-95">
                <ShoppingCartOutlined className="text-xl" />
                Add to Cart
              </button>

              <button className="w-[55px] h-[55px] border-2 border-gray-100 rounded-2xl flex items-center justify-center text-[#3D3D3D] hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all active:scale-90">
                <HeartOutlined className="text-xl" />
              </button>
            </div>

            <div className="p-6 bg-gray-50 rounded-3xl space-y-3 text-[14px]">
              <div className="flex justify-between border-b border-gray-200/50 pb-2">
                <span className="text-[#A5A5A5]">SKU</span>
                <span className="font-bold text-[#3D3D3D] uppercase tracking-tighter">
                  {product._id.slice(-8)}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200/50 pb-2">
                <span className="text-[#A5A5A5]">Category</span>
                <span className="font-bold text-[#46A358] capitalize">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5A5A5]">Tags</span>
                <span className="font-bold text-[#3D3D3D]">
                  {product.tags?.length > 0
                    ? product.tags.join(", ")
                    : "Nature, Green, Decor"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold text-[14px] text-[#3D3D3D] flex items-center gap-2">
                <ShareAltOutlined /> Share:
              </span>
              <div className="flex gap-5 text-gray-400">
                <i className="fa-brands fa-facebook-f hover:text-[#1877F2] cursor-pointer transition-all hover:-translate-y-1"></i>
                <i className="fa-brands fa-twitter hover:text-[#1DA1F2] cursor-pointer transition-all hover:-translate-y-1"></i>
                <i className="fa-brands fa-linkedin-in hover:text-[#0A66C2] cursor-pointer transition-all hover:-translate-y-1"></i>
                <i className="fa-regular fa-envelope hover:text-[#EA4335] cursor-pointer transition-all hover:-translate-y-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-28">
        <div className="flex gap-10 border-b-2 border-gray-100 mb-10">
          <h3 className="text-[#46A358] font-black text-lg border-b-4 border-[#46A358] pb-4 -mb-[3px] relative z-10">
            Description
          </h3>
          <h3 className="text-gray-300 font-bold text-lg pb-4 hover:text-[#46A358] cursor-not-allowed transition-colors">
            Reviews (0)
          </h3>
        </div>

        <div
          className="text-[#727272] leading-[1.8] text-base max-w-4xl prose prose-green"
          dangerouslySetInnerHTML={{
            __html:
              product.description ||
              "The product details are currently being updated by our specialists.",
          }}
        />
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ProductPage;
