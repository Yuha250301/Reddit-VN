/* eslint-disable prettier/prettier */
import React from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";

import { Section } from "../main/const";
import postAtom from "ui/state/post-atom";
import NavbarRvn from "../common/nav";
import { parsePopularPost } from "utils/crawler";
import { PostData } from "data/post-manager";
import useCustomSWR from "ui/controller/use-custom-swr";
import Loading from "../common/loading";

const Root = "rvn-translate__suggestions";

const Suggestions: React.FC = () => {
  const setPost = useSetRecoilState<PostData | undefined>(postAtom);
  const navigate = useNavigate();
  const selectPost = async (e: any, item: PostData) => {
    e.preventDefault();
    setPost(item);
    navigate(`/${Section.TRANSLATE}`, { replace: true });
  };
  const { data, error } = useCustomSWR("https://www.reddit.com/.json");

  if (data) {
    const listSuggestion = parsePopularPost(data);
    return (
      <>
        <NavbarRvn />
        <div className={Root}>
          {listSuggestion &&
            listSuggestion.length &&
            listSuggestion.map((item: PostData, index: number) => (
              <div
                key={index}
                style={{ cursor: "pointer", width: "100%" }}
                onClick={(e) => selectPost(e, item)}
              >
                <div className="d-flex">
                  <div style={{ width: "300px" }}>
                    <span>{item.subReddit}</span>
                  </div>
                  <div style={{ width: "100%" }}>
                    <span>{item.title}</span>
                  </div>
                </div>
                <hr style={{ margin: "25px 0px", opacity: "0.8" }} />
              </div>
            ))}
        </div>
        ;
      </>
    );
  }
  if (error) {
    console.log("NetworkError: err when crawl popular post", error);
    return (
      <>
        <NavbarRvn />
        <div className={Root}>Có lỗi xảy ra khi gợi ý bài dịch mới</div>
      </>
    );
  }
  return (
    <>
      <NavbarRvn />
      <Loading />
    </>
  );
};

export default Suggestions;
