const energy_recipes = [
    
    {
        name: "energy",
        output: 250,
        ingredients: {
            "fuel": 20,
        }
    },
    {
        name: "energy",
        output: 250,
        ingredients: {
            "liquid-biofuel": 20,
        }
    },
    {
        name: "energy",
        output: 250,
        ingredients: {
            "turbofuel": 7.5,
        }
    },
    {
        name: "energy",
        output: 250,
        ingredients: {
            "rocket-fuel": 4 + 1/6,
        }
    },
    {
        name: "energy",
        output: 250,
        ingredients: {
            "ionized-fuel": 3,
        }
    },
    {
        name: "energy",
        output: 2500,
        name2: "uranium-waste",
        output2: 10,
        ingredients: {
            "uranium-fuel-rod": 0.2,
            "water": 240,
        }
    },
    {
        name: "energy",
        output: 2500,
        name2: "plutonium-waste",
        output2: 1,
        ingredients: {
            "plutonium-fuel-rod": 0.1,
            "water": 240,
        }
    },
    {
        name: "energy",
        output: 2500,
        ingredients: {
            "ficsonium-fuel-rod": 1,
            "water": 240,
        }
    },
];

export default energy_recipes;