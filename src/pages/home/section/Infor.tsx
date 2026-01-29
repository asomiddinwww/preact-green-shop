import { Button } from "antd";
import infor1 from "../../../img/inforimg.png";

const Infor = () => {
  return (
    <div className="w-full pt-10 pb-20">
      <div className="w-[90%] m-auto flex flex-col md:flex-row items-center gap-7">
        <div className="w-full flex flex-col sm:flex-row p-6 md:p-10 bg-[#FBFBFB] justify-between text-center sm:text-end items-center relative min-h-[250px]">
          <div className="w-full sm:w-1/2 flex justify-center sm:justify-start mb-4 sm:mb-0">
            <img src={infor1} className=" absolute bottom-10" alt="cactus" />
          </div>
          <div className="z-10 w-full sm:w-1/2">
            <h1 className="text-[18px] md:text-[20px] font-[700] leading-tight uppercase">
              Summer cactus <br className="hidden sm:block" /> & succulents
            </h1>
            <p className="text-[14px] md:text-[16px] font-[400] py-4 text-gray-600">
              We are an online plant shop offering a wide range of cheap and
              trendy plants
            </p>
            <Button
              type="primary"
              className="!bg-[#46A358] !text-white !h-auto !py-2 !px-6 hover:opacity-90 transition-all border-none"
            >
              Find More
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row p-6 md:p-10 bg-[#FBFBFB] justify-between text-center sm:text-end items-center relative min-h-[250px]">
          <div className="w-full sm:w-1/2 flex justify-center sm:justify-start mb-4 sm:mb-0">
            <img src={infor1} className="absolute bottom-10" alt="succulents" />
          </div>
          <div className="z-10 w-full sm:w-1/2">
            <h1 className="text-[18px] md:text-[20px] font-[700] leading-tight uppercase">
              Styling Guide <br className="hidden sm:block" /> & Care Tips
            </h1>
            <p className="text-[14px] md:text-[16px] font-[400] py-4 text-gray-600">
              We are an online plant shop offering a wide range of cheap and
              trendy plants
            </p>
            <Button
              type="primary"
              className="!bg-[#46A358] !text-white !h-auto !py-2 !px-6 hover:opacity-90 transition-all border-none"
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
