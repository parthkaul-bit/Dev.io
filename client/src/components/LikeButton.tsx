import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const LikeButton = ({ blogId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/likes/${blogId}`
        );
        // Set likes count to the number of likes
        setLikesCount(data.likes.length);
      } catch (error) {
        console.error("Failed to fetch likes", error);
      }
    };
    fetchLikes();
  }, [blogId]);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/likes/status`,
          {
            params: { blog_id: blogId, user_id: userId },
          }
        );
        setLiked(data.liked);
      } catch (error) {
        console.error("Error checking like status", error);
      }
    };
    checkLikeStatus();
  }, [blogId, userId]);

  const handleLike = async () => {
    try {
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { blog_id: blogId, user_id: userId },
      };

      if (liked) {
        await axios.delete(`http://localhost:8080/api/likes/`, requestConfig);
        setLikesCount((prev) => prev - 1);
      } else {
        await axios.post(
          `http://localhost:8080/api/likes/`,
          { blog_id: blogId, user_id: userId },
          requestConfig
        );
        setLikesCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/unliking blog", error);
    }
  };

  return (
    <div>
      <IconButton onClick={handleLike} color={liked ? "error" : "default"}>
        <FavoriteIcon />
      </IconButton>
      <span>{likesCount}</span>
    </div>
  );
};

export default LikeButton;
