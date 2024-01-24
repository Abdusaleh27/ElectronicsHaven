import { SelectAll } from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

/**
 * Sorts search results based on the sort criteria selected by user
 */

const SortSearchSelector = ({ updateSort, updateNextPage }) => {
  const [selected, setSelected] = useState("");

  const handleChange = async (e) => {
    setSelected(() => e.target.value);
    updateSort(e.target.value);
    updateNextPage(1);
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="sort-by-label">Sort By</InputLabel>
        <Select
          labelId="sort-by-label"
          name="sorting"
          id="sort"
          value={selected}
          onChange={handleChange}
          autoWidth
          label="Sort By"
        >
          <MenuItem value="customerTopRated.dsc,salePrice.dsc,customerReviewAverage.dsc,customerReviewCount.dsc">
            Relevance
          </MenuItem>
          <MenuItem value="salePrice.dsc">Price high to low</MenuItem>
          <MenuItem value="salePrice.asc">Price low to high</MenuItem>
          <MenuItem value="customerReviewAverage.dsc,customerReviewCount.dsc">
            Highest Rating
          </MenuItem>
          <MenuItem value="customerReviewAverage.asc">Lowest Rating</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
    </>
  );
};

export default SortSearchSelector;
