import Products from "../../components/dashboard";
import BlogPage from "../blog";
import Infor from "./section/Infor";
import Showcase from "./section/Showcase";

const Home = () => {
  return (
    <div>
      <Showcase />
      <Products />
      <Infor />
      <BlogPage />
    </div>
  );
};

export default Home;
