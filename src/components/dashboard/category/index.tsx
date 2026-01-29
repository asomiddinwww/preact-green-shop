import { useState } from "react"; // Narxni vaqtincha saqlash uchun
import { useSearchParamsHandler } from "../../../hooks/paramsApi";
import { useQueryHandler } from "../../../hooks/useQuery";
import Discount from "./discount";
import type { CategoryType } from "../../../@types/inedx";
import { Slider } from "antd";
import { loaderApi } from "../../../generic/loader";

const Category = () => {
  const { setParam, getParam } = useSearchParamsHandler();

  let range_min = getParam("range_min") || 0;
  let range_max = getParam("range_max") || 1000;

  const queryResponse = useQueryHandler({
    url: "flower/category",
    pathname: "category",
  });

  const { isLoading, isError } = queryResponse;
  const categories = (queryResponse.data as any)?.data as CategoryType[];
  const { cateGoryLoader } = loaderApi();

  const [slider, setSlider] = useState<number[]>([0, 1000]);

  const changeSlider = (e: any) => {
    setSlider(e);
  };

  let category = getParam("category") || "house-plants";
  return (
    <div className="flex flex-col gap-8 w-90 max-[1010px]:w-full p-2">
      <section>
        <h2 className="font-bold text-[18px] mb-3 px-5">Categories</h2>
        <div className="px-5 flex flex-col gap-4">
          {isLoading || isError
            ? cateGoryLoader()
            : categories?.map((value) => (
                <div
                  onClick={() =>
                    setParam({
                      category: value.route_path,
                      range_min,
                      range_max,
                    })
                  }
                  key={value._id}
                  className={`flex items-center justify-between hover:text-[#46a358] cursor-pointer text-[15px] transition-all ${
                    getParam("category") === value.route_path
                      ? "text-[#46a358] font-bold"
                      : "text-[#3d3d3d]"
                  }`}
                >
                  <h3>{value.title}</h3>
                  <h3 className="font-medium">({value.count})</h3>
                </div>
              ))}
        </div>
      </section>

      <section className="px-5">
        <h2 className="font-bold text-[18px] mb-3">Price Range</h2>
        <Slider onChange={changeSlider} range max={1000} min={0} />
        <div>
          <p className="text-[15px] text-[#3d3d3d] pb-5">
            Price:{" "}
            <span className="font-bold text-[#46a358]">
              ${slider[0]} - ${slider[1]}
            </span>
          </p>
          <div className="w-full flex items-center justify-center">
            <button
              className="p-1.5 bg-[#46a358] rounded-[5px] pl-7 pr-7 text-[white] cursor-pointer"
              onClick={() =>
                setParam({
                  category,
                  range_min: slider[0],
                  range_max: slider[1],
                })
              }
            >
              Filter
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-bold text-[18px] mb-3 px-5">Size</h2>
        <div className="px-5 flex flex-col gap-4"></div>
      </section>

      <Discount />
    </div>
  );
};

export default Category;
