import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import appleImg from "../asset/apple-pie.png";

export default function RecipeItem() {
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
          {/* <img alt="apple pie" src="https://i.pravatar.cc/48" /> */}
          <img alt="apple pie" src={appleImg} style={{ height: "6rem" }} />
        </ListItemAvatar>
        <ListItemText
          primary="Apple-pie"
          secondary="30 mins"
          primaryTypographyProps={{ fontWeight: "bold" }}
          secondaryTypographyProps={{ color: "text.secondary" }}
        />
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </>
  );
}
