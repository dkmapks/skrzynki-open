let balance = 2500;
let bank = 0;
let income = 40;
let openedCrates = 0;
let inventory = [];
let rank = "Nowicjusz";

const cratePrices = {
  basic: 100,
  premium: 500,
  legendary: 1000,
};

const crateRewards = {
  basic: ["Złoty Miecz", "Srebrny Pierścień", "Nic"],
  premium: ["Diament", "Rubin", "Szmaragd", "Złoty Miecz"],
  legendary: ["Unikalny Przedmiot", "Legenda Smoków", "Diamentowy Hełm", "Nic"],
};

const ranks = [
  { crates: 0, name: "Nowicjusz" },
  { crates: 10, name: "Ekspert" },
  { crates: 50, name: "Mistrz Skrzynek" },
  { crates: 100, name: "Legendarna Postać" },
];

const incomeTiers = [
  { wealth: 2500, income: 40 },
  { wealth: 5000, income: 50 },
  { wealth: 10000, income: 70 },
  { wealth: 25000, income: 100 },
  { wealth: 50000, income: 200 },
];

// Aktualizuj majątek co minutę (30 zł na minutę)
setInterval(() => {
  balance += income / 2;
  bank += bank * 0.05 / 2; // Odsetki bankowe co minutę
  updateUI();
}, 30000);

// Otwieranie skrzynki z animacją
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
    "Diamentowy Hełm": 2000 
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

// Bank: Wpłata i wypłata
function depositToBank() {
  if (balance >= 100) {
    balance -= 100;
    bank += 100;
    updateUI();
  } else {
    alert("Za mało pieniędzy!");
  }
}

function withdrawFromBank() {
  if (bank >= 100) {
    bank -= 100;
    balance += 100;
    updateUI();
  } else {
    alert("Za mało pieniędzy w banku!");
  }
}

// Aktualizacja UI
function updateUI() {
  document.getElementById("balance").textContent = Math.floor(balance);
  document.getElementById("income").textContent = income;
  document.getElementById("bank").textContent = Math.floor(bank);
  document.getElementById("openedCrates").textContent = openedCrates;
  document.getElementById("rank").textContent = rank;

  incomeTiers.forEach(tier => {
    if (balance >= tier.wealth) {
      income = tier.income;
    }
  });
}

// Aktualizacja rangi
function updateRank() {
  ranks.forEach(r => {
    if (openedCrates >= r.crates) {
      rank = r.name;
    }
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