function GenerarLista(lista) {
    var listapokes = "";
    for (var i = 0; i < lista.length; i++) {
        let nombre = lista[i].name;

        // Extraer ID del URL
        let url = lista[i].url;
        let id = url.split("/")[url.split("/").length - 2];

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
        const filtrados = pokemones.filter(p => p.name.toLowerCase().includes(asa.toLowerCase()));
        document.getElementById("la-lista").innerHTML = GenerarLista(filtrados);
    } else {
        document.getElementById("la-lista").innerHTML = GenerarLista(pokemones);
    }
}

function Home() {
    const root = document.getElementById("root");
    root.innerHTML = ""; // ← Limpiamos el contenido anterior

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
    const contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-lista");
    contenedorLista.id = "la-lista";

    // Agregar todo al root
    root.appendChild(filtro);
    root.appendChild(buscador);
    root.appendChild(contenedorLista);

    // Mostrar todos los pokes de inicio
    document.getElementById("la-lista").innerHTML = GenerarLista(pokemones);
}

// 🔹 Nueva función Detalle con botón VOLVER
async function Detalle(id) {
    const root = document.getElementById("root");
    root.innerHTML = "<p>Cargando...</p>";

    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await respuesta.json();

    root.innerHTML = `
        <div class="detalle">
            <h2>#${data.id} ${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Altura:</strong> ${data.height}</p>
            <p><strong>Peso:</strong> ${data.weight}</p>
            <p><strong>Tipos:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>

            <button onclick="Home()" class="btn-volver">Volver</button>
        </div>
    `;
}

