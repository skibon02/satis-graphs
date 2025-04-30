import React, { memo } from "react";
import Select from 'react-select';
import { all_recipes } from "../satis/calculator";
import right_arrow from "../assets/right-arrow.png"
import {RcImage} from "./util.jsx"


let SelectedRecipes = memo(function SelectedRecipes({ selectedRecipes, selectRecipe }) {
    const recipeItems = Object.entries(selectedRecipes).map(([name, recipe_num]) => {
        let recipes = all_recipes(name);
        let recipe = recipes[recipe_num];

        return (
            <div key={name}>
                <RcImage rcname={name}/>
                <Select 
                    classNames={{
                        control: (state) => 'selected',
                        option: (state) => 'item',
                        menuList: (state) => 'container'
                    }}
                    formatOptionLabel={recipe => {
                        let ing_imgs = Object.keys(recipe.ingredients).map((ing)=> {
                            return <RcImage key={ing} rcname={ing}/>
                        });
                        let output_imgs = [recipe.name];
                        if (recipe.name2) {
                            output_imgs.push(recipe.name2);
                        }

                        output_imgs = output_imgs.map(name => {
                            return <RcImage key={name} rcname={name}/>
                        })
                        return <>
                            {ing_imgs}
                            <img className="arrow icon" src={right_arrow} />
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
                    getOptionValue={(option)=>{return option.output + Object.keys(option.ingredients).join("")}}
                    value={recipe}
                    options={recipes}/>
            </div>
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
})

export default SelectedRecipes;