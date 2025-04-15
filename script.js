// Bank Functions
let bankBalance = 0;
let transactionHistory = [];
let loanBalance = 0;

function deposit(amount) {
    if (amount <= 0) {
        alert("Kwota musi być większa niż 0!");
        return;
    }
    bankBalance += amount;
    transactionHistory.push({ type: "Depozyt", amount: amount });
    updateBankInfo();
    alert(`Wpłacono ${amount}. Saldo w banku: ${bankBalance}`);
}

function withdraw(amount) {
    if (amount > bankBalance) {
        alert("Niewystarczające środki na koncie!");
        return;
    }
    bankBalance -= amount;
    transactionHistory.push({ type: "Wypłata", amount: amount });
    updateBankInfo();
    alert(`Wypłacono ${amount}. Saldo w banku: ${bankBalance}`);
}

function takeLoan(amount) {
    if (amount <= 0) {
        alert("Kwota pożyczki musi być większa niż 0!");
        return;
    }
    loanBalance += amount;
    bankBalance += amount;
    transactionHistory.push({ type: "Pożyczka", amount: amount });
    updateBankInfo();
    alert(`Zaciągnięto pożyczkę w wysokości ${amount}. Saldo w banku: ${bankBalance}`);
}

function repayLoan(amount) {
    if (amount > loanBalance) {
        alert("Kwota przekracza saldo pożyczki!");
        return;
    }
    if (amount > bankBalance) {
        alert("Niewystarczające środki na spłatę pożyczki!");
        return;
    }
    loanBalance -= amount;
    bankBalance -= amount;
    transactionHistory.push({ type: "Spłata pożyczki", amount: amount });
    updateBankInfo();
    alert(`Spłacono ${amount}. Pozostałe saldo pożyczki: ${loanBalance}`);
}

function updateBankInfo() {
    document.getElementById("bank-balance").textContent = bankBalance;
    document.getElementById("loan-balance").textContent = loanBalance;
}

function showTransactionHistory() {
    console.log("Historia transakcji:");
    transactionHistory.forEach((t, i) => {
        console.log(`${i + 1}. ${t.type}: ${t.amount}`);
    });
}

// Skrzynki Functions
const boxes = {
    standard: {
        name: "Standardowa Skrzynka",
        cost: 100,
        rewards: ["Zwykły przedmiot", "Rzadki przedmiot"]
    },
    premium: {
        name: "Premium Skrzynka",
        cost: 1000,
        rewards: ["Rzadki przedmiot", "Epicki przedmiot", "Legendarny przedmiot"]
    },
    seasonal: {
        name: "Sezonowa Skrzynka",
        cost: 800,
        rewards: ["Świąteczny przedmiot", "Halloweenowy przedmiot", "Noworoczny przedmiot"]
    },
    mystery: {
        name: "Mystery Box",
        cost: 500,
        rewards: ["Zwykły przedmiot", "Rzadki przedmiot", "Losowa niespodzianka"]
    }
};

function openBox(type) {
    const box = boxes[type];
    if (!box) {
        alert("Nieznany rodzaj skrzynki!");
        return;
    }

    const reward = box.rewards[Math.floor(Math.random() * box.rewards.length)];
    alert(`Otworzyłeś ${box.name} i zdobyłeś: ${reward}`);
}