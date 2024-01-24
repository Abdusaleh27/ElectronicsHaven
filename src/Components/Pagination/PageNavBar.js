import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

/**
 * Used for pagenation of search results
 */

const PageNavBar = ({
  pageNumber,
  currentQuery,
  pages,
  updateNextPage,
  resetSelected,
  updateResetSelected,
  targetBreakPoint,
}) => {
  /**
   * Hooks
   */
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * helps manage the focus on the selected or current page
   * @param {event} e
   */
  const updatePage = (e) => {
    let page = e.selected + 1;
    const queries = currentQuery.split("&");
    const search = queries[0];
    const filters = queries.slice(2).join("&").trim();
    navigate(
      `/search/${
        search + "&page=" + page + (filters.length > 0 ? "&" + filters : "")
      }`
    );
    updateNextPage(page - 1);
    setCurrentPage(e.selected - 1);
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (resetSelected) {
      setCurrentPage(0);
      updateResetSelected(false);
    }
    if (pageNumber !== currentPage - 1) setCurrentPage(pageNumber - 1);
  }, [currentPage, pageNumber, targetBreakPoint]);

  return (
    pages > 0 && (
      <ReactPaginate
        nextLabel=">"
        onPageChange={updatePage}
        pageRangeDisplayed={targetBreakPoint === undefined ? 1 : 2}
        marginPagesDisplayed={targetBreakPoint === undefined ? 1 : 2}
        pageCount={pages}
        forcePage={currentPage}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    )
  );
};

export default PageNavBar;
