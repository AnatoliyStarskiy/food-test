// Импортируем функцию для инициализации вкладок из отдельного модуля
import { initTabs } from "./tabs.js";
// Импортируем функцию для запуска таймера из отдельного модуля
import { startTimer } from "./timer.js";
// Импортируем функцию для инициализации модального окна из отдельного модуля
import { initModal } from "./modal.js";
// Импортируем функцию для создания карточек меню из отдельного модуля
import { createMenuCards } from "./menu-cards.js";

// Ждём полной загрузки DOM, чтобы все элементы были доступны для поиска и манипуляций
document.addEventListener("DOMContentLoaded", () => {
    // Инициализация вкладок (табы)
    // tabSelector — селектор для кнопок вкладок
    // contentSelector — селектор для блоков с контентом вкладок
    // parentSelector — селектор для контейнера вкладок (для делегирования событий)
    // activeClass — класс, который будет добавляться активной вкладке
    initTabs({
        tabSelector: ".tabheader__item",
        contentSelector: ".tabcontent",
        parentSelector: ".tabheader__items",
        activeClass: "tabheader__item_active",
    });

    // Инициализация таймера обратного отсчёта
    // selector — селектор для контейнера таймера
    // deadline — конечная дата, до которой ведётся отсчёт
    startTimer({
        selector: ".timer",
        deadline: "2026-02-11",
    });

    // Инициализация модального окна
    initModal({
        modalSelector: ".modal",
        triggerSelector: "[data-modal]",
        closeOnOverlay: true,
    });

    createMenuCards(
        ".menu .container",
        [
            {
                imgSrc: "img/tabs/vegy.jpg",
                altText: "vegy",
                title: 'Меню "Фитнес"',
                description:
                    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                price: 9.99,
                classes: ["menu__item"]
            },
            {
                imgSrc: "img/tabs/elite.jpg",
                altText: "elite",
                title: 'Меню "Премиум"',
                description:
                    'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                price: 19.99,
                classes: ["menu__item", "big" ]
            },
            {
                imgSrc: "img/tabs/post.jpg",
                altText: "post",
                title: 'Меню "Постное"',
                description:
                    'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счёт тофу и импортных вегетарианских стейков.',
                price: 14.99,
                classes: ["menu__item"]
            },
        ],
    );
});
