import { useState } from "react";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";

import IngredientItem from "./IngredientItem";
import CustomButton from "./CustomButton";

export default function LeftBox({
  ingredients,
  onSearch,
  onClean,
  onDelete,
  onAdd,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => {
    setIsOpen((isopen) => !isOpen);
  };

  return (
    <div className="left-box">
      <div>
        <h3 style={{ fontFamily: "Second", color: "#6eada8" }}>
          <label>What is in your fridge Today?</label>
          <IconButton
            aria-label="add ingredient"
            onClick={() => handleToggleOpen()}
          >
            <AddCircleIcon sx={{ fontSize: 40, color: "#a0f1ea" }} />
          </IconButton>
        </h3>
        <List
          sx={{
            overflowY: "auto",
            flexGrow: 1,
            maxHeight: "32rem",
            minHeight: "32rem",
          }}
        >
          {ingredients.map((item) => (
            <IngredientItem key={item.id} item={item} onDelete={onDelete} />
          ))}
        </List>
      </div>

      <Stack direction="row" spacing={1}>
        <CustomButton variant="contained" onClick={() => onClean()}>
          Clean all
        </CustomButton>
        <CustomButton variant="contained" onClick={() => onSearch()}>
          Search
        </CustomButton>
      </Stack>

      {isOpen && <AddIngredientForm onClose={handleToggleOpen} onAdd={onAdd} />}
    </div>
  );
}

function AddIngredientForm({ onClose, onAdd }) {
  const [emoji, setEmoji] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      alert("Name of ingredient can not be empty 👉👈");
      return;
    }
    onAdd({ emoji: emoji ? emoji : name, name, quantity, id: uuidv4() });
    onClose();
  };

  return (
    <div>
      <div className="blur-overlay"></div>

      <div className="add-indredient-form">
        <Stack direction="row" spacing={1} alignItems="center">
          <h1
            style={{
              display: "inline",
              color: "#6eada8",
              fontFamily: "Second",
              fontSize: "3rem",
            }}
          >
            Add a new ingredient!
          </h1>
          <IconButton aria-label="add ingredient" onClick={() => onClose()}>
            <HighlightOffIcon sx={{ fontSize: 40, color: "#a0f1ea" }} />
          </IconButton>
        </Stack>

        <Box
          onSubmit={(e) => handleSubmit(e)}
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="emoji"
            label="Emoji"
            variant="outlined"
            style={{ color: "#9FF", width: "5rem" }}
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          />
          <TextField
            required
            id="name"
            label="Name"
            variant="outlined"
            style={{ width: "16rem" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="amout"
            label="Amout"
            variant="outlined"
            style={{ width: "10rem" }}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <CustomButton
            type="submit"
            style={{
              color: "#fff",
              maxWidth: "34.5rem",
              marginTop: "3rem",
              fontSize: "2rem",
            }}
          >
            Add to my ingredients
          </CustomButton>
        </Box>
      </div>
    </div>
  );
}
