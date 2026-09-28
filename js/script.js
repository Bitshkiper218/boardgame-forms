// Початковий масив даних ігор
const games = [
    { title: 'Каркасон', minPlayers: 2, maxPlayers: 5, img: 'assets/img/carcassonne.jpg', desc: 'Класична гра на вибудовування міст та доріг.' },
    { title: 'Манчкін', minPlayers: 3, maxPlayers: 6, img: 'assets/img/munchkin.jpg', desc: 'Весела карткова гра про зачистку підземель.' },
    { title: 'Діксіт', minPlayers: 3, maxPlayers: 8, img: 'assets/img/dixit.jpg', desc: 'Гра на асоціації з неймовірними ілюстраціями.' }
];

// Функція перевірки відповідності кількості гравців
function fitsPlayers(game, players) {
    return players >= game.minPlayers && players <= game.maxPlayers;
}

const listContainer = document.querySelector('#games-list');
const gamesCount = document.querySelector('#games-count');
const addGameForm = document.querySelector('#add-game-form');
const formErrorMsg = document.querySelector('#form-error-msg');
const playerFilter = document.querySelector('#player-filter');

// Функція динамічного рендеру списку ігор
function renderGames(gamesArray) {
    if (!listContainer) return;
    
    listContainer.innerHTML = ''; // Очищуємо контейнер

    gamesArray.forEach(game => {
        const card = document.createElement('article');
        card.classList.add('card');

        const title = document.createElement('h3');
        title.textContent = game.title;

        const badge = document.createElement('span');
        badge.classList.add('badge');
        badge.textContent = `${game.minPlayers}-${game.maxPlayers} гравців`;

        const image = document.createElement('img');
        image.src = game.img || 'assets/img/carcassonne.jpg'; 
        image.alt = `Обкладинка гри ${game.title}`;

        const desc = document.createElement('p');
        desc.textContent = game.desc;

        card.dataset.players = `${game.minPlayers}-${game.maxPlayers}`;
        
        // Умовний клас для ігор, що підходять на 4 гравців
        if (fitsPlayers(game, 4)) {
            card.classList.add('fits');
        }

        card.append(title, badge, image, desc);
        listContainer.append(card);
    });

    if (gamesCount) {
        gamesCount.textContent = gamesArray.length;
    }
}

// Початковий рендер при завантаженні сторінки
renderGames(games);

// Практична робота 8: Обробка сабміту форми без перезавантаження та валідація (Варіант 4)
if (addGameForm) {
    addGameForm.addEventListener('submit', event => {
        event.preventDefault(); // Скасовуємо стандартне перезавантаження сторінки

        const titleInput = document.querySelector('#new-title');
        const minPlayersInput = document.querySelector('#min-players');
        const maxPlayersInput = document.querySelector('#max-players');

        const title = titleInput.value.trim();
        const minPlayers = Number(minPlayersInput.value);
        const maxPlayers = Number(maxPlayersInput.value);

        // Додаткова клієнтська валідація: minPlayers має бути <= maxPlayers[cite: 6]
        if (minPlayers > maxPlayers) {
            formErrorMsg.textContent = 'Помилка: мінімальна кількість гравців не може перевищувати максимальну!';
            return; // Зупиняємо виконання, якщо є помилка
        } else {
            formErrorMsg.textContent = ''; // Очищаємо текст помилки
        }

        // Створення нового об'єкта гри
        const newGame = {
            title: title,
            minPlayers: minPlayers,
            maxPlayers: maxPlayers,
            img: 'assets/img/carcassonne.jpg', // Базова картинка для нових елементів
            desc: 'Нова гра, додана користувачем через форму.'
        };

        // Додаємо в масив даних[cite: 6]
        games.push(newGame);

        // Повторний рендер списку[cite: 6]
        renderGames(games);

        // Очищення полів форми[cite: 6]
        addGameForm.reset();
    });
}

// Практична робота 8: Друга подія варіанта 4 (change на select фільтра гравців)[cite: 6]
if (playerFilter) {
    playerFilter.addEventListener('change', () => {
        const selectedValue = playerFilter.value;

        if (selectedValue === 'all') {
            renderGames(games);
        } else {
            const targetPlayers = Number(selectedValue);
            const filteredGames = games.filter(game => fitsPlayers(game, targetPlayers));
            renderGames(filteredGames);
        }
    });
}