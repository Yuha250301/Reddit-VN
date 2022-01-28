/* eslint-disable prettier/prettier */
import React from "react";
import NavbarRvn from "../common/nav";
import PreviewPostTitle from "./common/post-translated";
import useListPosts from "ui/controller/use-list-post";

const Root = "rvn-translate__translating";

const Translating: React.FC = () => {
  const posts = useListPosts();
  const subreddit = posts.reduce((pre: any, item) => {
    if (!pre[item.subreddit]) pre[item.subreddit] = [item];
    else pre[item.subreddit].push(item);
    return pre;
  }, {});
  return (
    <>
      <NavbarRvn />
      <div className={Root}>
        {Object.keys(subreddit).map((item, index: number) => (
          <PreviewPostTitle
            key={index}
            tagName={item}
            posts={subreddit[item]}
          />
        ))}
      </div>
      ;
    </>
  );
};

export default Translating;
