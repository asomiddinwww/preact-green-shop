import React from "react";
import { Button } from "antd";
import infor1 from "../../../img/inforimg.png";

const Infor: React.FC = () => {
  return (
    <div className="w-full py-10">
      <div className="w-[95%] lg:w-[90%] m-auto flex flex-col lg:flex-row items-center gap-7">
        <div className="w-full flex flex-col sm:flex-row p-5 xs:p-6 md:p-10 bg-[#FBFBFB] justify-between items-center relative overflow-hidden min-h-[250px] rounded-xl shadow-sm">
          <div className="w-full sm:w-1/2 flex justify-center sm:justify-start mb-6 sm:mb-0">
            <img
              src={infor1}
              className="w-[140px] xs:w-[160px] sm:w-[200px] sm:absolute bottom-4 left-4 object-contain transition-transform hover:scale-105"
              alt="Summer cactus"
            />
          </div>
          <div className="z-10 w-full sm:w-1/2 text-center sm:text-right">
            <h2 className="text-[16px] xs:text-[18px] md:text-[20px] font-bold leading-tight uppercase text-[#3D3D3D]">
              Summer cactus <br className="hidden sm:block" /> & succulents
            </h2>
            <p className="text-[12px] xs:text-[14px] md:text-[16px] font-normal py-3 text-gray-600 leading-relaxed">
              We are an online plant shop offering a wide range of cheap and
              trendy plants
            </p>
            <Button
              type="primary"
              className="!bg-[#46A358] !text-white !h-auto !py-2 !px-5 xs:!px-6 hover:opacity-90 transition-all border-none font-medium"
            >
              Find More
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row p-5 xs:p-6 md:p-10 bg-[#FBFBFB] justify-between items-center relative overflow-hidden min-h-[250px] rounded-xl shadow-sm">
          <div className="w-full sm:w-1/2 flex justify-center sm:justify-start mb-6 sm:mb-0">
            <img
              src={infor1}
              className="w-[140px] xs:w-[160px] sm:w-[200px] sm:absolute bottom-4 left-4 object-contain transition-transform hover:scale-105"
              alt="Styling Guide"
            />
          </div>
          <div className="z-10 w-full sm:w-1/2 text-center sm:text-right">
            <h2 className="text-[16px] xs:text-[18px] md:text-[20px] font-bold leading-tight uppercase text-[#3D3D3D]">
              Styling Guide <br className="hidden sm:block" /> & Care Tips
            </h2>
            <p className="text-[12px] xs:text-[14px] md:text-[16px] font-normal py-3 text-gray-600 leading-relaxed">
              We are an online plant shop offering a wide range of cheap and
              trendy plants
            </p>
            <Button
              type="primary"
              className="!bg-[#46A358] !text-white !h-auto !py-2 !px-5 xs:!px-6 hover:opacity-90 transition-all border-none font-medium"
            >
              Find More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infor;
