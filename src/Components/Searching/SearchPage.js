import React, { useContext, useEffect, useState } from "react";
import SortSearchSelector from "./SortSearchSelector";
import NextSearchPage from "./NextSearchPage";
import PageNavBar from "../Pagination/PageNavBar";
import { useNavigate, useParams } from "react-router-dom";
import SearchFilters from "../SearchFilters/SearchFilters";
import UserDataContext from "../UserDataContext/UserDataContext";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import HamburgerFilters from "../SearchFilters/HamburgerFilters";
import CategoriesSelector from "./CategoriesSelector";
import { API, Amplify } from "aws-amplify";
import config from "../../aws-exports";
Amplify.configure(config);
/**
 * Main component for performing search for products based on users input
 */

const SearchPage = () => {
  /** Hooks */
  const { userLists } = useContext(UserDataContext);
  const param = useParams();
  const [data, setData] = useState(null);
  const [category, setCategory] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //to control the reset of selected page on PageNavBar
  const [resetSelected, setResetSelected] = useState(false);
  const [sort, setSort] = useState(
    "customerTopRated.dsc,customerReviewCount.dsc,salePrice.dsc,customerReviewAverage.dsc"
  );

  const theme = useTheme();
  const targetBreakPoint = useMediaQuery(theme.breakpoints.down(700));
  const smallestBreakPoint = useMediaQuery(theme.breakpoints.down("xs"));
  const mdBreakPoint = useMediaQuery(theme.breakpoints.down(900));
  const lgBreakPoint = useMediaQuery(theme.breakpoints.down(1200));
  const xlBreakPoint = useMediaQuery(theme.breakpoints.down(1440));
  const xxlBreakPoint = useMediaQuery(theme.breakpoints.down(1800));
  const biggestBreakPoint = useMediaQuery(theme.breakpoints.up(1800));

  /**
   * formats the search input provided by user to a valid search
   * input for the api
   * @param s:string
   */

  const formatSearch = (s) => {
    return s
      .trim()
      .split(" ")
      .filter((word) => word !== "")
      .join("&search=");
  };

  useEffect(() => {
    fetchData(param.name);
  }, [sort, category, nextPage, param.name]);

  /**
   * Fetches the search results
   */
  const fetchData = async (query) => {
    setLoading(() => true);
    const queries = query.split("&");
    let currentQuery = formatSearch(queries[0]);

    if (queries.length > 1) {
      updateNextPage(parseInt(queries[1].split("=")[1]));
    }
    let filters = "";
    if (queries[2]) {
      filters = "&" + queries.slice(2).join("&");
    }
    const myInit = {
      headers: {}, // OPTIONAL
      queryStringParameters: {
        searchQuery: `((search=${currentQuery}*)${filters}${category})`,
        endQuery: `&sort=${sort}&pageSize=16${
          nextPage > 1 ? `&page=${nextPage}` : ""
        }`,
        trending: false,
      },
    };
    API.get("BBProductAPI", "/items", myInit)
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((error) => console.log("could not fetch search products", error));
  };

  /**
   * Updates the next page for search query and pagination (PageNavBar)
   * @param {int} number
   */
  const updateNextPage = (number) => {
    setNextPage(number);
  };

  /**
   * Helps control the reset of PageNavBar current page after sorting page
   * @param val:boolean
   */
  const updateResetSelected = (val) => {
    setResetSelected(val);
  };

  /**
   * Sorts search results by users choices from SortSearchSelector
   * and also resets to first page for search results and pagination
   * @param s:string
   */
  const updateSort = (s) => {
    setSort(() => s);
    setNextPage(1);
    setResetSelected(true);
  };

  /**
   * Updates the query based on the user selection in the drop menu
   * in search page
   * @param {String} cat
   */
  const updateCategory = (cat) => {
    setCategory(() => (cat === "Any" ? "" : cat));
    setNextPage(1);
    setResetSelected(true);
  };
  return (
    <Grid container spacing={1} mt={targetBreakPoint ? 9 : 15}>
      {targetBreakPoint ? (
        <>
          <Grid container p={1}>
            <HamburgerFilters
              filters={param.name}
              updateNextPage={updateNextPage}
              updateCategory={updateCategory}
            />
          </Grid>
          <Grid container>
            <Grid item p={smallestBreakPoint ? 2 : 3}>
              <SortSearchSelector
                updateSort={updateSort}
                updateNextPage={updateNextPage}
              />

              {loading ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                <Grid item>
                  <NextSearchPage products={data.products} key={param.name} />
                </Grid>
              )}
              <PageNavBar
                currentQuery={param.name}
                pageNumber={nextPage}
                pages={data?.totalPages}
                updateNextPage={updateNextPage}
                resetSelected={resetSelected}
                updateResetSelected={updateResetSelected}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid
            container
            overflow={false}
            paddingX={
              (mdBreakPoint && "2%") ||
              (lgBreakPoint && "5%") ||
              (xlBreakPoint && "10%") ||
              (xxlBreakPoint && "15%") ||
              (biggestBreakPoint && "20%")
            }
          >
            <Grid item sm={3}>
              <SearchFilters
                currentQuery={param.name}
                biggestBreakPoint={biggestBreakPoint}
              />
            </Grid>
            <Grid item sm={9}>
              <div className="row">
                <div className="col">
                  <CategoriesSelector
                    updateCat={updateCategory}
                    updateNextPage={updateNextPage}
                  />
                </div>
                <div className="col">
                  <SortSearchSelector
                    updateSort={updateSort}
                    updateNextPage={updateNextPage}
                  />{" "}
                </div>
              </div>
              {loading ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                <NextSearchPage products={data.products} key={param.name} />
              )}

              <PageNavBar
                currentQuery={param.name}
                pageNumber={nextPage}
                pages={data?.totalPages}
                updateNextPage={updateNextPage}
                resetSelected={resetSelected}
                updateResetSelected={updateResetSelected}
                targetBreakPoint={targetBreakPoint}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SearchPage;
