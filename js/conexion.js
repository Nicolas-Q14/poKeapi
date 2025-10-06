function conexion() {
    document.getElementById("root").innerHTML = "conexion";
}

let pokemones = [];
let totalPokes = 1025;

async function conexionLista(unFiltro) {
    if (unFiltro === "All") {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
        const data = await res.json();
        return data.results; // [{name, url}, ...]
    } else {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${unFiltro}`);
        const data = await res.json();

        // Estandarizamos el formato para que sea igual al de "All"
        const pokemonesTipo = [];
        for (let i = 0; i < data.pokemon.length; i++) {
            pokemonesTipo.push({
                name: data.pokemon[i].pokemon.name,
                url: data.pokemon[i].pokemon.url
            });
        }
        return pokemonesTipo;
    }
}

async function General() {
    if (pokemones.length === 0) {
        pokemones = await conexionLista("All");
    }
    if (typeof home === "function") {
        home(pokemones); 
    }
    console.log(pokemones[2].name);
}

General();

async function FiltroConexion(filtroelegido) {
    let pokesFiltrados = await conexionLista(filtroelegido);
    document.getElementById("la-lista").innerHTML = "";
    let listaFiltro = GenerarLista(pokesFiltrados);
    document.getElementById("la-lista").innerHTML = listaFiltro;
}