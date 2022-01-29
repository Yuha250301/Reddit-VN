import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { BasicComment } from "data/post-manager";
import Comment from "./comment";

interface ItemsProps {
  currentItems: BasicComment[];
  postId: string;
}

const Items: React.FC<ItemsProps> = ({ postId, currentItems }) => {
  return (
    <>
      {currentItems &&
        currentItems.map((item: BasicComment, index: number) => (
          <Comment
            postId={postId}
            commentId={item.id}
            key={index}
            user={item.user}
            reward={item.reward}
          />
        ))}
    </>
  );
};

interface PaginatedItemsProps {
  itemsPerPage: number;
  list: BasicComment[];
  postId: string;
}

const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  itemsPerPage,
  list,
  postId,
}) => {
  const [currentItems, setCurrentItems] = useState<BasicComment[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % list.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} postId={postId} />
      <ReactPaginate
        onPageChange={handlePageClick}
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
    </>
  );
};

export default PaginatedItems;
