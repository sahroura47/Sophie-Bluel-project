const API_URL = "http://localhost:5678/api/"

const projectBtn= document.getElementById('projects');
projectBtn.addEventListener('click', () => {
    window.location.href='/index.html';
});


document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();


    const email = document.getElementById("emailAddress").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    try {
        const response = await fetch(API_URL + "users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();
        if (response.ok){
            localStorage.setItem('authToken', data.token);
            window.location.href='/newHomePage.html';
        }
        if (!response.ok) {
            throw new Error()

        }
        
        localStorage.setItem('authToken', data.token);
        window.location.href='/newHomePage.html';


    } catch (error) {
        errorMessage.innerText = 'Email ou mot de passe invalide!';
    }
});
