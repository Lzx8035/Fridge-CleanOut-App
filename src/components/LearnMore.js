import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Stack } from "@mui/material";

export default function LearnMore({
  learnMore,
  onClose,
  recipesIds,
  onAdd,
  detailImage,
  isLoadingDetail,
}) {
  const isLiked = recipesIds.find((recipeId) => learnMore.id === recipeId);

  return (
    <div style={{ fontSize: "10rem" }}>
      {!isLoadingDetail ? (
        <Stack direction={"row"}>
          <IconButton aria-label="back" onClick={() => onClose()}>
            <ArrowBackIosIcon sx={{ fontSize: 40, color: "#a0f1ea" }} />
          </IconButton>
          {detailImage && (
            <img
              src={detailImage}
              alt="Recipe Card"
              style={{ maxHeight: "60rem" }}
            />
          )}
          <IconButton
            aria-label="add to favorites"
            onClick={() => onAdd(learnMore)}
            style={{ height: "10rem", marginTop: "30rem" }}
          >
            <FavoriteIcon
              sx={{
                fontSize: "8rem",
                color: `${isLiked ? "#faa2c1" : "#999"}`,
                disabled: isLiked ? true : false,
              }}
            />
          </IconButton>
        </Stack>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
