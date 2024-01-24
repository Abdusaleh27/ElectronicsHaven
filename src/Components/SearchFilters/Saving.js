import { Box, Button, Grid, TextField } from "@mui/material";
import "./Styles/FilterStyles.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Saving = ({ currentQuery }) => {
  const navigate = useNavigate();
  const [min, setMin] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (min >= 0 && min !== "") {
      let query = `&dollarSavings>=${min}`;
      let filteredQuery = currentQuery
        .split("&")
        .filter((newQuery) => !newQuery.includes("dollarSavings>="))
        .join("&");
      let link = filteredQuery.trim() + query.trim();
      link = link.split("&");
      let filters = link[2].length ? "&" + link.slice(2).join("&").trim() : "";
      let updatedLink = link[0] + "&page=1" + filters;
      currentQuery !== link && navigate(`/search/${updatedLink}`);
    } else {
      let filteredQuery = currentQuery
        .split("&")
        .filter((newQuery) => !newQuery.includes("dollarSavings>="))
        .join("&");
      navigate(`/search/${filteredQuery}`);
    }
  };

  useEffect(() => {
    let currentVal = currentQuery
      .split("&")
      .filter((query) => query.includes("dollarSavings>="))[0];
    setMin(currentVal?.split("=")[1]);
  }, [currentQuery]);
  const handleChange = (e) => {
    const { value } = e.target;

    setMin(value);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container marginTop={-1}>
          <Grid item>
            <TextField
              type="number"
              id="from"
              label="Min"
              variant="outlined"
              size="small"
              className="filter-field"
              name="min"
              value={min ? min : ""}
              onChange={handleChange}
              InputProps={{
                sx: {
                  borderRadius: 0,
                  width: "65px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "3px",
                },
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{ marginLeft: "5px" }}
            >
              Go!
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Saving;
