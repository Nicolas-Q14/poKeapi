var esFavorito = false;

// Función para agregar o quitar un Pokémon de favoritos
function toggleFavorito(paramid, paramname) {

    // Leer favoritos actuales desde localStorage
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let existe = false;

    // Verificar si ya está guardado
    for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].name === paramname) {
            existe = true;
            break;
        }
    }

    if (existe) {
        // Si ya existe, lo eliminamos
        favoritos = favoritos.filter(poke => poke.name !== paramname);
        esFavorito = false;
    } else {
        // Si no está, lo agregamos
        favoritos.push({
            name: paramname,
            url: `https://pokeapi.co/api/v2/pokemon/${paramid}/`
        });
        esFavorito = true;
    }

    // Guardar el array actualizado en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Actualizar el icono en pantalla (si existe el botón)
    const boton = document.querySelector(`#corazon-${paramid}`);
    if (boton) boton.textContent = esFavorito ? "❤" : "🤍";
}

// Función para mostrar el detalle del Pokémon
async function Detalle(id) {
        
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    const tipos = data.types.map(t => t.type.name).join(", ");

    // Verificamos si ya está en favoritos para mostrar el corazón correcto
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const esFavoritoActual = favoritos.some(poke => poke.name === data.name);

    const detalle = `
        <section class="c-detalle">
            <button onclick="home()">← Volver</button>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" 
                 alt="${data.name}" height="120">
            <h2>${data.name}</h2>
            <p><b>ID:</b> ${data.id}</p>
            <p><b>Tipo:</b> ${tipos}</p>
            <p><b>Altura:</b> ${(data.height / 10).toFixed(1)} m</p>
            <p><b>Peso:</b> ${(data.weight / 10).toFixed(1)} kg</p>
            <p><b>HP:</b> ${data.stats[0].base_stat}</p>
            <p><b>Velocidad:</b> ${data.stats[5].base_stat}</p>
            <p><b>Habilidad principal:</b> ${data.abilities[0].ability.name}</p>
            <button onclick="toggleFavorito(${data.id}, '${data.name}')">
                <span id="corazon-${data.id}">${esFavoritoActual ? '❤' : '🤍'}</span> Favorito
            </button>
        </section>
    `;

    document.getElementById("root").innerHTML = detalle;
}