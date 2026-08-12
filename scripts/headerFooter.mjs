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

        hamburgerBtn.addEventListener('click', () => {
            navBar.classList.toggle('open');
            hamburgerBtn.classList.toggle('open');
        });

        headerContainer.appendChild(clone);

    } catch (error) {
        console.error("Error loading Header:", error);
    }
};

export async function loadFooter() {
    try {
        const response = await fetch("data/footer.json");
        const data = await response.json();

        const template = document.getElementById("footer-template");
        const footerContainer = document.getElementById("footer");

        const clone = template.content.cloneNode(true);

        const videodemo = clone.querySelector("#video-link");
        videodemo.textContent = data.videoDemo.text;
        videodemo.href = data.videoDemo.url;

        const socialDiv = clone.querySelector("#social-link");
        data.socials.forEach(social => {
            const a = document.createElement("a");
            a.href = social.url;
            a.target = "_target";

            const img = document.createElement("img");
            img.src = social.icon;
            img.alt = social.name;
            img.width = social.width;
            img.height = social.height;

            a.appendChild(img);
            socialDiv.appendChild(a);
        });

        const author = clone.querySelector("#author-info");
        author.textContent = `${data.author} - ${data.location}`;

        footerContainer.appendChild(clone);
    } catch (error) {
        console.error("Error loading footer:", error);
    }
}