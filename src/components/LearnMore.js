import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function LearnMore({ learnMore, onClose, recipesIds, onAdd }) {
  const isLiked = recipesIds.find((recipeId) => learnMore.id === recipeId);

  return (
    <div style={{ backgroundColor: "#e3c8e8", fontSize: "10rem" }}>
      Hello {learnMore.id}
      <IconButton aria-label="back" onClick={() => onClose()}>
        <ArrowBackIosIcon sx={{ fontSize: 40, color: "#a0f1ea" }} />
      </IconButton>
      <IconButton
        aria-label="add to favorites"
        onClick={() => onAdd(learnMore)}
      >
        <FavoriteIcon
          sx={{
            fontSize: "3rem",
            color: `${isLiked ? "#faa2c1" : "#999"}`,
            disabled: isLiked ? true : false,
          }}
        />
      </IconButton>
    </div>
  );
}
