document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('jwtToken');
    
    // Guardar el petId en el localStorage (esto debe hacerse en el lugar adecuado)
    const petId = localStorage.getItem('selectedPetId');
    console.log('Pet ID guardado:', localStorage.getItem('selectedPetId'));
    console.log('Pet ID recuperado:', petId);
    
    const petImages = {
        1: "img/image_5.jpg",
        3: "img/about-1.jpg",
        4: "img/image_4.jpg",
        7: "img/gallery-5.jpg",
        9: "img/image_3.jpg"
    };

    // Mostrar la imagen correspondiente al petId
    if (petId && petImages[petId]) {
        const imageUrl = petImages[petId];
        const imageElement = document.querySelector(".about-img img");

        if (imageElement) {
            imageElement.src = imageUrl;
            console.log(`Imagen actualizada a: ${imageUrl}`);
        } else {
            console.error("Elemento de imagen no encontrado.");
        }
    } else {
        console.error("No se encontró la imagen para el petId:", petId);
    }

    // Manejo del formulario de adopción
    document.getElementById("donationForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Previene la acción por defecto de enviar el formulario

        // Recoger los datos del formulario
        const adoptionData = {
            username: document.getElementById("username").value,
            petId: petId // Añadir el petId a los datos de adopción
        };

        // Enviar los datos al servidor usando fetch
        fetch("http://localhost:8080/api/adoptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(adoptionData)
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Error en la creación de la adopción");
            }
        })
        .then(data => {
            alert("¡Gracias por adoptar una mascota!");
        })
        .catch(error => {
            console.error("Hubo un problema con la solicitud de adopción:", error);
            alert("Hubo un problema con tu adopción. Por favor, inténtalo de nuevo.");
        });
    });

    // Cargar donaciones (Ejemplo anterior)
    fetch("http://localhost:8080/api/donations")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener las donaciones");
            }
            return response.json();
        })
        .then(donations => {
            const container = document.getElementById("donationsContainer");
            container.innerHTML = ""; // Limpiar el contenedor antes de insertar nuevas donaciones

            const images = [
                "img/about.jpg",
                "img/img.jpg",
                "img/person_1.jpg",
                "img/staff-2.jpg"
            ];

            donations.forEach((donation, index) => {
                // Obtener la imagen correspondiente al índice
                const imageUrl = images[index % images.length];

                // Crear el elemento que contiene cada donación
                const donationElement = document.createElement("div");
                donationElement.classList.add("col-sm-6", "col-md-6", "col-lg-4", "col-xl-3", "wow", "fadeInUp");
                donationElement.setAttribute("data-wow-delay", `${0.1 * (index + 1)}s`);

                // Generar el HTML para cada donación con la estructura que necesitas
                donationElement.innerHTML = `
                    <div class="team-item rounded">
                        <div class="team-img">
                            <img src="${imageUrl}" class="img-fluid w-100 rounded-top" alt="Image">
                        </div>
                        <div class="team-content bg-dark text-center rounded-bottom p-4">
                            <div class="team-content-inner rounded-bottom">
                                <h4 class="text-white">${donation.donation_amount}€</h4>
                                <p class="text-white mb-0">${donation.username}</p>
                            </div>
                        </div>
                    </div>
                `;

                // Insertar la donación en el contenedor
                container.appendChild(donationElement);
            });

            if (donations.length === 0) {
                container.innerHTML = "<p>No hay donaciones disponibles.</p>";
            }
        })
        .catch(error => {
            console.error("Hubo un problema con la solicitud de donaciones:", error);
            document.getElementById("donationsContainer").innerHTML = "<p>Error al cargar las donaciones.</p>";
        });
});

