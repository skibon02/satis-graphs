import React from "react";
import Select from 'react-select';
import { all_recipes } from "../satis/calculator";
import right_arrow from "../assets/right-arrow.png"


function RcImage({ rcname }) {
    const baseUrl = import.meta.env.BASE_URL;
    
    return (
        <img src={`${baseUrl}satis-rc/${rcname}.webp`} />
    );
}

function SelectedRecipes({selectedRecipes, selectRecipe}) {
    const recipeItems = Object.entries(selectedRecipes).map(([name, recipe_num]) => {
        let recipes = all_recipes(name);
        let recipe = recipes[recipe_num];

        return (
            <>
            <RcImage rcname={name}/>
            <Select 
                classNames={{
                    control: (state) =>
                    state.isFocused ? 'item focused' : 'item',
                }}
                formatOptionLabel={recipe => {
                    let ing_imgs = Object.keys(recipe.ingredients).map((ing)=> {
                        return <RcImage rcname={ing}/>
                    });
                    let output_imgs = [recipe.name];
                    if (recipe.name2) {
                        output_imgs.push(recipe.name2);
                    }

                    output_imgs = output_imgs.map(name => {
                        return <RcImage rcname={name}/>
                    })
                    return <>
                        {ing_imgs}
                        <img className="arrow" src={right_arrow} />
                        {output_imgs}
                    </>
                }}
                onChange={(item)=> {
                    let recipe_num = recipes.findIndex(el => el == item);
                    selectRecipe({
                        name,
                        recipe_num
                    });
                }}
                value={recipe}
                options={recipes}/>
            </>
        )
    });
    return (
        <div
            className="selected-recipes">
            <p>Select alt recipes</p>
            <div className="recipe-selector-item">
                {recipeItems}
            </div>
        </div>
    )
}

export default SelectedRecipes;