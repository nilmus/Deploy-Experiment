const pokemonName = document.querySelector(".pokemon-name");
const pokemonImage = document.querySelector(".pokemon-image");
const refreshButton = document.querySelector(".refresh-button");
const pokemonContainer = document.querySelector(".pokemon-container");
const errorDisplay = document.querySelector(".error-display");
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

const main = async () => {
  const randomPokemonID = getRandomPokemonID();
  try {
    const pokemonObj = await fetchPokemon(randomPokemonID);
    displayPokemon(pokemonObj);
  } catch (error) {
    displayError(error);
  }
};

document.addEventListener("DOMContentLoaded", main);

const getRandomPokemonID = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

const fetchPokemon = async (pokemonID) => {
  const response = await fetch(`${apiUrl}${pokemonID}`);
  console.log(response);
  if (!response.ok) {
    throw new Error("Uh Oh... Something went wrong.");
  }
  const pokemonJSON = await response.json();
  const { name, sprites } = pokemonJSON;
  const { front_default } = sprites;
  return { name, front_default };
};

const displayPokemon = (pokemonObj) => {
  pokemonContainer.classList.toggle("fade-in");
  void pokemonContainer.offsetWidth; // trigger reflow
  pokemonContainer.classList.toggle("fade-in");
  pokemonName.classList.add("shown");
  pokemonImage.classList.add("shown");
  pokemonName.textContent = pokemonObj.name;
  pokemonImage.src = pokemonObj.front_default;
};

const displayError = (error) => {
  pokemonName.classList.add("hidden");
  pokemonImage.classList.add("hidden");
  errorDisplay.classList.add("shown");
  errorDisplay.textContent = error.message;
};

refreshButton.addEventListener("click", main);
