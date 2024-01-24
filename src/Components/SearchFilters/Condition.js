import { Box } from "@mui/material";
import React from "react";
import CheckBoxFilter from "./CheckBoxFilter";

const Condition = ({ currentQuery }) => {
  return (
    <>
      <Box marginTop={"-20px"}>
        <CheckBoxFilter
          currentQuery={currentQuery}
          filterOne="condition=new"
          labelOne="New"
          idOne="new"
        />
        <CheckBoxFilter
          currentQuery={currentQuery}
          filterOne="condition=refurbished"
          labelOne="Refurbished"
          idOne="refurbished"
        />
        <CheckBoxFilter
          currentQuery={currentQuery}
          filterOne="preowned=true"
          labelOne="Pre-owned"
          idOne="pre-owned"
        />
      </Box>
    </>
  );
};

export default Condition;
