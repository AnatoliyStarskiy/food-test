// Экспортируемая функция для создания карточек меню
// containerSelector — CSS-селектор контейнера, куда будут добавляться карточки
// cardData — массив объектов с данными для каждой карточки
export function createMenuCards(containerSelector, cardData) {
    // 1. Находим контейнер, в который будут добавляться карточки меню
    //    Например, '.menu__field .container' — это div внутри блока меню
    const container = document.querySelector(containerSelector);
    // 2. Если контейнер не найден — выводим ошибку в консоль и прекращаем выполнение функции
    if (!container) {
        console.error(
            `Контейнер с селектором '${containerSelector}' не найден!`
        );
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
                this.classes.forEach((className) => {
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
    cardData.forEach(({ imgSrc, altText, title, description, price, classes = [] }) => {
        // 1. Создаём экземпляр класса MenuCards с переданными данными
        const card = new MenuCards(imgSrc, altText, title, description, price, ...classes);
        // 2. Добавляем карточку в контейнер с помощью метода render
        card.render(container);
    });
    // 5. Функция не возвращает значения, а только добавляет карточки в DOM
}
