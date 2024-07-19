import { Grid } from "@mui/material";
import ResultItem from "./ResultItem";

// TODO: change the grid style

export default function ResultBox({
  results,
  recipesIds,
  isLoading,
  error,
  onAdd,
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
