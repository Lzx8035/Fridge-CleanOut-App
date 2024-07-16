import React from "react";
import { useState } from "react";

import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Grid } from "@mui/material";

import ResultItem from "./ResultItem";
import RecipeItem from "./RecipeItem";
import LeftBox from "./LeftBox";

// const apiKey = "bd8e5f0053c7473ebebedb215a6c2d9a";

// ///// Search Recipes by Ingredients
// async function searchRecipesByIngredients(ingredients) {
//   const ingredientsParam = ingredients.join(",+");
//   const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsParam}&ranking=1&ignorePantry=true&apiKey=${apiKey}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//   }
// }
const InitialIngredients = [
  { id: 1001, name: "potato", quantity: "100g", emoji: "🥔" },
  { id: 1022, name: "garlic", quantity: "5", emoji: "🧄" },
  { id: 1333, name: "tomato", quantity: "2", emoji: "🍅" },
  { id: 1444, name: "tofu", quantity: "500g", emoji: "" },
  { id: 1555, name: "salmon", quantity: "500g", emoji: "🍣" },
  // { id: 1666, name: "pork", quantity: "4lb" },
  // { id: 1777, name: "chicken", quantity: "1kg" },
  // { id: 1888, name: "beef", quantity: "5lb" },
  // { id: 1999, name: "carrot", quantity: "500g" },
  // { id: 2000, name: "onion", quantity: "4" },
  // { id: 2111, name: "bell pepper", quantity: "10" },
  // { id: 2222, name: "mushroom", quantity: "20" },
];
// // searchRecipesByIngredients(ingredients);

// ///// Get Recipe Information
// async function getSimilarRecipes(id) {
//   const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//   }
// }
// const id = 662276;
// // getSimilarRecipes(id);

// /////// Create Recipe Card
// async function createRecipeCard(id) {
//   const url = `https://api.spoonacular.com/recipes/${id}/card?apiKey=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//   }
// }
// // createRecipeCard(id);

// /////// Ingredients by ID Widget
// // BUG
// async function getIngredientsbyIDWidget(id) {
//   const url = `https://api.spoonacular.com/recipes/${id}/ingredientWidget?apiKey=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response;
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching recipes:", error);
//   }
// }

// getIngredientsbyIDWidget(id);

////////////////////////////////////////////////////////////////////////
function App() {
  const [showResults, setShowResults] = useState(false);
  const [ingredients, setIngredients] = useState(InitialIngredients);
  // const [recipes, setRecipes] = useState([]);

  const handleCloseResult = () => {
    setShowResults(false);
  };

  const handleFetchResult = () => {
    setShowResults(true);
  };

  const handleCleanAllIngredient = () => {
    if (ingredients.length > 0) {
      const result = window.confirm(
        "Are you sure you want delete all of the ingredients?"
      );
      result && setIngredients([]);
    }
  };

  const handleDeleteOneIngredient = (id) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
    console.log("clicked");
  };

  return (
    <div className="App hidden">
      <Header onClose={handleCloseResult} showResults={showResults} />
      <LeftBox
        onSearch={handleFetchResult}
        onClean={handleCleanAllIngredient}
        onDelete={handleDeleteOneIngredient}
        ingredients={ingredients}
      />
      {!showResults ? (
        <>
          <MiddleBox />
          <RightBox />
        </>
      ) : (
        <ResultBox />
      )}
    </div>
  );
}

function Header({ onClose, showResults }) {
  return (
    <div className="header">
      <Stack direction="row" spacing={1}>
        <KitchenIcon sx={{ fontSize: 50, color: "#e3c8e8" }} />
        <h1 style={{ fontFamily: "Header", color: "#e3c8e8" }}>
          Clean my fridge
        </h1>
      </Stack>
      {showResults && (
        <IconButton aria-label="back" onClick={() => onClose()}>
          <ArrowBackIosIcon sx={{ fontSize: 40, color: "#a0f1ea" }} />
        </IconButton>
      )}
    </div>
  );
}

// const CustomButton = styled(Button)`
//   font-family: "Second", sans-serif;
//   background-color: #87bbb7;
//   font-size: 1.4rem;
//   &:hover {
//     background-color: #6eada8 !important;
//   }
// `;

// function LeftBox({ ingredients, onSearch, onClean, onDelete }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const handleToggleOpen = () => {
//     setIsOpen((isopen) => !isOpen);
//   };

//   return (
//     <div className="left-box">
//       <div>
//         <h3 style={{ fontFamily: "Second", color: "#6eada8" }}>
//           What is in your fridge Today?
//           <IconButton aria-label="add ingredient">
//             <AddCircleIcon sx={{ fontSize: 40, color: "#a0f1ea" }} />
//           </IconButton>
//         </h3>
//         <List
//           sx={{
//             overflowY: "auto",
//             flexGrow: 1,
//             maxHeight: "35rem",
//             minHeight: "35rem",
//           }}
//         >
//           {ingredients.map((item) => (
//             <IngredientItem key={item.id} item={item} onDelete={onDelete} />
//           ))}
//         </List>
//       </div>

//       <Stack direction="row" spacing={1}>
//         <CustomButton variant="contained" onClick={() => onClean()}>
//           Clean all
//         </CustomButton>
//         <CustomButton variant="contained" onClick={() => onSearch()}>
//           Search
//         </CustomButton>
//       </Stack>

//       {isOpen && (
//         <>
//           <div class="blur-overlay"></div>
//           <div className="add-indredient-form"></div>
//         </>
//       )}
//     </div>
//   );
// }

function MiddleBox() {
  return (
    <div
      className="middle-box"
      style={{ fontFamily: "Third", color: "#f3e8f5" }}
    >
      Get your recipes!
    </div>
  );
}

function RightBox() {
  return (
    <div className="right-box">
      <h3 style={{ fontFamily: "Second", color: "#6eada8" }}>
        My favourite recipe
      </h3>

      <List
        sx={{
          overflowY: "auto",
          flexGrow: 1,
          maxHeight: "45rem",
        }}
      >
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
      </List>
    </div>
  );
}

function ResultBox() {
  return (
    <div className="recipes-result-box">
      <Grid
        container
        spacing={1}
        sx={{
          overflowY: "auto",
          flexGrow: 1,
          maxHeight: "50rem",
          minHeight: "50rem",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <ResultItem />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
