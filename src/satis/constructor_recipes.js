
const constructor_base_recipes = [
    {
        name: "aluminum-casing",
        output: 60,
        ingredients: {
            "aluminum-ingot": 90,
        }
    },
    {
        name: "cable",
        output: 30,
        ingredients: {
            "wire": 60,
        }
    },
    {
        name: "concrete",
        output: 15,
        ingredients: {
            "limestone": 45,
        }
    },
    {
        name: "copper-powder",
        output: 50,
        ingredients: {
            "copper-ingot": 300,
        }
    },
    {
        name: "copper-sheet",
        output: 10,
        ingredients: {
            "copper-ingot": 20,
        }
    },
    {
        name: "ficsite-trigon",
        output: 30,
        ingredients: {
            "ficsite-ingot": 10,
        }
    },
    {
        name: "iron-plate",
        output: 20,
        ingredients: {
            "iron-ingot": 30,
        }
    },
    {
        name: "iron-rod",
        output: 15,
        ingredients: {
            "iron-ingot": 15,
        }
    },
    
    {
        name: "quartz-crystal",
        output: 22.5,
        ingredients: {
            "raw-quartz": 37.5,
        }
    },
    {
        name: "quickwire",
        output: 60,
        ingredients: {
            "caterium-ingot": 12,
        }
    },
    {
        name: "screw",
        output: 40,
        ingredients: {
            "iron-rod": 10,
        }
    },
    {
        name: "silica",
        output: 37.5,
        ingredients: {
            "raw-quartz": 22.5,
        }
    },
    {
        name: "steel-beam",
        output: 15,
        ingredients: {
            "steel-ingot": 60,
        }
    },
    {
        name: "steel-pipe",
        output: 20,
        ingredients: {
            "steel-ingot": 30,
        }
    },
    {
        name: "wire",
        output: 30,
        ingredients: {
            "copper-ingot": 15,
        }
    },
];

const constructor_alt_recipes = [
    
    {
        name: "steel-beam",
        output: 22.5,
        ingredients: {
            "aluminum-ingot": 22.5
        }
    },
    {
        name: "iron-rod",
        output: 52.5,
        ingredients: {
            "aluminum-ingot": 7.5
        }
    },
    {
        name: "screw",
        output: 50,
        ingredients: {
            "iron-ingot": 12.5
        }
    },
    {
        name: "wire",
        output: 120,
        ingredients: {
            "caterium-ingot": 15
        }
    },
    {
        name: "steel-pipe",
        output: 25,
        ingredients: {
            "iron-ingot": 100
        }
    },
    {
        name: "wire",
        output: 22.5,
        ingredients: {
            "iron-ingot": 12.5,
        }
    },
    {
        name: "iron-rod",
        output: 48,
        ingredients: {
            "steel-ingot": 12
        }
    },
    {
        name: "screw",
        output: 260,
        ingredients: {
            "steel-beam": 5,
        }
    },
];

for (const recipe of constructor_base_recipes) {
    recipe.base = true
}

const constructor_recipes = constructor_base_recipes.concat(constructor_alt_recipes);

export default constructor_recipes;