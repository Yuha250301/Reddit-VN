/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import DetailUser from "./detail-user";
import P2T from "./preview-to-translate";

import clsx from "clsx";

const Root = "rvn-translate__post__comment";
const ClassNames = {
    Root,
    Title: `${Root}__title`,
    Content: `${Root}__content`,
    Disable: `${Root}__disable`,
};

interface CommentProps {
    user: string;
    reward: string;
    content: string;
    comment?: any[];
}

const Comment: React.FC<CommentProps> = ({ user, reward, content, comment }) => {
    const [isHidden, setIsHidden] = useState(true);

    const handleHidden = () => {
        setIsHidden(!isHidden)
    }

  return (
    <div >
        <div className={ClassNames.Title} >
            <DetailUser user={user} reward={reward}/>
            <input type="checkbox" onClick={handleHidden}></input>
        </div>
        <div className={clsx(ClassNames.Content,(isHidden && ClassNames.Disable))}>
            <P2T content={content}/>
        </div>
    </div>
  );
};

export default Comment;
