import React, { useEffect, useState } from "react";
import { Paper, Typography, Button, Grid, Box } from "@mui/material";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1721993739400-a95e9eb7b4a8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1663021683225-1deeddbaf5b7?q=80&w=1862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1719431103422-ddfdb74aee85?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1633536309025-070cbbffabd6?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1627669727178-f178a2b93331?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);

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

  console.log("Blogs state:", blogs);

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
                  src={images[index]}
                  alt={blog.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Grid>

            {/* Blog Details */}
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                {blog.title}
              </Typography>{" "}
              <Typography variant="subtitle2" gutterBottom>
                {blog.body.slice(0, 100) + `...`}
              </Typography>
              {/* Author Info */}
              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "8px" }}
              >
                <div>
                  <Typography variant="body1">
                    {blog.author?.username || "anonymous"}
                  </Typography>
                </div>
              </Grid>
              {/* Read More Button */}
              <Button variant="outlined" color="primary">
                Read More
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default BlogList;
