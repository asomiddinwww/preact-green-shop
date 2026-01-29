import Shopping from "./shopping";
import CardTotal from "./card-total";

const ProductShop = () => {
  return (
    <div className="w-[90%] m-auto flex gap-5 pt-4 max-[930px]:flex-col">
      <Shopping />
      <CardTotal />
    </div>
  );
};

export default ProductShop;
