document.addEventListener("DOMContentLoaded", function() {
    let username = localStorage.getItem('username');
    if (username) {
        // Check if elements exist before trying to manipulate them
        let loginLink = document.getElementById('login-link');
        let userGreeting = document.getElementById('user-greeting');
        let logoutLink = document.getElementById('logout-link');
        let usernameSpan = document.getElementById('username');

        if (loginLink) loginLink.classList.add('d-none');
        if (userGreeting) userGreeting.classList.remove('d-none');
        if (logoutLink) logoutLink.classList.remove('d-none');
        if (usernameSpan) usernameSpan.innerText = username;
    }

    // Hiển thị tổng số người đã đăng nhập trên trang chủ (nếu có)
    let loginCountElement = document.getElementById('login-count');
    if (loginCountElement) {
        let loginCount = localStorage.getItem('loginCount');
        loginCount = loginCount ? parseInt(loginCount) : 0;
        loginCountElement.innerText = loginCount;
    }
});

// Login Functionality
document.addEventListener("DOMContentLoaded", function() {
    // Handle login form submission
    document.getElementById("login-form")?.addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        let user = users.find(user => user.username === email && user.password === password);

        if (user) {
            console.log("Login successful!");
            localStorage.setItem('username', email);

            let loginCount = localStorage.getItem('loginCount');
            loginCount = loginCount ? parseInt(loginCount) + 1 : 1;
            localStorage.setItem('loginCount', loginCount);

            window.location.href = 'index.html'; // Redirect to home page
        } else {
            console.log("Login failed. Please check your username and password.");
            document.getElementById('status').innerText = 'Login failed. Please check your username and password.';
        }
    });

    // Handle password visibility toggle
    document.getElementById("toggle-password")?.addEventListener("click", function() {
        let passwordField = document.getElementById("password");
        let type = passwordField.type === "password" ? "text" : "password";
        passwordField.type = type;
    });
});

document.getElementById("logout")?.addEventListener("click", function(event) {
    event.preventDefault();
    
    // Clear login information
    localStorage.removeItem('username');
    
    // Update user interface
    let loginLink = document.getElementById('login-link');
    let userGreeting = document.getElementById('user-greeting');
    let logoutLink = document.getElementById('logout-link');

    if (loginLink) loginLink.classList.remove('d-none');
    if (userGreeting) userGreeting.classList.add('d-none');
    if (logoutLink) logoutLink.classList.add('d-none');
    
    // Redirect to login page
    window.location.href = 'dangnhap.html'; // Redirect to login page
});



