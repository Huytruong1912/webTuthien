document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("register-form")?.addEventListener("submit", function(event) {
        event.preventDefault();

        let username = document.getElementById("register-username").value;
        let password = document.getElementById("register-password").value;
        let confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            document.getElementById('register-status').innerText = 'Passwords do not match.';
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        if (users.some(user => user.username === username)) {
            document.getElementById('register-status').innerText = 'Username already registered.';
            return;
        }

        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));
        
        console.log("Registration successful!");
        window.location.href = 'dangnhap.html'; // Redirect to login page
    });
});
