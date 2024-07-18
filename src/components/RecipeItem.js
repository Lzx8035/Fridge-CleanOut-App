import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function RecipeItem({ item, onDelete }) {
  return (
    <>
      <Divider />
      <ListItem
        alignItems="flex-start"
        sx={{
          gap: 2,
        }}
      >
        <ListItemAvatar>
          <img alt={item.title} src={item.image} style={{ height: "6rem" }} />
        </ListItemAvatar>
        <ListItemText
          primary={item.title}
          secondary={`Missed ingredients count: ${item.missedIngredientCount},
    Used ingredients count: ${item.usedIngredientCount},`}
          primaryTypographyProps={{ fontWeight: "bold" }}
          secondaryTypographyProps={{ color: "text.secondary" }}
        />
        <IconButton onClick={() => onDelete(item.id)}>
          <DeleteIcon sx={{ color: "#bbb", fontSize: "2rem" }} />
        </IconButton>
      </ListItem>
    </>
  );
}
