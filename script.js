let balance = 2500;
let bank = 0;
let income = 40;
let openedCrates = 0;
let inventory = [];
let rank = "Nowicjusz";

// Dodanie nowych skrzynek
const cratePrices = {
  basic: 100,
  premium: 500,
  legendary: 1000,
  epic: 2000,
  mythical: 5000
};

const crateRewards = {
  basic: ["Złoty Miecz", "Srebrny Pierścień", "Nic"],
  premium: ["Diament", "Rubin", "Szmaragd", "Złoty Miecz"],
  legendary: ["Unikalny Przedmiot", "Legenda Smoków", "Diamentowy Hełm", "Nic"],
  epic: ["Epicka Zbroja", "Epicki Łuk", "Epicki Naszyjnik", "Nic"],
  mythical: ["Mityczna Korona", "Mityczny Miecz", "Mityczne Skrzydła", "Nic"]
};

// Funkcja otwierania skrzynki
function openCrate(type) {
  if (balance >= cratePrices[type]) {
    balance -= cratePrices[type];
    document.getElementById("crate-animation").classList.remove("hidden");

    setTimeout(() => {
      const rewards = crateRewards[type];
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      document.getElementById("result").textContent = reward;

      if (reward !== "Nic") {
        inventory.push(reward);
        updateInventory();
      }

      document.getElementById("crate-animation").classList.add("hidden");
      openedCrates++;
      updateRank();
    }, 2000);
  } else {
    document.getElementById("result").textContent = "Za mało pieniędzy!";
  }
  updateUI();
}

// Funkcja wpłaty dowolnej kwoty do banku
function depositToBank() {
  const amount = parseFloat(prompt("Ile chcesz wpłacić do banku?"));
  if (amount && !isNaN(amount) && amount > 0) {
    if (balance >= amount) {
      balance -= amount;
      bank += amount;
      updateUI();
    } else {
      alert("Za mało pieniędzy!");
    }
  } else {
    alert("Wprowadź poprawną kwotę!");
  }
}

// Funkcja wypłaty z banku
function withdrawFromBank() {
  const amount = parseFloat(prompt("Ile chcesz wypłacić z banku?"));
  if (amount && !isNaN(amount) && amount > 0) {
    if (bank >= amount) {
      bank -= amount;
      balance += amount;
      updateUI();
    } else {
      alert("Za mało pieniędzy w banku!");
    }
  } else {
    alert("Wprowadź poprawną kwotę!");
  }
}

// Aktualizacja UI
function updateUI() {
  document.getElementById("balance").textContent = Math.floor(balance);
  document.getElementById("income").textContent = income;
  document.getElementById("bank").textContent = Math.floor(bank);
  document.getElementById("openedCrates").textContent = openedCrates;
  document.getElementById("rank").textContent = rank;
}

// Sprzedawanie ekwipunku
function sellAll() {
  const itemPrices = { 
    "Złoty Miecz": 500, 
    "Diament": 1000, 
    "Srebrny Pierścień": 300, 
    "Rubin": 800, 
    "Szmaragd": 700, 
    "Unikalny Przedmiot": 5000, 
    "Legenda Smoków": 10000, 
    "Diamentowy Hełm": 2000,
    "Epicka Zbroja": 7000, 
    "Epicki Łuk": 6000,
    "Epicki Naszyjnik": 6500,
    "Mityczna Korona": 15000,
    "Mityczny Miecz": 20000,
    "Mityczne Skrzydła": 25000
  };
  let total = 0;

  inventory.forEach(item => {
    total += itemPrices[item] || 0;
  });

  inventory = [];
  balance += total;
  updateInventory();
  updateUI();
}

// Aktualizacja rangi
const ranks = [
  { crates: 0, name: "Nowicjusz" },
  { crates: 10, name: "Ekspert" },
  { crates: 50, name: "Mistrz Skrzynek" },
  { crates: 100, name: "Legendarna Postać" }
];

function updateRank() {
  ranks.forEach(r => {
    if (openedCrates >= r.crates) {
      rank = r.name;
    }
  });
}

// Aktualizacja ekwipunku
function updateInventory() {
  const inventoryList = document.getElementById("inventory");
  inventoryList.innerHTML = "";
  inventory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    inventoryList.appendChild(li);
  });
}

// Zapis i wczytywanie gry
function saveGame() {
  const gameState = {
    balance,
    bank,
    income,
    openedCrates,
    inventory,
    rank,
  };
  localStorage.setItem("gameState", JSON.stringify(gameState));
  alert("Gra zapisana!");
}

function loadGame() {
  const savedState = JSON.parse(localStorage.getItem("gameState"));
  if (savedState) {
    balance = savedState.balance;
    bank = savedState.bank;
    income = savedState.income;
    openedCrates = savedState.openedCrates;
    inventory = savedState.inventory;
    rank = savedState.rank;
    updateUI();
    updateInventory();
    alert("Gra wczytana!");
  } else {
    alert("Brak zapisanego stanu gry!");
  }
}

// Mod Menu
function activateMod() {
  const code = document.getElementById("modCode").value;
  if (code === "7432") {
    document.getElementById("modMenu").style.display = "block";
  } else {
    alert("Nieprawidłowy kod!");
  }
}

function addMoney() {
  balance += 10000;
  updateUI();
}

function addCustomMoney() {
  const amount = prompt("Ile pieniędzy dodać?");
  if (amount && !isNaN(amount)) {
    balance += parseFloat(amount);
    updateUI();
  }
}

function addItem() {
  inventory.push("Unikalny Przedmiot");
  updateInventory();
}

function addSpecificItem() {
  const item = prompt("Podaj nazwę przedmiotu:");
  if (item) {
    inventory.push(item);
    updateInventory();
  }
}