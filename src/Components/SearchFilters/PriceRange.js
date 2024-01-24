import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PriceRange = ({ currentQuery }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      parseInt(min) <= parseInt(max) &&
      (min > 0 || max > 0) &&
      (min !== "" || max !== "")
    ) {
      let query = `&salePrice>=${min}&salePrice<=${max}`;
      let filteredQuery = currentQuery
        .split("&")
        .filter(
          (newQuery) =>
            !newQuery.includes("salePrice>=") &&
            !newQuery.includes("salePrice<=")
        )
        .join("&");
      let link = filteredQuery.trim() + query.trim();
      link = link.split("&");
      let filters = link[2].length ? "&" + link.slice(2).join("&").trim() : "";
      let updatedLink = link[0] + "&page=1" + filters;
      currentQuery !== link && navigate(`/search/${updatedLink}`);
    } else if (min === "" && max === "") {
      let filteredQuery = currentQuery
        .split("&")
        .filter(
          (newQuery) =>
            !newQuery.includes("salePrice>=") &&
            !newQuery.includes("salePrice<=")
        )
        .join("&");
      navigate(`/search/${filteredQuery}`);
    }
  };
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    let minVal = currentQuery
      .split("&")
      .filter((query) => query.includes("salePrice>="))[0];
    setMin(minVal?.split("=")[1]);
    let maxVal = currentQuery
      .split("&")
      .filter((query) => query.includes("salePrice<="))[0];
    setMax(maxVal?.split("=")[1]);
  }, [currentQuery]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "min") {
      setMin(value);
    } else if (name === "max") {
      setMax(value);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container maxWidth={"150px"}>
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
            <TextField
              type="number"
              id="from"
              label="Max"
              variant="outlined"
              size="small"
              className="filter-field"
              name="max"
              value={max ? max : ""}
              onChange={handleChange}
              InputProps={{
                sx: {
                  borderRadius: 0,
                  width: "70px",
                  fontSize: "14px",
                  fontWeight: "bold",
                },
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              type="submit"
              sx={{ marginLeft: "15px",marginTop:"10px" }}
            >
              Find items
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PriceRange;
