const manufacturer_base_recipes = [
    {
        name: "adaptive-control-unit",
        output: 1,
        ingredients: {
            "automated-wiring": 5,
            "circuit-board": 5,
            "heavy-modular-frame": 1,
            "computer": 2
        }
    },
    {
        name: "ballistic-warp-drive",
        output: 1,
        ingredients: {
            "thermal-propulsion-rocket": 1,
            "singularity-cell": 5,
            "superposition-oscillator": 2,
            "dark-matter-crystal": 40
        }
    },
    {
        name: "computer",
        output: 2.5,
        ingredients: {
            "circuit-board": 10,
            "cable": 20,
            "plastic": 40,
        }
    },
    {
        name: "crystal-oscillator",
        output: 1,
        ingredients: {
            "quartz-crystal": 18,
            "cable": 14,
            "reinforced-iron-plate": 2.5,
        }
    },
    {
        name: "heavy-modular-frame",
        output: 2,
        ingredients: {
            "modular-frame": 10,
            "encased-industrial-beam": 10,
            "steel-pipe": 40,
            "screw": 240,
        }
    },
    {
        name: "high-speed-connector",
        output: 3.75,
        ingredients: {
            "circuit-board": 3.75,
            "quickwire": 210,
            "cable": 37.5,
        }
    },
    {
        name: "modular-engine",
        output: 1,
        ingredients: {
            "motor": 2,
            "rubber": 15,
            "smart-plating": 2,
        }
    },
    {
        name: "plutonium-fuel-rod",
        output: 0.25,
        ingredients: {
            "encased-plutonium-cell": 7.5,
            "steel-beam": 4.5,
            "electromagnetic-control-rod": 1.5,
            "heat-sink": 2.5,
        }
    },
    {
        name: "radio-control-unit",
        output: 2.5,
        ingredients: {
            "aluminum-casing": 40,
            "crystal-oscillator": 1.25,
            "computer": 2.5,
        }
    },
    {
        name: "singularity-cell",
        output: 10,
        ingredients: {
            "nuclear-pasta": 1,
            "dark-matter-crystal": 20,
            "iron-plate": 100,
            "concrete": 200,
        }
    },
    {
        name: "supercomputer",
        output: 1.875,
        ingredients: {
            "computer": 7.5,
            "ai-limiter": 3.75,
            "plastic": 52.5,
            "high-speed-connector": 5.625,
        }
    },
    {
        name: "thermal-propulsion-rocket",
        output: 1,
        ingredients: {
            "modular-engine": 2.5,
            "turbo-motor": 1,
            "cooling-system": 3,
            "fused-modular-frame": 1,
        }
    },
    {
        name: "turbo-motor",
        output: 1.875,
        ingredients: {
            "cooling-system": 7.5,
            "radio-control-unit": 3.75,
            "motor": 7.5,
            "rubber": 45,
        }
    },
    {
        name: "uranium-fuel-rod",
        output: 0.4,
        ingredients: {
            "encased-uranium-cell": 20,
            "encased-industrial-beam": 1.2,
            "electromagnetic-control-rod": 2,
        }
    },
];

const manufacturer_alt_recipes = [
    
    {
        name: "automated-wiring",
        output: 7.5,
        ingredients: {
            "stator": 3.75,
            "wire": 75,
            "high-speed-connector": 1.875
        }
    },
    {
        name: "computer",
        output: 3.75,
        ingredients: {
            "circuit-board": 15,
            "rubber": 22.5,
            "quickwire": 52.5,
        }
    },
    {
        name: "battery",
        output: 30,
        ingredients: {
            "sulfur": 45,
            "alclad-aluminum-sheet": 52.5,
            "plastic": 60,
            "wire": 90
        }
    },
    {
        name: "versatile-framework",
        output: 7.5,
        ingredients: {
            "modular-frame": 3.75,
            "rubber": 30,
            "steel-beam": 22.5
        }
    },
    {
        name: 'heavy-modular-frame',
        output: 2.8125,
        ingredients: {
            'modular-frame': 7.5,
            'encased-industrial-beam': 9.375,
            'steel-pipe': 33.75,
            'concrete': 20.625,
        }
    },
    {
        name: 'heavy-modular-frame',
        output: 3.75,
        ingredients: {
            'modular-frame': 18.75,
            'encased-industrial-beam': 11.25,
            'rubber': 75,
            'screw': 390,
        }
    },
    {
        name: "encased-uranium-cell",
        output: 20,
        ingredients: {
            "uranium": 25,
            "silica": 15,
            "sulfur": 25,
            "quickwire": 75,
        }
    },
    {
        name: "crystal-oscillator",
        output: 1.875,
        ingredients: {
            "quartz-crystal": 18.75,
            "rubber": 13.125,
            "ai-limiter": 1.825,
        }
    },
    {
        name: "smart-plating",
        output: 5,
        ingredients: {
            "reinforced-iron-plate": 2.5,
            "rotor": 2.5,
            "plastic": 7.5,
        }
    },
    {
        name: "radio-control-unit",
        output: 3.75,
        ingredients: {
            "heat-sink": 15,
            "high-speed-connector": 7.5,
            "quartz-crystal": 45,
        }
    },
    {
        name: "radio-control-unit",
        output: 4.5,
        ingredients: {
            "crystal-oscillator": 1.5,
            "circuit-board": 15,
            "aluminum-casing": 90,
            "rubber": 45,
        }
    },
    {
        name: "motor",
        output: 7.5,
        ingredients: {
            "rotor": 3.75,
            "stator": 3.75,
            "crystal-oscillator": 1.25,
        }
    },
    {
        name: "high-speed-connector",
        output: 3,
        ingredients: {
            "quickwire": 90,
            "silica": 37.5,
            "circuit-board": 3
        }
    },
    {
        name: "supercomputer",
        output: 2.4,
        ingredients: {
            "computer": 7.2,
            "electromagnetic-control-rod": 2.4,
            "battery": 24,
            "wire": 60
        }
    },
    {
        name: "turbo-motor",
        output: 2.8125,
        ingredients: {
            "motor": 6.5625,
            "radio-control-unit": 8.4375,
            "electromagnetic-control-rod": 4.6875,
            "rotor": 6.5625
        }
    },
    {
        name: "turbo-motor",
        output: 3.75,
        ingredients: {
            "motor": 7.5,
            "pressure-conversion-cube": 1.875,
            "nitrogen-gas": 45,
            "stator": 15
        }
    },
    {
        name: "uranium-fuel-rod",
        output: 0.6,
        ingredients: {
            "encased-uranium-cell": 20,
            "electromagnetic-control-rod": 2,
            "crystal-oscillator": 0.6,
            "rotor": 2,
        }
    },
]

for (let recipe of manufacturer_base_recipes) {
    recipe.base = true
}

const manufacturer_recipes = manufacturer_base_recipes.concat(manufacturer_alt_recipes);

export default manufacturer_recipes;