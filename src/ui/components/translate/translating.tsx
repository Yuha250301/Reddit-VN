/* eslint-disable prettier/prettier */
import React from "react";
import NavbarRvn from "../common/nav";
import PreviewPostTitle from "./common/post-translated";
import useListPosts from "ui/controller/use-list-post";
import Loading from "../common/loading";

const Root = "rvn-translate__translating";

const Translating: React.FC = () => {
  const [posts, isFetch] = useListPosts();
  let subreddit: any = null;
  if (posts.length) {
    subreddit = posts.reduce((pre: any, item) => {
      if (!pre[item.subReddit]) pre[item.subReddit] = [item];
      else pre[item.subReddit].push(item);
      return pre;
    }, {});
  }
  return (
    <>
      <NavbarRvn />
      <div className={Root}>
        {subreddit ? (
          Object.keys(subreddit).map((item: any, index: number) => (
            <PreviewPostTitle
              key={index}
              tagName={item}
              posts={subreddit[item]}
            />
          ))
        ) : !isFetch ? (
          <Loading />
        ) : (
          <div style={{ textAlign: "center" }}>
            Bạn chưa dịch bài nào ở đây cả
          </div>
        )}
      </div>
      ;
    </>
  );
};

export default Translating;
