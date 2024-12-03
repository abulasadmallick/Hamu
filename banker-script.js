// Banker credentials
const banker = {
    username: 'banker',
    password: 'secure123',
};

// Sample accounts
let accounts = [];

// Active account for transactions
let activeAccount = null;

// DOM Elements
const loginSection = document.getElementById('login-section');
const bankerDashboard = document.getElementById('banker-dashboard');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginMessage = document.getElementById('login-message');

const createAccountForm = document.getElementById('create-account-form');
const newAccountNumber = document.getElementById('new-account-number');
const newName = document.getElementById('new-name');
const newAddress = document.getElementById('new-address');
const newMobile = document.getElementById('new-mobile');
const newBalance = document.getElementById('new-balance');
const createMessage = document.getElementById('create-message');

const searchInput = document.getElementById('search-account');
const searchBtn = document.getElementById('search-btn');
const searchMessage = document.getElementById('search-message');
const searchResult = document.getElementById('search-result');
const accountDetailsNumber = document.getElementById('account-details-number');
const accountDetailsName = document.getElementById('account-details-name');
const accountDetailsAddress = document.getElementById('account-details-address');
const accountDetailsMobile = document.getElementById('account-details-mobile');
const accountDetailsBalance = document.getElementById('account-details-balance');
const transactionAmount = document.getElementById('transaction-amount');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const transactionHistory = document.getElementById('transaction-history');

const accountsTableBody = document.querySelector('#accounts-table tbody');

// Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

function login(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === banker.username && password === banker.password) {
        loginSection.classList.add('hidden');
        bankerDashboard.classList.remove('hidden');
    } else {
        loginMessage.textContent = 'Invalid username or password.';
    }
}

function createAccount(event) {
    event.preventDefault();
    const account = {
        accountNumber: newAccountNumber.value.trim(),
        name: newName.value.trim(),
        address: newAddress.value.trim(),
        mobile: newMobile.value.trim(),
        balance: parseFloat(newBalance.value),
        transactions: [],
    };

    if (accounts.find(acc => acc.accountNumber === account.accountNumber)) {
        createMessage.textContent = 'Account number already exists.';
        return;
    }

    accounts.push(account);
    createMessage.textContent = 'Account created successfully!';
    updateAccountsTable();
    createAccountForm.reset();
}

function searchAccount() {
    const accountNumber = searchInput.value.trim();
    activeAccount = accounts.find(acc => acc.accountNumber === accountNumber);

    if (activeAccount) {
        searchMessage.textContent = '';
        searchResult.classList.remove('hidden');
        accountDetailsNumber.textContent = activeAccount.accountNumber;
        accountDetailsName.textContent = activeAccount.name;
        accountDetailsAddress.textContent = activeAccount.address;
        accountDetailsMobile.textContent = activeAccount.mobile;
        accountDetailsBalance.textContent = formatCurrency(activeAccount.balance);
        updateTransactionHistory();
    } else {
        searchMessage.textContent = 'Account not found.';
        searchResult.classList.add('hidden');
    }
}

function deposit() {
    const amount = parseFloat(transactionAmount.value);
    if (amount > 0) {
        activeAccount.balance += amount;
        activeAccount.transactions.push(`Deposited ${formatCurrency(amount)}`);
        accountDetailsBalance.textContent = formatCurrency(activeAccount.balance);
        updateTransactionHistory();
        transactionAmount.value = '';
    } else {
        alert('Invalid amount.');
    }
}

function withdraw() {
    const amount = parseFloat(transactionAmount.value);
    if (amount > 0 && amount <= activeAccount.balance) {
        activeAccount.balance -= amount;
        activeAccount.transactions.push(`Withdrew ${formatCurrency(amount)}`);
        accountDetailsBalance.textContent = formatCurrency(activeAccount.balance);
        updateTransactionHistory();
        transactionAmount.value = '';
    } else {
        alert('Insufficient balance or invalid amount.');
    }
}

function updateTransactionHistory() {
    transactionHistory.innerHTML = activeAccount.transactions.map(t => `<li>${t}</li>`).join('');
}

function updateAccountsTable() {
    accountsTableBody.innerHTML = accounts.map(account => `
        <tr>
            <td>${account.accountNumber}</td>
            <td>${account.name}</td>
            <td>${formatCurrency(account.balance)}</td>
            <td><button onclick="deleteAccount('${account.accountNumber}')">Delete</button></td>
        </tr>
    `).join('');
}

function deleteAccount(accountNumber) {
    accounts = accounts.filter(acc => acc.accountNumber !== accountNumber);
    updateAccountsTable();
}

// Event Listeners
loginForm.addEventListener('submit', login);
createAccountForm.addEventListener('submit', createAccount);
searchBtn.addEventListener('click', searchAccount);
depositBtn.addEventListener('click', deposit);
withdrawBtn.addEventListener('click', withdraw);

// Initialize
updateAccountsTable();
