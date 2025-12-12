document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const modal = document.getElementById('loginModal');
    const openLoginBtn = document.getElementById('openLoginBtn');
    const closeBtn = document.querySelector('.close-modal');
    const loginFormContainer = document.getElementById('loginFormContainer');
    const registerFormContainer = document.getElementById('registerFormContainer');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    // Auth Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');
    const userInfo = document.getElementById('userInfo');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutBtn = document.getElementById('logoutBtn');

    // State
    let isLoggedIn = false;

    // Functions to toggle modal
    function openModal() {
        modal.style.display = 'block';
        showLoginForm();
    }

    function closeModal() {
        modal.style.display = 'none';
        loginForm.reset();
        registerForm.reset();
        loginError.textContent = '';
        registerError.textContent = '';
    }

    function showLoginForm() {
        loginFormContainer.style.display = 'block';
        registerFormContainer.style.display = 'none';
    }

    function showRegisterForm() {
        loginFormContainer.style.display = 'none';
        registerFormContainer.style.display = 'block';
    }

    // Event Listeners
    openLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });

    switchToRegister.addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterForm();
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    // Check Auth Status
    async function checkAuth() {
        try {
            const response = await fetch('/api/me');
            if (response.ok) {
                const data = await response.json();
                handleLoginSuccess(data.username);
            } else {
                handleLogoutSuccess();
            }
        } catch (error) {
            console.error('Error checking auth:', error);
        }
    }

    function handleLoginSuccess(username) {
        isLoggedIn = true;
        usernameDisplay.textContent = `Hej, ${username}!`;
        openLoginBtn.style.display = 'none';
        userInfo.style.display = 'block';
        closeModal();
    }

    function handleLogoutSuccess() {
        isLoggedIn = false;
        usernameDisplay.textContent = '';
        openLoginBtn.style.display = 'block';
        userInfo.style.display = 'none';
    }

    // Login Submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginError.textContent = 'Loggar in...';

        const username = loginForm.username.value;
        const password = loginForm.password.value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                handleLoginSuccess(data.username);
            } else {
                loginError.textContent = data.error || 'Något gick fel.';
            }
        } catch (error) {
            loginError.textContent = 'Kunde inte ansluta till servern.';
        }
    });

    // Register Submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        registerError.textContent = 'Registrerar...';

        const username = registerForm.username.value;
        const password = registerForm.password.value;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Auto login after register? Or just switch to login.
                // Let's switch to login and fill details or auto-login.
                // For simplicity, let's ask them to login.
                registerError.style.color = 'green';
                registerError.textContent = 'Registrering lyckades! Loggar in...';

                // Attempt auto-login
                const loginResponse = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });

                if (loginResponse.ok) {
                    handleLoginSuccess(username);
                } else {
                    showLoginForm();
                    loginError.textContent = 'Registrering lyckades. Var god logga in.';
                }

            } else {
                registerError.style.color = '#d32f2f';
                registerError.textContent = data.error || 'Något gick fel.';
            }
        } catch (error) {
            registerError.style.color = '#d32f2f';
            registerError.textContent = 'Kunde inte ansluta till servern.';
        }
    });

    // Logout
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/logout', { method: 'POST' });
            if (response.ok) {
                handleLogoutSuccess();
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    });

    // Initial check
    checkAuth();
});
