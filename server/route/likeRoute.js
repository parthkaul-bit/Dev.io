const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const authMiddleware = require("../middleware/authMiddleware");

// Route to like a blog
router.post("/", authMiddleware, likeController.likeBlog);

// Route to unlike a blog
router.delete("/", authMiddleware, likeController.unlikeBlog);

router.get("/status", likeController.getLikeStatus);

router.get("/:blogId", likeController.getAllLikesForBlog);

module.exports = router;
