import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogInfo } from "../utils/getBlogInfo";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBlogInfo(id);
        setBlog(blogData);
      } catch (error) {
        console.error("Failed to fetch blog information", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
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

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, padding: { xs: 2, sm: 3 } }}>
      <Paper elevation={3} sx={{ padding: { xs: 2, sm: 3 }, borderRadius: 2 }}>
        <Box
          component="img"
          src={blog.image}
          alt={blog.title}
          sx={{
            width: "100%",
            height: { xs: "200px", sm: "300px", md: "400px" }, // Responsive image height
            objectFit: "cover",
            marginBottom: 3,
            borderRadius: 2,
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: "1.8rem", sm: "2.4rem" } }}
        >
          {blog.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          gutterBottom
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          {`By ${blog.author.username} • ${new Date(
            blog.createdAt
          ).toLocaleDateString()}`}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            marginTop: 3,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            overflowX: "auto",
            "& pre": {
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            },
            "& code": {
              backgroundColor: "#f4f4f4",
              color: "#333",
              borderRadius: 1,
              padding: 0.2,
            },
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: blog.body }} />
        </Typography>
      </Paper>
    </Container>
  );
}

export default BlogDetail;
