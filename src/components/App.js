import React, { useState, useEffect, useCallback } from "react";

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
// complete fetch function and LearnMore Page
// add router for LearnMore Page

////////////////////////////////////////////////////////////////////////
function App() {
  const [showResults, setShowResults] = useState(false);
  const [learnMore, setLearnMore] = useState(null); // item !!!
  const [ingredients, setIngredients] = useLocalStorageStage([], "ingredients");
  const [recipes, setRecipes] = useLocalStorageStage([], "recipes");
  const recipesIds = recipes.map((item) => item.id);
  const [detailImage, setDetailImage] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const fetchResults = useCallback(
    async (page = 1) => {
      if (ingredients.length === 0) {
        setError("");
        setResults([]);
        return;
      }
      const numberPerPage = 12;
      const apiKey = "bd8e5f0053c7473ebebedb215a6c2d9a";

      const offset = (page - 1) * numberPerPage;
      const ingredientsParam = ingredients.map((item) => item.name).join(",+");
      const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsParam}&ranking=1&ignorePantry=true&apiKey=${apiKey}&number=${numberPerPage}&offset=${offset}`;

      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(url);
        if (!res.ok)
          throw new Error("Something went wrong with fetch result 🤪");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Recipes not found 🥲");
        if (data.length === 0) {
          setPage((page) => page - 1);
          alert("It is the last page 🥲");
        }

        setResults(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [ingredients]
  );

  const handleFetchResult = () => {
    setShowResults(true);
    setPage(1);
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
  }, [fetchResults, page]);

  async function fetchMoreDetail(id) {
    const apiKey = "c1e1dd49201c4cdf9de364c150494c25";
    const url = `https://api.spoonacular.com/recipes/${id}/card?apiKey=${apiKey}&mask=heartMask`;

    try {
      setIsLoadingDetail(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDetailImage(data.url);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setDetailImage(null);
    } finally {
      setIsLoadingDetail(false);
    }
  }

  const handleOpenLearnMore = (item) => {
    setLearnMore(() => item);
    fetchMoreDetail(item.id);
  };

  const handleCloseLearnMore = () => {
    setLearnMore(null);
  };

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
                onOpen={handleOpenLearnMore}
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
              onOpen={handleOpenLearnMore}
            />
          )}
        </>
      ) : (
        <LearnMore
          learnMore={learnMore}
          onClose={handleCloseLearnMore}
          recipesIds={recipesIds}
          onAdd={handleAddRecipe}
          detailImage={detailImage}
          isLoadingDetail={isLoadingDetail}
        />
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
