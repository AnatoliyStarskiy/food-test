/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/form.js":
/*!************************!*\
  !*** ./src/js/form.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sendFormData: () => (/* binding */ sendFormData)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./src/js/modal.js");
// form.js
// Модуль для отправки данных формы на сервер и показа статуса через модальное окно
// Этот код снабжён подробными обучающими комментариями для самостоятельного изучения.

// Импортируем функции управления модальным окном из отдельного модуля

/**
 * Инициализирует обработку всех форм на странице: отправка данных через AJAX и показ статуса через модальное окно
 * — Находит все формы
 * — Навешивает обработчик отправки на каждую форму
 * — Показывает индикатор загрузки, отправляет данные на сервер, показывает результат
 */
function sendFormData() {
  // 1. Находим все формы на странице (селектор "form" выбирает все <form>)
  // forms — NodeList из DOM-элементов-форм, которые будут отправляться через AJAX
  const forms = document.querySelectorAll("form");

  // 2. Объект с сообщениями для разных этапов отправки формы
  // loading — путь к спиннеру (картинка загрузки)
  // success — текст при успешной отправке
  // failure — текст при ошибке
  const messages = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так..."
  };

  // 3. Для каждой найденной формы навешиваем обработчик отправки через postDataJSON
  // Это позволяет обрабатывать любое количество форм на странице одинаково
  forms.forEach(form => postDataJSON(form));

  /**
   * Навешивает обработчик submit на форму и отправляет данные в формате JSON через AJAX
   * — Показывает индикатор загрузки
   * — Собирает данные формы
   * — Отправляет их на сервер
   * — Показывает результат (успех/ошибка) через модальное окно
   * @param {HTMLFormElement} form — DOM-элемент формы
   */
  function postDataJSON(form) {
    // Защита от двойного навешивания обработчика (если функцию вызовут повторно)
    // Это важно, чтобы не было дублирующих запросов и багов при повторной инициализации
    if (form.dataset.ajaxBound === "1") return;
    form.dataset.ajaxBound = "1";

    // Навешиваем обработчик события submit на форму
    form.addEventListener("submit", e => {
      e.preventDefault(); // Отменяем стандартную отправку формы (перезагрузку страницы)

      // 1. Показываем индикатор загрузки (spinner) внутри формы
      // Это визуальная обратная связь для пользователя, что данные отправляются
      const statusMessage = document.createElement("img");
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = "display:block;margin:0 auto;";
      form.insertAdjacentElement("afterend", statusMessage);

      // 2. Создаём и настраиваем XMLHttpRequest для отправки данных
      // XMLHttpRequest — стандартный способ отправки AJAX-запросов в браузере
      const request = new XMLHttpRequest();
      request.open("POST", "server.php"); // Настраиваем POST-запрос на сервер
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Указываем, что отправляем данные в формате JSON

      // 3. Собираем данные формы в объект (ключ-значение)
      // FormData — удобный способ получить все значения полей формы
      const formData = new FormData(form);
      const jsonObject = {};
      formData.forEach((value, key) => jsonObject[key] = value);

      // 4. Отправляем данные на сервер в формате JSON
      // JSON.stringify — преобразует объект в строку для передачи на сервер
      request.send(JSON.stringify(jsonObject));

      // 5. Обработка ответа сервера
      // Событие "load" — сервер ответил (успех или ошибка)
      request.addEventListener("load", () => {
        statusMessage.remove(); // Убираем индикатор загрузки

        if (request.status === 200) {
          // Если успешно — показываем модалку с успехом и сбрасываем форму
          showThanksModal(messages.success);
          form.reset(); // Очищаем поля формы
        } else {
          // Если ошибка — показываем модалку с ошибкой
          showThanksModal(messages.failure);
        }
      });

      // 6. Обработка сетевой ошибки (например, нет соединения)
      request.addEventListener("error", () => {
        statusMessage.remove();
        showThanksModal(messages.failure);
      });
    });
  }
  /*
   postDataJSON — навешивает обработчик на форму, собирает данные, отправляет их на сервер в формате JSON,
   показывает индикатор загрузки, обрабатывает ответ сервера (успех/ошибка), вызывает showThanksModal.
  */

  /**
   * Показывает модальное окно с сообщением (успех или ошибка)
   * — Скрывает основную форму в модалке
   * — Открывает модалку
   * — Создаёт и показывает блок с сообщением (успех/ошибка)
   * — Через 4 секунды (или при ручном закрытии) возвращает модалку к исходному состоянию
   * @param {string} message — текст сообщения для пользователя
   */
  function showThanksModal(message) {
    // 1. Находим модальное окно и основной диалог (форму) внутри него
    const modal = document.querySelector(".modal");
    const mainDialog = modal.querySelector(".modal__dialog");

    // 2. Прячем основной диалог с формой (добавляем класс hide, убираем show)
    if (mainDialog) {
      mainDialog.classList.add("hide");
      mainDialog.classList.remove("show");
    }

    // 3. Открываем модальное окно (делает его видимым)
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)();

    // 4. Удаляем старые "thanks"-модалки, если они остались (на всякий случай)
    modal.querySelectorAll(".modal__dialog--thanks").forEach(n => n.remove());

    // 5. Создаём новый блок для сообщения благодарности
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog", "modal__dialog--thanks", "show");
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

    // 6. Добавляем блок с сообщением в модальное окно
    modal.append(thanksModal);

    // 7. Автоматически закрываем модалку через 4 секунды (или пользователь может закрыть вручную)
    // Важно: даже если пользователь закроет раньше — closeModal() всё почистит
    setTimeout(() => {
      // если модалка уже закрыта — просто выходим
      if (!modal.classList.contains("modal--active")) return;
      (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
    }, 4000);
  }
  /*
   showThanksModal — скрывает основную форму в модалке, открывает модалку, создаёт и показывает блок с сообщением (успех/ошибка),
   через 4 секунды (или при ручном закрытии) возвращает модалку к исходному состоянию.
  */
}

/***/ }),

/***/ "./src/js/menu-cards.js":
/*!******************************!*\
  !*** ./src/js/menu-cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMenuCards: () => (/* binding */ createMenuCards)
/* harmony export */ });
// Экспортируемая функция для создания карточек меню
// containerSelector — CSS-селектор контейнера, куда будут добавляться карточки
// cardData — массив объектов с данными для каждой карточки
function createMenuCards(containerSelector, cardData) {
  // 1. Находим контейнер, в который будут добавляться карточки меню
  //    Например, '.menu__field .container' — это div внутри блока меню
  const container = document.querySelector(containerSelector);
  // 2. Если контейнер не найден — выводим ошибку в консоль и прекращаем выполнение функции
  if (!container) {
    console.error(`Контейнер с селектором '${containerSelector}' не найден!`);
    return;
  }

  // 3. Описываем класс MenuCards, который отвечает за создание и отображение одной карточки меню
  class MenuCards {
    // Конструктор принимает параметры для заполнения карточки
    // imgSrc — путь к изображению блюда
    // altText — alt-текст для изображения (для доступности)
    // title — заголовок карточки (название блюда)
    // description — описание блюда
    // price — цена блюда
    constructor(imgSrc, altText, title, description, price, ...classes) {
      this.img = imgSrc; // Сохраняем путь к изображению
      this.alt = altText; // Сохраняем alt-текст
      this.title = title; // Сохраняем заголовок
      this.description = description; // Сохраняем описание
      this.price = price; // Сохраняем цену
      this.classes = classes; // Сохраняем переданные классы для стилизации карточки
      this.transfer = 100; // Курс валюты (если нужно конвертировать цену)
      this.changeToRUB(); // Вызываем метод для конвертации цены в рубли
    }
    changeToRUB() {
      // Метод для конвертации цены в рубли
      this.price = +(this.price * this.transfer).toFixed(2);
    }

    // Метод для создания и добавления карточки в DOM
    // parent — DOM-элемент контейнера, куда будет добавлена карточка
    render(parent) {
      // 1. Создаём новый div-элемент для карточки
      const element = document.createElement("div");
      // 2. Добавляем класс для стилизации карточки
      if (this.classes.length === 0) {
        element.classList.add("menu__item");
      } else {
        this.classes.forEach(className => {
          element.classList.add(className);
        });
      }
      // 3. Формируем HTML-разметку карточки с помощью шаблонных строк
      element.innerHTML = `
                <img src="${this.img}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
      // 4. Добавляем карточку в родительский контейнер
      parent.append(element);
    }
  }

  // 4. Для каждого объекта с данными создаём и отрисовываем карточку меню
  cardData.forEach(({
    imgSrc,
    altText,
    title,
    description,
    price,
    classes = []
  }) => {
    // 1. Создаём экземпляр класса MenuCards с переданными данными
    const card = new MenuCards(imgSrc, altText, title, description, price, ...classes);
    // 2. Добавляем карточку в контейнер с помощью метода render
    card.render(container);
  });
  // 5. Функция не возвращает значения, а только добавляет карточки в DOM
}

/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   initModal: () => (/* binding */ initModal),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
// modal.js
// Модуль для управления модальным окном (popup/modal)
// Здесь реализованы функции открытия, закрытия и инициализации модального окна.
// Код снабжён подробными обучающими комментариями для самостоятельного изучения.

// modal — глобальная переменная, в которую мы сохраняем DOM-элемент модального окна.
// Это позволяет обращаться к модалке из разных функций.
let modal;

// modalTimerId — переменная для хранения идентификатора таймера автопоказа модалки.
// Таймер нужен, чтобы через определённое время автоматически показать окно пользователю.
let modalTimerId;

/**
 * Открывает модальное окно
 * — Проверяет, что элемент модалки найден
 * — Добавляет класс, делающий модалку видимой ("modal--active")
 * — Блокирует прокрутку страницы (overflow: hidden)
 * — Сбрасывает таймер автопоказа, чтобы окно не открылось повторно
 *
 * Почему важно блокировать прокрутку? Чтобы пользователь не мог скроллить страницу, пока открыта модалка.
 * Почему нужен clearTimeout? Если пользователь открыл окно вручную, автотаймер больше не нужен.
 */
function openModal() {
  if (!modal) return; // Проверяем, что модалка существует
  modal.classList.add("modal--active"); // Делаем модалку видимой
  document.body.style.overflow = "hidden"; // Блокируем прокрутку страницы
  clearTimeout(modalTimerId); // Сбрасываем таймер автопоказа
}

/**
 * Закрывает модальное окно
 * — Проверяет, что элемент модалки найден
 * — Удаляет класс видимости ("modal--active"), скрывая окно
 * — Возвращает прокрутку страницы (overflow: "")
 * — Удаляет все окна с сообщением "спасибо" (.modal__dialog--thanks)
 * — Возвращает основную форму/диалог в модалке в видимое состояние
 *
 * Почему удаляем "спасибо"-модалки? Чтобы при повторном открытии показывалась только форма, а не старое сообщение.
 * Почему возвращаем форму? Чтобы пользователь мог снова заполнить и отправить её.
 */
function closeModal() {
  if (!modal) return; // Проверяем, что модалка существует

  modal.classList.remove("modal--active"); // Скрываем модалку
  document.body.style.overflow = ""; // Возвращаем прокрутку страницы

  // Удаляем все "спасибо" окна (модалки с сообщением)
  modal.querySelectorAll(".modal__dialog--thanks").forEach(n => n.remove());

  // Возвращаем основную форму/диалог в модалке в видимое состояние
  const mainDialog = modal.querySelector(".modal__dialog");
  if (mainDialog) {
    mainDialog.classList.add("show");
    mainDialog.classList.remove("hide");
  }
}

/**
 * Инициализирует работу модального окна
 * — modalSelector: CSS-селектор модального окна (например, '.modal')
 * — triggerSelector: CSS-селектор кнопок/элементов, открывающих модалку (например, '[data-modal]')
 * — closeOnOverlay: закрывать ли модалку по клику на подложку (overlay)
 *
 * Как работает:
 * 1. Находит модальное окно и все триггеры (кнопки/ссылки), которые должны его открывать
 * 2. Навешивает обработчик на каждый триггер — при клике открывается модалка
 * 3. Навешивает обработчик на само модальное окно — если клик по overlay или по крестику, окно закрывается
 * 4. Навешивает обработчик на document — если нажата клавиша Escape и модалка открыта, окно закрывается
 * 5. Запускает таймер автопоказа модалки через 50 секунд (можно изменить)
 * 6. Навешивает обработчик на scroll — если пользователь доскроллил до конца страницы, модалка открывается
 *
 * Почему делегируем обработку клика на overlay? Это удобно и надёжно: не нужно искать отдельный элемент подложки.
 * Почему используем таймер и scroll? Это позволяет показать окно тем, кто долго находится на странице или дочитал до конца.
 */
function initModal({
  modalSelector,
  triggerSelector,
  closeOnOverlay = true
}) {
  // 1. Получаем DOM-элемент модального окна по селектору
  modal = document.querySelector(modalSelector);
  // 2. Получаем все элементы-триггеры (кнопки/ссылки), которые должны открывать модалку
  const triggers = document.querySelectorAll(triggerSelector);

  // 3. Навешиваем обработчик на каждый триггер для открытия модального окна
  triggers.forEach(btn => btn.addEventListener("click", openModal));

  // 4. Навешиваем обработчик на само модальное окно для закрытия по overlay или по кнопке закрытия
  modal.addEventListener("click", e => {
    // Если клик по overlay (самому модальному окну) и разрешено закрытие по overlay,
    // или если клик по элементу с data-close (крестик)
    if (e.target === modal && closeOnOverlay || e.target.getAttribute("data-close") !== null) {
      closeModal();
    }
  });

  // 5. Навешиваем обработчик на document для закрытия модалки по клавише Escape
  document.addEventListener("keydown", e => {
    // Проверяем, что нажата клавиша Escape и модалка открыта
    if (e.key === "Escape" && modal.classList.contains("modal--active")) {
      closeModal();
    }
  });

  // 6. Запускаем таймер автопоказа модального окна через 50 секунд
  // Это полезно для привлечения внимания пользователя, если он долго на странице
  modalTimerId = setTimeout(openModal, 50000);

  // 7. Функция для показа модалки при прокрутке до конца страницы
  function showModalByScroll() {
    // Если пользователь доскроллил до самого низа страницы
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  // 8. Навешиваем обработчик на scroll для автопоказа модалки при достижении конца страницы
  window.addEventListener("scroll", showModalByScroll);
}
// initModal — инициализирует работу модального окна: открытие по кнопке, закрытие по overlay/крестику/Escape, автопоказ по таймеру и при прокрутке

/***/ }),

/***/ "./src/js/tabs.js":
/*!************************!*\
  !*** ./src/js/tabs.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initTabs: () => (/* binding */ initTabs)
/* harmony export */ });
// tabs.js
// Модуль для управления вкладками (табы)

// Экспортируемая функция для инициализации вкладок
// tabSelector — CSS-селектор для кнопок вкладок (например, '.tabheader__item')
// contentSelector — CSS-селектор для блоков с контентом вкладок (например, '.tabcontent')
// parentSelector — CSS-селектор для контейнера вкладок (например, '.tabheader__items')
// activeClass — класс, который будет добавляться активной вкладке (например, 'tabheader__item_active')
function initTabs({
  tabSelector,
  contentSelector,
  parentSelector,
  activeClass
}) {
  // 1. Получаем все элементы вкладок по селектору (например, все .tabheader__item)
  //    tabs — это NodeList из DOM-элементов, которые отвечают за переключение вкладок
  const tabs = document.querySelectorAll(tabSelector);
  // 2. Получаем все блоки с контентом для вкладок (например, все .tabcontent)
  //    contents — это NodeList из DOM-элементов, которые показываются/скрываются при переключении
  const contents = document.querySelectorAll(contentSelector);
  // 3. Получаем родительский контейнер вкладок (например, .tabheader__items)
  //    parent — это DOM-элемент, на котором удобно вешать обработчик событий (делегирование)
  const parent = document.querySelector(parentSelector);

  // 4. Проверяем, что все необходимые элементы найдены
  //    Если хотя бы один не найден — не продолжаем, чтобы не было ошибок
  if (!tabs.length || !contents.length || !parent) return;

  // 5. Функция hideTabContent скрывает все блоки с контентом и убирает активный класс у всех вкладок
  //    Почему так: чтобы при переключении показывать только нужный контент и выделять только одну вкладку
  function hideTabContent() {
    contents.forEach(item => {
      // Скрываем контент: добавляем класс hide, убираем show и fade (fade — для анимации)
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      // Убираем активный класс у всех вкладок
      item.classList.remove(activeClass);
      // Для доступности: отмечаем, что вкладка не выбрана
      item.setAttribute('aria-selected', 'false');
    });
  }

  // 6. Функция showTabContent показывает контент выбранной вкладки и делает её активной
  //    i — индекс вкладки/контента, который нужно показать (по умолчанию 0 — первая вкладка)
  //    Почему так: удобно управлять отображением через индекс
  function showTabContent(i = 0) {
    // Показываем нужный контент: убираем hide, добавляем show и fade
    contents[i].classList.add('show', 'fade');
    contents[i].classList.remove('hide');
    // Делаем вкладку активной: добавляем класс и отмечаем aria-selected
    tabs[i].classList.add(activeClass);
    tabs[i].setAttribute('aria-selected', 'true');
  }

  // 7. Инициализация: скрываем весь контент и показываем первую вкладку
  //    Почему так: чтобы при загрузке страницы был виден только первый блок
  hideTabContent();
  showTabContent();

  // 8. Вешаем обработчик событий на родительский контейнер вкладок (делегирование)
  //    Это удобно: не нужно вешать обработчик на каждую вкладку отдельно
  parent.addEventListener('click', event => {
    const target = event.target;
    // Проверяем, что клик был по элементу вкладки (по классу)
    if (target && target.classList.contains(tabSelector.replace('.', ''))) {
      // Находим индекс кликнутой вкладки и показываем соответствующий контент
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent(); // Скрываем все вкладки и контент
          showTabContent(i); // Показываем выбранную вкладку и её контент
        }
      });
    }
  });
}

/***/ }),

/***/ "./src/js/timer.js":
/*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startTimer: () => (/* binding */ startTimer)
/* harmony export */ });
// timer.js
// Модуль для таймера обратного отсчёта

// Экспортируемая функция для запуска таймера
// selector — CSS-селектор контейнера таймера (например, '.timer')
// deadline — строка с датой окончания отсчёта (например, '2026-05-11')
function startTimer({
  selector,
  deadline
}) {
  // 1. Получаем DOM-элемент, в котором будет отображаться таймер.
  //    Это может быть любой контейнер, например <div class="timer">...</div>
  //    Используем querySelector, чтобы найти элемент по переданному селектору.
  const timer = document.querySelector(selector); // timer — это ссылка на DOM-элемент, который содержит весь таймер
  // 2. Если элемент не найден (например, селектор неверный или элемента нет в HTML),
  //    функция завершает выполнение — таймер не будет инициализирован.
  if (!timer) return;

  // 3. Внутри контейнера таймера ищем элементы, куда будем выводить значения:
  //    - дни (id="days")
  //    - часы (id="hours")
  //    - минуты (id="minutes")
  //    - секунды (id="seconds")
  //    Это должны быть, например, <span id="days"></span> и т.д.
  const days = timer.querySelector('#days'); // Элемент для дней
  const hours = timer.querySelector('#hours'); // Элемент для часов
  const minutes = timer.querySelector('#minutes'); // Элемент для минут
  const seconds = timer.querySelector('#seconds'); // Элемент для секунд

  // 4. Вложенная функция getTimeRemaining рассчитывает разницу между дедлайном и текущим временем.
  //    endtime — строка с датой окончания (например, '2026-05-11')
  //    Возвращает объект с:
  //      - total: общее количество миллисекунд до дедлайна
  //      - days: количество полных дней
  //      - hours: остаток часов
  //      - minutes: остаток минут
  //      - seconds: остаток секунд
  //    Почему так: удобно сразу получить все значения для отображения и для проверки окончания таймера.
  function getTimeRemaining(endtime) {
    // Date.parse(endtime) — преобразует строку в миллисекунды с 1 января 1970
    // Date.parse(new Date()) — текущее время в миллисекундах
    // t — разница между дедлайном и текущим временем
    const t = Date.parse(endtime) - Date.parse(new Date());
    // days — целое число дней до дедлайна
    // Math.max(..., 0) — если дедлайн прошёл, не даём уйти в минус (будет 0)
    const days = Math.max(Math.floor(t / (1000 * 60 * 60 * 24)), 0);
    // hours — остаток часов после вычитания полных дней
    const hours = Math.max(Math.floor(t / (1000 * 60 * 60) % 24), 0);
    // minutes — остаток минут после вычитания полных часов
    const minutes = Math.max(Math.floor(t / (1000 * 60) % 60), 0);
    // seconds — остаток секунд после вычитания полных минут
    const seconds = Math.max(Math.floor(t / 1000 % 60), 0);
    // Возвращаем объект с рассчитанными значениями
    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  // 5. Функция getZero форматирует числа: если число < 10, добавляет ведущий ноль (например, 7 → '07').
  //    Это делается для красивого отображения времени (09:05:03 вместо 9:5:3).
  //    Почему так: привычный вид таймера для пользователя.
  function getZero(num) {
    return num >= 0 && num < 10 ? `0${num}` : num;
  }

  // 6. Функция updateClock обновляет значения на странице (вызывается каждую секунду).
  //    Она:
  //      - получает объект с оставшимся временем до дедлайна
  //      - обновляет содержимое элементов для дней, часов, минут, секунд
  //      - если время вышло (total <= 0), останавливает таймер (clearInterval)
  //    Почему так: чтобы значения на странице всегда были актуальны, а после дедлайна не уходили в минус.
  function updateClock() {
    // Получаем объект с оставшимся временем до дедлайна
    const t = getTimeRemaining(deadline);
    // days.textContent — обновляем содержимое элемента для дней
    days.textContent = getZero(t.days);
    // hours.textContent — обновляем содержимое элемента для часов
    hours.textContent = getZero(t.hours);
    // minutes.textContent — обновляем содержимое элемента для минут
    minutes.textContent = getZero(t.minutes);
    // seconds.textContent — обновляем содержимое элемента для секунд
    seconds.textContent = getZero(t.seconds);
    // Если время вышло (total <= 0), останавливаем таймер, чтобы не было отрицательных значений
    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }

  // 7. Сразу вызываем updateClock, чтобы не ждать первую секунду (иначе на странице будет старое значение)
  updateClock();
  // 8. Запускаем интервал: updateClock будет вызываться каждую секунду (1000 мс)
  //    Почему так: чтобы таймер обновлялся в реальном времени
  const timeInterval = setInterval(updateClock, 1000);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs.js */ "./src/js/tabs.js");
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timer.js */ "./src/js/timer.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal.js */ "./src/js/modal.js");
/* harmony import */ var _menu_cards_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu-cards.js */ "./src/js/menu-cards.js");
/* harmony import */ var _form_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form.js */ "./src/js/form.js");
// Импортируем функцию для инициализации вкладок из отдельного модуля

// Импортируем функцию для запуска таймера из отдельного модуля

// Импортируем функцию для инициализации модального окна из отдельного модуля

// Импортируем функцию для создания карточек меню из отдельного модуля

// Импортируем функцию для отправки данных формы из отдельного модуля


// Ждём полной загрузки DOM, чтобы все элементы были доступны для поиска и манипуляций
document.addEventListener("DOMContentLoaded", () => {
  // Инициализация вкладок (табы)
  // tabSelector — селектор для кнопок вкладок
  // contentSelector — селектор для блоков с контентом вкладок
  // parentSelector — селектор для контейнера вкладок (для делегирования событий)
  // activeClass — класс, который будет добавляться активной вкладке
  (0,_tabs_js__WEBPACK_IMPORTED_MODULE_0__.initTabs)({
    tabSelector: ".tabheader__item",
    contentSelector: ".tabcontent",
    parentSelector: ".tabheader__items",
    activeClass: "tabheader__item_active"
  });

  // Инициализация таймера обратного отсчёта
  // selector — селектор для контейнера таймера
  // deadline — конечная дата, до которой ведётся отсчёт
  (0,_timer_js__WEBPACK_IMPORTED_MODULE_1__.startTimer)({
    selector: ".timer",
    deadline: "2026-02-11"
  });

  // Инициализация модального окна
  (0,_modal_js__WEBPACK_IMPORTED_MODULE_2__.initModal)({
    modalSelector: ".modal",
    triggerSelector: "[data-modal]",
    closeOnOverlay: true
  });
  (0,_menu_cards_js__WEBPACK_IMPORTED_MODULE_3__.createMenuCards)(".menu .container", [{
    imgSrc: "img/tabs/vegy.jpg",
    altText: "vegy",
    title: 'Меню "Фитнес"',
    description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    price: 9.99,
    classes: ["menu__item"]
  }, {
    imgSrc: "img/tabs/elite.jpg",
    altText: "elite",
    title: 'Меню "Премиум"',
    description: 'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    price: 19.99,
    classes: ["menu__item", "big"]
  }, {
    imgSrc: "img/tabs/post.jpg",
    altText: "post",
    title: 'Меню "Постное"',
    description: 'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счёт тофу и импортных вегетарианских стейков.',
    price: 14.99,
    classes: ["menu__item"]
  }]);
  (0,_form_js__WEBPACK_IMPORTED_MODULE_4__.sendFormData)();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map