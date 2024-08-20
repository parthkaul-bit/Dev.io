import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, Grid, Box, Avatar } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:8080/api/blogs");
        setBlogs(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <Box mx={{ xs: 2, sm: 8, md: 12 }}>
      <Typography
        variant="subtitle1"
        fontSize={{ xs: "20px", md: "24px" }}
        textAlign={"center"}
        gutterBottom
      >
        FEATURED BLOGS
      </Typography>
      {blogs.map((blog, index) => (
        <Paper
          key={index}
          style={{ padding: "16px", marginBottom: "24px" }}
          elevation={3}
        >
          <Grid container spacing={2}>
            {/* Blog Image */}
            <Grid item xs={12} md={4}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "200px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Grid>

            {/* Blog Details */}
            <Grid item xs={12} md={8}>
              <Box mb={{ lg: 4 }}>
                <Typography variant="h5" gutterBottom>
                  {blog.title}
                </Typography>{" "}
                <Typography variant="subtitle2" gutterBottom>
                  {blog.body.slice(0, 100) + `...`}
                </Typography>
              </Box>
              {/* Author Info */}
              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "8px" }}
              >
                <Avatar
                  style={{ marginRight: "8px" }}
                  src={blog.author?.avatar}
                ></Avatar>

                <div>
                  <Typography variant="body1">
                    {blog.author?.username || "anonymous"}
                  </Typography>
                </div>
              </Grid>
              {/* Read More Button */}
              <Link to={`/blog/${blog._id}`}>
                <Button variant="outlined" color="primary">
                  Read More
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default BlogList;
