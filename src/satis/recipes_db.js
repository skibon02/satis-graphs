import assembler_recipes from "./assembler_recipes";
import blender_recipes from "./blender_recipes";
import constructor_recipes from "./constructor_recipes";
import manufacturer_recipes from "./manufacturer_recipes";
import energy_recipes from "./energy_recipes.js";
import smelter_recipes from "./smelter_recipes";
import foundry_recipes from "./foundry_recipes";
import refinery_recipes from "./refinery_recipes";
import converter_recipes from "./converter_recipes";
import packager_recipes from "./packager_recipes";
import particle_accelerator_recipes from "./particle_accelerator_recipes";
import quantum_encoder_recipes from "./quantum_encoder";

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
    "uranium-waste"
]

const recipes = [
    
];

const recipes_added = false;
if (!recipes_added) {
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
    for (let recipe of converter_recipes) {
        recipe.machine = "converter";
        recipes.push(recipe);
    }
    for (let recipe of packager_recipes) {
        recipe.machine = "packager";
        recipes.push(recipe);
    }
    for (let recipe of particle_accelerator_recipes) {
        recipe.machine = "particle-accelerator";
        recipes.push(recipe);
    }
    for (let recipe of quantum_encoder_recipes) {
        recipe.machine = "quantum-encoder";
        recipes.push(recipe);
    }
}

export {sources, recipes};