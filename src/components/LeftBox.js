import { useState } from "react";

import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import IngredientItem from "./IngredientItem";

const CustomButton = styled(Button)`
  font-family: "Second", sans-serif;
  background-color: #87bbb7;
  font-size: 1.4rem;
  &:hover {
    background-color: #6eada8 !important;
  }
`;

export default function LeftBox({ ingredients, onSearch, onClean, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => {
    setIsOpen((isopen) => !isOpen);
  };

  return (
    <div className="left-box">
      <div>
        <h3 style={{ fontFamily: "Second", color: "#6eada8" }}>
          What is in your fridge Today?
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
            maxHeight: "35rem",
            minHeight: "35rem",
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

      {isOpen && (
        <>
          <div class="blur-overlay"></div>
          <div className="add-indredient-form">
            <IconButton
              aria-label="add ingredient"
              onClick={() => handleToggleOpen()}
            >
              <HighlightOffIcon sx={{ fontSize: 40, color: "#a0f1ea" }} />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}
