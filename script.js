'use strict';

// --------------------- THEME MANIPULATION ---------------------

const themes = {
  retro: document.querySelector('.retro'),
  // navyBlue: document.querySelector('.navy-blue'),
};

for (const theme in themes) {
  themes[theme].addEventListener('click', function () {
    changeTheme(themes[theme].className);
  });
}

const initializeTheme = () => {
  const savedTheme = localStorage.getItem('currentTheme');
  if (savedTheme) changeTheme(savedTheme);
};

const changeTheme = function (themeName) {
  // naming needs to be changed so we can access
  // themes that exist in themes.css
  const themeCSS = 'theme--' + themeName;

  document.body.classList.remove(
    'theme--' + localStorage.getItem('currentTheme')
  );
  document.body.classList.add(themeCSS);
  localStorage.setItem('currentTheme', themeName);
};

initializeTheme();

// ------------------- HANDLING KEY PRESS -------------------

const handleKeyPress = function (e) {
  console.log(e);

  e.preventDefault();

  // Edge case mentioned in https://github.com/Mostafa-Abbasi/KeyboardTester/issues/4
  // Detect AltGr key press (Alt + Control pressed simultaneously)
  const isAltGr = e.key === 'AltGraph';

  // Ignore the left Control key if AltGr is pressed
  if (isAltGr) {
    document
      .querySelector('.' + 'controlleft')
      .classList.remove('key-pressing-simulation');

    document
      .querySelector('.' + 'controlleft')
      .classList.remove('key--pressed');
  }

  const keyElement = document.querySelector('.' + e.code.toLowerCase());

  if (e.type === 'keydown') {
    keyElement.classList.add('key-pressing-simulation');
  } else if (e.type === 'keyup') {
    keyElement.classList.remove('key-pressing-simulation');
  }

  if (!keyElement.classList.contains('key--pressed')) {
    keyElement.classList.add('key--pressed');
  }

  // Handle special Meta/OS key case
  if (e.key === 'Meta' || e.key === 'OS') {
    keyElement.classList.remove('key-pressing-simulation');
  }
};

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyPress);

// --------------------- CHANGING LAYOUT ---------------------

// 