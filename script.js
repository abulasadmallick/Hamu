// Sample accounts
const accounts = [
    { accountNumber: '123456', pin: '1234', balance: 1000 },
    { accountNumber: '654321', pin: '4321', balance: 2000 },
];

// Active session
let activeAccount = null;

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const accountNumberInput = document.getElementById('account-number');
const pinInput = document.getElementById('pin');
const loginMessage = document.getElementById('login-message');
const welcomeMessage = document.getElementById('welcome-message');
const balanceDisplay = document.getElementById('balance');
const amountInput = document.getElementById('amount');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const logoutBtn = document.getElementById('logout-btn');

// Functions
function showDashboard() {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    welcomeMessage.textContent = `Welcome, Account #${activeAccount.accountNumber}`;
    balanceDisplay.textContent = activeAccount.balance;
}

function showLogin() {
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
    loginMessage.textContent = '';
    accountNumberInput.value = '';
    pinInput.value = '';
    amountInput.value = '';
    activeAccount = null;
}

function handleLogin(event) {
    event.preventDefault();
    const accountNumber = accountNumberInput.value.trim();
    const pin = pinInput.value.trim();
    
    const account = accounts.find(
        (acc) => acc.accountNumber === accountNumber && acc.pin === pin
    );
    
    if (account) {
        activeAccount = account;
        showDashboard();
    } else {
        loginMessage.textContent = 'Invalid account number or PIN.';
    }
}

function handleDeposit() {
    const amount = parseFloat(amountInput.value);
    if (amount > 0) {
        activeAccount.balance += amount;
        balanceDisplay.textContent = activeAccount.balance;
        amountInput.value = '';
    } else {
        alert('Please enter a valid amount.');
    }
}

function handleWithdraw() {
    const amount = parseFloat(amountInput.value);
    if (amount > 0 && amount <= activeAccount.balance) {
        activeAccount.balance -= amount;
        balanceDisplay.textContent = activeAccount.balance;
        amountInput.value = '';
    } else {
        alert('Insufficient balance or invalid amount.');
    }
}

function handleLogout() {
    showLogin();
}

// Event Listeners
loginForm.addEventListener('submit', handleLogin);
depositBtn.addEventListener('click', handleDeposit);
withdrawBtn.addEventListener('click', handleWithdraw);
logoutBtn.addEventListener('click', handleLogout);
