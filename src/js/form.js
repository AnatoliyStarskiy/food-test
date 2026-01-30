// form.js
// Модуль для отправки данных формы на сервер и показа статуса через модальное окно
// Этот код снабжён подробными обучающими комментариями для самостоятельного изучения.

// Импортируем функции управления модальным окном из отдельного модуля
import { openModal, closeModal } from "./modal.js";
/**
 * Инициализирует обработку всех форм на странице: отправка данных через AJAX и показ статуса через модальное окно
 * — Находит все формы
 * — Навешивает обработчик отправки на каждую форму
 * — Показывает индикатор загрузки, отправляет данные на сервер, показывает результат
 */
export function sendFormData() {
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
        failure: "Что-то пошло не так...",
    };

    // 3. Для каждой найденной формы навешиваем обработчик отправки через postDataJSON
    // Это позволяет обрабатывать любое количество форм на странице одинаково
    forms.forEach((form) => postDataJSON(form));

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
        form.addEventListener("submit", (e) => {
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
            request.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8",
            ); // Указываем, что отправляем данные в формате JSON

            // 3. Собираем данные формы в объект (ключ-значение)
            // FormData — удобный способ получить все значения полей формы
            const formData = new FormData(form);
            const jsonObject = {};
            formData.forEach((value, key) => (jsonObject[key] = value));

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
        openModal();

        // 4. Удаляем старые "thanks"-модалки, если они остались (на всякий случай)
        modal
            .querySelectorAll(".modal__dialog--thanks")
            .forEach((n) => n.remove());

        // 5. Создаём новый блок для сообщения благодарности
        const thanksModal = document.createElement("div");
        thanksModal.classList.add(
            "modal__dialog",
            "modal__dialog--thanks",
            "show",
        );
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
            closeModal();
        }, 4000);
    }
    /*
     showThanksModal — скрывает основную форму в модалке, открывает модалку, создаёт и показывает блок с сообщением (успех/ошибка),
     через 4 секунды (или при ручном закрытии) возвращает модалку к исходному состоянию.
    */
}
