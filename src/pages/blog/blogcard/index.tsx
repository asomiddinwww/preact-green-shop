import React from "react";
import type { BlogCardData } from "../../../@types/inedx";

interface BlogCardProps {
  blog: BlogCardData;
  onClick?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="ant-card ant-card-bordered flex flex-col justify-between cursor-pointer"
    >
      <div className="ant-card-body">
        <div className="ant-card-meta">
          <div className="ant-card-meta-detail border-1 p-5 rounded-t-[9px] border-[#f0f0f0]">
            <div className="ant-card-meta-title">
              <h2 className="cursor-pointer text-[17px] pb-2 font-[600]">
                {blog.title}
              </h2>
            </div>

            <div className="ant-card-meta-description font-[300] text-[#8c8c8c] text-[14.5px] line-clamp-4">
              {blog.description}
            </div>
          </div>
        </div>
      </div>

      <ul className="flex items-center justify-between gap-3 border-1 border-t-0 p-2 rounded-b-[9px] border-[#f0f0f0]">
        <li className="w-[33%]">
          <span>
            <div className="flex justify-center gap-1 text-[#8c8c8c]">
              <span role="img" aria-label="eye" className="anticon anticon-eye">
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="eye"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                </svg>
              </span>
              <p>{blog.views}</p>
            </div>
          </span>
        </li>

        <li className="w-[33%] text-[#8c8c8c]">
          <span>
            <div className="flex justify-center gap-1">
              <span
                role="img"
                aria-label="message"
                className="anticon anticon-message"
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="message"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z" />
                </svg>
              </span>
              <p>{blog.comments}</p>
            </div>
          </span>
        </li>

        <li className="w-[33%] text-[#8c8c8c]">
          <span>
            <div className="flex justify-center gap-1">
              <span
                role="img"
                aria-label="heart"
                className="anticon anticon-heart"
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="heart"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" />
                </svg>
              </span>
              <p>{blog.likes}</p>
            </div>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default BlogCard;
