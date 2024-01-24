import React from "react";
import StarRatings from "./StarRatings";
import PriceRange from "./PriceRange";
import Availability from "./Availability";
import Condition from "./Condition";
import Saving from "./Saving";
import CheckBoxFilter from "./CheckBoxFilter";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const SearchFilters = ({ currentQuery, biggestBreakPoint, updateNextPage }) => {
  const theme = useTheme();
  const targetBreakPoint = useMediaQuery(theme.breakpoints.down(700));
  return (
    <div className={`mb-5 main-filter`}>
      <p className="fw-bold filter-headers mt-4">Availability</p>
      <Availability currentQuery={currentQuery} />

      {/* Star Rating */}
      <p className="mb-1 fw-bold filter-headers mt-4">Star rating</p>

      <StarRatings currentQuery={currentQuery} />
      <p className="mb-1 mt-3 fw-bold filter-headers">Price range</p>

      {/* Price Range */}
      <PriceRange currentQuery={currentQuery} />

      {/** Condition filters */}
      <p className="mb-3 fw-bold filter-headers mt-3">Condition</p>
      <Condition currentQuery={currentQuery} />

      {/** OnSale filter */}
      <p className="mb-3 fw-bold filter-headers mt-3">On Sale</p>
      <Box marginTop={"-20px"}>
        <CheckBoxFilter
          currentQuery={currentQuery}
          filterOne="onSale=true"
          labelOne="On Sale"
          idOne="onsale"
          biggestBreakPoint={biggestBreakPoint}
        />
      </Box>

      {/* Savings */}
      <p className="mb-3 fw-bold filter-headers mt-3">Min Saving</p>
      <Saving currentQuery={currentQuery} />
    </div>
  );
};

export default SearchFilters;
