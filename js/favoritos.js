function favoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const root = document.getElementById("root");

    if (favoritos.length === 0) {
        root.innerHTML = "<p>No hay favoritos guardados.</p>";
    } else {
        root.innerHTML = generarlista(favoritos);
    }
}
