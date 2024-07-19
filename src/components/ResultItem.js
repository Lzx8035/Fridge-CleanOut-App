import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";

export default function ResultItem({ item, onAdd, recipesIds }) {
  const isLiked = recipesIds.find((recipeId) => item.id === recipeId);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="180"
        image={item.image}
        alt={item.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => onAdd(item)}>
          <FavoriteIcon
            sx={{
              fontSize: "3rem",
              color: `${isLiked ? "#faa2c1" : "#999"}`,
              disabled: isLiked ? true : false,
            }}
          />
        </IconButton>
        <Button size="large">Learn More</Button>
      </CardActions>
    </Card>
  );
}
