// tabs.js
// Модуль для управления вкладками (табы)

// Экспортируемая функция для инициализации вкладок
// tabSelector — CSS-селектор для кнопок вкладок (например, '.tabheader__item')
// contentSelector — CSS-селектор для блоков с контентом вкладок (например, '.tabcontent')
// parentSelector — CSS-селектор для контейнера вкладок (например, '.tabheader__items')
// activeClass — класс, который будет добавляться активной вкладке (например, 'tabheader__item_active')
export function initTabs({ tabSelector, contentSelector, parentSelector, activeClass }) {
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
        contents.forEach((item) => {
            // Скрываем контент: добавляем класс hide, убираем show и fade (fade — для анимации)
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach((item) => {
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
    parent.addEventListener('click', (event) => {
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
