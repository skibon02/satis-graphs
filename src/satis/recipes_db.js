import assembler_recipes from "./assembler_recipes";
import blender_recipes from "./blender_recipes";
import constructor_recipes from "./constructor_recipes";
import manufacturer_recipes from "./manufacturer_recipes";
import energy_recipes from "./energy_recipes.js";
import smelter_recipes from "./smelter_recipes";
import foundry_recipes from "./foundry_recipes";
import refinery_recipes from "./refinery_recipes";

const sources = [
    "sam",
    "iron-ore",
    "copper-ore",
    "raw-quartz",
    "coal",
    "caterium-ore",
    "bauxite",
    "limestone",
    "nitrogen-gas",
    "water",
    "crude-oil",
    "sulfur",
    "uranium",
    // "heavy-oil-residue",

    "power-shard",
    "excited-photonic-matter",
    "solid-biofuel",
]

const recipes = [
    //converter
    {
        name: "ficsite-ingot",
        output: 30,
        ingredients: {
            "reanimated-sam": 60,
            "aluminum-ingot": 120,
        }
    },
    {
        name: "ficsite-ingot",
        output: 15,
        ingredients: {
            "reanimated-sam": 45,
            "caterium-ingot": 60,
        }
    },
    {
        name: "ficsite-ingot",
        output: 10,
        ingredients: {
            "reanimated-sam": 40,
            "iron-ingot": 240,
        }
    },

    // alt recipes
    {
        name: "ficsonium-fuel-rod",
        output: 2.5,
        name2: "dark-matter-residue",
        output2: 50,
        ingredients: {
            "ficsonium": 5,
            "electromagnetic-control-rod": 5,
            "ficsite-trigon": 100,
            "excited-photonic-matter": 50,
        },
        machine: "quantum-encoder"
    },
    {
        name: "encased-plutonium-cell",
        output: 10,
        ingredients: {
            "non-fissile-uranium": 75,
            "aluminum-casing": 10,
        },
        machine: "particle-accelerator"
    },
    {
        name: "dark-matter-crystal",
        output: 30,
        ingredients: {
            "diamonds": 30,
            "dark-matter-residue": 150
        },
        machine: "particle-accelerator"
    },
    {
        name: "diamonds",
        output: 30,
        ingredients: {
            "coal": 600
        },
        machine: "particle-accelerator"
    },
    {
        name: "ficsonium",
        output: 10,
        ingredients: {
            "plutonium-waste": 10,
            "singularity-cell": 10,
            "dark-matter-residue": 200,
        },
        machine: "particle-accelerator"
    },
    {
        name: "nuclear-pasta",
        output: 0.5,
        ingredients: {
            "copper-powder": 100,
            "pressure-conversion-cube": 0.5
        },
        machine: "particle-accelerator"
    },
    {
        name: "plutonium-pellet",
        output: 30,
        ingredients: {
            "non-fissile-uranium": 100,
            "uranium-waste": 25,
        },
        machine: "particle-accelerator"
    },
    {
        name: "superposition-oscillator",
        output: 5,
        name2: "dark-matter-residue",
        output2: 125,
        ingredients: {
            "dark-matter-crystal": 30,
            "crystal-oscillator": 5,
            "alclad-aluminum-sheet": 45,
            "excited-photonic-matter": 125,
        },
        machine: "quantum-encoder"
    }
];

for (let recipe of assembler_recipes) {
    recipe.machine = "assembler";
    recipes.push(recipe);
}
for (let recipe of constructor_recipes) {
    recipe.machine = "constructor";
    recipes.push(recipe);
}
for (let recipe of manufacturer_recipes) {
    recipe.machine = "manufacturer";
    recipes.push(recipe);
}
for (let recipe of smelter_recipes) {
    recipe.machine = "smelter";
    recipes.push(recipe);
}
for (let recipe of foundry_recipes) {
    recipe.machine = "foundry";
    recipes.push(recipe);
}
for (let recipe of blender_recipes) {
    recipe.machine = "blender";
    recipes.push(recipe);
}
for (let recipe of energy_recipes) {
    recipe.machine = "energy-generator";
    recipes.push(recipe);
}
for (let recipe of refinery_recipes) {
    recipe.machine = "refinery";
    recipes.push(recipe);
}

export {sources, recipes};