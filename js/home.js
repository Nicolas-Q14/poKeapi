function home(parametro){
    for (var i = 0; i < 9; i++) {
        id = [i];
        nombre = pokemones[i].name;
        document.getElementById("root").innerHTML += `
            <div class="un-pokemon" onclick="Detalle(${id})">
                <p>${id} ${nombre}</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png">
            </div>
        `;
    }
}