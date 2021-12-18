(function () {
  const noJs = document.querySelector('.no-js');
  const body = document.querySelector('.page');
  const menu = document.querySelectorAll('.footer__menu-dropdown');
  const menuBtns = document.querySelectorAll('.footer__title');

  const MASKED = '+7 (___) ___-__-__';
  const userInputsTel = document.querySelectorAll('.form__tel input');

  const modal = document.querySelector('.modal');
  const closeModalBtn = modal.querySelector('.modal__close-button');
  const headerBtn = document.querySelector('.header__button');
  const overlay = document.querySelector('.overlay');

  const modalName = document.querySelector('[name=modal-name]');
  const modalPhone = document.querySelector('[name=modal-phone]');
  const modalComment = document.querySelector('[name=modal-comment]');
  const modalForm = document.querySelector('.modal__form');

  // const footerRights = document.querySelector('.footer__bottom-item--rights');
  // const copyright = document.querySelector('.footer__copyright').innerHTML;


  // localStorage

  let isStorage = true;
  let nameStorage = '';
  let phoneStorage = '';
  let commentStorage = '';

  try {
    nameStorage = localStorage.getItem('nameStorage');
    phoneStorage = localStorage.getItem('phoneStorage');
    commentStorage = localStorage.getItem('commentStorage');
  } catch (err) {
    isStorage = false;
  }

  // footer accordeon
  if (menu && menuBtns && body) {
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
  }

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

  // modal

  const isEscEvent = (evt) => {
    return evt.key === 'Escape' || evt.key === 'Esc';
  };
  if (overlay && modal && body && modalName && modalPhone && modalComment && closeModalBtn) {
    const modalShow = () => {
      overlay.classList.add('overlay--open');
      modal.classList.add('modal--open');
      body.classList.add('no-scroll');
      modalName.focus();
      modalClose();

      if (nameStorage && phoneStorage) {
        modalName.value = nameStorage;
        modalPhone.value = phoneStorage;
        modalComment.value = commentStorage;
      }

      if (modalForm) {
        modalForm.addEventListener('submit', (evt) => {
          if (!modalName.value || !modalPhone.value) {
            evt.preventDefault();
          } else {
            if (isStorage) {
              localStorage.setItem('nameStorage', modalName.value);
              localStorage.setItem('phoneStorage', modalPhone.value);
              localStorage.setItem('commentStorage', modalComment.value);
            }
          }
        });
      }
    };

    const modalClose = () => {
      closeModalBtn.addEventListener('click', closeModalButton);
      document.addEventListener('click', closeModalOverlay);
      window.addEventListener('keydown', closeModalEsc);
    };

    if (headerBtn) {
      headerBtn.addEventListener('click', modalShow);
    }

    const closeModalButton = () => {
      overlay.classList.remove('overlay--open');
      modal.classList.remove('modal--open');
      body.classList.remove('no-scroll');

      closeModalBtn.removeEventListener('click', closeModalButton);
      document.removeEventListener('click', closeModalOverlay);
      window.removeEventListener('keydown', closeModalEsc);
    };

    const closeModalOverlay = (evt) => {
      let target = evt.target;
      if (!target.closest('.header__button')) {
        if (!target.closest('.modal')) {
          overlay.classList.remove('overlay--open');
          modal.classList.remove('modal--open');
          body.classList.remove('no-scroll');

          closeModalBtn.removeEventListener('click', closeModalButton);
          document.removeEventListener('click', closeModalOverlay);
          window.removeEventListener('keydown', closeModalEsc);
        }
      }
    };

    const closeModalEsc = (evt) => {
      if (isEscEvent(evt)) {
        if (modal.classList.contains('modal--open')) {
          evt.stopPropagation();
          overlay.classList.remove('overlay--open');
          modal.classList.remove('modal--open');
          body.classList.remove('no-scroll');

          closeModalBtn.removeEventListener('click', closeModalButton);
          document.removeEventListener('click', closeModalOverlay);
          window.removeEventListener('keydown', closeModalEsc);
        }
      }
    };
  }


  // tab in overlay

  const trapFocus = (element) => {
    var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];
    var KEYCODE_TAB = 9;

    element.addEventListener('keydown', (evt) => {
      var isTabPressed = (evt.key === 'Tab' || evt.keyCode === KEYCODE_TAB);

      if (!isTabPressed) {
        return;
      }

      if (evt.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          evt.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          evt.preventDefault();
        }
      }
    });
  };

  if (modal) {
    trapFocus(modal);
  }

  /* // copyright

  if (footerRights && copyright) {
    footerRights.insertAdjacentHTML(
        'afterend', `<li class="footer__bottom-item footer__bottom-item--copyright">
      <a class="footer__bottom-link">${copyright}</a>
    </li>`
    );
  }
*/
})();
