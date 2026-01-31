import { useParams } from "react-router-dom";
import {
  MessageOutlined,
  SendOutlined,
  PlusCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Avatar, Skeleton, Tabs } from "antd";
import { useQueryHandler } from "../../../hooks/useQuery/indexx";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { data: apiResponse, isLoading } = useQueryHandler({
    url: `api/user/by_id/${id}`, // API documentationdagi path
    pathname: `user-profile-${id}`,
  });

  const user = apiResponse?.data;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Skeleton
          active
          avatar
          paragraph={{ rows: 6 }}
          className="max-w-[800px]"
        />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="w-full h-[250px] md:h-[350px] relative overflow-hidden rounded-b-[40px]">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between -mt-16 md:-mt-20 mb-8 gap-4">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative">
              <Avatar
                size={160}
                src={user?.profile_photo}
                icon={<UserOutlined />}
                className="border-4 border-white shadow-lg bg-[#46A358]"
              />
              <div className="absolute bottom-4 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>

            <div className="text-center md:text-left pb-2">
              <h1 className="text-3xl font-black text-[#3D3D3D]">
                {user?.name} {user?.surname}
              </h1>
              <p className="text-gray-400 font-medium">Followers: 3</p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            <button className="flex items-center gap-2 bg-[#46A358] text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all">
              <MessageOutlined /> Start chat
            </button>
            <button className="flex items-center gap-2 bg-[#46A358] text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all">
              <SendOutlined /> Send Invitation
            </button>
            <button className="flex items-center gap-2 bg-[#46A358] text-white px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all">
              <PlusCircleOutlined /> Follow
            </button>
          </div>
        </div>

        <div className="border-b border-gray-100 mb-8">
          <Tabs
            defaultActiveKey="1"
            className="custom-profile-tabs"
            items={[
              { label: "About", key: "1" },
              { label: "Products", key: "2" },
              { label: "Posts", key: "3" },
              { label: "Likes", key: "4" },
              { label: "Followers", key: "5" },
            ]}
          />
        </div>
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-[#3D3D3D] mb-1">
              {user?.name} {user?.surname}
            </h2>
            <p className="text-[#46A358] font-medium mb-1">
              @{user?.username || "no_username"}
            </p>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4">
              "{user?.user_type || "DEVELOPER"}"
            </p>

            {user?.billing_address && (
              <div className="flex items-start gap-2 text-gray-500 text-sm">
                <EnvironmentOutlined className="mt-1 text-[#46A358]" />
                <span>
                  {user.billing_address.town},{" "}
                  {user.billing_address.street_address},{" "}
                  {user.billing_address.country}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#FBFBFB] rounded-3xl p-8 flex justify-around items-center border border-gray-100 mb-20 shadow-sm">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <UserOutlined className="text-2xl text-gray-400" />
            </div>
            <p className="text-xl font-black text-[#3D3D3D]">3</p>
            <p className="text-gray-400 text-sm">Followers</p>
          </div>

          <div className="w-[1px] h-12 bg-gray-200"></div>

          <div className="text-center">
            <div className="flex justify-center mb-2 text-2xl">❤️</div>
            <p className="text-xl font-black text-[#3D3D3D]">
              {user?.wishlist?.length || 0}
            </p>
            <p className="text-gray-400 text-sm">Wishlist</p>
          </div>

          <div className="w-[1px] h-12 bg-gray-200"></div>

          <div className="text-center">
            <div className="flex justify-center mb-2">
              <CalendarOutlined className="text-2xl text-gray-400" />
            </div>
            <p className="text-xl font-black text-[#3D3D3D]">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString("en-US")
                : "08/26/2023"}
            </p>
            <p className="text-gray-400 text-sm">Joined</p>
          </div>
        </div>
      </div>

      <style>{`
        .custom-profile-tabs .ant-tabs-tab {
          padding: 12px 0 !important;
          margin: 0 32px 0 0 !important;
          font-weight: 600 !important;
          color: #727272 !important;
        }
        .custom-profile-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #46A358 !important;
        }
        .custom-profile-tabs .ant-tabs-ink-bar {
          background: #46A358 !important;
          height: 3px !important;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
