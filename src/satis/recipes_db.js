

let sources = [
    "iron-ore",
    "copper-ore",
    "raw-quartz",
    "coal",
    "caterium-ore",
    "baxite",
    "limestone",
    "nitrogen-gas",
    "water",
    "crude-oil",
    "sulfur",
    "heavy-oil-residue",
    "uranium",
    "uranium-waste",
]


let alt_recipes = [
    // refinery

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
        name: "rubber",
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
        name2: "polymer-resin",
        output2: 30,
        ingredients: {
            "crude-oil": 60,
        },
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
        name: "smokeless-powder",
        output: 20,
        ingredients: {
            "black-powder": 20,
            "heavy-oil-residue": 10
        }
    },

    // alt recipes
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
        name: "copper-sheet",
        output: 22.5,
        ingredients: {
            "copper-ingot": 22.5,
            "water": 22.5,
        }
    },

    {
        name: "reinforced-iron-plate",
        output: 3.75,
        ingredients: {
            "iron-plate": 11.25,
            "rubber": 3.75,
        }
    },
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
        name: "iron-ingot",
        output: 50,
        ingredients: {
            "iron-ore": 25,
            "limestone": 40,
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
        name: "screw",
        output: 50,
        ingredients: {
            "iron-ingot": 12.5
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
        name: "computer",
        output: 3.75,
        ingredients: {
            "circuit-board": 15,
            "rubber": 22.5,
            "quickwire": 52.5,
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
        name: "silica",
        output: 52.5,
        ingredients: {
            "raw-quartz": 22.5,
            "limestone": 37.5,
        }
    },
    {
        name: "cable",
        output: 67.5,
        ingredients: {
            "wire": 37.5,
            "heavy-oil-residue": 15,
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
        name: "steel-ingot",
        output: 100,
        ingredients: {
            "iron-ore": 75,
            "petroleum-coke": 75,
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
        name: "steel-ingot",
        output: 10,
        ingredients: {
            "iron-ore": 5,
            "compacted-coal": 2.5,
        }
    },
    {
        name: "copper-ingot",
        output: 100,
        ingredients: {
            "copper-ore": 50,
            "iron-ore": 50,
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
        name: "fuel",
        output: 100,
        ingredients: {
            "heavy-oil-residue": 50,
            "water": 100
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
        name: "versatile-framework",
        output: 7.5,
        ingredients: {
            "modular-frame": 3.75,
            "rubber": 30,
            "steel-beam": 22.5
        }
    },
    {
        name: "quartz-crystal",
        output: 54,
        ingredients: {
            'raw-quartz': 75,
            'coal': 36,
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
        name: "heavy-oil-residue",
        output: 40,
        name2: 'polymer-resin',
        output2: 20,
        ingredients: {
            "crude-oil": 30,
        },
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
        name: "iron-ingot",
        output: 75,
        ingredients: {
            "iron-ore": 40,
            "copper-ore": 10,
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
        name: "steel-beam",
        output: 45,
        ingredients: {
            "steel-ingot": 120,
            "concrete": 80,
        }
    },
    {
        name: "steel-pipe",
        output: 50,
        ingredients: {
            "steel-ingot": 50,
            "concrete": 30,
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
        name: "smart-plating",
        output: 5,
        ingredients: {
            "reinforced-iron-plate": 2.5,
            "rotor": 2.5,
            "plastic": 7.5,
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
        name: "motor",
        output: 7.5,
        ingredients: {
            "rotor": 3.75,
            "stator": 3.75,
            "crystal-oscillator": 1.25,
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
        name: "steel-ingot",
        output: 60,
        ingredients: {
            "iron-ingot": 40,
            "coal": 40
        }
    },
    {
        name: "iron-plate",
        output: 45,
        ingredients: {
            "iron-ingot": 15,
            "steel-ingot": 15
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
        name: "rotor",
        output: 5,
        ingredients: {
            "steel-pipe": 10,
            "wire": 30
        }
    },
    {
        name: "screw",
        output: 260,
        ingredients: {
            "steel-beam": 5,
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
    {
        name: "caterium-ingot",
        output: 22.5,
        ingredients: {
            "caterium-ore": 45,
            "petroleum-coke": 15
        }
    },
    {
        name: "copper-ingot",
        output: 60,
        ingredients: {
            "copper-ore": 25,
            "petroleum-coke": 40
        }
    },
    {
        name: "concrete",
        output: 80,
        ingredients: {
            "limestone": 120,
            "water": 100,
        }
    }
];

let recipes = {
    "adaptive-control-unit": {
        output: 1,
        ingredients: {
            "automated-wiring": 5,
            "circuit-board": 5,
            "heavy-modular-frame": 1,
            "computer": 2
        }
    },
    "ai-limiter": {
        output: 5,
        ingredients: {
            "copper-sheet": 25,
            "quickwire": 100,
        }
    },
    "alclad-aluminum-sheet": {
        output: 30,
        ingredients: {
            "aluminum-ingot": 30,
            "copper-sheet": 10,
        }
    },
    "alumina-solution": {
        output: 120,
        ingredients: {
            "baxite": 120,
            "water": 180,
        }
    },
    "aluminum-casing": {
        output: 60,
        ingredients: {
            "aluminum-ingot": 90,
        }
    },
    "aluminum-ingot": {
        output: 60,
        ingredients: {
            "aluminum-scrap": 90,
            "silica": 75,
        }
    },
    "aluminum-scrap": {
        output: 360,
        ingredients: {
            "alumina-solution": 240,
            "coal": 120,
        }
    },
    "battery": {
        output: 20,
        ingredients: {
            "sulfuric-acid": 50,
            "alumina-solution": 40,
            "aluminum-casing": 20,
        }
    },
    "assembly-director-system": {
        output: 0.75,
        ingredients: {
            "supercomputer": 0.75,
            "adaptive-control-unit": 1.5
        }
    },
    "automated-wiring": {
        output: 2.5,
        ingredients: {
            "cable": 50,
            "stator": 2.5
        }
    },
    "black-powder": {
        output: 30,
        ingredients: {
            "coal": 15,
            "sulfur": 15,
        }
    },
    "cable": {
        output: 30,
        ingredients: {
            "wire": 60,
        }
    },
    "caterium-ingot": {
        output: 15,
        ingredients: {
            "caterium-ore": 45,
        }
    },
    "circuit-board": {
        output: 7.5,
        ingredients: {
            "plastic": 30,
            "copper-sheet": 15,
        }
    },
    "compacted-coal": {
        output: 25,
        ingredients: {
            "coal": 25,
            "sulfur": 25,
        }
    },
    "computer": {
        output: 2.5,
        ingredients: {
            "circuit-board": 10,
            "plastic": 40,
            "cable": 20,
        }
    },
    "concrete": {
        output: 15,
        ingredients: {
            "limestone": 45,
        }
    },
    "cooling-system": {
        output: 6,
        ingredients: {
            "heat-sink": 12,
            "rubber": 12,
            "water": 30,
            "nitrogen-gas": 150,
        }
    },
    "copper-ingot": {
        output: 30,
        ingredients: {
            "copper-ore": 30,
        }
    },
    "copper-powder": {
        output: 50,
        ingredients: {
            "copper-ingot": 300,
        }
    },
    "copper-sheet": {
        output: 10,
        ingredients: {
            "copper-ingot": 20,
        }
    },
    "crystal-oscillator": {
        output: 1,
        ingredients: {
            "quartz-crystal": 18,
            "cable": 14,
            "reinforced-iron-plate": 2.5,
        }
    },
    "electromagnetic-control-rod": {
        output: 4,
        ingredients: {
            "stator": 6,
            "ai-limiter": 4,
        }
    },
    "encased-industrial-beam": {
        output: 6,
        ingredients: {
            "steel-beam": 18,
            "concrete": 36,
        }
    },
    "encased-plutonium-cell": {
        output: 5,
        ingredients: {
            "plutonium-pellet": 10,
            "concrete": 20,
        }
    },
    "encased-uranium-cell": {
        output: 25,
        ingredients: {
            "uranium": 50,
            "concrete": 15,
            "sulfuric-acid": 40,
        }
    },
    "fuel": {
        output: 40,
        ingredients: {
            "heavy-oil-residue": 60
        }
    },
    "fused-modular-frame": {
        output: 1.5,
        ingredients: {
            "heavy-modular-frame": 1.5,
            "aluminum-casing": 75,
            "nitrogen-gas": 37.5,
        }
    },
    "heavy-modular-frame": {
        output: 2,
        ingredients: {
            "modular-frame": 10,
            "encased-industrial-beam": 10,
            "steel-pipe": 40,
            "screw": 240,
        }
    },
    "heat-sink": {
        output: 7.5,
        ingredients: {
            "alclad-aluminum-sheet": 37.5,
            "copper-sheet": 22.5,
        }
    },
    "high-speed-connector": {
        output: 3.75,
        ingredients: {
            "circuit-board": 3.75,
            "quickwire": 210,
            "cable": 37.5,
        }
    },
    "iron-ingot": {
        output: 30,
        ingredients: {
            "iron-ore": 30,
        }
    },
    "iron-plate": {
        output: 20,
        ingredients: {
            "iron-ingot": 30,
        }
    },
    "iron-rod": {
        output: 15,
        ingredients: {
            "iron-ingot": 15,
        }
    },
    "magentic-field-generator": {
        output: 1,
        ingredients: {
            "electromagnetic-control-rod": 1,
            "versatile-framework": 2.5,
        }
    },
    "modular-engine": {
        output: 1,
        ingredients: {
            "motor": 2,
            "rubber": 2,
            "smart-plating": 15,
        }
    },
    "modular-frame": {
        output: 2,
        ingredients: {
            "reinforced-iron-plate": 3,
            "iron-rod": 12,
        }
    },
    "motor": {
        output: 5,
        ingredients: {
            "rotor": 10,
            "stator": 10,
        }
    },
    "nitric-acid": {
        output: 30,
        ingredients: {
            "nitrogen-gas": 120,
            "water": 30,
            "iron-plate": 10,
        }
    },
    "non-fissile-uranium": {
        output: 50,
        ingredients: {
            "uranium-waste": 37.5,
            "silica": 25,
            "nitric-acid": 15,
            "sulfuric-acid": 15,
        }
    },
    "nuclear-pasta": {
        output: 0.5,
        ingredients: {
            "copper-powder": 100,
            "pressure-conversion-cube": 0.5
        }
    },
    "petroleum-coke": {
        output: 120,
        ingredients: {
            "heavy-oil-residue": 40,
        }
    },
    "plutonium-fuel-rod": {
        output: 0.25,
        ingredients: {
            "encased-plutonium-cell": 7.5,
            "steel-beam": 4.5,
            "electromagnetic-control-rod": 1.5,
            "heat-sink": 2.5,
        }
    },
    "plutonium-pellet": {
        output: 30,
        ingredients: {
            "non-fissile-uranium": 100,
            "uranium-waste": 25,
        }
    },
    "pressure-conversion-cube": {
        output: 1,
        ingredients: {
            "radio-control-unit": 2,
            "fused-modular-frame": 1,
        }
    },
    "quartz-crystal": {
        output: 22.5,
        ingredients: {
            "raw-quartz": 37.5,
        }
    },
    "quickwire": {
        output: 60,
        ingredients: {
            "caterium-ingot": 12,
        }
    },
    "radio-control-unit": {
        output: 2.5,
        ingredients: {
            "aluminum-casing": 40,
            "crystal-oscillator": 1.25,
            "computer": 2.5,
        }
    },
    "reinforced-iron-plate": {
        output: 5,
        ingredients: {
            "iron-plate": 30,
            "screw": 60,
        }
    },
    "rocket-fuel": {
        output: 100,
        ingredients: {
            "turbofuel": 60,
            "nitric-acid": 10,
        }
    },
    "rotor": {
        output: 4,
        ingredients: {
            "iron-rod": 20,
            "screw": 100,
        }
    },
    "screw": {
        output: 40,
        ingredients: {
            "iron-rod": 10,
        }
    },
    "silica": {
        output: 37.5,
        ingredients: {
            "raw-quartz": 22.5,
        }
    },
    "smart-plating": {
        output: 2,
        ingredients: {
            "rotor": 2,
            "reinforced-iron-plate": 2,
        }
    },
    "stator": {
        output: 5,
        ingredients: {
            "steel-pipe": 15,
            "wire": 40,
        }
    },
    "steel-beam": {
        output: 15,
        ingredients: {
            "steel-ingot": 60,
        }
    },
    "steel-ingot": {
        output: 45,
        ingredients: {
            "iron-ore": 45,
            "coal": 45,
        }
    },
    "steel-pipe": {
        output: 20,
        ingredients: {
            "steel-ingot": 30,
        }
    },
    "sulfuric-acid": {
        output: 50,
        ingredients: {
            "sulfur": 50,
            "water": 50,
        }
    },
    "supercomputer": {
        output: 1.875,
        ingredients: {
            "computer": 7.5,
            "ai-limiter": 3.75,
            "plastic": 52.5,
            "high-speed-connector": 5.625,
        }
    },
    "thermal-propulsion-rocket": {
        output: 1,
        ingredients: {
            "modular-engine": 2.5,
            "turbo-motor": 1,
            "cooling-system": 3,
            "fused-modular-frame": 1,
        }
    },
    "turbo-motor": {
        output: 1.875,
        ingredients: {
            "cooling-system": 7.5,
            "radio-control-unit": 3.75,
            "motor": 7.5,
            "rubber": 45,
        }
    },
    "turbofuel": {
        output: 30,
        ingredients: {
            "heavy-oil-residue": 37.5,
            "compacted-coal": 30,
        }
    },
    "uranium-fuel-rod": {
        output: 0.4,
        ingredients: {
            "encased-uranium-cell": 20,
            "encased-industrial-beam": 1.2,
            "electromagnetic-control-rod": 2,
        }
    },
    "versatile-framework": {
        output: 5,
        ingredients: {
            "modular-frame": 2.5,
            "steel-beam": 30,
        }
    },
    "wire": {
        output: 30,
        ingredients: {
            "copper-ingot": 15,
        }
    },
}

export {recipes, sources, alt_recipes};