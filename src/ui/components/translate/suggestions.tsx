/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";

import PostController from "controller/core/post";
import { Section } from "../main/const";
import postAtom from "ui/state/post-atom";
import NavbarRvn from "../common/nav";
import { crawlerPopularPost } from "utils/crawler";
import { PostData } from "data/post-manager";

const Root = "rvn-translate__suggestions";

const Suggestions: React.FC = () => {
  const [listSuggestion, setList] = useState<PostData[]>([]);
  const setPost = useSetRecoilState<PostData | undefined>(postAtom);
  const navigate = useNavigate();
  const fetchPopularPost = async () => {
    const list: PostData[] = await crawlerPopularPost();
    if (list) setList(list);
  };
  const selectPost = async (e: any, item: PostData) => {
    e.preventDefault();
    setPost(item);
    navigate(`/${Section.TRANSLATE}`, { replace: true });
    const fullPost = await PostController.crawl(item.url);
    setPost(fullPost);
  };
  useEffect(() => {
    fetchPopularPost();
  }, []);

  return (
    <>
      <NavbarRvn />
      <div className={Root}>
        {!!listSuggestion.length &&
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
};

export default Suggestions;
