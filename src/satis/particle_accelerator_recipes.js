
const particle_accelerator_base_recipes = [
    {
        name: "encased-plutonium-cell",
        output: 10,
        ingredients: {
            "non-fissile-uranium": 75,
            "aluminum-casing": 10,
        }
    },
    {
        name: "dark-matter-crystal",
        output: 30,
        ingredients: {
            "diamonds": 30,
            "dark-matter-residue": 150
        }
    },
    {
        name: "diamonds",
        output: 30,
        ingredients: {
            "coal": 600
        }
    },
    {
        name: "ficsonium",
        output: 10,
        ingredients: {
            "plutonium-waste": 10,
            "singularity-cell": 10,
            "dark-matter-residue": 200,
        }
    },
    {
        name: "nuclear-pasta",
        output: 0.5,
        ingredients: {
            "copper-powder": 100,
            "pressure-conversion-cube": 0.5
        }
    },
    {
        name: "plutonium-pellet",
        output: 30,
        ingredients: {
            "non-fissile-uranium": 100,
            "uranium-waste": 25,
        }
    },
    
];

const particle_accelerator_alt_recipes = [
    {
        name: "diamonds",
        output: 20,
        ingredients: {
            "coal": 240,
            "limestone": 480,
        }
    },
    {
        name: "dark-matter-crystal",
        output: 20,
        ingredients: {
            "dark-matter-residue": 200,
        }
    },
    {
        name: "dark-matter-crystal",
        output: 60,
        ingredients: {
            "dark-matter-residue": 150,
            "time-crystal": 30,
        }
    },
    {
        name: "encased-plutonium-cell",
        output: 10,
        ingredients: {
            "non-fissile-uranium": 75,
            "aluminum-casing": 10,
        }
    },
    {
        name: "diamonds",
        output: 40,
        ingredients: {
            "crude-oil": 200,
        }
    },
    {
        name: "diamonds",
        output: 30,
        ingredients: {
            "petroleum-coke": 720,
        }
    },
    {
        name: "diamonds",
        output: 60,
        ingredients: {
            "packaged-turbofuel": 40,
            "coal": 600
        }
    },
];

for (let recipe of particle_accelerator_base_recipes) {
    recipe.base = true;
}
const particle_accelerator_recipes = particle_accelerator_base_recipes.concat(particle_accelerator_alt_recipes);

export default particle_accelerator_recipes;