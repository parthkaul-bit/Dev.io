import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Avatar,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = ({ selectedTags }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/blogs");
        setBlogs(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
  // Filter blogs based on selected tags
  const filteredBlogs = blogs.filter((blog) =>
    selectedTags.length === 0
      ? true
      : blog.tags.some((tag) => selectedTags.includes(tag))
  );

  return (
    <Box mx={{ xs: 2, sm: 4, md: 8 }} my={6}>
      <Grid container spacing={6}>
        {filteredBlogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link to={`/blog/${blog._id}`} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  border: "none",
                  backgroundColor: "#1c1c1c",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                {/* Blog Image*/}
                <CardMedia
                  component="img"
                  image={blog.image}
                  alt={blog.title}
                  sx={{
                    aspectRatio: "16/9",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    display: "flex",
                    backgroundColor: "#1c1c1c",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "none",

                    flexGrow: 1, // Ensures equal height for all cards
                  }}
                >
                  {/* Blog Title */}
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {blog.title}
                  </Typography>

                  {/* Blog Excerpt */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6, mb: 2 }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog.body.slice(0, 120) + "...",
                      }}
                    />
                  </Typography>

                  {/* Bottom Section (Author + Read More Button) */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mt: "auto",
                    }}
                  >
                    {/* Author Info */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={blog.author?.avatar}
                        sx={{ width: 36, height: 36, mr: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {blog.author?.username || "Anonymous"}
                      </Typography>
                    </Box>

                    {/* Read More Button
                    <Link
                      to={`/blog/${blog._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained" color="primary" size="small">
                        Read More
                      </Button>
                    </Link> */}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;
