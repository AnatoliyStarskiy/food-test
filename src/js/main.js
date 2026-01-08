// Импортируем функцию для инициализации вкладок из отдельного модуля
import { initTabs } from './tabs.js';
// Импортируем функцию для запуска таймера из отдельного модуля
import { startTimer } from './timer.js';
// Импортируем функцию для инициализации модального окна из отдельного модуля
import { initModal} from "./modal.js";

// Ждём полной загрузки DOM, чтобы все элементы были доступны для поиска и манипуляций
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация вкладок (табы)
    // tabSelector — селектор для кнопок вкладок
    // contentSelector — селектор для блоков с контентом вкладок
    // parentSelector — селектор для контейнера вкладок (для делегирования событий)
    // activeClass — класс, который будет добавляться активной вкладке
    initTabs({
        tabSelector: '.tabheader__item',
        contentSelector: '.tabcontent',
        parentSelector: '.tabheader__items',
        activeClass: 'tabheader__item_active'
    });

    // Инициализация таймера обратного отсчёта
    // selector — селектор для контейнера таймера
    // deadline — конечная дата, до которой ведётся отсчёт
    startTimer({
        selector: '.timer',
        deadline: '2026-02-11'
    });

    // Инициализация модального окна
    initModal({
        modalSelector: '.modal',
        triggerSelector: '[data-modal]',
        closeOnOverlay: true
    });
});
