/* ============================================
   script.js — общий JavaScript для всех страниц
   ============================================ */

// --- Переменная: список дисциплин для главной страницы ---
var disciplinesList = [
    "Бег на 100 метров",
    "Марафон (42,195 км)",
    "Прыжок с шестом",
    "Метание копья",
    "Десятиборье",
    "Эстафета 4×400 м",
    "Спортивная ходьба 20 км",
    "Тройной прыжок"
];

// --- Объект-массив: данные о великих атлетах ---
var athletes = [
    {
        name: "Usain Bolt",
        country: "Ямайка",
        achievements: "8 олимпийских золотых медалей, рекорд 100 м — 9,58 сек",
        photo: "usain-bolt.jpg"
    },
    {
        name: "Carl Lewis",
        country: "США",
        achievements: "9 олимпийских золотых медалей, 4×100 м и прыжки в длину",
        photo: "carl-lewis.jpg"
    },
    {
        name: "Eliud Kipchoge",
        country: "Кения",
        achievements: "2 олимпийских золота, марафон за 2:01:09",
        photo: "eluid-kipchoge.jpg"
    },
    {
        name: "Sergey Bubka",
        country: "Украина / СССР",
        achievements: "35 мировых рекордов в прыжках с шестом, 6,15 м",
        photo: "sergey-bubka.jpg"
    },
    {
        name: "Jackie Joyner-Kersee",
        country: "США",
        achievements: "3 олимпийских золота, рекорд семиборья — 7291 очко",
        photo: "jackie-joyner.jpg"
    },
    {
        name: "Paavo Nurmi",
        country: "Финляндия",
        achievements: "9 олимпийских золотых медалей, «Летучий финн»",
        photo: "paavo-nurmi.jpg"
    }
];

// --- Функция: динамический вывод атлетов в таблицу ---
function renderAthletes(athletesArray) {
    var tbody = document.getElementById("athletesBody");
    if (!tbody) {
        return;
    }

    // Очищаем таблицу перед заполнением
    tbody.innerHTML = "";

    for (var i = 0; i < athletesArray.length; i++) {
        var athlete = athletesArray[i];
        var row = document.createElement("tr");

        // Формируем строку таблицы из данных объекта
        row.innerHTML =
            "<td><img src=\"" + athlete.photo + "\" alt=\"" + athlete.name + "\"></td>" +
            "<td><strong>" + athlete.name + "</strong></td>" +
            "<td>" + athlete.country + "</td>" +
            "<td>" + athlete.achievements + "</td>";

        tbody.appendChild(row);
    }
}

// --- Функция: случайная дисциплина дня (главная страница) ---
function showRandomDiscipline() {
    var output = document.getElementById("disciplineOutput");
    if (!output) {
        return;
    }

    var randomIndex = Math.floor(Math.random() * disciplinesList.length);
    output.textContent = "Дисциплина дня: " + disciplinesList[randomIndex];
}

// --- Функция: проверка ответов теста ---
function checkQuizAnswers() {
    // Переменная для подсчёта баллов
    var score = 0;
    var maxScore = 5;

    // Правильные ответы для checkbox-вопросов (массивы значений)
    var correctQ1 = ["100m", "marathon"];
    var correctQ2 = ["discus", "javelin", "hammer"];
    var correctQ3 = ["776", "1896", "1912"];

    // Проверка вопроса 1 (checkbox)
    var q1Inputs = document.querySelectorAll("input[name='q1']:checked");
    var q1Values = [];
    for (var a = 0; a < q1Inputs.length; a++) {
        q1Values.push(q1Inputs[a].value);
    }
    if (arraysEqual(q1Values.sort(), correctQ1.sort())) {
        score++;
    }

    // Проверка вопроса 2 (checkbox)
    var q2Inputs = document.querySelectorAll("input[name='q2']:checked");
    var q2Values = [];
    for (var b = 0; b < q2Inputs.length; b++) {
        q2Values.push(q2Inputs[b].value);
    }
    if (arraysEqual(q2Values.sort(), correctQ2.sort())) {
        score++;
    }

    // Проверка вопроса 3 (checkbox)
    var q3Inputs = document.querySelectorAll("input[name='q3']:checked");
    var q3Values = [];
    for (var c = 0; c < q3Inputs.length; c++) {
        q3Values.push(q3Inputs[c].value);
    }
    if (arraysEqual(q3Values.sort(), correctQ3.sort())) {
        score++;
    }

    // Проверка вопроса 4 (radio) — условный оператор if
    var q4Selected = document.querySelector("input[name='q4']:checked");
    if (q4Selected && q4Selected.value === "bolt") {
        score++;
    }

    // Проверка вопроса 5 (radio) — условный оператор if
    var q5Selected = document.querySelector("input[name='q5']:checked");
    if (q5Selected && q5Selected.value === "athens") {
        score++;
    }

    // Формируем текст результата с использованием условных операторов
    var resultMessage = "";
    if (score === maxScore) {
        resultMessage = "Отлично! Вы набрали " + score + " из " + maxScore + " баллов.\nВы настоящий эксперт лёгкой атлетики!";
    } else if (score >= 3) {
        resultMessage = "Хорошо! Вы набрали " + score + " из " + maxScore + " баллов.\nЕсть над чем поработать, но база заложена.";
    } else {
        resultMessage = "Вы набрали " + score + " из " + maxScore + " баллов.\nРекомендуем изучить раздел «История» на сайте.";
    }

    // Вывод результата в новом окне
    var resultWindow = window.open("", "QuizResult", "width=450,height=300");
    resultWindow.document.write("<html><head><title>Результат теста</title>");
    resultWindow.document.write("<style>body{font-family:'Playfair Display',Georgia,serif;background:#FAF6ED;padding:32px;color:#1A2A3A;}h2{color:#8B0000;font-size:1.6rem;}p{line-height:1.7;font-size:1.05rem;}button{margin-top:20px;background:linear-gradient(135deg,#6B1A1A,#C9A84C);color:#fff;border:none;padding:12px 28px;border-radius:50px;cursor:pointer;font-family:Georgia,serif;letter-spacing:0.1em;text-transform:uppercase;}</style>");
    resultWindow.document.write("</head><body>");
    resultWindow.document.write("<h2>Результаты теста</h2>");
    resultWindow.document.write("<p>" + resultMessage.replace(/\n/g, "<br>") + "</p>");
    resultWindow.document.write("<button onclick='window.close()'>Закрыть</button>");
    resultWindow.document.write("</body></html>");
    resultWindow.document.close();
}

// --- Вспомогательная функция: сравнение двух массивов ---
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

// --- Таймер обратного отсчёта для страницы теста (setInterval) ---
var countdownSeconds = 300;
var countdownInterval = null;

function startCountdownTimer() {
    var timerDisplay = document.getElementById("timerDisplay");
    var timerBox = document.getElementById("timerBox");

    if (!timerDisplay) {
        return;
    }

    // Запускаем интервал — обновление каждую секунду
    countdownInterval = setInterval(function () {
        countdownSeconds--;

        if (countdownSeconds >= 0) {
            timerDisplay.textContent = countdownSeconds;
        }

        // Условный оператор: предупреждение при малом времени
        if (countdownSeconds <= 30) {
            timerBox.classList.add("timer-warning");
        }

        // Время вышло — останавливаем таймер
        if (countdownSeconds <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.textContent = "0";
            alert("Время вышло! Нажмите «Проверить» для подсчёта баллов.");
        }
    }, 1000);
}

// --- Галерея: переменная текущего слайда ---
var currentSlideIndex = 0;
var totalSlides = 6;

// --- Галерея: показать слайд по индексу ---
function showSlide(index) {
    var slides = document.querySelectorAll(".gallery-slide");
    var slideNumber = document.getElementById("slideNumber");
    var thumbs = document.querySelectorAll(".gallery-thumbs figure");

    if (slides.length === 0) {
        return;
    }

    if (index >= totalSlides) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1;
    } else {
        currentSlideIndex = index;
    }

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    slides[currentSlideIndex].classList.add("active");

    if (slideNumber) {
        slideNumber.textContent = currentSlideIndex + 1;
    }

    // Подсветка активной миниатюры
    for (var t = 0; t < thumbs.length; t++) {
        thumbs[t].classList.remove("active-thumb");
    }
    if (thumbs[currentSlideIndex]) {
        thumbs[currentSlideIndex].classList.add("active-thumb");
    }
}

// --- Функция: следующий слайд ---
function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

// --- Функция: предыдущий слайд ---
function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

// --- Обработчик mouseover для изображений галереи (золотое свечение) ---
function initGalleryHoverEffects() {
    var galleryImages = document.querySelectorAll(".gallery-slide img");

    for (var j = 0; j < galleryImages.length; j++) {
        galleryImages[j].addEventListener("mouseover", function () {
            this.style.boxShadow = "0 0 24px rgba(201, 168, 76, 0.6)";
        });
        galleryImages[j].addEventListener("mouseout", function () {
            this.style.boxShadow = "";
        });
    }
}

// --- Навигация: прозрачная → белая при скролле ---
function initNavScroll() {
    var nav = document.getElementById("mainNav");
    if (!nav) {
        return;
    }

    function updateNav() {
        if (window.scrollY > 80) {
            nav.classList.add("nav-scrolled");
        } else {
            nav.classList.remove("nav-scrolled");
        }
    }

    updateNav();
    window.addEventListener("scroll", updateNav);
}

// --- Параллакс-эффект для фона героя ---
function initParallax() {
    var parallax = document.getElementById("heroParallax");
    if (!parallax) {
        return;
    }

    window.addEventListener("scroll", function () {
        var scrolled = window.scrollY;
        parallax.style.transform = "translateY(" + (scrolled * 0.35) + "px)";
    });
}

// --- Плавное появление элементов при скролле (fade in) ---
function initFadeIn() {
    var elements = document.querySelectorAll(".fade-in");
    if (elements.length === 0) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add("visible");
        }
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        for (var j = 0; j < entries.length; j++) {
            if (entries[j].isIntersecting) {
                entries[j].target.classList.add("visible");
                observer.unobserve(entries[j].target);
            }
        }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    for (var k = 0; k < elements.length; k++) {
        observer.observe(elements[k]);
    }
}

// --- Анимированные счётчики при скролле ---
function initCounters() {
    var counters = document.querySelectorAll(".stat-number");
    if (counters.length === 0) {
        return;
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute("data-target"), 10);
        var suffix = el.getAttribute("data-suffix") || "";
        var duration = 2000;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) {
                startTime = timestamp;
            }
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
        for (var i = 0; i < counters.length; i++) {
            counters[i].textContent = counters[i].getAttribute("data-target") + (counters[i].getAttribute("data-suffix") || "");
        }
        return;
    }

    var counterObserver = new IntersectionObserver(function (entries) {
        for (var j = 0; j < entries.length; j++) {
            if (entries[j].isIntersecting) {
                animateCounter(entries[j].target);
                counterObserver.unobserve(entries[j].target);
            }
        }
    }, { threshold: 0.5 });

    for (var k = 0; k < counters.length; k++) {
        counterObserver.observe(counters[k]);
    }
}

// --- Инициализация при загрузке страницы ---
document.addEventListener("DOMContentLoaded", function () {

    // Премиальные UI-эффекты
    initNavScroll();
    initParallax();
    initFadeIn();
    initCounters();

    // Главная страница: кнопка «Дисциплина дня» — отклик на клик
    var disciplineBtn = document.getElementById("disciplineBtn");
    if (disciplineBtn) {
        disciplineBtn.addEventListener("click", showRandomDiscipline);
    }

    // Страница атлетов: заполнение таблицы
    renderAthletes(athletes);

    // Кнопка сортировки атлетов — отклик на клик
    var sortBtn = document.getElementById("sortAthletesBtn");
    if (sortBtn) {
        sortBtn.addEventListener("click", function () {
            var sorted = athletes.slice().sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            renderAthletes(sorted);
        });
    }

    // Страница теста: кнопка «Проверить» и таймер
    var checkBtn = document.getElementById("checkQuizBtn");
    if (checkBtn) {
        checkBtn.addEventListener("click", checkQuizAnswers);
        startCountdownTimer();
    }

    // Страница галереи: кнопки «Вперёд» и «Назад»
    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");

    if (prevBtn) {
        prevBtn.addEventListener("click", prevSlide);
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", nextSlide);
    }

    // Миниатюры галереи — клик для перехода к слайду
    var thumbs = document.querySelectorAll(".gallery-thumbs figure");
    for (var k = 0; k < thumbs.length; k++) {
        thumbs[k].addEventListener("click", function () {
            var slideIndex = parseInt(this.getAttribute("data-slide"), 10);
            showSlide(slideIndex);
        });
    }

    // Эффекты при наведении на изображения галереи
    initGalleryHoverEffects();
});
