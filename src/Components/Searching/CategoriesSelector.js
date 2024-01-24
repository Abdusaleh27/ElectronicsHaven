import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

/**
 * Sorts search results based on the sort criteria selected by user
 */

const CategoriesSelector = ({ updateCat, updateNextPage }) => {
  const [selected, setSelected] = useState("");

  const handleChange = async (e) => {
    const { value } = e.target;
    updateCat(value);
    updateNextPage(1);
    setSelected(() => value);
  };
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="categories-label">Categories</InputLabel>
        <Select
          labelId="categories-label"
          name="categories"
          id="categories"
          value={selected}
          onChange={handleChange}
          autoWidth
          label="Categories"
        >
          <MenuItem value={"Any"}>Any</MenuItem>
          <MenuItem value="&(categoryPath.id=abcat0800000)">
            Cellphones
          </MenuItem>
          <MenuItem value="&(categoryPath.id=abcat0101000)">Tvs</MenuItem>
          <MenuItem value="&(categoryPath.id=abcat0501000)">Desktops</MenuItem>
          <MenuItem value="&(categoryPath.id=abcat0204000)">
            Headphones
          </MenuItem>
          <MenuItem value="&(categoryPath.id=abcat0502000)">Laptops</MenuItem>
          <MenuItem value="&(categoryPath.id=abcat0401000)">
            Digital Cameras
          </MenuItem>
          <MenuItem value="&(categoryPath.id=pcmcat209000050006)">
            Tablets
          </MenuItem>
          <MenuItem value="&(categoryPath.id=pcmcat310200050004)">
            Wireless Speakers
          </MenuItem>
          <MenuItem value="&(categoryPath.id=abcat0904000)">
            Cooktops & Ovens
          </MenuItem>
          <MenuItem value="&(categoryPath.id=abcat0901000)">
            Refrigerators
          </MenuItem>
          <MenuItem value="&(categoryPath.id=abcat0912000)">
            Small Kitchen Appliances
          </MenuItem>
          <MenuItem value="&(categoryPath.id=abcat0910000)">
            Washers & Dryers
          </MenuItem>

          <MenuItem value="&(categoryPath.id=pcmcat242800050021)">
            Fitness & Beauty
          </MenuItem>

          <MenuItem value="&(categoryPath.id=pcmcat241600050001)">
            Home Audio
          </MenuItem>
        </Select>
      </FormControl>

      <br />
      <br />
    </>
  );
};

export default CategoriesSelector;
