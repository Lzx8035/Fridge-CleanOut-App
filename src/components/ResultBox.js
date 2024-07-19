import { Grid, Stack } from "@mui/material";
import ResultItem from "./ResultItem";
import CustomButton from "./CustomButton";
import { useState } from "react";

// TODO: change the grid style

export default function ResultBox({
  results,
  recipesIds,
  isLoading,
  error,
  onAdd,
  page,
  onSetPage,
}) {
  return (
    <div className="recipes-result-box">
      {isLoading && <LoadingComponent />}
      {error && <ErrorComponent message={error} />}
      {!isLoading && !error && results.length > 0 && (
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
          {results.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item.id}
              style={{ maxHeight: "37rem", minHeight: "37rem" }}
            >
              <ResultItem item={item} onAdd={onAdd} recipesIds={recipesIds} />
            </Grid>
          ))}
          <Pagination page={page} onSetPage={onSetPage} />
        </Grid>
      )}
    </div>
  );
}

const LoadingComponent = () => {
  return (
    <div className="loading">
      <p>Loading recipes...</p>
    </div>
  );
};

const ErrorComponent = ({ message }) => {
  return (
    <div className="error">
      <p>Error: {message}</p>
    </div>
  );
};

// TODO
const Pagination = ({ page, onSetPage, error }) => {
  const handlePreviousPage = () => {
    page > 1 && onSetPage((page) => page - 1);
  };
  const handleNextPage = () => {
    onSetPage((page) => page + 1);
    if (error) onSetPage((page) => page - 1);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        padding: "10px",
      }}
    >
      <CustomButton onClick={handlePreviousPage}>Previous Page</CustomButton>
      <h1
        style={{
          fontFamily: "Third",
          fontSize: "3rem",
          color: "#6eada8",
          paddingLeft: "8rem",
        }}
      >
        Page {page}
      </h1>
      <CustomButton onClick={handleNextPage}>Next Page</CustomButton>
    </div>
  );
};
