document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
       
        // Si no hay token, redirige a la página de login
        window.location.href = '/403.html';
    } else {
        // Verifica el token en el servidor
     
        fetch('http://localhost:8080/api/auth/validate', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                // Si el token es válido, muestra la página
                document.body.style.display = 'block';
            } else {
                
                // Si el token no es válido, redirige a la página de login
                window.location.href = '/403.html';
            }
        })
        .catch(error => {
          
            console.error('Error al verificar el token:', error);
            window.location.href = '/403.html';
        });
    }
});

// Oculta el contenido de la página inicialmente
document.body.style.display = 'none';


