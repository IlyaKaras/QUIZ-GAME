const players = ["Ведущий"];
const scores = {};
const usedQuestions = new Set();
let answeredCount = 0;


const categories = [
  "Школа",
  "Военная техника",
  "Спорт",
  "Компьютер",
  "Бренды",
  "Назови личность"
];

const questions = {
  "Школа": {
    100: "Сколько сторон у треугольника?",
    200: "Как называется наука о числах?",
    300: "Кто написал «Войну и мир»?",
    400: "Как называется столица Франции?",
    500: "Что тяжелее: 1 кг железа или 1 кг ваты?"
  },
  "Военная техника": {
  100: "Назовите военную технику, изображённую на фото.",
  200: "Назовите военную технику, изображённую на фото.",
  300: "Назовите военную технику, изображённую на фото.",
  400: "Назовите военную технику, изображённую на фото.",
  500: "Назовите военную технику, изображённую на фото."

  },
  "Спорт": {
    100: "Сколько игроков в футбольной команде?",
    200: "Как называется удар в теннисе, начинающий розыгрыш?",
    300: "В каком виде спорта используется шайба?",
    400: "Кто выиграл Олимпиаду в 2020 году по гимнастике?",
    500: "Сколько колец на олимпийском флаге?"
  },
  "Компьютер": {
    100: "Что означает аббревиатура CPU?",
    200: "Как называется основная операционная система от Microsoft?",
    300: "Что такое браузер?",
    400: "Назовите язык программирования, начинающийся на 'P'.",
    500: "Что делает антивирус?"
  },
  "Бренды": {
    100: "Назавите что за бренд",
    200: "Назавите что за бренд",
    300: "Назавите что за бренд",
    400: "Назавите что за бренд",
    500: "Назавите что за бренд"
  },
  "Назови личность": {
    100: "Кто изображён на фото?",
    200: "Кто изображён на фото?",
    300: "Кто изображён на фото?",
    400: "Кто изображён на фото?",
    500: "Кто изображён на фото?"
  }
};

const imageQuestions = {
    "Военная техника": {
      100: "https://ts3.mm.bing.net/th?id=OIP.4W4826R6jjjgNwSEIxDANQHaFj&pid=15.1",
      200: "https://ts4.mm.bing.net/th?id=OIP.lMX8IvAd_Bsxfmvv9P0PlQHaEu&pid=15.1",
      300: "https://ts2.mm.bing.net/th?id=OIP.SI-uix06B9Ef5uM6pDCrpwHaFj&pid=15.1",
      400: "https://ts3.mm.bing.net/th?id=OIP.cY3lmvWG0AHlRnELDoJWBAHaE7&pid=15.1",
      500: "https://ts3.mm.bing.net/th?id=OIP.U7JU269f_Rg3z7FQV9iiTQHaE8&pid=15.1"
    },
    "Бренды": {
        100: "https://pngimg.com/uploads/apple_logo/apple_logo_PNG19678.png",
        200: "https://nikefans.ru/images/main/swoosh/001.png",
        300: "https://pngimg.com/uploads/mcdonalds/mcdonalds_PNG9.png",
        400: "https://pngimg.com/uploads/adidas/adidas_PNG8.png",
        500: "https://pngimg.com/uploads/tesla_logo/tesla_logo_PNG22.png"
    },

    "Назови личность": {
        100: "https://spacegid.com/wp-content/uploads/2021/02/jejnshtejn.jpg",
        200: "https://upload.wikimedia.org/wikipedia/commons/4/45/Борис_Николаевич_Ельцин-1_%28cropped%29_%28cropped%29.jpg",
        300: "https://mc.eduirk.ru/media/k2/items/cache/095b50b2d3b74bb51d90d91753a1f697_XL.jpg",
        400: "https://detfond.com/wp-content/uploads/2020/06/bill-gejts.jpg",
        500: "https://cdn.gallerix.asia/sr/N/1907681216/420.jpg"
    }
};
  

function addPlayer() {
  const input = document.getElementById('playerName');
  const name = input.value.trim();

  if (name && !players.includes(name)) {
    players.push(name);
    scores[name] = 0;
    updatePlayerList();
    input.value = '';
    checkStartCondition();
  }
}

function updatePlayerList() {
    const sidebar = document.getElementById('playerNames');
    sidebar.innerHTML = '';
  
    players.forEach(player => {
      const score = scores[player] || 0;
      if (player !== "Ведущий") {
        const sideItem = document.createElement('li');
        sideItem.textContent = `${player} — ${score} баллов`;
        sideItem.id = `sidebar-${player}`;
        sidebar.appendChild(sideItem);
      }
    });
}
  

function checkStartCondition() {
  const startBtn = document.getElementById('startBtn');
  startBtn.disabled = players.length < 3;
}

function startGame() {
    alert(`Игра начинается! Игроки: ${players.slice(1).join(', ')}`);
    document.getElementById('player-form').classList.add('hidden');
    document.getElementById('startBtn').classList.add('hidden');
    document.getElementById('gameBoard').classList.remove('hidden');
  
    // Скрываем боковую панель на время слайд-шоу
    document.getElementById('playerSidebar').classList.add('hidden');
  
    revealCategories();
}
  

function revealCategories() {
    const revealDiv = document.getElementById('categoryReveal');
    let index = 0;
  
    const interval = setInterval(() => {
      if (index < categories.length) {
        revealDiv.textContent = categories[index];
        index++;
      } else {
        clearInterval(interval);
        revealDiv.classList.add('hidden');
  
        // Показываем боковую панель после слайд-шоу
        document.getElementById('playerSidebar').classList.remove('hidden');
  
        showBoard();
      }
    }, 1000);
}
  

function showBoard() {
  const board = document.getElementById('board');
  board.classList.remove('hidden');
  board.innerHTML = '';

  categories.forEach(cat => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = cat;
    board.appendChild(cell);
  });

  for (let i = 0; i < 5; i++) {
    categories.forEach(cat => {
      const value = Object.keys(questions[cat])[i];
      const key = `${cat}-${value}`;
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = value;
      cell.id = key;
      cell.addEventListener('click', () => {
        if (!usedQuestions.has(key)) {
          usedQuestions.add(key);
          cell.classList.add('disabled');
          showQuestion(cat, value);
        }
      });
      board.appendChild(cell);
    });
  }
}

function showQuestion(category, value) {
    const modal = document.createElement('div');
    modal.className = 'modal';
  
    const image = imageQuestions[category]?.[value] || null;
    const questionText = questions[category][value];
  
    const playerOptions = players
      .filter(p => p !== "Ведущий")
      .map(p => `<option value="${p}">${p}</option>`)
      .join('');
  
    modal.innerHTML = `
      <div class="modal-content">
        <h2>${category} — ${value} баллов</h2>
        ${image ? `<img src="${image}" class="question-img" />` : ''}
        <p>${questionText}</p>
        <label>Игрок:
          <select id="answerPlayer">
            <option value="">Выберите игрока</option>
            ${playerOptions}
          </select>
        </label><br><br>
        <div class="button-group">
          <button id="correctBtn">Правильно</button>
          <button id="wrongBtn">Неправильно</button>
          <button id="closeBtn">Закрыть</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  
    document.getElementById('correctBtn').addEventListener('click', () => {
      evaluateAnswer(value, true);
    });
  
    document.getElementById('wrongBtn').addEventListener('click', () => {
      evaluateAnswer(value, false);
    });
  
    document.getElementById('closeBtn').addEventListener('click', closeModal);
}

function evaluateAnswer(value, isCorrect) {
    const select = document.getElementById('answerPlayer');
    const player = select.value;
  
    if (!player || !players.includes(player)) {
      alert("Выберите игрока из списка.");
      return;
    }
  
    scores[player] = scores[player] || 0;
    scores[player] += isCorrect ? parseInt(value) : -parseInt(value);
  
    const sidebarItem = document.getElementById(`sidebar-${player}`);
    if (sidebarItem) {
      sidebarItem.textContent = `${player} — ${scores[player]} баллов`;
    }
  
    closeModal();
  
    answeredCount++;
    if (answeredCount === 30) {
      setTimeout(showResults, 500);
    }
}
  
  
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

function showResults() {
    const results = players
      .filter(p => p !== "Ведущий")
      .map(p => ({ name: p, score: scores[p] || 0 }))
      .sort((a, b) => b.score - a.score);
  
    const modal = document.createElement('div');
    modal.className = 'modal';
  
    let tableHTML = `
      <div class="modal-content">
        <h2>🏆 Турнирная таблица</h2>
        <table style="width:100%; border-collapse: collapse; color: white;">
          <thead>
            <tr>
              <th style="border-bottom: 1px solid #00bfff;">Место</th>
              <th style="border-bottom: 1px solid #00bfff;">Игрок</th>
              <th style="border-bottom: 1px solid #00bfff;">Баллы</th>
            </tr>
          </thead>
          <tbody>
    `;
  
    results.forEach((player, index) => {
      tableHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${player.name}</td>
          <td>${player.score}</td>
        </tr>
      `;
    });
  
    tableHTML += `
          </tbody>
        </table>
        <br>
        <button onclick="closeModal()">Закрыть</button>
      </div>
    `;
  
    modal.innerHTML = tableHTML;
    document.body.appendChild(modal);
}
  