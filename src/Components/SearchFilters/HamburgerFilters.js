import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListSubheader,
} from "@mui/material";
import React, { useState } from "react";
import SearchFilters from "./SearchFilters";
import TuneIcon from "@mui/icons-material/Tune";
import CategoriesSelector from "../Searching/CategoriesSelector";

/**
 *  Hides or shows filters in mobile mode
 */
const HamburgerFilters = ({ filters, updateCategory, updateNextPage }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box sx={{ textAlign: "center", width: 350 }}>
          <List>
            <ListSubheader>Search Filters</ListSubheader>
            <ListItem>
              <CategoriesSelector
                updateCat={updateCategory}
                updateNextPage={updateNextPage}
              />
            </ListItem>
            <ListItem disablePadding>
              <SearchFilters currentQuery={filters}></SearchFilters>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Button endIcon={<TuneIcon />} onClick={() => setOpen(!open)}>
        <span className="price">Filters</span>
      </Button>
    </>
  );
};

export default HamburgerFilters;
