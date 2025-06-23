
const quantum_encoder_base_recipes = [
    {
        name: "ai-expansion-server",
        output: 4,
        name2: "dark-matter-residue",
        output2: 100,
        ingredients: {
            "magnetic-field-generator": 4,
            "neural-quantum-processor": 4,
            "superposition-oscillator": 4,
            "excited-photonic-matter": 100,
        }
    },
    {
        name: "alien-power-matrix",
        output: 2.5,
        name2: "dark-matter-residue",
        output2: 60,
        ingredients: {
            "sam-fluctuator": 12.5,
            "power-shard": 7.5,
            "superposition-oscillator": 7.5,
            "excited-photonic-matter": 75,
        }
    },
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
        }
    },
    {
        name: "neural-quantum-processor",
        output: 3,
        name2: "dark-matter-residue",
        output2: 75,
        ingredients: {
            "time-crystal": 15,
            "supercomputer": 3,
            "ficsite-trigon": 45,
            "excited-photonic-matter": 75,
        }
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
        }
    },
    {
        name: "power-shard",
        output: 5,
        name2: "dark-matter-residue",
        output2: 60,
        ingredients: {
            "time-crystal": 10,
            "dark-matter-crystal": 10,
            "quartz-crystal": 60,
            "excited-photonic-matter": 60,
        }
    },
];

const quantum_encoder_alt_recipes = [

];

for (let recipe of quantum_encoder_base_recipes) {
    recipe.base = true;
}
const quantum_encoder_recipes = quantum_encoder_base_recipes.concat(quantum_encoder_alt_recipes);

export default quantum_encoder_recipes;