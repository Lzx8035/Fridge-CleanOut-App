import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function IngredientItem({ item, onDelete }) {
  return (
    <>
      <Divider variant="inset" />
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(item.id)}
          >
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "#f3e8f5", fontSize: "2rem" }}>
            {item.emoji ? item.emoji : item.name}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={item.quantity} />
      </ListItem>
    </>
  );
}
