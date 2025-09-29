function conexion() {
    document.getElementById("root").innerHTML = "conexion";
}

let pokemones = [];
let totalPokes = 1025;

async function conexionLista() {
const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
    const data = await res.json();
    return data.results;
}

async function General() {
    if (pokemones.length === 0) {
        pokemones = await conexionLista();
    }
    
    Home();
    console.log(pokemones[2].name);
}

General();