const petImages = { 
    1: "img/image_5_1.jpg",
    3: "img/about-1_2.jpg",
    4: "img/image_4.jpg",
    7: "img/gallery-5.jpg",
    9: "img/image_3.jpg"
};

// Suponiendo que petId es el ID de la mascota que quieres mostrar
const petId = 1; // Cambia esto según tu prueba

// Mostrar la imagen correspondiente al petId
if (petId && petImages[petId]) {
    const imageUrl = petImages[petId];
    const imageElement = document.querySelector(".about-img");

    if (imageElement) {
        imageElement.src = imageUrl;
        console.log(`Imagen actualizada a: ${imageUrl}`);
    } else {
        console.error("Elemento de imagen no encontrado.");
    }
} else {
    console.error("No se encontró la imagen para el petId:", petId);
}


const token = localStorage.getItem('jwtToken');

function loadPets() {
    fetch("http://localhost:8080/api/pets", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('Respuesta de la API:', response);
        return response.json();
    })
    .then(data => {
        console.log('Datos recibidos:', data);
        const petsContainer = document.getElementById('petsContainer');
        petsContainer.innerHTML = ''; // Limpiar contenido anterior

        data.forEach(pet => {
            console.log('Procesando mascota:', pet);

            const petDiv = document.createElement('div');
            petDiv.classList.add('col-md-4');  // Ajustar el tamaño de las imágenes

            // Obtener la URL de la imagen basada en el ID de la mascota
            const imageUrl = petImages[pet.id] || 'img/default-image.jpg'; // Ruta de imagen por defecto
            console.log(`ID de mascota: ${pet.id}, URL de imagen: ${imageUrl}`);

            petDiv.innerHTML = `
                <div class="card-group">
                    <div class="card border-primary mb-3" "width: 7rem;";>
                        <img src="${imageUrl}" class="card-img-top img-fluid" alt="${pet.pet_name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${pet.pet_name}</h5>
                            <p class="card-text">${pet.pet_description}</p>
                            <a href="#" class="btn btn-warning">Editar</a>
                            <a href="#" class="btn btn-danger">Borrar</a>
                            
                        </div>
                    </div>
                </div>
            `;

            petsContainer.appendChild(petDiv);
        });
    })
    .catch(error => {
        console.error('Error al cargar las mascotas:', error);
    });
}

// Llamar a las funciones cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    loadPets();
    
});
 // Función para establecer la fecha y hora de actualización
 function updateFooterTime() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    lastUpdatedElement.textContent = `Updated at: ${formattedDate} ${formattedTime}`;
}


function loadDonations() {
    fetch("http://localhost:8080/api/donations", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener las donaciones');
        }
        return response.json();
    })
    .then(donations => {
        const donationsList = document.getElementById('donationsList');
        donationsList.innerHTML = ''; // Limpiar contenido anterior

        donations.forEach(donation => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

            listItem.innerHTML = `
                
                    <div class="card mb-4" style="width: 25rem;">
                        <div class="card-body">
                        <h3 class="card-title">${donation.username}</h3>
                           <h3><span class="badge bg-primary rounded-pill">${donation.donation_amount}€</span></h4>
                            <a href="#" class="btn btn-warning">Editar</a>
                        </div>
                       
                    </div>
                     <a href="#" class="btn btn-danger">Borrar</a>
                    
            
                `;

            donationsList.appendChild(listItem);
        });

        if (donations.length === 0) {
            donationsList.innerHTML = "<li class='list-group-item'>No hay donaciones disponibles.</li>";
        }
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud de donaciones:', error);
        document.getElementById('donationsList').innerHTML = "<li class='list-group-item'>Error al cargar las donaciones.</li>";
    });
}

// Función para establecer la fecha y hora de actualización
function updateFooterTime(elementId) {
    const lastUpdatedElement = document.getElementById(elementId);
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    lastUpdatedElement.textContent = `Updated at: ${formattedDate} ${formattedTime}`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadDonations();
    updateFooterTime("lastUpdated");
    updateFooterTime('donationsLastUpdated'); // Actualizar la fecha y hora para donaciones
    updateFooterTime('barChartLastUpdated');  // Actualizar la fecha y hora para el gráfico de barras
});