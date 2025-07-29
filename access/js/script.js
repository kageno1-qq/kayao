// === Темизация и обновление иконок ===
const btn = document.getElementById('toggle_theme');
const root = document.documentElement;

const icons = [
    { el: document.getElementById('theme'), light: 'access/icon/theme.dark.png', dark: 'access/icon/theme.light.png' },
    { el: document.getElementById('close'), light: 'access/icon/close.dark.png', dark: 'access/icon/close.light.png' },
    { el: document.getElementById('animego'), light: 'access/icon/animego.dark.png', dark: 'access/icon/animego.light.png' },
    { el: document.getElementById('remanga'), light: 'access/icon/remanga.dark.png', dark: 'access/icon/remanga.light.png' },
    { el: document.getElementById('youtube'), light: 'access/icon/youtube.dark.png', dark: 'access/icon/youtube.light.png' },
    { el: document.getElementById('twitch'), light: 'access/icon/twitch.dark.png', dark: 'access/icon/twitch.light.png' },
    { el: document.getElementById('github'), light: 'access/icon/github.dark.png', dark: 'access/icon/github.light.png' },
    { el: document.getElementById('chatgpt'), light: 'access/icon/chatgpt.dark.png', dark: 'access/icon/chatgpt.light.png' },
    { el: document.getElementById('settings_icon'), light: 'access/icon/settings.dark.png', dark: 'access/icon/settings.light.png' },
    { el: document.getElementById('undo'), light: 'access/icon/undo.dark.png', dark: 'access/icon/undo.light.png' },
    { el: document.getElementById('undo_snow'), light: 'access/icon/undo.dark.png', dark: 'access/icon/undo.light.png' },

];

// Функция для изменения темы и иконок
function setTheme(theme) {
    icons.forEach(icon => {
        icon.el.src = theme === 'dark' ? icon.dark : icon.light;
    });
}

// Проверка сохраненной темы из localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
root.classList.toggle('dark_theme', savedTheme === 'dark');
setTheme(savedTheme);

// Обработчик изменения темы
btn.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark_theme');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    setTheme(theme);

    const savedColor = localStorage.getItem(`bgColor_${theme}`);
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    } else {
        const mainBgColor = getComputedStyle(document.documentElement).getPropertyValue('--main_bg').trim();
        document.body.style.backgroundColor = mainBgColor;
    }

    const savedSnow = localStorage.getItem(`snowColor_${theme}`);
    if (savedSnow) {
        snowColorPicker.value = savedSnow;
    } else {
        snowColorPicker.value = theme === 'dark' ? '#ffffff' : '#000000';
    }
});

// Настройки
const settings = document.getElementById('settings');
const modal = document.querySelector('.modal');
settings.addEventListener('click', () => {
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
});

// Изменение фона
const bgImageInput = document.getElementById('bgImageInput');
const selectImageBtn = document.getElementById('model_selectimg');
const resetBtn = document.getElementById('resetBackground');
const target = document.getElementById('backgroundTarget');
const preview = document.getElementById('preview');

// Инициализация фона при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    const theme = root.classList.contains('dark_theme') ? 'dark' : 'light';

    const savedImage = localStorage.getItem('bgImage');
    if (savedImage) {
        target.style.backgroundImage = `url(${savedImage})`;
        preview.style.backgroundImage = `url(${savedImage})`;
    }

    const savedColor = localStorage.getItem(`bgColor_${theme}`);
    const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--main_bg').trim();
    document.body.style.backgroundColor = savedColor || defaultColor;
    colorPicker.value = savedColor || defaultColor;

    const savedSnowColor = localStorage.getItem(`snowColor_${theme}`);
    snowColorPicker.value = savedSnowColor || (theme === 'dark' ? '#ffffff' : '#000000');
});

// Загрузка выбранного изображения
selectImageBtn.addEventListener('click', () => {
    bgImageInput.click();
});

// Изменение фона через изображение
bgImageInput.addEventListener('change', () => {
    const file = bgImageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const imageData = e.target.result;
        target.style.backgroundImage = `url(${imageData})`;
        preview.style.backgroundImage = `url(${imageData})`;
        localStorage.setItem('bgImage', imageData);
    };
    reader.readAsDataURL(file);
});

// Сброс изображения фона
resetBtn.addEventListener('click', () => {
    target.style.backgroundImage = '';
    preview.style.backgroundImage = '';
    localStorage.removeItem('bgImage');
});

// Селектор цвета фона
const colorPicker = document.getElementById('colorPicker');
const resetColorBtn = document.getElementById('resetColorBtn');

colorPicker.addEventListener('input', (event) => {
    const newColor = event.target.value;
    const theme = root.classList.contains('dark_theme') ? 'dark' : 'light';
    document.body.style.backgroundColor = newColor;
    localStorage.setItem(`bgColor_${theme}`, newColor);
});

// Сброс цвета фона
resetColorBtn.addEventListener('click', () => {
    const theme = root.classList.contains('dark_theme') ? 'dark' : 'light';
    const defaultColor = getComputedStyle(document.documentElement).getPropertyValue('--main_bg').trim();
    document.body.style.backgroundColor = defaultColor;
    colorPicker.value = defaultColor;
    localStorage.removeItem(`bgColor_${theme}`);
});

// Селектор снега
const snowColorPicker = document.getElementById('snowColorPicker');
const resetSnowColorBtn = document.getElementById('resetSnowColorBtn');

snowColorPicker.addEventListener('input', (e) => {
    const customColor = e.target.value;
    const theme = root.classList.contains('dark_theme') ? 'dark' : 'light';
    localStorage.setItem(`snowColor_${theme}`, customColor);
});

// Сброс цвета снега
resetSnowColorBtn.addEventListener('click', () => {
    const theme = root.classList.contains('dark_theme') ? 'dark' : 'light';
    localStorage.removeItem(`snowColor_${theme}`);
    snowColorPicker.value = theme === 'dark' ? '#ffffff' : '#000000';
});

// Функция для получения текущего цвета снега
function getSnowColor() {
    const theme = root.classList.contains('dark_theme') ? 'dark' : 'light';
    const savedColor = localStorage.getItem(`snowColor_${theme}`);
    return savedColor || (theme === 'dark' ? '#ffffff' : '#000000');
}

// === Поиск и скрытие панели ===
const searchForm = document.getElementById('search_remove');
const searchToggle = document.getElementById('toggleSwitch');

// Настройка панели поиска
const searchEnabled = localStorage.getItem('searchEnabled') !== 'false';
searchForm.style.display = searchEnabled ? 'flex' : 'none';
searchToggle.checked = searchEnabled;

searchToggle.addEventListener('change', function () {
    const isOn = this.checked;
    searchForm.style.display = isOn ? 'flex' : 'none';
    localStorage.setItem('searchEnabled', isOn ? 'true' : 'false');
});

// === Снегопад ===
const snowCanvas = document.getElementById('snowCanvas');
const snowToggle = document.getElementById('toggleSnow');

// Настройка видимости снега
const snowEnabled = localStorage.getItem('snowEnabled') !== 'false';
snowCanvas.style.display = snowEnabled ? 'block' : 'none';
snowToggle.checked = snowEnabled;

snowToggle.addEventListener('change', function () {
    const isOn = this.checked;
    snowCanvas.style.display = isOn ? 'block' : 'none';
    localStorage.setItem('snowEnabled', isOn ? 'true' : 'false');
});

// Настройка контекста канваса для снега
const ctx = snowCanvas.getContext('2d');
let width = snowCanvas.width = window.innerWidth;
let height = snowCanvas.height = window.innerHeight;

// Адаптация размера канваса
window.addEventListener('resize', () => {
    width = snowCanvas.width = window.innerWidth;
    height = snowCanvas.height = window.innerHeight;
});

// Инициализация снежинок
const snowflakes = [];
const flakesCount = 100;

for (let i = 0; i < flakesCount; i++) {
    snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.5,
        d: Math.random() * flakesCount,
        speedX: (Math.random() - 0.5) * 0.5
    });
}

let angle = 0;

// Рисование снежинок
function drawSnowflakes() {
    if (snowCanvas.style.display === 'none') return;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = getSnowColor();
    ctx.beginPath();
    for (let i = 0; i < flakesCount; i++) {
        const f = snowflakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveSnowflakes();
}

// Движение снежинок
function moveSnowflakes() {
for (let i = 0; i < flakesCount; i++) {
    const f = snowflakes[i];
    f.y += Math.pow(f.r, 0.4); // более плавное падение
    f.x += f.speedX; // индивидуальное движение

    // Респавн снизу вверх и сброс позиции
    if (f.y > height || f.x < -10 || f.x > width + 10) {
        f.x = Math.random() * width;
        f.y = 0;
    }
}

}

// Рисование снега с интервалом
setInterval(drawSnowflakes, 33);

// === Часы и дата ===
function updateClock() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');

    const weekdays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const weekday = weekdays[now.getDay()];
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');

    document.getElementById('timeDisplay').textContent = `${hours}:${mins}`;
    document.getElementById('dateDisplay').textContent = `${weekday}, ${day}.${month}`;
}

// Обновление времени каждую секунду
setInterval(updateClock, 1000);
updateClock();

// === Погода (без ключа API) ===
function fetchWeather() {
    if (!navigator.geolocation) {
        document.getElementById('weatherDisplay').textContent = 'Геолокация не поддерживается';
        return;
    }

    navigator.geolocation.getCurrentPosition(success => {
        const { latitude, longitude } = success.coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.current_weather) {
                    const temp = Math.round(data.current_weather.temperature);
                    const wind = Math.round(data.current_weather.windspeed);
                    document.getElementById('weatherDisplay').textContent = `${temp}°C, ветер ${wind} км/ч`;
                } else {
                    document.getElementById('weatherDisplay').textContent = 'Ошибка получения данных';
                }
            })
            .catch(() => {
                document.getElementById('weatherDisplay').textContent = 'Не удалось загрузить погоду';
            });
    }, () => {
        document.getElementById('weatherDisplay').textContent = 'Геолокация отклонена';
    });
}

fetchWeather();

// Погода по клику
const weatherDisplay = document.getElementById('weatherDisplay');
weatherDisplay.addEventListener('click', () => {
  const lat = localStorage.getItem('lastLat');
  const lon = localStorage.getItem('lastLon');
  if (lat && lon) {
    const url = `https://pogoda.yandex.ru/`;
    window.open(url, '_blank');
  }
});

// === Настройка видимости виджета времени ===
const timeWidget = document.getElementById('timeWeatherWidget');
const clockToggle = document.getElementById('toggleClock');

const clockEnabled = localStorage.getItem('clockEnabled') !== 'false';
timeWidget.style.display = clockEnabled ? 'block' : 'none';
clockToggle.checked = clockEnabled;

clockToggle.addEventListener('change', function () {
    const isOn = this.checked;
    timeWidget.style.display = isOn ? 'block' : 'none';
    localStorage.setItem('clockEnabled', isOn ? 'true' : 'false');
});

const layoutSelector = document.getElementById('layoutPosition');
const container = document.querySelector('.container');
const widget = document.querySelector('.widget');

// Загрузка позиции при старте
const layoutButtons = document.querySelectorAll('.layout-dot');

window.addEventListener('DOMContentLoaded', () => {
    const savedLayout = localStorage.getItem('layout') || 'center';
    applyLayout(savedLayout);
    setSelectedLayout(savedLayout);
});

layoutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const pos = btn.getAttribute('data-pos');
        applyLayout(pos);
        setSelectedLayout(pos);
        localStorage.setItem('layout', pos);
    });
});

function setSelectedLayout(pos) {
    layoutButtons.forEach(btn => {
        btn.classList.toggle('selected', btn.getAttribute('data-pos') === pos);
    });
}


// Функция применения позиции
function applyLayout(position) {
    const layoutClasses = ['layout-top', 'layout-center', 'layout-bottom'];
    document.body.classList.remove(...layoutClasses);
    document.body.classList.add(`layout-${position}`);

    const timeWidget = document.getElementById('timeWeatherWidget');
    const container = document.querySelector('.container');
    const widget = document.querySelector('.widget');

    // Сброс позиции часов
    timeWidget.classList.remove('time-centered');

    // Удаление и повторное добавление элементов
    if (container && widget) {
        document.body.removeChild(container);
        document.body.removeChild(widget);

        if (position === 'top') {
            // Часы в центре, поиск -> виджеты
            timeWidget.classList.add('time-centered');
            document.body.appendChild(container);
            document.body.appendChild(widget);
        } else if (position === 'bottom') {
            // Часы в центре, виджеты -> поиск
            timeWidget.classList.add('time-centered');
            document.body.appendChild(widget);
            document.body.appendChild(container);
        } else {
            // Центр — часы по умолчанию (top: 25%), поиск -> виджеты
            timeWidget.classList.remove('time-centered');
            document.body.appendChild(container);
            document.body.appendChild(widget);
        }
    }
}



const add_widget_btn = document.getElementById('add_widget_btn');
const add_widget = document.querySelector('.add_widget');
const closeButton = document.getElementById("closeButton");

add_widget_btn.addEventListener('click', () => {
    add_widget.style.display = add_widget.style.display === 'flex' ? 'none' : 'flex';
});

closeButton.addEventListener('click', () => {
    add_widget.style.display = 'none';
});

const addWidgetBtn = document.getElementById('addBtn');
const input = document.getElementById('widget_input');
const widgetContainer = document.getElementById('widget_container');

// Загружаем виджеты из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', loadWidgets);

// Функция для загрузки виджетов из localStorage
function loadWidgets() {
    const savedWidgets = JSON.parse(localStorage.getItem('widgets')) || [];

    savedWidgets.forEach(url => {
        createWidget(url);
    });
}

// Добавление виджета
addWidgetBtn.addEventListener('click', () => {
    const url = input.value.trim();
    if (!url) return;

    createWidget(url);

    saveWidget(url);

    input.value = '';
    overlay.style.display = 'none';
});

// Создание виджета
function createWidget(url) {
    const wrapper = document.createElement('div');
    wrapper.className = 'widget_wrapper';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close_btn';
    closeBtn.textContent = 'x';

    // Убедимся, что крестик правильно добавляется
    console.log('Создаем крестик', closeBtn);

    closeBtn.addEventListener('click', () => {
        wrapper.remove();
        removeWidget(url);
    });

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';

    const button = document.createElement('button');
    button.className = 'widget_button';
    button.type = 'button';

    const img = document.createElement('img');
    img.src = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`;
    img.className = 'icon_button_32px';

    button.appendChild(img);
    a.appendChild(button);

    wrapper.appendChild(closeBtn);
    wrapper.appendChild(a);
    widgetContainer.appendChild(wrapper);

    // После создания виджета проверяем видимость крестиков
    toggleWidgetCloseBtnVisibility();
}

// Сохранение виджета в localStorage
function saveWidget(url) {
    const savedWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
    savedWidgets.push(url);
    localStorage.setItem('widgets', JSON.stringify(savedWidgets));
}

// Удаление виджета из localStorage
function removeWidget(url) {
    let savedWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
    savedWidgets = savedWidgets.filter(item => item !== url);
    localStorage.setItem('widgets', JSON.stringify(savedWidgets));
}

// Скрытие или показ крестиков в зависимости от состояния переключателя
function toggleWidgetCloseBtnVisibility() {
    const allCloseBtns = document.querySelectorAll('.close_btn');
    const toggleCloseBtn = document.getElementById('toggleCloseBtn');

    if (toggleCloseBtn.checked) {
        allCloseBtns.forEach(btn => {
            btn.style.display = 'none'; // Скрываем крестики
        });
    } else {
        allCloseBtns.forEach(btn => {
            btn.style.display = ''; // Показываем крестики
        });
    }
}

// Сохранение состояния переключателя в localStorage
document.getElementById('toggleCloseBtn').addEventListener('change', () => {
    const isChecked = document.getElementById('toggleCloseBtn').checked;
    localStorage.setItem('toggleCloseBtnState', isChecked); // Сохраняем состояние
    toggleWidgetCloseBtnVisibility();
});

// Восстановление состояния при загрузке страницы
window.addEventListener('load', () => {
    const savedState = localStorage.getItem('toggleCloseBtnState') === 'true'; // Получаем сохраненное состояние
    document.getElementById('toggleCloseBtn').checked = savedState; // Применяем сохраненное состояние
    toggleWidgetCloseBtnVisibility(); // Применяем видимость крестиков
});
