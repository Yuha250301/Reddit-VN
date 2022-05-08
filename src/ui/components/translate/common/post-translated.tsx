/* eslint-disable prettier/prettier */
import React from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import postAtom from "ui/state/post-atom";
import { Section } from "ui/components/main/const";
import PostManager, { TranslatingPost } from "data/post-manager";
const styles = {
  marginTop: "-1px",
  borderTop: "0.5px solid #fff",
  borderBottom: "0.5px solid #fff",
  padding: "20px 0px",
  display: "flex",
  justifyContent: "flex-start",
};

interface PreviewPostTitleProps {
  tagName: string;
  posts: TranslatingPost[];
}

const PreviewPostTitle: React.FC<PreviewPostTitleProps> = ({
  tagName,
  posts,
}) => {
  const setPost = useSetRecoilState(postAtom);
  const navigate = useNavigate();
  moment.locale("vi");
  const selectPost = async (e: any, id: string) => {
    e.preventDefault();
    const post = await PostManager.getPostData(id);
    if (post) {
      setPost(post);
      navigate(`/${Section.TRANSLATE}`, { replace: true });
    }
  };
  return (
    <div style={styles}>
      <div style={{ width: "300px" }}>
        <p>{tagName}</p>
      </div>
      <div style={{ width: "100%" }}>
        {posts.map((item: TranslatingPost, index: number) => {
          const time = item.lastModified
            ? moment(Number(item.lastModified)).fromNow()
            : "";
          return (
            <div
              key={index}
              style={{ cursor: "pointer" }}
              onClick={(e) => selectPost(e, item.id)}
            >
              <div
                style={{
                  display: "flex",
                  paddingBottom: "10px",
                  paddingRight: "5px",
                }}
              >
                <p>u/{item.author}</p>
                {time && (
                  <p style={{ paddingLeft: "5px" }}>- Last modified: {time}</p>
                )}
              </div>
              <p>{item.title}</p>
              {index != posts.length - 1 && (
                <hr style={{ margin: "15px 0px", opacity: "0.8" }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviewPostTitle;
