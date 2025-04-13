let balance = 2500;
let income = 40;
let inventory = [];
const cratePrice = 100;
const incomeTiers = [
  { wealth: 2500, income: 40 },
  { wealth: 5000, income: 50 },
  { wealth: 10000, income: 70 },
  { wealth: 25000, income: 100 },
];

// Aktualizuj majątek co minutę (30 zł na minutę)
setInterval(() => {
  balance += income / 2; // Zarobek przeliczany w sekundach (1 minuta = 2 ticki)
  updateUI();
}, 30000);

// Otwieranie skrzynki
function openCrate() {
  if (balance >= cratePrice) {
    balance -= cratePrice;
    const rewards = ["Złoty Miecz", "Diament", "Srebrny Pierścień", "Nic"];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];
    document.getElementById("result").textContent = reward;

    if (reward !== "Nic") {
      inventory.push(reward);
      updateInventory();
    }
  } else {
    document.getElementById("result").textContent = "Za mało pieniędzy!";
  }
  updateUI();
}

// Sprzedawanie ekwipunku
function sellAll() {
  const itemPrices = { "Złoty Miecz": 500, "Diament": 1000, "Srebrny Pierścień": 300 };
  let total = 0;

  inventory.forEach(item => {
    total += itemPrices[item] || 0;
  });

  inventory = [];
  balance += total;
  updateInventory();
  updateUI();
}

// Aktualizacja UI
function updateUI() {
  document.getElementById("balance").textContent = balance;
  document.getElementById("income").textContent = income;

  // Sprawdzaj progi majątku
  incomeTiers.forEach(tier => {
    if (balance >= tier.wealth) {
      income = tier.income;
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

function addItem() {
  inventory.push("Unikalny Przedmiot");
  updateInventory();
}
