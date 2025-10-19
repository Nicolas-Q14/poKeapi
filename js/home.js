function GenerarLista(lista) {
    var listapokes = "";
    for (var i = 0; i < lista.length; i++) {
        let nombre = lista[i].name;

        // Extraer ID del URL
        let url = lista[i].url;
        let id = url.split("/")[url.split("/").length - 2]; // el penúltimo elemento es el ID

        listapokes += `
            <div class="un-pokemon" onclick="Detalle(${id})">
                <p>#${id} ${nombre}</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
            </div>
        `;
    }
    return listapokes;
}

function buscadorfuncion(asa) {
    if (asa.length >= 3) {
        const filtrados = [];
        for (let i = 0; i < pokemones.length; i++) {
            const nombre = pokemones[i].name.toLowerCase();
            if (nombre.includes(asa.toLowerCase())) {
                filtrados.push(pokemones[i]);
            }
        }
        let listaHTML = GenerarLista(filtrados);
        document.getElementById("la-lista").innerHTML = listaHTML;
    } else {
        let listaHTML = GenerarLista(pokemones); // ← corregido (G mayúscula)
        document.getElementById("la-lista").innerHTML = listaHTML;
    }
}

function Home() {
    // Buscador
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon...";
    buscador.addEventListener("input", () => {
        buscadorfuncion(buscador.value);
    });

    // Filtros
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

    // Lista
    var contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-lista");
    contenedorLista.id = "la-lista";

    // Agregar al root
    document.getElementById("root").appendChild(filtro);
    document.getElementById("root").appendChild(buscador);
    document.getElementById("root").appendChild(contenedorLista);

    // Mostrar todos los pokes de inicio
    document.getElementById("la-lista").innerHTML = GenerarLista(pokemones);
}
