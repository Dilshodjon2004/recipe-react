import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getFilterCategory } from "../api";
import Loader from "../components/Loader";
import MealList from "../components/MealList";

const Category = () => {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const { goBack } = useHistory();

  useEffect(() => {
    getFilterCategory(name).then((data) => setMeals(data.meals));
  }, [name]);

  return (
    <>
      <button className="btn" onClick={goBack}>Go Back</button>
      {!meals.length ? <Loader /> : <MealList meals={meals} />}
    </>
  );
};

export default Category;
