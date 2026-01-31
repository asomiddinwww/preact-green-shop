import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { MessageSquare, Heart, Eye, Bookmark, Lock } from "lucide-react";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { useQueryHandler } from "../../hooks/useQuery/indexx";
import blogimg from "../../img/blog.png";
import { setAuhorizationModalVisiblty } from "../../redux/modal-store";

interface BlogType {
  _id: string;
  title: string;
  short_description: string;
  content: string;
  created_at: string;
  created_by: string;
  views?: number;
  likes?: number;
  comments_count?: number;
}

const BlogPage = () => {
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();
  const user = useReduxSelector((state: any) => state.userSlice.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);

  const { data: apiResponse, isLoading: apiLoading } = useQueryHandler({
    url: "user/blog",
    pathname: "blog",
    param: { search: "" },
  });

  useEffect(() => {
    const blogsData = apiResponse?.data || [];

    if (blogsData.length > 0) {
      setAllBlogs(blogsData);
      localStorage.setItem("blogs_cache", JSON.stringify(blogsData));
    } else if (!apiLoading) {
      const stored = localStorage.getItem("blogs_cache");
      if (stored) setAllBlogs(JSON.parse(stored));
    }
  }, [apiResponse, apiLoading]);

  const filteredBlogs = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return allBlogs;
    return allBlogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(term) ||
        blog.short_description?.toLowerCase().includes(term),
    );
  }, [searchTerm, allBlogs]);

  const handleBlogClick = (id: string) => {
    if (!user) {
      dispatch(setAuhorizationModalVisiblty());
    } else {
      navigate(`/blog/${id}`);
    }
  };

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-20 pt-10">
      {!user ? (
        <div className="flex flex-col gap-10 mb-16">
          <div className="w-full flex items-center justify-center">
            <img
              className="w-full rounded-b-[10px] object-cover max-h-[450px] shadow-sm"
              src={blogimg}
              alt="GreenShop Blog"
            />
          </div>

          <div className="text-center flex items-center justify-center flex-col gap-5 px-4">
            <h1 className="font-black text-center text-4xl md:text-6xl leading-[120%] text-[#3D3D3D]">
              Monetize your content <br /> with
              <span className="text-[#46A358]"> GreenShop</span>
            </h1>

            <p className="text-center max-w-2xl leading-[160%] text-[#727272] font-medium text-sm md:text-lg">
              GreenShop - gullar savdosi, maqolalar nashr qilish va foydali
              maslahatlar orqali monetizatsiya qilish uchun maxsus platforma.
            </p>

            <button
              onClick={() => dispatch(setAuhorizationModalVisiblty())}
              className="bg-[#46A358] rounded-full text-white px-8 py-4 font-bold text-[16px] transition-all hover:bg-[#3d8d4c] hover:shadow-xl hover:shadow-green-500/30 active:scale-95"
            >
              Join GreenShop
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[90%] max-w-[1200px] mx-auto pt-12 pb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-10">
            <div className="relative w-full max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Maqolalarni qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-200 pl-12 pr-4 py-4 rounded-2xl focus:border-[#46A358] focus:ring-4 focus:ring-[#46A358]/5 outline-none transition-all text-sm shadow-sm"
              />
              <SearchOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
            </div>
          </div>
        </div>
      )}

      <div className="w-[90%] max-w-[1200px] mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apiLoading && allBlogs.length === 0 ? (
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-[10px] border border-gray-100 h-80 animate-pulse shadow-sm"
                />
              ))
          ) : filteredBlogs.length === 0 ? (
            <div className="col-span-full text-center py-24 bg-white rounded-[10px] border-2 border-dashed border-gray-100">
              <div className="text-5xl mb-4">🍃</div>
              <p className="text-gray-400 font-semibold text-lg">
                Maqola topilmadi.
              </p>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <article
                key={blog._id}
                onClick={() => handleBlogClick(blog._id)}
                className="group bg-white border border-gray-100 rounded-[10px] p-8 hover:border-[#46A358]/40 hover:shadow-2xl hover:shadow-[#46A358]/10 transition-all duration-500 flex flex-col h-full cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#46A358]/5 to-transparent rounded-bl-full -mr-16 -mt-16 transition-all group-hover:scale-110" />

                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-[#46A358] bg-[#46A358]/10 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                    <CalendarOutlined />
                    {new Date(blog.created_at).toLocaleDateString("uz-UZ", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  {!user ? (
                    <div className="bg-gray-100 p-2.5 rounded-full">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                  ) : (
                    <Bookmark
                      size={20}
                      className="text-gray-300 group-hover:text-[#46A358] transition-colors"
                    />
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-[#3D3D3D] mb-4 line-clamp-2 group-hover:text-[#46A358] transition-colors leading-[1.4]">
                  {blog.title}
                </h3>

                <p className="text-[15px] text-gray-500 line-clamp-3 mb-8 leading-relaxed flex-grow">
                  {blog.short_description ||
                    "Maqola haqida qisqacha ma'lumot mavjud emas."}
                </p>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1.5 text-[14px] hover:text-[#46A358] transition-colors">
                      <Eye size={18} strokeWidth={2} /> {blog.views || 0}
                    </span>
                    <span className="flex items-center gap-1.5 text-[14px] hover:text-[#46A358] transition-colors">
                      <MessageSquare size={18} strokeWidth={2} />{" "}
                      {blog.comments_count || 0}
                    </span>
                    <span className="flex items-center gap-1.5 text-[14px] hover:text-red-500 transition-colors group/like">
                      <Heart
                        size={18}
                        strokeWidth={2}
                        className="group-hover/like:fill-red-500 transition-all"
                      />
                      {blog.likes || 0}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-2 font-bold text-sm uppercase tracking-tight ${user ? "text-[#46A358]" : "text-gray-400"}`}
                  >
                    {user ? "O'qish" : "Yopiq"}
                    <ArrowRightOutlined
                      className={`transition-transform duration-300 ${user && "group-hover:translate-x-1.5"}`}
                    />
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
