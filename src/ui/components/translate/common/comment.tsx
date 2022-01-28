import React, { useEffect, useState } from "react";
import RedditDB from "database/raw-db";
import UIComment from "./ui-comment";

interface CommentProps {
  postId: string;
  commentId: string;
}

const Comment: React.FC<CommentProps> = function Comment({
  postId,
  commentId,
}) {
  const [comment, setComment] = useState<any>(null);
  const getData = async (
    postId: string,
    commentId: string,
    subscribed: boolean,
  ) => {
    const data = await RedditDB.getCommentById(postId, commentId);
    if (data && subscribed) setComment(data);
  };
  useEffect(() => {
    let subscribed = true;
    getData(postId, commentId, subscribed);
    return () => {
      subscribed = false;
    };
  }, [postId, commentId]);
  const children: string[] = [];
  comment?.replies?.data?.children?.forEach((item: any) => {
    if (
      item.kind === "more" &&
      item?.data?.children &&
      Array.isArray(item?.data?.children)
    )
      children.push(...item.data.children);
    else if (item && item?.data?.id) children.push(item.data.id);
    else console.log("DataErr: comment do not match requirements", item);
  });
  if (!comment) return null;
  else
    return (
      <UIComment
        postId={postId}
        user={comment.author}
        reward={`${comment.upvotes} | ${comment.awards}`}
        content={comment.body}
        comments={children}
      />
    );
};

export default Comment;
