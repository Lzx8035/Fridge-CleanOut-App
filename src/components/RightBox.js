import List from "@mui/material/List";
import RecipeItem from "./RecipeItem";

export default function RightBox({ recipes, onDelete }) {
  return (
    <div className="right-box">
      <h3 style={{ fontFamily: "Second", color: "#6eada8" }}>
        <label>My favourite recipe</label>
      </h3>

      <List
        sx={{
          overflowY: "auto",
          flexGrow: 1,
          maxHeight: "45rem",
          minHeight: "45rem",
        }}
      >
        {recipes.map((item) => (
          <RecipeItem key={item.id} item={item} onDelete={onDelete} />
        ))}
      </List>
    </div>
  );
}
