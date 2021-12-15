(function () {
  const noJs = document.querySelector('.no-js');
  const body = document.querySelector('.page');
  const menu = document.querySelectorAll('.footer__menu-dropdown');
  const menuBtns = document.querySelectorAll('.footer__title');

  // fotter accordeon

  const hideMenu = () => {
    menu.forEach((item) => {
      item.classList.remove('footer__menu-dropdown--show');
    });

    menuBtns.forEach((item) => {
      item.classList.remove('footer__title--close');
    });
  };

  if (noJs) {
    body.classList.remove('no-js');
    hideMenu();
  }

  menuBtns.forEach((item) => {
    item.addEventListener('click', () => {
      const parent = item.parentNode.parentNode;
      if (document.documentElement.clientWidth < 768) {
        if (parent.querySelector('.footer__menu-dropdown').classList.contains('footer__menu-dropdown--show') && parent.querySelector('.footer__title').classList.contains('footer__title--close')) {
          parent.querySelector('.footer__menu-dropdown').classList.remove('footer__menu-dropdown--show');
          parent.querySelector('.footer__title').classList.remove('footer__title--close');
        } else {
          document.querySelectorAll('.footer__dropdown').forEach((child) => {
            child.querySelector('.footer__menu-dropdown').classList.remove('footer__menu-dropdown--show');
            child.querySelector('.footer__title').classList.remove('footer__title--close');

            parent.querySelector('.footer__menu-dropdown').classList.add('footer__menu-dropdown--show');
            parent.querySelector('.footer__title').classList.add('footer__title--close');
          });
        }
      }
    });
  });
})();
