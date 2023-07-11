import { useParams, useHistory } from "react-router-dom";
import { getMealById } from "../api";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
const Recipe = () => {
  const { id } = useParams();
  const [showRecipe, setShowRscipe] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const { goBack } = useHistory();

  const handleRecipeShow = () => {
    setShowRscipe(!showRecipe);
  };

  useEffect(() => {
    getMealById(id).then((data) => setRecipe(data.meals[0]));
  }, [id]);
  return (
    <>
      <button className="btn mb-5" onClick={goBack}>
        Go back
      </button>
      {!recipe.idMeal ? (
        <Loader />
      ) : (
        <div className="recipe">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h1>{recipe.strMeal}</h1>
          <h6>
            <b>Category: </b>
            {recipe.strCategory}
          </h6>
          {recipe.strArea ? (
            <h6>
              <b>Area: </b>
              {recipe.strArea}
            </h6>
          ) : null}
          <p>{recipe.strInstructions}</p>
          <button className="btn" onClick={handleRecipeShow}>
            {!showRecipe ? "Show Recipe" : "Hide Recipe"}
          </button>
          {showRecipe ? (
            <table className="centered">
              <thead>
                <tr>
                  <th>Ingridient</th>
                  <th>Measure</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(recipe).map((key) => {
                  if (key.includes("Ingredient") && recipe[key]) {
                    return (
                      <tr>
                        <td>{recipe[key]}</td>
                        <td>{recipe[`strMeasure${key.slice(13)}`]}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          ) : null}

          {recipe.strYoutube ? (
            <div className="row">
              <h5>Video recipe</h5>
              <iframe
                src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(
                  -11
                )}`}
                title={id}
                
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Recipe;
