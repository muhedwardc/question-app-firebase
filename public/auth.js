const rightNav = document.getElementById('rightNav');
const userName = document.getElementById('userName');

firebase.auth().onAuthStateChanged(user => {
    const rightNavButton = rightNav.querySelector('button');
    if (rightNavButton) {
        rightNav.removeChild(rightNavButton);
    }

    if (user) {
        createAuthButton('logout');
        userName.hidden = false;
        userName.innerText = `Hello, ${user.displayName}`
    } else {
        createAuthButton('login');
        userName.hidden = true;
        userName.innerText = ''
    }
})

function currentUser() {
    return firebase.auth().currentUser;
}

function login() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider);
}

function logout() {
    firebase.auth().signOut();
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