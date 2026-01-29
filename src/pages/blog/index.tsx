import blogimg from "../../img/blog.png";
import { setAuhorizationModalVisiblty } from "../../redux/modal-store";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { useNavigate } from "react-router-dom";
import type { BlogCardData } from "../../@types/inedx";
import BlogCard from "./blogcard";

const blogs: BlogCardData[] = [
  {
    id: 1,
    title: "How To Choose Wedding Flowers",
    description:
      "Flowers are an essential element or accessory for every wedding...",
    views: 576,
    comments: 0,
    likes: 0,
  },
  {
    id: 2,
    title: "Flower Subscriptions: A New Way to Gift",
    description:
      "You take away all the other luxuries in life and what remains...",
    views: 432,
    comments: 3,
    likes: 5,
  },
  {
    id: 3,
    title: "The History of the Teddy Bear",
    description:
      "For many people, memories of childhood include a teddy bear...",
    views: 812,
    comments: 1,
    likes: 12,
  },
  {
    id: 4,
    title: "Top 10 Indoor Plants for Home",
    description:
      "Indoor plants bring life, color, and fresh air into your home...",
    views: 298,
    comments: 0,
    likes: 4,
  },
  {
    id: 5,
    title: "How to Care for Roses",
    description:
      "Roses need special attention to bloom beautifully all year...",
    views: 654,
    comments: 2,
    likes: 9,
  },
  {
    id: 6,
    title: "Best Gardening Tools in 2025",
    description: "A gardener’s success depends on having the right tools...",
    views: 441,
    comments: 1,
    likes: 6,
  },
  {
    id: 7,
    title: "Seasonal Flowers Guide",
    description: "Discover which flowers bloom best in each season...",
    views: 723,
    comments: 4,
    likes: 11,
  },
  {
    id: 8,
    title: "Balcony Garden Ideas",
    description: "Small balcony? No problem. Turn it into a green paradise...",
    views: 389,
    comments: 0,
    likes: 7,
  },
  {
    id: 9,
    title: "Flower Arrangements for Events",
    description: "Learn how to make stunning floral arrangements for events...",
    views: 912,
    comments: 6,
    likes: 15,
  },
  {
    id: 10,
    title: "Beginner’s Guide to Gardening",
    description: "Start your gardening journey with these simple steps...",
    views: 530,
    comments: 2,
    likes: 8,
  },
  {
    id: 11,
    title: "Best Plants for Office Desk",
    description: "Brighten your workspace with low-maintenance plants...",
    views: 260,
    comments: 0,
    likes: 3,
  },
  {
    id: 12,
    title: "Outdoor Garden Design Tips",
    description: "Design a beautiful and functional outdoor garden space...",
    views: 780,
    comments: 5,
    likes: 14,
  },
];

const Blog = () => {
  const dispatch = useReduxDispatch();
  const { user } = useReduxSelector((state) => state.userSlice);
  const navigate = useNavigate();

  return (
    <div className="w-full pt-13">
      <div className="w-[90%] m-auto flex flex-col justify-center items-center gap-[20px]">
        {/* HERO */}
        {!user && (
          <>
            <div className="w-full flex items-center justify-center">
              <img
                className="w-full rounded-2xl"
                src={blogimg}
                alt="GreenShop Blog"
              />
            </div>

            <div className="text-center flex items-center justify-center flex-col gap-4">
              <h1 className="font-bold text-center text-6xl leading-[130%] max-[730px]:text-4xl max-[430px]:text-2xl">
                Monetize your content <br /> with
                <span className="text-[#46A358]"> GreenShop</span>
              </h1>

              <p className="text-center w-[91%] leading-[140%] text-[#3d3d3d] font-medium max-[730px]:w-[100%] max-[730px]:font-normal max-[730px]:text-[14px]">
                GreenShop - a platform for buying and selling, publishing and
                monetizing all types of flowers: articles, notes, video, photos,
                podcasts or songs.
              </p>

              <button
                onClick={() => dispatch(setAuhorizationModalVisiblty())}
                className="bg-[#46A358] rounded-md text-white p-[8px_25px] max-[335px]:w-full transition-all hover:bg-[#3d8d4c]"
              >
                Join GreenShop
              </button>
            </div>
          </>
        )}

        <div className="grid grid-cols-3 gap-5 my-10 max-[1000px]:grid-cols-2 max-[630px]:grid-cols-1 w-full">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onClick={() => navigate(`/blog/${blog.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
