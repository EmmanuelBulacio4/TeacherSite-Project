export async function loadHeader() {
    try {
        const response = await fetch("data/header.json");
        const data = await response.json();

        const template = document.getElementById("header-template");
        const headerContainer = document.getElementById("header");

        //Fill the template
        const clone = template.content.cloneNode(true);

        const img = clone.querySelector("#icon");
        const title = clone.querySelector("#title");
        const hamburgerBtn = clone.querySelector("#hamburger");
        const navBar = clone.querySelector("#nav-bar");
        const navList = clone.querySelector("#nav-list");

        img.alt = data.logo.alt;
        img.src = data.logo.src;
        img.width = data.logo.width;
        img.height = data.logo.height;

        title.textContent = data.title;

        data.navigation.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = item.url;
            a.textContent = item.text;

            li.appendChild(a);
            navList.appendChild(li);
        });

        //hamburguer botton

        hamburgerBtn.addEventListener('click', () => {
            navBar.classList.toggle('open');
            hamburgerBtn.classList.toggle('open');
        });

        // 7. Inyectar todo el contenido en el contenedor del DOM
        headerContainer.appendChild(clone);

    } catch (error) {
        console.error("Error al cargar los datos del encabezado:", error);
    }
};