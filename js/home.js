function GenerarLista(lista) {
    let listapokes = "";
    for (let i = 0; i < lista.length; i++) {
        let url = lista[i].url;
        let parts = url.split("/").filter(Boolean); // elimina vacíos
        let id = parts[parts.length - 1]; // último elemento = id
        let nombre = lista[i].name;

        listapokes += `
            <div class="c-lista-pokemon poke-${id}" onclick="Detalle('${id}')">
                <p>#${id}</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png"
                     width="auto" height="60" loading="lazy" alt="${nombre}">
                <p>${nombre}</p>
            </div>
        `;
    }
    return listapokes;
}

function buscadorfuncion(asa) {
    if (asa.length >= 3) {
        const filtrados = pokemones.filter(p =>
            p.name.toLowerCase().includes(asa.toLowerCase())
        );
        document.getElementById("la-lista").innerHTML = GenerarLista(filtrados);
    } else {
        // si se borra la búsqueda, mostrar todos
        document.getElementById("la-lista").innerHTML = GenerarLista(pokemones);
    }
}

function FiltroConexion(filtroelegido) {
    console.log("Filtro:", filtroelegido);
}

function home() {
    // buscador
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon...";
    buscador.addEventListener("input", () => {
        buscadorfuncion(buscador.value);
    });

    // filtro
    const tipos = [
        "normal", "fighting", "flying", "poison", "ground", "rock", "bug",
        "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice",
        "dragon", "dark", "fairy", "stellar", "unknown"
    ];
    const filtro = document.createElement("div");
    for (let i = 0; i < tipos.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = tipos[i];
        btn.addEventListener("click", () => {
            FiltroConexion(tipos[i]); 
        });
        filtro.appendChild(btn);
    }

    // lista
    const contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-lista");
    contenedorLista.id = "la-lista"; 
    contenedorLista.innerHTML = GenerarLista(pokemones);

    // root
    let root = document.getElementById("root");
    root.innerHTML = ""; 
    root.appendChild(buscador);
    root.appendChild(filtro);
    root.appendChild(contenedorLista);
}