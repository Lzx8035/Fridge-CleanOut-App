import React, { useEffect } from "react";
import { useState } from "react";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import LeftBox from "./LeftBox";
import RightBox from "./RightBox";
import ResultBox from "./ResultBox";
import LearnMore from "./LearnMore";
import useLocalStorageStage from "./useLocalStorage";

// TODO
// add LearnMore page and complete fetch details for LearnMore
// add router for LearnMore Page

const InitialIngredients = [
  { id: 1001, name: "potato", quantity: "100g", emoji: "🥔" },
  { id: 1022, name: "garlic", quantity: "5", emoji: "🧄" },
  { id: 1333, name: "tomato", quantity: "2", emoji: "🍅" },
  { id: 1444, name: "tofu", quantity: "500g", emoji: "" },
  { id: 1555, name: "salmon", quantity: "500g", emoji: "🍣" },
  //   // { id: 1666, name: "pork", quantity: "4lb" },
  //   // { id: 1777, name: "chicken", quantity: "1kg" },
  //   // { id: 1888, name: "beef", quantity: "5lb" },
  //   // { id: 1999, name: "carrot", quantity: "500g" },
  //   // { id: 2000, name: "onion", quantity: "4" },
  //   // { id: 2111, name: "bell pepper", quantity: "10" },
  //   // { id: 2222, name: "mushroom", quantity: "20" },
];

///////// Create LearnMore Page
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

////////////////////////////////////////////////////////////////////////
function App() {
  const [showResults, setShowResults] = useState(false);
  const [learnMore, setLearnMore] = useState(null); // recipe id
  const [ingredients, setIngredients] = useLocalStorageStage(
    InitialIngredients,
    "ingredients"
  );
  const [recipes, setRecipes] = useLocalStorageStage([], "recipes");
  const recipesIds = recipes.map((item) => item.id);

  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "bd8e5f0053c7473ebebedb215a6c2d9a";

  const handleCloseResult = () => {
    setShowResults(false);
  };

  const handleAddIngredient = (newIngredient) => {
    setIngredients((prevIngredients) => {
      const isExisting = prevIngredients.find(
        (ing) => ing.name === newIngredient.name
      );

      if (!isExisting) {
        return [...prevIngredients, newIngredient];
      } else {
        alert("Can not add the same ingredient 👉👈");
        return prevIngredients;
      }
    });
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
    setTimeout(() => {
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== id)
      );
    }, 300);
  };

  const handleDeleteOneRecipe = (id) => {
    setTimeout(() => {
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    }, 300);
  };

  const fetchResults = async (page = 1) => {
    if (ingredients.length === 0) {
      setError("");
      setResults([]);
      return;
    }

    const offset = (page - 1) * 12;
    const ingredientsParam = ingredients.map((item) => item.name).join(",+");
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsParam}&ranking=1&ignorePantry=true&apiKey=${apiKey}&number=12&offset=${offset}`;

    try {
      setIsLoading(true);
      setError("");

      const res = await fetch(url);
      if (!res.ok) throw new Error("Something went wrong with fetch result 🤪");

      const data = await res.json();
      if (data.Response === "False") throw new Error("Recipes not found 🥲");

      setResults(data);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchResult = () => {
    setShowResults(true);
    fetchResults();
  };

  const handleAddRecipe = (newItem) => {
    setRecipes((preRecipes) => {
      const isExisting = preRecipes.find((recipe) => recipe.id === newItem.id);
      return !isExisting ? [...preRecipes, newItem] : preRecipes;
    });
  };

  useEffect(() => {
    fetchResults(page);
  }, [page]);

  // const handleOpenLearnMore = (id) => {
  //   setLearnMore(id);
  // };

  // const handleCloseLearnMore = () => {
  //   setLearnMore(null);
  // };

  return (
    <div className="App">
      {!learnMore ? (
        <>
          <Header onClose={handleCloseResult} showResults={showResults} />
          <LeftBox
            onSearch={handleFetchResult}
            onClean={handleCleanAllIngredient}
            onDelete={handleDeleteOneIngredient}
            ingredients={ingredients}
            onAdd={handleAddIngredient}
            isLoading={isLoading}
          />
          {!showResults ? (
            <>
              <MiddleBox />
              <RightBox
                recipes={recipes}
                onDelete={handleDeleteOneRecipe}
                // onOpen
              />
            </>
          ) : (
            <ResultBox
              results={results}
              recipesIds={recipesIds}
              isLoading={isLoading}
              error={error}
              onAdd={handleAddRecipe}
              page={page}
              onSetPage={setPage}
              // onOpen
            />
          )}
        </>
      ) : (
        <LearnMore learnMore={learnMore} />
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
          <label>Clean my fridge</label>
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

function MiddleBox() {
  return (
    <div
      className="middle-box"
      style={{ fontFamily: "Third", color: "#f3e8f5" }}
    >
      <label>Get your recipes!</label>
    </div>
  );
}

export default App;
