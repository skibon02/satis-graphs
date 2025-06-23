
const converter_base_recipes = [
    {
        name: "ficsite-ingot",
        output: 30,
        ingredients: {
            "reanimated-sam": 60,
            "aluminum-ingot": 120,
        },
    },
    {
        name: "ficsite-ingot",
        output: 15,
        ingredients: {
            "reanimated-sam": 45,
            "caterium-ingot": 60,
        },
    },
    {
        name: "ficsite-ingot",
        output: 10,
        ingredients: {
            "reanimated-sam": 40,
            "iron-ingot": 240,
        },
    },
    {
        name: "dark-matter-residue",
        output: 100,
        ingredients: {
            "reanimated-sam": 50,
        },
    },
    {
        name: "time-crystal",
        output: 6,
        ingredients: {
            "diamonds": 12,
        },
    },
];

const converter_alt_recipes = [
    {
        name: "diamonds",
        output: 15,
        ingredients: {
            "coal": 120,
            "quartz-crystal": 45,
        },
    },
    {
        name: "ionized-fuel",
        output: 200,
        name2: "compacted-coal",
        output2: 40,
        ingredients: {
            "packaged-rocket-fuel": 240,
            "dark-matter-crystal": 80,
        },
    },
];

for (let recipe of converter_base_recipes) {
    recipe.base = true;
}
const converter_recipes = converter_base_recipes.concat(converter_alt_recipes);

export default converter_recipes;