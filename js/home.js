// --- home.js ---
function generarlista(lista) {
  let listapokes = "";
  for (let i = 0; i < lista.length; i++) {
    const url = lista[i].url;
    const parts = url.split("/").filter(Boolean);
    const id = parts[parts.length - 1];
    const nombre = lista[i].name;

    listapokes += `
      <div class="c-lista-pokemon poke-${id}" onclick="detalle('${id}')">
        <p>#${id}</p>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"
             height="60" loading="lazy" alt="${nombre}">
        <p>${nombre}</p>
      </div>
    `;
  }
  return listapokes;
}

function buscadorfuncion(texto) {
  if (texto.length >= 3) {
    const filtrados = pokemones.filter(p =>
      p.name.toLowerCase().includes(texto.toLowerCase())
    );
    document.getElementById("la-lista").innerHTML = generarlista(filtrados);
  } else {
    document.getElementById("la-lista").innerHTML = generarlista(pokemones);
  }
}

async function filtroconexion(filtroelegido) {
  const pokesfiltrados = await conexionlista(filtroelegido);
  document.getElementById("la-lista").innerHTML = generarlista(pokesfiltrados);
}

function home() {
  const buscador = document.createElement("input");
  buscador.classList.add("c-buscador");
  buscador.type = "text";
  buscador.placeholder = "Buscar Pokémon...";
  buscador.addEventListener("input", () => buscadorfuncion(buscador.value));

  const tipos = [
    "all", "normal", "fighting", "flying", "poison", "ground", "rock", "bug",
    "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice",
    "dragon", "dark", "fairy"
  ];

  const filtro = document.createElement("div");
  filtro.classList.add("c-filtro");

  tipos.forEach(tipo => {
    const btn = document.createElement("button");
    btn.textContent = tipo;
    btn.addEventListener("click", () => filtroconexion(tipo));
    filtro.appendChild(btn);
  });

  const contenedorlista = document.createElement("div");
  contenedorlista.classList.add("c-lista");
  contenedorlista.id = "la-lista";
  contenedorlista.innerHTML = generarlista(pokemones);

  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(buscador);
  root.appendChild(filtro);
  root.appendChild(contenedorlista);
}
