document.querySelector('.user_login form').addEventListener('submit', function(event) {
    event.preventDefault();
    let username = document.querySelector('.user_login input[type="text"]').value;
    let password = document.querySelector('.user_login input[type="password"]').value;

    let loginData = {
        username: username,
        password: password
    };

    authenticateUser(loginData);
});

document.querySelector('.user_register form').addEventListener('submit', function(event) {
    event.preventDefault();
    let fullName = document.querySelector('.user_register input[type="text"]').value;
    let email = document.querySelector('.user_register input[type="email"]').value;
    let password = document.querySelector('.user_register input[type="password"]').value;

    let registerData = {
        username: fullName, 
        password: password,
        email: email
    };

    registerUser(registerData);
});

function authenticateUser(data) {
    fetch('http://localhost:8080/api/auth/signin', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('jwtToken', data.token);
            console.log('Token guardado en localStorage:', localStorage.getItem('jwtToken')); // Verifica que el token esté guardado luego de pruebas quitar
            alert('Login successful');
            alert('Login successful');
            window.location.href = "index.html"; // Redirigir
        } else {
            alert('Login failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function registerUser(data) {
    fetch('http://localhost:8080/api/auth/signup', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User registered successfully') {
            alert('Registration successful');
            window.location.href = "index.html"; // Redirigir
        } else {
            alert('Registration failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
