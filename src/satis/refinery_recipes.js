const refinery_base_recipes = [
    {
        name: "alumina-solution",
        output: 120,
        name2: "silica",
        output2: 50,
        ingredients: {
            "bauxite": 120,
            "water": 180,
        }
    },
    {
        name: "aluminum-scrap",
        output: 360,
        name2: "water",
        output2: 120,
        ingredients: {
            "alumina-solution": 240,
            "coal": 120,
        }
    },
    {
        name: "fuel",
        output: 40,
        name2: "polymer-resin",
        output2: 30,
        ingredients: {
            "crude-oil": 60,
        }
    },
    {
        name: "ionized-fuel",
        output: 40,
        name2: "compacted-coal",
        output2: 5,
        ingredients: {
            "rocket-fuel": 40,
            "power-shard": 2.5,
        },
    },
    {
        name: "liquid-biofuel",
        output: 60,
        ingredients: {
            "solid-biofuel": 90,
            "water": 45,
        }
    },
    {
        name: "petroleum-coke",
        output: 120,
        ingredients: {
            "heavy-oil-residue": 40,
        }
    },
    {
        name: "plastic",
        output: 20,
        name2: "heavy-oil-residue",
        output2: 10,
        ingredients: {
            "crude-oil": 30,
        },
    },
    {
        name: "fuel",
        output: 40,
        ingredients: {
            "heavy-oil-residue": 60,
        }
    },
    {
        name: "plastic",
        output: 20,
        ingredients: {
            "polymer-resin": 60,
            "water": 20,
        },
    },
    {
        name: "rubber",
        output: 20,
        ingredients: {
            "polymer-resin": 40,
            "water": 40,
        },
    },
    {
        name: "rubber",
        output: 20,
        name2: "heavy-oil-residue",
        output2: 20,
        ingredients: {
            "crude-oil": 30,
        },
    },
    {
        name: "smokeless-powder",
        output: 20,
        ingredients: {
            "black-powder": 20,
            "heavy-oil-residue": 10
        }
    },
    {
        name: "sulfuric-acid",
        output: 50,
        ingredients: {
            "sulfur": 50,
            "water": 50,
        }
    },
];

const refinery_alt_recipes = [
    
    {
        name: "cable",
        output: 67.5,
        ingredients: {
            "wire": 37.5,
            "heavy-oil-residue": 15,
        }
    },
    {
        name: "aluminum-scrap",
        output: 300,
        name2: "water",
        output2: 105,
        ingredients: {
            "alumina-solution": 180,
            "petroleum-coke": 60,
        }
    },
    {
        name: "heavy-oil-residue",
        output: 40,
        name2: 'polymer-resin',
        output2: 20,
        machine: "refinery",
        ingredients: {
            "crude-oil": 30,
        },
    },
    {
        name: "caterium-ingot",
        output: 36,
        ingredients: {
            "caterium-ore": 54,
            "sulfuric-acid": 30
        }
    },
    {
        name: "copper-ingot",
        output: 110,
        ingredients: {
            "copper-ore": 45,
            "sulfuric-acid": 25
        }
    },
    {
        name: "iron-ingot",
        output: 100,
        ingredients: {
            "iron-ore": 50,
            "sulfuric-acid": 10
        }
    },
    {
        name: "polymer-resin",
        output: 130,
        name2: "heavy-oil-residue",
        output2: 20,
        ingredients: {
            "crude-oil": 60
        }
    },
    {
        name: "caterium-ingot",
        output: 12,
        ingredients: {
            "caterium-ore": 24,
            "water": 24,
        }
    },
    {
        name: "copper-ingot",
        output: 37.5,
        ingredients: {
            "copper-ore": 15,
            "water": 10,
        }
    },
    {
        name: "iron-ingot",
        output: 65,
        ingredients: {
            "iron-ore": 35,
            "water": 20,
        }
    },
    {
        name: "quartz-crystal",
        output: 52.5,
        ingredients: {
            "raw-quartz": 67.5,
            "water": 37.5,
        }
    },
    {
        name: "quartz-crystal",
        output: 75,
        name2: "dissolved-silica",
        output2: 60,
        ingredients: {
            "raw-quartz": 120,
            "nitric-acid": 10,
        }
    },
    {
        name: "plastic",
        output: 60,
        ingredients: {
            "rubber": 30,
            "fuel": 30,
        }
    },
    {
        name: "rubber",
        output: 60,
        ingredients: {
            "plastic": 30,
            "fuel": 30,
        }
    },
    {
        name: "alumina-solution",
        output: 240,
        ingredients: {
            "bauxite": 200,
            "water": 200
        }
    },
    {
        name: "copper-sheet",
        output: 22.5,
        ingredients: {
            "copper-ingot": 22.5,
            "water": 22.5,
        }
    },
    {
        name: "turbofuel",
        output: 30,
        ingredients: {
            "heavy-oil-residue": 37.5,
            "compacted-coal": 30,
        }
    },
    {
        name: "turbofuel",
        output: 18.75,
        ingredients: {
            "fuel": 22.5,
            "compacted-coal": 15,
        }
    },
    {
        name: "concrete",
        output: 80,
        ingredients: {
            "limestone": 120,
            "water": 100,
        }
    },
];

for (let recipe of refinery_base_recipes) {
    recipe.base = true;
}

const refinery_recipes = refinery_base_recipes.concat(refinery_alt_recipes);

export default refinery_recipes;