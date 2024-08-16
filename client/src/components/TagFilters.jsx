import React from "react";
import { Paper, Typography, Chip, Box } from "@mui/material";

const tags = ["React", "JavaScript", "Web Development", "Material-UI", "CSS"];

const TagFilters = () => {
  return (
    <Box mx={{ xs: 2, sm: 8, md: 12 }} mt={2} overflow="auto">
      {/* <Typography
        variant="subtitle1"
        fontSize={{ xs: "16px", md: "20px" }}
        gutterBottom
      >
        TAGS
      </Typography> */}
      <Box>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            style={{ margin: "4px" }}
            clickable
            size="small"
          />
        ))}
      </Box>
    </Box>
  );
};

export default TagFilters;
