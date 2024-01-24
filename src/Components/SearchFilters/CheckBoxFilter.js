import { Box, Checkbox, FormControlLabel, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const CheckBoxFilter = ({
  currentQuery,
  filterOne,
  idOne,
  labelOne,
  biggestBreakPoint,
  rating = false,
  ratingVal = 0,
}) => {
  /**
   * Hooks
   */
  const [checkedOne, setCheckedOne] = useState(false);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let filteredQuery = currentQuery
      .split("&")
      .filter((newQuery) => newQuery !== filterOne)
      .join("&");
    let link = filteredQuery.trim() + query.trim();

    //updatedLink purpose to reset the pagination to page 1
    // when a new filter is applied
    let updatedLink = link.split("&");
    let filters = updatedLink[2]?.length
      ? "&" + updatedLink.slice(2).join("&").trim()
      : "";
    updatedLink = updatedLink[0] + "&page=1" + filters;
    query !== "" && currentQuery !== link && navigate(`/search/${updatedLink}`);
  }, [query]);

  useEffect(() => {
    setCheckedOne(currentQuery.includes("&" + filterOne));
  }, [currentQuery]);
  useEffect(() => {
    refreshQuery();
  }, []);

  /**
   * resets the query based the selection status of the check box
   */
  const refreshQuery = () => {
    let newQuery = "";
    if (currentQuery.includes("&" + filterOne)) newQuery += "&" + filterOne;
    newQuery !== query && setQuery(newQuery.trim());
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setQuery((avail) => avail + e.target.name);
    } else {
      let filtered = query.split(e.target.name).join("");
      setQuery(filtered + " ");
    }
    if (e.target.name === "&" + filterOne) {
      setCheckedOne(!checkedOne);
    }
  };
  return (
    <>
      <div>
        <Box mb={"-15px"}>
          <Grid container>
            <Grid item>
              <FormControlLabel
                sx={{ marginRight: "-5px" }}
                control={
                  <Checkbox
                    size="small"
                    name={"&" + filterOne}
                    id={idOne}
                    checked={checkedOne}
                    onChange={handleChange}
                  />
                }
                label={labelOne}
              />
              {rating && (
                <Rating
                  initialValue={ratingVal}
                  size={17}
                  allowFraction
                  readonly={true}
                />
              )}
              {rating && <span className="star-rating-text">&up</span>}
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default CheckBoxFilter;
