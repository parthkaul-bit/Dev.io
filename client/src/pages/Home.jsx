import React from "react";
import { Grid } from "@mui/material";
import BlogList from "../components/BlogList";
import TagFilters from "../components/TagFilters";

const Home = () => {
  return (
    <Grid
      container
      spacing={2}
      direction={{ xs: "column", md: "reverse-column" }}
    >
      {/* Tags Section */}
      <Grid item xs={12} md={4}>
        <TagFilters />
      </Grid>

      {/* Blog List Section */}
      <Grid item xs={12} md={8}>
        <BlogList />
      </Grid>
    </Grid>
  );
};

export default Home;
