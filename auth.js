
// auth.js

// Constants for username generation
const actionHeroes = [
    'Rambo', 'Terminator', 'McClane', 'Rocky', 'Wick',
    'Neo', 'Ripley', 'Bond', 'Norris', 'Schwarzenegger',
    'Stallone', 'VanDamme', 'Lundgren', 'Diesel', 'TheRock',
    'Maverick', 'Indiana', 'Solo', 'Vader', 'Skywalker'
];

const monkeys = [
    'Baboon', 'Chimp', 'Gorilla', 'Macaque', 'Lemur',
    'Gibbon', 'Mandrill', 'Orangutan', 'Capuchin', 'Tamarin',
    'Marmoset', 'Langur', 'Howler', 'Spider', 'Bonobo'
];

// --- Utilities ---

function generateUsername() {
    const hero = actionHeroes[Math.floor(Math.random() * actionHeroes.length)];
    const monkey = monkeys[Math.floor(Math.random() * monkeys.length)];
    // Ensure uniqueness? With this small set, collisions are possible but unlikely for a demo.
    // Logic: Hero-Monkey
    return `${hero}-${monkey}`;
}

function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();
}

// --- UI Functions for login.html ---

function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');
    const loginTab = document.getElementById('tab-login');
    const regTab = document.getElementById('tab-register');

    if (tab === 'login') {
        loginForm.classList.add('active');
        regForm.classList.remove('active');
        loginTab.classList.add('active');
        regTab.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        regForm.classList.add('active');
        loginTab.classList.remove('active');
        regTab.classList.add('active');
    }

    // Clear errors
    document.getElementById('login-error').innerText = '';
    document.getElementById('reg-error').innerText = '';
}

function handleRegister() {
    const passwordInput = document.getElementById('reg-password');
    const errorDisplay = document.getElementById('reg-error');
    const password = passwordInput.value;

    // Validation
    if (password.length > 4) {
        errorDisplay.innerText = "Hallå! För många tecken! Max 4, vi har inte hela dagen.";
        return;
    }

    if (!password.toLowerCase().includes('apa')) {
        errorDisplay.innerText = "Är du seriös? Lösenordet måste innehålla 'apa'.";
        return;
    }

    // Generate Name
    let username = generateUsername();

    // Simple check to avoid duplicates (though unlikely)
    const users = getUsers();
    let attempts = 0;
    while (users.find(u => u.username === username) && attempts < 10) {
        username = generateUsername();
        attempts++;
    }

    // Save
    saveUser({ username, password });
    setCurrentUser(username);

    alert(`Grattis! Ditt nya namn är: ${username}\nKom ihåg det (och lösenordet)!`);
    window.location.href = 'index.html';
}

function handleLogin() {
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const errorDisplay = document.getElementById('login-error');

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        setCurrentUser(user.username);
        window.location.href = 'index.html';
    } else {
        errorDisplay.innerText = "Nix. Fel namn eller lösenord. Har du glömt vem du är?";
    }
}

// --- UI Functions for index.html ---

function checkLoginStatus() {
    const currentUser = getCurrentUser();
    const header = document.querySelector('header');

    // Find or create the user display element
    let userDisplay = document.getElementById('user-status');
    if (!userDisplay) {
        userDisplay = document.createElement('div');
        userDisplay.id = 'user-status';
        userDisplay.className = 'user-display'; // Add class for styling
        header.appendChild(userDisplay);
    }

    if (currentUser) {
        userDisplay.innerHTML = `
            <span>Välkommen, ${currentUser}!</span>
            <button onclick="logout()" class="logout-btn">Logga ut</button>
        `;
    } else {
        userDisplay.innerHTML = `
            <a href="login.html?tab=login" class="login-link">Logga in</a>
        `;
    }
}
