import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Avatar, Skeleton, Empty } from "antd";
import { Eye, Heart } from "lucide-react";
import { useQueryHandler } from "../hooks/useQuery/index";

interface IAuthor {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  username: string;
}

interface IBlog {
  _id: string;
  title: string;
  content: string;
  created_by: string;
  created_at: string;
  views?: number;
  reaction_length?: number;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: apiResponse, isLoading: isBlogLoading } = useQueryHandler({
    url: `user/blog/${id}`,
    pathname: `blog-detail-${id}`,
  }) as { data: ApiResponse<IBlog | IBlog[]>; isLoading: boolean };

  const blog = Array.isArray(apiResponse?.data)
    ? apiResponse?.data?.[0]
    : apiResponse?.data;

  const { data: authorResponse, isLoading: isAuthorLoading } = useQueryHandler({
    url: `user/address`,
    pathname: `author-${blog?.created_by}`,
  }) as { data: ApiResponse<IAuthor>; isLoading: boolean };

  const author = authorResponse?.data;

  if (isBlogLoading || isAuthorLoading) {
    return (
      <div className="max-w-[800px] mx-auto p-20">
        <Skeleton avatar active paragraph={{ rows: 3 }} />
      </div>
    );
  }

  if (!blog) return <Empty description="Maqola topilmadi" className="py-20" />;

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-20">
      <div className="w-[90%] max-w-[80%] mx-auto pt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-[#46A358] mb-8 transition-colors font-medium"
        >
          <ArrowLeftOutlined /> Orqaga
        </button>

        <div
          onClick={() => navigate(`/user/${blog.created_by}`)}
          className="flex items-center gap-4 mb-10 p-4 bg-white border border-gray-100 rounded-3xl hover:border-[#46A358]/30 hover:shadow-lg cursor-pointer transition-all w-fit"
        >
          <Avatar
            size={58}
            src={null}
            icon={<UserOutlined />}
            className="bg-[#46A358] shadow-sm border-2 border-white"
          />
          <div>
            <h4 className="font-bold text-[#3D3D3D] text-lg leading-none mb-1.5">
              {author ? `${author.name} ${author.surname}` : "Noma'lum muallif"}
            </h4>
            <div className="flex items-center gap-3 text-gray-400 text-[13px] font-medium">
              <span className="flex items-center gap-1">
                <CalendarOutlined />
                {new Date(blog.created_at).toLocaleDateString("uz-UZ")}
              </span>
              <span className="text-[#46A358] font-semibold">
                @{author?.username || "user"} • Profilni ko'rish
              </span>
            </div>
          </div>
        </div>

        <article className="bg-white p-6 md:p-12 rounded-[10px] border border-gray-100 shadow-sm">
          <h1 className="text-3xl md:text-5xl font-black text-[#3D3D3D] mb-8 leading-[1.2]">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 mb-10 border-b border-gray-50 pb-8">
            <div className="flex items-center gap-2 bg-[#FBFBFB] px-4 py-2 rounded-2xl text-gray-500 text-sm">
              <Eye size={18} className="text-[#46A358]" />
              {blog.views || 0}
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-2xl text-red-500 text-sm font-bold">
              <Heart size={18} className="fill-red-500" />
              {blog.reaction_length || 0}
            </div>
          </div>

          <div
            className="custom-blog-content text-[#727272] text-[18px] leading-[1.9]"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
      </div>

      <style>{`
        .custom-blog-content h2 { font-weight: 800; color: #3D3D3D; margin: 2.5rem 0 1rem; font-size: 1.8rem; }
        .custom-blog-content p { margin-bottom: 1.5rem; }
        .custom-blog-content a { color: #46A358; font-weight: 700; text-decoration: underline; }
        .custom-blog-content img { border-radius: 20px; width: 100%; margin: 2rem 0; }
      `}</style>
    </div>
  );
};

export default BlogDetail;
