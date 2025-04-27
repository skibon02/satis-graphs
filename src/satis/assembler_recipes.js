
const assembler_base_recipes = [
    {
        name: "ai-limiter",
        output: 5,
        ingredients: {
            "copper-sheet": 25,
            "quickwire": 100,
        }
    },
    {
        name: "alclad-aluminum-sheet",
        output: 30,
        ingredients: {
            "aluminum-ingot": 30,
            "copper-sheet": 10,
        }
    },
    {
        name: "assembly-director-system",
        output: 0.75,
        ingredients: {
            "supercomputer": 0.75,
            "adaptive-control-unit": 1.5
        }
    },
    {
        name: "automated-wiring",
        output: 2.5,
        ingredients: {
            "cable": 50,
            "stator": 2.5
        }
    },
    {
        name: "black-powder",
        output: 30,
        ingredients: {
            "coal": 15,
            "sulfur": 15,
        }
    },
    {
        name: "circuit-board",
        output: 7.5,
        ingredients: {
            "plastic": 30,
            "copper-sheet": 15,
        }
    },
    {
        name: "electromagnetic-control-rod",
        output: 4,
        ingredients: {
            "stator": 6,
            "ai-limiter": 4,
        }
    },
    {
        name: "encased-industrial-beam",
        output: 6,
        ingredients: {
            "steel-beam": 18,
            "concrete": 36,
        }
    },
    {
        name: "encased-plutonium-cell",
        output: 5,
        ingredients: {
            "plutonium-pellet": 10,
            "concrete": 20,
        }
    },
    {
        name: "heat-sink",
        output: 7.5,
        ingredients: {
            "alclad-aluminum-sheet": 37.5,
            "copper-sheet": 22.5,
        }
    },
    {
        name: "magnetic-field-generator",
        output: 1,
        ingredients: {
            "electromagnetic-control-rod": 1,
            "versatile-framework": 2.5,
        }
    },
    {
        name: "modular-frame",
        output: 2,
        ingredients: {
            "reinforced-iron-plate": 3,
            "iron-rod": 12,
        }
    },
    {
        name: "motor",
        output: 5,
        ingredients: {
            "rotor": 10,
            "stator": 10,
        }
    },
    {
        name: "pressure-conversion-cube",
        output: 1,
        ingredients: {
            "radio-control-unit": 2,
            "fused-modular-frame": 1,
        }
    },
    {
        name: "reanimated-sam",
        output: 30,
        ingredients: {
            "sam": 120,
        }
    },
    {
        name: "reinforced-iron-plate",
        output: 5,
        ingredients: {
            "iron-plate": 30,
            "screw": 60,
        }
    },
    {
        name: "rotor",
        output: 4,
        ingredients: {
            "iron-rod": 20,
            "screw": 100,
        }
    },
    {
        name: "smart-plating",
        output: 2,
        ingredients: {
            "rotor": 2,
            "reinforced-iron-plate": 2,
        }
    },
    {
        name: "stator",
        output: 5,
        ingredients: {
            "steel-pipe": 15,
            "wire": 40,
        }
    },
    {
        name: "versatile-framework",
        output: 5,
        ingredients: {
            "modular-frame": 2.5,
            "steel-beam": 30,
        }
    },
];

const assembler_alt_recipes = [
    {
        name: "reinforced-iron-plate",
        output: 3.75,
        ingredients: {
            "iron-plate": 11.25,
            "rubber": 3.75,
        }
    },
    {
        name: "aluminum-casing",
        output: 112.5,
        ingredients: {
            "aluminum-ingot": 150,
            "copper-ingot": 75
        }
    },
    {
        name: "modular-frame",
        output: 5,
        ingredients: {
            "reinforced-iron-plate": 7.5,
            "screw": 140,
        }
    },
    {
        name: "reinforced-iron-plate",
        output: 15,
        ingredients: {
            "iron-plate": 90,
            "screw": 250,
        }
    },
    {
        name: "circuit-board",
        output: 8.75,
        ingredients: {
            "plastic": 12.5,
            "quickwire": 37.5,
        }
    },
    {
        name: "silica",
        output: 52.5,
        ingredients: {
            "raw-quartz": 22.5,
            "limestone": 37.5,
        }
    },
    {
        name: "iron-plate",
        output: 75,
        ingredients: {
            "iron-ingot": 37.5,
            "plastic": 7.5,
        }
    },
    {
        name: "compacted-coal",
        output: 25,
        ingredients: {
            "coal": 25,
            "sulfur": 25,
        }
    },
    {
        name: "rotor",
        output: 11.25,
        ingredients: {
            "copper-sheet": 22.5,
            "screw": 195,
        }
    },
    {
        name: "computer",
        output: 10/3,
        ingredients: {
            "circuit-board": 5,
            "crystal-oscillator": 10/6,
        }
    },
    {
        name: "motor",
        output: 7.5,
        ingredients: {
            "electromagnetic-control-rod": 3.75,
            "rotor": 7.5
        }
    },
    {
        name: "circuit-board",
        output: 5,
        ingredients: {
            "rubber": 20,
            "petroleum-coke": 40,
        }
    },
    {
        name: "electromagnetic-control-rod",
        output: 8,
        ingredients: {
            "stator": 8,
            "high-speed-connector": 4
        }
    },
    {
        name: "encased-industrial-beam",
        output: 4,
        ingredients: {
            "steel-pipe": 24,
            "concrete": 20,
        }
    },
    {
        name: "black-powder",
        output: 45,
        ingredients: {
            sulfur: 7.5,
            "compacted-coal": 15
        }
    },
    {
        name: "concrete",
        output: 50,
        ingredients: {
            "silica": 15,
            "limestone": 60,
        }
    },
    {
        name: 'quickwire',
        output: 90,
        ingredients: {
            'caterium-ingot': 7.5,
            'copper-ingot': 37.5,
        }
    },
    {
        name: 'wire',
        output: 90,
        ingredients: {
            'caterium-ingot': 3,
            'copper-ingot': 12,
        }
    },
    {
        name: "heat-sink",
        output: 10,
        ingredients: {
            "aluminum-casing": 30,
            "rubber": 30
        }
    },
    {
        name: "cable",
        output: 100,
        ingredients: {
            "wire": 45,
            "rubber": 30,
        }
    },
    {
        name: "supercomputer",
        output: 3,
        ingredients: {
            "radio-control-unit": 6,
            "cooling-system": 6,
        }
    },
    {
        name: "ai-limiter",
        output: 8,
        ingredients: {
            "quickwire": 120,
            "plastic": 28
        }
    },
    {
        name: "plutonium-fuel-rod",
        output: 0.5,
        ingredients: {
            "encased-plutonium-cell": 10,
            "pressure-conversion-cube": 0.5
        }
    },
    {
        name: "cable",
        output: 27.5,
        ingredients: {
            "rubber": 5,
            "quickwire": 7.5,
        }
    },
    {
        name: "stator",
        output: 8,
        ingredients: {
            "steel-pipe": 16,
            "quickwire": 60
        }
    },
    {
        name: "concrete",
        output: 90,
        ingredients: {
            "limestone": 100,
            "rubber": 20,
        }
    },
    {
        name: "circuit-board",
        output: 12.5,
        ingredients: {
            "copper-sheet": 27.5,
            "silica": 27.5,
        }
    },    {
        name: "rotor",
        output: 5,
        ingredients: {
            "steel-pipe": 10,
            "wire": 30
        }
    },
    {
        name: "modular-frame",
        output: 3,
        ingredients: {
            "reinforced-iron-plate": 2,
            "steel-pipe": 10,
        },
    },
    {
        name: "reinforced-iron-plate",
        output: 5.625,
        ingredients: {
            "iron-plate": 18.75,
            "wire": 37.5,
        },
    },
];

for (let recipe of assembler_base_recipes) {
    recipe.base = true;
}
const assembler_recipes = assembler_base_recipes.concat(assembler_alt_recipes);

export default assembler_recipes;