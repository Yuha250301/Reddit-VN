/* eslint-disable prettier/prettier */
import React from "react";
import NavbarRvn from "../common/nav";
import clsx from "clsx";
import PreviewPostTitle from "./common/post-translated";

const Root = "rvn-translate__translating";

const listTranslated = [
  {
    tagName: "r/explainlikeimfive",
    list: [
      "ELI5: Tại sao cần đến 3 đại lượng để giải thích về dòng điện (volts, watts và amps)??",
      "ELI5: Một đám mây dông chứa khoảng hơn một triệu tấn nước trước khi thành mưa rơi xuống; làm sao mà khối lượng khổng lồ này có thể trôi nổi trên không khí, thách thức cả trọng lực như vậy?",
    ],
  },
  {
    tagName: "r/nosleep",
    list: [
      "Tôi bị mù bẩm sinh, nhưng trong mơ tôi có thể nhìn được. Tôi chỉ muốn mọi thứ chấm dứt ngay thôi.",
      "Mọi thứ đều đang biến thành đống gỉ sét.",
    ],
  },
];

// function listTranslatedByTag(this: any, tagName: string, list: any[]) {
//   this.tagName = tagName;
//   this.list = list;
// }

const Translating: React.FC = () => {
  return (
    <>
      <NavbarRvn/>
      <div className={Root}>
        {listTranslated.map((tagList: any, index: number) => (
          <PreviewPostTitle
            key={index}
            tagName={tagList.tagName}
            titles={tagList.list}
          />
        ))}
      </div>
      ;
    </>
  );
};

export default Translating;
