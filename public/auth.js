const rightNav = document.getElementById('rightNav');
const userName = document.getElementById('userName');

function login() {
    // login with google
}

function logout() {
    // logout
}

function createAuthButton(type) {
    const authButton = document.createElement('button');
    const authButtonAttribute = {}

    if (type === 'login') {
        authButtonAttribute.id = 'loginButton'
        authButtonAttribute.text = 'Login'
        authButtonAttribute.className = 'is-success';
        authButtonAttribute.onClick = login;
    } else if (type === 'logout') {
        authButtonAttribute.id = 'logoutButton'
        authButtonAttribute.text = 'Logout'
        authButtonAttribute.onClick = logout;
    }

    authButton.setAttribute('id', authButtonAttribute.id);
    authButton.setAttribute('class', `button is-small ${authButtonAttribute.className}`);
    authButton.innerText = authButtonAttribute.text;
    authButton.addEventListener('click', authButtonAttribute.onClick);
    rightNav.appendChild(authButton);
}