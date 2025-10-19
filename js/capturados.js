var misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

function Aleatorios() {
  const nuevos = document.getElementById("nuevos");
  nuevos.innerHTML = "";
  console.log("----------------------------------");

  let pokesAleatorios = "";

  for (let i = 0; i < 4; i++) {
    let num = Math.floor(Math.random() * pokemones.length) + 1;

    pokesAleatorios += `
      <div class="c-lista-pokemon c-un_aleatorio">
        <p>${num}</p>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png" 
             alt="${pokemones[num - 1].name}" width="60" height="60">
        <p>${pokemones[num - 1].name}</p>
      </div>`;

    // Comprobar si ya existe
    misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];
    if (!misNumeros.includes(num)) {
      misNumeros.push(num);
      localStorage.setItem("misNumeros", JSON.stringify(misNumeros));

      const elemento = document.getElementById("c-unpoke-" + num);
      if (elemento) {
        elemento.innerHTML = `
          <div onclick="detalle('${num}')">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png" 
                 width="auto" height="45" loading="lazy" alt="${num}">
            <p>${num}</p>
          </div>`;
        elemento.classList.add("c-mios-pokemon");
      }
    }
  }

  nuevos.innerHTML = pokesAleatorios;
  document.getElementById("contador").innerHTML = `${misNumeros.length} / ${totalPokes}`;
}

function Capturados() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  // Crear sección aleatoria
  const capturaAleatorea = document.createElement("section");
  capturaAleatorea.classList.add("c-lista");
  capturaAleatorea.id = "nuevos";

  // Botón de aleatorios
  const boton = document.createElement("button");
  boton.textContent = "4 nuevos";
  boton.addEventListener("click", Aleatorios);

  // Crear álbum
  const seccioncapturados = document.createElement("section");
  seccioncapturados.classList.add("c-lista");

  let misPokes = "";
  for (let i = 1; i <= totalPokes; i++) {
    if (misNumeros.includes(i)) {
      misPokes += `
        <div class="c-unpoke c-mios-pokemon poke-${i}" onclick="detalle('${i}')">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" 
               width="auto" height="45" loading="lazy" alt="${i}">
          <p>${i}</p>
        </div>`;
    } else {
      misPokes += `
        <div class="c-unpoke" id="c-unpoke-${i}">
          <p>${i}</p>
        </div>`;
    }
  }

  seccioncapturados.innerHTML = misPokes;

  // Contador
  const contador = document.createElement("p");
  contador.textContent = `${misNumeros.length} / ${totalPokes}`;
  contador.id = "contador";

  // Agregar todo al DOM
  root.appendChild(contador);
  root.appendChild(boton);
  root.appendChild(capturaAleatorea);
  root.appendChild(seccioncapturados);
}
