import { Typography } from "@mui/material";
import React from "react";

const PageNotFound = () => {
  return (
    <Typography variant="h3" mt={35}>
      <span className="badge bg-danger mb-3 bg-success mx-2">404 Page Not Found</span>
    </Typography>
  );
};

export default PageNotFound;
