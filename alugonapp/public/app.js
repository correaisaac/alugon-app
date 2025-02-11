document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeMenu = document.querySelector(".close-menu");

    menuToggle.addEventListener("click", () => {
        mobileMenu.style.left = "0";
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.style.left = "-250px";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const spaces = [
        {
            img: "https://images.trvl-media.com/lodging/1000000/50000/49400/49356/0b29032c.jpg?impolicy=resizecrop&rw=1200&ra=fit",
            title: "Apartamento Luxuoso",
            location: "São Paulo, Brasil",
            price: "R$ 250/noite"
        },
        {
            img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/192566912.jpg?k=2233e051f768bf54350fe9554a23c55929791be29fd7ed64ae6d3138fe47ae79&o=&hp=1",
            title: "Casa de Campo",
            location: "Gramado, Brasil",
            price: "R$ 400/noite"
        },
        {
            img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/278202985.jpg?k=35167d7b623d36ef0972e34194dd30497d979db5878eb845a02fbb61c25f3c52&o=&hp=1",
            title: "Vila Beira-Mar",
            location: "Rio de Janeiro, Brasil",
            price: "R$ 600/noite"
        }
    ];

    const spaceGrid = document.querySelector(".space-grid");

    spaces.forEach(space => {
        const spaceCard = document.createElement("div");
        spaceCard.classList.add("space-card");

        spaceCard.innerHTML = `
            <img src="${space.img}" alt="${space.title}">
            <div class="space-card-content">
                <h3>${space.title}</h3>
                <p>${space.location}</p>
                <p class="price">${space.price}</p>
            </div>
        `;

        spaceGrid.appendChild(spaceCard);
    });
});