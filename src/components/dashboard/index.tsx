import Categor from "./category";
import Productss from "./products";

const Products = () => {
  return (
    <div className="w-full pb-30">
      <div className="flex w-[90%] m-auto gap-10 bg-[#fafafa] max-[1010px]:flex-col">
        <Categor />
        <Productss />
      </div>
    </div>
  );
};

export default Products;
