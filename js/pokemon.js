var esfavorito = false;

function togglefavorito(paramid, paramname) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let existe = favoritos.some(poke => poke.name === paramname);

    if (existe) {
        favoritos = favoritos.filter(poke => poke.name !== paramname);
        esfavorito = false;
    } else {
        favoritos.push({
            name: paramname,
            url: `https://pokeapi.co/api/v2/pokemon/${paramid}/`
        });
        esfavorito = true;
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    const boton = document.querySelector(`#corazon-${paramid}`);
    if (boton) boton.textContent = esfavorito ? "❤️" : "🤍";
}

async function detalle(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    const tipos = data.types.map(t => t.type.name).join(", ");

    // Revisar si ya es favorito
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const esfav = favoritos.some(poke => poke.name === data.name);

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
            <button onclick="togglefavorito(${data.id}, '${data.name}')">
                <span id="corazon-${data.id}">${esfav ? '❤️' : '🤍'}</span> Favorito
            </button>
        </section>
    `;

    document.getElementById("root").innerHTML = detalle;
}
