
const packager_base_recipes = [
    {
        name: "packaged-rocket-fuel",
        output: 60,
        ingredients: {
            "rocket-fuel": 120,
            "empty-fluid-tank": 60,
        },
    },
    {
        name: "packaged-ionized-fuel",
        output: 40,
        ingredients: {
            "ionized-fuel": 80,
            "empty-fluid-tank": 40,
        },
    },
    {
        name: "packaged-turbofuel",
        output: 20,
        ingredients: {
            "turbofuel": 20,
            "empty-canister": 20,
        },
    },
];

const packager_alt_recipes = [
];

for (let recipe of packager_base_recipes) {
    recipe.base = true;
}
const packager_recipes = packager_base_recipes.concat(packager_alt_recipes);

export default packager_recipes;