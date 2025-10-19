let pokemones = [];
let totalPokes = 1025; // corregido mayúscula

async function conexionlista(filtrotipo) {
  if (filtrotipo === "all") {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
    const data = await res.json();
    return data.results;
  } else {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${filtrotipo}`);
    const data = await res.json();
    return data.pokemon.map(p => ({
      name: p.pokemon.name,
      url: p.pokemon.url
    }));
  }
}

async function general() {
  if (pokemones.length === 0) {
    pokemones = await conexionlista("all");
  }
  home();
}

document.addEventListener("DOMContentLoaded", general);
