(function () {
  const noJs = document.querySelector('.no-js');
  const body = document.querySelector('.page');
  const menu = document.querySelectorAll('.footer__menu-dropdown');
  const menuBtns = document.querySelectorAll('.footer__title');

  const MASKED = '+7 (___) ___-__-__';
  const userInputsTel = document.querySelectorAll('.form__item--tel input');

  // footer accordeon

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

  // Маска для телефона
  if (userInputsTel) {
    const checkMask = (evt) => {

      const keyCode = evt.key;
      const template = MASKED;
      const templateNumbersValue = template.replace(/\D/g, '');
      const inputNumbersValue = evt.target.value.replace(/\D/g, '');

      let i = 0;
      let newValue = template
        .replace(/[_\d]/g, (a) => i < inputNumbersValue.length ? inputNumbersValue.charAt(i++) || templateNumbersValue.charAt(i) : a);

      i = newValue.indexOf('_');

      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }

      let reg = template.substring(0, evt.target.value.length)
        .replace(/_+/g, (a) => `\\d{1,${ a.length}}`)
        .replace(/[+()]/g, '\\$&'); reg = new RegExp(`^${reg}$`);

      if (!reg.test(evt.target.value) || evt.target.value.length < 5 || keyCode > 47 && keyCode < 58) {
        evt.target.value = newValue;
      }

      if (evt.type === 'blur' && evt.target.value.length < 5) {
        evt.target.value = '';
      }
    };

    userInputsTel.forEach((userInputTel) => {
      userInputTel.addEventListener('input', checkMask);
      userInputTel.addEventListener('focus', checkMask);
      userInputTel.addEventListener('blur', checkMask);
    });
  }
})();
