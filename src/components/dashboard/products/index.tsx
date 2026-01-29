import { useSearchParams } from "react-router-dom";
import { useQueryHandler } from "../../../hooks/useQuery";
import Card from "./card";

export const useSearchParamsHandler = () => {
  const [params, setParams] = useSearchParams();

  const getParam = (path: string) => params.get(path);

  const setParam = (newParams: Record<string, any>) => {
    const currentParams = Object.fromEntries(params.entries());
    const updatedParams = { ...currentParams, ...newParams };

    Object.keys(updatedParams).forEach((key) => {
      if (!updatedParams[key]) delete updatedParams[key];
    });

    setParams(updatedParams);
  };

  return { getParam, setParam, params };
};

const Productss = () => {
  const { getParam, setParam } = useSearchParamsHandler();

  const category = getParam("category") || "house-plants";
  const type = getParam("type") || "all-plants";
  const sort = getParam("sort") || "default-sorting";
  const range_min = Number(getParam("range_min")) || 0;
  const range_max = Number(getParam("range_max")) || 1000;

  const {
    data: response,
    isLoading,
    isError,
  } = useQueryHandler({
    url: `flower/category/${category}`,
    pathname: `products-${category}-${type}-${sort}-${range_min}-${range_max}`,
    param: {
      range_min,
      range_max,
      sort,
      type: type === "all-plants" ? "" : type,
    },
  });

  const products = (response as any)?.data;

  return (
    <div className="mt-5 w-full pr-3 p-3">
      <div className="flex items-center justify-between border-b border-[#46A358]/20 mb-6 pb-2 max-[577px]:justify-end">
        <div className="flex gap-8 max-[577px]:hidden">
          {[
            { label: "All Plants", value: "all-plants" },
            { label: "New Arrivals", value: "new-arrivals" },
            { label: "Sale", value: "sale" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setParam({ type: item.value })}
              className={`text-[16px] pb-2 transition-all relative ${
                type === item.value
                  ? "text-[#46A358] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#46A358]"
                  : "text-[#3D3D3D] hover:text-[#46A358]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[#3D3D3D]">
          <span className="text-[15px]">Short by:</span>
          <select
            value={sort}
            onChange={(e) => setParam({ sort: e.target.value })}
            className="bg-transparent font-medium focus:outline-none cursor-pointer text-[15px]"
          >
            <option value="default-sorting">Default sorting</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="most-expensive">Most Expensive</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-lg p-4 w-[250px] h-[300px] animate-pulse flex flex-col gap-4"
            >
              <div className="bg-gray-200 w-full h-[200px] rounded-md" />
              <div className="bg-gray-200 w-3/4 h-4 rounded" />
              <div className="bg-gray-200 w-1/2 h-4 rounded" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-red-500">Xatolik yuz berdi.</div>
      ) : !products || products.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-medium">
          Mahsulotlar topilmadi.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {products.map((item: any) => (
            <Card key={item._id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Productss;
