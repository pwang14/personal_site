console.log("Hello world!");

const nav = document.querySelector('nav');

function openNav() {
    nav.style.right = '0';
}

function closeNav() {
    nav.style.right = `-15em`;
}

let isOpen = false;
function toggleNav() {
    if (isOpen) {
        closeNav();
        isOpen = false;
    }
    else {
        openNav();
        isOpen = true;
    }
}

const menuButton = document.querySelector('#menu-button');
menuButton.onclick = toggleNav;
