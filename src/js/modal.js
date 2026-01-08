// Экспортируемая функция инициализации модального окна
export function initModal({
    modalSelector, // CSS-селектор модального окна
    triggerSelector, // CSS-селектор элементов, открывающих модалку
    closeOnOverlay = true, // Закрывать ли модалку по клику на подложку (по умолчанию true)
}) {
    // Получаем DOM-элемент модального окна
    const modal = document.querySelector(modalSelector);
    // Получаем кнопку закрытия внутри модального окна (по атрибуту data-close)
    const modalCloseBtn = modal.querySelector("[data-close]");
    // Получаем все элементы-триггеры, которые должны открывать модалку
    const triggerSelectors = document.querySelectorAll(triggerSelector);

    // Функция открытия модального окна
    function openModal() {
        // Добавляем класс, который делает модалку видимой
        modal.classList.add("modal--active");
        document.body.style.overflow = "hidden"; // Блокируем прокрутку страницы при открытой модалке
        clearInterval(modalTimerId); // Очищаем таймер, если модалка была открыта вручную
    }

    // Функция закрытия модального окна
    function closeModal() {
        // Удаляем класс, скрывающий модалку
        modal.classList.remove("modal--active");
        document.body.style.overflow = ""; // Восстанавливаем прокрутку страницы
    }

    // Вешаем обработчик на каждый триггер для открытия модального окна
    triggerSelectors.forEach((trigger) => {
        trigger.addEventListener("click", openModal);
    });

    // Вешаем обработчик на само модальное окно
    // Закрываем модалку, если клик был по подложке (overlay) или по кнопке закрытия
    modal.addEventListener("click", (e) => {
        // Если клик по overlay (самому модальному окну) и разрешено закрытие по overlay,
        // или если клик по кнопке закрытия
        if (
            (e.target === modal && closeOnOverlay) ||
            e.target === modalCloseBtn
        ) {
            closeModal();
        }
    });

    // Обработчик закрытия модального окна по клавише Escape
    // ------------------------------------------------------
    // Почему обработчик вешается на document, а не на modal?
    // - Событие keydown возникает только у того элемента, который находится в фокусе.
    // - Модальное окно (modal) обычно не получает фокус, если явно не назначить tabindex и не вызвать focus().
    // - Поэтому, если повесить обработчик на modal, он не сработает, когда пользователь нажимает Escape вне модалки.
    // - Вешая обработчик на document, мы гарантируем, что событие будет поймано всегда, независимо от того, где сейчас фокус.
    // Как работает этот обработчик:
    // 1. Каждый раз, когда пользователь нажимает любую клавишу, срабатывает событие keydown на document.
    // 2. Внутри обработчика проверяем, была ли нажата именно клавиша Escape (e.key === "Escape").
    // 3. Дополнительно проверяем, что модальное окно сейчас открыто (modal.classList.contains("modal--active")).
    //    Это нужно, чтобы не пытаться закрыть уже закрытую модалку.
    // 4. Если оба условия выполняются, вызываем функцию closeModal(), которая скрывает модальное окно и возвращает прокрутку страницы.
    document.addEventListener("keydown", (e) => {
        // Проверяем, нажата ли клавиша Escape и открыта ли модалка
        if (e.key === "Escape" && modal.classList.contains("modal--active")) {
            closeModal(); // Закрываем модальное окно
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}
