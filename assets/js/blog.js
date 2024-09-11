document.addEventListener("DOMContentLoaded", function() {
   
    
    const images = [
        "img/image_5.jpg",
        "img/about-1.jpg",
        "img/image_4.jpg",
        "img/gallery-5.jpg",
        "img/image_3.jpg"
    ];

    // Retrieve the token from localStorage
    const token = localStorage.getItem('jwtToken');

    // Check if token is available
    if (!token) {
        document.getElementById("petsContainer").innerHTML = "<p>No token found. Please log in.</p>";
        return;
    }

    fetch("http://localhost:8080/api/pets", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("No hay mascotas disponibles.");
        }
        return response.json();
    })
    .then(pets => {
        const container = document.getElementById("petsContainer");
        container.innerHTML = ""; // Clear the container before inserting new pets

        if (pets.length === 0) {
            container.innerHTML = "<p>No hay mascotas disponibles.</p>";
            return;
        }

        pets.forEach((pet, index) => {
            const imageUrl = images[index % images.length];
            const petName = pet.pet_name || "Nombre desconocido";
            const petBreed = pet.pet_breed || "Raza desconocida";
            const petDescription = pet.pet_description || "Descripción no disponible";
            const petId = pet.id;
            const petElement = document.createElement("div");
            petElement.classList.add("col-md-6", "col-lg-6", "col-xl-4", "wow", "fadeInUp");
            petElement.setAttribute("data-wow-delay", `${0.1 * (index + 1)}s`);

            petElement.innerHTML = `
                <div class="blog-item bg-light rounded p-4" style="background-image: url(img/bg.png);">
                    <div class="project-img">
                        <img src="${imageUrl}" class="img-fluid w-100 rounded" alt="Image of ${petName}">
                        <div class="blog-plus-icon">
                            <a href="${imageUrl}" data-lightbox="blog-${index + 1}" class="btn btn-primary btn-md-square rounded-pill"><i class="fas fa-plus fa-1x"></i></a>
                        </div>
                    </div>
                    <div class="my-4">
                        <h3>${petName}</h3>
                    </div>
                    <div class="d-flex justify-content-between">
                        <h4>Raza: <span class="text-custom-green">${petBreed}</span></h4>
                    </div>
                    <h4></h4>
                    <h4>${petDescription}</h4>
                    <a class="btn btn-primary rounded-pill py-2 px-4 adopt-btn" href="adoptalo.html" data-id="${petId}">Adoptalo</a>
                </div>
            `;

            container.appendChild(petElement);
        });

        // Add event listener to all adopt buttons
        const adoptButtons = document.querySelectorAll('.adopt-btn');
        adoptButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                const petId = this.getAttribute('data-id');
                localStorage.setItem('selectedPetId', petId); // Save the pet ID in localStorage
            });
        });
    })
    .catch(error => {
        console.error("Hubo un problema con la solicitud de mascotas:", error);
        document.getElementById("petsContainer").innerHTML = "<p>No hay mascotas disponibles.</p>";
    });
});
