import React, { useEffect, useState } from "react";
import RedditDB from "database/raw-db";
import UIComment from "./ui-comment";

interface CommentProps {
  postId: string;
  commentId: string;
  rootCommentId?: string;
  reward?: string;
  user?: string;
}

const Comment: React.FC<CommentProps> = function Comment({
  postId,
  commentId,
  rootCommentId,
  reward,
  user,
}) {
  const [comment, setComment] = useState<any>(null);
  const getData = async (subscribed: boolean) => {
    const data = await RedditDB.getCommentById(postId, commentId);
    if (data && subscribed) setComment(data);
  };
  useEffect(() => {
    let subscribed = true;
    getData(subscribed);
    return () => {
      subscribed = false;
    };
  }, [postId, commentId]);
  if (!comment && reward && user) {
    return (
      <UIComment
        id={commentId}
        postId={postId}
        user={user}
        reward={reward}
      />
    );
  } else if (!comment) return null;
  else
    return (
      <UIComment
        id={commentId}
        postId={postId}
        user={comment.author}
        reward={`${comment.upvotes} | ${comment.awards}`}
        content={comment.body}
        rootCommentId={rootCommentId || commentId}
        comments={comment?.replies?.data?.children}
      />
    );
};

export default Comment;
