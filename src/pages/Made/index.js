import React, { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';

import HorizontalCardDrink from '../../components/HorizontalCardDrink';
import HorizontalCardFood from '../../components/HorizontalCardFood';

import './styles.css';

function Made() {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [showFoods, setShowFoods] = useState(true);
  const [showDrinks, setShowDrinks] = useState(true);

  useEffect(() => {
    let allRecipes = [];
    if (localStorage.doneRecipes) { allRecipes = JSON.parse(localStorage.doneRecipes); }
    // const allRecipes = testSavedFoods;
    const allRecipesWithIndex = allRecipes.map((recipe, index) => ({ ...recipe, index }));
    console.log(allRecipesWithIndex);
    const foodsToSet = allRecipesWithIndex.filter((recipe) => recipe.type === 'comida');
    console.log(foodsToSet);
    const drinksToSet = allRecipesWithIndex.filter((recipe) => recipe.type === 'bebida');
    console.log(drinksToSet);
    setFoods(foodsToSet);
    setDrinks(drinksToSet);
  }, []);

  return (
    <main className="made-recipes">
      <Header title="Receitas Feitas" />
      <div className="buttons-div-made">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            setShowFoods(true);
            setShowDrinks(true);
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {
            setShowFoods(true);
            setShowDrinks(false);
          } }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setShowFoods(false);
            setShowDrinks(true);
          } }
        >
          Drinks
        </button>
      </div>
      {showFoods && foods.map((food, index) => (<HorizontalCardFood
        recipe={ food }
        index={ food.index }
        key={ index }
      />))}
      {showDrinks && drinks.map((drink, index) => (<HorizontalCardDrink
        recipe={ drink }
        index={
          showFoods
            ? drink.index
            : index
        }
        key={ index }
      />))}
    </main>
  );
}
export default Made;
