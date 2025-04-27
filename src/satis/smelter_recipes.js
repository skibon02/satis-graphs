

const smelter_base_recipes = [
    {
        name: "caterium-ingot",
        output: 15,
        ingredients: {
            "caterium-ore": 45,
        }
    },
    {
        name: "copper-ingot",
        output: 30,
        ingredients: {
            "copper-ore": 30,
        }
    },
    {
        name: "iron-ingot",
        output: 30,
        ingredients: {
            "iron-ore": 30,
        }
    },
];

const smelter_alt_recipes = [
    {
        name: "aluminum-ingot",
        output: 30,
        ingredients: {
            "aluminum-scrap": 60
        }
    },
];

for (let recipe of smelter_base_recipes) {
    recipe.base = true
}
const smelter_recipes = smelter_base_recipes.concat(smelter_alt_recipes);

export default smelter_recipes;