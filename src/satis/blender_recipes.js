
const blender_recipes = [
    {
        name: "battery",
        output: 20,
        name2: "water",
        output2: 30,
        ingredients: {
            "sulfuric-acid": 50,
            "alumina-solution": 40,
            "aluminum-casing": 20,
        }
    },
    {
        name: "cooling-system",
        output: 6,
        ingredients: {
            "heat-sink": 12,
            "rubber": 12,
            "water": 30,
            "nitrogen-gas": 150,
        }
    },
    {
        name: "encased-uranium-cell",
        output: 25,
        name2: "sulfuric-acid",
        output2: 10,
        ingredients: {
            "uranium": 50,
            "concrete": 15,
            "sulfuric-acid": 40,
        }
    },
    {
        name: "fused-modular-frame",
        output: 1.5,
        ingredients: {
            "heavy-modular-frame": 1.5,
            "aluminum-casing": 75,
            "nitrogen-gas": 37.5,
        }
    },
    {
        name: "nitric-acid",
        output: 30,
        ingredients: {
            "nitrogen-gas": 120,
            "water": 30,
            "iron-plate": 10,
        }
    },
    {
        name: "non-fissile-uranium",
        output: 50,
        name2: "water",
        output2: 15,
        ingredients: {
            "uranium-waste": 37.5,
            "silica": 25,
            "nitric-acid": 15,
            "sulfuric-acid": 15,
        }
    },
    {
        name: "rocket-fuel",
        output: 100,
        name2: "compacted-coal",
        output2: 10,
        ingredients: {
            "turbofuel": 60,
            "nitric-acid": 10,
        },
    },
    {
        name: "cooling-system",
        output: 5,
        ingredients: {
            "nitrogen-gas": 60,
            "motor": 2.5,
            "heat-sink": 10
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
        name: "silica",
        output: 270,
        name2: "water",
        output2: 80,
        ingredients: {
            "dissolved-silica": 120,
            "limestone": 50,
            "water": 100,
        }
    },
    {
        name: "non-fissile-uranium",
        output: 100,
        name2: "water",
        output2: 40,
        ingredients: {
            "uranium": 25,
            "uranium-waste": 25,
            "nitric-acid": 15,
            "sulfuric-acid": 25,
        }
    },
    {
        name: "fused-modular-frame",
        output: 3,
        ingredients: {
            "heavy-modular-frame": 3,
            "aluminum-ingot": 150,
            "nitric-acid": 24,
            "fuel": 30
        }
    },
    {
        name: "aluminum-scrap",
        output: 300,
        name2: "water",
        output2: 50,
        ingredients: {
            "bauxite": 150,
            "coal": 100,
            "sulfuric-acid": 50,
            "water": 60,
        }
    },
    {
        name: "rocket-fuel",
        output: 150,
        name2: "compacted-coal",
        output2: 25,
        ingredients: {
            "fuel": 100,
            "nitrogen-gas": 75,
            "sulfur": 100,
            "coal": 50
        }
    },
    {
        name: "turbofuel",
        output: 45,
        ingredients: {
            "fuel": 15,
            "heavy-oil-residue": 30,
            "sulfur": 22.5,
            "petroleum-coke": 22.5
        }
    },
];

export default blender_recipes;