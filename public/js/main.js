const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

// Some templates may not render the full navigation markup.
// Guard against nulls so main.js doesn't crash and stop other JS.
if (backdrop && sideDrawer && menuToggle) {
  backdrop.addEventListener('click', backdropClickHandler);
  menuToggle.addEventListener('click', menuToggleClickHandler);
}
